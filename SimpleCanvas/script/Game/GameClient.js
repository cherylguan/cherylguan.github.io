class GameClient {
    constructor(gameController, socketRef, address, messageHandlerFactory) {
        TraceInfo("GameClient.ctor");

        Validator.ValidateObject(gameController, "GameClient.ctor.gameController", GameController);
        Validator.ValidateObject(socketRef, "GameClient.ctor.socketRef", Socket);
        Validator.ValidateString(address, "GameClient.ctor.address");
        Validator.ValidateObject(messageHandlerFactory, "GameClient.ctor.messageHandlerFactory", MessageHandlerFactory);

        this.gameController = gameController;
        this.socketRef = socketRef;
        this.address = address;
        this.messageHandlerFactory = messageHandlerFactory;
    }

    Initialize() {
        TraceInfo("GameClient.Initialize");

        if (this.connection && this.connection.readyState === 1) {
            this.gameController.uiController.WriteToConsole("Already connected!");
            return;
        }

        var localGameController = this.gameController;

        var onopen = function () {
            TraceInfo("connection open");
            localGameController.uiController.WriteToConsole('.. connection open');
        };

        var onclose = function () {
            TraceInfo("connection closed");
            localGameController.QuitPlayer();
            localGameController.uiController.WriteToConsole('.. connection closed');
        };

        var localMessageHandlerFactory = this.messageHandlerFactory;

        var onmessage = function (evt) {
            TraceInfo("onmessage", evt.data);

            var messageHandler = localMessageHandlerFactory.GetMessageHandler(evt.data);
            messageHandler.HandleMessage();
        };

        var onerror = function (evt) {
            TraceError("websocket error");
            localGameController.uiController.WriteToConsole("connection error!");
        };

        this.connection = this.socketRef.CreateConnection(
            this.address,
            onopen,
            onclose,
            onmessage,
            onerror);
    }

    SendString(str) {
        TraceInfo("GameClient.SendString: " + str)
        Validator.ValidateString(str, "GameClient.SendString.str");
        if (this.connection.readyState !== 1) {
            TraceError("connection error!");
            this.gameController.uiController.WriteToConsole("connection error!");
        }

        this.connection.send(str);
    }

    SendSerializable(serializable) {
        var str = serializable.Serialize();
        this.SendString(str);
    }
}