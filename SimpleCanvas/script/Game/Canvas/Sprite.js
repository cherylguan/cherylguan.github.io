SPRITE_FILL = "Fill";
SPRITE_STROKE = "Stroke";
SPRITE_EMPTY = "Empty";
SPRITE_IMAGE = "Image";

class Sprite {
    constructor(bitmap = null, x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.id = GameUtil.GetNewGuid();

        this.children = {}; // I DrawOnContext, DrawHitBoxOnContext
        this.childrenDrawOrder = [];

        this.SetBitmap(bitmap);

        this.visible = true; // draw this bitmap on context
        this.hitBox = true; // draw this bitmap on hitbox context
        this.drawClipped = false;
        this.repositionEnabled = false;

        this.bubbleAllEvents = false;

        this.bubbleClick = false; // bubble click to parent
        this.clickEnabled = true; // call this.OnClick
        this.OnClick = null;

        this.bubbleMouseOver = false;
        this.mouseOverEnabled = true;
        this.OnMouseOver = null;

        this.bubbleMouseOut = false;
        this.mouseOutEnabled = true;
        this.OnMouseOut = null;

        this.bubbleMouseMove = false;
        this.mouseMoveEnabled = true;
        this.OnMouseMove = null;

        this.bubbleMouseDown = false;
        this.mouseDownEnabled = true;
        this.OnMouseDown = null;
        this.lastMouseDown = null; // used for determining double click.

        this.bubbleDoubleClick = false;
        this.doubleClickEnabled = true;
        this.OnDoubleClick = null;

        this.bubbleMouseUp = false;
        this.mouseUpEnabled = true;
        this.OnMouseUp = null;

        this.bubbleMouseWheel = false;
        this.mouseWheelEnabled = true;
        this.OnMouseWheel = null;

        this.bubbleKeyDown = false;
        this.keyDownEnabled = true;
        this.OnKeyDown = null;

        this.bubbleKeyUp = false;
        this.keyUpEnabled = true;
        this.OnKeyUp = null;

        this.bubbleKeyPress = false;
        this.keyPressEnabled = true;
        this.OnKeyPress = null;

        this.rotationCW = 0; // from up
        this.scaleX = 1;
        this.scaleY = 1;
        this.alpha = 1;

        this.enabled = true;

        this.hitBoxColor = Color.FromRandom();

        this.OnDroppedOnTarget = null;
        this.OnDropReceived = null;
    }

    SetBitmap(bitmap) {
        this.bitmap = bitmap;

        if (this.bitmap) {
            this.width = this.bitmap.width;
            this.height = this.bitmap.height;
        }
        else {
            this.width = 0;
            this.height = 0;
        }
    }

    AddChild(child) {
        Validator.ValidateValue(child, "Sprite.AddChild.child");
        Validator.ValidateFunction(child.DrawOnContext, "Sprite.AddChild.child");
        Validator.ValidateObject(child, "Sprite.AddChild.child", Sprite);
        child.parent = this;
        this.children[child.id] = child;
        this.childrenDrawOrder.push(child);
    }

    RemoveChild(id) {
        delete this.children[id];
        var i;
        for (i = 0; i < this.childrenDrawOrder.length; i++) {
            var child = this.childrenDrawOrder[i];
            if (child.id === id) {
                this.childrenDrawOrder.splice(i, 1);
                i--;
            }
        }
    }

    TopChild(id) {
        var i;
        var found;
        for (i = 0; !found && i < this.childrenDrawOrder.length; i++) {
            var child = this.childrenDrawOrder[i];
            if (child.id === id) {
                this.childrenDrawOrder.splice(i, 1);
                i--;
                found = child;
            }
        }

        this.childrenDrawOrder.push(found);
    }

    DisposeSprite() {
        this.DisposeSpriteChildren();
    }

    DisposeSpriteChildren() {
        this.children = {};
        this.childrenDrawOrder = [];
    }

    SetVisibleRecursive(visible) {
        this.ApplyRecursive(
            (sprite) => {
                sprite.visible = visible;
            });
    }

    SetHitBoxRecursive(hitBox) {
        this.ApplyRecursive(
            (sprite) => { sprite.hitBox = hitBox; });
        //var childrenArray = JSUtil.ToArray(this.children);
        //childrenArray.forEach((c) => { c.SetHitBoxRecursive(hitBox); });
        //this.hitBox = hitBox;
    }

    EnableRecursive() {
        this.ApplyRecursive(
            (sprite) => { sprite.enabled = true; });
    }

    DisableRecursive() {
        this.ApplyRecursive(
            (sprite) => { sprite.enabled = false; });
    }

    GetPopulation() {
        var count = 0;
        var childrenArray = JSUtil.ToArray(this.children);
        childrenArray.forEach((c) => { count += c.GetPopulation(); });
        count++;
        return count;
    }

