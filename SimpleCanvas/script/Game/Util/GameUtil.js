class GameUtil {
    constructor() {
    }

    static GetNewGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static SerializeLinear() {
        alert(arguments);
        var result = "";
        for (var i = 0; i < arguments.length; i++) {
            result = result + arguments[i];
            if (i < arguments.length - 1) {
                result = result + "#";
            }
        }

        alert(result);
    }
}