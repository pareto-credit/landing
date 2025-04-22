import { _ as _extends } from "@swc/helpers/_/_extends";
import moment from 'moment';
import { BNFixed, BNgt, BNgte, BNify, BNint, BNlt, compLower } from '../../core';
import { VaultContract } from './vault-contract.class';
import { ERC20_ABI } from '../vault.const';
export class VaultCDOEpoch extends VaultContract {
    /**
   * Parse Cdo epoch raw contract data
   * @param contractData Cdo Epoch contract raw data
   * @returns Parsed Cdo Epoch contract data
   */ parseContractData(contractData) {
        var _contractData_cdoEpoch_instantWithdraws, _contractData_cdoEpoch, _contractData_cdoEpoch1;
        if (contractData.cdoEpoch) {
            // Transform endDate and startDate in ISO string
            if (BNgt(contractData.cdoEpoch.endDate)) {
                contractData.cdoEpoch.startDate = moment(BNify(contractData.cdoEpoch.endDate).minus(BNify(contractData.cdoEpoch.duration)).times(1000).toNumber()).utc().toISOString();
                contractData.cdoEpoch.endDate = moment(BNify(contractData.cdoEpoch.endDate).times(1000).toNumber()).utc().toISOString();
            } else {
                delete contractData.cdoEpoch.endDate;
            }
            // Transform APRs
            const epochDuration = BNify(contractData.cdoEpoch.duration);
            const totalDuration = epochDuration.plus(BNify(contractData.cdoEpoch.bufferDuration));
            const apr = BNify(contractData.cdoEpoch.apr).times(epochDuration).div(totalDuration);
            contractData.cdoEpoch.apr = apr.div(1e18).toNumber();
            contractData.APRs = {
                BASE: BNFixed(apr)
            };
        }
        // Delete instant withdraws attribute if disabled
        if ((_contractData_cdoEpoch = contractData.cdoEpoch) == null ? void 0 : (_contractData_cdoEpoch_instantWithdraws = _contractData_cdoEpoch.instantWithdraws) == null ? void 0 : _contractData_cdoEpoch_instantWithdraws.disabled) {
            delete contractData.cdoEpoch.instantWithdraws;
        }
        if ((_contractData_cdoEpoch1 = contractData.cdoEpoch) == null ? void 0 : _contractData_cdoEpoch1.instantWithdraws) {
            // Convert deadline to ISO string
            if (BNgt(contractData.cdoEpoch.instantWithdraws.deadline)) {
                contractData.cdoEpoch.instantWithdraws.deadline = moment(BNify(contractData.cdoEpoch.instantWithdraws.deadline).times(1000).toNumber()).utc().toISOString();
            } else {
                delete contractData.cdoEpoch.instantWithdraws.deadline;
            }
            contractData.cdoEpoch.instantWithdraws.aprDelta = BNify(contractData.cdoEpoch.instantWithdraws.aprDelta).div(1e18).toNumber();
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
            const existingWallet = wallets.find((existing)=>compLower(existing.address, wallet.address));
            if (existingWallet) {
                return wallets.map((existing)=>compLower(existing.address, wallet.address) ? _extends({}, existing, {
                        cdoEpoch: _extends({}, existing.cdoEpoch, wallet.cdoEpoch)
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
        const callData = this.makeCallData();
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
        return _extends({}, vaultContractData, {
            cdoEpoch: _extends({}, vaultContractData.cdoEpoch, depositQueueContractData.cdoEpoch, withdrawQueueContractData.cdoEpoch),
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
        const { abi, address } = this.vault.cdoEpoch.depositQueue;
        const depositQueueContract = {
            abi,
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
        const { abi, address } = this.vault.cdoEpoch.withdrawQueue;
        const withdrawQueueContract = {
            abi,
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
   */ makeCallData() {
        // Parse vault contract methods
        const { abi, address, protocol } = this.vault;
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
                address: this.vault.cdoEpoch.address,
                protocol: this.vault.protocol
            }, 'CDO_EPOCH')
        ];
        if (this.vault.strategy) {
            const strategyContract = this.vault.strategy;
            callData = [
                ...callData,
                ...this.makeProtocolData(_extends({}, strategyContract, {
                    protocol: this.vault.protocol
                }), 'CDO_EPOCH_STRATEGY')
            ];
            if (this.walletAddresses) {
                callData = this.walletAddresses.reduce((acc, walletAddress)=>[
                        ...acc,
                        ...this.makeProtocolData(_extends({}, strategyContract, {
                            protocol: this.vault.protocol
                        }), 'WALLET_CDO_EPOCH_STRATEGY', undefined, {
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
        // Add rewards token call data
        callData = [
            ...callData,
            ...this.makeRewardTokensData(protocol)
        ];
        return callData;
    }
    /**
   * Get vault payable method
   * @param type the payment method type
   * @param options the payment method options
   * @returns the web3 payable method
   */ getPayableMethod(type, options) {
        try {
            switch(type){
                case 'START_EPOCH':
                    return this.startEpoch();
                case 'STOP_EPOCH':
                    return this.stopEpoch(options);
                case 'DEFAULT':
                    return this.defaultVault();
                case 'STOP_EPOCH_WITH_DURATION':
                    return this.stopEpoch(options, true);
                case 'APPROVE':
                    return this.approveToken(options);
                case 'APPROVE_LP':
                    return this.approveLPToken(options);
                case 'GET_INSTANT_WITHDRAWS':
                    return this.getInstantWithdrawFunds();
                case 'SET_EPOCH_PARAMS':
                    return this.setEpochParams(options);
                case 'SET_EPOCH_APR':
                    return this.setAPRs(options);
                case 'PROCESS_DEPOSIT_QUEUE':
                    return this.processDepositQueue();
                case 'PROCESS_WITHDRAW_QUEUE':
                    return this.processWithdrawQueue();
                case 'PROCESS_WITHDRAWAL_CLAIMS':
                    return this.processWithdrawalClaims(options);
                case 'DEPOSIT':
                    return this.deposit(options);
                case 'REQUEST_DEPOSIT':
                    return this.requestDeposit(options);
                case 'WITHDRAW':
                    return this.withdraw(options);
                case 'REQUEST_WITHDRAW':
                    return this.requestWithdraw(options);
                case 'CLAIM_WITHDRAW':
                    return this.claimWithdraw();
                case 'CLAIM_INSTANT_WITHDRAW':
                    return this.claimWithdraw(true);
                case 'CLAIM_DEPOSIT_REQUEST':
                    return this.claimDepositRequest(options);
                case 'CANCEL_DEPOSIT_REQUEST':
                    return this.cancelDepositRequest(options);
                case 'CLAIM_WITHDRAW_REQUEST':
                    return this.claimWithdrawRequest(options);
                case 'CANCEL_WITHDRAW_REQUEST':
                    return this.cancelWithdrawRequest(options);
                default:
                    throw new Error('Method not available for this kind of vault');
            }
        } catch (error) {
            console.error(`Contract get method error`, type, error);
            return;
        }
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
   * Process deposit queue
   * @returns the payable method for process the deposit queue
   */ processDepositQueue() {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if (!this.vault.cdoEpoch.depositQueue) {
            return;
        }
        const { abi, address } = this.vault.cdoEpoch.depositQueue;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'processDeposits'
        });
    }
    /**
   * Process withdraw queue
   * @returns the payable method for process the withdraw queue
   */ processWithdrawQueue() {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if (!this.vault.cdoEpoch.withdrawQueue) {
            return;
        }
        const { abi, address } = this.vault.cdoEpoch.withdrawQueue;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'processWithdrawRequests'
        });
    }
    /**
   * Process withdrawal claims
   * @param options the method options
   * @returns the payable method for process withdrawal claims
   */ processWithdrawalClaims(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if (!this.vault.cdoEpoch.withdrawQueue) {
            return;
        }
        if ((options == null ? void 0 : options.epochNumber) === undefined) {
            throw Error('Epoch number necessary to stop the epoch');
        }
        const { abi, address } = this.vault.cdoEpoch.withdrawQueue;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'processWithdrawalClaims',
            params: [
                options.epochNumber
            ]
        });
    }
    /**
   * Start vault epoch
   * @returns the payable method for start the epoch
   */ startEpoch() {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        const { abi, address } = this.vault.cdoEpoch;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'startEpoch'
        });
    }
    /**
   * Stop vault epoch
   * @param options the method params
   * @returns the payable method for stop the epoch
   */ stopEpoch(options, withDuration = false) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.epochAPR) === undefined && (options == null ? void 0 : options.epochInterests) === undefined) {
            throw Error('APR or Interests necessary to stop the epoch');
        }
        const { epochAPR, epochInterests, epochDuration, overwriteInterests } = options;
        if (this.vault.cdoEpoch.mode === 'CREDIT' && (BNlt(epochAPR, this.minTokenAmount) || BNgte(epochAPR, this.maxTokenAmount))) {
            return;
        } else if (this.vault.cdoEpoch.mode === 'STRATEGY' && (BNlt(epochInterests, this.minTokenAmount) || BNgte(epochInterests, this.maxTokenAmount))) {
            return;
        }
        // Check duration
        if (withDuration && (epochDuration === undefined || epochDuration <= 0)) {
            return;
        }
        const { abi, address } = this.vault.cdoEpoch;
        // Params calculation
        let apr = '0';
        let interests = '0';
        if (this.vault.cdoEpoch.mode === 'CREDIT' && !overwriteInterests) {
            apr = BNint(BNify(epochAPR).times(1e18));
        } else {
            interests = epochInterests || '0';
        }
        const params = withDuration ? [
            apr,
            interests,
            epochDuration
        ] : [
            apr,
            interests
        ];
        return this.getContractPayableMethod({
            abi,
            address,
            method: withDuration ? 'stopEpochWithDuration' : 'stopEpoch',
            params
        });
    }
    /**
   * Deposit amount
   * @param options the method params
   * @returns the payable method for deposit
   */ deposit(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        const { amount } = options || {};
        const { abi, address } = this.vault.cdoEpoch;
        // Check deposit amount
        const amountCheck = this.checkContractAmount(amount);
        if (!amountCheck) {
            return;
        }
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'depositAA',
            params: [
                amount
            ]
        });
    }
    /**
   * Request deposit
   * @param options the method params
   * @returns the payable method for request deposit
   */ requestDeposit(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if (!this.vault.cdoEpoch.depositQueue) {
            return;
        }
        const { amount } = options || {};
        const { abi, address } = this.vault.cdoEpoch.depositQueue;
        // Check deposit amount
        const amountCheck = this.checkContractAmount(amount);
        if (!amountCheck) {
            return;
        }
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'requestDeposit',
            params: [
                amount
            ]
        });
    }
    /**
   * Withdraw amount
   * @param options - the method params
   * @return the payable method for withdraw
   */ withdraw(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        const { amount } = options || {};
        const { abi, address } = this.vault.cdoEpoch;
        // Check withdraw amount
        const amountCheck = this.checkContractAmount(amount);
        if (!amountCheck) {
            return;
        }
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'requestWithdraw',
            params: [
                amount,
                this.vault.address
            ]
        });
    }
    /**
   * Withdraw amount
   * @param options - the method params
   * @return the payable method for withdraw
   */ requestWithdraw(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if (!this.vault.cdoEpoch.withdrawQueue) {
            return;
        }
        const { amount } = options || {};
        const { abi, address } = this.vault.cdoEpoch.withdrawQueue;
        // Check deposit amount
        const amountCheck = this.checkContractAmount(amount);
        if (!amountCheck) {
            return;
        }
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'requestWithdraw',
            params: [
                amount
            ]
        });
    }
    /**
   * Claim withdraw
   * @return the payable method for withdraw
   */ claimWithdraw(isInstant) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        const { abi, address } = this.vault.cdoEpoch;
        return this.getContractPayableMethod({
            abi,
            address,
            method: isInstant ? 'claimInstantWithdrawRequest' : 'claimWithdrawRequest'
        });
    }
    /**
   * Claim deposit request
   * @param options - the request options
   * @returns
   */ claimDepositRequest(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if (!this.vault.cdoEpoch.depositQueue || !(options == null ? void 0 : options.epochNumber)) {
            return;
        }
        const { abi, address } = this.vault.cdoEpoch.depositQueue;
        const { epochNumber } = options;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'claimDepositRequest',
            params: [
                epochNumber
            ]
        });
    }
    /**
   * Cancel deposit request
   * @param options - the request options
   * @returns
   */ cancelDepositRequest(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if (!this.vault.cdoEpoch.depositQueue || !(options == null ? void 0 : options.epochNumber)) {
            return;
        }
        const { abi, address } = this.vault.cdoEpoch.depositQueue;
        const { epochNumber } = options;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'deleteRequest',
            params: [
                epochNumber
            ]
        });
    }
    /**
   * Claim withdraw request
   * @param options - the request options
   * @returns
   */ claimWithdrawRequest(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if (!this.vault.cdoEpoch.withdrawQueue || !(options == null ? void 0 : options.epochNumber)) {
            return;
        }
        const { abi, address } = this.vault.cdoEpoch.withdrawQueue;
        const { epochNumber } = options;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'claimWithdrawRequest',
            params: [
                epochNumber
            ]
        });
    }
    /**
   * Cancel withdraw request
   * @param options - the request options
   * @returns
   */ cancelWithdrawRequest(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if (!this.vault.cdoEpoch.withdrawQueue || !(options == null ? void 0 : options.epochNumber)) {
            return;
        }
        const { abi, address } = this.vault.cdoEpoch.withdrawQueue;
        const { epochNumber } = options;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'deleteWithdrawRequest',
            params: [
                epochNumber
            ]
        });
    }
    /**
   * Close the current vault
   * @returns the payable method for close the vault
   */ defaultVault() {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        const { abi, address } = this.vault.cdoEpoch;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'stopEpoch',
            params: [
                0,
                1
            ]
        });
    }
    /**
   * Set epoch params
   * @param options - the method params
   * @returns the payable method for set the epoch params
   */ setEpochParams(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.epochDuration) === undefined || (options == null ? void 0 : options.bufferDuration) === undefined) {
            throw Error('Epoch duration and buffer duration are mandatory');
        }
        const { epochDuration, bufferDuration } = options;
        const { abi, address } = this.vault.cdoEpoch;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'setEpochParams',
            params: [
                epochDuration,
                bufferDuration
            ]
        });
    }
    /**
   * Set epoch APR
   * @param options - the method params
   * @returns the payable method for set the epoch apr
   */ setAPRs(options) {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.strategy) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.epochAPR) === undefined || options.epochAPRScaled === undefined) {
            throw Error('Epoch APRs is mandatory');
        }
        const { epochAPR, epochAPRScaled } = options;
        const { abi, address } = this.vault.strategy;
        if (BNlt(epochAPR) || BNlt(epochAPRScaled)) {
            return;
        }
        const apr = BNint(BNify(epochAPR).times(1e18));
        const aprScaled = BNint(BNify(epochAPRScaled).times(1e18));
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'setAprs',
            params: [
                apr,
                aprScaled
            ]
        });
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
            abi: ERC20_ABI,
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
        return method.call().then((allowance)=>BNFixed(allowance));
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
        const { abi, address } = this.vault.cdoEpoch;
        const { address: trancheTokenAddr } = this.vault || {};
        const method = this.getContractNonPayableMethod({
            abi,
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
        return method.call().then((withdrawable)=>BNFixed(withdrawable));
    }
    /**
   * Get instant withdraw funds
   * @returns the payable method for get the instant withdraws funds
   */ getInstantWithdrawFunds() {
        if (this.vault.contractType !== 'CDO_EPOCH' || !this.vault.cdoEpoch) {
            throw Error('Wrong vault type');
        }
        const { abi, address } = this.vault.cdoEpoch;
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'getInstantWithdrawFunds'
        });
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
            const { abi, address } = this.vault.cdoEpoch;
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
    constructor(vault, token, options){
        super(vault, token, options);
        if (!vault.cdoEpoch) {
            throw new Error('Vault without CDO Epoch data');
        }
    }
}

//# sourceMappingURL=vault-cdo-epoch.class.js.map