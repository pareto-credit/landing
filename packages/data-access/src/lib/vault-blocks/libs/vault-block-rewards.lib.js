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
    calculateRewardProgramAmount: function() {
        return calculateRewardProgramAmount;
    },
    calculateRewardProgramTargetApy: function() {
        return calculateRewardProgramTargetApy;
    },
    getDistributionFrequencyInDays: function() {
        return getDistributionFrequencyInDays;
    },
    getVaultBlockRewardProgram: function() {
        return getVaultBlockRewardProgram;
    },
    getVaultBlockRewardPrograms: function() {
        return getVaultBlockRewardPrograms;
    },
    getVaultRewardProgramsApr: function() {
        return getVaultRewardProgramsApr;
    },
    makeVaultBlockRewardProgram: function() {
        return makeVaultBlockRewardProgram;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
const _core = require("../../core");
const _vaultblocklib = require("./vault-block.lib");
function getDistributionFrequencyInDays(frequency) {
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
function calculateRewardProgramAmount(rewardProgram, options) {
    const { tokenPrice, tvlUSD } = options || {};
    const tokenPriceUSD = (0, _core.BNify)(tokenPrice || '1000000');
    const distributionInDays = getDistributionFrequencyInDays(rewardProgram.distributionFrequency);
    const distributionPeriod = (0, _core.BNify)(365).div(distributionInDays);
    if ((0, _core.BNify)(tvlUSD).lte(0)) {
        return {
            APR: 0
        };
    }
    const USD = (0, _core.BNify)(rewardProgram.distributionValue).times(tokenPriceUSD).times(distributionPeriod);
    const APR = Number((0, _core.BNFixed)(USD.div((0, _core.BNify)(tvlUSD)).times(100), 8));
    return {
        APR,
        USD: (0, _core.BNFixed)(USD)
    };
}
function calculateRewardProgramTargetApy(rewardProgram, baseAPY) {
    const APR = Number((0, _core.BNFixed)(_bignumber.default.maximum(0, (0, _core.BNify)(rewardProgram.distributionValue).minus((0, _core.BNify)(baseAPY))), 8));
    return {
        APR
    };
}
function makeVaultBlockRewardProgram(rewardProgram, APRs, options) {
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
                const netAPR = Number((0, _core.BNify)(APRs.BASE).times((0, _core.BNify)(1).minus((0, _core.BNify)(feePercentage).div(1e5))));
                const netAPY = (0, _vaultblocklib.compoundVaultApr)(vaultContractType, 'BASE', netAPR, epochDuration);
                return calculateRewardProgramTargetApy(rewardProgram, netAPY);
            }
    }
}
function getVaultRewardProgramsApr(vaultData, APRs, options = {}) {
    const vaultBlockRewardPrograms = getVaultBlockRewardPrograms(vaultData, APRs, options);
    if (!vaultBlockRewardPrograms) {
        return 0;
    }
    return vaultBlockRewardPrograms == null ? void 0 : vaultBlockRewardPrograms.reduce((acc, rewardProgram)=>{
        return (0, _core.BNify)(acc).plus(rewardProgram.APR).toNumber();
    }, 0);
}
function getVaultBlockRewardPrograms(vaultData, APRs, options = {}) {
    var _vaultData_cdoEpoch;
    const { rewardPrograms } = options;
    if (!(rewardPrograms == null ? void 0 : rewardPrograms.length)) {
        return;
    }
    const epochDuration = (_vaultData_cdoEpoch = vaultData.cdoEpoch) == null ? void 0 : _vaultData_cdoEpoch.duration;
    // Get vault block reward programs
    return rewardPrograms.map((rewardProgram)=>getVaultBlockRewardProgram(rewardProgram, APRs, _extends._({}, options, {
            tokens: vaultData.tokens,
            epochDuration
        })), []);
}
function getVaultBlockRewardProgram(rewardProgram, APRs, options) {
    const { tokens, tvlUSD, rewardTokens, vaultContractType, epochDuration, feePercentage } = options || {};
    const token = rewardTokens == null ? void 0 : rewardTokens.find((token)=>token._id === rewardProgram.tokenId);
    // Throw error if no token found for this program
    if (!token) {
        throw Error(`Token not found for reward program (tokenId: ${rewardProgram.tokenId})`);
    }
    const tokenData = tokens == null ? void 0 : tokens.find((t)=>(0, _core.compLower)(t.address, token.address));
    const rewardProgramData = makeVaultBlockRewardProgram(rewardProgram, APRs, {
        tvlUSD,
        tokenPrice: tokenData == null ? void 0 : tokenData.price,
        vaultContractType,
        epochDuration,
        feePercentage
    });
    return _extends._({
        tokenId: rewardProgram.tokenId
    }, rewardProgramData);
}

//# sourceMappingURL=vault-block-rewards.lib.js.map