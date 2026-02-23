"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getVaultRequestProcessingDate", {
    enumerable: true,
    get: function() {
        return getVaultRequestProcessingDate;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
function getVaultRequestProcessingDate(block, request) {
    const { cdoEpoch } = block;
    if (!cdoEpoch) {
        return;
    }
    const { duration, bufferDuration, instantWithdraws, startDate, endDate, status } = cdoEpoch;
    switch(request.type){
        case 'REDEEM':
            {
                const isCurrentRequest = status === 'WAITING' && (0, _moment.default)(request.requestedOn).isAfter((0, _moment.default)(endDate));
                return isCurrentRequest ? (0, _moment.default)(endDate).add(duration, 's').add(bufferDuration, 's').toISOString() : endDate;
            }
        case 'DEPOSIT':
            {
                const isCurrentRequest = status === 'RUNNING' && (0, _moment.default)(request.requestedOn).isBefore((0, _moment.default)(endDate));
                return isCurrentRequest ? endDate : startDate;
            }
        case 'WITHDRAW':
            {
                const isCurrentRequest = status === 'RUNNING' && (0, _moment.default)(request.requestedOn).isAfter((0, _moment.default)(startDate));
                if (request.isInstant) {
                    const withdrawDelay = instantWithdraws == null ? void 0 : instantWithdraws.delay;
                    return isCurrentRequest ? (0, _moment.default)(endDate).add(withdrawDelay, 's').add(bufferDuration, 's').toISOString() : (0, _moment.default)(startDate).add(withdrawDelay, 's').toISOString();
                }
                return isCurrentRequest ? (0, _moment.default)(endDate).add(duration, 's').add(bufferDuration, 's').toISOString() : endDate;
            }
        // No date available
        default:
            return;
    }
    return;
}

//# sourceMappingURL=vault-requests.lib.js.map