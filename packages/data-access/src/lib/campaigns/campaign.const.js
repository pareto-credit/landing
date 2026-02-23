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
    CAMPAIGNS_PARETO_QUEUE: function() {
        return CAMPAIGNS_PARETO_QUEUE;
    },
    CAMPAIGNS_ROUTES_KEY: function() {
        return CAMPAIGNS_ROUTES_KEY;
    },
    CAMPAIGN_FIELDS: function() {
        return CAMPAIGN_FIELDS;
    },
    CAMPAIGN_SORT_FIELDS: function() {
        return CAMPAIGN_SORT_FIELDS;
    }
});
const CAMPAIGNS_ROUTES_KEY = 'campaigns';
const CAMPAIGNS_PARETO_QUEUE = 'PARETO_CAMPAIGNS';
const CAMPAIGN_FIELDS = [
    '_id',
    'tokenId',
    'code',
    'rules',
    'boosts',
    'startDate',
    'endDate',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const CAMPAIGN_SORT_FIELDS = [
    '_id'
];

//# sourceMappingURL=campaign.const.js.map