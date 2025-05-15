export const WEB3_DEFAULT_ADDR = '0x0000000000000000000000000000000000000000';
export const WEB3_DEFAULT_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';
export const WEB3_DEFAULT_CHAIN_ID = 1;
export const WEB3_DEFAULT_BLOCK_PER_YEAR = 2613400;
export const WEB3_MULTICALL_CONTRACT_ADDR = '0xcA11bde05977b3631167028862bE2a173976CA11';
export const WEB3_MULTICALL_FIRST_BLOCK = 14353601;
export const WEB3_MULTICALL_METHOD_ABI = 'aggregate3((address,bool,bytes)[])';
export const WEB3_MULTICALL_PARAM_ABI = [
    {
        components: [
            {
                type: 'address'
            },
            {
                type: 'bool'
            },
            {
                type: 'bytes'
            }
        ],
        name: 'data',
        type: 'tuple[]'
    }
];
export const WEB3_MULTICALL_RESPONSE_ABI = [
    '(bool,bytes)[]'
];
export const WEB3_CONTRACT_METHODS = [
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR',
        block: 'current',
        method: 'totalSupply'
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_QUEUE',
        block: 'current',
        method: 'epochNumber'
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_QUEUE',
        block: 'current',
        method: 'getTotalCollateralsScaled'
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_QUEUE',
        block: 'current',
        method: 'getUnlentBalanceScaled'
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_QUEUE',
        block: 'current',
        method: 'totReservedWithdrawals'
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_QUEUE',
        block: 'current',
        method: 'getAllYieldSources'
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_QUEUE_EPOCH_PENDING',
        block: 'current',
        method: 'epochPending',
        params: [
            'epochNumber'
        ]
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_QUEUE_EPOCH_PENDING',
        block: 'current',
        method: 'epochPending',
        params: [
            'prevEpochNumber'
        ]
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_QUEUE_YIELD_SOURCE',
        block: 'current',
        method: 'getCollateralsYieldSourceScaled',
        params: [
            'yieldSourceAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_STAKING',
        block: 'current',
        method: 'totalSupply'
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_STAKING',
        block: 'current',
        method: 'totalAssets'
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_STAKING',
        block: 'current',
        method: 'rewardsLastDeposit'
    },
    {
        protocol: 'Idle',
        type: 'PARETO_DOLLAR_STAKING',
        block: 'current',
        method: 'convertToAssets',
        params: [
            '1e18'
        ]
    },
    {
        protocol: 'Idle',
        type: 'WALLET_PARETO_DOLLAR_STAKING',
        block: 'current',
        method: 'balanceOf',
        params: [
            'walletAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'BestYield',
        block: 'current',
        method: 'getAvgAPR'
    },
    {
        protocol: 'Idle',
        type: 'BestYield',
        block: 'current',
        method: 'totalSupply'
    },
    {
        protocol: 'Idle',
        type: 'BestYield',
        block: 'current',
        method: 'tokenPrice'
    },
    {
        protocol: 'Idle',
        type: 'BestYield',
        block: 'previous',
        method: 'tokenPrice'
    },
    {
        protocol: 'Idle',
        type: 'BestYield',
        block: 'current',
        method: 'getAllocations'
    },
    {
        protocol: 'Idle',
        type: 'BestYield',
        block: 'current',
        method: 'getAllAvailableTokens'
    },
    {
        protocol: 'Idle',
        type: 'WALLET',
        block: 'current',
        method: 'balanceOf',
        params: [
            'walletAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'TRANCHE',
        block: 'current',
        method: 'totalSupply'
    },
    {
        protocol: 'Idle',
        type: 'CDO',
        block: 'current',
        method: 'getApr',
        params: [
            'vaultAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO',
        block: 'current',
        method: 'trancheAPRSplitRatio'
    },
    {
        protocol: 'Idle',
        type: 'CDO',
        block: 'current',
        method: 'virtualPrice',
        params: [
            'vaultAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO',
        block: 'previous',
        method: 'virtualPrice',
        params: [
            'vaultAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO',
        block: 'current',
        method: 'getCurrentAARatio'
    },
    {
        protocol: 'Sky',
        type: 'POOL',
        block: 'current',
        method: 'ssr'
    },
    {
        protocol: 'Compound',
        type: 'POOL',
        block: 'current',
        method: 'totalSupply'
    },
    {
        protocol: 'Compound',
        type: 'POOL',
        block: 'current',
        method: 'totalBorrows'
    },
    {
        protocol: 'Compound',
        type: 'POOL',
        block: 'current',
        method: 'supplyRatePerBlock'
    },
    {
        protocol: 'Compound',
        type: 'POOL',
        block: 'current',
        method: 'borrowRatePerBlock'
    },
    {
        protocol: 'Compound',
        type: 'POOL',
        block: 'current',
        method: 'exchangeRateStored'
    },
    {
        protocol: 'Compound',
        type: 'POOL',
        block: 'current',
        method: 'balanceOf',
        params: [
            'vaultAddress'
        ]
    },
    {
        protocol: 'Clearpool',
        type: 'ORACLE',
        block: 'current',
        method: 'availableToBorrow'
    },
    {
        protocol: 'Clearpool',
        type: 'ORACLE',
        block: 'current',
        method: 'availableToWithdraw'
    },
    {
        protocol: 'Clearpool',
        type: 'ORACLE',
        block: 'current',
        method: 'getSupplyRate'
    },
    {
        protocol: 'Clearpool',
        type: 'ORACLE',
        block: 'current',
        method: 'getBorrowRate'
    },
    {
        protocol: 'Clearpool',
        type: 'ORACLE',
        block: 'current',
        method: 'getUtilizationRate'
    },
    {
        protocol: 'Clearpool',
        type: 'POOL',
        block: 'current',
        method: 'availableToBorrow'
    },
    {
        protocol: 'Clearpool',
        type: 'POOL',
        block: 'current',
        method: 'availableToWithdraw'
    },
    {
        protocol: 'Clearpool',
        type: 'POOL',
        block: 'current',
        method: 'getSupplyRate'
    },
    {
        protocol: 'Clearpool',
        type: 'POOL',
        block: 'current',
        method: 'getBorrowRate'
    },
    {
        protocol: 'Clearpool',
        type: 'POOL',
        block: 'current',
        method: 'getUtilizationRate'
    },
    {
        protocol: 'Clearpool',
        type: 'POOL',
        block: 'current',
        method: 'balanceOf',
        params: [
            'vaultAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'STRATEGY',
        block: 'current',
        method: 'getApr'
    },
    {
        protocol: 'Idle',
        type: 'STRATEGY',
        block: 'current',
        method: 'getRewardTokens'
    },
    {
        protocol: 'AaveV2',
        type: 'ORACLE',
        block: 'current',
        method: 'getReserveData',
        params: [
            'tokenAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'virtualPrice',
        params: [
            'vaultAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'isEpochRunning'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'expectedEpochInterest'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'defaulted'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'lastEpochInterest'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'epochDuration'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'bufferPeriod'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'epochEndDate'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'expectedEpochInterest'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'getContractValue'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'unclaimedFees'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'instantWithdrawDeadline'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'allowInstantWithdraw'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'disableInstantWithdraw'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'instantWithdrawDelay'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'instantWithdrawAprDelta'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH',
        block: 'current',
        method: 'pendingWithdrawFees'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_STRATEGY',
        block: 'current',
        method: 'pendingWithdraws'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_STRATEGY',
        block: 'current',
        method: 'pendingInstantWithdraws'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_STRATEGY',
        block: 'current',
        method: 'getApr'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_STRATEGY',
        block: 'current',
        method: 'totEpochDeposits'
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_STRATEGY',
        block: 'current',
        method: 'epochNumber'
    },
    {
        protocol: 'Idle',
        type: 'WALLET_CDO_EPOCH_STRATEGY',
        block: 'current',
        method: 'withdrawsRequests',
        params: [
            'walletAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'WALLET_CDO_EPOCH_STRATEGY',
        block: 'current',
        method: 'instantWithdrawsRequests',
        params: [
            'walletAddress'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_DEPOSIT_QUEUE',
        block: 'current',
        method: 'epochPendingDeposits',
        params: [
            'epochNumber'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_DEPOSIT_QUEUE',
        block: 'current',
        method: 'epochPendingDeposits',
        params: [
            'prevEpochNumber'
        ]
    },
    {
        protocol: 'Idle',
        type: 'WALLET_DEPOSIT_QUEUE',
        block: 'current',
        method: 'userDepositsEpochs',
        params: [
            'walletAddress',
            'epochNumber'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_WITHDRAW_QUEUE',
        block: 'current',
        method: 'epochPendingWithdrawals',
        params: [
            'epochNumber'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_WITHDRAW_QUEUE',
        block: 'current',
        method: 'epochPendingWithdrawals',
        params: [
            'prevEpochNumber'
        ]
    },
    {
        protocol: 'Idle',
        type: 'CDO_EPOCH_WITHDRAW_QUEUE',
        block: 'current',
        method: 'isEpochInstant',
        params: [
            'prevEpochNumber'
        ]
    },
    {
        protocol: 'Idle',
        type: 'WALLET_WITHDRAW_QUEUE',
        block: 'current',
        method: 'userWithdrawalsEpochs',
        params: [
            'walletAddress',
            'epochNumber'
        ]
    },
    {
        protocol: 'UniswapV2',
        type: 'ORACLE',
        block: 'current',
        tokenSymbol: 'MATIC',
        method: 'getAmountsIn',
        params: [
            'tokenAmount',
            'tokenAddresses[USDC|MATIC]'
        ]
    },
    {
        protocol: 'UniswapV2',
        type: 'ORACLE',
        block: 'current',
        tokenSymbol: 'WETH',
        method: 'getAmountsIn',
        params: [
            'tokenAmount',
            'tokenAddresses[USDC|WETH]'
        ]
    },
    {
        protocol: 'UniswapV2',
        type: 'ORACLE',
        block: 'current',
        tokenSymbol: 'stETH',
        method: 'getAmountsIn',
        params: [
            'tokenAmount',
            'tokenAddresses[USDC|WETH|stETH]'
        ]
    },
    {
        protocol: 'UniswapV3',
        type: 'ORACLE',
        block: 'current',
        tokenSymbol: 'OP',
        method: 'quoteExactInputSingle',
        params: [
            'tokenAddress[OP]',
            'tokenAddress[USDC]',
            'tokenFee',
            'tokenAmount',
            'tokenPriceLimit'
        ]
    },
    {
        protocol: 'UniswapV3',
        type: 'ORACLE',
        block: 'current',
        tokenSymbol: 'USDe',
        method: 'quoteExactInputSingle',
        params: [
            'tokenAddress[USDe]',
            'tokenAddress[USDC]',
            'tokenFee',
            'tokenAmount',
            'tokenPriceLimit'
        ]
    },
    {
        protocol: 'UniswapV3',
        type: 'ORACLE',
        block: 'current',
        tokenSymbol: 'ARB',
        method: 'quoteExactInputSingle',
        params: [
            'tokenAddress[ARB]',
            'tokenAddress[USDC]',
            'tokenFee',
            'tokenAmount',
            'tokenPriceLimit'
        ]
    },
    {
        protocol: 'Idle',
        type: 'ERC20',
        block: 'current',
        method: 'name'
    },
    {
        protocol: 'Idle',
        type: 'ERC20',
        block: 'current',
        method: 'symbol'
    },
    {
        protocol: 'Idle',
        type: 'ERC20',
        block: 'current',
        method: 'decimals'
    }
];

//# sourceMappingURL=web3-client.const.js.map