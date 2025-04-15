import axios from 'axios';
import { GNOSIS_CLIENT_ENDPOINT, GNOSIS_SAFE_ABI, GNOSIS_SIGNATURE_VERIFICATION_CODE } from './gnosis-client.const';
import { isAddress } from '../core';
import { hashMessage } from 'web3-eth-accounts';
/**
 * API Client class
 */ export class GnosisClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            baseURL: GNOSIS_CLIENT_ENDPOINT,
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.create(options);
    }
    /**
   * Get safe address to use
   * @param safeAddress safe address
   * @returns safe address
   */ getSafeAddress(safeAddress) {
        if (!safeAddress) {
            safeAddress = this.safeAddress;
        }
        if (!safeAddress || !isAddress(safeAddress)) {
            throw Error(`Safe address malformed: ${safeAddress}`);
        }
        return safeAddress;
    }
    /**
   * Verify gnosis safe signature hash
   * @param message message to sign
   * @param hash signed message hash
   * @param safeAddress safe address
   * @returns true | false
   */ async verifySignature(message, hash, safeAddress) {
        safeAddress = this.getSafeAddress(safeAddress);
        // Check safe signature for each chain
        const messageHash = hashMessage(message);
        const chainIds = Object.keys(this.web3);
        for await (const chainId of chainIds){
            const web3Client = this.web3[chainId];
            const gnosisSafeContract = web3Client.initContract(GNOSIS_SAFE_ABI, safeAddress);
            try {
                const signatureAddress = await gnosisSafeContract.methods['isValidSignature'](messageHash, hash).call({
                    from: safeAddress
                });
                if (signatureAddress === GNOSIS_SIGNATURE_VERIFICATION_CODE) {
                    return true;
                }
            } catch (err) {
                continue;
            }
        }
        return false;
    }
    /**
   * Get gnosis safe info from APIs
   * @param safeAddress safe address
   * @returns Safe info if any
   */ async getSafe(safeAddress) {
        safeAddress = this.getSafeAddress(safeAddress);
        const response = await this.axios.request({
            url: safeAddress,
            method: 'GET',
            responseType: 'json'
        });
        return response == null ? void 0 : response.data;
    }
    constructor(web3, safeAddress){
        this.web3 = web3;
        this.safeAddress = safeAddress;
        this.axios = this.initAxios();
    }
}

//# sourceMappingURL=gnosis-client.lib.js.map