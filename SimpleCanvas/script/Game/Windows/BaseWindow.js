//I Update(), chatAnimation
ID_HITCANVAS = "hitCanvas";
ID_BGCANVAS = "bgCanvas";
class BaseWindow {
    constructor(
        gameController,
        windowName,
        parentElm,
        headerText = "",
        width = DEFAULT_WINDOW_WIDTH,
        height = DEFAULT_WINDOW_HEIGHT) {

        Validator.ValidateObject(gameController, "BaseWindow.ctor.gameController", GameController);
        Validator.ValidateValue(parentElm, "BaseWindow.ctor.parentElm");

        this.gameController = gameController;
        this.windowName = windowName;
        this.parentElm = parentElm;
        this.headerText = headerText;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.mouseSprite = null; // the hitbox sprite that the mouse is currently on.

        this.Initialize();
    }

    //static OnKeyDownEventName() { return "KeyDown"; }
    //static OnKeyUpEventName() { return "KeyUp"; }
    ////static OnKeyPressEventName() { return "KeyPress"; }
    //static OnMouseOverEventName() { return "MouseOver"; }
    //static OnMouseOutEventName() { return "MouseOut"; }

    Initialize() {
        TraceInfo("BaseWindow.Initialize");

        this.sprite = new Sprite(new EmptyBitmap(this.width, this.height));
        this.sprite.hitBox = false;

        if (this.headerText) {
            this.headerText = new TextUI(
                this.gameController,
                this.headerText,
                100, 50,
                BUTTON_LABEL_FONT,
                BUTTON_LABEL_COLOR);
            this.sprite.AddChild(this.headerText.sprite);

            Alignment.AlignObjectsYRef(this.sprite, 0, 0, -this.sprite.height * 2 / 5, ALIGN_MIDDLE, this.headerText.sprite);
        }
    }

    Display() {
        TraceInfo("BaseWindow.Display");
        this.containerDiv = document.createElement("div");
        this.parentElm.appendChild(this.containerDiv);

        this.canvas = document.createElement("canvas");
        //this.canvas.innerHTML = "Your browser does not support the HTML5 canvas tag.";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        //this.canvas.style = "border:1px solid #d3d3d3;";
        this.containerDiv.appendChild(this.canvas);

        this.hitCanvas = document.createElement("canvas");
        this.hitCanvas.setAttribute("id", ID_HITCANVAS);
        this.hitCanvas.width = this.width;
        this.hitCanvas.height = this.height;

        var context = this.canvas.getContext('2d');
        this.sprite.DrawOnContext(context);
        this.DrawHitbox();

        var localSelf = this;
        this.canvas.addEventListener('click', (event) => { localSelf.OnSpriteMouseEvent(event, (sprite) => { sprite.HandleClickEvent(event); }); });
        this.canvas.addEventListener('mousedown', (event) => { localSelf.OnMouseDownEvent(event); });
        this.canvas.addEventListener('mouseup', (event) => { localSelf.OnMouseUpEvent(event); });
        this.canvas.addEventListener('mousemove', (event) => { localSelf.OnMouseMoveEvent(event); });
        this.canvas.addEventListener('wheel', (event) => { localSelf.OnSpriteMouseEvent(event, (sprite) => { sprite.HandleMouseWheelEvent(event); }); });
        this.canvas.addEventListener('mouseout', (event) => { localSelf.OnMouseOutEvent(event); });
        this.canvas.addEventListener('mouseover', (event) => { localSelf.OnMouseOverEvent(event); });
        //this.canvas.addEventListener('mouseout', (event) => { localSelf.OnSpriteEvent(event, (sprite) => { sprite.HandleMouseOutEvent(event); }); });
        //window.addEventListener('keydown', (event) => { localSelf.OnKeyDown(event); }, false);
        //window.addEventListener('keyup', (event) => { localSelf.OnKeyUp(event); }, false);
        //window.addEventListener('keypress', (event) => { localSelf.OnKeyPress(event); }, false);
    }

    Update() {
        var context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sprite.DrawOnContext(context);
        this.DrawHitbox();

        var hitCanvasExists = document.getElementById(ID_HITCANVAS);
        if (GameSettings.displayHitCanvas && !hitCanvasExists) {
            this.containerDiv.appendChild(this.hitCanvas);
        }
        else if (!GameSettings.displayHitCanvas && hitCanvasExists) {
            this.containerDiv.removeChild(this.hitCanvas);
        }

        if (this.promptDisplayObject) {
            this.promptDisplayObject.Update();
        }
    }

    RemovePrompt() {
        if (this.promptSprite) {
            this.sprite.RemoveChild(this.promptSprite.id);
            this.promptSprite = null;
        }
    }

    DisplayPrompt(displayObject, blocking = true) {
        Validator.ValidateValue(displayObject, "BaseWindow.DisplayPrompt.displayObject");
        Validator.ValidateObject(displayObject.sprite, "BaseWindow.DisplayPrompt.displayObject", Sprite);
        Validator.ValidateFunction(displayObject.Update, "BaseWindow.DisplayPrompt.displayObject");
        this.RemovePrompt();
        this.promptDisplayObject = displayObject;

        if (blocking) {
            this.promptSprite = new Sprite(new FillRectBitmap(this.width, this.height, Color.GetRGBString(50, 50, 50)));
            this.promptSprite.hitBox = true;
            this.promptSprite.alpha = 0.5;
        }
        else {
            this.promptSprite = new Sprite(new EmptyBitmap(this.width, this.height));
            this.promptSprite.hitBox = false;
        }
        this.sprite.AddChild(this.promptSprite);

        this.promptContainer = new Sprite(new EmptyBitmap(displayObject.sprite.width, displayObject.sprite.height));
        this.promptContainer.hitBox = false;
        this.promptContainer.AddChild(displayObject.sprite);

        Alignment.AlignObjectsXRef(this.promptSprite, 0, 0, 0, ALIGN_MIDDLE, this.promptContainer);
        this.promptSprite.AddChild(this.promptContainer);
    }

