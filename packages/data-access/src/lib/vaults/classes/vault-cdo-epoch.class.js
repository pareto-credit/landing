"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultCDOEpoch", {
    enumerable: true,
    get: function() {
        return VaultCDOEpoch;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
const _core = require("../../core");
const _vaultcontractclass = require("./vault-contract.class");
const _vaultweb3lib = require("../libs/vault-web3.lib");
const _abis = require("../abis");
let VaultCDOEpoch = class VaultCDOEpoch extends _vaultcontractclass.VaultContract {
    /**
   * Parse Cdo epoch raw contract data
   * @param contractData Cdo Epoch contract raw data
   * @returns Parsed Cdo Epoch contract data
   */ parseContractData(contractData) {
        var _contractData_cdoEpoch_instantWithdraws, _contractData_cdoEpoch, _contractData_cdoEpoch1;
        if (contractData.cdoEpoch) {
            // Transform endDate and startDate in ISO string
            if ((0, _core.BNgt)(contractData.cdoEpoch.endDate)) {
                contractData.cdoEpoch.startDate = (0, _moment.default)((0, _core.BNify)(contractData.cdoEpoch.endDate).minus((0, _core.BNify)(contractData.cdoEpoch.duration)).times(1000).toNumber()).utc().toISOString();
                contractData.cdoEpoch.endDate = (0, _moment.default)((0, _core.BNify)(contractData.cdoEpoch.endDate).times(1000).toNumber()).utc().toISOString();
            } else {
                delete contractData.cdoEpoch.endDate;
            }
            // Transform APRs
            const epochDuration = (0, _core.BNify)(contractData.cdoEpoch.duration);
            const totalDuration = epochDuration.plus((0, _core.BNify)(contractData.cdoEpoch.bufferDuration));
            const apr = (0, _core.BNify)(contractData.cdoEpoch.apr).times(epochDuration).div(totalDuration);
            contractData.cdoEpoch.apr = apr.div(1e18).toNumber();
            contractData.APRs = {
                BASE: (0, _core.BNFixed)(apr)
            };
        }
        // Delete instant withdraws attribute if disabled
        if ((_contractData_cdoEpoch = contractData.cdoEpoch) == null ? void 0 : (_contractData_cdoEpoch_instantWithdraws = _contractData_cdoEpoch.instantWithdraws) == null ? void 0 : _contractData_cdoEpoch_instantWithdraws.disabled) {
            delete contractData.cdoEpoch.instantWithdraws;
        }
        if ((_contractData_cdoEpoch1 = contractData.cdoEpoch) == null ? void 0 : _contractData_cdoEpoch1.instantWithdraws) {
            // Convert deadline to ISO string
            if ((0, _core.BNgt)(contractData.cdoEpoch.instantWithdraws.deadline)) {
                contractData.cdoEpoch.instantWithdraws.deadline = (0, _moment.default)((0, _core.BNify)(contractData.cdoEpoch.instantWithdraws.deadline).times(1000).toNumber()).utc().toISOString();
            } else {
                delete contractData.cdoEpoch.instantWithdraws.deadline;
            }
            contractData.cdoEpoch.instantWithdraws.aprDelta = (0, _core.BNify)(contractData.cdoEpoch.instantWithdraws.aprDelta).div(1e18).toNumber();
            // Remove disabled field
            delete contractData.cdoEpoch.instantWithdraws.disabled;
        }
        return contractData;
    }
    /**
   * Merge multiple array of VaultWalletData into one single array
   * @param walletsList arrays of wallets data
   * @returns array of wallet data
   */ mergeWalletsData(walletsList) {
        const updateWallets = (wallets, wallet)=>{
            const existingWallet = wallets.find((existing)=>(0, _core.compLower)(existing.address, wallet.address));
            if (existingWallet) {
                return wallets.map((existing)=>(0, _core.compLower)(existing.address, wallet.address) ? _extends._({}, existing, {
                        cdoEpoch: _extends._({}, existing.cdoEpoch, wallet.cdoEpoch)
                    }) : existing);
            } else {
                return [
                    ...wallets,
                    wallet
                ];
            }
        };
        return walletsList.reduce((acc, wallets)=>{
            return wallets.reduce((innerAcc, wallet)=>updateWallets(innerAcc, wallet), acc);
        }, []);
    }
    /**
   * Get contract data
   * @returns the blockchain contract data
   */ async getContractData(blockNumber = 'latest') {
        const callData = this.makeCallData(blockNumber);
        const contractData = await this.getData(callData, blockNumber);
        const vaultContractData = this.parseContractData(contractData);
        // Get deposit and withdraw queue data
        const [depositQueueContractData, withdrawQueueContractData] = await Promise.all([
            this.getDepositQueueContractData(blockNumber, contractData, vaultContractData),
            this.getWithdrawQueueContractData(blockNumber, contractData, vaultContractData)
        ]);
        const wallets = this.mergeWalletsData([
            vaultContractData.wallets || [],
            depositQueueContractData.wallets || [],
            withdrawQueueContractData.wallets || []
        ]);
        return _extends._({}, vaultContractData, {
            cdoEpoch: _extends._({}, vaultContractData.cdoEpoch, depositQueueContractData.cdoEpoch, withdrawQueueContractData.cdoEpoch),
            wallets
        });
    }
    /**
   * Get contract data from deposit queue contract
   * @param blockNumber block number
   * @param contractData main contract data
   * @param parsedContractData main contract parsed data
   * @returns deposit queue contract data
   */ async getDepositQueueContractData(blockNumber = 'latest', contractData, parsedContractData) {
        var _this_vault_cdoEpoch, _depositQueue_cdoEpoch;
        if (!(contractData == null ? void 0 : contractData.cdoEpoch) || !((_this_vault_cdoEpoch = this.vault.cdoEpoch) == null ? void 0 : _this_vault_cdoEpoch.depositQueue) || !contractData.cdoEpoch.epochNumber || isNaN(Number(contractData.cdoEpoch.epochNumber))) {
            return {};
        }
        const prevEpochNumber = Number(contractData.cdoEpoch.epochNumber);
        const epochNumber = prevEpochNumber + 1;
        // Get deposit queue data using epochNumber
        const callData = this.makeDepositQueueData(epochNumber, prevEpochNumber);
        const depositQueue = await this.getData(callData, blockNumber, {
            current: parsedContractData,
            previous: parsedContractData.previous
        });
        return {
            cdoEpoch: {
                depositQueue: (_depositQueue_cdoEpoch = depositQueue.cdoEpoch) == null ? void 0 : _depositQueue_cdoEpoch.depositQueue
            },
            wallets: depositQueue.wallets
        };
    }
    /**
   * Get contract data from withdraw queue contract
   * @param blockNumber block number
   * @param contractData main contract data
   * @param parsedContractData main contract parsed data
   * @returns withdraw queue contract data
   */ async getWithdrawQueueContractData(blockNumber = 'latest', contractData, parsedContractData) {
        var _this_vault_cdoEpoch, _withdrawQueue_cdoEpoch;
        if (!(contractData == null ? void 0 : contractData.cdoEpoch) || !((_this_vault_cdoEpoch = this.vault.cdoEpoch) == null ? void 0 : _this_vault_cdoEpoch.withdrawQueue) || !contractData.cdoEpoch.epochNumber || isNaN(Number(contractData.cdoEpoch.epochNumber))) {
            return {};
        }
        const prevEpochNumber = Number(contractData.cdoEpoch.epochNumber);
        const epochNumber = prevEpochNumber + 1;
        // Get deposit queue data using epochNumber
        const callData = this.makeWithdrawQueueData(epochNumber, prevEpochNumber);
        const withdrawQueue = await this.getData(callData, blockNumber, {
            current: parsedContractData,
            previous: parsedContractData.previous
        });
        return {
            cdoEpoch: {
                withdrawQueue: (_withdrawQueue_cdoEpoch = withdrawQueue.cdoEpoch) == null ? void 0 : _withdrawQueue_cdoEpoch.withdrawQueue
            },
            wallets: withdrawQueue.wallets
        };
    }
    /**
   * Prepare call data for deposit queue
   * @param contractData processed contract data
   * @returns deposit queue call data
   */ makeDepositQueueData(epochNumber, prevEpochNumber) {
        var _this_vault_cdoEpoch;
        // TODO: this should not be necessary. Fix VaultCdoType
        if (!((_this_vault_cdoEpoch = this.vault.cdoEpoch) == null ? void 0 : _this_vault_cdoEpoch.depositQueue)) {
            return [];
        }
        const { abi: abiQueue, abiCode, address } = this.vault.cdoEpoch.depositQueue;
        const depositQueueContract = {
            abi: (0, _vaultweb3lib.ensureAbi)({
                abi: abiQueue,
                abiCode
            }),
            address,
            protocol: this.vault.protocol
        };
        let callData = this.makeProtocolData(depositQueueContract, 'CDO_EPOCH_DEPOSIT_QUEUE', undefined, {
            epochNumber,
            prevEpochNumber
        });
        // Parse wallet methods
        if (this.walletAddresses) {
            callData = this.walletAddresses.reduce((acc, walletAddress)=>[
                    ...acc,
                    ...this.makeProtocolData(depositQueueContract, 'WALLET_DEPOSIT_QUEUE', undefined, {
                        epochNumber,
                        walletAddress
                    })
                ], callData);
        }
        return callData;
    }
    /**
   * Prepare call data for deposit queue
   * @param contractData processed contract data
   * @returns deposit queue call data
   */ makeWithdrawQueueData(epochNumber, prevEpochNumber) {
        var _this_vault_cdoEpoch;
        // TODO: this should not be necessary. Fix VaultCdoType
        if (!((_this_vault_cdoEpoch = this.vault.cdoEpoch) == null ? void 0 : _this_vault_cdoEpoch.withdrawQueue)) {
            return [];
        }
        const { abi: abiQueue, abiCode, address } = this.vault.cdoEpoch.withdrawQueue;
        const withdrawQueueContract = {
            abi: (0, _vaultweb3lib.ensureAbi)({
                abi: abiQueue,
                abiCode
            }),
            address,
            protocol: this.vault.protocol
        };
        let callData = this.makeProtocolData(withdrawQueueContract, 'CDO_EPOCH_WITHDRAW_QUEUE', undefined, {
            epochNumber,
            prevEpochNumber
        });
        // Parse wallet methods
        if (this.walletAddresses) {
            callData = this.walletAddresses.reduce((acc, walletAddress)=>[
                    ...acc,
                    ...this.makeProtocolData(withdrawQueueContract, 'WALLET_WITHDRAW_QUEUE', undefined, {
                        epochNumber,
                        walletAddress
                    })
                ], callData);
        }
        return callData;
    }
    /**
   * Prepare call data
   * @returns the web3 call data
   */ makeCallData(blockNumber) {
        // Parse vault contract methods
        const { abi: vaultAbi, abiCode, address, protocol } = this.vault;
        const abi = (0, _vaultweb3lib.ensureAbi)({
            abi: vaultAbi,
            abiCode
        });
        let callData = this.makeProtocolData({
            abi,
            address,
            protocol
        }, 'TRANCHE');
        // TODO: this should not be necessary. Fix VaultCdoType
        if (!this.vault.cdoEpoch) {
            return [];
        }
        // Parse vault CDO methods
        callData = [
            ...callData,
            ...this.makeProtocolData({
                abi: this.vault.cdoEpoch.abi,
                abiCode: this.vault.cdoEpoch.abiCode,
                address: this.vault.cdoEpoch.address,
                protocol: this.vault.protocol
            }, 'CDO_EPOCH')
        ];
        // Add strategy contract calls
        callData = [
            ...callData,
            ...this.makeStrategyData()
        ];
        // Add write-off contract calls
        callData = [
            ...callData,
            ...this.makeWriteOffData()
        ];
        // Parse wallet methods
        if (this.walletAddresses) {
            callData = this.walletAddresses.reduce((acc, walletAddress)=>[
                    ...acc,
                    ...this.makeWalletData(walletAddress, {
                        abi,
                        address,
                        protocol
                    })
                ], callData);
        }
        // Parse token methods
        if (this.token.oracle) {
            callData = [
                ...callData,
                ...this.makeProtocolData(this.token.oracle, 'ORACLE', this.token)
            ];
        }
        // Add rewards token call data
        callData = [
            ...callData,
            ...this.makeRewardTokensData(protocol)
        ];
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
    makeWriteOffData() {
        var _this_vault_cdoEpoch;
        if (!((_this_vault_cdoEpoch = this.vault.cdoEpoch) == null ? void 0 : _this_vault_cdoEpoch.writeOff) || !this.walletAddresses) {
            return [];
        }
        const { address, abiCode } = this.vault.cdoEpoch.writeOff;
        const abi = (0, _vaultweb3lib.getAbiByCode)(abiCode);
        return this.walletAddresses.reduce((acc, walletAddress)=>[
                ...acc,
                ...this.makeProtocolData({
                    abi,
                    address,
                    protocol: this.vault.protocol
                }, 'WALLET_CDO_EPOCH_WRITEOFF', undefined, {
                    walletAddress
                })
            ], []);
    }
    makeStrategyData() {
        if (!this.vault.strategy) {
            return [];
        }
        let callData = [];
        const strategyContract = this.vault.strategy;
        callData = [
            ...callData,
            ...this.makeProtocolData(_extends._({}, strategyContract, {
                protocol: this.vault.protocol
            }), 'CDO_EPOCH_STRATEGY')
        ];
        if (this.walletAddresses) {
            callData = this.walletAddresses.reduce((acc, walletAddress)=>[
                    ...acc,
                    ...this.makeProtocolData(_extends._({}, strategyContract, {
                        protocol: this.vault.protocol
                    }), 'WALLET_CDO_EPOCH_STRATEGY', undefined, {
                        walletAddress
                    })
                ], callData);
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
                case 'WALLET_DEPOSIT':
                    return this.getWalletDeposit(options);
                case 'WALLET_BALANCE':
                    return this.getWalletBalance(options);
                case 'WALLET_ALLOWANCE':
                    return this.getWalletAllowance(options, this.token);
                case 'WALLET_ALLOWANCE_LP':
                    return this.getWalletAllowance(options, this.vault);
                case 'WALLET_WITHDRAWABLE':
                    return this.getWalletWithdrawable(options);
                default:
                    throw new Error('Value not available for this kind of vault');
            }
        } catch (error) {
            console.error(`Contract get value error`, type, error);
            return Promise.resolve(null);
        }
    }
    /**
   * Get wallet allowance
   * @param options - the method options
   * @returns the allowance amount
   */ getWalletAllowance(options, contract) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.walletAddress) === undefined || (options == null ? void 0 : options.spender) === undefined) {
            throw Error('Wallet address is mandatory');
        }
        // Use custom contract if specified
        const { address } = contract || this.token;
        const method = this.getContractNonPayableMethod({
            abi: _abis.ERC20_ABI,
            address,
            method: 'allowance',
            params: [
                options.walletAddress,
                options.spender
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((allowance)=>(0, _core.BNFixed)(allowance));
    }
    /**
   * Get wallet max withdrawable
   * @param options - the method options
   * @returns the withdrawable amount
   */ getWalletWithdrawable(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.walletAddress) === undefined) {
            throw Error('Wallet address is mandatory');
        }
        const { abi, abiCode, address } = this.vault.cdoEpoch;
        const { address: trancheTokenAddr } = this.vault || {};
        const method = this.getContractNonPayableMethod({
            abi: (0, _vaultweb3lib.ensureAbi)({
                abi,
                abiCode
            }),
            address,
            method: 'maxWithdrawable',
            params: [
                options.walletAddress,
                trancheTokenAddr
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((withdrawable)=>(0, _core.BNFixed)(withdrawable));
    }
    /**
   * Check if wallet is allowed
   * @param options - the method options
   * @returns true if wallet is allowed
   */ isWalletAllowed(options) {
        try {
            if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
                throw Error('Wrong vault type');
            }
            if ((options == null ? void 0 : options.walletAddress) === undefined) {
                throw Error('Wallet address is mandatory');
            }
            const { abi, abiCode, address } = this.vault.cdoEpoch;
            const method = this.getContractNonPayableMethod({
                abi: (0, _vaultweb3lib.ensureAbi)({
                    abi,
                    abiCode
                }),
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
    constructor(vault, token, options){
        super(vault, token, options);
        if (!vault.cdoEpoch) {
            throw new Error('Vault without CDO Epoch data');
        }
    }
};

//# sourceMappingURL=vault-cdo-epoch.class.js.map