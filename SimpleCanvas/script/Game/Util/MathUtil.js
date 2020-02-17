class MathUtil {
    constructor() {
    }

    static SqrtOfTwo() { return 1.4142 };

    //max exclusive
    static GetRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}