// inst only, does not draw
class StrokeRectBitmap {
    constructor(width, height, lineWidth, colorRGB) {
        Validator.ValidateNumber(width, "StrokeRectBitmap.ctor.width");
        Validator.ValidateNumber(height, "StrokeRectBitmap.ctor.height");
        Validator.ValidateNumber(lineWidth, "StrokeRectBitmap.ctor.lineWidth");
        Validator.ValidateString(colorRGB, "StrokeRectBitmap.ctor.colorRGB");

        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.colorRGB = colorRGB;
    }

    Clone(width, height) {
        return new StrokeRectBitmap(width, height, this.lineWidth, this.colorRGB);
    }

    Crop(x, y, width, height) {
        return new StrokeRectBitmap(width, height, this.lineWidth, this.colorRGB);
    }

    DrawOnContext(context) {
        Validator.ValidateValue(context, "StrokeRectBitmap.DrawOnContext.context");

        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.colorRGB;
        context.strokeRect(0, 0, this.width, this.height);

    }

    DrawHitBoxOnContext(context, colorRGB) {
        Validator.ValidateValue(context, "RefBitmap.DrawHitBoxOnContext.context");
        Validator.ValidateString(colorRGB, "RefBitmap.DrawHitBoxOnContext.colorRGB");

        context.lineWidth = this.lineWidth;
        context.strokeStyle = colorRGB;
        context.strokeRect(0, 0, this.width, this.height);
    }
}