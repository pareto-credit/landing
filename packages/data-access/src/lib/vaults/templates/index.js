"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VAULT_TEMPLATES", {
    enumerable: true,
    get: function() {
        return VAULT_TEMPLATES;
    }
});
const _LOAN_NOTICEdefault = require("./LOAN_NOTICE-default");
const _LOAN_NOTICEfalconx = require("./LOAN_NOTICE-falconx");
const _CYCLE_REPORTdefault = require("./CYCLE_REPORT-default");
const VAULT_TEMPLATES = {
    LOAN_NOTICE: {
        falconx: _LOAN_NOTICEfalconx.LoanNoticeFalconX,
        default: _LOAN_NOTICEdefault.LoanNoticeDefault
    },
    CYCLE_REPORT: {
        default: _CYCLE_REPORTdefault.CycleReportDefault
    }
};

//# sourceMappingURL=index.js.map