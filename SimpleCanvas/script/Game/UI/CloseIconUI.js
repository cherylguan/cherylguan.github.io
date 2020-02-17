class CloseIconUI {
    constructor(
        gameController,
        onClick,
        size = 20) {
        TraceInfo("CloseIconUI.ctor");

        Validator.ValidateObject(gameController, "CloseIconUI.ctor.gameController", GameController);
        Validator.ValidateFunction(onClick, "CloseIconUI.ctor.onClick");
        Validator.ValidateNumber(size, "CloseIconUI.ctor.size");

        this.gameController = gameController;
        this.OnClick = onClick;
        this.size = size;

        this.Initialize();
    }

    Initialize() {
        TraceInfo("AdjusterUI.Initialize");
        var localSelf = this;

        this.sprite = new Sprite(new FillRectBitmap(this.size, this.size, Color.GetRGBString(200, 200, 200)));
        this.sprite.OnClick = () => {
            localSelf.OnClick();
        };

        var closeIconSprite = new Sprite(this.gameController.assetManager.GetClonedBitmap(IMG_X, this.size, this.size));
        closeIconSprite.hitBox = false;
        this.sprite.AddChild(closeIconSprite);
    }
}