class TextUI {
    constructor(
        gameController,
        text,
        width,
        height,
        font = BUTTON_LABEL_FONT,
        colorRGB = BUTTON_LABEL_COLOR,
        alignX = ALIGN_MIDDLE,
        alignY = ALIGN_MIDDLE,
        offsetX = 0,
        offsetY = 0) {
        Validator.ValidateObject(gameController, "TextUI.ctor.gameController", GameController);
        Validator.ValidateNumber(width, "TextUI.ctor.width");
        Validator.ValidateNumber(height, "TextUI.ctor.height");
        Validator.ValidateNumber(offsetX, "TextUI.ctor.offsetX");
        Validator.ValidateNumber(offsetY, "TextUI.ctor.offsetY");
        Validator.ValidateString(font, "TextUI.ctor.font");
        Validator.ValidateString(colorRGB, "TextUI.ctor.colorRGB");

        this.gameController = gameController;
        this.text = text;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.font = font;
        this.colorRGB = colorRGB;
        this.alignX = alignX;
        this.alignY = alignY;

        this.Initialize();
    }

    Initialize() {
        this.sprite = new Sprite(new EmptyBitmap(this.width, this.height));
        this.sprite.hitBox = false;

        this.textSprite = new Sprite();
        this.textSprite.hitBox = false;
        this.sprite.AddChild(this.textSprite);

        this.UpdateBitmap();
    }

    GetNewBitmap() {
        return new TextBitmap(
            this.text,
            this.font,
            this.colorRGB);
    }

    UpdateBitmap() {
        this.textSprite.SetBitmap(this.GetNewBitmap());

        if (this.alignX === ALIGN_LEFT) {
            this.textSprite.x = this.offsetX;
        }
        else if (this.alignX === ALIGN_RIGHT) {
            this.textSprite.x = this.width - this.textSprite.width - this.offsetX;
        }
        else if (this.alignX === ALIGN_MIDDLE) {
            this.textSprite.x = this.width / 2 - this.textSprite.width / 2 + this.offsetX;
        }

        if (this.alignY === ALIGN_UP) {
            this.textSprite.y = this.offsetY;
        }
        else if (this.alignY === ALIGN_DOWN) {
            this.textSprite.y = this.height - this.textSprite.height - this.offsetY;
        }
        else if (this.alignY === ALIGN_MIDDLE) {
            this.textSprite.y = this.height / 2 - this.textSprite.height / 2 + this.offsetY;
        }
    }
}