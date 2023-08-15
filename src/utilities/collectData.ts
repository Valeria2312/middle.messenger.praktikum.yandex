export function collectData(data: Record<string, string>,formInputs: NodeListOf<HTMLInputElement>) {
    if (Object.keys(data).length === formInputs.length) {
        // console.log(data);
    }
    return data;
}
