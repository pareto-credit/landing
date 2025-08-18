import { BNFixed, BNgt, BNify } from '../../core';
import { fixAmount, fixTokenAmount } from '../../tokens';
/**
 * Get the total amount of token held by a wallet in a pool
 * @param token token object
 * @param walletPool wallet pool object
 * @returns total amount
 */ export function getWalletPoolTokensBalance(tokenId, walletPool) {
    var _walletPool_tokens;
    const tokens = (_walletPool_tokens = walletPool.tokens) == null ? void 0 : _walletPool_tokens.filter((t)=>t.tokenId === tokenId);
    if (!(tokens == null ? void 0 : tokens.length)) {
        return '0';
    }
    return BNFixed((tokens || []).reduce((sum, t)=>sum.plus(t.balance), BNify(0)));
}
/**
 * Get wallet balance converted in tokens including requests
 * @param walletBlock wallet block
 * @param vaultBlock vault block
 * @returns wallet vault balance in underlying
 */ export function getWalletBalanceWithRequests(walletBlock, vaultBlock) {
    var _walletBlock_cdoEpoch, _walletBlock_cdoEpoch1, _walletBlock_cdoEpoch2;
    const totalBalance = BNify(walletBlock.balance).plus(((_walletBlock_cdoEpoch = walletBlock.cdoEpoch) == null ? void 0 : _walletBlock_cdoEpoch.pendingWithdrawAmount) || '0');
    const tokenBalance = fixAmount(totalBalance.times(vaultBlock.price), 18);
    return BNFixed(tokenBalance.plus(((_walletBlock_cdoEpoch1 = walletBlock.cdoEpoch) == null ? void 0 : _walletBlock_cdoEpoch1.withdrawsRequests) || '0').plus(((_walletBlock_cdoEpoch2 = walletBlock.cdoEpoch) == null ? void 0 : _walletBlock_cdoEpoch2.instantWithdrawsRequests) || '0'));
}
/**
 * Calculate wallet pool balance using tokens or exchangeRate
 * @param walletPool wallet pool data
 * @param vaultPoolData vault pool data
 * @param vaultPool vault pool config
 * @param tokens tokens balances
 * @returns pool wallet balance
 */ export function getPoolWalletBalance(vaultPools, walletPools, walletPool, vaultPoolData, vaultPool, tokens) {
    var _vaultPool_tokens;
    // Use tokens to calculate balance
    const hasSingleToken = vaultPool && (tokens == null ? void 0 : tokens.length) === 1 && tokens[0].tokenId === ((_vaultPool_tokens = vaultPool.tokens) == null ? void 0 : _vaultPool_tokens[0].tokenId);
    if (hasSingleToken) {
        return tokens.reduce((acc, t)=>BNFixed(BNify(acc).plus(t.balance)), '0');
    }
    switch(walletPool.protocol){
        case 'PendleLP':
            return getPendleWalletBalance(vaultPools, walletPools);
        default:
            // Calculate balance using lpBalance and exchangeRage
            return BNFixed(BNify(walletPool.lpBalance).times((vaultPoolData == null ? void 0 : vaultPoolData.exchangeRate) || 1e18).div(1e18));
    }
}
/**
 * Get Pendle underlying token balance
 * @param vaultPools vault pools data
 * @param walletPools wallet pools data
 * @returns pendle underlying token balance
 */ export function getPendleWalletBalance(vaultPools, walletPools) {
    const pendleLPVaultpool = vaultPools.find((p)=>p.protocol === 'PendleLP');
    const pendlePTVaultPool = vaultPools.find((p)=>p.protocol === 'PendlePT');
    const pendleLPWalletPool = walletPools.find((p)=>p.protocol === 'PendleLP');
    if (!pendleLPVaultpool || !pendleLPWalletPool) {
        return '0';
    }
    const poolShare = BNgt(pendleLPVaultpool.totalSupply) ? BNify(pendleLPWalletPool.lpBalance).div(pendleLPVaultpool.totalSupply || 0) : 0;
    return BNFixed(BNify(pendleLPVaultpool.underlyingBalance).plus((pendlePTVaultPool == null ? void 0 : pendlePTVaultPool.totalSupply) || '0').times(poolShare));
}
/**
 * Convert pool token balance to USD
 * @param vault vault
 * @param vaultToken vault token
 * @param vaultBlock vault block
 * @param tokenId pool tokenID
 * @param balance pool token balance
 * @returns pool token balance in USD
 */ export function getWalletBlockPoolTokenBalanceUSD(vault, vaultToken, vaultBlock, tokenId, balance) {
    var _vault_paretoDollar;
    // Convert sUSP balance to USD
    if (((_vault_paretoDollar = vault.paretoDollar) == null ? void 0 : _vault_paretoDollar.staking.tokenId) === tokenId) {
        const amountUSD = fixTokenAmount(vaultToken, BNify(balance).times(vaultBlock.price));
        return BNFixed(fixTokenAmount(vaultToken, amountUSD).times(1e6));
    }
    return BNFixed(fixTokenAmount(vaultToken, balance).times(1e6));
}
/**
 * Get pool token balance based on protocol
 * @param token token object
 * @param walletPool wallet pool
 * @returns pool token balance
 */ export function getWalletBlockPoolTokenBalance(tokenId, walletPool) {
    switch(walletPool.protocol){
        // Divide by 2 total pool balance
        case 'Balancer':
            {
                if (walletPool.balance) {
                    return BNFixed(BNify(walletPool.balance).div(2));
                }
                return getWalletPoolTokensBalance(tokenId, walletPool);
            }
        default:
            return getWalletPoolTokensBalance(tokenId, walletPool);
    }
}
/**
 * Get total amount of token balance for a specific wallet
 * @param token token object
 * @param walletBlock wallet block object
 * @returns token total balance
 */ export function getWalletBlockTokenBalance(token, walletBlock, startBalance = 0, protocols) {
    const balance = (walletBlock.pools || []).reduce((balance, pool)=>{
        // Check protocol corrispondence
        if (protocols && !protocols.includes(pool.protocol)) {
            return balance;
        }
        const poolTokenBalance = getWalletBlockPoolTokenBalance(token._id, pool);
        return balance.plus(poolTokenBalance);
    }, BNify(startBalance));
    return BNFixed(balance);
}
/**
 * Wallet block balance based on vault type
 * @param vaultType vault contract type
 * @param walletBlock wallet block
 * @returns wallet block balance
 */ export function getWalletBlockBalance(walletBlock, balanceField, options) {
    const { token, protocols } = options || {};
    const poolToken = token ? getWalletBlockTokenBalance(token, walletBlock, 0, protocols) : '0';
    switch(balanceField){
        case 'balance':
            return walletBlock.balance;
        case 'tokenAggregated':
            var _walletBlock_cdoEpoch;
            return BNFixed(BNify(walletBlock.balance).plus(((_walletBlock_cdoEpoch = walletBlock.cdoEpoch) == null ? void 0 : _walletBlock_cdoEpoch.pendingWithdrawAmount) || '0').plus(poolToken));
        case 'suspAggregated':
            return BNFixed(BNify(walletBlock.balance).plus(poolToken));
        case 'uspAggregated':
            var _walletBlock_paretoDollar;
            return BNFixed(BNify((_walletBlock_paretoDollar = walletBlock.paretoDollar) == null ? void 0 : _walletBlock_paretoDollar.uspBalance).plus(walletBlock.tokenBalance).plus(poolToken));
        case 'uspPools':
            var _walletBlock_paretoDollar1;
            return BNFixed(BNify((_walletBlock_paretoDollar1 = walletBlock.paretoDollar) == null ? void 0 : _walletBlock_paretoDollar1.uspBalance).plus(poolToken));
        case 'uspBalance':
            var _walletBlock_paretoDollar2;
            return BNFixed(BNify((_walletBlock_paretoDollar2 = walletBlock.paretoDollar) == null ? void 0 : _walletBlock_paretoDollar2.uspBalance).plus(walletBlock.tokenBalance));
        default:
            return walletBlock.tokenBalance;
    }
}

//# sourceMappingURL=wallet-blocks.lib.js.map