class DrawWindow {
    constructor(gameController, parentElm) {
        TraceInfo("DrawWindow.ctor");
        Validator.ValidateObject(gameController, "DrawWindow.ctor.gameController", GameController);
        Validator.ValidateValue(parentElm, "DrawWindow.ctor.parentElm");

        this.gameController = gameController;
        this.parentElm = parentElm;

        this.Initialize();
    }

    Initialize() {
        this.baseWindow = new BaseWindow(
            this.gameController,
            DrawWindow.GetWindowName(),
            this.parentElm,
            "");

        this.sprite = new Sprite(new EmptyBitmap(this.baseWindow.width, this.baseWindow.height));
        this.sprite.hitBox = false;
        this.baseWindow.sprite.AddChild(this.sprite);

        this.craftUI = new CraftUI(this.gameController, this.sprite);
        this.craftUI.Display();
    }

    Update() {
        this.craftUI.Update();

        this.baseWindow.Update();
    }

    Display() {
        TraceInfo("DrawWindow.Display");
        this.baseWindow.Display();
    }

    static GetWindowName() { return "WINDOW_DRAW"; }
}