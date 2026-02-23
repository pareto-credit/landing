"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isCampaignActive", {
    enumerable: true,
    get: function() {
        return isCampaignActive;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
function isCampaignActive({ startDate, endDate }) {
    if (startDate && endDate) {
        return (0, _moment.default)().isBetween((0, _moment.default)(startDate), (0, _moment.default)(endDate));
    }
    if (startDate) {
        return (0, _moment.default)().isAfter((0, _moment.default)(startDate));
    }
    if (endDate) {
        return (0, _moment.default)().isBefore((0, _moment.default)(endDate));
    }
    return true;
}

//# sourceMappingURL=campaign.lib.js.map