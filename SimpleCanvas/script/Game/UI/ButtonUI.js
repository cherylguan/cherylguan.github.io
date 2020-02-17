const BUTTON_MARGIN = 10;
const BUTTON_WIDTH = 100;
const BUTTON_HEIGHT = 30;
const BUTTON_LABEL_FONT = "24px Consolas";
const BUTTON_LABEL_COLOR = "rgb(255,255,255)";

class ButtonUI {
    constructor(
        gameController,
        onClick,
        labelText,
        width = BUTTON_WIDTH,
        height = BUTTON_HEIGHT,
        labelAlignX = ALIGN_MIDDLE,
        labelAlignY = ALIGN_MIDDLE) {
        Validator.ValidateObject(gameController, "ButtonUI.ctor.gameController", GameController);
        Validator.ValidateFunction(onClick, "ButtonUI.ctor.onClick");
        Validator.ValidateNumber(width, "ButtonUI.ctor.width");
        Validator.ValidateNumber(height, "ButtonUI.ctor.height");
        Validator.ValidateNumber(labelAlignX, "ButtonUI.ctor.labelAlignX");
        Validator.ValidateNumber(labelAlignY, "ButtonUI.ctor.labelAlignY");

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
        this.sprite = new Sprite(new EmptyBitmap(this.width, this.height));
        //this.sprite = new Sprite(new FillRectBitmap(this.width, this.height, Color.GetRGBString(255, 0, 0)));

        if (this.labelText) {
            this.labelUI = new TextUI(
                this.gameController,
                this.labelText,
                this.width,
                this.height,
                BUTTON_LABEL_FONT,
                BUTTON_LABEL_COLOR,
                this.labelAlignX, this.labelAlignY);
            this.sprite.AddChild(this.labelUI.sprite);
        }

        this.sprite.OnClick = this.OnClick;
    }
}