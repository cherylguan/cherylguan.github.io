// inst only, does not draw
class EmptyBitmap {
    constructor(width, height) {
        Validator.ValidateNumber(width, "EmptyBitmap.ctor.width");
        Validator.ValidateNumber(height, "EmptyBitmap.ctor.height");

        this.width = width;
        this.height = height;
    }

    Clone(width, height) {
        return new EmptyBitmap(width, height);
    }

    Crop(x, y, width, height) {
        return new EmptyBitmap(width, height);
    }

    DrawOnContext(context) {
    }

    DrawHitBoxOnContext(context, colorRGB) {
        Validator.ValidateValue(context, "EmptyBitmap.DrawHitBoxOnContext.context");
        Validator.ValidateString(colorRGB, "EmptyBitmap.DrawHitBoxOnContext.colorRGB");

        context.fillStyle = colorRGB;
        context.fillRect(0, 0, this.width, this.height);
    }
}