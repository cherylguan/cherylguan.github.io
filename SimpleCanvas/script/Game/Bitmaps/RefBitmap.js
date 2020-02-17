// inst only, does not draw
class RefBitmap {
    constructor(width, height, canvasBitmap) {
        Validator.ValidateNumber(width, "RefBitmap.ctor.width");
        Validator.ValidateNumber(height, "RefBitmap.ctor.height");
        Validator.ValidateObject(canvasBitmap, "RefBitmap.ctor.bitmap", CanvasBitmap);

        this.width = width;
        this.height = height;
        this.canvasBitmap = canvasBitmap;
    }

    Clone(width, height) {
        return new RefBitmap(width, height, this.canvasBitmap);
    }

    Crop(x, y, width, height) {
        var newCanvas = document.createElement("canvas");
        newCanvas.width = width;
        newCanvas.height = height;
        var context = newCanvas.getContext('2d');
        context.drawImage(this.canvasBitmap.canvas,
            x, y, width, height,     // source rectangle
            0, 0, width, height); // destination rectangle

        return new CanvasBitmap(newCanvas);
    }

    DrawOnContext(context) {
        Validator.ValidateValue(context, "RefBitmap.DrawOnContext.context");

        context.drawImage(this.canvasBitmap.canvas,
            0, 0, this.canvasBitmap.width, this.canvasBitmap.height,     // source rectangle
            0, 0, this.width, this.height); // destination rectangle 
    }

    DrawHitBoxOnContext(context, colorRGB) {
        Validator.ValidateValue(context, "RefBitmap.DrawHitBoxOnContext.context");
        Validator.ValidateString(colorRGB, "RefBitmap.DrawHitBoxOnContext.colorRGB");

        context.fillStyle = colorRGB;
        context.fillRect(0, 0, this.width, this.height);
    }
}