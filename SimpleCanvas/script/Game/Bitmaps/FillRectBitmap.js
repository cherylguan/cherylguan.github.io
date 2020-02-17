// inst only, does not draw
class FillRectBitmap {
    constructor(width, height, colorRGB) {
        Validator.ValidateNumber(width, "FillRectBitmap.ctor.width");
        Validator.ValidateNumber(height, "FillRectBitmap.ctor.height");
        Validator.ValidateString(colorRGB, "FillRectBitmap.ctor.colorRGB");

        this.width = width;
        this.height = height;
        this.colorRGB = colorRGB;
    }

    Clone(width, height) {
        return new FillRectBitmap(width, height, this.colorRGB);
    }

    Crop(x, y, width, height) {
        return new FillRectBitmap(width, height, this.colorRGB);
    }

    DrawOnContext(context) {
        Validator.ValidateValue(context, "FillRectBitmap.DrawOnContext.context");

        context.fillStyle = this.colorRGB;
        context.fillRect(0, 0, this.width, this.height);

    }

    DrawHitBoxOnContext(context, colorRGB) {
        Validator.ValidateValue(context, "FillRectBitmap.DrawHitBoxOnContext.context");
        Validator.ValidateString(colorRGB, "FillRectBitmap.DrawHitBoxOnContext.colorRGB");

        context.fillStyle = colorRGB;
        context.fillRect(0, 0, this.width, this.height);
    }
}