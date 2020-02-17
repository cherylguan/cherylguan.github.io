class ConsoleView {
    constructor(parentElm, gameController) {
        TraceInfo("ConsoleView.ctor");

        Validator.ValidateValue(parentElm, "ConsoleView.ctor.parentElm");
        Validator.ValidateObject(gameController, "ConsoleView.ctor.gameController", GameController);

        this.parentElm = parentElm;
        this.gameController = gameController;
    }

    Display() {
        TraceInfo("ConsoleView.Display");

        this.containerDiv = document.createElement("div");
        this.parentElm.appendChild(this.containerDiv);

        this.consoleForm = document.createElement("form");
        this.containerDiv.appendChild(this.consoleForm);

        this.consoleText = document.createElement("pre");
        this.containerDiv.appendChild(this.consoleText);

        this.inputText = document.createElement("input");
        this.inputText.placeholder = "Input";
        this.consoleForm.appendChild(this.inputText);

        var localInputText = this.inputText;
        var localGameController = this.gameController;
        this.consoleForm.addEventListener('submit', function (e) {
            e.preventDefault();
            localGameController.SendString(localInputText.value);
        });
    }
}