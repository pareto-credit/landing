import { ApiEntity, stringify, uriFy } from '../../core';
import { SignatureRoutes } from '../signature.model';
export class SignaturesClient extends ApiEntity {
    /**
   * Create a signature
   * @param body - the signature data
   * @returns the promise for create a new signature
   */ create(body) {
        return this._create(SignatureRoutes.v1Create, body);
    }
    /**
   * Search signatures by params
   * @param searchParams - the signatures search params
   * @returns the promise for search signatures
   */ search(searchParams) {
        return this._search(SignatureRoutes.v1Search, searchParams);
    }
    /**
   * Search all signatures by params
   * @param searchParams - the signatures search params
   * @returns the promise for search all signatures
   */ searchAll(searchParams) {
        return this._searchAll(SignatureRoutes.v1Search, searchParams);
    }
    /**
   * List signatures by params
   * @param searchParams - the signatures search params
   * @returns the promise for list signatures
   */ list(searchParams) {
        return this._list(SignatureRoutes.v1Search, searchParams);
    }
    /**
   * List all signatures by params
   * @param searchParams - the signatures search params
   * @returns the promise for list all signatures
   */ listAll(searchParams) {
        return this._listAll(SignatureRoutes.v1Search, searchParams);
    }
    /**
   * Find a signature by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ findOne(searchParams) {
        return this._findOne(SignatureRoutes.v1Search, searchParams);
    }
    /**
   * Read a signature by params
   * @param searchParams - the search params
   * @returns the promise for read a signature
   */ readOne(searchParams) {
        return this._readOne(SignatureRoutes.v1Read, searchParams);
    }
    /**
   * Check signature by wallet
   * @param signatureId - the signature ID
   * @param params - the signature check body
   * @returns the promise for check signature
   */ check(signatureId, params) {
        return this.axios.request({
            url: SignatureRoutes.v1Check.replace(':signatureId', signatureId),
            method: 'GET',
            responseType: 'json',
            params: new URLSearchParams(uriFy(params))
        }).then((response)=>response.data);
    }
    /**
   * Sign a signature by wallet
   * @param signatureId - the signature ID
   * @param params - the signature sign body
   * @returns the promise for sign a signature
   */ sign(signatureId, body) {
        return this.axios.request({
            url: SignatureRoutes.v1Sign.replace(':signatureId', signatureId),
            method: 'POST',
            responseType: 'json',
            data: stringify(body)
        }).then((response)=>response.data);
    }
    constructor(axios){
        super(axios);
    }
}

//# sourceMappingURL=signatures-client.lib.js.map