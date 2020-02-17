class ListElementUI {
    constructor(
        gameController,
        onClick,
        labelText,
        width = INPUT_WIDTH,
        height = INPUT_HEIGHT,
        labelAlignX = ALIGN_LEFT,
        labelAlignY = ALIGN_MIDDLE) {
        Validator.ValidateObject(gameController, "ListElementUI.ctor.gameController", GameController);
        Validator.ValidateFunction(onClick, "ListElementUI.ctor.onClick");
        Validator.ValidateNumber(width, "ListElementUI.ctor.width");
        Validator.ValidateNumber(height, "ListElementUI.ctor.height");
        Validator.ValidateNumber(labelAlignX, "ListElementUI.ctor.labelAlignX");
        Validator.ValidateNumber(labelAlignY, "ListElementUI.ctor.labelAlignY");

        this.gameController = gameController;
        this.OnClick = onClick;
        this.labelText = labelText;
        this.width = width;
        this.height = height;
        this.labelAlignX = labelAlignX;
        this.labelAlignY = labelAlignY;

        this.Initialize();
    }

    Initialize() {
        if (!this.color) {
            this.color = new Color(0, 0, 150);
        }

        this.sprite = new Sprite(new EmptyBitmap(this.width, this.height));
        this.sprite.visible = false;

        this.bgFrameSprite = new Sprite(new StrokeRectBitmap(this.width, this.height, 3, INPUT_FRAME_COLOR));
        this.bgFrameSprite.hitBox = false;
        this.sprite.AddChild(this.bgFrameSprite);

        if (this.labelText) {
            this.labelUI = new TextUI(
                this.gameController,
                this.labelText,
                this.width,
                this.height,
                BUTTON_LABEL_FONT,
                INPUT_FRAME_COLOR,
                this.labelAlignX, this.labelAlignY,
                3);
            this.sprite.AddChild(this.labelUI.sprite);
        }

        this.sprite.OnClick = this.OnClick;
    }
}