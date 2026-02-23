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
    CampaignBoostMock: function() {
        return CampaignBoostMock;
    },
    CampaignMock: function() {
        return CampaignMock;
    },
    CampaignRuleMock: function() {
        return CampaignRuleMock;
    }
});
const _core = require("../core");
function CampaignMock(options) {
    var _options_rules, _options_boosts;
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'CAMPAIGN_ID',
        code: (options == null ? void 0 : options.code) || 'CAMPAIGN_CODE',
        name: (0, _core.LocalesMock)(options == null ? void 0 : options.name),
        description: (0, _core.LocalesMock)(options == null ? void 0 : options.description),
        rules: options == null ? void 0 : (_options_rules = options.rules) == null ? void 0 : _options_rules.map((r)=>CampaignRuleMock(r)),
        boosts: options == null ? void 0 : (_options_boosts = options.boosts) == null ? void 0 : _options_boosts.map((b)=>CampaignBoostMock(b)),
        startDate: (options == null ? void 0 : options.startDate) || now,
        endDate: (options == null ? void 0 : options.endDate) || now,
        createdAt: (options == null ? void 0 : options.createdAt) || now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: (options == null ? void 0 : options.updatedAt) || now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
function CampaignRuleMock(options) {
    var _options_deposit, _options_deposit1, _options_reward, _options_reward1, _options_frequency, _options_frequency1;
    return {
        code: (options == null ? void 0 : options.code) || 'RULE_CODE',
        name: (0, _core.LocalesMock)(options == null ? void 0 : options.name),
        description: (options == null ? void 0 : options.description) ? (0, _core.LocalesMock)(options == null ? void 0 : options.description) : undefined,
        trigger: (options == null ? void 0 : options.trigger) || 'DEPOSIT',
        deposit: {
            type: (options == null ? void 0 : (_options_deposit = options.deposit) == null ? void 0 : _options_deposit.type) || 'BALANCE',
            value: (options == null ? void 0 : (_options_deposit1 = options.deposit) == null ? void 0 : _options_deposit1.value) || 1
        },
        reward: {
            type: (options == null ? void 0 : (_options_reward = options.reward) == null ? void 0 : _options_reward.type) || 'AMOUNT',
            value: (options == null ? void 0 : (_options_reward1 = options.reward) == null ? void 0 : _options_reward1.value) || 1
        },
        frequency: {
            unit: (options == null ? void 0 : (_options_frequency = options.frequency) == null ? void 0 : _options_frequency.unit) || 'days',
            value: (options == null ? void 0 : (_options_frequency1 = options.frequency) == null ? void 0 : _options_frequency1.value) || 1
        }
    };
}
function CampaignBoostMock(options) {
    var _options_reward, _options_reward1;
    return {
        code: (options == null ? void 0 : options.code) || 'BOOST_CODE',
        name: (0, _core.LocalesMock)(options == null ? void 0 : options.name),
        description: (options == null ? void 0 : options.description) ? (0, _core.LocalesMock)(options == null ? void 0 : options.description) : undefined,
        type: (options == null ? void 0 : options.type) || 'STAKE',
        reward: {
            type: (options == null ? void 0 : (_options_reward = options.reward) == null ? void 0 : _options_reward.type) || 'AMOUNT',
            value: (options == null ? void 0 : (_options_reward1 = options.reward) == null ? void 0 : _options_reward1.value) || 1
        }
    };
}

//# sourceMappingURL=campaign.mock.js.map