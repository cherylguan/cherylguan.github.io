ADJUSTER_FONT = "15px Consolas";

class AdjusterUI {
    constructor(
        gameController,
        width,
        height,
        onMinusClick,
        onPlusClick,
        iconSize = 12) {
        TraceInfo("AdjusterUI.ctor");

        Validator.ValidateObject(gameController, "AdjusterUI.ctor.gameController", GameController);
        Validator.ValidateNumber(width, "AdjusterUI.ctor.width");
        Validator.ValidateNumber(height, "AdjusterUI.ctor.height");
        Validator.ValidateFunction(onMinusClick, "AdjusterUI.ctor.onMinusClick");
        Validator.ValidateFunction(onPlusClick, "AdjusterUI.ctor.onPlusClick");
        Validator.ValidateNumber(width, "AdjusterUI.ctor.iconSize");

        this.gameController = gameController;
        this.width = width;
        this.height = height;
        this.iconSize = iconSize;
        this.OnMinusClick = onMinusClick;
        this.OnPlusClick = onPlusClick;

        this.Initialize();
    }

    Initialize() {
        TraceInfo("AdjusterUI.Initialize");

        this.sprite = new Sprite(new EmptyBitmap(this.width, this.height));
        this.sprite.hitBox = false;

        this.labelText = new TextUI(
            this.gameController,
            "",
            this.width - 2 * this.iconSize - 2 * BUTTON_MARGIN,
            this.height,
            ADJUSTER_FONT,
            BUTTON_LABEL_COLOR,
            ALIGN_LEFT,
            ALIGN_MIDDLE
        );

        this.sprite.AddChild(this.labelText.sprite);

        this.minusSprite = new Sprite(new FillRectBitmap(this.iconSize, this.iconSize, Color.GetRGBString(200, 200, 200)));
        this.minusSprite.OnClick = this.OnMinusClick;
        this.sprite.AddChild(this.minusSprite);
        this.minusIconSprite = new Sprite(this.gameController.assetManager.GetClonedBitmap(IMG_MINUS, this.iconSize, this.iconSize));
        this.minusIconSprite.hitBox = false;
        this.minusSprite.AddChild(this.minusIconSprite);

        this.plusSprite = new Sprite(new FillRectBitmap(this.iconSize, this.iconSize, Color.GetRGBString(200, 200, 200)));
        this.plusSprite.OnClick = this.OnPlusClick;
        this.sprite.AddChild(this.plusSprite);
        this.plusIconSprite = new Sprite(this.gameController.assetManager.GetClonedBitmap(IMG_PLUS, this.iconSize, this.iconSize));
        this.plusIconSprite.hitBox = false;
        this.plusSprite.AddChild(this.plusIconSprite);

        Alignment.AlignObjectsXRef(
            this.sprite,
            BUTTON_MARGIN, 0, 0,
            ALIGN_MIDDLE,
            this.labelText.sprite,
            this.minusSprite,
            this.plusSprite);
    }
}