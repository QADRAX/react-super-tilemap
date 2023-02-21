export function isEqual<T>(a: T, b: T): boolean {
    // If both a and b are null or undefined and exactly the same
    if (a === b) {
        return true;
    }
    
    // If they are not strictly equal, they both need to be Objects
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
        return false;
    }
    
    // They must have the exact same prototype chain, the closest we can do is
    // test the constructor.
    if (a.constructor !== b.constructor) {
        return false;
    }
    
    for (const p in a) {
        // Inherited properties were tested using a.constructor === b.constructor
        if (a.hasOwnProperty(p)) {
        // Allows comparing a[ p ] and b[ p ] when set to undefined
        if (!b.hasOwnProperty(p)) {
            return false;
        }
    
        // If they have the same strict value or identity then they are equal
        if (a[p] === b[p]) {
            continue;
        }
    
        // Numbers, Strings, Functions, Booleans must be strictly equal
        if (typeof a[p] !== 'object') {
            return false;
        }
    
        // Objects and Arrays must be tested recursively
        if (!isEqual(a[p], b[p])) {
            return false;
        }
        }
    }
    
    for (const p in b) {
        // allows a[ p ] to be set to undefined
        if (b.hasOwnProperty(p) && !a.hasOwnProperty(p)) {
        return false;
        }
    }
    return true;
}