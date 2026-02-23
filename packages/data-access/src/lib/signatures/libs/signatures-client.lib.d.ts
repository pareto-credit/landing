import { Axios } from 'axios';
import { ApiEntity } from '../../core';
import { Signature, SignatureCheckBody, SignatureData, SignaturesClientModel, SignatureSignBody, SignaturesSearchQuery } from '../signature.model';
import { WalletSignature } from '../../wallets';
export declare class SignaturesClient extends ApiEntity implements SignaturesClientModel {
    constructor(axios: Axios);
    /**
     * Create a signature
     * @param body - the signature data
     * @returns the promise for create a new signature
     */
    create(body: SignatureData): Promise<Signature>;
    /**
     * Search signatures by params
     * @param searchParams - the signatures search params
     * @returns the promise for search signatures
     */
    search(searchParams?: SignaturesSearchQuery): Promise<import("../../core").Page<Signature>>;
    /**
     * Search all signatures by params
     * @param searchParams - the signatures search params
     * @returns the promise for search all signatures
     */
    searchAll(searchParams?: SignaturesSearchQuery): Promise<import("../../core").Page<Signature>>;
    /**
     * List signatures by params
     * @param searchParams - the signatures search params
     * @returns the promise for list signatures
     */
    list(searchParams?: SignaturesSearchQuery): Promise<Signature[]>;
    /**
     * List all signatures by params
     * @param searchParams - the signatures search params
     * @returns the promise for list all signatures
     */
    listAll(searchParams?: SignaturesSearchQuery): Promise<Signature[]>;
    /**
     * Find a signature by params
     * @param searchParams - the search params
     * @returns the promise for find an epoch
     */
    findOne(searchParams?: SignaturesSearchQuery): Promise<Signature | undefined>;
    /**
     * Read a signature by params
     * @param searchParams - the search params
     * @returns the promise for read a signature
     */
    readOne(searchParams?: SignaturesSearchQuery): Promise<Signature>;
    /**
     * Check signature by wallet
     * @param signatureId - the signature ID
     * @param params - the signature check body
     * @returns the promise for check signature
     */
    check(signatureId: string, params: SignatureCheckBody): Promise<WalletSignature>;
    /**
     * Sign a signature by wallet
     * @param signatureId - the signature ID
     * @param params - the signature sign body
     * @returns the promise for sign a signature
     */
    sign(signatureId: string, body: SignatureSignBody): Promise<WalletSignature>;
}
