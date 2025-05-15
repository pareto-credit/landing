import S from 'fluent-json-schema';
export function sUnitTime() {
    return S.string().enum([
        'seconds',
        'minutes',
        'hours',
        'days',
        'months',
        'years'
    ]);
}

//# sourceMappingURL=utility.model.js.map