import S from 'fluent-json-schema';
import { sDateString, sStringId } from './utility.schema';
export function sClientEntity(isPartial) {
    return S.object().id('#clientEntity').additionalProperties(false).prop('createdAt', sDateString()).description('Entity creation date.').prop('createdBy', sStringId()).description('The creation subject ID.').prop('updatedAt', sDateString()).description('The last-update date.').prop('updatedBy', sStringId()).description('The last-update subject ID.').required(isPartial ? [] : [
        'createdAt',
        'createdBy',
        'updatedAt',
        'updatedBy'
    ]).extend(sClientDocument());
}
export function sClientDocument() {
    return S.object().id('#clientDocument').additionalProperties(false).prop('_id', sStringId()).description('Entity ID.').readOnly(true).required().prop('createdAt', sDateString()).description('Entity creation date.').prop('createdBy', sStringId()).description('The creation subject ID.').prop('updatedAt', sDateString()).description('The last-update date.').prop('updatedBy', sStringId()).description('The last-update subject ID.');
}
export function sClientFields() {
    return S.string().enum([
        '_id',
        'createdAt',
        'createdBy',
        'updatedAt',
        'updatedBy'
    ]);
}

//# sourceMappingURL=client.schema.js.map