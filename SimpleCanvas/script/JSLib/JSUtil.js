function TraceInfo(...args) {
    console.log(args);
}

function TraceWarning(...args) {
    console.log(args);
}

function TraceError(...args) {
    console.error(args);
}

function TraceDebug(...args) {
    console.log(args);
}

function AddWatch(id, obj) {
    if (!JSUtil.watchList) {
        JSUtil.watchList = {};
    }

    JSUtil.watchList[id] = obj;
}

function PrintWatch() {
    if (!JSUtil.watchList) {
        return;
    }

    var keys = Object.keys(JSUtil.watchList);

    var i;
    for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = JSUtil.watchList[key];

        console.log(key, value);
    }
}

class JSUtil {
    constructor() {
    }

    static Stringify(value) {
        return JSON.stringify(value);
    }

    static Parse(json) {
        return JSON.parse(json);
    }

    static ToArray(obj) {
        var keys = Object.keys(obj);

        var result = new Array();

        var i;
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = obj[key];

            result.push(value);
        }

        return result;
    }

    static CloneArray(arr) {
        var clone = new Array();
        arr.forEach((i) => { clone.push(i.Clone()); });
        return clone;
    }

    static ClonePrimitiveArray(arr) {
        var clone = new Array();
        arr.forEach((i) => { clone.push(i); });
        return clone;
    }

    static LoadImage(src, width, height, done) {
        TraceInfo("JSUtil.LoadImage");
        Validator.ValidateString(src, "JSUtil.LoadImage.src");
        Validator.ValidateNumber(width, "JSUtil.LoadImage.width");
        Validator.ValidateNumber(height, "JSUtil.LoadImage.height");
        Validator.ValidateFunction(done, "JSUtil.LoadImage.done");

        var img = new Image();
        img.style = `width:${width}px;height:${height}px;`
        img.onload = function () {
            done(img);
        }
        img.src = src;
    }

    static WriteTest(id, str) {
        var pre = document.getElementById(id);
        if (!pre) {
            var pre = document.createElement("pre");
            pre.id = id;
            document.body.appendChild(pre);
        }

        pre.innerHTML = str;

        return pre;
    }

    static WriteStat(id, str) {
        var statDiv = document.getElementById("statDiv");
        if (!statDiv) {
            statDiv = document.createElement("div");
            statDiv.id = "statDiv";
            document.body.appendChild(statDiv);
        }

        var pre = document.getElementById(id);
        if (!pre) {
            var pre = document.createElement("pre");
            pre.id = id;
            statDiv.appendChild(pre);
        }

        pre.innerHTML = str;

        return pre;
    }

    static ClearStats() {
        var statDiv = document.getElementById("statDiv");
        if (statDiv) {
            document.body.removeChild(statDiv);
        }
    }
}