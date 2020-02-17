const UI_CHECKBOX_SIZE = 25;

class CheckboxUI {
    constructor(
        gameController,
        checked,
        onCheck,
        onUncheck,
        checkboxSize,
        labelText,
        width = BUTTON_WIDTH,
        height = BUTTON_HEIGHT,
        labelAlignX = ALIGN_MIDDLE,
        labelAlignY = ALIGN_MIDDLE) {
        Validator.ValidateObject(gameController, "CheckboxUI.ctor.gameController", GameController);
        Validator.ValidateFunction(onCheck, "CheckboxUI.ctor.onCheck");
        Validator.ValidateFunction(onUncheck, "CheckboxUI.ctor.onUncheck");
        Validator.ValidateNumber(checkboxSize, "CheckboxUI.ctor.checkboxSize");
        Validator.ValidateNumber(width, "CheckboxUI.ctor.width");
        Validator.ValidateNumber(height, "CheckboxUI.ctor.height");
        Validator.ValidateNumber(labelAlignX, "CheckboxUI.ctor.labelAlignX");
        Validator.ValidateNumber(labelAlignY, "CheckboxUI.ctor.labelAlignY");

        this.gameController = gameController;
        this.checked = checked;
        this.OnCheck = onCheck;
        this.OnUncheck = onUncheck;
        this.labelText = labelText;
        this.checkboxSize = checkboxSize;
        this.width = width;
        this.height = height;
        this.labelAlignX = labelAlignX;
        this.labelAlignY = labelAlignY;

        this.Initialize();
    }

    Initialize() {
        TraceInfo("CheckboxUI.Initialize");
        this.sprite = new Sprite(new EmptyBitmap(this.width, this.height));
        if (this.labelText) {
            this.labelUI = new TextUI(
                this.gameController,
                this.labelText,
                this.width - this.checkboxSize,
                this.height,
                BUTTON_LABEL_FONT,
                BUTTON_LABEL_COLOR,
                this.labelAlignX,
                this.labelAlignY);
            this.sprite.AddChild(this.labelUI.sprite);
        }

        this.checkedSprite = new Sprite(this.gameController.assetManager.GetRefBitmap(
            IMG_CHECKED,
            this.checkboxSize,
            this.checkboxSize));
        this.checkedSprite.hitBox = false;

        this.uncheckedSprite = new Sprite(this.gameController.assetManager.GetRefBitmap(
            IMG_UNCHECKED,
            this.checkboxSize,
            this.checkboxSize));
        this.uncheckedSprite.hitBox = false;

        this.checkboxSprite = new Sprite(new EmptyBitmap(this.checkboxSize, this.checkboxSize));
        this.checkboxSprite.hitBox = false;
        this.sprite.AddChild(this.checkboxSprite);

        Alignment.AlignRightRef(this.sprite, 0, 0, 0, ALIGN_MIDDLE, this.checkboxSprite);
        this.checkboxSprite.x -= this.checkboxSize;

        var localSelf = this;
        this.sprite.OnClick = () => {
            localSelf.OnClick();
        };

        this.UpdateVisuals();
    }

    UpdateVisuals() {
        TraceInfo("CheckboxUI.UpdateVisuals", this.checked);
        this.checkboxSprite.DisposeSpriteChildren();
        if (this.checked) {
            this.checkboxSprite.AddChild(this.checkedSprite);
        }
        else {
            this.checkboxSprite.AddChild(this.uncheckedSprite);
        }
    }

    OnClick() {
        TraceInfo("CheckboxUI.OnClick");
        if (this.checked) {
            if (this.OnUncheck) {
                this.OnUncheck();
            }

            this.checked = false;
        }
        else {
            if (this.OnCheck) {
                this.OnCheck();
            }

            this.checked = true;
        }

        this.UpdateVisuals();
    }
}