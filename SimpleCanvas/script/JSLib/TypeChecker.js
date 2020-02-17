class TypeChecker {
    constructor() { }

    // Returns if a value is a string
    static IsString(value) {
        return typeof value === 'string' || value instanceof String;
    }

    // Returns if a value is really a number
    static IsNumber(value) {
        return typeof value === 'number' && isFinite(value);
    }

    // Returns if a value is an array
    static IsArray(value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }

    // Returns if a value is a function
    static IsFunction(value) {
        return typeof value === 'function';
    }

    // Returns if a value is an object
    static IsObject(value) {
        return value && typeof value === 'object' && value.constructor === Object;
    }

    // Returns if a value is null
    static IsNull(value) {
        return value === null;
    }

    // Returns if a value is undefined
    static IsUndefined(value) {
        return typeof value === 'undefined';
    }

    // Returns if a value is a boolean
    static IsBoolean(value) {
        return typeof value === 'boolean';
    }

    // Returns if a value is a regexp
    static IsRegExp(value) {
        return value && typeof value === 'object' && value.constructor === RegExp;
    }

    // Returns if value is an error object
    static IsError(value) {
        return value instanceof Error && typeof value.message !== 'undefined';
    }

    // Returns if value is a date object
    static IsDate(value) {
        return value instanceof Date;
    }

    // Returns if value is a Symbol
    static IsSymbol(value) {
        return typeof value === 'symbol';
    }
}