class GameUpdateService {
    constructor(gameController) {
        TraceInfo("GameUpdateService.ctor");
        Validator.ValidateValue(gameController, "GameUpdateService.ctor.gameController");

        this.gameController = gameController;
    }

    Initialize() {
        TraceInfo("GameUpdateService.Initialize");

        var localSelf = this;
        window.requestAnimationFrame((timestamp) => { localSelf.OnTick(timestamp); });
    }

    Start() {
        TraceInfo("GameUpdateService.Start");
        this.started = true;
    }

    Stop() {
        TraceInfo("GameUpdateService.Stop");
        this.started = false;
    }

    OnTick(timestamp) {
        if (this.started) {
            try {
                if (!this.lastTick) { this.lastTick = timestamp };
                var millisecondsSinceLastTick = timestamp - this.lastTick;
                this.lastTick = timestamp;

                this.gameController.Tick(millisecondsSinceLastTick);
            }
            catch (err) {
                TraceError(err);
            }
        }

        var localSelf = this;
        window.requestAnimationFrame((t) => { localSelf.OnTick(t); });
    }
}