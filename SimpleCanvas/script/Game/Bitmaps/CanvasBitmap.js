// draws and caches bitmap
class CanvasBitmap {
    constructor(canvas) {
        TraceWarning("CanvasBitmap.ctor", canvas.width, canvas.height)
        Validator.ValidateValue(canvas, "CanvasBitmap.ctor.canvas");

        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    static FromRect(width, height, colorRGB) {
        Validator.ValidateNumber(width, "CanvasBitmap.FromRect.width");
        Validator.ValidateNumber(height, "CanvasBitmap.FromRect.height");
        Validator.ValidateString(colorRGB, "CanvasBitmap.FromRect.colorRGB");

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.fillStyle = colorRGB;
        context.fillRect(0, 0, canvas.width, canvas.height);

        return new CanvasBitmap(canvas);
    }

    static FromEmpty(width, height) {
        Validator.ValidateNumber(width, "CanvasBitmap.FromEmpty.width");
        Validator.ValidateNumber(height, "CanvasBitmap.FromEmpty.height");

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        return new CanvasBitmap(canvas);
    }

    static FromStroke(width, height, lineWidth, colorRGB) {
        Validator.ValidateNumber(width, "CanvasBitmap.FromStroke.width");
        Validator.ValidateNumber(height, "CanvasBitmap.FromStroke.height");
        Validator.ValidateNumber(lineWidth, "CanvasBitmap.FromStroke.lineWidth");
        Validator.ValidateString(colorRGB, "CanvasBitmap.FromStroke.colorRGB");

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.lineWidth = lineWidth;
        context.strokeStyle = colorRGB;
        context.strokeRect(0, 0, canvas.width, canvas.height);

        return new CanvasBitmap(canvas);
    }

    static FromText(width, height, text, font, colorRGB, offsetX, offsetY) {
        //Validator.ValidateString(text, "CanvasBitmap.FromText.text");
        Validator.ValidateString(font, "CanvasBitmap.FromText.font");
        Validator.ValidateString(colorRGB, "CanvasBitmap.FromText.colorRGB");
        Validator.ValidateNumber(offsetX, "CanvasBitmap.FromText.offsetX");
        Validator.ValidateNumber(offsetY, "CanvasBitmap.FromText.offsetY");

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');

        context.font = font;
        context.fillStyle = colorRGB;
        context.fillText(text, offsetX, offsetY, width);
        return new CanvasBitmap(canvas);
    }

    Clone(width, height) {
        return CanvasBitmap.FromImage(width, height, this.canvas);
    }

    Crop(x, y, width, height) {
        var newCanvas = document.createElement("canvas");
        newCanvas.width = width;
        newCanvas.height = height;
        var context = newCanvas.getContext('2d');
        context.drawImage(this.canvas,
            x, y, width, height,     // source rectangle
            0, 0, width, height); // destination rectangle 

        return new CanvasBitmap(newCanvas);
    }

    static FromImage(width, height, image) {
        Validator.ValidateNumber(width, "CanvasBitmap.FromImage.width");
        Validator.ValidateNumber(height, "CanvasBitmap.FromImage.height");
        Validator.ValidateValue(image, "CanvasBitmap.FromImage.image");

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.drawImage(image,
            0, 0, image.width, image.height,     // source rectangle
            0, 0, canvas.width, canvas.height); // destination rectangle 

        return new CanvasBitmap(canvas);
    }

    DrawOnContext(context) {
        Validator.ValidateValue(context, "CanvasBitmap.DrawOnContext.context");
        context.drawImage(this.canvas, 0, 0);
    }

    DrawHitBoxOnContext(context, colorRGB) {
        Validator.ValidateValue(context, "CanvasBitmap.DrawHitBoxOnContext.context");
        Validator.ValidateString(colorRGB, "CanvasBitmap.DrawHitBoxOnContext.colorRGB");

        context.fillStyle = colorRGB;
        context.fillRect(0, 0, this.width, this.height);
    }
}