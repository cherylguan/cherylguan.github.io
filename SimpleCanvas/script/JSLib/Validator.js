class Validator {
    constructor() { }

    static ValidateValue(paramRef, paramName) {
        if (!paramRef) {
            throw paramName + " " + paramRef + " has invalid value";
        }
    }

    static ValidateObject(paramRef, paramName, objectType, value = true) {
        if (!(paramRef instanceof objectType)) {
            throw paramName + " " + paramRef + " is not instanceof " + objectType;
        }

        if (value) {
            Validator.ValidateValue(paramRef, paramName);
        }
    }

    static ValidateNumber(paramRef, paramName) {
        if (!TypeChecker.IsNumber(paramRef)) {
            throw paramName + " " + paramRef + " is not a number";
        }
    }

    static ValidateString(paramRef, paramName, value = true) {
        if (!TypeChecker.IsString(paramRef)) {
            throw paramName + " " + paramRef + " is not a string";
        }

        if (value) {
            Validator.ValidateValue(paramRef, paramName);
        }
    }

    static ValidateFunction(paramRef, paramName) {
        if (!TypeChecker.IsFunction(paramRef)) {
            throw paramName + " " + paramRef + " is not a function";
        }
    }
}
