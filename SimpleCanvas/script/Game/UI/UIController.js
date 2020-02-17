class UIController {
    constructor(parentElm, gameController) {
        TraceInfo("UIController.ctor");

        Validator.ValidateValue(parentElm, "UIController.ctor.parentElm");
        Validator.ValidateObject(gameController, "MessageHandlerFactory.ctor.gameController", GameController);

        this.parentElm = parentElm;
        this.gameController = gameController;
        this.currentWindow = null;

        this.animationContainer = {};
    }

    Initialize() {
        TraceInfo("UIController.Initialize");
        this.gameDiv = document.createElement("div");
        //this.gameDiv.setAttribute("style", "float: top;");
        this.parentElm.appendChild(this.gameDiv);

        this.consoleDiv = document.createElement("div");
        //this.consoleDiv.setAttribute("style", "float: bottom;");
        this.parentElm.appendChild(this.consoleDiv);

        this.InitializeGameContainer();

        this.DisplayDrawWindow();
    }

    ClearGameContainer() {
        this.gameDiv.innerHTML = "";
        this.InitializeGameContainer();
        this.drawWindow = null;
    }

    InitializeGameContainer() {
        this.div1 = document.createElement("div");

        this.gameDiv.appendChild(this.div1);
    }

    DisplayDrawWindow() {
        TraceInfo("UIController.DisplayDrawWindow");
        this.ClearGameContainer();

        this.drawWindow = new DrawWindow(this.gameController, this.div1);
        this.drawWindow.Display();
        this.currentWindow = this.drawWindow;
    }

    Update() {
        this.currentWindow.Update();
    }

    WriteToConsole(msg) {
        TraceInfo(msg);
        alert(msg);
    }
}