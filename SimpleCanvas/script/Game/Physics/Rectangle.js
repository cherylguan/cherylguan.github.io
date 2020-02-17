class Rectangle {
    constructor(x, y, width, height) {
        Validator.ValidateNumber(x, "Rectangle.x");
        Validator.ValidateNumber(y, "Rectangle.y");
        Validator.ValidateNumber(width, "Rectangle.width");
        Validator.ValidateNumber(height, "Rectangle.height");

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}