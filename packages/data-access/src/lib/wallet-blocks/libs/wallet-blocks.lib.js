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
    calculateWalletPoolTokenData: function() {
        return calculateWalletPoolTokenData;
    },
    getPendlePoolTokenBalance: function() {
        return getPendlePoolTokenBalance;
    },
    getPendleWalletBalance: function() {
        return getPendleWalletBalance;
    },
    getPendleWalletBalanceByRef: function() {
        return getPendleWalletBalanceByRef;
    },
    getPoolTokenBalanceByRate: function() {
        return getPoolTokenBalanceByRate;
    },
    getPoolWalletBalance: function() {
        return getPoolWalletBalance;
    },
    getWalletBalanceWithRequests: function() {
        return getWalletBalanceWithRequests;
    },
    getWalletBlockBalance: function() {
        return getWalletBlockBalance;
    },
    getWalletBlockPoolTokenBalance: function() {
        return getWalletBlockPoolTokenBalance;
    },
    getWalletBlockPoolTokenBalanceUSD: function() {
        return getWalletBlockPoolTokenBalanceUSD;
    },
    getWalletBlockTokenBalance: function() {
        return getWalletBlockTokenBalance;
    },
    getWalletPoolTokenBalance: function() {
        return getWalletPoolTokenBalance;
    },
    getWalletPoolTokensBalance: function() {
        return getWalletPoolTokensBalance;
    },
    getWalletPoolsTokenBalances: function() {
        return getWalletPoolsTokenBalances;
    },
    getWalletStakedTokenBalance: function() {
        return getWalletStakedTokenBalance;
    },
    makePendleWalletPoolTokenData: function() {
        return makePendleWalletPoolTokenData;
    },
    makeWalletPoolTokenData: function() {
        return makeWalletPoolTokenData;
    },
    makeWalletPoolTokensData: function() {
        return makeWalletPoolTokensData;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
const _core = require("../../core");
const _tokens = require("../../tokens");
function getWalletPoolTokensBalance(tokenId, walletPool) {
    var _walletPool_tokens;
    const tokens = (_walletPool_tokens = walletPool.tokens) == null ? void 0 : _walletPool_tokens.filter((t)=>t.tokenId === tokenId);
    if (!(tokens == null ? void 0 : tokens.length)) {
        return '0';
    }
    return (0, _core.BNFixed)((tokens || []).reduce((sum, t)=>sum.plus(t.balance), (0, _core.BNify)(0)));
}
function getWalletBalanceWithRequests(walletBlock, vaultBlock) {
    var _walletBlock_cdoEpoch, _walletBlock_cdoEpoch1, _walletBlock_cdoEpoch2;
    const totalBalance = (0, _core.BNify)(walletBlock.balance).plus(((_walletBlock_cdoEpoch = walletBlock.cdoEpoch) == null ? void 0 : _walletBlock_cdoEpoch.pendingWithdrawAmount) || '0');
    const tokenBalance = (0, _tokens.fixAmount)(totalBalance.times(vaultBlock.price), 18);
    return (0, _core.BNFixed)(tokenBalance.plus(((_walletBlock_cdoEpoch1 = walletBlock.cdoEpoch) == null ? void 0 : _walletBlock_cdoEpoch1.withdrawsRequests) || '0').plus(((_walletBlock_cdoEpoch2 = walletBlock.cdoEpoch) == null ? void 0 : _walletBlock_cdoEpoch2.instantWithdrawsRequests) || '0'));
}
function getPoolWalletBalance(vaultPools, walletPools, walletPool, vaultPoolData, vaultPool, tokens) {
    var _vaultPool_tokens;
    // Use tokens to calculate balance
    const hasSingleToken = vaultPool && (tokens == null ? void 0 : tokens.length) === 1 && tokens[0].tokenId === ((_vaultPool_tokens = vaultPool.tokens) == null ? void 0 : _vaultPool_tokens[0].tokenId);
    if (hasSingleToken) {
        return tokens.reduce((acc, t)=>(0, _core.BNFixed)((0, _core.BNify)(acc).plus(t.balance)), '0');
    }
    switch(walletPool.protocol){
        case 'PendleLP':
            return getPendleWalletBalance(vaultPools, walletPools);
        default:
            // Calculate balance using lpBalance and exchangeRage
            return (0, _core.BNFixed)((0, _core.BNify)(walletPool.lpBalance).times((vaultPoolData == null ? void 0 : vaultPoolData.exchangeRate) || 1e18).div(1e18));
    }
}
function makeWalletPoolTokenData(poolToken, vaultPool, walletPool, vaultPools, walletPools, poolTokenData, walletToken, token) {
    switch(walletPool.protocol){
        case 'PendleLP':
            return makePendleWalletPoolTokenData(poolToken, vaultPools, walletPools, walletToken);
        // For NapierYT simply take the YT balance as underlying
        case 'NapierYT':
        case 'PendleYT':
            return _extends._({}, walletToken, {
                tokenId: poolToken.tokenId,
                tokenAddress: poolToken.address,
                balance: (0, _core.BNFixed)(walletPool.lpBalance),
                balanceScaled: (0, _core.BNFixed)(walletPool.lpBalance)
            });
        case 'TermFinance':
            return _extends._({}, walletToken, {
                tokenId: (walletToken == null ? void 0 : walletToken.tokenId) || poolToken.tokenId,
                tokenAddress: (walletToken == null ? void 0 : walletToken.tokenAddress) || poolToken.address,
                balance: (0, _core.BNFixed)(walletToken == null ? void 0 : walletToken.balance)
            });
        case 'EulerSupply':
            return getPoolTokenBalanceByRate(poolToken, vaultPool, walletPool, walletToken, token);
        // Default behavior for Euler and Balancer
        default:
            return calculateWalletPoolTokenData(poolToken, vaultPool, walletPool, poolTokenData, walletToken);
    }
}
function makeWalletPoolTokensData(vaultPool, vaultPoolData, walletPool, vaultPools, walletPools, poolsTokens) {
    return (vaultPool.tokens || []).reduce((acc, poolToken)=>{
        var _vaultPoolData_tokens, _walletPool_tokens;
        const poolTokenData = (_vaultPoolData_tokens = vaultPoolData.tokens) == null ? void 0 : _vaultPoolData_tokens.find((t)=>(0, _core.compLower)(t.tokenAddress, poolToken.address));
        const walletToken = (_walletPool_tokens = walletPool.tokens) == null ? void 0 : _walletPool_tokens.find((wT)=>(0, _core.compLower)(wT.tokenAddress, poolToken.address));
        const token = poolsTokens == null ? void 0 : poolsTokens.find((t)=>(0, _core.compLower)(t.address, poolToken.address));
        const walletTokenData = makeWalletPoolTokenData(poolToken, vaultPoolData, walletPool, vaultPools, walletPools, poolTokenData, walletToken, token);
        if (!walletTokenData) return acc;
        return [
            ...acc,
            walletTokenData
        ];
    }, []);
}
function makePendleWalletPoolTokenData(poolToken, vaultPools, walletPools, walletToken) {
    const balance = getPendleWalletBalance(vaultPools, walletPools);
    return _extends._({}, walletToken || {}, {
        tokenId: poolToken.tokenId,
        tokenAddress: poolToken.address,
        balance,
        balanceScaled: balance
    });
}
function getPoolTokenBalanceByRate(poolToken, vaultPool, walletPool, walletToken, token) {
    const balance = (0, _core.BNFixed)((0, _core.BNify)(walletPool.lpBalance).times((vaultPool == null ? void 0 : vaultPool.exchangeRate) || 1e18).div(1e18));
    const decimalsDiff = 18 - ((token == null ? void 0 : token.decimals) || 18);
    const balanceScaled = decimalsDiff > 0 ? (0, _core.BNFixed)((0, _core.BNify)(balance).times(`1e${decimalsDiff}`)) : balance;
    return _extends._({}, walletToken || {}, {
        tokenId: poolToken.tokenId,
        tokenAddress: poolToken.address,
        balance,
        balanceScaled
    });
}
function calculateWalletPoolTokenData(poolToken, vaultPool, walletPool, poolTokenData, walletToken) {
    const poolShare = (0, _core.BNgt)(vaultPool.totalSupply) ? (0, _core.BNify)(walletPool.lpBalance).div(vaultPool.totalSupply || 0) : 0;
    const balance = (0, _core.BNFixed)((0, _core.BNify)(poolTokenData == null ? void 0 : poolTokenData.balance).times(poolShare));
    const balanceScaled = (0, _core.BNFixed)((0, _core.BNify)(poolTokenData == null ? void 0 : poolTokenData.balanceScaled).times(poolShare));
    return _extends._({}, walletToken || {}, {
        tokenId: poolToken.tokenId,
        tokenAddress: poolToken.address,
        balance,
        balanceScaled
    });
}
function getPendleWalletBalance(vaultPools, walletPools) {
    const pendleLPVaultpool = vaultPools.find((p)=>p.protocol === 'PendleLP');
    const pendlePTVaultPool = vaultPools.find((p)=>p.protocol === 'PendlePT');
    const pendleLPWalletPool = walletPools.find((p)=>p.protocol === 'PendleLP');
    if (!pendleLPVaultpool || !pendleLPWalletPool) {
        return '0';
    }
    const poolShare = (0, _core.BNgt)(pendleLPVaultpool.totalSupply) ? (0, _core.BNify)(pendleLPWalletPool.lpBalance).div(pendleLPVaultpool.totalSupply || 0) : 0;
    return (0, _core.BNFixed)((0, _core.BNify)(pendleLPVaultpool.underlyingBalance).plus((pendlePTVaultPool == null ? void 0 : pendlePTVaultPool.totalSupply) || '0').times(poolShare));
}
function getPendleWalletBalanceByRef(vaultPools, walletPools, tokenId, timestamp, options) {
    const { includeYT = false, activeOnly = false } = options || {};
    // Group vault pools by ref for Pendle protocols
    const pendleGroups = new Map();
    vaultPools.forEach((pool)=>{
        var _pool_protocol;
        if (!pool.ref || !((_pool_protocol = pool.protocol) == null ? void 0 : _pool_protocol.startsWith('Pendle'))) {
            return;
        }
        if (!pendleGroups.has(pool.ref)) {
            pendleGroups.set(pool.ref, []);
        }
        const group = pendleGroups.get(pool.ref);
        if (group) {
            group.push(pool);
        }
    });
    if (pendleGroups.size === 0) {
        return {
            total: '0',
            byRef: new Map(),
            activeRefs: []
        };
    }
    const currentDate = timestamp ? _moment.default.unix(timestamp) : (0, _moment.default)();
    const balanceByRef = new Map();
    const activeRefs = [];
    pendleGroups.forEach((pools, ref)=>{
        var _pools_find;
        // Find LP and YT pools for this group
        const lpPool = pools.find((p)=>p.protocol === 'PendleLP');
        const ytPool = pools.find((p)=>p.protocol === 'PendleYT');
        // Check if group has reached maturity
        const endDate = (_pools_find = pools.find((p)=>p.endDate)) == null ? void 0 : _pools_find.endDate;
        const isActive = !endDate || (0, _moment.default)(endDate).isAfter(currentDate);
        if (isActive) {
            activeRefs.push(ref);
        }
        // Skip expired pools if activeOnly is true
        if (activeOnly && !isActive) {
            return;
        }
        // Find wallet data for this group
        const lpWalletPool = lpPool ? walletPools.find((p)=>(0, _core.compLower)(p.address, lpPool.address)) : undefined;
        const ytWalletPool = ytPool ? walletPools.find((p)=>(0, _core.compLower)(p.address, ytPool.address)) : undefined;
        // Use pre-calculated balance from wallet pool
        let groupBalance = (0, _core.BNify)(0);
        // Add LP balance (use token balance if tokenId specified, otherwise use pool balance)
        if (lpWalletPool) {
            if (tokenId) {
                var _lpWalletPool_tokens_find, _lpWalletPool_tokens;
                const tokenBalance = (_lpWalletPool_tokens = lpWalletPool.tokens) == null ? void 0 : (_lpWalletPool_tokens_find = _lpWalletPool_tokens.find((t)=>t.tokenId === tokenId)) == null ? void 0 : _lpWalletPool_tokens_find.balance;
                groupBalance = groupBalance.plus(tokenBalance || '0');
            } else {
                groupBalance = groupBalance.plus(lpWalletPool.balance || '0');
            }
        }
        // Optionally include YT balance
        // Note: YT should NOT be included in LP performance context as they represent
        // future yield that hasn't been realized yet
        if (includeYT && ytWalletPool) {
            if (tokenId) {
                var _ytWalletPool_tokens_find, _ytWalletPool_tokens;
                const tokenBalance = (_ytWalletPool_tokens = ytWalletPool.tokens) == null ? void 0 : (_ytWalletPool_tokens_find = _ytWalletPool_tokens.find((t)=>t.tokenId === tokenId)) == null ? void 0 : _ytWalletPool_tokens_find.balance;
                groupBalance = groupBalance.plus(tokenBalance || '0');
            } else {
                groupBalance = groupBalance.plus(ytWalletPool.balance || '0');
            }
        }
        balanceByRef.set(ref, (0, _core.BNFixed)(groupBalance));
    });
    // Calculate total across all groups (no double-counting since each ref is independent)
    const total = (0, _core.BNFixed)(Array.from(balanceByRef.values()).reduce((sum, balance)=>sum.plus(balance), (0, _core.BNify)(0)));
    return {
        total,
        byRef: balanceByRef,
        activeRefs
    };
}
function getPendlePoolTokenBalance(tokenId, walletBlock, vaultPools, poolsFilter, timestamp, includeYT) {
    if (!(vaultPools == null ? void 0 : vaultPools.length)) {
        return '0';
    }
    const currentDate = _moment.default.unix(timestamp || walletBlock.block.timestamp);
    // Filter wallet pools to only include Pendle pools
    const pendleWalletPools = (walletBlock.pools || []).filter((wP)=>{
        var _wP_protocol;
        return (_wP_protocol = wP.protocol) == null ? void 0 : _wP_protocol.startsWith('Pendle');
    });
    if (!pendleWalletPools.length) {
        return '0';
    }
    // Apply poolsFilter if provided
    let filteredWalletPools = pendleWalletPools;
    if (poolsFilter == null ? void 0 : poolsFilter.length) {
        const allowedAddresses = poolsFilter.filter((vp)=>!vp.endDate || (0, _moment.default)(vp.endDate).isAfter(currentDate)).map((vP)=>vP.address.toLowerCase());
        filteredWalletPools = pendleWalletPools.filter((wP)=>allowedAddresses.includes(wP.address.toLowerCase()));
    }
    // Apply vaultPools endDate filter
    filteredWalletPools = filteredWalletPools.filter((wP)=>{
        const vaultPool = vaultPools.find((vP)=>(0, _core.compLower)(vP.address, wP.address));
        if (!vaultPool) return false;
        if (vaultPool.endDate && (0, _moment.default)(vaultPool.endDate).isBefore(currentDate)) {
            return false;
        }
        return true;
    });
    // Use getPendleWalletBalanceByRef with filtered pools
    const { total } = getPendleWalletBalanceByRef(vaultPools, filteredWalletPools, tokenId, timestamp || walletBlock.block.timestamp, {
        includeYT: includeYT != null ? includeYT : false,
        activeOnly: false
    });
    return total;
}
function getWalletBlockPoolTokenBalanceUSD(vault, vaultToken, vaultBlock, tokenId, balance) {
    var _vault_paretoDollar;
    // Convert sUSP balance to USD
    if (((_vault_paretoDollar = vault.paretoDollar) == null ? void 0 : _vault_paretoDollar.staking.tokenId) === tokenId) {
        const amountUSD = (0, _tokens.fixTokenAmount)(vaultToken, (0, _core.BNify)(balance).times(vaultBlock.price));
        return (0, _core.BNFixed)((0, _tokens.fixTokenAmount)(vaultToken, amountUSD).times(1e6));
    }
    return (0, _core.BNFixed)((0, _tokens.fixTokenAmount)(vaultToken, balance).times(1e6));
}
function getWalletBlockPoolTokenBalance(tokenId, walletPool) {
    switch(walletPool.protocol){
        // Divide by 2 total pool balance
        case 'Balancer':
            {
                if (walletPool.balance) {
                    return (0, _core.BNFixed)((0, _core.BNify)(walletPool.balance).div(2));
                }
                return getWalletPoolTokensBalance(tokenId, walletPool);
            }
        default:
            return getWalletPoolTokensBalance(tokenId, walletPool);
    }
}
function getWalletPoolsTokenBalances(tokenId, walletPools) {
    return (0, _core.BNFixed)(walletPools.reduce((balance, wP)=>{
        const poolTokenBalance = getWalletPoolTokensBalance(tokenId, wP);
        return (0, _core.BNify)(balance).plus(poolTokenBalance);
    }, (0, _core.BNify)(0)));
}
function getWalletPoolTokenBalance(token, walletBlock, startBalance = 0, options) {
    const { vaultPools, protocols, poolsFilter, timestamp, includeYT } = options || {};
    const currentDate = _moment.default.unix(timestamp || walletBlock.block.timestamp);
    let balance = (0, _core.BNify)(startBalance);
    // Handle Pendle pools separately to avoid double-counting
    if (!protocols || protocols.some((p)=>p.startsWith('Pendle'))) {
        const pendleBalance = getPendlePoolTokenBalance(token._id, walletBlock, vaultPools, poolsFilter, timestamp, includeYT);
        balance = balance.plus(pendleBalance);
    }
    // Handle all other pools (excluding Pendle to avoid double-counting)
    const otherPoolsBalance = (walletBlock.pools || []).reduce((bal, wP)=>{
        var _wP_protocol;
        // Skip Pendle pools (already handled)
        if ((_wP_protocol = wP.protocol) == null ? void 0 : _wP_protocol.startsWith('Pendle')) {
            return bal;
        }
        // Check protocol correspondence
        if ((protocols == null ? void 0 : protocols.length) && !protocols.includes(wP.protocol)) {
            return bal;
        }
        // Check vault pool expiry date
        const vaultPool = vaultPools == null ? void 0 : vaultPools.find((vP)=>(0, _core.compLower)(vP.address, wP.address));
        if ((vaultPool == null ? void 0 : vaultPool.endDate) && (0, _moment.default)(vaultPool.endDate).isBefore(currentDate)) {
            return bal;
        }
        // Filter by pool
        if ((poolsFilter == null ? void 0 : poolsFilter.length) && !poolsFilter.filter((vp)=>!vp.endDate || (0, _moment.default)(vp.endDate).isAfter(currentDate)).map((vP)=>vP.address.toLowerCase()).includes(wP.address.toLowerCase())) {
            return bal;
        }
        const poolTokenBalance = getWalletPoolTokensBalance(token._id, wP);
        return bal.plus(poolTokenBalance);
    }, (0, _core.BNify)(0));
    balance = balance.plus(otherPoolsBalance);
    return (0, _core.BNFixed)(balance);
}
function getWalletStakedTokenBalance(tokenId, walletBlock, startBalance = 0, vaultPools, protocols, poolsFilter, timestamp, includeYT) {
    const currentDate = _moment.default.unix(timestamp || walletBlock.block.timestamp);
    let balance = (0, _core.BNify)(startBalance);
    // Handle Pendle pools separately to avoid double-counting
    if (!protocols || protocols.some((p)=>p.startsWith('Pendle'))) {
        const pendleBalance = getPendlePoolTokenBalance(tokenId, walletBlock, vaultPools, poolsFilter, timestamp, includeYT);
        balance = balance.plus(pendleBalance);
    }
    // Handle all other pools (excluding Pendle to avoid double-counting)
    const otherPoolsBalance = (walletBlock.pools || []).reduce((bal, wP)=>{
        var _wP_protocol;
        // Skip Pendle pools (already handled)
        if ((_wP_protocol = wP.protocol) == null ? void 0 : _wP_protocol.startsWith('Pendle')) {
            return bal;
        }
        // Check protocol correspondence
        if (protocols && !protocols.includes(wP.protocol)) {
            return bal;
        }
        // Check vault pool expiry date
        const vaultPool = vaultPools == null ? void 0 : vaultPools.find((vP)=>(0, _core.compLower)(vP.address, wP.address));
        if ((vaultPool == null ? void 0 : vaultPool.endDate) && (0, _moment.default)(vaultPool.endDate).isBefore(currentDate)) {
            return bal;
        }
        if (poolsFilter && !poolsFilter.filter((vp)=>!vp.endDate || (0, _moment.default)(vp.endDate).isAfter(currentDate)).map((vP)=>vP.address.toLowerCase()).includes(wP.address.toLowerCase())) {
            return bal;
        }
        const poolTokenBalance = getWalletBlockPoolTokenBalance(tokenId, wP);
        return bal.plus(poolTokenBalance);
    }, (0, _core.BNify)(0));
    balance = balance.plus(otherPoolsBalance);
    return (0, _core.BNFixed)(balance);
}
function getWalletBlockTokenBalance(token, walletBlock, vaultPools, includeYT) {
    switch(token.symbol){
        case 'USP':
            {
                const startBalance = getWalletBlockBalance(walletBlock, 'uspBalance', {
                    vaultPools
                });
                return getWalletPoolTokenBalance(token, walletBlock, startBalance, {
                    vaultPools,
                    includeYT
                });
            }
        case 'sUSP':
            {
                const startBalance = getWalletBlockBalance(walletBlock, 'balance', {
                    vaultPools
                });
                return getWalletPoolTokenBalance(token, walletBlock, startBalance, {
                    vaultPools,
                    includeYT
                });
            }
        default:
            {
                return getWalletBlockBalance(walletBlock, 'tokenAggregated', {
                    token,
                    vaultPools
                });
            }
    }
}
function getWalletBlockBalance(walletBlock, balanceField, options) {
    const { token, protocols, vaultPools, poolsFilter, timestamp, startBalance = 0, includeYT } = options || {};
    const poolsBalance = token ? getWalletStakedTokenBalance(token._id, walletBlock, startBalance, vaultPools, undefined, undefined, undefined, includeYT) : '0';
    switch(balanceField){
        case 'poolTokenBalance':
            return token ? getWalletPoolTokenBalance(token, walletBlock, startBalance, {
                vaultPools,
                protocols,
                poolsFilter,
                timestamp,
                includeYT
            }) : '0';
        case 'balance':
            return walletBlock.balance;
        case 'poolsBalance':
            return poolsBalance;
        case 'tokenAggregated':
            var _walletBlock_cdoEpoch;
            return (0, _core.BNFixed)((0, _core.BNify)(walletBlock.balance).plus(((_walletBlock_cdoEpoch = walletBlock.cdoEpoch) == null ? void 0 : _walletBlock_cdoEpoch.pendingWithdrawAmount) || '0').plus(poolsBalance));
        case 'suspAggregated':
            return (0, _core.BNFixed)((0, _core.BNify)(walletBlock.balance).plus(poolsBalance));
        case 'uspAggregated':
            var _walletBlock_paretoDollar;
            return (0, _core.BNFixed)((0, _core.BNify)((_walletBlock_paretoDollar = walletBlock.paretoDollar) == null ? void 0 : _walletBlock_paretoDollar.uspBalance).plus(walletBlock.tokenBalance).plus(poolsBalance));
        case 'uspPools':
            var _walletBlock_paretoDollar1;
            return (0, _core.BNFixed)((0, _core.BNify)((_walletBlock_paretoDollar1 = walletBlock.paretoDollar) == null ? void 0 : _walletBlock_paretoDollar1.uspBalance).plus(poolsBalance));
        case 'uspBalance':
            var _walletBlock_paretoDollar2;
            return (0, _core.BNFixed)((0, _core.BNify)((_walletBlock_paretoDollar2 = walletBlock.paretoDollar) == null ? void 0 : _walletBlock_paretoDollar2.uspBalance));
        default:
            return walletBlock.tokenBalance;
    }
}

//# sourceMappingURL=wallet-blocks.lib.js.map