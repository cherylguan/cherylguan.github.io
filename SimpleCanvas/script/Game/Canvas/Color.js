class Color {
    constructor(colorR, colorG, colorB) {
        Validator.ValidateNumber(colorR, "Color.ctor.colorR");
        Validator.ValidateNumber(colorG, "Color.ctor.colorG");
        Validator.ValidateNumber(colorB, "Color.ctor.colorB");

        this.colorR = colorR;
        this.colorG = colorG;
        this.colorB = colorB;
    }

    static FromRandom() {
        return new Color(
            MathUtil.GetRandomInt(254),
            MathUtil.GetRandomInt(254),
            MathUtil.GetRandomInt(254));
    }

    IsEqual(color) {
        Validator.ValidateObject(color, "Color.IsEqual.color", Color);
        return this.colorR === color.colorR
            && this.colorG === color.colorG
            && this.colorB === color.colorB;
    }

    ToRGBString() {
        return Color.GetRGBString(this.colorR, this.colorG, this.colorB);
    }

    static GetRGBString(colorR, colorG, colorB) {
        return `rgb(${colorR},${colorG},${colorB})`;
    }
}