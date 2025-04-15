import { _ as _extends } from "@swc/helpers/_/_extends";
import BigNumber from 'bignumber.js';
import { apr2apy, BNFixed, BNify, BNlt, BNlte, SECONDS_IN_YEAR } from '../../core';
import { getVaultRewardProgramsApr } from './vault-block-rewards.lib';
import moment from 'moment';
/**
 * Parse APRs from contract data
 * @param APRs vault contract raw APRs
 * @returns parsed APRs
 */ export function parseVaultContractAPRs(APRs, integrationsData) {
    // Get APR from integration
    if (integrationsData == null ? void 0 : integrationsData.APR) {
        return {
            BASE: integrationsData.APR
        };
    }
    return {
        BASE: BNify(APRs.BASE).div(1e18).toNumber()
    };
}
/**
 * Convert vault APRs into APYs
 * @param vault vault entity
 * @param APRs vault APRs
 * @returns Compounded APRs
 */ export function parseAPYs(vaultContractType, APRs, options) {
    const { feePercentage, totalDuration } = options || {};
    // Compound Base APY
    const BASE = compoundVaultApr(vaultContractType, 'BASE', APRs.BASE, totalDuration);
    const grossNetAPR = Number(BNify(APRs.BASE).plus(BNify(APRs.HARVEST)).times(BNify(1).minus(BNify(feePercentage).div(1e5))));
    // Compound Net APY
    const NET = Number(BNify(compoundVaultApr(vaultContractType, 'NET', grossNetAPR || 0, totalDuration)).plus(BNify(APRs.REWARDS)));
    const HARVEST = APRs.HARVEST && compoundVaultApr(vaultContractType, 'HARVEST', APRs.HARVEST, totalDuration);
    const REWARDS = APRs.REWARDS && compoundVaultApr(vaultContractType, 'REWARDS', APRs.REWARDS, totalDuration);
    // Calculate GROSS APY
    const GROSS = Number(BNify(BASE).plus(BNify(HARVEST)).plus(BNify(REWARDS)).toFixed(8));
    const FEE = Number(BNify(feePercentage).div(1e3));
    const APYs = {
        BASE,
        NET,
        GROSS,
        FEE
    };
    if (HARVEST) {
        APYs.HARVEST = HARVEST;
    }
    if (REWARDS) {
        APYs.REWARDS = REWARDS;
    }
    return APYs;
}
/**
 * Compound vault APR
 * @param vault vault entity
 * @param type APR type
 * @param rate APR
 * @returns Compounded APR
 */ export function compoundVaultApr(vaultContractType, type, rate, totalDuration) {
    switch(type){
        // Don't compound REWARD APR
        case 'REWARDS':
            return rate;
        default:
            {
                const compoundingPeriod = getVaultCompoundingPeriod(vaultContractType, totalDuration);
                const APY = BNFixed(apr2apy(BNify(rate).div(100), compoundingPeriod).times(100), 8);
                if (!BNify(Number(APY)).isFinite()) {
                    return 999999;
                }
                return Number(APY);
            }
    }
}
/**
 * Get vault compounding period
 * @param vault vault entity
 * @param epochDuration epoch duration
 * @returns vault compounding period
 */ export function getVaultCompoundingPeriod(vaultContractType, totalDuration) {
    switch(vaultContractType){
        case 'CDO_EPOCH':
            return BigNumber.minimum(365, BigNumber.maximum(1, BNify(365).div(BNify(totalDuration).div(86400)))).integerValue(BigNumber.ROUND_FLOOR).toNumber();
        default:
            return 365;
    }
}
/**
 * Get vault APRs
 * @param vault vault entity
 * @param vaultData vault contract data
 * @param tvlUSD TVL converted in USD
 * @param rewardTokens reward tokens entities
 * @returns Vault APRs
 */ export function makeVaultAPRs(vaultData, options = {}) {
    const { feePercentage, integrations } = options;
    const APRs = parseVaultContractAPRs(vaultData.APRs || {}, integrations);
    const REWARDS = getVaultRewardProgramsApr(vaultData, APRs, options);
    // Calculate GROSS APR
    const GROSS = Number(BNFixed(BNify(APRs.BASE).plus(BNify(APRs.HARVEST)).plus(BNify(REWARDS)), 8));
    // Calculate NET APR
    const NET = Number(BNFixed(BNify(APRs.BASE).plus(BNify(APRs.HARVEST)).times(BNify(1).minus(BNify(feePercentage).div(1e5))).plus(BNify(REWARDS)), 8));
    const FEE = Number(BNify(feePercentage).div(1e3));
    return _extends({}, APRs, {
        REWARDS,
        GROSS,
        NET,
        FEE
    });
}
/**
 * Get vault expected deposit interests
 * @param block - the vault block
 * @param depositAmount - the deposit amount
 * @returns the interest amount expected of the epoch
 */ export function getVaultBlockDepositInterest(block, depositAmount) {
    if (!block.cdoEpoch) {
        return '0';
    }
    const { APRs } = block;
    const { duration, bufferDuration = 0 } = block.cdoEpoch;
    const interests = BNify(depositAmount).times(APRs.BASE || 0).div(100).times(duration + bufferDuration).div(SECONDS_IN_YEAR).toString();
    const amount = BNFixed(interests, 0).toString();
    return amount;
}
/**
 * Get vault block withdrawable amount
 * @param block - the vault block
 * @param lpBalance - the LP balance
 * @param maxWithdrawable - the max withdrawable
 * @param withdrawAmount - the withdraw amount
 * @returns the underlying amount
 */ export function getVaultBlockWithdrawableAmount(block, lpBalance, maxWithdrawable, withdrawAmount) {
    const balance = getVaultBlockUnderlyingAmount(block, lpBalance);
    if (BNlte(balance, 0) || BNlte(withdrawAmount, 0) || BNlte(maxWithdrawable, 0)) {
        return '0';
    }
    const withdrawableAmount = BNify(withdrawAmount).times(maxWithdrawable).div(balance).toFixed(0);
    return withdrawableAmount;
}
/**
 * Get vault block Underlying amount
 * @param block - the vault block
 * @param token - the vault token
 * @param amount - the LP amount
 * @returns the LP price
 */ export function getVaultBlockUnderlyingAmount(block, lpAmount) {
    return BNify(lpAmount).times(block.price).div(`1e18`).toFixed(0);
}
/**
 * Get epoch withdraw type by block
 * @param block the vault block
 * @returns epoch withdraw type
 */ export function getEpochWithdrawTypeByBlock(block) {
    var _block_cdoEpoch;
    return ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.withdrawType) || 'STANDARD';
}
export function getVaultBlockEpochWithdrawType(apr, lastApr, instantWithdraws) {
    if (!instantWithdraws) {
        return 'STANDARD';
    }
    const aprDiff = BNify(apr || 0).minus(lastApr || 0);
    return BNlt(aprDiff, -(instantWithdraws.aprDelta || 0)) ? 'INSTANT' : 'STANDARD';
}
/**
 * Get vault block next epoch interests
 * @param block - the vault block
 * @param lpBalance - the LP balance
 * @param maxWithdrawable - the max withdrawable
 * @returns the interest amounts
 */ export function getVaultBlockInterestAmounts(block, lpBalance, maxWithdrawable) {
    if (BNlte(maxWithdrawable, 0)) {
        return {
            lp: '0',
            amount: '0'
        };
    }
    // For instant withdraw it's necessary calculate interest amounts
    const withdrawType = getEpochWithdrawTypeByBlock(block);
    if (withdrawType === 'INSTANT') {
        return calculateVaultBlockInterestAmounts(block, lpBalance);
    }
    // Calculate new vault price
    const newVaultPrice = BNify(maxWithdrawable).div(lpBalance).times(1e18);
    if (BNlte(newVaultPrice, 0)) {
        return {
            lp: '0',
            amount: '0'
        };
    }
    // Calculate LP amount and token amount
    const lp = BNFixed(BNify(newVaultPrice).minus(block.price).times(lpBalance).div(newVaultPrice));
    const amount = BNFixed(BNify(lp).times(newVaultPrice).div(`1e18`));
    return {
        lp,
        amount: BNlte(amount, 0) ? '0' : amount
    };
}
/**
 * Calculate vault block interest amounts
 * @param block - the vault block
 * @param lpBalance - the LP balance
 * @returns the interest amounts
 */ export function calculateVaultBlockInterestAmounts(block, lpBalance) {
    var _block_cdoEpoch, _block_cdoEpoch1, _block_cdoEpoch2;
    if (BNlte((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.apr, 0)) {
        return {
            lp: '0',
            amount: '0'
        };
    }
    // Calculate epoch APR
    const aprPercentage = BNify((_block_cdoEpoch1 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch1.apr).div(100);
    const epochApr = aprPercentage.div(BNify(SECONDS_IN_YEAR).div(((_block_cdoEpoch2 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch2.duration) || 0));
    // Calculate future interests
    const futureLp = BNify(lpBalance).times(epochApr).div(BNify(epochApr).plus(1)).toFixed(0);
    const futureInterest = getVaultBlockUnderlyingAmount(block, futureLp);
    return {
        amount: futureInterest,
        lp: futureLp
    };
}
/**
 * Get vault epoch status by block
 * @param vault - the cdo epoch vault
 * @param block - the vault block
 * @returns the epoch client status
 */ export function getVaultBlockEpochStatus(block, date) {
    if (!block.cdoEpoch) {
        return;
    }
    const { status, endDate } = block.cdoEpoch;
    if (status === 'DEFAULTED' || status === 'WAITING') {
        return status;
    }
    // Check finished status
    if (moment(date).isAfter(endDate)) {
        return 'FINISHED';
    }
    // Running
    return status;
}
/**
 * Get vault block epoch waiting progression data
 * @param block - the vault block
 * @param date - the date to use
 * @returns the progression data
 */ export function getVaultBlockEpochWaitingProgression(block, date) {
    var _block_cdoEpoch, _block_cdoEpoch1;
    const waitingPeriod = ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.bufferDuration) || 0;
    // Current end date and next start date
    const endDate = moment((_block_cdoEpoch1 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch1.endDate).toISOString();
    const startDate = moment(endDate).add(waitingPeriod, 'second').toISOString();
    const progression = BNify(moment(date).diff(endDate, 'second')).div(waitingPeriod).times(100).toNumber();
    const progress = BigNumber.minimum(100, progression).toNumber();
    return {
        startDate,
        endDate,
        progress
    };
}
/**
 * Get vault block epoch progression data
 * @param block - the vault block
 * @param date - the date to use
 * @returns the progression data
 */ export function getVaultBlockEpochProgression(block, date) {
    var _block_cdoEpoch, _block_cdoEpoch1, _block_cdoEpoch2;
    const duration = BNify((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.duration);
    // Current end date and next start date
    const startDate = moment((_block_cdoEpoch1 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch1.startDate).toISOString();
    const endDate = moment((_block_cdoEpoch2 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch2.endDate).toISOString();
    const progression = BNify(moment(date).diff(startDate, 'second')).div(duration).times(100);
    const progress = BigNumber.minimum(100, progression).toNumber();
    return {
        startDate,
        endDate,
        progress
    };
}
/**
 * Get Vault block net APY
 * @param block - the vault block
 * @returns the vault block net APY calculated by gross and net
 */ export function getVaultBlockAPYNet(block, type) {
    if (BNlte(block.APYs.NET, 0) || BNlte(block.APYs.GROSS, 0)) {
        return '0';
    }
    const apyGross = type === 'BASE' ? block.APYs.BASE : block.APYs.REWARDS;
    if (BNlte(apyGross, 0)) {
        return '0';
    }
    return BNify(apyGross).times(block.APYs.NET || 0).div(block.APYs.GROSS || 0).toString();
}

//# sourceMappingURL=vault-block.lib.js.map