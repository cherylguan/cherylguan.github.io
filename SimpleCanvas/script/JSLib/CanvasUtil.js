class CanvasUtil {
    constructor() {
        TraceInfo("CanvasView.ctor");
    }

    static GetColorRgb(r, g, b) {
        return `rgb(${r},${g},${b})`;
    }

    // rotation is in radians and rotates the x and y axis clockwise
    // scaleX scales along the new xAxis 
    // scaleY scales along the new yAxis
    // x and y translate to the desired screen coordinates
    static TransformContext(context, x, y, scaleX, scaleY, rotation) {
        var scaleRatio = scaleY / scaleX;
        var rx = Math.cos(rotation) * scaleX;
        var ry = Math.sin(rotation) * scaleX;
        context.setTransform(rx, ry, -ry * scaleRatio, rx * scaleRatio, x, y);
    }

    static ResetContext(context) {
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    static IsPointOnRect(point, rectCenter, rectWidth, rectHeight) {
        Validator.ValidateObject(point, "IsPointOnRect.point", Point);
        Validator.ValidateObject(rectCenter, "IsPointOnRect.rectCenter", Point);

        var rectUpperLeft = new Point(rectCenter.x - rectWidth / 2, rectCenter.y - rectHeight / 2);
        var rectLowerRight = new Point(rectCenter.x + rectWidth / 2, rectCenter.y + rectHeight / 2);

        return point.x <= rectLowerRight.x
            && point.x >= rectUpperLeft.x
            && point.y >= rectUpperLeft.y
            && point.y <= rectLowerRight.y;
    }

    static CreateCanvas(width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    static GetContext(canvas) {
        return canvas.getContext("2d");
    }

    static ClearCanvas(canvas) {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    static CreateTestCanvas(id, width = 500, height = 500) {
        var canvas = document.getElementById(id);
        if (!canvas) {
            var canvas = document.createElement("canvas");
            canvas.id = id;
            canvas.width = width;
            canvas.height = height;
            canvas.style = "border:1px solid #d3d3d3;";
            document.body.appendChild(canvas);
        }

        return canvas;
    }

    static AppendTest(id, element) {
        var existing = document.getElementById(id);
        if (!existing) {
        }
        else {
            document.body.removeChild(existing);
        }

        document.body.appendChild(element);
    }

    //Vector from start to end Points. CCW normalized (0-2PI) angle from x+ (right) in screen coords (y+ is down)
    static GetAngle(start, end) {
        var dx = end.x - start.x;
        var dy = start.y - end.y;

        //direction of the line (upperleft --)
        var xDir = (dx == 0 ? 0 : dx / Math.abs(dx));
        var yDir = (dy == 0 ? 0 : -dy / Math.abs(dy));

        if (xDir == 0 && yDir == 0) {
            return Math.PI / 2;
        }

        var angle = Math.atan(dy / dx);

        //regulate angle (righthanded ccw)
        if (xDir == -1) {
            angle += Math.PI;
        }
        else if (yDir == 1) {
            angle += 2 * Math.PI;
        }

        return angle;
    }

    //vector: Point (screen coord, y inverted)
    static GetCWRadiansFromUp(vector) {
        var ccwFromRight = CanvasUtil.GetAngle(new Point(0, 0), vector);
        var ccwFromUp = ccwFromRight - Math.PI / 2;
        var cwFromUp = 2 * Math.PI - ccwFromUp;
        var normalized = Space.NormalizeAngle(cwFromUp);
        return normalized;
    }

    static GetTextSize(text, font) {
        Validator.ValidateString(font, "GetTextSize.font");
        if (!CanvasUtil.measurementCanvas) {
            CanvasUtil.measurementCanvas = document.createElement("canvas");
        }

        var mctx = CanvasUtil.measurementCanvas.getContext("2d");
        mctx.font = font;
        var width = mctx.measureText(text).width;

        var tokens = font.split("px");
        if (tokens.length < 2) {
            throw "font doesn't have px " + font;
        }

        var first = tokens[0];
        tokens = first.split(" ");
        var last = tokens[tokens.length - 1];
        var height = parseInt(last.trim());

        return new Point(width, height);
    }
}