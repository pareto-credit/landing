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
    calculateBoostBlockRewards: function() {
        return calculateBoostBlockRewards;
    },
    getBoostReferralFeeReward: function() {
        return getBoostReferralFeeReward;
    },
    getBoostReferralReward: function() {
        return getBoostReferralReward;
    },
    getBoostReferredReward: function() {
        return getBoostReferredReward;
    },
    getBoostRewards: function() {
        return getBoostRewards;
    },
    getBoostStakeRewards: function() {
        return getBoostStakeRewards;
    },
    getCampaignBoostPoints: function() {
        return getCampaignBoostPoints;
    },
    getCampaignBoostVaultPoints: function() {
        return getCampaignBoostVaultPoints;
    },
    getCampaignPoints: function() {
        return getCampaignPoints;
    },
    getCampaignPointsPerDay: function() {
        return getCampaignPointsPerDay;
    },
    getCampaignRuleVaultPoints: function() {
        return getCampaignRuleVaultPoints;
    },
    getCampaignVaultPoints: function() {
        return getCampaignVaultPoints;
    },
    getRuleDepositAgePoints: function() {
        return getRuleDepositAgePoints;
    },
    getRuleDepositBalancePoints: function() {
        return getRuleDepositBalancePoints;
    },
    getRuleQueuePoints: function() {
        return getRuleQueuePoints;
    },
    makeMetrics: function() {
        return makeMetrics;
    },
    mergeRewards: function() {
        return mergeRewards;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _lodash = require("lodash");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
const _core = require("../../core");
const _transactions = require("../../transactions");
const _walletblocks = require("../../wallet-blocks");
const _tokens = require("../../tokens");
const CAMPAIGN_METRICS = {
    points: '0',
    perDay: '0',
    multiplier: '1',
    multiplierScaled: '1'
};
function getCampaignPoints(campaign, campaignVaults, transactions, walletBlocks, tokens, campaignTokens, affiliatedPoints, affiliatedPerformances, referred) {
    // Calculate vaults points
    const vaults = campaignVaults.map((v)=>getCampaignVaultPoints(campaign, v, transactions.filter((t)=>t.vaultId === v._id), walletBlocks.filter((b)=>b.vaultId === v._id), tokens.find((t)=>t._id === v.tokenId), campaignTokens));
    const referredIds = (referred || []).map((r)=>r._id);
    const referredBlocks = walletBlocks.filter((b)=>referredIds.includes(b.walletId));
    // Calculate boosts
    const { points: rulePoints } = computeMetrics(vaults);
    const boosts = (campaign.boosts || []).filter((b)=>{
        var _b_vaultIds;
        return !((_b_vaultIds = b.vaultIds) == null ? void 0 : _b_vaultIds.length);
    }).map((b)=>{
        const boostToken = b.tokenId ? campaignTokens == null ? void 0 : campaignTokens.find((t)=>t._id === b.tokenId) : undefined;
        return getCampaignBoostPoints(b, rulePoints, affiliatedPoints, affiliatedPerformances, referredBlocks, boostToken);
    });
    // Calculate aggregation
    const { points, perDay, multiplier, rewards } = computeMetrics(vaults, boosts, false);
    return {
        points,
        perDay,
        multiplier,
        vaults,
        rewards
    };
}
function getCampaignVaultPoints(campaign, vault, transactions, walletBlocks, token, campaignTokens) {
    var _vault_campaigns, _campaign_rules;
    // Check rules
    const vaultCampaign = (_vault_campaigns = vault.campaigns) == null ? void 0 : _vault_campaigns.find((c)=>c._id === campaign._id);
    const campaignRules = (_campaign_rules = campaign.rules) == null ? void 0 : _campaign_rules.filter((r)=>!r.vaultIds || r.vaultIds.includes(vault._id));
    const vaultRules = campaignRules || (vaultCampaign == null ? void 0 : vaultCampaign.rules);
    if (!(vaultRules == null ? void 0 : vaultRules.length) || !token) {
        return _extends._({
            _id: vault._id
        }, CAMPAIGN_METRICS);
    }
    // Calculate vaults points
    const rules = vaultRules.filter((r)=>!r.vaultIds || r.vaultIds.includes(vault._id)).map((r)=>{
        const ruleToken = r.deposit.tokenId ? campaignTokens == null ? void 0 : campaignTokens.find((t)=>t._id === r.deposit.tokenId) : token;
        const ruleMetrics = getCampaignRuleVaultPoints(campaign, r, transactions, walletBlocks, ruleToken || token, vault.pools || []);
        return _extends._({
            code: r.code
        }, ruleMetrics);
    });
    const boosts = (campaign.boosts || []).filter((b)=>{
        var _b_vaultIds;
        return !!((_b_vaultIds = b.vaultIds) == null ? void 0 : _b_vaultIds.includes(vault._id));
    }).map((b)=>{
        const boostToken = b.tokenId ? campaignTokens == null ? void 0 : campaignTokens.find((t)=>t._id === b.tokenId) : token;
        const boostMetrics = getCampaignBoostVaultPoints(campaign, b, walletBlocks, boostToken || token, vault.pools || []);
        return _extends._({
            rules: b.rules
        }, boostMetrics);
    });
    const boostedRules = applyBoostsToRules(rules, boosts);
    const { points, perDay, multiplier, rewards, multiplierScaled } = boostedRules.reduce((acc, v)=>makeMetrics(acc, v), CAMPAIGN_METRICS);
    return {
        _id: vault._id,
        points,
        perDay,
        rewards,
        multiplier,
        multiplierScaled
    };
}
function getCampaignRuleVaultPoints(campaign, rule, transactions, walletBlocks, token, vaultPools) {
    const options = {
        startDate: campaign.startDate || campaign.createdAt,
        endDate: campaign.endDate,
        vaultPools
    };
    switch(rule.trigger){
        case 'DEPOSIT':
            {
                switch(rule.deposit.type){
                    case 'BALANCE':
                        return getRuleDepositBalancePoints(rule, walletBlocks, token, options);
                    case 'BALANCE_SUSP':
                        return getRuleDepositBalancePoints(rule, walletBlocks, token, _extends._({}, options, {
                            balanceField: 'suspAggregated',
                            includeYT: true
                        }));
                    case 'BALANCE_USP':
                        return getRuleDepositBalancePoints(rule, walletBlocks, token, _extends._({}, options, {
                            balanceField: 'uspPools'
                        }));
                    case 'POOL_BALANCE':
                        return getRuleDepositBalancePoints(rule, walletBlocks, token, _extends._({}, options, {
                            balanceField: 'poolTokenBalance'
                        }));
                    case 'AGE':
                        return getRuleDepositAgePoints(rule, walletBlocks, options);
                    default:
                        return CAMPAIGN_METRICS;
                }
            }
        case 'DEPOSIT_REQUEST':
            {
                const depositRequestPoints = getRuleQueuePoints(rule, transactions, token, options);
                return depositRequestPoints;
            }
    }
}
function getCampaignBoostVaultPoints(campaign, boost, walletBlocks, token, vaultPools) {
    const options = {
        startDate: campaign.startDate || campaign.createdAt,
        endDate: campaign.endDate,
        vaultPools
    };
    const poolsFilter = (vaultPools || []).reduce((acc, p)=>p.ref && (boost.pools || []).includes(p.ref) ? [
            ...acc,
            p
        ] : [
            ...acc
        ], []);
    switch(boost.type){
        case 'STAKE':
            {
                return getBoostStakeRewards(boost, walletBlocks, token, options);
            }
        case 'DEPOSIT_NAPIER':
            return getBoostStakeRewards(boost, walletBlocks, token, _extends._({}, options, {
                protocols: [
                    'NapierLP',
                    'NapierYT'
                ],
                poolsFilter
            }));
        case 'DEPOSIT_PENDLE':
            return getBoostStakeRewards(boost, walletBlocks, token, _extends._({}, options, {
                protocols: [
                    'PendleLP',
                    'PendleSY',
                    'PendleYT'
                ],
                poolsFilter
            }));
        case 'SUPPLY_EULER':
            return getBoostStakeRewards(boost, walletBlocks, token, _extends._({}, options, {
                protocols: [
                    'EulerSupply'
                ]
            }));
        case 'SUPPLY_TERM':
            return getBoostStakeRewards(boost, walletBlocks, token, _extends._({}, options, {
                protocols: [
                    'TermFinance'
                ]
            }));
        case 'DEPOSIT_BALANCER':
            {
                return getBoostStakeRewards(boost, walletBlocks, token, _extends._({}, options, {
                    protocols: [
                        'Balancer'
                    ]
                }));
            }
        default:
            return CAMPAIGN_METRICS;
    }
}
function getCampaignBoostPoints(boost, totalPoints, affiliatedPoints, affiliatedPerformances, referredBlocks, token) {
    switch(boost.type){
        case 'REFERRAL':
            return getBoostReferralReward(boost, affiliatedPoints);
        case 'REFERRAL_FEE':
            return getBoostReferralFeeReward(boost, affiliatedPerformances);
        case 'REFERRED':
            return getBoostReferredReward(boost, totalPoints, referredBlocks, token);
        default:
            return CAMPAIGN_METRICS;
    }
}
function getRuleDepositBalancePoints({ frequency, reward }, walletBlocks, token, options) {
    const { startDate, endDate, balanceField, vaultPools, poolsFilter, includeYT } = options;
    // Order and filter wallet blocks
    const blocks = (0, _lodash.orderBy)(walletBlocks, 'block.number', 'asc');
    // Fake current block
    const lastBlock = blocks.length ? blocks[blocks.length - 1] : undefined;
    const currentBlock = (0, _walletblocks.WalletBlockMock)({
        block: {
            timestamp: (0, _moment.default)(endDate).unix()
        },
        tokenBalance: lastBlock ? (0, _walletblocks.getWalletBlockBalance)(lastBlock, balanceField, {
            token,
            vaultPools,
            poolsFilter,
            includeYT
        }) : '0'
    });
    return [
        ...blocks,
        currentBlock
    ].reduce((acc, b, i)=>{
        // Check the block timestamp
        if (_moment.default.unix(b.block.timestamp).isBefore((0, _moment.default)(startDate)) || _moment.default.unix(b.block.timestamp).isAfter((0, _moment.default)(endDate))) {
            return acc;
        }
        // Age calculation
        const prevBlock = blocks[i - 1];
        const prevTimestamp = (prevBlock == null ? void 0 : prevBlock.block.timestamp) || 0;
        const prevBalance = prevBlock ? (0, _walletblocks.getWalletBlockBalance)(prevBlock, balanceField, {
            token,
            vaultPools,
            poolsFilter,
            includeYT
        }) : '0';
        const date = _moment.default.unix(prevTimestamp).isAfter(startDate) ? _moment.default.unix(prevTimestamp) : (0, _moment.default)(startDate);
        const delta = _moment.default.unix(b.block.timestamp).diff(date, frequency.unit, true);
        const ageMultiplier = (0, _core.BNify)(delta).div(frequency.value).toString();
        const balance = (0, _tokens.fixTokenAmount)(token, prevBalance);
        const rulePoints = (0, _core.BNify)(balance).times(reward.value).times(ageMultiplier);
        // Points per day
        const distributionDays = _moment.default.duration(frequency.value, frequency.unit).asDays();
        const pointsPerDay = i === blocks.length && (0, _core.BNgt)(balance, 0) ? (0, _core.BNify)(balance).times(reward.value).div(distributionDays).toString() : 0;
        return {
            points: (0, _core.BNify)(acc.points).plus(rulePoints).toString(),
            perDay: (0, _core.BNify)(acc.perDay).plus(pointsPerDay).toString(),
            multiplier: acc.multiplier
        };
    }, CAMPAIGN_METRICS);
}
function getRuleDepositAgePoints({ frequency, reward }, walletBlocks, options) {
    const { startDate, endDate } = options;
    // Order and filter wallet blocks
    let age = 0;
    const blocks = (0, _lodash.orderBy)(walletBlocks, 'block.number', 'asc');
    // Fake current block
    const currentBlock = (0, _walletblocks.WalletBlockMock)({
        block: {
            timestamp: (0, _moment.default)(endDate).unix() - 1
        }
    });
    return [
        ...blocks,
        currentBlock
    ].reduce((acc, b, i)=>{
        // Check the block timestamp
        if (!_moment.default.unix(b.block.timestamp).isBetween((0, _moment.default)(startDate), (0, _moment.default)(endDate))) {
            return acc;
        }
        const prevBlock = blocks[i - 1];
        const prevBalance = prevBlock ? (0, _walletblocks.getWalletBlockBalance)(prevBlock) : '0';
        if ((0, _core.BNgt)(prevBalance)) {
            const date = _moment.default.unix(prevBlock == null ? void 0 : prevBlock.block.timestamp).isAfter(startDate) ? _moment.default.unix(prevBlock == null ? void 0 : prevBlock.block.timestamp) : (0, _moment.default)(startDate);
            const delta = _moment.default.unix(b.block.timestamp).diff(date, frequency.unit, true);
            age += delta;
        }
        const ruleMultiplier = age >= frequency.value ? reward.value : 1;
        const multiplier = _bignumber.default.maximum(acc.multiplier, ruleMultiplier);
        return {
            points: acc.points,
            perDay: acc.perDay,
            multiplier: multiplier.toString()
        };
    }, CAMPAIGN_METRICS);
}
function getBoostStakeRewards(boost, walletBlocks, token, options) {
    const { reward } = boost;
    // Calculate age between request and process
    const boostRewards = getBoostRewards(token, reward, walletBlocks, options);
    const multiplierScaled = (0, _core.BNgt)(boostRewards.totalAge) ? boostRewards.multiplier.div(boostRewards.totalAge) : '1';
    return {
        perDay: '0',
        rules: boost.rules,
        points: boostRewards.points.toFixed(0),
        multiplierScaled: (0, _core.BNFloat)(multiplierScaled, 4),
        multiplier: (0, _core.BNFloat)(boostRewards.lastMultiplier, 4)
    };
}
function getBoostReferralFeeReward({ reward }, affiliatedPerformances) {
    switch(reward.type){
        case 'AMOUNT':
            return {
                points: (0, _core.BNify)(reward.value).toString(),
                perDay: '0',
                multiplier: '1'
            };
        case 'PERCENTAGE':
            {
                if (!(affiliatedPerformances == null ? void 0 : affiliatedPerformances.length)) {
                    return CAMPAIGN_METRICS;
                }
                const totalFeesUSD = affiliatedPerformances.reduce((acc, p)=>(0, _core.BNify)(acc).plus(p.fees.USD).toString(), '0');
                return {
                    points: '0',
                    rewards: [
                        {
                            USD: (0, _core.BNify)(totalFeesUSD).times(reward.value).div(100).toString()
                        }
                    ],
                    perDay: '0',
                    multiplier: '1'
                };
            }
        default:
            return CAMPAIGN_METRICS;
    }
}
function getBoostReferralReward({ reward }, affiliatedPoints) {
    switch(reward.type){
        case 'AMOUNT':
            return {
                points: (0, _core.BNify)(reward.value).toString(),
                perDay: '0',
                multiplier: '1'
            };
        case 'PERCENTAGE':
            {
                if (!(affiliatedPoints == null ? void 0 : affiliatedPoints.length)) {
                    return CAMPAIGN_METRICS;
                }
                const totalPoints = affiliatedPoints.reduce((acc, p)=>(0, _core.BNify)(acc).plus(p.points).toString(), '0');
                return {
                    points: (0, _core.BNify)(totalPoints).times(reward.value).div(100).toString(),
                    perDay: '0',
                    multiplier: '1'
                };
            }
        default:
            return CAMPAIGN_METRICS;
    }
}
function getBoostReferredReward({ reward }, totalPoints, referredBlocks, token) {
    if (!referredBlocks) {
        return CAMPAIGN_METRICS;
    }
    // Select referred blocks with at least 100 USP if token is specified
    const referred = token ? referredBlocks.filter((wB)=>(0, _core.BNgte)((0, _walletblocks.getWalletBlockBalance)(wB, 'uspAggregated', {
            token
        }), 100 * 1e18)) : referredBlocks;
    if (!(referred == null ? void 0 : referred.length)) {
        return CAMPAIGN_METRICS;
    }
    switch(reward.type){
        case 'AMOUNT':
            {
                const points = (0, _core.BNify)(reward.value).times(referred.length).toString();
                return {
                    points,
                    perDay: '0',
                    multiplier: '1'
                };
            }
        case 'PERCENTAGE':
            {
                if ((0, _core.BNlte)(totalPoints)) {
                    return CAMPAIGN_METRICS;
                }
                const rewardPoints = (0, _core.BNify)(totalPoints).times(reward.value).div(100);
                const points = rewardPoints.times(referred.length).toString();
                return {
                    points,
                    perDay: '0',
                    multiplier: '1'
                };
            }
        default:
            return CAMPAIGN_METRICS;
    }
}
function calculateBoostBlockRewards(token, reward, walletBlock, vaultPools, protocols, poolsFilter) {
    // Get staked amount
    const stakedAmount = (0, _core.BNify)((0, _walletblocks.getWalletStakedTokenBalance)(token._id, walletBlock, 0, vaultPools, protocols, poolsFilter));
    const blockBalance = (0, _core.BNify)((0, _walletblocks.getWalletBlockTokenBalance)(token, walletBlock, vaultPools));
    const rewards = {
        points: (0, _core.BNify)(0),
        multiplier: (0, _core.BNify)(1),
        stakedAmount,
        blockBalance
    };
    switch(reward.type){
        case 'AMOUNT':
            return _extends._({}, rewards, {
                points: (0, _core.BNify)(reward.value)
            });
        case 'MULTIPLIER':
            {
                const stakedPercentage = (0, _core.BNgt)(stakedAmount) && (0, _core.BNgt)(blockBalance) ? stakedAmount.div(blockBalance) : 0;
                const multiplier = (0, _core.BNgt)(stakedPercentage) ? (0, _core.BNify)(1).plus((0, _core.BNify)(reward.value - 1).times(stakedPercentage)) : (0, _core.BNify)(1);
                return _extends._({}, rewards, {
                    multiplier
                });
            }
    }
    return rewards;
}
function getBoostRewards(token, reward, walletBlocks, options) {
    const { startDate, endDate, protocols, vaultPools, poolsFilter } = options;
    const nowTimestamp = (0, _moment.default)().unix();
    const startTimestamp = (0, _moment.default)(startDate).unix();
    const endTimestamp = endDate ? (0, _moment.default)(endDate).unix() : nowTimestamp;
    const orderedBlocks = (0, _lodash.orderBy)(walletBlocks, 'block.number', 'asc');
    const firstWalletBlock = orderedBlocks.find((wb)=>(0, _core.BNgt)((0, _walletblocks.getWalletBlockBalance)(wb, 'tokenAggregated', {
            token,
            vaultPools
        })));
    const filteredWalletBlocks = orderedBlocks.filter((wb)=>(0, _core.BNgte)(wb.block.number, firstWalletBlock == null ? void 0 : firstWalletBlock.block.number));
    // Fake current block
    const lastBlock = filteredWalletBlocks.length ? filteredWalletBlocks[filteredWalletBlocks.length - 1] : undefined;
    const currentTimestamp = Math.min(nowTimestamp, endTimestamp);
    const currentBlock = (0, _walletblocks.WalletBlockMock)(_extends._({}, lastBlock || {}, {
        block: (0, _core.BlockMock)(_extends._({}, lastBlock == null ? void 0 : lastBlock.block, {
            timestamp: currentTimestamp
        }))
    }));
    const blocks = [
        ...filteredWalletBlocks,
        currentBlock
    ];
    return blocks.reduce((acc, walletBlock, i)=>{
        const nextWalletBlock = blocks[i + 1];
        if (!nextWalletBlock) {
            return acc;
        }
        // Use campaign start/end date as time bounds
        const nextTimestamp = Math.min(endTimestamp, nextWalletBlock.block.timestamp);
        const blockTimestamp = Math.max(startTimestamp, walletBlock.block.timestamp);
        const age = nextTimestamp - blockTimestamp;
        if (age < 0) {
            return acc;
        }
        const blocksRewards = calculateBoostBlockRewards(token, reward, walletBlock, vaultPools, protocols, poolsFilter);
        const blockWeight = blocksRewards.blockBalance.times(age);
        const blockScaledMultiplier = (0, _core.BNify)(blocksRewards.multiplier).times(blockWeight);
        const multiplier = acc.multiplier.plus(blockScaledMultiplier);
        const totalAge = acc.totalAge.plus(blockWeight);
        return _extends._({}, acc, {
            totalAge,
            points: acc.points.plus(blocksRewards.points || 0),
            multiplier,
            stakedAmount: blocksRewards.stakedAmount,
            lastMultiplier: (0, _core.BNify)(blocksRewards.multiplier),
            totalStakedAmount: acc.totalStakedAmount.plus(blocksRewards.stakedAmount)
        });
    }, {
        totalAge: (0, _core.BNify)(0),
        points: (0, _core.BNify)(0),
        multiplier: (0, _core.BNify)(0),
        stakedAmount: (0, _core.BNify)(0),
        lastMultiplier: (0, _core.BNify)(1),
        totalStakedAmount: (0, _core.BNify)(0)
    });
}
function getRuleQueuePoints(rule, transactions, token, options) {
    const { frequency, reward } = rule;
    const { startDate, endDate } = options;
    // Fake current transaction
    const currentTransaction = (0, _transactions.TransactionMock)({
        type: 'PROCESS_DEPOSIT_QUEUE',
        block: {
            timestamp: (0, _moment.default)(endDate).unix() - 1
        }
    });
    // Order and filter transactions
    const orderedTxs = (0, _lodash.orderBy)(transactions, 'block.number', 'asc');
    const txs = [
        ...orderedTxs,
        currentTransaction
    ].filter((t)=>_moment.default.unix(t.block.timestamp).isBetween((0, _moment.default)(startDate), (0, _moment.default)(endDate)));
    // Check first request deposit and first process queue
    const processDeposit = txs.find((t)=>t.type === 'PROCESS_DEPOSIT_QUEUE');
    const requestDeposits = txs.filter((t)=>t.type === 'REQUEST_DEPOSIT' && t.block.timestamp < ((processDeposit == null ? void 0 : processDeposit.block.timestamp) || 0));
    // Check request deposit
    if (!requestDeposits.length || !processDeposit) {
        return CAMPAIGN_METRICS;
    }
    // Check cancel deposit
    const cancelDeposit = txs.find((t)=>t.type === 'DELETE_DEPOSIT_REQUEST');
    if (cancelDeposit && _moment.default.unix(cancelDeposit.block.timestamp).isBefore(_moment.default.unix(processDeposit.block.timestamp))) {
        const cancelDepositIndex = txs.findIndex((t)=>t.type === 'DELETE_DEPOSIT_REQUEST') + 1;
        return getRuleQueuePoints(rule, txs.slice(cancelDepositIndex), token, options);
    }
    // Calculate age between request and process
    let totalReward = (0, _core.BNify)(0);
    let perDayReward = (0, _core.BNify)(0);
    const distributionDays = _moment.default.duration(frequency.value, frequency.unit).asDays();
    for (const request of requestDeposits){
        const delta = _moment.default.unix(processDeposit.block.timestamp).diff(_moment.default.unix(request.block.timestamp), frequency.unit);
        const ageMultiplier = (0, _core.BNify)(delta).div(frequency.value);
        const requestAmount = (0, _tokens.fixTokenAmount)(token, request.tokenAmount);
        const requestReward = (0, _core.BNify)(requestAmount).times(ageMultiplier);
        totalReward = totalReward.plus(requestReward);
        // Points per day
        const pointsPerDay = (0, _core.BNgt)(requestAmount, 0) ? (0, _core.BNify)(requestAmount).times(reward.value).div(distributionDays).toString() : 0;
        perDayReward = perDayReward.plus(pointsPerDay);
    }
    const rulePoints = (0, _core.BNify)(reward.value).times(totalReward);
    // Get next points
    const nextIndex = txs.findIndex((t)=>t.type === 'PROCESS_DEPOSIT_QUEUE');
    if (nextIndex <= 0) {
        return {
            points: rulePoints.toString(),
            perDay: perDayReward.toString(),
            multiplier: '1'
        };
    }
    const { points, perDay } = getRuleQueuePoints(rule, txs.slice(nextIndex + 1), token, options);
    return {
        points: rulePoints.plus(points).toString(),
        perDay: perDayReward.plus(perDay).toString(),
        multiplier: '1'
    };
}
/**
 * Apply boosts to rules
 * @param rules rules
 * @param boosts boosts
 * @returns boosted rules
 */ function applyBoostsToRules(rules, boosts = []) {
    // Aggregate rules metrics to extract the maximum multiplier to apply
    const { multiplier: ruleMultiplier } = rules.reduce((acc, v)=>makeMetrics(acc, v), CAMPAIGN_METRICS);
    return rules.map((rule)=>{
        const basePoints = (0, _core.BNify)(rule.points);
        const basePerDay = (0, _core.BNify)(rule.perDay);
        // Get boosts to be applied to this rule
        const relevantBoosts = boosts.filter((b)=>{
            var _b_rules;
            return !((_b_rules = b.rules) == null ? void 0 : _b_rules.length) || rule.code && b.rules.includes(rule.code);
        });
        const maxBoostMultiplier = relevantBoosts.reduce((acc, b)=>_bignumber.default.max(acc, b.multiplier || '1'), (0, _core.BNify)('1'));
        const totalMultiplierScaled = relevantBoosts.reduce((acc, b)=>acc.times(b.multiplierScaled || '1'), (0, _core.BNify)('1'));
        const effectivePoints = basePoints.times(ruleMultiplier);
        const effectivePerDay = basePerDay.times(ruleMultiplier);
        const boostedPoints = effectivePoints.times(totalMultiplierScaled);
        const boostedPerDay = effectivePerDay.times(maxBoostMultiplier);
        return {
            code: rule.code,
            rewards: rule.rewards || [],
            points: boostedPoints.toFixed(0),
            perDay: boostedPerDay.toFixed(0),
            multiplier: (0, _core.BNFloat)(_bignumber.default.max(maxBoostMultiplier, ruleMultiplier), 4),
            multiplierScaled: (0, _core.BNFloat)(totalMultiplierScaled, 4)
        };
    });
}
/**
 * Generic function to calculate or aggregate metrics
 * @param rules - the base metrics (rules or vaults)
 * @param boosts - the boost metrics
 * @param applyMultiplier - whether to apply the rules multiplier
 * @returns the computed CampaignMetrics
 */ function computeMetrics(rules, boosts = [], applyMultiplier) {
    const { points: rulesPoints, perDay: rulesPerDay, multiplier: rulesMultiplier, rewards: rulesRewards } = rules.reduce((acc, r)=>makeMetrics(acc, r), CAMPAIGN_METRICS);
    const { points: boostsPoints, perDay: boostsPerDay, multiplier: boostsMultiplier, multiplierScaled, rewards: boostsRewards } = boosts.reduce((acc, b)=>makeMetrics(acc, b), CAMPAIGN_METRICS);
    const multiplier = _bignumber.default.max(rulesMultiplier, boostsMultiplier).toString();
    const boostsPointsScaled = (0, _core.BNify)(boostsPoints).times(multiplierScaled || '1');
    const points = applyMultiplier ? (0, _core.BNify)(rulesPoints).times(rulesMultiplier).plus(boostsPointsScaled) : (0, _core.BNify)(rulesPoints).plus(boostsPointsScaled);
    const perDay = applyMultiplier ? (0, _core.BNify)(rulesPerDay).times(rulesMultiplier).plus(boostsPerDay) : (0, _core.BNify)(rulesPerDay).plus(boostsPerDay);
    const finalPerDay = perDay.times(boostsMultiplier).toString();
    const rewards = mergeRewards([], [
        ...rulesRewards || [],
        ...boostsRewards || []
    ]);
    return {
        rewards,
        points: points.toString(),
        perDay: finalPerDay,
        multiplier,
        multiplierScaled
    };
}
function makeMetrics(acc, item) {
    const points = (0, _core.BNify)(item.points).plus(acc.points);
    const perDay = (0, _core.BNify)(item.perDay).plus(acc.perDay);
    const multiplierScaled = (0, _core.BNify)(acc.multiplierScaled).times(item.multiplierScaled || '1');
    const multiplier = _bignumber.default.maximum(item.multiplier, acc.multiplier);
    const rewards = mergeRewards(acc.rewards || [], item.rewards || []);
    return {
        rewards,
        points: points.toString(),
        perDay: perDay.toString(),
        multiplier: multiplier.toString(),
        multiplierScaled: multiplierScaled.toString()
    };
}
function mergeRewards(source, target) {
    return [
        ...source,
        ...target
    ].reduce((acc, r)=>{
        const existing = acc.find((r)=>r.tokenId === r.tokenId);
        var _r_amount;
        const amount = (0, _core.BNify)((_r_amount = r.amount) != null ? _r_amount : '0');
        var _r_USD;
        const USD = (0, _core.BNify)((_r_USD = r.USD) != null ? _r_USD : '0');
        // Update reward amounts
        if (existing) {
            var _existing_amount;
            existing.amount = (0, _core.BNFixed)((0, _core.BNify)((_existing_amount = existing.amount) != null ? _existing_amount : '0').plus(amount));
            var _existing_USD;
            existing.USD = (0, _core.BNFixed)((0, _core.BNify)((_existing_USD = existing.USD) != null ? _existing_USD : '0').plus(USD));
        } else {
            // Add reward
            const reward = _extends._({
                USD: (0, _core.BNFixed)(USD)
            }, r.tokenId && {
                tokenId: r.tokenId,
                amount: (0, _core.BNFixed)(amount)
            });
            acc.push(reward);
        }
        return acc;
    }, []);
}
function getCampaignPointsPerDay(campaign, trigger, depositType, token, vaultId, depositAmount = '1000000' // $1
) {
    var _campaign_rules;
    const rules = (_campaign_rules = campaign.rules) == null ? void 0 : _campaign_rules.filter((r)=>r.trigger === trigger && r.deposit.type === depositType && (!r.vaultIds || r.vaultIds.includes(vaultId)));
    const deposit = (0, _tokens.fixTokenAmount)(token, depositAmount);
    if (!(rules == null ? void 0 : rules.length) || (0, _core.BNlte)(deposit, 0)) {
        return '0';
    }
    return rules.reduce((acc, { frequency, reward })=>{
        // const points = BNify(deposit).times(r.reward.value)
        const distributionDays = _moment.default.duration(frequency.value, frequency.unit).asDays();
        const pointsPerDay = (0, _core.BNify)(deposit).times(reward.value).div(distributionDays).toString();
        return (0, _core.BNify)(acc).plus(pointsPerDay).toString();
    }, '0');
}

//# sourceMappingURL=campaign-points.lib.js.map