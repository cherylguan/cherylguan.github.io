class GameController {
    constructor(eventHub) {
        TraceInfo("GameContoller.ctor");
        Validator.ValidateValue(eventHub, "GameController.eventHub");
        this.eventHub = eventHub;
    }

    SetUIController(uiController) {
        TraceInfo("GameContoller.SetUIController");
        Validator.ValidateObject(uiController, "GameContoller.SetUIController.uiController", UIController);
        this.uiController = uiController;
    }

    SetAssetManager(assetManager) {
        TraceInfo("GameContoller.SetAssetManager");
        Validator.ValidateObject(assetManager, "GameContoller.SetAssetManager.assetManager", AssetManager);
        this.assetManager = assetManager;
    }

    SetGameState(gameState) {
        TraceInfo("GameContoller.SetGameState");
        Validator.ValidateObject(gameState, "GameContoller.SetGameState.gameState", GameState);
        this.gameState = gameState;
    }

    SetGameUpdateService(gameUpdateService) {
        TraceInfo("GameContoller.SetGameUpdateService");
        Validator.ValidateObject(gameUpdateService, "GameContoller.SetGameUpdateService.gameUpdateService", GameUpdateService);
        this.gameUpdateService = gameUpdateService;
    }

    Tick(millisecondsSinceLastTick) {
        this.uiController.Update();
    }

    OpenWindow(windowName) {
        if (windowName === LoginWindow.GetWindowName()) {
            this.uiController.DisplayLogin();
        }
        else if (windowName === AccountWindow.GetWindowName()) {
            this.uiController.DisplayAccount();
        }
        else if (windowName === GameWindow.GetWindowName()) {
            this.uiController.DisplayGameWindow();
        }
        else if (windowName === DrawWindow.GetWindowName()) {
            this.uiController.DisplayDrawWindow();
        }
    }

    StartDragDisplayObject(obj, grabCanvasX, grabCanvasY) {
        var draggedSprite = obj.sprite;
        var pos = obj.sprite.GetPosition();
        draggedSprite.x = pos.x;
        draggedSprite.y = pos.y;
        var grab = new Point(grabCanvasX - pos.x, grabCanvasY - pos.y);
        draggedSprite.dragGrabPos = grab;
        this.uiController.currentWindow.baseWindow.sprite.AddChild(draggedSprite);
        this.gameState.SetDragged(obj);
    }

    IsDisplayObjectDragged(obj) {
        var dragged = this.gameState.GetDragged();
        return obj && dragged && obj.body && dragged.body && obj.body.id === dragged.body.id;
    }
}