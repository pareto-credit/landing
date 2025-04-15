import S from 'fluent-json-schema';
import { sDateString, sStringId } from '../core';
export function sAccessToken() {
    return S.object().id('#accessToken').additionalProperties(false).prop('_id', sStringId()).description('Access Token ID.').required().prop('createdAt', sDateString()).description('Access Token creation date.').required().prop('createdBy', sStringId()).description('The IDentifier of the creation subject.').required().extend(sAccessTokenData());
}
export function sAccessTokenData() {
    return S.object().additionalProperties(false).prop('signature', S.string()).required().prop('permission', S.string().enum([
        'READ',
        'WRITE'
    ])).required().prop('userId', sStringId()).prop('expirationDate', sDateString());
}
export const ACCESS_TOKENS_ROUTES_KEY = 'access-tokens';
export var AccessTokenRoutes;
(function(AccessTokenRoutes) {
    AccessTokenRoutes[AccessTokenRoutes["v1Create"] = `v1/${ACCESS_TOKENS_ROUTES_KEY}`] = "v1Create";
    AccessTokenRoutes[AccessTokenRoutes["v1Delete"] = `v1/${ACCESS_TOKENS_ROUTES_KEY}/:accessTokenId`] = "v1Delete";
})(AccessTokenRoutes || (AccessTokenRoutes = {}));

//# sourceMappingURL=access-token.model.js.map