    ApplyRecursive(func) {
        Validator.ValidateFunction(func, "Sprite.ApplyRecursive.func");
        var childrenArray = JSUtil.ToArray(this.children);
        childrenArray.forEach((c) => { c.ApplyRecursive(func); });
        func(this);
    }

    RotateCW(radians) {
        this.rotationCW += radians;
    }

    Scale(x, y) {
        this.scaleX *= x;
        this.scaleY *= y;
    }

    DrawOnContextHelper(context) {
        Validator.ValidateValue(context, "Sprite.DrawOnContext.context");

        context.save();

        context.translate(this.x, this.y);
        context.translate(this.width / 2, this.height / 2);
        context.rotate(this.rotationCW);
        context.scale(this.scaleX, this.scaleY);
        context.translate(-this.width / 2, -this.height / 2);
        context.globalAlpha = this.alpha;

        if (this.bitmap && this.visible) {
            this.bitmap.DrawOnContext(context);
        }

        if (!this.drawClipped) {
            //var childrenArray = JSUtil.ToArray(this.children);
            this.childrenDrawOrder.forEach((c) => { c.DrawOnContext(context); });
        }

        context.restore();
    }

    DrawOnContext(context) {
        Validator.ValidateValue(context, "Sprite.DrawOnContext.context");

        if (this.drawClipped) {
            if (this.width < 1 || this.height < 1) {
                throw "Clip sprite must have size";
            }

            if (!this.clipBitmap) {
                this.clipBitmap = CanvasBitmap.FromEmpty(this.width, this.height);
            }

            var clippingContext = this.clipBitmap.canvas.getContext('2d');
            clippingContext.clearRect(0, 0, this.clipBitmap.canvas.width, this.clipBitmap.canvas.height);

            if (this.bitmap && this.visible) {
                this.bitmap.DrawOnContext(clippingContext);
            }

            //var childrenArray = JSUtil.ToArray(this.children);
            this.childrenDrawOrder.forEach((c) => { c.DrawOnContext(clippingContext); });

            this.SetBitmap(this.clipBitmap);
        }

        this.DrawOnContextHelper(context);
    }

    DrawHitBoxOnContext(context) {
        Validator.ValidateValue(context, "Sprite.DrawOnContext.context");
        context.save();

        context.translate(this.x, this.y);
        context.translate(this.width / 2, this.height / 2);
        context.rotate(this.rotationCW);
        context.scale(this.scaleX, this.scaleY);
        context.translate(-this.width / 2, -this.height / 2);
        context.globalAlpha = 1;

        if (this.bitmap && this.hitBox && this.enabled) {
            //var hitBitmap = new FillRectBitmap(this.bitmap.width, this.bitmap.height, this.hitBoxColor.ToRGBString());
            //hitBitmap.DrawOnContext(context);

            this.bitmap.DrawHitBoxOnContext(context, this.hitBoxColor.ToRGBString());
            HitColorIndex.Add(this.hitBoxColor, this);
        }

        //var childrenArray = JSUtil.ToArray(this.children);
        this.childrenDrawOrder.forEach((c) => { c.DrawHitBoxOnContext(context); });

        context.restore();
    }

    //relative to root
    GetPosition() {
        var pageX = this.x;
        var pageY = this.y;
        if (this.parent) {
            var parentPos = this.parent.GetPosition();
            pageX += parentPos.x;
            pageY += parentPos.y;
        }

        return new Point(pageX, pageY);
    }

    HandleClickEvent(event) {
        if (!event.active) {
            return;
        }

        if (this.clickEnabled && this.OnClick) {
            this.OnClick(event);
        }

        if ((this.bubbleAllEvents || this.bubbleClick) && this.parent) {
            this.parent.HandleClickEvent(event);
        }
    }

    HandleMouseOverEvent(event) {
        if (!event.active) {
            return;
        }

        if (this.mouseOverEnabled && this.OnMouseOver) {
            this.OnMouseOver(event);
        }

        if ((this.bubbleAllEvents || this.bubbleMouseOver) && this.parent) {
            this.parent.HandleMouseOverEvent(event);
        }
    }

    HandleMouseOutEvent(event) {
        if (!event.active) {
            return;
        }

        this.dragStarted = null;

        if (this.mouseOutEnabled && this.OnMouseOut) {
            this.OnMouseOut(event);
        }

        if ((this.bubbleAllEvents || this.bubbleMouseOut) && this.parent) {
            this.parent.HandleMouseOutEvent(event);
        }
    }

    HandleMouseMoveEvent(event) {
        if (!event.active) {
            return;
        }

        if (this.dragStarted && this.repositionEnabled) {
            var mousePos = new Point(event.canvasX, event.canvasY);

            var difX = mousePos.x - this.dragStarted.x;
            var difY = mousePos.y - this.dragStarted.y;
            if (Math.abs(difX) > 3 || Math.abs(difY) > 3) {
                this.x += difX;
                this.y += difY;

                this.dragStarted = mousePos;
            }
        }

        if (this.mouseMoveEnabled && this.OnMouseMove) {
            this.OnMouseMove(event);
        }

        if ((this.bubbleAllEvents || this.bubbleMouseMove) && this.parent) {
            this.parent.HandleMouseMoveEvent(event);
        }
    }

