"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sUnitTime", {
    enumerable: true,
    get: function() {
        return sUnitTime;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
function sUnitTime() {
    return _fluentjsonschema.default.string().enum([
        'seconds',
        'minutes',
        'hours',
        'days',
        'months',
        'years'
    ]);
}

//# sourceMappingURL=utility.model.js.map