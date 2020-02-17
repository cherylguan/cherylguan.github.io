class GameState {
    constructor() {
        TraceInfo("GameState.ctor");
        this.draggedDisplayObject = null;

        this.focusInput = null;
    }

    SetDragged(displayObject) {
        if (displayObject) {
            TraceInfo("GameState.SetDragged");
        }

        this.draggedDisplayObject = displayObject;
    }

    GetDragged() {
        return this.draggedDisplayObject;
    }

    SetFocusInput(inputUI) {
        if (inputUI) {
            TraceInfo("GameState.SetFocusInput");
        }

        this.focusInput = inputUI;
    }

    GetFocusInput() {
        return this.focusInput;
    }
}