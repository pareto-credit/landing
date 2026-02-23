import { ClientEntity, Locales, Page, PageSearchQuery } from '../core';
import { WalletSignature } from '../wallets';
/**
 * Client Signature interface
 */
export interface Signature extends SignatureData, ClientEntity {
}
export declare function sSignature(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface SignatureData {
    code: string;
    title?: Locales;
    description?: Locales;
    walletMessage: string;
    checks?: SignatureCheck[];
}
export declare function sSignatureData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface SignatureCheck {
    label: Locales;
    link?: string;
}
export declare function sSignatureCheck(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type SignatureFields = '_id' | 'name' | 'message' | 'checks' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const SIGNATURE_FIELDS: string[];
export interface SignaturesSearchQuery extends PageSearchQuery {
    name?: string;
}
export declare function sSignaturesSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface SignatureCheckBody {
    walletAddress: string;
}
export declare function sSignatureCheckBody(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface SignatureSignBody {
    walletAddress: string;
    hash: string;
}
export declare function sSignatureSignBody(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare enum SignatureErrorCodes {
    alreadyExists = "SIGNATURE_ALREADY_EXISTS",
    notDeletable = "SIGNATURE_NOT_DELETABLE",
    notExists = "SIGNATURE_NOT_EXISTS",
    verificationFailed = "SIGNATURE_VERIFICATION_FAILED"
}
export declare enum SignatureRoutes {
    v1Create = "v1/signatures",
    v1Check = "v1/signatures/:signatureId/check",
    v1Sign = "v1/signatures/:signatureId/sign",
    v1Delete = "v1/signatures/:signatureId",
    v1Read = "v1/signatures/:signatureId",
    v1Update = "v1/signatures/:signatureId",
    v1Search = "v1/signatures"
}
export interface SignaturesClientModel {
    create: (body: SignatureData) => Promise<Signature>;
    search: (params?: SignaturesSearchQuery) => Promise<Page<Signature>>;
    searchAll: (params?: SignaturesSearchQuery) => Promise<Page<Signature>>;
    list: (params?: SignaturesSearchQuery) => Promise<Signature[]>;
    listAll: (params?: SignaturesSearchQuery) => Promise<Signature[]>;
    findOne: (params?: SignaturesSearchQuery) => Promise<Signature | undefined>;
    readOne: (params: SignaturesSearchQuery) => Promise<Signature>;
    check: (signatureId: string, params: SignatureCheckBody) => Promise<WalletSignature>;
    sign: (signatureId: string, params: SignatureSignBody) => Promise<WalletSignature>;
}
