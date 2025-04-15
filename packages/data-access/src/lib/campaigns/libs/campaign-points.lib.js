import { _ as _extends } from "@swc/helpers/_/_extends";
import { orderBy } from 'lodash';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { BNgt, BNify, BNlte } from '../../core';
import { TransactionMock } from '../../transactions';
import { WalletBlockMock } from '../../wallet-blocks';
import { fixTokenAmount } from '../../tokens';
const CAMPAIGN_METRICS = {
    points: '0',
    perDay: '0',
    multiplier: '1'
};
/**
 * Get campaign points
 * @param campaign - the campaign
 * @param vaults - the vault campaign
 * @param transactions - the vault transactions
 */ export function getCampaignPoints(campaign, campaignVaults, transactions, walletBlocks, tokens) {
    // Calculate vaults points
    const vaults = campaignVaults.map((v)=>getCampaignVaultPoints(campaign, v, transactions.filter((t)=>t.vaultId === v._id), walletBlocks.filter((b)=>b.vaultId === v._id), tokens.find((t)=>t._id === v.tokenId)));
    // Calculate aggregation
    const { points, perDay, multiplier } = calculateMetrics(vaults);
    return {
        points,
        perDay,
        multiplier,
        vaults
    };
}
/**
 * Get campaign vault points
 * @param campaign - the campaign
 * @param vault - the vault
 * @param transactions - the wallet transactions
 * @param walletBlock -  the wallet block
 * @returns the vault points
 */ export function getCampaignVaultPoints(campaign, vault, transactions, walletBlocks, token) {
    var _vault_campaigns;
    // Check rules
    const vaultCampaign = (_vault_campaigns = vault.campaigns) == null ? void 0 : _vault_campaigns.find((c)=>c._id === campaign._id);
    const vaultRules = campaign.rules || (vaultCampaign == null ? void 0 : vaultCampaign.rules);
    if (!(vaultRules == null ? void 0 : vaultRules.length) || !token) {
        return _extends({
            _id: vault._id
        }, CAMPAIGN_METRICS);
    }
    // Calculate vaults points
    const rules = vaultRules.map((r)=>getCampaignRuleVaultPoints(campaign, r, transactions, walletBlocks, token));
    // Calculate aggregation
    const { points: vaultPoints, perDay: vaultPerDay, multiplier } = calculateMetrics(rules);
    const points = BNify(vaultPoints).times(multiplier).toString();
    const perDay = BNify(vaultPerDay).times(multiplier).toString();
    return {
        _id: vault._id,
        points,
        perDay,
        multiplier
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
                const depositPoints = rule.deposit.type === 'BALANCE' ? getRuleDepositBalancePoints(rule, walletBlocks, token, options) : getRuleDepositAgePoints(rule, walletBlocks, options);
                return depositPoints;
            }
        case 'DEPOSIT_REQUEST':
            {
                const depositRequestPoints = getRuleQueuePoints(rule, transactions, token, options);
                return depositRequestPoints;
            }
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
    const { startDate, endDate } = options;
    // Order and filter wallet blocks
    const blocks = orderBy(walletBlocks, 'block.number', 'asc');
    // Fake current block
    const lastBlock = blocks.length ? blocks[blocks.length - 1] : undefined;
    const currentBlock = WalletBlockMock({
        block: {
            timestamp: moment(endDate).unix()
        },
        tokenBalance: (lastBlock == null ? void 0 : lastBlock.tokenBalance) || '0'
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
        const prevBalance = (prevBlock == null ? void 0 : prevBlock.tokenBalance) || 0;
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
        if (BNgt(prevBlock == null ? void 0 : prevBlock.tokenBalance)) {
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
 * Calculate metrics by items
 * @param items - the metrics
 * @returns the new metrics
 */ export function calculateMetrics(items) {
    const { points, perDay, multiplier } = items.reduce((acc, v)=>{
        const points = BNify(v.points).plus(acc.points);
        const perDay = BNify(v.perDay).plus(acc.perDay);
        const multiplier = BigNumber.maximum(v.multiplier, acc.multiplier);
        return {
            points: points.toString(),
            perDay: perDay.toString(),
            multiplier: multiplier.toString()
        };
    }, CAMPAIGN_METRICS);
    return {
        points,
        perDay,
        multiplier
    };
}
/**
 * Get campaign deposit point
 * @param campaign - the campaign
 * @param trigger - the rule trigger
 * @param token - the deposit token
 * @param depositAmount - the deposit amount
 * @returns the campaign point
 */ export function getCampaignPointsPerDay(campaign, trigger, token, depositAmount = '1000000' // $1
) {
    var _campaign_rules;
    const rules = (_campaign_rules = campaign.rules) == null ? void 0 : _campaign_rules.filter((r)=>r.trigger === trigger && r.deposit.type === 'BALANCE');
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