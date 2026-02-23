"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    sAbi: function() {
        return sAbi;
    },
    sAbiContract: function() {
        return sAbiContract;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
function sAbi() {
    return _fluentjsonschema.default.array().items(_fluentjsonschema.default.object().additionalProperties(true));
}
function sAbiContract() {
    return _fluentjsonschema.default.array().items(_fluentjsonschema.default.object().additionalProperties(true));
}

//# sourceMappingURL=web3.schema.js.map