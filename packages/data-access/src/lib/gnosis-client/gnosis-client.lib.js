"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GnosisClient", {
    enumerable: true,
    get: function() {
        return GnosisClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
const _gnosisclientconst = require("./gnosis-client.const");
const _core = require("../core");
const _web3ethaccounts = require("web3-eth-accounts");
let GnosisClient = class GnosisClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            baseURL: _gnosisclientconst.GNOSIS_CLIENT_ENDPOINT,
            headers: {
                'content-type': 'application/json'
            }
        };
        return _axios.default.create(options);
    }
    /**
   * Get safe address to use
   * @param safeAddress safe address
   * @returns safe address
   */ getSafeAddress(safeAddress) {
        if (!safeAddress) {
            safeAddress = this.safeAddress;
        }
        if (!safeAddress || !(0, _core.isAddress)(safeAddress)) {
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
        const messageHash = (0, _web3ethaccounts.hashMessage)(message);
        const chainIds = Object.keys(this.web3);
        for await (const chainId of chainIds){
            const web3Client = this.web3[chainId];
            const gnosisSafeContract = web3Client.initContract(_gnosisclientconst.GNOSIS_SAFE_ABI, safeAddress);
            try {
                const signatureAddress = await gnosisSafeContract.methods['isValidSignature'](messageHash, hash).call({
                    from: safeAddress
                });
                if (signatureAddress === _gnosisclientconst.GNOSIS_SIGNATURE_VERIFICATION_CODE) {
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
};

//# sourceMappingURL=gnosis-client.lib.js.map