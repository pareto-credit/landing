import { _ as _extends } from "@swc/helpers/_/_extends";
import { isEmpty } from 'lodash';
import { WEB3_CONTRACT_METHODS } from '../../web3-client';
import { BNFixed, BNgt, BNgte, BNify, BNlt, BNlte } from '../../core';
import { compLower } from '../../core/utility.lib';
import { ERC20_ABI } from '../vault.const';
export class VaultContract {
    /**
   * Get parsed contract data
   * @param callData call data to execute
   * @param blockNumber block number
   * @param prefillContractData prefill contract data object
   * @param prefillPreviousContractData prefill previous contract data object
   * @returns parsed blockchain contract data
   */ async getData(callData, blockNumber = 'latest', prefill) {
        if (!this.web3Client) {
            throw new Error('Web3 Client not available');
        }
        // Prepare block calls
        const currentMethods = callData.filter((c)=>c.block === 'current');
        const previousMethods = callData.filter((c)=>c.block === 'previous');
        const promises = [
            this.web3Client.call(currentMethods, blockNumber)
        ];
        if (previousMethods.length) {
            const bNumber = blockNumber === 'latest' ? (await this.web3Client.getBlock()).number : blockNumber;
            const previousBlock = BNify(bNumber).minus(1).toString();
            promises.push(this.web3Client.call(previousMethods, previousBlock));
        }
        const contractData = await Promise.all(promises).then(([current, previous])=>{
            const contractData = this.parseCallResponses(current, prefill == null ? void 0 : prefill.current);
            // Process previous block data if set
            if (!isEmpty(previous)) {
                contractData.previous = this.parseCallResponses(previous, prefill == null ? void 0 : prefill.previous);
            }
            return contractData;
        });
        return contractData;
    }
    /**
   * Prepare Web3 Protocol Contract data
   * @param protocolContract - the web3 protocol contract
   * @param type protocol type
   * @param tokenSymbol token symbol
   * @param values custom parameters
   * @param token token override
   * @returns the web3 call data
   */ makeProtocolData({ abi, address, protocol }, type, token, values, parent) {
        const { contract, methods } = this.getContractMethods(abi, address, protocol, type, token);
        return methods.map((m)=>this.makeMethodData(contract, m, parent, values, token));
    }
    /**
   * Check if the pool block is >= block number
   * @param pool pool data
   * @param blockNumber web3 call block number
   * @returns
   */ checkPoolBlock(pool, blockNumber) {
        if (!pool.fromBlock || BNify(blockNumber).isNaN()) {
            return true;
        }
        return BNlt(pool.fromBlock, blockNumber);
    }
    /**
   * Check is the amount is formatted correctly for the contract
   * @param amount normalized amount
   * @returns true | false
   */ checkContractAmount(amount) {
        return !BNify(amount).isNaN() && BNgte(amount, this.minTokenAmount) && BNlte(amount, this.maxTokenAmount);
    }
    /**
   * Prepare reward tokens data
   * @param protocol protocol data
   * @returns web3 call data
   */ makeRewardTokensData(protocol) {
        var _this_rewardTokens;
        if (!((_this_rewardTokens = this.rewardTokens) == null ? void 0 : _this_rewardTokens.length)) {
            return [];
        }
        // Parse reward programs tokens
        return this.rewardTokens.reduce((acc, rewardToken)=>{
            // Parse token methods
            if (!rewardToken.oracle) {
                return acc;
            }
            // Pass token address as parameter
            return [
                ...acc,
                ...this.makeProtocolData(rewardToken.oracle, 'ORACLE', rewardToken, {
                    [`tokenAddress[${rewardToken.symbol}]`]: rewardToken.address
                }, {
                    protocol,
                    type: 'TOKEN',
                    address: rewardToken.address
                })
            ];
        }, []);
    }
    /**
   * Prepare wallet data
   * @param address - the wallet address
   * @returns the web3 call data
   */ makeWalletData(walletAddress, { abi, address, protocol }) {
        const { contract, methods } = this.getContractMethods(abi, address, protocol, 'WALLET');
        return methods.map((m)=>this.makeMethodData(contract, m, undefined, {
                walletAddress
            }));
    }
    /**
   * Prepare pool data
   * @param pool - the vault pool
   * @returns the web3 call data
   */ makePoolData(pool, blockNumber) {
        // Skip pool is fromBlock < blockNumber
        if (!this.checkPoolBlock(pool, blockNumber)) {
            return [];
        }
        let callData = this.makeProtocolData(pool, 'POOL');
        // Check oracle
        if (pool.oracle) {
            const oracle = this.getContractMethods(pool.oracle.abi, pool.oracle.address, pool.oracle.protocol || pool.protocol, 'ORACLE');
            const { protocol, address } = pool;
            callData = [
                ...callData,
                ...oracle.methods.map((m)=>this.makeMethodData(oracle.contract, m, {
                        protocol,
                        address,
                        type: 'POOL'
                    }))
            ];
        }
        return callData;
    }
    /**
   * Get contract and relative methods
   * @returns the contract initialize and the relative methods
   */ getContractMethods(abi, address, protocol, type, token) {
        if (!this.web3Client) {
            throw new Error('Web3 Client not available');
        }
        return {
            contract: this.web3Client.initContract(abi, address),
            methods: WEB3_CONTRACT_METHODS.filter((m)=>m.protocol === protocol && m.type === type && m.tokenSymbol === (token == null ? void 0 : token.symbol))
        };
    }
    /**
   * Make web3 call data for a specific contract method
   * @param contract contract
   * @param contractMethod contract method to call
   * @param parent parent web3 entity in case of nested calls
   * @param paramsValues custom params data
   * @returns web3 call data
   */ makeMethodData(contract, contractMethod, parent, values, token) {
        const { jsonInterface } = contract.options;
        const { protocol, type, method, block, params = [] } = contractMethod;
        const address = contract.options.address;
        if (!address) {
            throw new Error('Contract without a valid address');
        }
        // Get ABI method to prepare the right types
        const methodAbi = jsonInterface.find((f)=>f.name === method && f.inputs.length === params.length);
        if (!methodAbi) {
            throw new Error(`No ABI method '${method}' found for ${protocol} at contract ${contract.options.address} for vault: ${this.vault.address}`);
        }
        // Method name + params
        const inputTypes = methodAbi.inputs.map((i)=>i.type);
        const methodName = `${methodAbi.name}(${inputTypes.join(',')})`;
        // Input & Outputs
        const inputs = methodAbi.inputs.map((input, i)=>this.makeMethodParamData(input, params[i], values, token));
        const outputs = methodAbi.outputs.map((output)=>({
                type: output.type,
                name: output.name,
                components: output.components
            }));
        return {
            protocol,
            type,
            address,
            method: methodName,
            params,
            block,
            parent,
            inputs,
            outputs
        };
    }
    /**
   * Parse vault json param
   * @param vault - the vault
   * @param input - the ABI Json Param
   * @returns the vault data param
   */ makeMethodParamData(input, param, values, token) {
        const type = input.type;
        return {
            type,
            value: param ? this.parseMethodParam(param, values, token) : undefined
        };
    }
    /**
   * Parse method param
   * @param param - the method param
   * @returns the value of the param
   */ parseMethodParam(param, values, token) {
        let value;
        const tokenToUse = token || this.token;
        switch(param){
            case 'vaultAddress':
                value = this.vault.address;
                break;
            // Token params
            case 'tokenAddress':
                value = tokenToUse.address;
                break;
            // Get param from static values
            case 'walletAddress':
            case 'epochNumber':
            case 'prevEpochNumber':
                value = values == null ? void 0 : values[param];
                break;
            case 'tokenAmount':
                value = 10 ** tokenToUse.decimals;
                break;
            case 'tokenAddress[OP]':
                var _tokenToUse_oracle;
                if (tokenToUse.symbol === 'OP') {
                    value = tokenToUse.address;
                } else if ((_tokenToUse_oracle = tokenToUse.oracle) == null ? void 0 : _tokenToUse_oracle.OPAddress) {
                    value = tokenToUse.oracle.OPAddress;
                } else {
                    value = values == null ? void 0 : values[param];
                }
                break;
            case 'tokenAddress[ARB]':
                var _tokenToUse_oracle1;
                if (tokenToUse.symbol === 'ARB') {
                    value = tokenToUse.address;
                } else if ((_tokenToUse_oracle1 = tokenToUse.oracle) == null ? void 0 : _tokenToUse_oracle1.ARBAddress) {
                    value = tokenToUse.oracle.ARBAddress;
                } else {
                    value = values == null ? void 0 : values[param];
                }
                break;
            case 'tokenAddress[stETH]':
                var _tokenToUse_oracle2;
                value = tokenToUse.symbol === 'stETH' ? tokenToUse.address : (_tokenToUse_oracle2 = tokenToUse.oracle) == null ? void 0 : _tokenToUse_oracle2.stETHAddress;
                break;
            case 'tokenAddress[USDC]':
                var _tokenToUse_oracle3;
                value = tokenToUse.symbol === 'USDC' ? tokenToUse.address : (_tokenToUse_oracle3 = tokenToUse.oracle) == null ? void 0 : _tokenToUse_oracle3.USDCAddress;
                break;
            case 'tokenAddress[USDe]':
                var _tokenToUse_oracle4;
                if (tokenToUse.symbol === 'USDe') {
                    value = tokenToUse.address;
                } else if ((_tokenToUse_oracle4 = tokenToUse.oracle) == null ? void 0 : _tokenToUse_oracle4.USDEAddress) {
                    value = tokenToUse.oracle.USDEAddress;
                } else {
                    value = values == null ? void 0 : values[param];
                }
                break;
            case 'tokenAddress[WETH]':
                var _tokenToUse_oracle5;
                value = tokenToUse.symbol === 'WETH' ? tokenToUse.address : (_tokenToUse_oracle5 = tokenToUse.oracle) == null ? void 0 : _tokenToUse_oracle5.wETHAddress;
                break;
            case 'tokenAddress[MATIC]':
                var _tokenToUse_oracle6;
                value = tokenToUse.symbol === 'MATIC' ? tokenToUse.address : (_tokenToUse_oracle6 = tokenToUse.oracle) == null ? void 0 : _tokenToUse_oracle6.MATICAddress;
                break;
            case 'tokenAddresses[USDC|MATIC]':
                value = [
                    this.parseMethodParam('tokenAddress[USDC]'),
                    this.parseMethodParam('tokenAddress[MATIC]')
                ];
                break;
            case 'tokenAddresses[USDC|WETH]':
                value = [
                    this.parseMethodParam('tokenAddress[USDC]'),
                    this.parseMethodParam('tokenAddress[WETH]')
                ];
                break;
            case 'tokenAddresses[USDC|OP]':
                value = [
                    this.parseMethodParam('tokenAddress[USDC]'),
                    this.parseMethodParam('tokenAddress[OP]')
                ];
                break;
            case 'tokenAddresses[USDC|WETH|stETH]':
                value = [
                    this.parseMethodParam('tokenAddress[USDC]'),
                    this.parseMethodParam('tokenAddress[WETH]'),
                    this.parseMethodParam('tokenAddress[stETH]')
                ];
                break;
            case 'tokenFee':
                var _tokenToUse_oracle7;
                value = (_tokenToUse_oracle7 = tokenToUse.oracle) == null ? void 0 : _tokenToUse_oracle7.fee;
                break;
            // Only for USDe
            case 'tokenPriceLimit':
                value = 0;
                break;
        }
        return value;
    }
    /**
   * Parse Web3CallData into contract data
   * @param response - the response from web3call data
   * @returns the vault contract data
   */ parseCallResponses(responses, contractData) {
        return responses.reduce((acc, res)=>this.parseCallResponse(acc, res), contractData || {});
    }
    /**
   * Parse vault call method
   * @param method - the method
   * @param outputs - the response outputs
   * @returns the partial vault contract data
   */ parseCallResponse(data, response) {
        // Exit if no data received
        if ([
            undefined,
            null
        ].includes(response.outputs[0].value)) {
            return data;
        }
        const { type } = response;
        let methodData = {};
        switch(type){
            case 'BestYield':
                methodData = this.parseBestYieldResponse(data, response);
                break;
            case 'CDO':
            case 'TRANCHE':
                methodData = this.parseCdoResponse(data, response);
                break;
            case 'CDO_EPOCH':
                methodData = this.parseCdoEpochResponse(data, response);
                break;
            case 'WALLET':
                methodData = this.parseWalletResponse(data, response);
                break;
            case 'WALLET_DEPOSIT_QUEUE':
                methodData = this.parseWalletDepositQueueResponse(data, response);
                break;
            case 'WALLET_WITHDRAW_QUEUE':
                methodData = this.parseWalletWithdrawQueueResponse(data, response);
                break;
            case 'POOL':
                methodData = this.parsePoolResponse(data, response);
                break;
            case 'TOKEN':
                methodData = this.parseTokenResponse(data, response);
                break;
            case 'CDO_EPOCH_STRATEGY':
                methodData = this.parseCdoEpochStrategyResponse(data, response);
                break;
            case 'WALLET_CDO_EPOCH_STRATEGY':
                methodData = this.parseWalletCdoEpochStrategyResponse(data, response);
                break;
            case 'CDO_EPOCH_DEPOSIT_QUEUE':
                methodData = this.parseCdoEpochDepositQueueResponse(data, response);
                break;
            case 'CDO_EPOCH_WITHDRAW_QUEUE':
                methodData = this.parseCdoEpochWithdrawQueueResponse(data, response);
                break;
            case 'STRATEGY':
                methodData = this.parseStrategyResponse(data, response);
                break;
            case 'ORACLE':
                // Use parent type parsing if specified
                if (response.parent && response.parent.type !== 'ORACLE') {
                    methodData = this.parseCallResponse(data, _extends({}, response, response.parent));
                } else {
                    // Use oracle parsing
                    methodData = this.parseOracleResponse(data, _extends({}, response, response.parent));
                }
                break;
            default:
                break;
        }
        return methodData;
    }
    /**
   * Parse BestYield response
   * @param data - the already processed data
   * @param response - the BestYield response
   * @returns the contract data
   */ parseBestYieldResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'getAvgAPR':
                methodData.APRs = {
                    BASE: outputs[0].value
                };
                break;
            case 'totalSupply':
                methodData.totalSupply = outputs[0].value;
                break;
            case 'tokenPrice':
                methodData.price = outputs[0].value;
                break;
            case 'getAllocations':
                methodData.allocations = outputs[0].value;
                break;
            case 'getAllAvailableTokens':
                methodData.availableTokens = outputs[0].value;
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse Cdo response
   * @param data - the already processed data
   * @param response - the BestYield response
   * @returns the contract data
   */ parseCdoResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'getApr':
                methodData.APRs = {
                    BASE: outputs[0].value
                };
                break;
            case 'totalSupply':
                methodData.totalSupply = outputs[0].value;
                break;
            case 'trancheAPRSplitRatio':
                methodData.cdo = _extends({}, data.cdo || {}, {
                    APRSplitRatio: outputs[0].value
                });
                break;
            case 'virtualPrice':
                methodData.price = outputs[0].value;
                break;
            case 'getCurrentAARatio':
                methodData.cdo = _extends({}, data.cdo || {}, {
                    currentAARatio: outputs[0].value
                });
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse CDO Epoch response
   * @param data - the already processed data
   * @param response - the CDO Epoch response
   * @returns the contract data
   */ parseCdoEpochResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'lastEpochApr':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    lastApr: outputs[0].value
                });
                break;
            case 'totalSupply':
                methodData.totalSupply = outputs[0].value;
                break;
            case 'lastEpochInterest':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    lastInterest: outputs[0].value
                });
                break;
            case 'epochEndDate':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    endDate: outputs[0].value
                });
                break;
            case 'epochDuration':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    duration: outputs[0].value
                });
                break;
            case 'getContractValue':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    contractValue: outputs[0].value
                });
                break;
            case 'bufferPeriod':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    bufferDuration: outputs[0].value
                });
                break;
            case 'expectedEpochInterest':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    expectedInterest: outputs[0].value
                });
                break;
            case 'unclaimedFees':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    unclaimedFees: outputs[0].value
                });
                break;
            case 'disableInstantWithdraw':
                var _data_cdoEpoch;
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends({}, ((_data_cdoEpoch = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch.instantWithdraws) || {}, {
                        disabled: outputs[0].value
                    })
                });
                break;
            case 'instantWithdrawAprDelta':
                var _data_cdoEpoch1;
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends({}, ((_data_cdoEpoch1 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch1.instantWithdraws) || {}, {
                        aprDelta: outputs[0].value
                    })
                });
                break;
            case 'instantWithdrawDelay':
                var _data_cdoEpoch2;
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends({}, ((_data_cdoEpoch2 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch2.instantWithdraws) || {}, {
                        delay: outputs[0].value
                    })
                });
                break;
            case 'allowInstantWithdraw':
                var _data_cdoEpoch3;
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends({}, ((_data_cdoEpoch3 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch3.instantWithdraws) || {}, {
                        allowed: outputs[0].value
                    })
                });
                break;
            case 'instantWithdrawDeadline':
                var _data_cdoEpoch4;
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends({}, ((_data_cdoEpoch4 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch4.instantWithdraws) || {}, {
                        deadline: outputs[0].value
                    })
                });
                break;
            case 'pendingWithdrawFees':
                var _data_cdoEpoch5;
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    withdraws: _extends({}, ((_data_cdoEpoch5 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch5.withdraws) || {}, {
                        fees: outputs[0].value
                    })
                });
                break;
            case 'isEpochRunning':
                var _methodData_cdoEpoch;
                if (outputs[0].value) {
                    methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                        status: 'RUNNING'
                    });
                } else if (((_methodData_cdoEpoch = methodData.cdoEpoch) == null ? void 0 : _methodData_cdoEpoch.status) !== 'DEFAULTED') {
                    methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                        status: 'WAITING'
                    });
                }
                break;
            case 'defaulted':
                if (outputs[0].value) {
                    methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                        status: 'DEFAULTED'
                    });
                }
                break;
            case 'virtualPrice':
                methodData.price = outputs[0].value;
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse wallet deposit queue response
   * @param data - the already processed data
   * @param response - the wallet deposit queue response
   * @returns the contract data
   */ parseWalletDepositQueueResponse(data, { method, inputs, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'userDepositsEpochs':
                {
                    const address = inputs[0].value;
                    const pendingDepositAmount = outputs[0].value;
                    // Update to existing wallet
                    methodData.wallets = (data.wallets || []).map((wallet)=>compLower(wallet.address, address) ? _extends({}, wallet, {
                            cdoEpoch: _extends({}, wallet.cdoEpoch || {}, {
                                pendingDepositAmount
                            })
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>compLower(wallet.address, address))) {
                        methodData.wallets.push({
                            balance: '0',
                            address,
                            cdoEpoch: {
                                pendingDepositAmount
                            }
                        });
                    }
                }
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse wallet deposit queue response
   * @param data - the already processed data
   * @param response - the wallet deposit queue response
   * @returns the contract data
   */ parseWalletWithdrawQueueResponse(data, { method, inputs, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'userWithdrawalsEpochs':
                {
                    const address = inputs[0].value;
                    const pendingWithdrawAmount = outputs[0].value;
                    // Update to existing wallet
                    methodData.wallets = (data.wallets || []).map((wallet)=>compLower(wallet.address, address) ? _extends({}, wallet, {
                            cdoEpoch: _extends({}, wallet.cdoEpoch || {}, {
                                pendingWithdrawAmount
                            })
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>compLower(wallet.address, address))) {
                        methodData.wallets.push({
                            balance: '0',
                            address,
                            cdoEpoch: {
                                pendingWithdrawAmount
                            }
                        });
                    }
                }
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse wallet deposit queue response
   * @param data - the already processed data
   * @param response - the wallet deposit queue response
   * @returns the contract data
   */ parseWalletCdoEpochStrategyResponse(data, { method, inputs, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'withdrawsRequests':
            case 'instantWithdrawsRequests':
                {
                    const address = inputs[0].value;
                    const amount = outputs[0].value;
                    // Update to existing wallet
                    methodData.wallets = (data.wallets || []).map((wallet)=>compLower(wallet.address, address) ? _extends({}, wallet, {
                            cdoEpoch: _extends({}, wallet.cdoEpoch || {}, {
                                [methodName]: amount
                            })
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>compLower(wallet.address, address))) {
                        methodData.wallets.push({
                            balance: '0',
                            address,
                            cdoEpoch: {
                                [methodName]: amount
                            }
                        });
                    }
                }
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse wallet response
   * @param data - the already processed data
   * @param response - the wallet response
   * @returns the contract data
   */ parseWalletResponse(data, { method, inputs, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'balanceOf':
                {
                    const address = inputs[0].value;
                    const balance = outputs[0].value;
                    // Update to existing wallet
                    methodData.wallets = (data.wallets || []).map((wallet)=>compLower(wallet.address, address) ? _extends({}, wallet, {
                            balance
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>compLower(wallet.address, address))) {
                        methodData.wallets.push({
                            address,
                            balance
                        });
                    }
                }
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse Cdo Epoch Strategy response
   * @param data - the already processed data
   * @param response - the BestYield response
   * @returns the contract data
   */ parseCdoEpochStrategyResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'getApr':
                methodData.APRs = {
                    BASE: outputs[0].value
                };
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    apr: outputs[0].value
                });
                break;
            case 'epochNumber':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    epochNumber: outputs[0].value
                });
                break;
            case 'pendingInstantWithdraws':
                var _data_cdoEpoch;
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends({}, ((_data_cdoEpoch = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch.instantWithdraws) || {}, {
                        amount: outputs[0].value
                    })
                });
                break;
            case 'pendingWithdraws':
                var _data_cdoEpoch1;
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    withdraws: _extends({}, ((_data_cdoEpoch1 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch1.withdraws) || {}, {
                        amount: outputs[0].value
                    })
                });
                break;
            case 'totEpochDeposits':
                methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                    deposits: outputs[0].value
                });
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse Cdo Epoch deposit queue response
   * @param data - the already processed data
   * @param response - the BestYield response
   * @returns the contract data
   */ parseCdoEpochDepositQueueResponse(data, { method, params, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'epochPendingDeposits':
                {
                    var _data_cdoEpoch;
                    const amountField = (params == null ? void 0 : params.includes('prevEpochNumber')) ? 'lastAmount' : 'amount';
                    methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                        depositQueue: _extends({}, ((_data_cdoEpoch = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch.depositQueue) || {}, {
                            [amountField]: outputs[0].value
                        })
                    });
                }
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse Cdo Epoch deposit queue response
   * @param data - the already processed data
   * @param response - the BestYield response
   * @returns the contract data
   */ parseCdoEpochWithdrawQueueResponse(data, { method, params, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'isEpochInstant':
                {
                    var _data_cdoEpoch;
                    methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                        withdrawQueue: _extends({}, ((_data_cdoEpoch = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch.withdrawQueue) || {}, {
                            isInstant: outputs[0].value
                        })
                    });
                }
                break;
            case 'epochPendingWithdrawals':
                {
                    var _data_cdoEpoch1;
                    const amountField = (params == null ? void 0 : params.includes('prevEpochNumber')) ? 'lastAmount' : 'amount';
                    methodData.cdoEpoch = _extends({}, data.cdoEpoch || {}, {
                        withdrawQueue: _extends({}, ((_data_cdoEpoch1 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch1.withdrawQueue) || {}, {
                            [amountField]: outputs[0].value
                        })
                    });
                }
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse Strategy response
   * @param data - the already processed data
   * @param response - the Strategy response
   * @returns the contract data
   */ parseStrategyResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'getApr':
                methodData.strategy = _extends({}, data.strategy || {}, {
                    APR: outputs[0].value
                });
                break;
            case 'getRewardTokens':
                methodData.strategy = _extends({}, data.strategy || {}, {
                    rewardTokens: outputs[0].value
                });
                break;
        }
        return _extends({}, data, methodData);
    }
    /**
   * Parse data from Oracle response
   * @param data vault contract data
   * @param response Oracle call response
   * @returns Vault contract data with oracle parsed data
   */ parseOracleResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const oracleData = {};
        switch(methodName){
            case 'getAmountsIn':
                oracleData.tokens = [
                    ...data.tokens || [],
                    {
                        address: this.token.address,
                        price: outputs[0].value[0]
                    }
                ];
                break;
            case 'quoteExactInputSingle':
                oracleData.tokens = [
                    ...data.tokens || [],
                    {
                        address: this.token.address,
                        price: outputs[0].value
                    }
                ];
                break;
        }
        return _extends({}, data, oracleData);
    }
    /**
   * Parse data from TOKEN response
   * @param data vault contract data
   * @param web3CallData web3 call data
   * @returns parse TOKEN response
   */ parseTokenResponse(data, { method, outputs, address }) {
        const methodName = method.split('(')[0];
        const tokensData = {};
        switch(methodName){
            case 'getAmountsIn':
                tokensData.tokens = [
                    ...data.tokens || [],
                    {
                        address,
                        price: outputs[0].value[0]
                    }
                ];
                break;
            case 'quoteExactInputSingle':
                tokensData.tokens = [
                    ...data.tokens || [],
                    {
                        address,
                        price: outputs[0].value
                    }
                ];
                break;
        }
        return _extends({}, data, tokensData);
    }
    /**
   * Parse data from POOL response
   * @param data vault contract data
   * @param response Pool call response
   * @returns Vault contract data with pool parsed data
   */ parsePoolResponse(data, { method, outputs, protocol, address }) {
        if (!this.web3Client) {
            throw new Error('Web3 Client not available');
        }
        const methodName = method.split('(')[0];
        const poolData = {
            protocol,
            address
        };
        switch(methodName){
            case 'totalSupply':
                poolData.totalSupply = outputs[0].value;
                break;
            case 'totalBorrows':
                poolData.totalBorrow = outputs[0].value;
                break;
            case 'exchangeRateStored':
                poolData.exchangeRate = outputs[0].value;
                break;
            case 'supplyRatePerBlock':
                poolData.supplyRate = (BigInt(outputs[0].value) * BigInt(this.web3Client.blocksPerYear)).toString();
                break;
            case 'borrowRatePerBlock':
                poolData.borrowRate = (BigInt(outputs[0].value) * BigInt(this.web3Client.blocksPerYear)).toString();
                break;
            case 'availableToBorrow':
                poolData.availableToBorrow = outputs[0].value;
                break;
            case 'availableToWithdraw':
                poolData.availableToWithdraw = outputs[0].value;
                break;
            case 'getSupplyRate':
                poolData.supplyRate = outputs[0].value;
                break;
            case 'getBorrowRate':
                poolData.borrowRate = outputs[0].value;
                break;
            case 'getUtilizationRate':
                poolData.utilizationRate = outputs[0].value;
                break;
            case 'getReserveData':
                {
                    const reserveData = outputs[0].value;
                    poolData.totalSupply = reserveData.liquidityIndex;
                    poolData.supplyRate = reserveData.currentLiquidityRate;
                    poolData.borrowRate = reserveData.currentVariableBorrowRate;
                    poolData.totalBorrow = reserveData.variableBorrowIndex;
                }
                break;
        }
        return _extends({}, data, {
            pools: this.implementPoolsData(data.pools, poolData)
        });
    }
    /**
   * Implement pools data with new pool data
   * @param pools pools data
   * @param poolData new pool data
   * @returns combined pools data and new pool data
   */ implementPoolsData(pools = [], poolData) {
        const poolCheck = pools.find((pool)=>pool.protocol === poolData.protocol && compLower(pool.address, poolData.address));
        if (!poolCheck) {
            return [
                ...pools,
                poolData
            ];
        }
        return pools.map((pool)=>pool.protocol === poolData.protocol && compLower(pool.address, poolData.address) ? _extends({}, pool, poolData) : pool);
    }
    /**
   * Get web3 payable method object ready to be sent
   * @param web3 web3 injected instance
   * @param payableMethodOptions payable method meta-data
   * @returns payable method object
   */ getContractPayableMethod(payableMethodOptions) {
        if (!this.web3) {
            return;
        }
        const { abi, address, method, params = [] } = payableMethodOptions;
        const contract = new this.web3.eth.Contract(abi, address);
        if (!contract.methods || !contract.methods[method]) {
            return;
        }
        return contract.methods[method](...params);
    }
    /**
   * Get web3 non-payable method object
   * @param web3 web3 injected instance
   * @param valueMethodOptions value method meta-data
   * @returns payable method object
   */ getContractNonPayableMethod(valueMethodOptions) {
        if (!this.web3Client) {
            return;
        }
        const { abi, address, method, params = [] } = valueMethodOptions;
        const web3 = this.web3Client.web3;
        const contract = new web3.eth.Contract(abi, address);
        if (!contract.methods || !contract.methods[method]) {
            return;
        }
        return contract.methods[method](...params);
    }
    /**
   * Increment token allowance
   * @param options the method options
   * @returns the payable method for increment allowance
   */ approveToken(options) {
        if (!(options == null ? void 0 : options.spender) || (options == null ? void 0 : options.amount) === undefined) {
            return;
        }
        const { spender, amount } = options;
        if (BNlt(amount, this.minTokenAmount) || BNgt(amount, this.maxTokenAmount)) {
            return;
        }
        return this.getContractPayableMethod({
            abi: ERC20_ABI,
            address: this.token.address,
            method: 'approve',
            params: [
                spender,
                amount
            ]
        });
    }
    /**
   * Increment token allowance
   * @param options the method options
   * @returns the payable method for increment allowance
   */ approveLPToken(options) {
        if (!(options == null ? void 0 : options.spender) || (options == null ? void 0 : options.amount) === undefined) {
            return;
        }
        const { spender, amount } = options;
        if (BNlt(amount, this.minTokenAmount) || BNgt(amount, this.maxTokenAmount)) {
            return;
        }
        const { address } = this.vault;
        return this.getContractPayableMethod({
            abi: ERC20_ABI,
            address,
            method: 'approve',
            params: [
                spender,
                amount
            ]
        });
    }
    /**
   * Get wallet deposit amount
   * @param options - the method options
   * @returns the deposit amount
   */ getWalletBalance(options) {
        if ((options == null ? void 0 : options.walletAddress) === undefined) {
            throw Error('Wallet address is mandatory');
        }
        const method = this.getContractNonPayableMethod({
            abi: ERC20_ABI,
            address: this.token.address,
            method: 'balanceOf',
            params: [
                options.walletAddress
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((balance)=>BNFixed(balance));
    }
    /**
   * Get wallet deposit amount
   * @param options - the method options
   * @returns the deposit amount
   */ async getWalletDeposit(options) {
        if ((options == null ? void 0 : options.walletAddress) === undefined) {
            throw Error('Wallet address is mandatory');
        }
        const { abi, address } = this.vault;
        const method = this.getContractNonPayableMethod({
            abi,
            address,
            method: 'balanceOf',
            params: [
                options.walletAddress
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((deposit)=>BNFixed(deposit));
    }
    constructor(vault, token, { web3, web3Client, walletAddresses, rewardTokens } = {}){
        this.web3 = web3;
        this.vault = vault;
        this.token = token;
        this.web3Client = web3Client;
        this.rewardTokens = rewardTokens;
        this.walletAddresses = walletAddresses;
        this.minTokenAmount = '1';
        this.maxTokenAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    }
}

//# sourceMappingURL=vault-contract.class.js.map