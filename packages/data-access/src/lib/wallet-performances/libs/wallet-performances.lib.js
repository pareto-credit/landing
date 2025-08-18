import { _ as _extends } from "@swc/helpers/_/_extends";
import BigNumber from 'bignumber.js';
import { BNeq, BNFixed, BNgt, BNify, BNlt, BNlte, BNSafeDiv, compLower, ServerError } from '../../core';
import { WalletPerformanceErrorCodes } from '../wallet-performance.model';
import { getWalletBalanceWithRequests } from '../../wallet-blocks';
import { fixAmount, fixTokenAmount, getTokenAmount, normalizeTokenAmount } from '../../tokens';
import { getWalletAccruedRewards, getWalletPerformance, initWalletBlockAmounts, initWalletPerformance } from './wallet-performances-block.lib';
import { getVaultFinishedEpochs, getVaultPerformance } from '../../vault-performances';
/**
 * Get wallet position total USD
 * @param walletPosition wallet position object
 * @returns wallet position total USD
 */ export function getPositionTotalUSD(walletPosition) {
    return (walletPosition.tokens || []).reduce((acc, t)=>acc.plus(t.USD), BNify(walletPosition.redeemable.USD));
}
/**
 * Aggregate tokens data for aggregated wallet performance
 * @param tokens current tokens data
 * @param walletPosition wallet vault position
 * @returns tokens aggregated data
 */ export function aggregateTokens(tokens, walletPosition) {
    var // Insert pools tokens
    _walletPosition_tokens;
    const redeemableUSD = BNify(walletPosition.redeemable.USD);
    const updatedTokens = tokens.map((token)=>token.tokenId === walletPosition.tokenId ? _extends({}, token, {
            amount: BNify(token.amount).plus(BNify(walletPosition.redeemable.token)).toFixed(0),
            USD: BNify(token.USD).plus(redeemableUSD).toFixed(0),
            percentage: 0
        }) : token);
    const tokenExists = tokens.some((token)=>token.tokenId === walletPosition.tokenId);
    const newTokens = tokenExists ? updatedTokens : [
        ...updatedTokens,
        {
            walletId: walletPosition.walletId,
            tokenId: walletPosition.tokenId,
            tokenAddress: walletPosition.tokenAddress,
            amount: BNify(walletPosition.redeemable.token).toFixed(0),
            USD: redeemableUSD.toFixed(0),
            percentage: 0
        }
    ];
    (_walletPosition_tokens = walletPosition.tokens) == null ? void 0 : _walletPosition_tokens.forEach((positionToken)=>{
        const matchingTokenIndex = newTokens.findIndex((token)=>token.tokenId === positionToken.tokenId && token.operatorId === positionToken.operatorId && token.pool === positionToken.pool);
        if (matchingTokenIndex !== -1) {
            const matchingToken = newTokens[matchingTokenIndex];
            newTokens[matchingTokenIndex] = _extends({}, matchingToken, {
                amount: BNFixed(BNify(matchingToken.amount).plus(positionToken.amount)),
                USD: BNFixed(BNify(matchingToken.USD).plus(positionToken.USD))
            });
        } else {
            newTokens.push(positionToken);
        }
    });
    // Calculate percentage
    const totalUSD = newTokens.reduce((acc, token)=>{
        return acc.plus(token.USD);
    }, BNify(0));
    return newTokens.reduce((acc, token)=>{
        return [
            ...acc,
            _extends({}, token, {
                percentage: BNSafeDiv(token.USD, totalUSD).times(100).toNumber()
            })
        ];
    }, []);
}
/**
 * Aggregate chains data for aggregated wallet performance
 * @param chains current chains data
 * @param walletPosition wallet vault position
 * @returns chains aggregated data
 */ export function aggregateChains(chains, walletPosition) {
    const redeemableUSD = getPositionTotalUSD(walletPosition);
    const updatedChains = chains.map((chain)=>chain.chainId === walletPosition.chainId ? _extends({}, chain, {
            USD: BNify(chain.USD).plus(redeemableUSD).toFixed(0),
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
    }, BNify(0));
    return newChains.reduce((acc, chain)=>{
        return [
            ...acc,
            _extends({}, chain, {
                percentage: BNSafeDiv(chain.USD, totalUSD).times(100).toNumber()
            })
        ];
    }, []);
}
/**
 * Aggregate tokens data for aggregated wallet performance
 * @param tokens current tokens data
 * @param walletPosition wallet vault position
 * @returns tokens aggregated data
 */ export function aggregateOperators(operatorIds, operators, walletPosition) {
    const updatedOperators = operators.map((operator)=>operatorIds.includes(operator.operatorId) ? _extends({}, operator, {
            USD: BNify(operator.USD).plus(BNify(walletPosition.redeemable.USD)).toFixed(0)
        }) : operator);
    const operatorExists = operators.some((operator)=>operatorIds.includes(operator.operatorId));
    const newOperators = operatorExists ? updatedOperators : [
        ...updatedOperators,
        ...operatorIds.map((operatorId)=>({
                operatorId,
                USD: BNify(walletPosition.redeemable.USD).toFixed(0)
            }))
    ];
    // Calculate percentage
    const totalUSD = newOperators.reduce((acc, operator)=>{
        return acc.plus(operator.USD);
    }, BNify(0));
    return newOperators.reduce((acc, operator)=>{
        return [
            ...acc,
            _extends({}, operator, {
                percentage: BNSafeDiv(operator.USD, totalUSD).times(100).toNumber()
            })
        ];
    }, []);
}
/**
 * Aggregate vaults data
 * @param portfolio the wallet portfolio data
 * @param position - the wallet position
 * @param vault - the vault
 * @returns the vaults data
 */ export function aggregateVaults(portfolio, position) {
    var _portfolio_earnings_rewards, _position_earnings_rewards, _position_earnings_rewards1, _position_earnings_rewards2;
    const redeemableUSD = getPositionTotalUSD(position);
    // Redeemable
    const redeemable = _extends({}, portfolio.redeemable, {
        USD: BNFixed(BNify(portfolio.redeemable.USD).plus(redeemableUSD))
    });
    const percentageRewards = BNgt(redeemable.USD) ? BNify((_portfolio_earnings_rewards = portfolio.earnings.rewards) == null ? void 0 : _portfolio_earnings_rewards.percentage).times(portfolio.redeemable.USD).plus(BNify((_position_earnings_rewards = position.earnings.rewards) == null ? void 0 : _position_earnings_rewards.percentage).times(position.redeemable.USD)).div(redeemable.USD).toNumber() : 0;
    const rewards = _extends({}, position.earnings.rewards, {
        USD: BNFixed(BNify((_position_earnings_rewards1 = position.earnings.rewards) == null ? void 0 : _position_earnings_rewards1.USD).plus(((_position_earnings_rewards2 = position.earnings.rewards) == null ? void 0 : _position_earnings_rewards2.USD) || 0)),
        percentage: percentageRewards
    });
    const percentageEarnings = BNgt(redeemable.USD) ? BNify(position.earnings.percentage).times(position.redeemable.USD).plus(BNify(position.earnings.percentage).times(position.redeemable.USD)).div(redeemable.USD).toNumber() : 0;
    // Earnings
    const earnings = _extends({}, portfolio.earnings, {
        USD: BNify(portfolio.earnings.USD).plus(position.earnings.USD || 0).toFixed(0),
        percentage: percentageEarnings,
        rewards
    });
    // Deposits
    const deposits = _extends({}, portfolio.deposits, {
        USD: BNify(portfolio.deposits.USD).plus(position.deposits.USD || 0).toFixed(0)
    });
    // Pending Deposits
    const pendingDeposits = {
        USD: BNify(portfolio.pendingDeposits.USD).plus(position.pendingDeposits.USD).toFixed(0)
    };
    // Pending Withdraws
    const pendingWithdraws = {
        USD: BNify(portfolio.pendingWithdraws.USD).plus(position.pendingWithdraws.USD).toFixed(0)
    };
    // APY realized
    const realizedAPY = BNgt(redeemable.USD) ? BNify(portfolio.realizedAPY).times(portfolio.redeemable.USD).plus(BNify(position.realizedAPY).times(position.redeemable.USD)).div(redeemable.USD).toNumber() : 0;
    // APY realized with rewards
    const rewardsRealizedAPY = BNgt(redeemable.USD) ? BNify(portfolio.rewardsRealizedAPY).times(portfolio.redeemable.USD).plus(BNify(position.rewardsRealizedAPY).times(position.redeemable.USD)).div(redeemable.USD).toNumber() : 0;
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
/**
 * Get wallet performances for a specific vault
 * @param vault vault
 * @param token token
 * @param vaultBlocks vault blocks
 * @param walletBlocks wallet blocks
 * @param walletVaultRewards wallet vault rewards
 * @param tokenBlocks token blocks
 * @param vaultEpochs vault epochs
 * @param latestVaultBlock latest vault block
 * @param walletVaultDeposits wallet vault deposited
 * @param tokens wallet position tokens
 * @returns wallet vault performances
 */ export function makeWalletVaultPerformance(vault, token, vaultBlocks, walletBlocks, walletVaultRewards, tokenBlocks, vaultEpochs, latestVaultBlock, walletVaultDeposits, tokens) {
    const performance = vaultBlocks.reduce((acc, vaultBlock)=>{
        var _lastWalletPerformance_earnings_rewards, _walletPerformance_earnings_rewards, _lastWalletPerformance_earnings_rewards1, _walletPerformance_earnings_rewards1;
        const { lastVaultBlock, lastWalletBlock, lastWalletPerformance, latestWalletBlockWithBalance } = acc;
        const walletBlock = walletBlocks.find((walletBlock)=>BNeq(vaultBlock.block.number, walletBlock.block.number));
        const distributedRewards = walletVaultRewards.filter((r)=>BNeq(r.block.number, walletBlock == null ? void 0 : walletBlock.block.number));
        const tokenBlock = tokenBlocks.find((tokenBlock)=>BNeq(tokenBlock.block.number, vaultBlock.block.number));
        const tokenData = {
            price: (tokenBlock == null ? void 0 : tokenBlock.price) || getTokenAmount(token, 1, 6),
            decimals: 6
        };
        // SKIP - No vault block
        if (!vaultBlock) {
            return acc;
        }
        // No last wallet block
        if (!lastWalletBlock || BNlte(getWalletBalanceWithRequests(lastWalletBlock, vaultBlock))) {
            return {
                lastVaultBlock: vaultBlock,
                lastWalletBlock: walletBlock,
                latestWalletBlockWithBalance: walletBlock,
                lastWalletPerformance: initWalletPerformance()
            };
        }
        const currLastBlocks = {
            current: vaultBlock,
            last: lastVaultBlock
        };
        const finishedEpochs = getVaultFinishedEpochs(vaultEpochs, currLastBlocks, latestWalletBlockWithBalance);
        const epochsDuration = finishedEpochs.reduce((acc, epoch)=>acc + epoch.duration + epoch.bufferDuration, 0);
        const vaultPerformance = getVaultPerformance(currLastBlocks, token, tokenData, [], undefined, undefined, epochsDuration);
        // Skip calculation if realized APY is zero
        if (vault.contractType === 'CDO_EPOCH' && BNeq(vaultPerformance.realizedAPY)) {
            return acc;
        }
        const walletPerformance = getWalletPerformance(vault.feePercentage, token, lastWalletBlock, undefined, currLastBlocks, vaultPerformance, tokenData, distributedRewards);
        const age = BNify(lastWalletPerformance.age).plus(walletPerformance.age).toNumber();
        // Rewards earnings
        const rewards = _extends({}, lastWalletPerformance.earnings.rewards, {
            USD: BNify(((_lastWalletPerformance_earnings_rewards = lastWalletPerformance.earnings.rewards) == null ? void 0 : _lastWalletPerformance_earnings_rewards.USD) || 0).plus(((_walletPerformance_earnings_rewards = walletPerformance.earnings.rewards) == null ? void 0 : _walletPerformance_earnings_rewards.USD) || 0).toFixed(0),
            percentage: BNify(((_lastWalletPerformance_earnings_rewards1 = lastWalletPerformance.earnings.rewards) == null ? void 0 : _lastWalletPerformance_earnings_rewards1.percentage) || 0).plus(((_walletPerformance_earnings_rewards1 = walletPerformance.earnings.rewards) == null ? void 0 : _walletPerformance_earnings_rewards1.percentage) || 0).toNumber()
        });
        // Earnings
        const earnings = _extends({}, lastWalletPerformance.earnings, {
            USD: BNify(lastWalletPerformance.earnings.USD).plus(walletPerformance.earnings.USD || 0).toFixed(0),
            token: BNify(lastWalletPerformance.earnings.token).plus(walletPerformance.earnings.token || 0).toFixed(0),
            percentage: BNify(lastWalletPerformance.earnings.percentage).plus(walletPerformance.earnings.percentage || 0).toNumber(),
            rewards
        });
        // Fees
        const fees = _extends({}, lastWalletPerformance.fees, {
            USD: BNify(lastWalletPerformance.fees.USD).plus(walletPerformance.fees.USD || 0).toFixed(0),
            token: BNify(lastWalletPerformance.fees.token).plus(walletPerformance.fees.token || 0).toFixed(0)
        });
        const realizedAPY = BNgt(age) ? BNify(lastWalletPerformance.realizedAPY).times(lastWalletPerformance.age).plus(BNify(walletPerformance.realizedAPY).times(walletPerformance.age)).div(age).toNumber() : 0;
        return {
            lastWalletPerformance: _extends({}, lastWalletPerformance, {
                age,
                earnings,
                fees,
                realizedAPY
            }),
            lastWalletBlock: walletBlock,
            lastVaultBlock: vaultBlock,
            latestWalletBlockWithBalance
        };
    }, {
        lastVaultBlock: undefined,
        lastWalletBlock: undefined,
        latestWalletBlockWithBalance: undefined,
        lastWalletPerformance: initWalletPerformance()
    });
    const walletPerformance = performance.lastWalletPerformance;
    const accruedRewards = getWalletAccruedRewards(walletVaultRewards);
    const rewardsRealizedAPY = accruedRewards.reduce((acc, r)=>acc.plus(r.APR), BNify(0)).toNumber();
    const walletAddress = walletBlocks[walletBlocks.length - 1].walletAddress;
    const walletPosition = _extends({
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
/**
 * Make distributed reward performance for wallet portfolio
 * @param vault vault entity
 * @param token token entity
 * @param walletBlock wallet block entity
 * @param distributedReward distributed reward object
 * @param tokenPrice token price at specific block
 * @returns distributed rewards performance
 */ export function makeWalletDistributedReward(vault, token, walletBlock, distributedReward, tokenPrice) {
    var _vault_rewardPrograms;
    const rewardProgram = (_vault_rewardPrograms = vault.rewardPrograms) == null ? void 0 : _vault_rewardPrograms.find((r)=>r.tokenId === distributedReward.tokenId);
    if (!rewardProgram) {
        throw new ServerError({
            code: WalletPerformanceErrorCodes.rewardProgramNotFound,
            message: `Reward program not found (vaultId: ${vault._id}, tokenId: ${distributedReward.tokenId})`,
            statusCode: 404
        });
    }
    const balanceUSD = BNFixed(fixAmount(BNify(walletBlock.tokenBalance).times(tokenPrice), token.decimals));
    const APR = calculateDistributedRewardAPR(distributedReward.amountUSD, balanceUSD, rewardProgram.distributionFrequency);
    const percentage = BNSafeDiv(distributedReward.amountUSD, balanceUSD).times(100).toNumber();
    return _extends({}, distributedReward, {
        walletId: walletBlock.walletId,
        block: walletBlock.block,
        APR,
        percentage
    });
}
/**
 * Calculate APR from distributed rewards
 * @param distributedAmountUSD amount received in USD
 * @param balanceUSD wallet balance in USD
 * @param distributionFrequency reward program distribution frequency
 * @returns APR from distributed rewards
 */ export function calculateDistributedRewardAPR(distributedAmountUSD, balanceUSD, distributionFrequency) {
    const periodsPerYear = {
        D: 365,
        W: 52,
        M: 12,
        Y: 1
    };
    const frequency = periodsPerYear[distributionFrequency.unit] || 1;
    const periods = frequency / distributionFrequency.value;
    return BNSafeDiv(distributedAmountUSD, balanceUSD).times(periods).times(100).toNumber();
}
export function calculateWalletFirstBlock(deposits, transaction, firstBlock) {
    // Return undefined if no deposits
    if (BNlte(deposits.token)) {
        return undefined;
    }
    // Return new block
    if (!firstBlock || BNlt(transaction.block.number, firstBlock.number)) {
        return transaction.block;
    }
    // Return previous firstBlock
    return firstBlock;
}
export function calculateWalletAvgPriceAccumulator(num, den, transaction) {
    return {
        num: BNify(num).plus(BNify(transaction.price).times(transaction.amount)),
        den: BNify(den).plus(transaction.amount)
    };
}
export function calculateWalletDeposits(deposits, transaction) {
    switch(transaction.type){
        case 'STAKE':
        case 'DEPOSIT':
        case 'REQUEST_DEPOSIT':
        case 'DELETE_WITHDRAW_REQUEST':
            return _extends({}, deposits, {
                token: BNFixed(BNify(deposits.token).plus(transaction.tokenAmount))
            });
        case 'UNSTAKE':
        case 'REDEEM':
        case 'REQUEST_WITHDRAW':
        case 'DELETE_DEPOSIT_REQUEST':
            return _extends({}, deposits, {
                vault: BNFixed(BigNumber.maximum(0, BNify(deposits.vault).minus(transaction.amount))),
                token: BNFixed(BigNumber.maximum(0, BNify(deposits.token).minus(transaction.tokenAmount)))
            });
    }
    return deposits;
}
export function makeWalletVaultDeposits(token, transactions, tokenPriceData, walletLatestBlock, vaultLatestBlock) {
    const info = transactions.reduce((acc, transaction)=>{
        const deposits = calculateWalletDeposits(acc.deposits, transaction);
        const { num, den } = calculateWalletAvgPriceAccumulator(acc.num, acc.den, transaction);
        const firstBlock = calculateWalletFirstBlock(deposits, transaction, acc.firstBlock);
        return {
            num,
            den,
            deposits,
            firstBlock
        };
    }, {
        num: BNify(0),
        den: BNify(0),
        firstBlock: undefined,
        deposits: initWalletBlockAmounts()
    });
    // Calculate AVG deposit price
    const { num, den, deposits, firstBlock } = info;
    const avgPrice = den.gt(0) ? BNFixed(num.div(den)) : BNFixed();
    // Set USD amount
    deposits.USD = BNFixed(BNify(deposits.token).times(tokenPriceData.price).div(getTokenAmount(token)));
    const pendingDeposits = (vaultLatestBlock.requests || []).filter((r)=>r.type === 'DEPOSIT' && compLower(r.walletAddress, walletLatestBlock.walletAddress)).reduce((acc, request)=>{
        const requestAmountUSD = fixTokenAmount(token, BNify(request.amount).times(tokenPriceData.price));
        return {
            token: BNFixed(BNify(acc.token).plus(request.amount)),
            USD: BNFixed(BNify(acc.USD).plus(requestAmountUSD))
        };
    }, initWalletBlockAmounts({
        USD: '0',
        token: '0'
    }));
    const pendingWithdraws = (vaultLatestBlock.requests || []).filter((r)=>[
            'WITHDRAW',
            'REDEEM'
        ].includes(r.type) && compLower(r.walletAddress, walletLatestBlock.walletAddress)).reduce((acc, request)=>{
        const requestAmountUSD = fixTokenAmount(token, BNify(request.amount).times(tokenPriceData.price));
        return {
            token: BNFixed(BNify(acc.token).plus(request.amount)),
            USD: BNFixed(BNify(acc.USD).plus(requestAmountUSD))
        };
    }, initWalletBlockAmounts({
        USD: '0',
        token: '0'
    }));
    const tokenBalance = fixAmount(BNify(walletLatestBlock.balance).times(vaultLatestBlock.price), 18);
    const redeemableToken = BNify(tokenBalance).plus(pendingWithdraws.token || '0');
    const redeemableVault = normalizeTokenAmount(token, BNSafeDiv(redeemableToken, vaultLatestBlock.price));
    const redeemableUSD = fixAmount(BNify(redeemableToken).times(tokenPriceData.price), token.decimals);
    const redeemable = initWalletBlockAmounts({
        vault: BNFixed(redeemableVault),
        token: BNFixed(redeemableToken),
        USD: BNFixed(redeemableUSD)
    });
    return {
        walletId: walletLatestBlock.walletId,
        redeemable,
        deposits,
        avgPrice,
        firstBlock,
        pendingDeposits,
        pendingWithdraws
    };
}

//# sourceMappingURL=wallet-performances.lib.js.map