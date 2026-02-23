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
    MAX_APY: function() {
        return MAX_APY;
    },
    SECONDS_IN_DAY: function() {
        return SECONDS_IN_DAY;
    },
    SECONDS_IN_WEEK: function() {
        return SECONDS_IN_WEEK;
    },
    SECONDS_IN_YEAR: function() {
        return SECONDS_IN_YEAR;
    },
    UNITS: function() {
        return UNITS;
    }
});
const MAX_APY = 999999;
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_WEEK = 604800;
const SECONDS_IN_YEAR = 31536000;
const UNITS = [
    {
        unit: 'seconds',
        label: 'Seconds'
    },
    {
        unit: 'minutes',
        label: 'Minutes'
    },
    {
        unit: 'hours',
        label: 'Hours'
    },
    {
        unit: 'days',
        label: 'Days'
    }
];

//# sourceMappingURL=utility.const.js.map