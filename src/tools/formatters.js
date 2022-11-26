export const formatSAP = (obj) => {
    return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:');
}

export const formatPrice = (value, includeSymbol) => {
    const intDec = value.toString().split('.')
    const val = intDec[0].toString().split('').reverse();
    let result = [];
    for (let i = 0; i < val.length; i++) {
        result.push(val[i]);
        if ((i + 1) % 3 === 0 && i < val.length - 1) {
            result.push('.');
        }
    }
    result = result.reverse().join('');
    // Estabelcer coma (,) para los decimales
    if(intDec[1]) {
        result += `,${intDec[1]}`
    }
    return includeSymbol ? '$' + result : result;
}

export const formatDate = (date, separator) => {
    return date.substring(6, 8) + separator + date.substring(4, 6) + separator + date.substring(0, 4)
}