    HandleDoubleClickEvent(event) {
        if (!event.active) {
            return;
        }

        if (this.doubleClickEnabled && this.OnDoubleClick) {
            this.OnDoubleClick(event);
        }

        if ((this.bubbleAllEvents || this.bubbleDoubleClick) && this.parent) {
            this.parent.HandleDoubleClickEvent(event);
        }
    }

    HandleMouseDownEvent(event) {
        if (!event.active) {
            return;
        }

        if (this.lastMouseDown && performance.now() - this.lastMouseDown < 500) {
            this.HandleDoubleClickEvent(event);
            this.lastMouseDown = null;
        }
        else {
            this.lastMouseDown = performance.now();
        }

        var mousePos = new Point(event.canvasX, event.canvasY);
        this.dragStarted = mousePos;

        if (this.mouseDownEnabled && this.OnMouseDown) {
            this.OnMouseDown(event);
        }

        if ((this.bubbleAllEvents || this.bubbleMouseDown) && this.parent) {
            this.parent.HandleMouseDownEvent(event);
        }
    }

    HandleMouseUpEvent(event) {
        if (!event.active) {
            return;
        }

        this.dragStarted = null;

        if (this.mouseUpEnabled && this.OnMouseUp) {
            this.OnMouseUp(event);
        }

        if ((this.bubbleAllEvents || this.bubbleMouseUp) && this.parent) {
            this.parent.HandleMouseUpEvent(event);
        }
    }

    HandleMouseWheelEvent(event) {
        if (!event.active) {
            return;
        }

        if (this.mouseWheelEnabled && this.OnMouseWheel) {
            this.OnMouseWheel(event);
        }

        if ((this.bubbleAllEvents || this.bubbleMouseWheel) && this.parent) {
            this.parent.HandleMouseWheelEvent(event);
        }
    }

    HandleKeyDownEvent(event) {
        if (!event.active) {
            return;
        }

        if (this.keyDownEnabled && this.OnKeyDown) {
            this.OnKeyDown(event);
        }

        if ((this.bubbleAllEvents || this.bubbleKeyDown) && this.parent) {
            this.parent.HandleKeyDownEvent(event);
        }

        //var childrenArray = JSUtil.ToArray(this.children);
        //childrenArray.forEach((c) => { c.HandleKeyDownEvent(event); });
    }

    HandleKeyUpEvent(event) {
        if (!event.active) {
            return;
        }

        if (this.keyUpEnabled && this.OnKeyUp) {
            this.OnKeyUp(event);
        }

        if ((this.bubbleAllEvents || this.bubbleKeyUp) && this.parent) {
            this.parent.HandleKeyUpEvent(event);
        }

        //var childrenArray = JSUtil.ToArray(this.children);
        //childrenArray.forEach((c) => { c.HandleKeyUpEvent(event); });
    }

    HandleKeyPressEvent(event) {
        if (!event.active) {
            return;
        }

        if (this.keyPressEnabled && this.OnKeyPress) {
            this.OnKeyPress(event);
        }

        if ((this.bubbleAllEvents || this.bubbleKeyPress) && this.parent) {
            this.parent.HandleKeyPressEvent(event);
        }

        //var childrenArray = JSUtil.ToArray(this.children);
        //childrenArray.forEach((c) => { c.HandleKeyUpEvent(event); });
    }

    //HandleClickEvent(event) {
    //    if (event.handled) {
    //        return;
    //    }

    //    var childrenArray = JSUtil.ToArray(this.children).reverse();
    //    var i;
    //    for (i = 0; i < childrenArray.length && !event.handled; i++) {
    //        var child = childrenArray[i];
    //        child.HandleClickEvent(event);
    //    }

    //    if (event.handled) {
    //        return;
    //    }

    //    if (this.hitBoxR === event.colorR
    //        && this.hitBoxG === event.colorG
    //        && this.hitBoxB === event.colorB) {
    //        if (!this.disabled && this.OnMouseClick) {
    //            this.OnMouseClick();
    //        }

    //        event.handled = true;
    //    }
    //}



    ////point relative to root (mostly where window canvas is, depends on sprite hierarchy)
    //IsPointOn(point) {
    //    Validator.ValidateObject(point, "Sprite.IsPointOn.point", Point);

    //    return CanvasUtil.IsPointOnRect(point, this.GetCenter(), this.width, this.height);
    //}

    ////relative to root sprite
    //GetCenter() {
    //    var pos = this.GetPosition();
    //    return new Point(pos.x + this.width / 2, pos.y + this.height / 2);
    //}
}