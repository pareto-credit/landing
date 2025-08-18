import { _ as _extends } from "@swc/helpers/_/_extends";
import { orderBy } from 'lodash';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { BlockMock, BNFixed, BNgt, BNgte, BNify, BNlte } from '../../core';
import { TransactionMock } from '../../transactions';
import { getWalletBlockBalance, getWalletBlockTokenBalance, WalletBlockMock } from '../../wallet-blocks';
import { fixTokenAmount } from '../../tokens';
const CAMPAIGN_METRICS = {
    points: '0',
    perDay: '0',
    multiplier: '1',
    multiplierScaled: '1'
};
/**
 * Get campaign points
 * @param campaign - the campaign
 * @param vaults - the vault campaign
 * @param transactions - the vault transactions
 */ export function getCampaignPoints(campaign, campaignVaults, transactions, walletBlocks, tokens, campaignTokens, affiliatedPoints, affiliatedPerformances, referred) {
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
/**
 * Get campaign vault points
 * @param campaign - the campaign
 * @param vault - the vault
 * @param transactions - the wallet transactions
 * @param walletBlock -  the wallet block
 * @returns the vault points
 */ export function getCampaignVaultPoints(campaign, vault, transactions, walletBlocks, token, campaignTokens) {
    var _vault_campaigns, _campaign_rules;
    // Check rules
    const vaultCampaign = (_vault_campaigns = vault.campaigns) == null ? void 0 : _vault_campaigns.find((c)=>c._id === campaign._id);
    const campaignRules = (_campaign_rules = campaign.rules) == null ? void 0 : _campaign_rules.filter((r)=>!r.vaultIds || r.vaultIds.includes(vault._id));
    const vaultRules = campaignRules || (vaultCampaign == null ? void 0 : vaultCampaign.rules);
    if (!(vaultRules == null ? void 0 : vaultRules.length) || !token) {
        return _extends({
            _id: vault._id
        }, CAMPAIGN_METRICS);
    }
    // Calculate vaults points
    const rules = vaultRules.filter((r)=>!r.vaultIds || r.vaultIds.includes(vault._id)).map((r)=>{
        const ruleToken = r.deposit.tokenId ? campaignTokens == null ? void 0 : campaignTokens.find((t)=>t._id === r.deposit.tokenId) : token;
        const ruleMetrics = getCampaignRuleVaultPoints(campaign, r, transactions, walletBlocks, ruleToken || token);
        return _extends({
            code: r.code
        }, ruleMetrics);
    });
    const boosts = (campaign.boosts || []).filter((b)=>{
        var _b_vaultIds;
        return !!((_b_vaultIds = b.vaultIds) == null ? void 0 : _b_vaultIds.includes(vault._id));
    }).map((b)=>{
        const boostToken = b.tokenId ? campaignTokens == null ? void 0 : campaignTokens.find((t)=>t._id === b.tokenId) : token;
        const boostMetrics = getCampaignBoostVaultPoints(campaign, b, transactions, walletBlocks, boostToken || token);
        return _extends({
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
/**
 * Get campaign rule vault points
 * @param rule - the campaign rule
 * @param vault - the vault
 * @param transactions - the wallet transactions
 * @param walletBlock -  the wallet block
 * @returns the rule vault points
 */ export function getCampaignRuleVaultPoints(campaign, rule, transactions, walletBlocks, token) {
    const options = {
        startDate: campaign.startDate || campaign.createdAt,
        endDate: campaign.endDate
    };
    switch(rule.trigger){
        case 'DEPOSIT':
            {
                switch(rule.deposit.type){
                    case 'BALANCE':
                        return getRuleDepositBalancePoints(rule, walletBlocks, token, options);
                    case 'BALANCE_SUSP':
                        return getRuleDepositBalancePoints(rule, walletBlocks, token, _extends({}, options, {
                            balanceField: 'suspAggregated'
                        }));
                    case 'BALANCE_USP':
                        return getRuleDepositBalancePoints(rule, walletBlocks, token, _extends({}, options, {
                            balanceField: 'uspPools'
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
/**
 * Get campaign vault boost points
 * @param rule - the campaign rule
 * @param vault - the vault
 * @param transactions - the wallet transactions
 * @param walletBlock -  the wallet block
 * @param token -  the vault token
 * @returns the rule vault points
 */ export function getCampaignBoostVaultPoints(campaign, boost, transactions, walletBlocks, token) {
    const options = {
        startDate: campaign.startDate || campaign.createdAt,
        endDate: campaign.endDate
    };
    switch(boost.type){
        case 'STAKE':
            {
                return getBoostStakeRewards(boost, walletBlocks, token, options);
            }
        case 'DEPOSIT_NAPIER':
            return getBoostStakeRewards(boost, walletBlocks, token, _extends({}, options, {
                balanceField: 'balance',
                protocols: [
                    'NapierLP',
                    'NapierYT'
                ]
            }));
        case 'DEPOSIT_BALANCER':
            {
                return getBoostStakeRewards(boost, walletBlocks, token, _extends({}, options, {
                    balanceField: 'uspBalance',
                    protocols: [
                        'Balancer'
                    ]
                }));
            }
        default:
            return CAMPAIGN_METRICS;
    }
}
/**
 * Get campaign boost points
 * @param rule - the campaign rule
 * @param affiliatedPoints - the affiliated points
 * @returns the boost global points
 */ export function getCampaignBoostPoints(boost, totalPoints, affiliatedPoints, affiliatedPerformances, referredBlocks, token) {
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
/**
 * Get rule deposit balance points
 * @param rule - the rule campaign
 * @param walletBlocks - the wallet blocks
 * @param token - the vault token
 * @param options - the calculation options
 * @returns the campaign points
 */ export function getRuleDepositBalancePoints({ frequency, reward }, walletBlocks, token, options) {
    const { startDate, endDate, balanceField } = options;
    // Order and filter wallet blocks
    const blocks = orderBy(walletBlocks, 'block.number', 'asc');
    // Fake current block
    const lastBlock = blocks.length ? blocks[blocks.length - 1] : undefined;
    const currentBlock = WalletBlockMock({
        block: {
            timestamp: moment(endDate).unix()
        },
        tokenBalance: lastBlock ? getWalletBlockBalance(lastBlock, balanceField, {
            token
        }) : '0'
    });
    return [
        ...blocks,
        currentBlock
    ].reduce((acc, b, i)=>{
        // Check the block timestamp
        if (moment.unix(b.block.timestamp).isBefore(moment(startDate)) || moment.unix(b.block.timestamp).isAfter(moment(endDate))) {
            return acc;
        }
        // Age calculation
        const prevBlock = blocks[i - 1];
        const prevTimestamp = (prevBlock == null ? void 0 : prevBlock.block.timestamp) || 0;
        const prevBalance = prevBlock ? getWalletBlockBalance(prevBlock, balanceField, {
            token
        }) : '0';
        const date = moment.unix(prevTimestamp).isAfter(startDate) ? moment.unix(prevTimestamp) : moment(startDate);
        const delta = moment.unix(b.block.timestamp).diff(date, frequency.unit, true);
        const ageMultiplier = BNify(delta).div(frequency.value).toString();
        const balance = fixTokenAmount(token, prevBalance);
        const rulePoints = BNify(balance).times(reward.value).times(ageMultiplier);
        // Points per day
        const distributionDays = moment.duration(frequency.value, frequency.unit).asDays();
        const pointsPerDay = i === blocks.length && BNgt(balance, 0) ? BNify(balance).times(reward.value).div(distributionDays).toString() : 0;
        return {
            points: BNify(acc.points).plus(rulePoints).toString(),
            perDay: BNify(acc.perDay).plus(pointsPerDay).toString(),
            multiplier: acc.multiplier
        };
    }, CAMPAIGN_METRICS);
}
/**
 * Get rule deposit age points
 * @param rule - the rule campaign
 * @param walletBlocks - the wallet blocks
 * @param options - the calculation options
 * @returns the campaign points
 */ export function getRuleDepositAgePoints({ frequency, reward }, walletBlocks, options) {
    const { startDate, endDate } = options;
    // Order and filter wallet blocks
    let age = 0;
    const blocks = orderBy(walletBlocks, 'block.number', 'asc');
    // Fake current block
    const currentBlock = WalletBlockMock({
        block: {
            timestamp: moment(endDate).unix() - 1
        }
    });
    return [
        ...blocks,
        currentBlock
    ].reduce((acc, b, i)=>{
        // Check the block timestamp
        if (!moment.unix(b.block.timestamp).isBetween(moment(startDate), moment(endDate))) {
            return acc;
        }
        const prevBlock = blocks[i - 1];
        const prevBalance = prevBlock ? getWalletBlockBalance(prevBlock) : '0';
        if (BNgt(prevBalance)) {
            const date = moment.unix(prevBlock == null ? void 0 : prevBlock.block.timestamp).isAfter(startDate) ? moment.unix(prevBlock == null ? void 0 : prevBlock.block.timestamp) : moment(startDate);
            const delta = moment.unix(b.block.timestamp).diff(date, frequency.unit, true);
            age += delta;
        }
        const ruleMultiplier = age >= frequency.value ? reward.value : 1;
        const multiplier = BigNumber.maximum(acc.multiplier, ruleMultiplier);
        return {
            points: acc.points,
            perDay: acc.perDay,
            multiplier: multiplier.toString()
        };
    }, CAMPAIGN_METRICS);
}
/**
 * Get boost stake rewards
 * @param boost boost object
 * @param transactions vault transactions
 * @param walletBlocks wallet blocks
 * @param token vault token
 * @param options campaign options
 * @returns boost rewards
 */ export function getBoostStakeRewards(boost, walletBlocks, token, options) {
    const { reward } = boost;
    // Calculate age between request and process
    const boostRewards = getBoostRewards(token, reward, walletBlocks, options);
    const multiplierScaled = BNgt(boostRewards.totalAge) ? boostRewards.multiplier.div(boostRewards.totalAge).toString() : '1';
    return {
        perDay: '0',
        points: boostRewards.points.toString(),
        multiplierScaled: multiplierScaled,
        multiplier: boostRewards.lastMultiplier.toString()
    };
}
/**
 * Get boost referral fees reward
 * @param boost - the campaign boost
 * @param affiliatedPoints - the affiliated fees
 * @returns the metrics
 */ export function getBoostReferralFeeReward({ reward }, affiliatedPerformances) {
    switch(reward.type){
        case 'AMOUNT':
            return {
                points: BNify(reward.value).toString(),
                perDay: '0',
                multiplier: '1'
            };
        case 'PERCENTAGE':
            {
                if (!(affiliatedPerformances == null ? void 0 : affiliatedPerformances.length)) {
                    return CAMPAIGN_METRICS;
                }
                const totalFeesUSD = affiliatedPerformances.reduce((acc, p)=>BNify(acc).plus(p.fees.USD).toString(), '0');
                return {
                    points: '0',
                    rewards: [
                        {
                            USD: BNify(totalFeesUSD).times(reward.value).div(100).toString()
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
/**
 * Get boost referral reward
 * @param boost - the campaign boost
 * @param affiliatedPoints - the affiliated points
 * @returns the metrics
 */ export function getBoostReferralReward({ reward }, affiliatedPoints) {
    switch(reward.type){
        case 'AMOUNT':
            return {
                points: BNify(reward.value).toString(),
                perDay: '0',
                multiplier: '1'
            };
        case 'PERCENTAGE':
            {
                if (!(affiliatedPoints == null ? void 0 : affiliatedPoints.length)) {
                    return CAMPAIGN_METRICS;
                }
                const totalPoints = affiliatedPoints.reduce((acc, p)=>BNify(acc).plus(p.points).toString(), '0');
                return {
                    points: BNify(totalPoints).times(reward.value).div(100).toString(),
                    perDay: '0',
                    multiplier: '1'
                };
            }
        default:
            return CAMPAIGN_METRICS;
    }
}
/**
 * Get boost referred reward
 * @param param0
 * @param totalPoints
 */ export function getBoostReferredReward({ reward }, totalPoints, referredBlocks, token) {
    if (!referredBlocks) {
        return CAMPAIGN_METRICS;
    }
    // Select referred blocks with at least 100 USP if token is specified
    const referred = token ? referredBlocks.filter((wB)=>BNgte(getWalletBlockBalance(wB, 'uspAggregated', {
            token
        }), 100 * 1e18)) : referredBlocks;
    if (!(referred == null ? void 0 : referred.length)) {
        return CAMPAIGN_METRICS;
    }
    switch(reward.type){
        case 'AMOUNT':
            {
                const points = BNify(reward.value).times(referred.length).toString();
                return {
                    points,
                    perDay: '0',
                    multiplier: '1'
                };
            }
        case 'PERCENTAGE':
            {
                if (BNlte(totalPoints)) {
                    return CAMPAIGN_METRICS;
                }
                const rewardPoints = BNify(totalPoints).times(reward.value).div(100);
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
/**
 * Calculate boost rewards from walletBlocks
 * @param reward campaign reward data
 * @param walletBlocks wallet blocks
 * @param vaultType vault type
 * @param stakedAmount wallet staked amount
 * @returns boost rewards
 */ export function calculateBoostBlockRewards(token, reward, walletBlock, balanceField, protocols) {
    // Get staked amount
    const stakedAmount = BNify(getWalletBlockTokenBalance(token, walletBlock, 0, protocols));
    const rewards = {
        points: BNify(0),
        multiplier: BNify(1),
        stakedAmount
    };
    const blockBalance = getWalletBlockBalance(walletBlock, balanceField, {
        token
    });
    switch(reward.type){
        case 'AMOUNT':
            return _extends({}, rewards, {
                points: BNify(reward.value)
            });
        case 'MULTIPLIER':
            {
                const stakedPercentage = BNgt(stakedAmount) ? stakedAmount.div(stakedAmount.plus(blockBalance)) : 0;
                const multiplier = BNgt(stakedPercentage) ? BNify(1).plus(BNify(reward.value - 1).times(stakedPercentage)) : BNify(1);
                return _extends({}, rewards, {
                    multiplier
                });
            }
    }
    return rewards;
}
/**
 * Get boost rewards for a specific wallet
 * @param token token object
 * @param reward campaign reward
 * @param walletBlocks wallet blocks
 * @returns
 */ export function getBoostRewards(token, reward, walletBlocks, options) {
    const { startDate, endDate, balanceField, protocols } = options;
    const startTimestamp = moment(startDate).unix();
    const endTimestamp = moment(endDate).unix();
    const orderedBlocks = orderBy(walletBlocks, 'block.number', 'asc');
    const firstWalletBlock = walletBlocks.find((wb)=>BNgt(getWalletBlockBalance(wb, 'tokenAggregated', {
            token,
            protocols
        })));
    const filteredWalletBlocks = orderedBlocks.filter((wb)=>BNgte(wb.block.number, firstWalletBlock == null ? void 0 : firstWalletBlock.block.number));
    // Fake current block
    const lastBlock = filteredWalletBlocks.length ? filteredWalletBlocks[filteredWalletBlocks.length - 1] : undefined;
    const currentBlock = WalletBlockMock(_extends({}, lastBlock || {}, {
        block: BlockMock(_extends({}, lastBlock == null ? void 0 : lastBlock.block, {
            timestamp: moment().unix()
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
        const blocksRewards = calculateBoostBlockRewards(token, reward, walletBlock, balanceField, protocols);
        const blockScaledMultiplier = BNify(blocksRewards.multiplier).times(age);
        const multiplier = acc.multiplier.plus(blockScaledMultiplier);
        const totalAge = acc.totalAge + age;
        return _extends({}, acc, {
            totalAge,
            points: acc.points.plus(blocksRewards.points || 0),
            multiplier,
            stakedAmount: blocksRewards.stakedAmount,
            lastMultiplier: BNify(blocksRewards.multiplier),
            totalStakedAmount: acc.totalStakedAmount.plus(blocksRewards.stakedAmount)
        });
    }, {
        totalAge: 0,
        points: BNify(0),
        multiplier: BNify(1),
        stakedAmount: BNify(0),
        lastMultiplier: BNify(1),
        totalStakedAmount: BNify(0)
    });
}
/**
 * Get rule queue balance points
 * @param rule - the rule campaign
 * @param transactions - the vault transactions
 * @param options - the calculation options
 * @returns the campaign points
 */ export function getRuleQueuePoints(rule, transactions, token, options) {
    const { frequency, reward } = rule;
    const { startDate, endDate } = options;
    // Fake current transaction
    const currentTransaction = TransactionMock({
        type: 'PROCESS_DEPOSIT_QUEUE',
        block: {
            timestamp: moment(endDate).unix() - 1
        }
    });
    // Order and filter transactions
    const orderedTxs = orderBy(transactions, 'block.number', 'asc');
    const txs = [
        ...orderedTxs,
        currentTransaction
    ].filter((t)=>moment.unix(t.block.timestamp).isBetween(moment(startDate), moment(endDate)));
    // Check first request deposit and first process queue
    const processDeposit = txs.find((t)=>t.type === 'PROCESS_DEPOSIT_QUEUE');
    const requestDeposits = txs.filter((t)=>t.type === 'REQUEST_DEPOSIT' && t.block.timestamp < ((processDeposit == null ? void 0 : processDeposit.block.timestamp) || 0));
    // Check request deposit
    if (!requestDeposits.length || !processDeposit) {
        return CAMPAIGN_METRICS;
    }
    // Check cancel deposit
    const cancelDeposit = txs.find((t)=>t.type === 'DELETE_DEPOSIT_REQUEST');
    if (cancelDeposit && moment.unix(cancelDeposit.block.timestamp).isBefore(moment.unix(processDeposit.block.timestamp))) {
        const cancelDepositIndex = txs.findIndex((t)=>t.type === 'DELETE_DEPOSIT_REQUEST') + 1;
        return getRuleQueuePoints(rule, txs.slice(cancelDepositIndex), token, options);
    }
    // Calculate age between request and process
    let totalReward = BNify(0);
    let perDayReward = BNify(0);
    const distributionDays = moment.duration(frequency.value, frequency.unit).asDays();
    for (const request of requestDeposits){
        const delta = moment.unix(processDeposit.block.timestamp).diff(moment.unix(request.block.timestamp), frequency.unit);
        const ageMultiplier = BNify(delta).div(frequency.value);
        const requestAmount = fixTokenAmount(token, request.tokenAmount);
        const requestReward = BNify(requestAmount).times(ageMultiplier);
        totalReward = totalReward.plus(requestReward);
        // Points per day
        const pointsPerDay = BNgt(requestAmount, 0) ? BNify(requestAmount).times(reward.value).div(distributionDays).toString() : 0;
        perDayReward = perDayReward.plus(pointsPerDay);
    }
    const rulePoints = BNify(reward.value).times(totalReward);
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
        const basePoints = BNify(rule.points);
        const basePerDay = BNify(rule.perDay);
        // Get boosts to be applied to this rule
        const relevantBoosts = boosts.filter((b)=>{
            var _b_rules;
            return !((_b_rules = b.rules) == null ? void 0 : _b_rules.length) || rule.code && b.rules.includes(rule.code);
        });
        const maxBoostMultiplier = relevantBoosts.reduce((acc, b)=>BigNumber.max(acc, b.multiplier || '1'), BNify('1'));
        const totalMultiplierScaled = relevantBoosts.reduce((acc, b)=>acc.times(b.multiplierScaled || '1'), BNify('1'));
        const effectivePoints = basePoints.times(ruleMultiplier);
        const effectivePerDay = basePerDay.times(ruleMultiplier);
        const boostedPoints = effectivePoints.times(totalMultiplierScaled);
        const boostedPerDay = effectivePerDay.times(maxBoostMultiplier);
        return {
            code: rule.code,
            rewards: rule.rewards || [],
            points: boostedPoints.toString(),
            perDay: boostedPerDay.toString(),
            multiplier: BigNumber.max(maxBoostMultiplier, ruleMultiplier).toString(),
            multiplierScaled: totalMultiplierScaled.toString()
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
    const multiplier = BigNumber.max(rulesMultiplier, boostsMultiplier).toString();
    const boostsPointsScaled = BNify(boostsPoints).times(multiplierScaled || '1');
    const points = applyMultiplier ? BNify(rulesPoints).times(rulesMultiplier).plus(boostsPointsScaled) : BNify(rulesPoints).plus(boostsPointsScaled);
    const perDay = applyMultiplier ? BNify(rulesPerDay).times(rulesMultiplier).plus(boostsPerDay) : BNify(rulesPerDay).plus(boostsPerDay);
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
/**
 * Campaign metrics accumulator
 * @param acc accumulator
 * @param item campaign metric
 * @returns campaign metrics
 */ export function makeMetrics(acc, item) {
    const points = BNify(item.points).plus(acc.points);
    const perDay = BNify(item.perDay).plus(acc.perDay);
    const multiplierScaled = BNify(acc.multiplierScaled).times(item.multiplierScaled || '1');
    const multiplier = BigNumber.maximum(item.multiplier, acc.multiplier);
    const rewards = mergeRewards(acc.rewards || [], item.rewards || []);
    return {
        rewards,
        points: points.toString(),
        perDay: perDay.toString(),
        multiplier: multiplier.toString(),
        multiplierScaled: multiplierScaled.toString()
    };
}
/**
 * Aggregate rewards by tokenId or USD
 * @param source source rewards
 * @param target target rewards
 * @returns aggregated rewards amounts
 */ export function mergeRewards(source, target) {
    return [
        ...source,
        ...target
    ].reduce((acc, r)=>{
        const existing = acc.find((r)=>r.tokenId === r.tokenId);
        var _r_amount;
        const amount = BNify((_r_amount = r.amount) != null ? _r_amount : '0');
        var _r_USD;
        const USD = BNify((_r_USD = r.USD) != null ? _r_USD : '0');
        // Update reward amounts
        if (existing) {
            var _existing_amount;
            existing.amount = BNFixed(BNify((_existing_amount = existing.amount) != null ? _existing_amount : '0').plus(amount));
            var _existing_USD;
            existing.USD = BNFixed(BNify((_existing_USD = existing.USD) != null ? _existing_USD : '0').plus(USD));
        } else {
            // Add reward
            const reward = _extends({
                USD: BNFixed(USD)
            }, r.tokenId && {
                tokenId: r.tokenId,
                amount: BNFixed(amount)
            });
            acc.push(reward);
        }
        return acc;
    }, []);
}
/**
 * Get campaign deposit point
 * @param campaign - the campaign
 * @param trigger - the rule trigger
 * @param token - the deposit token
 * @param depositAmount - the deposit amount
 * @returns the campaign point
 */ export function getCampaignPointsPerDay(campaign, trigger, depositType, token, vaultId, depositAmount = '1000000' // $1
) {
    var _campaign_rules;
    const rules = (_campaign_rules = campaign.rules) == null ? void 0 : _campaign_rules.filter((r)=>r.trigger === trigger && r.deposit.type === depositType && (!r.vaultIds || r.vaultIds.includes(vaultId)));
    const deposit = fixTokenAmount(token, depositAmount);
    if (!(rules == null ? void 0 : rules.length) || BNlte(deposit, 0)) {
        return '0';
    }
    return rules.reduce((acc, { frequency, reward })=>{
        // const points = BNify(deposit).times(r.reward.value)
        const distributionDays = moment.duration(frequency.value, frequency.unit).asDays();
        const pointsPerDay = BNify(deposit).times(reward.value).div(distributionDays).toString();
        return BNify(acc).plus(pointsPerDay).toString();
    }, '0');
}

//# sourceMappingURL=campaign-points.lib.js.map