// inst only, does not draw
class TextBitmap {
    constructor(text, font, colorRGB) {
        Validator.ValidateString(font, "TextBitmap.FromText.font");
        Validator.ValidateString(colorRGB, "TextBitmap.FromText.colorRGB");

        this.text = text;
        this.font = font;
        this.colorRGB = colorRGB;

        var size = CanvasUtil.GetTextSize(this.text, this.font);

        this.width = size.x;
        this.height = size.y;
    }

    Clone(width, height) {
        return new TextBitmap(this.text, this.font, this.colorRGB);
    }

    Crop(x, y, width, height) {
        throw "TextBitmap.Crop is not supported. Use something else!";
    }

    DrawOnContext(context) {
        Validator.ValidateValue(context, "TextBitmap.DrawOnContext.context");

        //new FillRectBitmap(this.width, this.height, Color.GetRGBString(0, 255, 0))
        //    .DrawOnContext(context);

        context.font = this.font;
        context.fillStyle = this.colorRGB;
        context.textBaseline = "top";
        context.textAlign = "left";
        context.fillText(this.text, 0, 0);
    }

    DrawHitBoxOnContext(context, colorRGB) {
    }
}