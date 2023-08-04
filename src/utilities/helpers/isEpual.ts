
function isEqual(a: object, b: object) : boolean {
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }

    for (const [key, value] of Object.entries(a)) {
        const rightValue = b[key as keyof typeof b];
        console.log(rightValue);
        if (typeof value == 'object' && typeof rightValue == 'object') {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }
        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

export default isEqual;
