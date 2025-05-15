import { _ as _extends } from "@swc/helpers/_/_extends";
import BigNumber from 'bignumber.js';
import { BNFixed, BNify, compLower } from '../../core';
import { compoundVaultApr } from './vault-block.lib';
/**
 * Get distribution frequency in days
 * @param frequency frequency params
 * @returns distribution frequency in days
 */ export function getDistributionFrequencyInDays(frequency) {
    switch(frequency.unit){
        case 'D':
            return frequency.value;
        case 'W':
            return frequency.value * 7;
        case 'M':
            return frequency.value * 30;
        case 'Y':
            return frequency.value * 365;
        default:
            throw new Error(`Unsupported frequency unit: ${frequency.unit}`);
    }
}
/**
 * Get reward program AMOUNT
 * @param rewardProgram reward program
 * @param options tvl and tokenPrice
 * @returns reward program AMOUNT data
 */ export function calculateRewardProgramAmount(rewardProgram, options) {
    const { tokenPrice, tvlUSD } = options || {};
    const tokenPriceUSD = BNify(tokenPrice || '1000000');
    const distributionInDays = getDistributionFrequencyInDays(rewardProgram.distributionFrequency);
    const distributionPeriod = BNify(365).div(distributionInDays);
    if (BNify(tvlUSD).lte(0)) {
        return {
            APR: 0
        };
    }
    const USD = BNify(rewardProgram.distributionValue).times(tokenPriceUSD).times(distributionPeriod);
    const APR = Number(BNFixed(USD.div(BNify(tvlUSD)).times(100), 8));
    return {
        APR,
        USD: BNFixed(USD)
    };
}
/**
 * Get reward program TARGET_APY
 * @param rewardProgram reward program
 * @param APRs vault interest rates
 * @returns reward program TARGET_APY data
 */ export function calculateRewardProgramTargetApy(rewardProgram, baseAPY) {
    const APR = Number(BNFixed(BigNumber.maximum(0, BNify(rewardProgram.distributionValue).minus(BNify(baseAPY))), 8));
    return {
        APR
    };
}
/**
 * Get Reward program APR
 * @param APRs Vault block APRs
 * @param rewardProgram reward program object
 * @returns Reward program APR
 */ export function makeVaultBlockRewardProgram(rewardProgram, APRs, options) {
    // Return 0 if reward program is not active
    if (!rewardProgram.isActive) {
        return {
            APR: 0
        };
    }
    switch(rewardProgram.distributionType){
        // Calculate APR by annualized distributed tokens
        case 'AMOUNT':
            return calculateRewardProgramAmount(rewardProgram, options);
        // Target APR - Base APR
        case 'TARGET_APY':
            {
                const { vaultContractType, epochDuration, feePercentage } = options || {};
                if (!vaultContractType) {
                    throw Error(`VaultContractType not specified for TARGET_APY calculation`);
                }
                // Calculate NET APR
                const netAPR = Number(BNify(APRs.BASE).times(BNify(1).minus(BNify(feePercentage).div(1e5))));
                const netAPY = compoundVaultApr(vaultContractType, 'BASE', netAPR, epochDuration);
                return calculateRewardProgramTargetApy(rewardProgram, netAPY);
            }
    }
}
/**
 * Get vault cumulative reward programs APR
 * @param vault vault entity
 * @param vaultData vault contract data
 * @param APRs APRs
 * @param tvlUSD TVL USD
 * @param rewardTokens reward tokens entities
 * @returns cumulative vault reward programs APR
 */ export function getVaultRewardProgramsApr(vaultData, APRs, options = {}) {
    const vaultBlockRewardPrograms = getVaultBlockRewardPrograms(vaultData, APRs, options);
    if (!vaultBlockRewardPrograms) {
        return 0;
    }
    return vaultBlockRewardPrograms == null ? void 0 : vaultBlockRewardPrograms.reduce((acc, rewardProgram)=>{
        return BNify(acc).plus(rewardProgram.APR).toNumber();
    }, 0);
}
/**
 * Get APRs for each reward program
 * @param vault vault entity
 * @param vaultData vault contract data
 * @param APRs vault APRs
 * @param options system options
 * @returns APR for each reward program
 */ export function getVaultBlockRewardPrograms(vaultData, APRs, options = {}) {
    var _vaultData_cdoEpoch;
    const { rewardPrograms } = options;
    if (!(rewardPrograms == null ? void 0 : rewardPrograms.length)) {
        return;
    }
    const epochDuration = (_vaultData_cdoEpoch = vaultData.cdoEpoch) == null ? void 0 : _vaultData_cdoEpoch.duration;
    // Get vault block reward programs
    return rewardPrograms.map((rewardProgram)=>getVaultBlockRewardProgram(rewardProgram, APRs, _extends({}, options, {
            tokens: vaultData.tokens,
            epochDuration
        })), []);
}
/**
 * Get vault block reward program
 * @param rewardProgram vault reward program
 * @param APRs vault APRs
 * @param options tvl, reward tokens entities, tokens contract data
 * @returns vault block reward program
 */ export function getVaultBlockRewardProgram(rewardProgram, APRs, options) {
    const { tokens, tvlUSD, rewardTokens, vaultContractType, epochDuration, feePercentage } = options || {};
    const token = rewardTokens == null ? void 0 : rewardTokens.find((token)=>token._id === rewardProgram.tokenId);
    // Throw error if no token found for this program
    if (!token) {
        throw Error(`Token not found for reward program (tokenId: ${rewardProgram.tokenId})`);
    }
    const tokenData = tokens == null ? void 0 : tokens.find((t)=>compLower(t.address, token.address));
    const rewardProgramData = makeVaultBlockRewardProgram(rewardProgram, APRs, {
        tvlUSD,
        tokenPrice: tokenData == null ? void 0 : tokenData.price,
        vaultContractType,
        epochDuration,
        feePercentage
    });
    return _extends({
        tokenId: rewardProgram.tokenId
    }, rewardProgramData);
}

//# sourceMappingURL=vault-block-rewards.lib.js.map