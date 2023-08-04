type Indexed<T = any> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    if (typeof lhs === 'object' && typeof rhs === 'object') {
        for (const key in rhs) {
            if (typeof rhs[key] === 'object') {
                if (!lhs[key]) Object.assign(lhs, { [key]: {} });
                merge(lhs[key], rhs[key]);
            } else {
                Object.assign(lhs, { [key]: rhs[key] });
            }
        }
    }
    return lhs;
}
function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== 'string')
        throw new Error('path must be string');
    if (typeof object !== 'object' || object === null)
        return object;
    const newObj = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, newObj);
}

export default set;
