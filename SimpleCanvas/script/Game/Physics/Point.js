class Point {
    constructor(x, y) {
        Validator.ValidateNumber(x, "Point.ctor.x");
        Validator.ValidateNumber(y, "Point.ctor.y");

        this.x = x;
        this.y = y;
    }

    Clone() {
        return new Point(this.x, this.y);
    }

    GetScaled(scaleX, scaleY) {
        return new Point(scaleX * this.x, scaleY * this.y);
    }

    GetLength() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    GetNormalized() {
        var length = this.GetLength();
        return new Point(this.x / length, this.y / length);
    }

    static RandomUnit() {
        var x = Math.random() * 2 - 1;
        var y = Math.random() * 2 - 1;
        return new Point(x, y).GetNormalized();
    }

    static RandomAroundBuffer(
        pos,
        bufferX,
        bufferY,
        size) {
        Validator.ValidateObject(pos, "Point.RandomAroundBuffer.pos", Point);
        Validator.ValidateNumber(bufferX, "Point.RandomAroundBuffer.bufferX");
        Validator.ValidateNumber(bufferY, "Point.RandomAroundBuffer.bufferY");
        Validator.ValidateNumber(size, "Point.RandomAroundBuffer.size");

        var dir = Point.RandomUnit();
        var scaleX = MathUtil.GetRandomInt(size) + bufferX;
        var scaleY = MathUtil.GetRandomInt(size) + bufferY;
        var scaled = dir.GetScaled(scaleX, scaleY);
        return new Point(scaled.x + pos.x, scaled.y + pos.y);
    }
}