    OnMouseOverEvent(event) {
        event.active = true;
        this.ExtendMouseEvent(event);
        var mouseEvent = new CustomEvent(EVENT_MOUSE_OVER, { detail: event });
        this.gameController.eventHub.dispatchEvent(mouseEvent);
    }

    DragDrop(event) {
        var dragged = this.gameController.gameState.GetDragged();
        this.gameController.gameState.SetDragged(null);

        if (dragged) {
            this.sprite.RemoveChild(dragged.sprite.id);
            this.UpdateDragState();
            this.DrawHitbox();
            var targetSprite = this.GetMouseSprite(event);

            if (dragged.sprite.OnDroppedOnTarget) {
                dragged.sprite.OnDroppedOnTarget(event, targetSprite);
            }

            if (targetSprite && targetSprite.OnDropReceived) {
                targetSprite.OnDropReceived(event, dragged);
            }

            dragged.sprite.enabled = true;
        }
    }

    OnMouseOutEvent(event) {
        event.active = true;

        this.DragDrop(event);

        this.sprite.ApplyRecursive((sprite) => {
            if (sprite.mouseOutEnabled && sprite.OnMouseOut) {
                sprite.OnMouseOut(event);
            }
        })

        this.mouseSprite = null;
    }

    OnSpriteMouseEvent(event, spriteFunction) {
        event.active = true;
        this.ExtendMouseEvent(event);
        var mouseSprite = this.GetMouseSprite(event);
        if (mouseSprite) {
            spriteFunction(mouseSprite);
        }
    }

    OnMouseDownEvent(event) {
        event.active = true;
        this.ExtendMouseEvent(event);
        this.gameController.gameState.SetFocusInput(null);
        var mouseSprite = this.GetMouseSprite(event);
        if (mouseSprite) {
            mouseSprite.HandleMouseDownEvent(event);
        }
    }

    OnMouseUpEvent(event) {
        event.active = true;
        this.ExtendMouseEvent(event);
        this.DragDrop(event);
        var mouseSprite = this.GetMouseSprite(event);
        if (mouseSprite) {
            mouseSprite.HandleMouseUpEvent(event);
        }
    }

    OnMouseMoveEvent(event) {
        event.active = true;
        this.ExtendMouseEvent(event);
        this.UpdateDragState();
        var newMouseSprite = this.GetMouseSprite(event);

        var dragged = this.gameController.gameState.GetDragged();
        if (dragged && dragged.sprite) {
            if (dragged.sprite.dragGrabPos) {
                dragged.sprite.x = event.canvasX - dragged.sprite.dragGrabPos.x;
                dragged.sprite.y = event.canvasY - dragged.sprite.dragGrabPos.y;
            }
            else {
                dragged.sprite.x = event.canvasX - dragged.sprite.width / 2;
                dragged.sprite.y = event.canvasY - dragged.sprite.height / 2;
            }
        }
        else {
            if (this.mouseSprite && (!newMouseSprite || this.mouseSprite.id != newMouseSprite.id)) {
                this.mouseSprite.HandleMouseOutEvent(event);
            }

            if (newMouseSprite && (!this.mouseSprite || this.mouseSprite.id != newMouseSprite.id)) {
                newMouseSprite.HandleMouseOverEvent(event);
            }

            if (newMouseSprite) {
                newMouseSprite.HandleMouseMoveEvent(event);
            }
        }

        this.mouseSprite = newMouseSprite;
    }

    ExtendMouseEvent(event) {
        event.active = true;
        event.canvasX = event.pageX - this.canvas.offsetLeft;
        event.canvasY = event.pageY - this.canvas.offsetTop;
    }

    UpdateDragState() {
        var draggedSprite = this.gameController.gameState.GetDragged();
        if (draggedSprite) {
            this.sprite.DisableRecursive();
            this.sprite.enabled = true;
        }
        else {
            this.sprite.EnableRecursive();
        }
    }

    DrawHitbox() {
        var hitContext = this.hitCanvas.getContext('2d', { alpha: false });
        hitContext.clearRect(0, 0, this.hitCanvas.width, this.hitCanvas.height);
        HitColorIndex.Initialize();
        this.sprite.DrawHitBoxOnContext(hitContext);
    }

    GetMouseSprite(event) {
        var context = this.hitCanvas.getContext('2d', { alpha: false });
        try {
            var pixel = context.getImageData(event.canvasX, event.canvasY, 1, 1).data;

            //DO NOT DELETE! TODO use this if stutter comes back
            //var startIndex = (this.hitCanvas.width * (event.canvasY - 1) + event.canvasX - 1) * 4;
            //var pixel = [
            //    this.hitImageData[startIndex],
            //    this.hitImageData[startIndex + 1],
            //    this.hitImageData[startIndex + 2],
            //    this.hitImageData[startIndex + 3]];
        }
        catch (err) {
            TraceError(err);
            return null;
        }

        var color = new Color(pixel[0], pixel[1], pixel[2]);
        var mouseSprite = HitColorIndex.Get(color);
        return mouseSprite;
    }
}