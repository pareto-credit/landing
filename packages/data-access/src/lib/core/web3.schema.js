import S from 'fluent-json-schema';
/**
 * ABI Schema
 * @todo to implement a correct schema
 */ export function sAbi() {
    return S.array().items(S.object().additionalProperties(true));
}
/**
 * Abi contract schema
 * @todo to implement a corrrect schema
 */ export function sAbiContract() {
    return S.array().items(S.object().additionalProperties(true));
}

//# sourceMappingURL=web3.schema.js.map