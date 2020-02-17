class HitColorIndex {
    constructor() {
    }

    static Add(color, obj) {
        Validator.ValidateObject(color, "HitColorIndex.Add.color", Color);
        Validator.ValidateValue(obj, "HitColorIndex.Add.obj");
        if (!HitColorIndex.colorHashIndex) {
            HitColorIndex.Initialize();
        }

        if (!HitColorIndex.colorHashIndex[color.ToRGBString()]) {
            HitColorIndex.colorHashIndex[color.ToRGBString()] = obj;
            HitColorIndex.size++;
        }
    }

    static Remove(color) {
        Validator.ValidateObject(color, "HitColorIndex.Add.color", Color);
        var hash = color.ToRGBString();
        if (HitColorIndex.colorHashIndex && HitColorIndex.colorHashIndex[hash]) {
            delete HitColorIndex.colorHashIndex[hash];
            HitColorIndex.size--;
        }
    }

    static Get(color) {
        Validator.ValidateObject(color, "HitColorIndex.Get.color", Color);
        if (!HitColorIndex.colorHashIndex) {
            return null;
        }

        var found = HitColorIndex.colorHashIndex[color.ToRGBString()];
        if (found) {
            return found;
        } else {
            // What put in canvas is sometimes 1 off when got back. Workaround by checking adjacent numbers.
            for (var r = color.colorR - 1; r <= color.colorR + 1; r++) {
                for (var g = color.colorG - 1; g <= color.colorG + 1; g++) {
                    for (var b = color.colorB - 1; b <= color.colorB + 1; b++) {
                        var c = new Color(r, g, b);
                        found = HitColorIndex.colorHashIndex[c.ToRGBString()];
                        if (found) {
                            //console.log("hit color mismatch workaround!!", color, c);
                            return found;
                        }
                    }
                }
            }
        }

        return null;
    }

    static Initialize() {
        HitColorIndex.colorHashIndex = {};
        HitColorIndex.size = 0;
    }
}