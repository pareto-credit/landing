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
    calculateVaultBlockInterestAmounts: function() {
        return calculateVaultBlockInterestAmounts;
    },
    compoundVaultApr: function() {
        return compoundVaultApr;
    },
    filterVaultBlocksPerDay: function() {
        return filterVaultBlocksPerDay;
    },
    getEpochWithdrawTypeByBlock: function() {
        return getEpochWithdrawTypeByBlock;
    },
    getVaultBlockAPYNet: function() {
        return getVaultBlockAPYNet;
    },
    getVaultBlockCapProgression: function() {
        return getVaultBlockCapProgression;
    },
    getVaultBlockCapStatus: function() {
        return getVaultBlockCapStatus;
    },
    getVaultBlockDepositInterest: function() {
        return getVaultBlockDepositInterest;
    },
    getVaultBlockEpochPrices: function() {
        return getVaultBlockEpochPrices;
    },
    getVaultBlockEpochProgression: function() {
        return getVaultBlockEpochProgression;
    },
    getVaultBlockEpochStatus: function() {
        return getVaultBlockEpochStatus;
    },
    getVaultBlockEpochTVLPrincipal: function() {
        return getVaultBlockEpochTVLPrincipal;
    },
    getVaultBlockEpochToWithdraw: function() {
        return getVaultBlockEpochToWithdraw;
    },
    getVaultBlockEpochWaitingProgression: function() {
        return getVaultBlockEpochWaitingProgression;
    },
    getVaultBlockEpochWithdrawType: function() {
        return getVaultBlockEpochWithdrawType;
    },
    getVaultBlockEpochWithdrawalsBreakdown: function() {
        return getVaultBlockEpochWithdrawalsBreakdown;
    },
    getVaultBlockInterestAmounts: function() {
        return getVaultBlockInterestAmounts;
    },
    getVaultBlockUnderlyingAmount: function() {
        return getVaultBlockUnderlyingAmount;
    },
    getVaultBlockWithdrawableAmount: function() {
        return getVaultBlockWithdrawableAmount;
    },
    getVaultCompoundingPeriod: function() {
        return getVaultCompoundingPeriod;
    },
    isVaultBlockEpochWithdrawed: function() {
        return isVaultBlockEpochWithdrawed;
    },
    makeVaultAPRs: function() {
        return makeVaultAPRs;
    },
    parseAPYs: function() {
        return parseAPYs;
    },
    parseVaultContractAPRs: function() {
        return parseVaultContractAPRs;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
const _core = require("../../core");
const _vaultblockrewardslib = require("./vault-block-rewards.lib");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
function parseVaultContractAPRs(APRs, integrationsData) {
    // Get APR from integration
    if (integrationsData == null ? void 0 : integrationsData.APR) {
        return {
            BASE: integrationsData.APR
        };
    }
    return {
        BASE: (0, _core.BNify)(APRs.BASE).div(1e18).toNumber()
    };
}
function parseAPYs(vaultContractType, APRs, options) {
    const { feePercentage, totalDuration, compoudingPeriod } = options || {};
    // Compound Base APY
    const BASE = compoundVaultApr(vaultContractType, 'BASE', APRs.BASE, totalDuration, compoudingPeriod);
    const grossNetAPR = Number((0, _core.BNify)(APRs.BASE).plus((0, _core.BNify)(APRs.HARVEST)).times((0, _core.BNify)(1).minus((0, _core.BNify)(feePercentage).div(1e5))));
    // Compound Net APY
    const NET = Number((0, _core.BNify)(compoundVaultApr(vaultContractType, 'NET', grossNetAPR || 0, totalDuration, compoudingPeriod)).plus((0, _core.BNify)(APRs.REWARDS)));
    const HARVEST = APRs.HARVEST && compoundVaultApr(vaultContractType, 'HARVEST', APRs.HARVEST, totalDuration, compoudingPeriod);
    const REWARDS = APRs.REWARDS && compoundVaultApr(vaultContractType, 'REWARDS', APRs.REWARDS, totalDuration, compoudingPeriod);
    // Calculate GROSS APY
    const GROSS = Number((0, _core.BNify)(BASE).plus((0, _core.BNify)(HARVEST)).plus((0, _core.BNify)(REWARDS)).toFixed(8));
    const FEE = Number((0, _core.BNify)(feePercentage).div(1e3));
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
function compoundVaultApr(vaultContractType, type, rate, totalDuration, compoudingPeriod) {
    switch(type){
        // Don't compound REWARD APR
        case 'REWARDS':
            return rate;
        default:
            {
                const compoundPeriod = compoudingPeriod || getVaultCompoundingPeriod(vaultContractType, totalDuration);
                const APY = (0, _core.BNFixed)((0, _core.apr2apy)((0, _core.BNify)(rate).div(100), compoundPeriod).times(100), 8);
                if (!(0, _core.BNify)(Number(APY)).isFinite() || (0, _core.BNgt)(APY, _core.MAX_APY)) {
                    return _core.MAX_APY;
                }
                return Number(APY);
            }
    }
}
function getVaultCompoundingPeriod(vaultContractType, totalDuration) {
    switch(vaultContractType){
        case 'CDO_EPOCH':
            return _bignumber.default.minimum(365, _bignumber.default.maximum(1, (0, _core.BNify)(365).div((0, _core.BNify)(totalDuration).div(86400)))).integerValue(_bignumber.default.ROUND_FLOOR).toNumber();
        default:
            return 365;
    }
}
function makeVaultAPRs(vaultData, options = {}) {
    const { feePercentage, integrations } = options;
    const APRs = parseVaultContractAPRs(vaultData.APRs || {}, integrations);
    const REWARDS = (0, _vaultblockrewardslib.getVaultRewardProgramsApr)(vaultData, APRs, options);
    // Calculate GROSS APR
    const GROSS = Number((0, _core.BNFixed)((0, _core.BNify)(APRs.BASE).plus((0, _core.BNify)(APRs.HARVEST)).plus((0, _core.BNify)(REWARDS)), 8));
    // Calculate NET APR
    const NET = Number((0, _core.BNFixed)((0, _core.BNify)(APRs.BASE).plus((0, _core.BNify)(APRs.HARVEST)).times((0, _core.BNify)(1).minus((0, _core.BNify)(feePercentage).div(1e5))).plus((0, _core.BNify)(REWARDS)), 8));
    const FEE = Number((0, _core.BNify)(feePercentage).div(1e3));
    return _extends._({}, APRs, {
        REWARDS,
        GROSS,
        NET,
        FEE
    });
}
function getVaultBlockDepositInterest(block, depositAmount) {
    if (!block.cdoEpoch) {
        return '0';
    }
    const { APRs } = block;
    const { duration, bufferDuration = 0 } = block.cdoEpoch;
    const interests = (0, _core.BNify)(depositAmount).times(APRs.BASE || 0).div(100).times(duration + bufferDuration).div(_core.SECONDS_IN_YEAR).toString();
    const amount = (0, _core.BNFixed)(interests, 0).toString();
    return amount;
}
function getVaultBlockWithdrawableAmount(block, lpBalance, maxWithdrawable, withdrawAmount) {
    const balance = getVaultBlockUnderlyingAmount(block, lpBalance);
    if ((0, _core.BNlte)(balance, 0) || (0, _core.BNlte)(withdrawAmount, 0) || (0, _core.BNlte)(maxWithdrawable, 0)) {
        return '0';
    }
    const withdrawableAmount = (0, _core.BNify)(withdrawAmount).times(maxWithdrawable).div(balance).toFixed(0);
    return withdrawableAmount;
}
function getVaultBlockUnderlyingAmount(block, lpAmount, price) {
    return (0, _core.BNify)(lpAmount).times(price || block.price).div(`1e18`).toFixed(0);
}
function getEpochWithdrawTypeByBlock(block) {
    var _block_cdoEpoch;
    return ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.withdrawType) || 'STANDARD';
}
function getVaultBlockEpochWithdrawType(apr, lastApr, instantWithdraws) {
    if (!instantWithdraws) {
        return 'STANDARD';
    }
    const aprDiff = (0, _core.BNify)(apr || 0).minus(lastApr || 0);
    return (0, _core.BNlt)(aprDiff, -(instantWithdraws.aprDelta || 0)) ? 'INSTANT' : 'STANDARD';
}
function getVaultBlockInterestAmounts(block, lpBalance, maxWithdrawable) {
    var _block_cdoEpoch, _block_cdoEpoch1, _block_cdoEpoch2;
    if ((0, _core.BNlte)(maxWithdrawable, 0)) {
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
    const newVaultPrice = (0, _core.BNify)(maxWithdrawable).div(lpBalance).times(1e18);
    if ((0, _core.BNlte)(newVaultPrice, 0)) {
        return {
            lp: '0',
            amount: '0'
        };
    }
    // Calculate LP amount and token amount
    const lp = (0, _core.BNFixed)((0, _core.BNify)(newVaultPrice).minus(block.price).times(lpBalance).div(newVaultPrice));
    const totalDuration = (0, _core.BNify)(((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.duration) || 0).plus(((_block_cdoEpoch1 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch1.bufferDuration) || 0);
    const amount = (0, _core.BNify)(lp).times(newVaultPrice).div(`1e18`);
    // Scale amount by epoch duration
    const scaledAmount = (0, _core.BNgt)(totalDuration) ? amount.times(totalDuration).div(((_block_cdoEpoch2 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch2.duration) || 1) : amount;
    return {
        lp,
        amount: (0, _core.BNlte)(scaledAmount, 0) ? '0' : (0, _core.BNFixed)(scaledAmount)
    };
}
function calculateVaultBlockInterestAmounts(block, lpBalance) {
    var _block_cdoEpoch, _block_cdoEpoch1, _block_cdoEpoch2;
    if ((0, _core.BNlte)((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.apr, 0)) {
        return {
            lp: '0',
            amount: '0'
        };
    }
    // Calculate epoch APR
    const aprPercentage = (0, _core.BNify)((_block_cdoEpoch1 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch1.apr).div(100);
    const epochApr = aprPercentage.div((0, _core.BNify)(_core.SECONDS_IN_YEAR).div(((_block_cdoEpoch2 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch2.duration) || 0));
    // Calculate future interests
    const futureLp = (0, _core.BNify)(lpBalance).times(epochApr).div((0, _core.BNify)(epochApr).plus(1)).toFixed(0);
    const futureInterest = getVaultBlockUnderlyingAmount(block, futureLp);
    return {
        amount: futureInterest,
        lp: futureLp
    };
}
function getVaultBlockEpochStatus(block, date) {
    if (!block.cdoEpoch) {
        return;
    }
    const { status, endDate } = block.cdoEpoch;
    if (status === 'DEFAULTED' || status === 'WAITING') {
        return status;
    }
    // Check finished status
    if ((0, _moment.default)(date).isAfter(endDate)) {
        return 'FINISHED';
    }
    // Running
    return status;
}
function getVaultBlockCapStatus(vault, block, contractLimit) {
    var _vault_maxCap, _vault_maxCap1, _vault_maxCap2, _block_TVL;
    const limit = ((_vault_maxCap = vault.maxCap) == null ? void 0 : _vault_maxCap.amount) !== undefined ? (0, _core.BNeq)(contractLimit) ? (_vault_maxCap1 = vault.maxCap) == null ? void 0 : _vault_maxCap1.amount : _bignumber.default.minimum(contractLimit || 0, (_vault_maxCap2 = vault.maxCap) == null ? void 0 : _vault_maxCap2.amount).toString() : contractLimit;
    if (limit === undefined || (0, _core.BNlte)(limit)) {
        return {
            isActive: false
        };
    }
    const tvl = (0, _core.BNify)((_block_TVL = block.TVL) == null ? void 0 : _block_TVL.withRequestsUSD);
    const delta = (0, _core.BNgt)(limit, tvl) ? (0, _core.BNify)(limit).minus(tvl).toString() : '0';
    const tvlProgression = (0, _core.BNify)(tvl).div(limit).times(100);
    const progression = _bignumber.default.minimum(100, tvlProgression).toNumber();
    return {
        limit,
        progression,
        delta,
        isActive: true
    };
}
function getVaultBlockCapProgression(vault, block) {
    var _vault_maxCap;
    if (!((_vault_maxCap = vault.maxCap) == null ? void 0 : _vault_maxCap.isActive)) {
        return 0;
    }
    const maxCap = vault.maxCap.amount;
    const currentTotalSupply = (0, _core.BNify)(block.totalSupply).div(1e12);
    return (0, _core.BNify)(currentTotalSupply).div(maxCap).times(100).toNumber();
}
function getVaultBlockEpochWaitingProgression(vault, block, date) {
    var _vault_cdoEpoch, _block_cdoEpoch, _block_cdoEpoch1;
    const waitingPeriod = ((_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch.waitingPeriod) || ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.bufferDuration) || 0;
    // Current end date and next start date
    const startDate = (0, _moment.default)((_block_cdoEpoch1 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch1.endDate).toISOString();
    const endDate = (0, _moment.default)(startDate).add(waitingPeriod, 'second').toISOString();
    const progression = (0, _core.BNify)((0, _moment.default)(date).diff(startDate, 'second')).div(waitingPeriod).times(100).toNumber();
    const progress = _bignumber.default.minimum(100, progression).toNumber();
    return {
        startDate,
        endDate,
        progress
    };
}
function getVaultBlockEpochProgression(block, date) {
    var _block_cdoEpoch, _block_cdoEpoch1, _block_cdoEpoch2;
    const duration = (0, _core.BNify)((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.duration);
    // Current end date and next start date
    const startDate = (0, _moment.default)((_block_cdoEpoch1 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch1.startDate).toISOString();
    const endDate = (0, _moment.default)((_block_cdoEpoch2 = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch2.endDate).toISOString();
    const progression = (0, _core.BNify)((0, _moment.default)(date).diff(startDate, 'second')).div(duration).times(100);
    const progress = _bignumber.default.minimum(100, progression).toNumber();
    return {
        startDate,
        endDate,
        progress
    };
}
function getVaultBlockAPYNet(block, type) {
    if ((0, _core.BNlte)(block.APYs.NET, 0) || (0, _core.BNlte)(block.APYs.GROSS, 0)) {
        return '0';
    }
    const apyGross = type === 'BASE' ? block.APYs.BASE : block.APYs.REWARDS;
    if ((0, _core.BNlte)(apyGross, 0)) {
        return '0';
    }
    return (0, _core.BNify)(apyGross).times(block.APYs.NET || 0).div(block.APYs.GROSS || 0).toString();
}
function filterVaultBlocksPerDay(blocks) {
    const seenDates = [];
    return blocks.filter((block)=>{
        const date = _moment.default.unix(block.block.timestamp).format('YYYY-MM-DD');
        if (seenDates.includes(date)) {
            return false;
        }
        seenDates.push(date);
        return true;
    });
}
function isVaultBlockEpochWithdrawed(block) {
    var _block_cdoEpoch, _block_cdoEpoch_instantWithdraws;
    return ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.withdrawType) !== 'INSTANT' ? true : (0, _core.BNlte)((_block_cdoEpoch_instantWithdraws = block.cdoEpoch.instantWithdraws) == null ? void 0 : _block_cdoEpoch_instantWithdraws.amount);
}
function getVaultBlockEpochToWithdraw(block) {
    var _block_cdoEpoch_withdraws;
    if (!block.cdoEpoch) {
        return '0';
    }
    const instantWithdrawed = isVaultBlockEpochWithdrawed(block);
    if (block.cdoEpoch.withdrawType === 'INSTANT' && !instantWithdrawed) {
        var _block_cdoEpoch_instantWithdraws;
        return (0, _core.BNify)((_block_cdoEpoch_instantWithdraws = block.cdoEpoch.instantWithdraws) == null ? void 0 : _block_cdoEpoch_instantWithdraws.amount).toString();
    }
    return (0, _core.BNify)(block.cdoEpoch.expectedInterest).plus((0, _core.BNify)((_block_cdoEpoch_withdraws = block.cdoEpoch.withdraws) == null ? void 0 : _block_cdoEpoch_withdraws.amount)).toString();
}
function getVaultBlockEpochWithdrawalsBreakdown(block) {
    if (!block.cdoEpoch) {
        return {
            NET: '0',
            FEE: '0',
            INTEREST: '0',
            GROSS: '0'
        };
    }
    const { withdraws, instantWithdraws } = block.cdoEpoch;
    const { fees, amount } = withdraws || {};
    const { amount: instantAmount } = instantWithdraws || {};
    const { FEE: vaultFee } = block.APYs || {};
    const GROSS = (0, _core.BNify)(amount).toFixed(0);
    const FEE = (0, _core.BNify)(fees).toFixed(0);
    const INTEREST = (0, _core.BNify)(fees).times((0, _core.BNify)(vaultFee || 0).minus(1)).toFixed();
    const NET = (0, _core.BNify)(amount).plus((0, _core.BNify)(instantAmount)).minus((0, _core.BNify)(INTEREST)).toFixed(0);
    return {
        NET,
        FEE,
        INTEREST,
        GROSS
    };
}
function getVaultBlockEpochTVLPrincipal(block) {
    var _block_TVL;
    if (!block.cdoEpoch) {
        return {
            PREVIOUS: '0',
            DEPOSITS: '0',
            WITHDRAWALS: '0',
            PRINCIPAL: '0',
            DELTA: '0',
            TOTAL_SUPPLY: '0'
        };
    }
    const deposits = block.cdoEpoch.deposits;
    const startTvl = ((_block_TVL = block.TVL) == null ? void 0 : _block_TVL.token) || '0';
    // Withdrawals amount
    const { NET: WITHDRAWALS } = getVaultBlockEpochWithdrawalsBreakdown(block);
    const DEPOSITS = (0, _core.BNify)(deposits).toString();
    const PREVIOUS = (0, _core.BNify)(startTvl).minus(DEPOSITS).toString();
    const PRINCIPAL = (0, _core.BNify)(startTvl).plus(WITHDRAWALS).toString();
    const TOTAL_SUPPLY = (0, _core.BNify)(PRINCIPAL).div(block.price).times(1e6).toFixed(0);
    const DELTA = (0, _core.BNify)(PRINCIPAL).minus(PREVIOUS).toString();
    return {
        PREVIOUS,
        DEPOSITS,
        WITHDRAWALS,
        PRINCIPAL,
        TOTAL_SUPPLY,
        DELTA
    };
}
function getVaultBlockEpochPrices(block, currentDate) {
    var _block_TVL;
    if (!block.cdoEpoch) {
        return {
            NEGATIVE: '0',
            START: '0',
            CURRENT: '0',
            MIDDLE: '0',
            END: '0'
        };
    }
    // Epoch values
    const netInterest = block.interest ? block.interest.NET : (0, _core.BNify)(block.cdoEpoch.expectedInterest).times((0, _core.BNify)(1).minus((0, _core.BNify)(block.APRs.FEE || 0).div(1e5)));
    const tvl = ((_block_TVL = block.TVL) == null ? void 0 : _block_TVL.token) || 0;
    const duration = block.cdoEpoch.duration;
    // Start price of the epoch
    const START = block.price;
    // Calculate negative value
    const NEGATIVE = (0, _core.BNFixed)((0, _core.BNify)(block.price).times(0.8));
    // End price of the epoch
    const endTVL = (0, _core.BNify)(tvl).plus(netInterest);
    const END = (0, _core.BNFixed)(endTVL.times(block.price).div(tvl));
    // Current price of the epoch
    const elapsedSeconds = (0, _moment.default)(currentDate).diff(block.cdoEpoch.startDate, 'seconds');
    const progressRatio = _bignumber.default.minimum(1, (0, _core.BNify)(elapsedSeconds).div(duration));
    const interestIncrease = (0, _core.BNify)(END).minus(START).times(progressRatio);
    const CURRENT = (0, _core.BNFixed)((0, _core.BNify)(START).plus(interestIncrease));
    const MIDDLE = (0, _core.BNify)(END).plus(START).div(2).toFixed(0);
    return {
        NEGATIVE,
        START,
        CURRENT,
        MIDDLE,
        END
    };
}

//# sourceMappingURL=vault-block.lib.js.map