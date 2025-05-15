import { _ as _extends } from "@swc/helpers/_/_extends";
import { BNFixed } from '../../core';
import { VaultContract } from './vault-contract.class';
import { ERC20_ABI } from '../vault.const';
export class VaultParetoDollar extends VaultContract {
    /**
   * Get contract data
   * @returns the blockchain contract data
   */ async getContractData(blockNumber = 'latest') {
        var _contractData_paretoDollar, _additionalQueueData_paretoDollar;
        const callData = this.makeCallData();
        const contractData = await this.getData(callData, blockNumber);
        const additionalQueueData = await this.getQueueAdditionalData(blockNumber, contractData);
        return _extends({}, contractData, {
            paretoDollar: _extends({}, contractData.paretoDollar, {
                queue: _extends({}, ((_contractData_paretoDollar = contractData.paretoDollar) == null ? void 0 : _contractData_paretoDollar.queue) || {}, ((_additionalQueueData_paretoDollar = additionalQueueData.paretoDollar) == null ? void 0 : _additionalQueueData_paretoDollar.queue) || {})
            })
        });
    }
    /**
   * Get additional data from queue contract
   * @param blockNumber block number
   * @param contractData main contract data
   * @returns vault contract data
   */ async getQueueAdditionalData(blockNumber = 'latest', contractData) {
        const yieldSourceCalls = this.getQueueYieldSourcesCalls(contractData);
        const epochPendingCalls = this.getQueueEpochPendingCalls(contractData);
        const callData = [
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
        const { abi, address } = this.vault.paretoDollar.queue;
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
        const { abi, address } = this.vault.paretoDollar.queue;
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
   * Get vault payable method
   * @param type the payment method type
   * @param options the payment method options
   * @returns the web3 payable method
   */ getPayableMethod(type, options) {
        try {
            switch(type){
                case 'MINT':
                    return this.mint(options);
                case 'REQUEST_REDEEM':
                    return this.requestRedeem(options);
                case 'CLAIM_REDEEM_REQUEST':
                    return this.claim(options);
                case 'STAKE':
                    return this.stake(options);
                case 'UNSTAKE':
                    return this.unstake(options);
                case 'TOKEN_APPROVE':
                    return this.approveToken(options);
                default:
                    throw new Error('Method not available for this kind of vault');
            }
        } catch (error) {
            console.error(`Contract get method error`, type, error);
            return;
        }
    }
    /**
   * Prepare call data
   * @returns the web3 call data
   */ makeCallData() {
        // Parse vault contract methods
        const { abi, address, protocol, contractType } = this.vault;
        let callData = this.makeProtocolData({
            abi,
            address,
            protocol
        }, contractType);
        const { paretoDollar } = this.vault;
        // Make calls for queue contract
        if (paretoDollar == null ? void 0 : paretoDollar.queue) {
            callData = [
                ...callData,
                ...this.makeProtocolData({
                    abi: paretoDollar.queue.abi,
                    address: paretoDollar.queue.address,
                    protocol: this.vault.protocol
                }, 'PARETO_DOLLAR_QUEUE')
            ];
        }
        // Make calls for staking contract
        if (paretoDollar == null ? void 0 : paretoDollar.staking) {
            callData = [
                ...callData,
                ...this.makeProtocolData({
                    abi: paretoDollar.staking.abi,
                    address: paretoDollar.staking.address,
                    protocol: this.vault.protocol
                }, 'PARETO_DOLLAR_STAKING')
            ];
            if (this.walletAddresses) {
                // Add staking contract
                callData = this.walletAddresses.reduce((acc, walletAddress)=>[
                        ...acc,
                        ...this.makeProtocolData({
                            abi: paretoDollar.staking.abi,
                            address: paretoDollar.staking.address,
                            protocol: this.vault.protocol
                        }, 'WALLET_PARETO_DOLLAR_STAKING', undefined, {
                            walletAddress
                        })
                    ], callData);
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
                ], callData);
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
                    ...this.makePoolData(pool)
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
   * Mint new USP tokens providing stablecoin as collateral
   * @param options the method params
   * @returns the payable method for stop the epoch
   */ mint(options) {
        if (this.vault.contractType !== 'PARETO_DOLLAR' || !this.vault.paretoDollar) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.collateralAddress) === undefined || options.amount === undefined) {
            return;
        }
        const { abi, address } = this.vault;
        const { collateralAddress, amount } = options;
        // Check deposit amount
        const amountCheck = this.checkContractAmount(amount);
        if (!amountCheck) {
            return;
        }
        const params = [
            collateralAddress,
            amount
        ];
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'mint',
            params
        });
    }
    /**
   * Request redeem back collateral from USP amount
   * @param options - the payable method options
   * @returns the payable method
   */ requestRedeem(options) {
        if (this.vault.contractType !== 'PARETO_DOLLAR' || !this.vault.paretoDollar) {
            throw Error('Wrong vault type');
        }
        const { abi, address } = this.vault;
        const { amount } = options || {};
        // Check deposit amount
        const amountCheck = this.checkContractAmount(amount);
        if (!amountCheck) {
            return;
        }
        const params = [
            amount
        ];
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'requestRedeem',
            params
        });
    }
    /**
   * Claim redeem request
   * @param options - the payable method options
   * @returns the payable method
   */ claim(options) {
        if (this.vault.contractType !== 'PARETO_DOLLAR' || !this.vault.paretoDollar) {
            throw Error('Wrong vault type');
        }
        const { abi, address } = this.vault;
        const { epochNumber } = options || {};
        // Check deposit amount
        if (epochNumber === undefined) {
            return;
        }
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'claimRedeemRequest',
            params: [
                epochNumber
            ]
        });
    }
    /**
   * Stake USP tokens
   * @param options the method params
   * @returns the payable method for stop the epoch
   */ stake(options) {
        if (this.vault.contractType !== 'PARETO_DOLLAR' || !this.vault.paretoDollar) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.walletAddress) === undefined || options.assets === undefined) {
            return;
        }
        const { abi, address } = this.vault.paretoDollar.staking;
        const { walletAddress, assets } = options;
        // Check deposit amount
        const amountCheck = this.checkContractAmount(assets);
        if (!amountCheck) {
            return;
        }
        const params = [
            assets,
            walletAddress
        ];
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'deposit',
            params
        });
    }
    /**
   * Unstake sUSP tokens
   * @param options the method params
   * @returns the payable method for stop the epoch
   */ unstake(options) {
        if (this.vault.contractType !== 'PARETO_DOLLAR' || !this.vault.paretoDollar) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.walletAddress) === undefined || options.shares === undefined) {
            return;
        }
        const { abi, address } = this.vault.paretoDollar.staking;
        const { walletAddress, shares } = options;
        // Check deposit amount
        const amountCheck = this.checkContractAmount(shares);
        if (!amountCheck) {
            return;
        }
        const params = [
            shares,
            walletAddress,
            walletAddress
        ];
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'redeem',
            params
        });
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
            const { abi, address } = this.vault;
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
        return method.call().then((balance)=>BNFixed(balance));
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
        return method.call().then((balance)=>BNFixed(balance));
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
        const { abi, address } = this.vault.paretoDollar.staking;
        const methodName = pair === 'USP|sUSP' ? 'convertToShares' : pair === 'sUSP|USP' ? 'convertToAssets' : undefined;
        if (!methodName) {
            return;
        }
        const method = this.getContractNonPayableMethod({
            abi,
            address,
            method: methodName,
            params: [
                tokenAmount
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((balance)=>BNFixed(balance));
    }
    /**
   * Increment token allowance
   * @param options the method options
   * @returns the payable method for increment allowance
   */ approveToken(options) {
        if ((options == null ? void 0 : options.tokenAddress) === undefined || (options == null ? void 0 : options.spender) === undefined || (options == null ? void 0 : options.amount) === undefined) {
            return;
        }
        const { tokenAddress, spender, amount } = options;
        const { abi, address } = this.getContractAbi(tokenAddress);
        const amountCheck = this.checkContractAmount(options.amount);
        if (!amountCheck) {
            return;
        }
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'approve',
            params: [
                spender,
                amount
            ]
        });
    }
    /**
   * Get address and abi of the pareto token
   * @param tokenId
   */ getContractAbi(address) {
        var _this_vault_paretoDollar, _this_vault_paretoDollar_collaterals, _this_vault_paretoDollar1;
        if (address === this.vault.address) {
            const { address, abi } = this.vault;
            return {
                address,
                abi
            };
        }
        // Staking contract
        if (address === ((_this_vault_paretoDollar = this.vault.paretoDollar) == null ? void 0 : _this_vault_paretoDollar.staking.address)) {
            const { address, abi } = this.vault.paretoDollar.staking;
            return {
                address,
                abi
            };
        }
        // Collateral contract
        const collateral = (_this_vault_paretoDollar1 = this.vault.paretoDollar) == null ? void 0 : (_this_vault_paretoDollar_collaterals = _this_vault_paretoDollar1.collaterals) == null ? void 0 : _this_vault_paretoDollar_collaterals.find((c)=>c.tokenAddress === address);
        if (collateral) {
            const { tokenAddress } = collateral;
            return {
                address: tokenAddress,
                abi: ERC20_ABI
            };
        }
        throw Error('Abi not found');
    }
    constructor(vault, token, options){
        super(vault, token, options);
    }
}

//# sourceMappingURL=vault-pareto-dollar.class.js.map