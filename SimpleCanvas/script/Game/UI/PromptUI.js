PROMPT_WIDTH = 450;
PROMPT_HEIGHT = 150;

class PromptUI {
    constructor(
        gameController,
        label,
        onOK,
        onCancel,
        placeHolder = "",
        width = PROMPT_WIDTH,
        height = PROMPT_HEIGHT) {
        Validator.ValidateObject(gameController, "PromptUI.ctor.gameController", GameController);
        Validator.ValidateFunction(onOK, "PromptUI.ctor.onOK");
        Validator.ValidateFunction(onCancel, "PromptUI.ctor.onCancel");
        Validator.ValidateNumber(width, "PromptUI.ctor.width");
        Validator.ValidateNumber(height, "PromptUI.ctor.height");

        this.gameController = gameController;
        this.label = label;
        this.OnOK = onOK;
        this.OnCancel = onCancel;
        this.placeHolder = placeHolder;
        this.width = width;
        this.height = height;

        this.Initialize();
    }

    Initialize() {
        this.sprite = new Sprite(new EmptyBitmap(this.width, this.height));

        //this.bgBitmap = this.gameController.assetManager.GetRefBitmap(IMG_METAL, this.sprite.width, this.sprite.height);
        this.bgBitmap = new FillRectBitmap(this.sprite.width, this.sprite.height, PANEL_COLOR);
        this.bgSprite = new Sprite(this.bgBitmap);
        this.bgSprite.hitBox = false;
        this.sprite.AddChild(this.bgSprite);

        this.bgFrameBitmap = new StrokeRectBitmap(this.bgSprite.width, this.bgSprite.height, 3, INPUT_FRAME_COLOR);
        this.bgFrameSprite = new Sprite(this.bgFrameBitmap);
        this.bgFrameSprite.hitBox = false;
        this.bgSprite.AddChild(this.bgFrameSprite);

        this.panelSprite = new Sprite(new EmptyBitmap(this.sprite.width, this.sprite.height - BUTTON_HEIGHT));
        this.panelSprite.hitBox = false;
        this.sprite.AddChild(this.panelSprite);

        this.buttonSprite = new Sprite(new EmptyBitmap(this.sprite.width, BUTTON_HEIGHT));
        //this.buttonSprite = new Sprite(new FillRectBitmap(this.sprite.width, BUTTON_HEIGHT, Color.GetRGBString(0,255,0)));
        this.buttonSprite.hitBox = false;
        this.sprite.AddChild(this.buttonSprite);

        var localSelf = this;
        this.okButton = new ButtonUI(this.gameController, () => { localSelf.HandleOKEvent(); }, "OK");
        this.buttonSprite.AddChild(this.okButton.sprite);
        this.cancelButton = new ButtonUI(this.gameController, () => { localSelf.HandleCancelEvent(); }, "Cancel");
        this.buttonSprite.AddChild(this.cancelButton.sprite);

        this.labelText = new TextUI(
            this.gameController,
            this.label,
            this.width - 2 * BUTTON_MARGIN,
            BUTTON_HEIGHT,
            BUTTON_LABEL_FONT,
            BUTTON_LABEL_COLOR,
            ALIGN_LEFT);
        this.panelSprite.AddChild(this.labelText.sprite);

        this.input = new InputUI(
            this.gameController,
            this.placeHolder,
            this.width - 2 * BUTTON_MARGIN);
        this.panelSprite.AddChild(this.input.sprite);

        Alignment.AlignObjectsXRef(
            this.buttonSprite,
            BUTTON_MARGIN, 0, 0,
            ALIGN_MIDDLE,
            this.okButton.sprite,
            this.cancelButton.sprite);

        Alignment.AlignObjectsYRef(
            this.panelSprite,
            BUTTON_MARGIN, 0, 0,
            ALIGN_MIDDLE,
            this.labelText.sprite,
            this.input.sprite);

        Alignment.AlignObjectsYRef(this.sprite, 0, 0, 0, ALIGN_MIDDLE,
            this.panelSprite,
            this.buttonSprite);
    }

    Update() {
        this.input.Update();
    }

    HandleOKEvent() {
        TraceInfo("PromptUI.HandleOKEvent");

        if (this.OnOK) {
            this.OnOK(this);
        }
    }

    HandleCancelEvent() {
        TraceInfo("PromptUI.HandleCancelEvent");

        if (this.OnCancel) {
            this.OnCancel(this);
        }
    }

    GetDefaultInputValue() {
        return this.input ? this.input.inputText.text : null;
    }
}