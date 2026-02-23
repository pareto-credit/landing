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
    sBCAddress: function() {
        return sBCAddress;
    },
    sBCHash: function() {
        return sBCHash;
    },
    sBigInt: function() {
        return sBigInt;
    },
    sBlock: function() {
        return sBlock;
    },
    sDate: function() {
        return sDate;
    },
    sDateString: function() {
        return sDateString;
    },
    sEmail: function() {
        return sEmail;
    },
    sHexString: function() {
        return sHexString;
    },
    sLocales: function() {
        return sLocales;
    },
    sMetaContent: function() {
        return sMetaContent;
    },
    sMetaItem: function() {
        return sMetaItem;
    },
    sMetaItems: function() {
        return sMetaItems;
    },
    sObjectId: function() {
        return sObjectId;
    },
    sPassword: function() {
        return sPassword;
    },
    sPercentage: function() {
        return sPercentage;
    },
    sPrintableASCII: function() {
        return sPrintableASCII;
    },
    sReward: function() {
        return sReward;
    },
    sStringId: function() {
        return sStringId;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
function sObjectId() {
    return _fluentjsonschema.default.raw({
        type: 'object',
        instanceof: 'ObjectId'
    });
}
function sDate() {
    return _fluentjsonschema.default.raw({
        type: 'object',
        instanceof: 'Date'
    });
}
function sEmail() {
    return _fluentjsonschema.default.string().format('email');
}
function sStringId() {
    return _fluentjsonschema.default.string().pattern(/^[a-f0-9]{24}$/);
}
function sPercentage() {
    return _fluentjsonschema.default.number().minimum(0).maximum(100);
}
function sDateString() {
    return _fluentjsonschema.default.string().pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
}
function sBCAddress() {
    return _fluentjsonschema.default.string().pattern(/^0x[a-fA-F0-9]{40}$/);
}
function sBCHash() {
    return _fluentjsonschema.default.string().pattern(/^0x[a-fA-F0-9]{64}$/);
}
function sHexString() {
    return _fluentjsonschema.default.string().pattern(/^0x[a-fA-F0-9]+$/);
}
function sBlock() {
    return _fluentjsonschema.default.object().additionalProperties(false)// Backward-compatible
    .prop('number', _fluentjsonschema.default.number()).required().prop('timestamp', _fluentjsonschema.default.number()).required();
}
function sReward() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('tokenId', sStringId()).required().prop('amount', sBigInt()).required().prop('amountUSD', sBigInt()).required().prop('APR', _fluentjsonschema.default.number()).required().prop('percentage', _fluentjsonschema.default.number()).required();
}
function sPrintableASCII() {
    return _fluentjsonschema.default.string().pattern(/^[\x20-\x7E]*$/);
}
function sPassword() {
    return sPrintableASCII().minLength(8);
}
function sBigInt() {
    return _fluentjsonschema.default.string();
/* .format('bigint') */ }
function sLocales() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('en', _fluentjsonschema.default.string()).required();
}
function sMetaContent() {
    return _fluentjsonschema.default.object().additionalProperties(true);
}
function sMetaItem() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('title', sLocales()).required().prop('description', sLocales());
}
function sMetaItems() {
    return _fluentjsonschema.default.object().additionalProperties(true);
}

//# sourceMappingURL=utility.schema.js.map