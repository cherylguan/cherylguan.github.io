class SpriteRef {
    constructor(bitmap = null, x = 0, y = 0, alpha = 1, rotationCW = 0, scaleX = 1, scaleY = 1) {
        this.bitmap = bitmap;
        this.x = x;
        this.y = y;
        this.alpha = alpha;
        this.rotationCW = rotationCW;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }

    ToSprite() {
        var sprite = new Sprite(this.bitmap, this.x, this.y);
        sprite.alpha = this.alpha;
        sprite.rotationCW = this.rotationCW;
        sprite.scaleX = this.scaleX;
        sprite.scaleY = this.scaleY;
        return sprite;
    }

    Clone() {
        var clone = new SpriteRef(
            this.bitmap.Clone(this.bitmap.width, this.bitmap.width),
            this.x,
            this.y,
            this.alpha,
            this.rotationCW,
            this.scaleX,
            this.scaleY);

        return clone;
    }
}