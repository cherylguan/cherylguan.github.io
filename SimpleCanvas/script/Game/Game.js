class Game {
    constructor() {
        this.eventHub = document.createElement("div");
        this.gameController = new GameController(this.eventHub);
        this.assetManager = new AssetManager(this.gameController);
        this.uiController = new UIController(document.body, this.gameController);
        this.gameUpdateService = new GameUpdateService(this.gameController);
    }

    Initialize() {
        this.gameController.SetUIController(this.uiController);
        this.gameController.SetAssetManager(this.assetManager);
        this.gameController.SetGameState(new GameState());
        this.gameController.SetGameUpdateService(this.gameUpdateService);

        this.assetManager.Initialize();
        var localUIController = this.uiController;
        var localGameUpdateService = this.gameUpdateService;
        this.eventHub.addEventListener(
            AssetManager.LoadCompleteEventName(),
            () => {
                localUIController.Initialize();
                localGameUpdateService.Initialize();
                localGameUpdateService.Start();

                var drawButton = document.createElement("button");
                drawButton.innerHTML = "Draw";
                drawButton.onclick = () => { localUIController.DisplayDrawWindow(); };
                document.body.appendChild(drawButton);
            },
            false);
    }
}