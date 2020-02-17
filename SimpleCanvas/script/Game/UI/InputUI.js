const INPUT_WIDTH = 210;
const INPUT_HEIGHT = 30;
const INPUT_TEXT_COLOR = "rgb(255,255,255)";
const INPUT_TEXT_FONT = "24px Consolas";
const INPUT_FRAME_COLOR = "rgb(88,189,189)";

class InputUI {
    constructor(
        gameController,
        placeHolder = "",
        width = INPUT_WIDTH,
        height = INPUT_HEIGHT,
        alignX = ALIGN_LEFT,
        alignY = ALIGN_MIDDLE) {
        Validator.ValidateObject(gameController, "InputUI.ctor.gameController", GameController);
        Validator.ValidateNumber(width, "InputUI.ctor.width");
        Validator.ValidateNumber(height, "InputUI.ctor.height");
        Validator.ValidateNumber(alignX, "InputUI.ctor.alignX");
        Validator.ValidateNumber(alignY, "InputUI.ctor.alignY");

        this.gameController = gameController;
        this.placeHolder = placeHolder;
        this.width = width;
        this.height = height;
        this.alignX = alignX;
        this.alignY = alignY;

        this.carrotInterval = 500;

        this.carrot = false;
        var now = performance.now();
        this.lastToggle = now;
        this.lastUpdate = now;

        this.Initialize();
    }

    Initialize() {
        TraceInfo("InputUI.Initialize");
        this.sprite = new Sprite(new EmptyBitmap(this.width, this.height));
        this.sprite.visible = false;

        this.bgSprite = new Sprite(new FillRectBitmap(this.width, this.height, Color.GetRGBString(4, 41, 71)));
        this.bgSprite.alpha = 0.5;
        this.bgSprite.hitBox = false;
        this.sprite.AddChild(this.bgSprite);

        this.bgFrameSprite = new Sprite(new StrokeRectBitmap(this.width, this.height, 3, INPUT_FRAME_COLOR));
        this.bgFrameSprite.hitBox = false;
        this.sprite.AddChild(this.bgFrameSprite);

        this.inputText = new TextUI(
            this.gameController,
            "",
            this.width,
            this.height,
            INPUT_TEXT_FONT,
            INPUT_TEXT_COLOR,
            this.alignX,
            this.alignY,
            3);
        this.sprite.AddChild(this.inputText.sprite);

        this.placeHolderText = new TextUI(
            this.gameController,
            this.placeHolder,
            this.width,
            this.height,
            INPUT_TEXT_FONT,
            INPUT_TEXT_COLOR,
            this.alignX,
            this.alignY,
            3);
        this.placeHolderText.textSprite.alpha = 0.7;
        this.placeHolderText.sprite.SetVisibleRecursive(false);
        this.sprite.AddChild(this.placeHolderText.sprite);

        this.carrotSprite = new Sprite(new FillRectBitmap(2, this.height - 4, INPUT_TEXT_COLOR));
        this.carrotSprite.hitBox = false;
        this.carrotSprite.visible = false;
        this.carrotSprite.x = this.width - 6;
        this.carrotSprite.y = 2;
        this.sprite.AddChild(this.carrotSprite);

        var localSelf = this;
        this.sprite.OnMouseDown = () => { localSelf.gameController.gameState.SetFocusInput(localSelf); };
    }

    Update() {
        var focusInput = this.gameController.gameState.GetFocusInput();
        var focused = focusInput && focusInput.sprite.id === this.sprite.id;

        var sinceToggle = performance.now() - this.lastToggle;

        if (sinceToggle > this.carrotInterval && focused) {
            this.carrotSprite.SetVisibleRecursive(!this.carrotSprite.visible);

            this.lastToggle = performance.now();
        }

        if (this.inputText.text.length > 0 || focused) {
            this.placeHolderText.sprite.SetVisibleRecursive(false);
            //this.carrotSprite.x = this.inputText.text.length * 13.2 + 4;
            this.carrotSprite.x = this.inputText.textSprite.width + 4;
        }
        else {
            this.placeHolderText.sprite.SetVisibleRecursive(true);
        }

        if (!focused) {
            this.carrotSprite.SetVisibleRecursive(false);
        }
    }

    OnKeyUp(event) {
        if (event.keyCode == 13) { //enter

        }

        if (event.keyCode == 37
            || event.keyCode == 38
            || event.keyCode == 39
            || event.keyCode == 40
            //|| event.keyCode == 32 //space
        ) {
            event.preventDefault();
        }
    }

    OnKeyDown(event) {
        if (event.keyCode == 8) { // backspace
            if (this.inputText.text.length >= 1) {
                this.inputText.text = this.inputText.text.substring(0, this.inputText.text.length - 1);
                this.inputText.UpdateBitmap();
            }
        }
        else {
            //if (!inventoryView.activeItem) {
            //    if (event.keyCode == Keyboard.BACKSPACE) {
            //        chatInput.text = chatInput.text.substr(0, chatInput.text.length - 1);
            //    }
            //    else {
            //        var char: String = String.fromCharCode(event.charCode);
            //        char = char.replace(Global.nonAlphaNumeric, "");

            //        if (char) {
            //            chatInput.text = chatInput.text + char;
            //        }
            //    }
            //}
        }


        if (event.keyCode == 37
            || event.keyCode == 38
            || event.keyCode == 39
            || event.keyCode == 40
            //|| event.keyCode == 32 //space
        ) {
            event.preventDefault();
        }
    }

    OnKeyPress(event) {
        var char = String.fromCharCode(event.keyCode);
        char = char.replace("/[^a-zA-Z 0-9]+/g", "");

        if (char) {
            var newText = this.inputText.text + char;
            var newWidth = CanvasUtil.GetTextSize(newText, this.inputText.font).x;
            if (newWidth < this.width - 4) {
                this.inputText.text = newText;
                this.inputText.UpdateBitmap();
            }
        }

        if (event.keyCode == 37
            || event.keyCode == 38
            || event.keyCode == 39
            || event.keyCode == 40
            || event.keyCode == 32 //space
        ) {
            event.preventDefault();
        }
    }
}