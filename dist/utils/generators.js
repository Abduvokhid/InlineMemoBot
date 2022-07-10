"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNumber = exports.generateString = void 0;
const generateString = (length = 10) => {
    let result = '';
    const characters = 'Xc1Jj9buKL3agkoeSqWFEpDdQnZ46PIzfwOsymMT57UBltGRv2NxrhViYC0A8H';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateString = generateString;
const generateNumber = (length = 10) => {
    let result = '';
    const characters = '4750126893';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return parseInt(result) || parseInt(characters) || 0;
};
exports.generateNumber = generateNumber;
//# sourceMappingURL=generators.js.map