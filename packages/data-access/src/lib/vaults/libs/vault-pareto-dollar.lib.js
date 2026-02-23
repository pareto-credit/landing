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
    getVaultDollarAPR: function() {
        return getVaultDollarAPR;
    },
    getVaultDollarAPRDelta: function() {
        return getVaultDollarAPRDelta;
    },
    getVaultDollarAllocationGraph: function() {
        return getVaultDollarAllocationGraph;
    },
    getVaultDollarCollateralization: function() {
        return getVaultDollarCollateralization;
    },
    getVaultDollarGainLosses: function() {
        return getVaultDollarGainLosses;
    },
    getVaultDollarReservedToWithdrawals: function() {
        return getVaultDollarReservedToWithdrawals;
    },
    getVaultDollarSpender: function() {
        return getVaultDollarSpender;
    },
    getVaultDollarToDeposit: function() {
        return getVaultDollarToDeposit;
    },
    getVaultDollarToWithdraw: function() {
        return getVaultDollarToWithdraw;
    },
    getVaultDollarUnlent: function() {
        return getVaultDollarUnlent;
    },
    getVaultDollarWithdrawAmounts: function() {
        return getVaultDollarWithdrawAmounts;
    },
    getVaultDollarYieldSourceAllocation: function() {
        return getVaultDollarYieldSourceAllocation;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _core = require("../../core");
function getVaultDollarSpender(vault, kind) {
    switch(kind){
        case 'MINT':
            return vault.address;
        case 'STAKE':
            var _vault_paretoDollar;
            return (_vault_paretoDollar = vault.paretoDollar) == null ? void 0 : _vault_paretoDollar.staking.address;
    }
}
function getVaultDollarUnlent(block) {
    var _block_paretoDollar;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    const { totalCollateralsScaled, unlentBalanceScaled } = queue;
    const total = (0, _core.BNify)(totalCollateralsScaled).toString();
    const unlentValue = (0, _core.BNify)(unlentBalanceScaled).toString();
    const unlentPercentage = (0, _core.BNify)(unlentValue).div(total).times(100).toString();
    return {
        value: unlentValue,
        percentage: unlentPercentage
    };
}
function getVaultDollarToDeposit(block) {
    var _block_paretoDollar;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    const { unlentBalanceScaled } = queue;
    const reserved = getVaultDollarReservedToWithdrawals(block);
    const toDeposit = (0, _core.BNify)(unlentBalanceScaled).minus(reserved).toFixed(0);
    if ((0, _core.BNlt)(toDeposit)) {
        return '0';
    }
    return toDeposit;
}
function getVaultDollarToWithdraw(vault, block, { blocks }) {
    var _block_paretoDollar_queue, _block_paretoDollar, _vault_paretoDollar;
    const pending = (0, _core.BNify)((_block_paretoDollar = block.paretoDollar) == null ? void 0 : (_block_paretoDollar_queue = _block_paretoDollar.queue) == null ? void 0 : _block_paretoDollar_queue.prevEpochPending).toFixed(0);
    const queueAddr = (_vault_paretoDollar = vault.paretoDollar) == null ? void 0 : _vault_paretoDollar.queue.address;
    if (!blocks || !queueAddr) {
        return {
            pending,
            requested: '0',
            toWithdraw: pending
        };
    }
    // Get USP requests
    const requests = blocks.reduce((acc, b)=>{
        const r = (b.requests || []).filter((r)=>(0, _core.compLower)(r.walletAddress, queueAddr));
        return [
            ...acc,
            ...r
        ];
    }, []);
    const requested = requests.reduce((acc, r)=>(0, _core.BNify)(acc).plus((0, _core.BNify)(r.amount).times(1e12)).toFixed(0), '0');
    const toWithdraw = (0, _core.BNgt)(pending, requested) ? (0, _core.BNify)(pending).minus(requested).toFixed(0) : '0';
    return {
        pending,
        requested,
        toWithdraw
    };
}
function getVaultDollarReservedToWithdrawals(block) {
    var _block_paretoDollar;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    const { epochPending, totalReservedWithdrawals, prevEpochPending } = queue;
    return (0, _core.BNify)(totalReservedWithdrawals).minus((0, _core.BNify)(epochPending)).minus((0, _core.BNify)(prevEpochPending)).toFixed(0);
}
function getVaultDollarGainLosses(block) {
    const { queue } = block.paretoDollar || {};
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    const { totalCollateralsScaled, totalReservedWithdrawals } = queue;
    const gainLosses = (0, _core.BNify)(totalCollateralsScaled).minus((0, _core.BNify)(block.totalSupply)).minus((0, _core.BNify)(totalReservedWithdrawals)).toFixed(0);
    return gainLosses;
}
function getVaultDollarWithdrawAmounts(block) {
    var _block_paretoDollar;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    const { prevEpochPending, unlentBalanceScaled } = queue;
    const pendingRequests = (0, _core.BNify)(prevEpochPending).toString();
    const unlent = (0, _core.BNify)(unlentBalanceScaled).toString();
    if ((0, _core.BNgte)(unlent, pendingRequests)) {
        return {
            value: pendingRequests,
            percentage: 100
        };
    }
    const percentage = (0, _core.BNify)(unlent).div(pendingRequests).times(100).toNumber();
    return {
        value: unlent,
        percentage
    };
}
function getVaultDollarCollateralization(block) {
    var _block_paretoDollar;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    const { totalSupply } = block;
    const { totalCollateralsScaled } = queue;
    const value = (0, _core.BNify)(totalCollateralsScaled).toString();
    const percentage = (0, _core.BNify)(value).div((0, _core.BNify)(totalSupply)).times(100).toString();
    return {
        value,
        percentage
    };
}
function getVaultDollarYieldSourceAllocation(block, yieldSource) {
    var _block_paretoDollar;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    // Get yield source data
    const total = (0, _core.BNify)(queue.totalCollateralsScaled).toString();
    const value = (0, _core.BNify)(yieldSource.depositedAmount).toNumber();
    const percentage = (0, _core.BNify)(yieldSource.depositedAmount).div(total).times(100).toNumber();
    return {
        percentage,
        value
    };
}
function getVaultDollarAllocationGraph(block, sourcesSideData, options) {
    var _block_paretoDollar;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    const { totalCollateralsScaled, yieldSources = [] } = queue;
    const total = (0, _core.BNify)(totalCollateralsScaled).toString();
    const unlent = getVaultDollarUnlent(block);
    // Parse yield sources data
    const sources = yieldSources.filter((y)=>y.vaultType !== 0).map((yieldSource)=>parseYieldSourceGraphAllocation(total, yieldSource, sourcesSideData, options));
    return {
        total,
        unlent,
        sources
    };
}
function parseYieldSourceGraphAllocation(totalSources, yieldSource, sourcesData = {}, options = {}) {
    const { vaults, operators, tokens } = sourcesData;
    const { currentKey, primaryColor } = options;
    // Check yield source type
    const vault = vaults == null ? void 0 : vaults.find((v)=>v._id === yieldSource.vaultId);
    const operator = operators == null ? void 0 : operators.find((o)=>{
        var _vault_cdoEpoch;
        return o._id === yieldSource.operatorId || o._id === (vault == null ? void 0 : (_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch.borrower.operatorId);
    });
    const token = tokens == null ? void 0 : tokens.find((t)=>t._id === yieldSource.tokenId);
    // Get yield source data
    const label = (vault == null ? void 0 : vault.name) || (token == null ? void 0 : token.name) || (operator == null ? void 0 : operator.name) || 'Yield source';
    const value = (0, _core.BNify)(yieldSource.depositedAmount).toNumber();
    const percentage = (0, _core.BNify)(yieldSource.depositedAmount).div(totalSources).times(100).toNumber();
    const key = vault ? `VAULT_${vault.symbol}` : token ? `TOKEN_${token.symbol}` : operator ? `OPERATOR_${operator.code}` : `YIELD_SOURCE_${yieldSource.sourceAddress}`;
    // Yield color
    const sourceColor = (operator == null ? void 0 : operator.color) || (token == null ? void 0 : token.color) || primaryColor;
    const color = currentKey === key ? sourceColor : `${sourceColor}66`;
    return {
        key,
        label,
        value,
        percentage,
        color,
        data: {
            vault,
            operator,
            token
        }
    };
}
function getVaultDollarAPR({ paretoDollar, pools, APRs }, yieldSourcesData) {
    if (!(paretoDollar == null ? void 0 : paretoDollar.queue) || !(paretoDollar == null ? void 0 : paretoDollar.staking)) {
        return;
    }
    const { yieldSources, totalCollateralsScaled } = paretoDollar.queue;
    const { totalAssets } = paretoDollar.staking;
    const { blocks } = yieldSourcesData;
    if (!(yieldSources == null ? void 0 : yieldSources.length) || !totalAssets) {
        return;
    }
    const totalCollateralsScaledBN = (0, _core.BNify)(totalCollateralsScaled);
    const totalAssetsBN = (0, _core.BNify)(totalAssets);
    const { num, den, totalDepositedAmount } = yieldSources.reduce((acc, ys)=>{
        const yieldSourceBlock = blocks.find((b)=>(0, _core.compLower)(b.vaultAddress, ys.vaultAddress));
        if (yieldSourceBlock) {
            const yieldSourceAPR = (0, _core.BNify)(yieldSourceBlock == null ? void 0 : yieldSourceBlock.APRs.NET);
            const depositedAmount = (0, _core.BNify)(ys.depositedAmount);
            const aprContribution = yieldSourceAPR.times(depositedAmount);
            const num = acc.num.plus(aprContribution);
            const den = acc.den.plus(depositedAmount);
            const totalDepositedAmount = acc.totalDepositedAmount.plus(depositedAmount);
            return {
                num,
                den,
                totalDepositedAmount
            };
        } else {
            const poolData = pools == null ? void 0 : pools.find((p)=>(0, _core.compLower)(p.address, ys.vaultAddress));
            if (poolData) {
                const poolAPR = (0, _core.BNify)(poolData.APR);
                const depositedAmount = (0, _core.BNify)(ys.depositedAmount);
                const aprContribution = poolAPR.times(depositedAmount);
                const num = acc.num.plus(aprContribution);
                const den = acc.den.plus(depositedAmount);
                const totalDepositedAmount = acc.totalDepositedAmount.plus(depositedAmount);
                return {
                    totalDepositedAmount,
                    num,
                    den
                };
            }
        }
        return acc;
    }, {
        num: (0, _core.BNify)(0),
        den: (0, _core.BNify)(0),
        totalDepositedAmount: (0, _core.BNify)(0)
    });
    const percentageDeposited = totalDepositedAmount.div(totalCollateralsScaledBN);
    const weightedAPR = (0, _core.BNgt)(den) ? num.div(den).times(percentageDeposited) : (0, _core.BNify)(0);
    const uspAnnualizedYield = totalCollateralsScaledBN.times(weightedAPR);
    const totalAPRGross = (0, _core.BNgt)(uspAnnualizedYield) && (0, _core.BNgt)(totalAssetsBN) ? uspAnnualizedYield.div(totalAssetsBN) : 0;
    // Calculate net APR
    const feeFraction = (0, _core.BNify)(APRs.FEE).div(100);
    const netPercentage = (0, _core.BNify)(1).minus(feeFraction);
    const totalAPR = (0, _core.BNify)(totalAPRGross).times(netPercentage);
    return (0, _core.BNify)(totalAPR).toString();
}
function getVaultDollarAPRDelta(action, block, yieldSourcesData) {
    var _block_paretoDollar, _queue_yieldSources, _queue_yieldSources1;
    const { actions } = yieldSourcesData;
    const currentApr = block.APRs.NET || 0;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!actions.length || !(queue == null ? void 0 : (_queue_yieldSources = queue.yieldSources) == null ? void 0 : _queue_yieldSources.length)) {
        return {
            currentApr,
            newApr: currentApr,
            delta: 0
        };
    }
    // Update yield sources
    const newYieldSources = queue == null ? void 0 : (_queue_yieldSources1 = queue.yieldSources) == null ? void 0 : _queue_yieldSources1.map((s)=>{
        const updateAction = actions.find((a)=>(0, _core.compLower)(a.sourceAddress, s.sourceAddress));
        if (!updateAction) {
            return s;
        }
        const updateAmount = (0, _core.BNify)(updateAction.amount);
        const depositedAmount = action === 'DEPOSIT' ? (0, _core.BNify)(s.depositedAmount).plus(updateAmount).toFixed(0) : (0, _core.BNify)(s.depositedAmount).minus(updateAmount).toFixed(0);
        return _extends._({}, s, {
            depositedAmount
        });
    });
    const totalDelta = actions.reduce((acc, a)=>acc.plus((0, _core.BNify)(a.amount)), (0, _core.BNify)(0));
    const newTotalCollateralsScaled = action === 'DEPOSIT' ? (0, _core.BNify)(queue.totalCollateralsScaled).plus(totalDelta).toFixed(0) : (0, _core.BNify)(queue.totalCollateralsScaled).minus(totalDelta).toFixed(0);
    const newBlock = _extends._({}, block, {
        paretoDollar: _extends._({}, block.paretoDollar, {
            queue: _extends._({}, queue, {
                totalCollateralsScaled: newTotalCollateralsScaled,
                yieldSources: newYieldSources
            })
        })
    });
    const aprUpdated = getVaultDollarAPR(newBlock, yieldSourcesData);
    const newApr = (0, _core.BNify)(aprUpdated).toNumber();
    const delta = (0, _core.BNify)(aprUpdated).minus(currentApr).toNumber();
    return {
        currentApr,
        newApr,
        delta
    };
}

//# sourceMappingURL=vault-pareto-dollar.lib.js.map