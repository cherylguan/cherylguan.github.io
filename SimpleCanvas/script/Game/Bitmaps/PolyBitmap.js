// inst only, does not draw
// points array of Point
class PolyBitmap {
    constructor(spriteType, width, height, color, points, lineWidth) {
        Validator.ValidateString(spriteType, "PolyBitmap.ctor.spriteType");
        Validator.ValidateNumber(width, "PolyBitmap.ctor.width");
        Validator.ValidateNumber(height, "PolyBitmap.ctor.height");
        Validator.ValidateObject(color, "PolyBitmap.ctor.color", Color);

        this.spriteType = spriteType;
        this.width = width;
        this.height = height;
        this.color = color;
        this.points = points;
        this.lineWidth = lineWidth;

        this.drawBorder = false;
        this.borderColor = Color.GetRGBString(132, 135, 137);
        this.borderWidth = 1;
    }

    Clone(width, height) {
        var scaledPoints = new Array();
        this.points.forEach((p) => {
            scaledPoints.push(new Point(p.x * width / this.width, p.y * height / this.height));
        });

        return new PolyBitmap(
            this.spriteType,
            width,
            height,
            new Color(this.color.colorR, this.color.colorG, this.color.colorB),
            scaledPoints,
            this.lineWidth);
    }

    Crop(x, y, width, height) {
        throw "PolyBitmap.Crop not supported";
    }

    DrawOnContext(context) {
        Validator.ValidateValue(context, "PolyBitmap.DrawOnContext.context");

        context.fillStyle = this.color.ToRGBString();
        context.strokeStyle = this.color.ToRGBString();
        this.DrawHelper(context);

        if (SPRITE_FILL === this.spriteType && this.drawBorder) {
            context.lineWidth = this.borderWidth;
            context.strokeStyle = this.borderColor;
            context.beginPath();
            context.moveTo(this.points[0].x, this.points[0].y);
            var i;
            for (i = 1; i < this.points.length; i++) {
                context.lineTo(this.points[i].x, this.points[i].y);
            }
            context.closePath();
            context.stroke();
        }
    }

    DrawHitBoxOnContext(context, colorRGB) {
        Validator.ValidateValue(context, "PolyBitmap.DrawHitBoxOnContext.context");
        Validator.ValidateString(colorRGB, "PolyBitmap.DrawHitBoxOnContext.colorRGB");

        context.fillStyle = colorRGB;
        context.strokeStyle = colorRGB;
        this.DrawHelper(context);
    }

    DrawHelper(context) {
        if (this.points.length < 1) {
            return;
        }

        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        var i;
        for (i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.closePath();

        if (SPRITE_FILL === this.spriteType) {
            context.fill();
        }
        else /*(SPRITE_STROKE === this.spriteType)*/ {
            context.stroke();
        }
    }

    //Server side SpriteData object
    static FromSpriteData(spriteData) {
        var points = new Array();
        spriteData.Points.forEach((p) => {
            points.push(new Point(p.X, p.Y));
        });
        var bitmap = new PolyBitmap(
            spriteData.SpriteType,
            spriteData.Width,
            spriteData.Height,
            new Color(spriteData.Color.R, spriteData.Color.G, spriteData.Color.B),
            points,
            spriteData.LineWidth);

        return bitmap;
    }
}