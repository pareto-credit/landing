"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultParetoDollar", {
    enumerable: true,
    get: function() {
        return VaultParetoDollar;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _core = require("../../core");
const _vaultcontractclass = require("./vault-contract.class");
const _eulerlib = require("../../integrations/euler-client/euler.lib");
const _vaultweb3lib = require("../libs/vault-web3.lib");
const _lodash = require("lodash");
const _abis = require("../abis");
let VaultParetoDollar = class VaultParetoDollar extends _vaultcontractclass.VaultContract {
    /**
   * Get contract data
   * @returns the blockchain contract data
   */ async getContractData(blockNumber = 'latest') {
        var _contractData_paretoDollar, _additionalData_paretoDollar;
        const callData = this.makeCallData(blockNumber);
        let contractData = await this.getData(callData, blockNumber);
        const [tokensData, additionalData] = await Promise.all([
            this.getPoolsTokensData(contractData),
            this.getAdditionalData(blockNumber, contractData)
        ]);
        // Implement pools with tokens data
        const pools = contractData.pools ? this.implementPoolsTokensData(contractData.pools, tokensData) : undefined;
        // Implements wallets with Euler data
        const wallets = contractData.wallets && additionalData.wallets ? this.implementWalletsData(contractData.wallets, additionalData.wallets) : contractData.wallets;
        contractData = _extends._({}, contractData, {
            pools,
            wallets,
            paretoDollar: _extends._({}, contractData.paretoDollar, {
                queue: _extends._({}, ((_contractData_paretoDollar = contractData.paretoDollar) == null ? void 0 : _contractData_paretoDollar.queue) || {}, ((_additionalData_paretoDollar = additionalData.paretoDollar) == null ? void 0 : _additionalData_paretoDollar.queue) || {})
            })
        });
        return this.parseContractData(contractData);
    }
    /**
   * Get Euler vaults data for each wallet
   * @param blockNumber block number
   * @param contractData main contract data
   * @returns euler vaults data
   */ getEulerWalletsCalls() {
        var _this_vault_pools;
        const eulerPool = (_this_vault_pools = this.vault.pools) == null ? void 0 : _this_vault_pools.find((p)=>p.protocol === 'Euler');
        const accountLensContract = eulerPool == null ? void 0 : eulerPool.oracle;
        if (!this.web3Client || !accountLensContract) {
            return [];
        }
        // Get all subaccounts for all other wallets
        const allSubAccounts = (0, _lodash.uniq)((this.walletAddresses || []).flatMap((walletAddr)=>(0, _eulerlib.getEulerSubAccounts)(walletAddr).filter((subAddr)=>!(0, _core.compLower)(subAddr, walletAddr))).map((subAddr)=>subAddr.toLowerCase()));
        return this.makeEulerVaultsCalls(allSubAccounts, eulerPool, accountLensContract);
    }
    makeEulerVaultsCalls(subAccounts, pool, accountLensContract) {
        const { abi: oracleAbi, abiCode, address } = accountLensContract;
        const abi = (0, _vaultweb3lib.ensureAbi)({
            abi: oracleAbi,
            abiCode
        });
        const contract = {
            abi,
            address,
            protocol: pool.protocol
        };
        return subAccounts.reduce((acc, subAccount)=>{
            const callsData = this.makeProtocolData(contract, 'WALLET_EULER_ACCOUNT_LENS', undefined, {
                walletAddress: subAccount,
                poolAddress: pool.address
            }, {
                address: pool.address,
                protocol: pool.protocol,
                type: 'WALLET_EULER_ACCOUNT_LENS'
            });
            return [
                ...acc,
                ...callsData
            ];
        }, []);
    }
    /**
   * Parse Cdo epoch raw contract data
   * @param contractData Cdo Epoch contract raw data
   * @returns Parsed Cdo Epoch contract data
   */ parseContractData(contractData) {
        return _extends._({}, contractData, {
            pools: contractData.pools ? this.parsePools(contractData.pools) : contractData.pools
        });
    }
    /**
   * Include napierPT pool tokens into napierYT pool
   * @param pools
   * @returns parsed pools
   */ parsePools(pools) {
        return pools.map((p)=>{
            switch(p.protocol){
                case 'NapierYT':
                    {
                        const napierPTPool = pools.find((pool)=>pool.protocol === 'NapierPT');
                        return _extends._({}, p, {
                            tokensInfo: napierPTPool == null ? void 0 : napierPTPool.tokensInfo
                        });
                    }
                default:
                    return p;
            }
        });
    }
    /**
   * Get additional data from queue contract
   * @param blockNumber block number
   * @param contractData main contract data
   * @returns vault contract data
   */ async getAdditionalData(blockNumber = 'latest', contractData) {
        const eulerWalletCalls = this.getEulerWalletsCalls();
        const yieldSourceCalls = this.getQueueYieldSourcesCalls(contractData);
        const epochPendingCalls = this.getQueueEpochPendingCalls(contractData);
        const callData = [
            ...eulerWalletCalls,
            ...yieldSourceCalls,
            ...epochPendingCalls
        ];
        return await this.getData(callData, blockNumber, {
            current: contractData
        });
    }
    /**
   * Get contract data from queue contract
   * @param blockNumber block number
   * @param contractData main contract data
   * @returns queue contract data
   */ getQueueYieldSourcesCalls(contractData) {
        var _contractData_paretoDollar_queue_yieldSources, _contractData_paretoDollar_queue, _contractData_paretoDollar;
        if (!((_contractData_paretoDollar = contractData.paretoDollar) == null ? void 0 : (_contractData_paretoDollar_queue = _contractData_paretoDollar.queue) == null ? void 0 : (_contractData_paretoDollar_queue_yieldSources = _contractData_paretoDollar_queue.yieldSources) == null ? void 0 : _contractData_paretoDollar_queue_yieldSources.length)) {
            return [];
        }
        const yieldSources = contractData.paretoDollar.queue.yieldSources;
        return yieldSources.reduce((acc, yieldSource)=>[
                ...acc,
                ...this.makeYieldSourceData(yieldSource)
            ], []);
    }
    /**
   * Prepare call data for deposit queue
   * @param contractData processed contract data
   * @returns deposit queue call data
   */ makeYieldSourceData(yieldSource) {
        var _this_vault_paretoDollar;
        if (!((_this_vault_paretoDollar = this.vault.paretoDollar) == null ? void 0 : _this_vault_paretoDollar.queue)) {
            return [];
        }
        const { abi: queueAbi, abiCode, address } = this.vault.paretoDollar.queue;
        const abi = (0, _vaultweb3lib.ensureAbi)({
            abi: queueAbi,
            abiCode
        });
        const queueContract = {
            abi,
            address,
            protocol: this.vault.protocol
        };
        return this.makeProtocolData(queueContract, 'PARETO_DOLLAR_QUEUE_YIELD_SOURCE', undefined, {
            yieldSourceAddress: yieldSource.sourceAddress
        });
    }
    /**
   * Get contract data from queue contract
   * @param blockNumber block number
   * @param contractData main contract data
   * @returns queue contract data
   */ getQueueEpochPendingCalls(contractData) {
        var _contractData_paretoDollar_queue, _contractData_paretoDollar;
        if (!((_contractData_paretoDollar = contractData.paretoDollar) == null ? void 0 : (_contractData_paretoDollar_queue = _contractData_paretoDollar.queue) == null ? void 0 : _contractData_paretoDollar_queue.epochNumber) || isNaN(Number(contractData.paretoDollar.queue.epochNumber))) {
            return [];
        }
        const epochNumber = Number(contractData.paretoDollar.queue.epochNumber);
        const prevEpochNumber = Math.max(0, epochNumber - 1);
        // Get deposit queue data using epochNumber
        return this.makeQueuePendingEpochData(epochNumber, prevEpochNumber);
    }
    /**
   * Prepare call data for deposit queue
   * @param contractData processed contract data
   * @returns deposit queue call data
   */ makeQueuePendingEpochData(epochNumber, prevEpochNumber) {
        var _this_vault_paretoDollar;
        if (!((_this_vault_paretoDollar = this.vault.paretoDollar) == null ? void 0 : _this_vault_paretoDollar.queue)) {
            return [];
        }
        const { abi: queueAbi, abiCode, address } = this.vault.paretoDollar.queue;
        const abi = (0, _vaultweb3lib.ensureAbi)({
            abi: queueAbi,
            abiCode
        });
        const queueContract = {
            abi,
            address,
            protocol: this.vault.protocol
        };
        return this.makeProtocolData(queueContract, 'PARETO_DOLLAR_QUEUE_EPOCH_PENDING', undefined, {
            epochNumber,
            prevEpochNumber
        });
    }
    /**
   * Prepare call data
   * @returns the web3 call data
   */ makeCallData(blockNumber) {
        // Parse vault contract methods
        const { abi: vaultAbi, abiCode, address, protocol, contractType } = this.vault;
        const abi = (0, _vaultweb3lib.ensureAbi)({
            abi: vaultAbi,
            abiCode
        });
        let callData = this.makeProtocolData({
            abi,
            address,
            protocol
        }, contractType);
        const { paretoDollar } = this.vault;
        // Make calls for queue contract
        if (paretoDollar == null ? void 0 : paretoDollar.queue) {
            const queueAbi = (0, _vaultweb3lib.ensureAbi)({
                abi: paretoDollar.queue.abi,
                abiCode: paretoDollar.queue.abiCode
            });
            callData = [
                ...callData,
                ...this.makeProtocolData({
                    abi: queueAbi,
                    address: paretoDollar.queue.address,
                    protocol: this.vault.protocol
                }, 'PARETO_DOLLAR_QUEUE')
            ];
        }
        // Make calls for staking contract
        if (paretoDollar == null ? void 0 : paretoDollar.staking) {
            const stakingAbi = (0, _vaultweb3lib.ensureAbi)({
                abi: paretoDollar.staking.abi,
                abiCode: paretoDollar.staking.abiCode
            });
            callData = [
                ...callData,
                ...this.makeProtocolData({
                    abi: stakingAbi,
                    address: paretoDollar.staking.address,
                    protocol: this.vault.protocol
                }, 'PARETO_DOLLAR_STAKING')
            ];
            if (this.walletAddresses) {
                // Add staking contract
                callData = this.walletAddresses.reduce((acc, walletAddress)=>[
                        ...acc,
                        ...this.makeProtocolData({
                            abi: stakingAbi,
                            address: paretoDollar.staking.address,
                            protocol: this.vault.protocol
                        }, 'WALLET_PARETO_DOLLAR_STAKING', undefined, {
                            walletAddress
                        })
                    ], [
                    ...callData
                ]);
            }
        }
        // Parse wallet methods
        if (this.walletAddresses) {
            callData = this.walletAddresses.reduce((acc, walletAddress)=>[
                    ...acc,
                    ...this.makeWalletData(walletAddress, {
                        abi,
                        address,
                        protocol
                    })
                ], [
                ...callData
            ]);
        }
        // Parse token methods
        if (this.token.oracle) {
            callData = [
                ...callData,
                ...this.makeProtocolData(this.token.oracle, 'ORACLE', this.token)
            ];
        }
        // Parse vault pools methods
        if (this.vault.pools) {
            callData = this.vault.pools.reduce((acc, pool)=>[
                    ...acc,
                    ...this.makePoolData(pool, blockNumber)
                ], [
                ...callData
            ]);
        }
        return callData;
    }
    /**
   * Get vault non payable method
   * @param type
   * @param params
   */ getValue(type, options) {
        try {
            switch(type){
                case 'IS_WALLET_ALLOWED':
                    return this.isWalletAllowed(options);
                case 'TOKEN_BALANCE':
                    return this.getTokenBalance(options);
                case 'TOKEN_ALLOWANCE':
                    return this.getTokenAllowance(options);
                case 'TOKEN_CONVERSION':
                    return this.getTokenConversion(options);
                case 'WALLET_ALLOWANCE':
                case 'WALLET_ALLOWANCE_LP':
                case 'WALLET_BALANCE':
                case 'WALLET_DEPOSIT':
                case 'WALLET_WITHDRAWABLE':
                    return Promise.resolve('');
                default:
                    throw new Error('Value not available for this kind of vault');
            }
        } catch (error) {
            console.error(`Contract get value error`, type, error);
            return Promise.resolve(null);
        }
    }
    /**
   * Check if wallet is allowed
   * @param options - the method options
   * @returns true if wallet is allowed
   */ isWalletAllowed(options) {
        try {
            if (this.vault.contractType !== 'PARETO_DOLLAR' || !this.vault.paretoDollar) {
                throw Error('Wrong vault type');
            }
            if ((options == null ? void 0 : options.walletAddress) === undefined) {
                throw Error('Wallet address is mandatory');
            }
            const { abi: vaultAbi, abiCode, address } = this.vault;
            const abi = (0, _vaultweb3lib.ensureAbi)({
                abi: vaultAbi,
                abiCode
            });
            const method = this.getContractNonPayableMethod({
                abi,
                address,
                method: 'isWalletAllowed',
                params: [
                    options.walletAddress
                ]
            });
            if (!method) {
                throw Error('Not method available');
            }
            return method.call();
        } catch (error) {
            return Promise.resolve(false);
        }
    }
    /**
   * Get token balance
   * @param options - the method options
   * @returns the token balance
   */ async getTokenBalance(options) {
        if ((options == null ? void 0 : options.walletAddress) === undefined || (options == null ? void 0 : options.tokenAddress) === undefined) {
            return;
        }
        const { tokenAddress, walletAddress } = options;
        const { abi, address } = this.getContractAbi(tokenAddress);
        const method = this.getContractNonPayableMethod({
            abi,
            address,
            method: 'balanceOf',
            params: [
                walletAddress
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((balance)=>(0, _core.BNFixed)(balance));
    }
    /**
   * Get token allowance
   * @param options
   * @returns
   */ async getTokenAllowance(options) {
        if (this.vault.contractType !== 'PARETO_DOLLAR' || !this.vault.paretoDollar) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.walletAddress) === undefined || (options == null ? void 0 : options.tokenAddress) === undefined || (options == null ? void 0 : options.spender) === undefined) {
            return;
        }
        const { tokenAddress, walletAddress, spender } = options;
        const { abi, address } = this.getContractAbi(tokenAddress);
        const method = this.getContractNonPayableMethod({
            abi,
            address,
            method: 'allowance',
            params: [
                walletAddress,
                spender
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((balance)=>(0, _core.BNFixed)(balance));
    }
    /**
   * Get token conversion
   * @param options
   * @returns
   */ async getTokenConversion(options) {
        if (this.vault.contractType !== 'PARETO_DOLLAR' || !this.vault.paretoDollar) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.pair) === undefined || (options == null ? void 0 : options.tokenAmount) === undefined) {
            return;
        }
        const { pair, tokenAmount } = options;
        const { abi, abiCode, address } = this.vault.paretoDollar.staking;
        const methodName = pair === 'USP|sUSP' ? 'convertToShares' : pair === 'sUSP|USP' ? 'convertToAssets' : undefined;
        if (!methodName) {
            return;
        }
        const method = this.getContractNonPayableMethod({
            abi: (0, _vaultweb3lib.ensureAbi)({
                abi,
                abiCode
            }),
            address,
            method: methodName,
            params: [
                tokenAmount
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((balance)=>(0, _core.BNFixed)(balance));
    }
    /**
   * Get address and abi of the pareto token
   * @param tokenId
   */ getContractAbi(address) {
        var _this_vault_paretoDollar, _this_vault_paretoDollar1, _this_vault_paretoDollar_collaterals, _this_vault_paretoDollar2;
        if ((0, _core.compLower)(address, this.vault.address)) {
            const { address, abi: vaultAbi, abiCode } = this.vault;
            const abi = (0, _vaultweb3lib.ensureAbi)({
                abi: vaultAbi,
                abiCode
            });
            return {
                address,
                abi
            };
        }
        // Staking contract
        if (((_this_vault_paretoDollar = this.vault.paretoDollar) == null ? void 0 : _this_vault_paretoDollar.staking.address) && (0, _core.compLower)(address, (_this_vault_paretoDollar1 = this.vault.paretoDollar) == null ? void 0 : _this_vault_paretoDollar1.staking.address)) {
            const { address, abi: stakingAbi, abiCode } = this.vault.paretoDollar.staking;
            const abi = (0, _vaultweb3lib.ensureAbi)({
                abi: stakingAbi,
                abiCode
            });
            return {
                address,
                abi
            };
        }
        // Collateral contract
        const collateral = (_this_vault_paretoDollar2 = this.vault.paretoDollar) == null ? void 0 : (_this_vault_paretoDollar_collaterals = _this_vault_paretoDollar2.collaterals) == null ? void 0 : _this_vault_paretoDollar_collaterals.find((c)=>(0, _core.compLower)(c.tokenAddress, address));
        if (collateral) {
            const { tokenAddress } = collateral;
            return {
                address: tokenAddress,
                abi: _abis.ERC20_ABI
            };
        }
        throw Error('Abi not found');
    }
    constructor(vault, token, options){
        super(vault, token, options);
    }
};

//# sourceMappingURL=vault-pareto-dollar.class.js.map