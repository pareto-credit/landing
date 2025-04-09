
export function indexTrim(str: string, ch: string) {
    if (str === ch) {
        return '';
    }

    let start = 0, end = str.length;

    while (start < end && str[start] === ch)
        ++start;

    while (end > start && str[end - 1] === ch)
        --end;

    return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}

export function urlJoin(...parts: string[]) {
    return parts
        .map(p => indexTrim(p, '/'))
        .filter(p => p)
        .join('/');
}
