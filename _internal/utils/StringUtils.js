export const toString = (value) => value ? (typeof value === 'string' ? value : value.toString()) : '';
export const isEmptyOrSpaces = (value) => value.match(/^ *$/) !== null;
export const parseTemplate = (text, replacementMap) => {
    let output = text;
    for (const entry of replacementMap.entries()) {
        output = output.replace(new RegExp(`{{${entry[0]}}}`, 'gi'), entry[1]);
    }
    return output;
};
export function match(text, words) {
    let found = false;
    if (words) {
        words.split(' ').forEach((word) => {
            if (text.toString().match(new RegExp(`(\\w*${word}\\w*)`, 'gi'))) {
                found = true;
            }
        });
    }
    return found;
}
export function sort(array, property, isReverseOrder) {
    const result = array.sort(function (o1, o2) {
        if (isReverseOrder) {
            return o1[property] > o2[property]
                ? -1
                : o1[property] < o2[property]
                    ? 1
                    : 0;
        }
        return o1[property] < o2[property]
            ? -1
            : o1[property] > o2[property]
                ? 1
                : 0;
    });
    return result;
}
export function htmlToText(str) {
    if (!str)
        return false;
    str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
}
//# sourceMappingURL=StringUtils.js.map