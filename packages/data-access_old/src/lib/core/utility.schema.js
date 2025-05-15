import S from 'fluent-json-schema';
/**
 * MongoDB ObjectId schema
 */ export function sObjectId() {
    return S.raw({
        type: 'object',
        instanceof: 'ObjectId'
    });
}
/**
 * MongoDB Date schema schema
 */ export function sDate() {
    return S.raw({
        type: 'object',
        instanceof: 'Date'
    });
}
/**
 * Email format
 */ export function sEmail() {
    return S.string().format('email');
}
/**
 * MongoDB ObjectId string format schema
 */ export function sStringId() {
    return S.string().pattern(/^[a-f0-9]{24}$/);
}
/**
 * Percentage value
 */ export function sPercentage() {
    return S.number().minimum(0).maximum(100);
}
/**
 * Date ISO String schema
 */ export function sDateString() {
    return S.string().pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
}
/**
 * BlockChain Address schema
 */ export function sBCAddress() {
    return S.string().pattern(/^0x[a-fA-F0-9]{40}$/);
}
/**
 * BlockChain Hash schema
 */ export function sBCHash() {
    return S.string().pattern(/^0x[a-fA-F0-9]{64}$/);
}
/**
 * BlockChain Hex schema
 */ export function sHexString() {
    return S.string().pattern(/^0x[a-fA-F0-9]+$/);
}
/**
 * Block schema
 */ export function sBlock() {
    return S.object().additionalProperties(false)// Backward-compatible
    .prop('number', S.number()).required().prop('timestamp', S.number()).required();
}
/**
 * Reward schema
 */ export function sReward() {
    return S.object().additionalProperties(false).prop('tokenId', sStringId()).required().prop('amount', sBigInt()).required().prop('amountUSD', sBigInt()).required().prop('APR', S.number()).required().prop('percentage', S.number()).required();
}
/**
 * All printable ASCII chars, minus the "DEL" char.
 */ export function sPrintableASCII() {
    return S.string().pattern(/^[\x20-\x7E]*$/);
}
/**
 * Password schema
 */ export function sPassword() {
    return sPrintableASCII().minLength(8);
}
/**
 * BigInt schema
 */ export function sBigInt() {
    return S.string();
/* .format('bigint') */ }
/**
 * Locales management
 */ export function sLocales() {
    return S.object().additionalProperties(false).prop('en', S.string()).required();
}
/**
 * Meta data
 */ export function sMetaContent() {
    return S.object().additionalProperties(true);
}
export function sMetaItem() {
    return S.object().additionalProperties(false).prop('title', sLocales()).required().prop('description', sLocales());
}
export function sMetaItems() {
    return S.object().additionalProperties(true);
}

//# sourceMappingURL=utility.schema.js.map