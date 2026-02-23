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
    aggregateChains: function() {
        return aggregateChains;
    },
    aggregateOperators: function() {
        return aggregateOperators;
    },
    aggregateTokens: function() {
        return aggregateTokens;
    },
    aggregateVaults: function() {
        return aggregateVaults;
    },
    calculateDistributedRewardAPR: function() {
        return calculateDistributedRewardAPR;
    },
    calculateWalletAvgPriceAccumulator: function() {
        return calculateWalletAvgPriceAccumulator;
    },
    calculateWalletDeposits: function() {
        return calculateWalletDeposits;
    },
    getPositionTotalUSD: function() {
        return getPositionTotalUSD;
    },
    getWalletBalances: function() {
        return getWalletBalances;
    },
    getWalletVaultHistory: function() {
        return getWalletVaultHistory;
    },
    makeWalletDistributedReward: function() {
        return makeWalletDistributedReward;
    },
    makeWalletVaultDeposits: function() {
        return makeWalletVaultDeposits;
    },
    makeWalletVaultEarnings: function() {
        return makeWalletVaultEarnings;
    },
    makeWalletVaultEarningsPercentage: function() {
        return makeWalletVaultEarningsPercentage;
    },
    makeWalletVaultHistory: function() {
        return makeWalletVaultHistory;
    },
    makeWalletVaultPerformance: function() {
        return makeWalletVaultPerformance;
    },
    makeWalletVaultPerformancePoints: function() {
        return makeWalletVaultPerformancePoints;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
const _core = require("../../core");
const _walletperformancemodel = require("../wallet-performance.model");
const _vaultblocks = require("../../vault-blocks");
const _walletblocks = require("../../wallet-blocks");
const _tokens = require("../../tokens");
const _walletperformancesblocklib = require("./wallet-performances-block.lib");
const _vaultperformances = require("../../vault-performances");
function getPositionTotalUSD(walletPosition) {
    return (walletPosition.tokens || []).reduce((acc, t)=>acc.plus(t.USD), (0, _core.BNify)(walletPosition.redeemable.USD));
}
function aggregateTokens(tokens, walletPosition) {
    var // Insert pools tokens
    _walletPosition_tokens;
    const redeemableUSD = (0, _core.BNify)(walletPosition.redeemable.USD);
    const updatedTokens = tokens.map((token)=>token.tokenId === walletPosition.tokenId ? _extends._({}, token, {
            amount: (0, _core.BNify)(token.amount).plus((0, _core.BNify)(walletPosition.redeemable.token)).toFixed(0),
            USD: (0, _core.BNify)(token.USD).plus(redeemableUSD).toFixed(0),
            percentage: 0
        }) : token);
    const tokenExists = tokens.some((token)=>token.tokenId === walletPosition.tokenId);
    const newTokens = tokenExists ? updatedTokens : [
        ...updatedTokens,
        {
            walletId: walletPosition.walletId,
            tokenId: walletPosition.tokenId,
            tokenAddress: walletPosition.tokenAddress,
            amount: (0, _core.BNify)(walletPosition.redeemable.token).toFixed(0),
            USD: redeemableUSD.toFixed(0),
            percentage: 0
        }
    ];
    (_walletPosition_tokens = walletPosition.tokens) == null ? void 0 : _walletPosition_tokens.forEach((positionToken)=>{
        const matchingTokenIndex = newTokens.findIndex((token)=>token.tokenId === positionToken.tokenId && token.operatorId === positionToken.operatorId && token.pool === positionToken.pool);
        if (matchingTokenIndex !== -1) {
            const matchingToken = newTokens[matchingTokenIndex];
            newTokens[matchingTokenIndex] = _extends._({}, matchingToken, {
                amount: (0, _core.BNFixed)((0, _core.BNify)(matchingToken.amount).plus(positionToken.amount)),
                USD: (0, _core.BNFixed)((0, _core.BNify)(matchingToken.USD).plus(positionToken.USD))
            });
        } else {
            newTokens.push(positionToken);
        }
    });
    // Calculate percentage
    const totalUSD = newTokens.reduce((acc, token)=>{
        return acc.plus(token.USD);
    }, (0, _core.BNify)(0));
    return newTokens.reduce((acc, token)=>{
        return [
            ...acc,
            _extends._({}, token, {
                percentage: (0, _core.BNSafeDiv)(token.USD, totalUSD).times(100).toNumber()
            })
        ];
    }, []);
}
function collectWalletVaultPerformance(vault, token, vaultBlocks, walletBlocks, walletVaultRewards, tokenBlocks, vaultEpochs) {
    return vaultBlocks.reduce((acc, vaultBlock)=>{
        var _lastWalletPerformance_earnings_rewards, _walletPerformance_earnings_rewards, _lastWalletPerformance_earnings_rewards1, _walletPerformance_earnings_rewards1;
        const { lastVaultBlock, lastWalletBlock, latestWalletBlockWithBalance, lastWalletPerformance, points } = acc;
        const walletBlock = walletBlocks.find((block)=>(0, _core.BNeq)(vaultBlock.block.number, block.block.number));
        const distributedRewards = walletVaultRewards.filter((reward)=>(0, _core.BNeq)(reward.block.number, walletBlock == null ? void 0 : walletBlock.block.number));
        const tokenBlock = tokenBlocks.find((block)=>(0, _core.BNeq)(block.block.number, vaultBlock.block.number));
        const tokenData = {
            price: (tokenBlock == null ? void 0 : tokenBlock.price) || (0, _tokens.getTokenAmount)(token, 1, 6),
            decimals: 6
        };
        if (!vaultBlock) {
            return acc;
        }
        if (!lastWalletBlock || (0, _core.BNlte)((0, _walletblocks.getWalletBalanceWithRequests)(lastWalletBlock, vaultBlock))) {
            return {
                lastVaultBlock: vaultBlock,
                lastWalletBlock: walletBlock,
                latestWalletBlockWithBalance: walletBlock || latestWalletBlockWithBalance,
                lastWalletPerformance: (0, _walletperformancesblocklib.initWalletPerformance)(),
                points
            };
        }
        const currLastBlocks = {
            current: vaultBlock,
            last: lastVaultBlock
        };
        // Get vault performance options
        const vaultPerformanceOptions = (0, _vaultperformances.getVaultPerformanceOptions)(vault, vaultEpochs, currLastBlocks, latestWalletBlockWithBalance);
        // Calculate vault performance with additional options
        const vaultPerformance = (0, _vaultperformances.getVaultPerformance)(currLastBlocks, token, tokenData, vaultPerformanceOptions);
        const walletPerformance = (0, _walletperformancesblocklib.getWalletPerformance)(vault, token, lastWalletBlock, undefined, currLastBlocks, vaultPerformance, tokenData, distributedRewards);
        const age = (0, _core.BNify)(lastWalletPerformance.age).plus(walletPerformance.age).toNumber();
        const rewards = _extends._({}, lastWalletPerformance.earnings.rewards, {
            USD: (0, _core.BNify)(((_lastWalletPerformance_earnings_rewards = lastWalletPerformance.earnings.rewards) == null ? void 0 : _lastWalletPerformance_earnings_rewards.USD) || 0).plus(((_walletPerformance_earnings_rewards = walletPerformance.earnings.rewards) == null ? void 0 : _walletPerformance_earnings_rewards.USD) || 0).toFixed(0),
            percentage: (0, _core.BNify)(((_lastWalletPerformance_earnings_rewards1 = lastWalletPerformance.earnings.rewards) == null ? void 0 : _lastWalletPerformance_earnings_rewards1.percentage) || 0).plus(((_walletPerformance_earnings_rewards1 = walletPerformance.earnings.rewards) == null ? void 0 : _walletPerformance_earnings_rewards1.percentage) || 0).toNumber()
        });
        const earnings = _extends._({}, lastWalletPerformance.earnings, {
            USD: (0, _core.BNify)(lastWalletPerformance.earnings.USD).plus(walletPerformance.earnings.USD || 0).toFixed(0),
            token: (0, _core.BNify)(lastWalletPerformance.earnings.token).plus(walletPerformance.earnings.token || 0).toFixed(0),
            percentage: (0, _core.BNify)(lastWalletPerformance.earnings.percentage).plus(walletPerformance.earnings.percentage || 0).toNumber(),
            rewards
        });
        const fees = _extends._({}, lastWalletPerformance.fees, {
            USD: (0, _core.BNify)(lastWalletPerformance.fees.USD).plus(walletPerformance.fees.USD || 0).toFixed(0),
            token: (0, _core.BNify)(lastWalletPerformance.fees.token).plus(walletPerformance.fees.token || 0).toFixed(0)
        });
        const realizedAPY = (0, _core.BNgt)(age) ? (0, _core.BNify)(lastWalletPerformance.realizedAPY).times(lastWalletPerformance.age).plus((0, _core.BNify)(walletPerformance.realizedAPY).times(walletPerformance.age)).div(age).toNumber() : 0;
        return {
            lastWalletPerformance: _extends._({}, lastWalletPerformance, {
                startBlock: vaultBlocks[0].block,
                endBlock: walletPerformance.endBlock,
                age,
                earnings,
                fees,
                realizedAPY
            }),
            lastWalletBlock: walletBlock || lastWalletBlock,
            lastVaultBlock: vaultBlock,
            latestWalletBlockWithBalance,
            points: [
                ...points,
                walletPerformance
            ]
        };
    }, {
        lastVaultBlock: undefined,
        lastWalletBlock: undefined,
        latestWalletBlockWithBalance: undefined,
        lastWalletPerformance: (0, _walletperformancesblocklib.initWalletPerformance)(),
        points: []
    });
}
function makeWalletVaultPerformancePoints(vault, token, vaultBlocks, walletBlocks, walletVaultRewards, tokenBlocks, vaultEpochs) {
    return collectWalletVaultPerformance(vault, token, vaultBlocks, walletBlocks, walletVaultRewards, tokenBlocks, vaultEpochs).points;
}
function getWalletVaultHistory(vault, vaultEpochs, vaultBlocks, walletBlocks, transactions, feePercentage) {
    let lastVaultBlock = undefined;
    let latestWalletBlock = undefined;
    return vaultBlocks.reduce((acc, vaultBlock)=>{
        // Find latest wallet block before or at vault block
        const walletBlock = walletBlocks.find((wb)=>wb.block.number === vaultBlock.block.number);
        const transaction = transactions.find((tx)=>(0, _core.BNeq)(tx.block.number, vaultBlock.block.number));
        if (!transaction) {
            return acc;
        }
        const walletHistory = makeWalletVaultHistory(vault, vaultEpochs, {
            current: vaultBlock,
            last: lastVaultBlock
        }, {
            current: walletBlock,
            last: latestWalletBlock
        }, transaction, feePercentage);
        // Update latest wallet block
        latestWalletBlock = walletBlock || latestWalletBlock;
        lastVaultBlock = vaultBlock;
        return [
            ...acc,
            walletHistory
        ];
    }, []);
}
function getWalletBalances(vault, vaultBlocks, walletBlocks) {
    const { current: vaultBlock } = vaultBlocks;
    const { current: walletBlock, last: latestWalletBlock } = walletBlocks;
    if (vault.contractType === 'PARETO_DOLLAR' && vault.paretoDollar) {
        var _walletBlock_paretoDollar;
        const uspBalance = (walletBlock == null ? void 0 : (_walletBlock_paretoDollar = walletBlock.paretoDollar) == null ? void 0 : _walletBlock_paretoDollar.uspBalance) || '0';
        const stakedBalance = (walletBlock == null ? void 0 : walletBlock.tokenBalance) || '0';
        const sUSPTokenId = vault.paretoDollar.staking.tokenId;
        const uspPoolsBalance = walletBlock ? (0, _walletblocks.getWalletPoolsTokenBalances)(vault.tokenId, walletBlock.pools || []) : '0';
        const suspPoolsBalance = walletBlock && sUSPTokenId ? (0, _walletblocks.getWalletPoolsTokenBalances)(sUSPTokenId, walletBlock.pools || []) : '0';
        const suspPoolsBalanceConverted = (0, _core.BNify)(suspPoolsBalance).times(vaultBlock.price).div(1e18).toFixed(0);
        const poolsBalance = (0, _core.BNFixed)((0, _core.BNify)(uspPoolsBalance).plus(suspPoolsBalanceConverted));
        return {
            lpBalance: uspBalance,
            tokenBalance: uspBalance,
            stakedBalance,
            poolsBalance
        };
    }
    const lpBalance = (walletBlock == null ? void 0 : walletBlock.balance) || (latestWalletBlock == null ? void 0 : latestWalletBlock.balance) || '0';
    const tokenBalance = (walletBlock == null ? void 0 : walletBlock.tokenBalance) || (0, _core.BNFixed)((0, _tokens.fixAmount)((0, _core.BNify)((latestWalletBlock == null ? void 0 : latestWalletBlock.balance) || '0').times(vaultBlock.price), 18));
    return {
        lpBalance,
        tokenBalance
    };
}
function makeWalletVaultHistory(vault, vaultEpochs, vaultBlocks, walletBlocks, transaction, feePercentage) {
    var _vaultBlock_cdoEpoch;
    const { current: vaultBlock, last: lastVaultBlock } = vaultBlocks;
    const { last: latestWalletBlock } = walletBlocks;
    const { lpBalance, tokenBalance, stakedBalance, poolsBalance } = getWalletBalances(vault, vaultBlocks, walletBlocks);
    const earnings = makeWalletVaultEarnings((latestWalletBlock == null ? void 0 : latestWalletBlock.balance) || '0', (lastVaultBlock == null ? void 0 : lastVaultBlock.price) || '0', vaultBlock.price, feePercentage);
    const startBalance = (0, _core.BNFixed)((0, _tokens.fixAmount)((0, _core.BNify)((latestWalletBlock == null ? void 0 : latestWalletBlock.balance) || '0').times((lastVaultBlock == null ? void 0 : lastVaultBlock.price) || '0'), 18));
    const earningsPercentage = makeWalletVaultEarningsPercentage(startBalance, earnings);
    // Get vault performance options
    const { age, compoundingPeriod, avgAPY, avgAPR } = (0, _vaultperformances.getVaultPerformanceOptions)(vault, vaultEpochs, vaultBlocks, latestWalletBlock);
    // Realized APY
    const realizedAPR = avgAPR || (0, _vaultperformances.getVaultRealizedAPR)(age, earningsPercentage.NET);
    const realizedAPY = avgAPY || (0, _vaultblocks.compoundVaultApr)(vault.contractType, 'BASE', realizedAPR, age, compoundingPeriod);
    return {
        hash: transaction.hash,
        vaultId: vaultBlock.vaultId,
        tokenId: transaction.tokenId,
        action: transaction.type,
        operatorId: transaction.operatorId,
        block: vaultBlock.block,
        amount: transaction.amount,
        tokenAmount: transaction.tokenAmount,
        lpBalance,
        tokenBalance,
        stakedBalance,
        poolsBalance,
        earnings,
        earningsPercentage,
        realizedAPY,
        price: vaultBlock.price,
        epochNumber: (_vaultBlock_cdoEpoch = vaultBlock.cdoEpoch) == null ? void 0 : _vaultBlock_cdoEpoch.epochNumber
    };
}
function makeWalletVaultEarningsPercentage(balance, earnings) {
    if ((0, _core.BNlte)(balance)) {
        return {
            GROSS: 0,
            NET: 0,
            FEE: 0
        };
    }
    const GROSS = (0, _core.BNify)(earnings.GROSS).div(balance);
    const NET = (0, _core.BNify)(earnings.NET).div(balance);
    const FEE = (0, _core.BNify)(earnings.FEE).div(balance);
    return {
        GROSS: GROSS.times(100).toNumber(),
        NET: NET.times(100).toNumber(),
        FEE: FEE.times(100).toNumber()
    };
}
function makeWalletVaultEarnings(balance, currentPrice, nextPrice, feePercentage) {
    const startBalance = (0, _core.BNFixed)((0, _tokens.fixAmount)((0, _core.BNify)(balance).times(currentPrice), 18));
    const endBalance = (0, _core.BNFixed)((0, _tokens.fixAmount)((0, _core.BNify)(balance).times(nextPrice), 18));
    const netEarningsBN = (0, _core.BNify)(endBalance).minus(startBalance);
    const grossEarningsBN = netEarningsBN.div((0, _core.BNify)(1).minus((0, _core.BNify)(feePercentage || 0).div(1e5)));
    const feesBN = grossEarningsBN.minus(netEarningsBN);
    return {
        FEE: (0, _core.BNFixed)(feesBN),
        NET: (0, _core.BNFixed)(netEarningsBN),
        GROSS: (0, _core.BNFixed)(grossEarningsBN)
    };
}
function aggregateChains(chains, walletPosition) {
    const redeemableUSD = getPositionTotalUSD(walletPosition);
    const updatedChains = chains.map((chain)=>chain.chainId === walletPosition.chainId ? _extends._({}, chain, {
            USD: (0, _core.BNify)(chain.USD).plus(redeemableUSD).toFixed(0),
            percentage: 0
        }) : chain);
    const chainExists = chains.some((chain)=>chain.chainId === walletPosition.chainId);
    const newChains = chainExists ? updatedChains : [
        ...updatedChains,
        {
            chainId: walletPosition.chainId,
            USD: redeemableUSD.toFixed(0)
        }
    ];
    // Calculate percentage
    const totalUSD = newChains.reduce((acc, chain)=>{
        return acc.plus(chain.USD);
    }, (0, _core.BNify)(0));
    return newChains.reduce((acc, chain)=>{
        return [
            ...acc,
            _extends._({}, chain, {
                percentage: (0, _core.BNSafeDiv)(chain.USD, totalUSD).times(100).toNumber()
            })
        ];
    }, []);
}
function aggregateOperators(operatorIds, operators, walletPosition) {
    const updatedOperators = operators.map((operator)=>operatorIds.includes(operator.operatorId) ? _extends._({}, operator, {
            USD: (0, _core.BNify)(operator.USD).plus((0, _core.BNify)(walletPosition.redeemable.USD)).toFixed(0)
        }) : operator);
    const operatorExists = operators.some((operator)=>operatorIds.includes(operator.operatorId));
    const newOperators = operatorExists ? updatedOperators : [
        ...updatedOperators,
        ...operatorIds.map((operatorId)=>({
                operatorId,
                USD: (0, _core.BNify)(walletPosition.redeemable.USD).toFixed(0)
            }))
    ];
    // Calculate percentage
    const totalUSD = newOperators.reduce((acc, operator)=>{
        return acc.plus(operator.USD);
    }, (0, _core.BNify)(0));
    return newOperators.reduce((acc, operator)=>{
        return [
            ...acc,
            _extends._({}, operator, {
                percentage: (0, _core.BNSafeDiv)(operator.USD, totalUSD).times(100).toNumber()
            })
        ];
    }, []);
}
function aggregateVaults(portfolio, position) {
    var _portfolio_earnings_rewards, _position_earnings_rewards, _position_earnings_rewards1, _position_earnings_rewards2;
    const redeemableUSD = getPositionTotalUSD(position);
    // Redeemable
    const redeemable = _extends._({}, portfolio.redeemable, {
        USD: (0, _core.BNFixed)((0, _core.BNify)(portfolio.redeemable.USD).plus(redeemableUSD))
    });
    const percentageRewards = (0, _core.BNgt)(redeemable.USD) ? (0, _core.BNify)((_portfolio_earnings_rewards = portfolio.earnings.rewards) == null ? void 0 : _portfolio_earnings_rewards.percentage).times(portfolio.redeemable.USD).plus((0, _core.BNify)((_position_earnings_rewards = position.earnings.rewards) == null ? void 0 : _position_earnings_rewards.percentage).times(position.redeemable.USD)).div(redeemable.USD).toNumber() : 0;
    const rewards = _extends._({}, position.earnings.rewards, {
        USD: (0, _core.BNFixed)((0, _core.BNify)((_position_earnings_rewards1 = position.earnings.rewards) == null ? void 0 : _position_earnings_rewards1.USD).plus(((_position_earnings_rewards2 = position.earnings.rewards) == null ? void 0 : _position_earnings_rewards2.USD) || 0)),
        percentage: percentageRewards
    });
    const percentageEarnings = (0, _core.BNgt)(redeemable.USD) ? (0, _core.BNify)(position.earnings.percentage).times(position.redeemable.USD).plus((0, _core.BNify)(position.earnings.percentage).times(position.redeemable.USD)).div(redeemable.USD).toNumber() : 0;
    // Earnings
    const earnings = _extends._({}, portfolio.earnings, {
        USD: (0, _core.BNify)(portfolio.earnings.USD).plus(position.earnings.USD || 0).toFixed(0),
        percentage: percentageEarnings,
        rewards
    });
    // Deposits
    const deposits = _extends._({}, portfolio.deposits, {
        USD: (0, _core.BNify)(portfolio.deposits.USD).plus(position.deposits.USD || 0).toFixed(0)
    });
    // Pending Deposits
    const pendingDeposits = {
        USD: (0, _core.BNify)(portfolio.pendingDeposits.USD).plus(position.pendingDeposits.USD).toFixed(0)
    };
    // Pending Withdraws
    const pendingWithdraws = {
        USD: (0, _core.BNify)(portfolio.pendingWithdraws.USD).plus(position.pendingWithdraws.USD).toFixed(0)
    };
    // APY realized
    const realizedAPY = (0, _core.BNgt)(redeemable.USD) ? (0, _core.BNify)(portfolio.realizedAPY).times(portfolio.redeemable.USD).plus((0, _core.BNify)(position.realizedAPY).times(position.redeemable.USD)).div(redeemable.USD).toNumber() : 0;
    // APY realized with rewards
    const rewardsRealizedAPY = (0, _core.BNgt)(redeemable.USD) ? (0, _core.BNify)(portfolio.rewardsRealizedAPY).times(portfolio.redeemable.USD).plus((0, _core.BNify)(position.rewardsRealizedAPY).times(position.redeemable.USD)).div(redeemable.USD).toNumber() : 0;
    const vaultIds = [
        ...portfolio.vaultIds,
        position.vaultId
    ];
    const accruedRewards = [
        ...portfolio.accruedRewards || [],
        ...position.accruedRewards || []
    ];
    return {
        vaultIds,
        earnings,
        deposits,
        redeemable,
        pendingDeposits,
        pendingWithdraws,
        realizedAPY,
        accruedRewards,
        rewardsRealizedAPY
    };
}
function makeWalletVaultPerformance(vault, token, vaultBlocks, walletBlocks, walletVaultRewards, tokenBlocks, vaultEpochs, latestVaultBlock, walletVaultDeposits, tokens) {
    const performance = collectWalletVaultPerformance(vault, token, vaultBlocks, walletBlocks, walletVaultRewards, tokenBlocks, vaultEpochs);
    const walletPerformance = performance.lastWalletPerformance;
    const accruedRewards = (0, _walletperformancesblocklib.getWalletAccruedRewards)(walletVaultRewards);
    const rewardsRealizedAPY = accruedRewards.reduce((acc, r)=>acc.plus(r.APR), (0, _core.BNify)(0)).toNumber();
    const walletAddress = walletBlocks[walletBlocks.length - 1].walletAddress;
    const walletPosition = _extends._({
        walletAddress,
        block: latestVaultBlock.block,
        vaultId: vault._id,
        vaultAddress: vault.address,
        chainId: vault.chainId,
        tokenId: token._id,
        tokenAddress: token.address,
        vaultPrice: latestVaultBlock.price
    }, walletPerformance, walletVaultDeposits, {
        accruedRewards,
        rewardsRealizedAPY,
        tokens
    });
    return walletPosition;
}
function makeWalletDistributedReward(vault, token, walletBlock, distributedReward, tokenPrice) {
    var _vault_rewardPrograms;
    const rewardProgram = (_vault_rewardPrograms = vault.rewardPrograms) == null ? void 0 : _vault_rewardPrograms.find((r)=>r.tokenId === distributedReward.tokenId);
    if (!rewardProgram) {
        throw new _core.ServerError({
            code: _walletperformancemodel.WalletPerformanceErrorCodes.rewardProgramNotFound,
            message: `Reward program not found (vaultId: ${vault._id}, tokenId: ${distributedReward.tokenId})`,
            statusCode: 404
        });
    }
    const balanceUSD = (0, _core.BNFixed)((0, _tokens.fixAmount)((0, _core.BNify)(walletBlock.tokenBalance).times(tokenPrice), token.decimals));
    const APR = calculateDistributedRewardAPR(distributedReward.amountUSD, balanceUSD, rewardProgram.distributionFrequency);
    const percentage = (0, _core.BNSafeDiv)(distributedReward.amountUSD, balanceUSD).times(100).toNumber();
    return _extends._({}, distributedReward, {
        walletId: walletBlock.walletId,
        block: walletBlock.block,
        APR,
        percentage
    });
}
function calculateDistributedRewardAPR(distributedAmountUSD, balanceUSD, distributionFrequency) {
    const periodsPerYear = {
        D: 365,
        W: 52,
        M: 12,
        Y: 1
    };
    const frequency = periodsPerYear[distributionFrequency.unit] || 1;
    const periods = frequency / distributionFrequency.value;
    return (0, _core.BNSafeDiv)(distributedAmountUSD, balanceUSD).times(periods).times(100).toNumber();
}
function calculateWalletAvgPriceAccumulator(num, den, transaction) {
    return {
        num: (0, _core.BNify)(num).plus((0, _core.BNify)(transaction.price).times(transaction.amount)),
        den: (0, _core.BNify)(den).plus(transaction.amount)
    };
}
function calculateWalletDeposits(deposits, transaction) {
    switch(transaction.type){
        case 'STAKE':
        case 'DEPOSIT':
        case 'REQUEST_DEPOSIT':
        case 'DELETE_WITHDRAW_REQUEST':
            return _extends._({}, deposits, {
                token: (0, _core.BNFixed)((0, _core.BNify)(deposits.token).plus(transaction.tokenAmount))
            });
        case 'UNSTAKE':
        case 'REDEEM':
        case 'REQUEST_WITHDRAW':
        case 'DELETE_DEPOSIT_REQUEST':
            return _extends._({}, deposits, {
                vault: (0, _core.BNFixed)(_bignumber.default.maximum(0, (0, _core.BNify)(deposits.vault).minus(transaction.amount))),
                token: (0, _core.BNFixed)(_bignumber.default.maximum(0, (0, _core.BNify)(deposits.token).minus(transaction.tokenAmount)))
            });
    }
    return deposits;
}
function makeWalletVaultDeposits(token, transactions, tokenPriceData, walletLatestBlock, vaultLatestBlock) {
    const info = transactions.reduce((acc, transaction)=>{
        const deposits = calculateWalletDeposits(acc.deposits, transaction);
        const { num, den } = calculateWalletAvgPriceAccumulator(acc.num, acc.den, transaction);
        return {
            num,
            den,
            deposits
        };
    }, {
        num: (0, _core.BNify)(0),
        den: (0, _core.BNify)(0),
        deposits: (0, _walletperformancesblocklib.initWalletBlockAmounts)()
    });
    // Calculate AVG deposit price
    const { num, den, deposits } = info;
    const avgPrice = den.gt(0) ? (0, _core.BNFixed)(num.div(den)) : (0, _core.BNFixed)();
    // Set USD amount
    deposits.USD = (0, _core.BNFixed)((0, _core.BNify)(deposits.token).times(tokenPriceData.price).div((0, _tokens.getTokenAmount)(token)));
    const pendingDeposits = (vaultLatestBlock.requests || []).filter((r)=>r.type === 'DEPOSIT' && (0, _core.compLower)(r.walletAddress, walletLatestBlock.walletAddress)).reduce((acc, request)=>{
        const requestAmountUSD = (0, _tokens.fixTokenAmount)(token, (0, _core.BNify)(request.amount).times(tokenPriceData.price));
        return {
            token: (0, _core.BNFixed)((0, _core.BNify)(acc.token).plus(request.amount)),
            USD: (0, _core.BNFixed)((0, _core.BNify)(acc.USD).plus(requestAmountUSD))
        };
    }, (0, _walletperformancesblocklib.initWalletBlockAmounts)({
        USD: '0',
        token: '0'
    }));
    const pendingWithdraws = (vaultLatestBlock.requests || []).filter((r)=>[
            'WITHDRAW',
            'REDEEM'
        ].includes(r.type) && (0, _core.compLower)(r.walletAddress, walletLatestBlock.walletAddress)).reduce((acc, request)=>{
        const requestAmountUSD = (0, _tokens.fixTokenAmount)(token, (0, _core.BNify)(request.amount).times(tokenPriceData.price));
        return {
            token: (0, _core.BNFixed)((0, _core.BNify)(acc.token).plus(request.amount)),
            USD: (0, _core.BNFixed)((0, _core.BNify)(acc.USD).plus(requestAmountUSD))
        };
    }, (0, _walletperformancesblocklib.initWalletBlockAmounts)({
        USD: '0',
        token: '0'
    }));
    const tokenBalance = (0, _tokens.fixAmount)((0, _core.BNify)(walletLatestBlock.balance).times(vaultLatestBlock.price), 18);
    const redeemableToken = (0, _core.BNify)(tokenBalance).plus(pendingWithdraws.token || '0');
    const redeemableVault = (0, _tokens.normalizeTokenAmount)(token, (0, _core.BNSafeDiv)(redeemableToken, vaultLatestBlock.price));
    const redeemableUSD = (0, _tokens.fixAmount)((0, _core.BNify)(redeemableToken).times(tokenPriceData.price), token.decimals);
    const redeemable = (0, _walletperformancesblocklib.initWalletBlockAmounts)({
        vault: (0, _core.BNFixed)(redeemableVault),
        token: (0, _core.BNFixed)(redeemableToken),
        USD: (0, _core.BNFixed)(redeemableUSD)
    });
    return {
        walletId: walletLatestBlock.walletId,
        redeemable,
        deposits,
        avgPrice,
        pendingDeposits,
        pendingWithdraws
    };
}

//# sourceMappingURL=wallet-performances.lib.js.map