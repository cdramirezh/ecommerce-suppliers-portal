export const formatSAP = (obj) => {
    return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:');
}