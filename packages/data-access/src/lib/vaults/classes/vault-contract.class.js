"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultContract", {
    enumerable: true,
    get: function() {
        return VaultContract;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _lodash = require("lodash");
const _web3client = require("../../web3-client");
const _core = require("../../core");
const _utilitylib = require("../../core/utility.lib");
const _vaultweb3lib = require("../libs/vault-web3.lib");
const _abis = require("../abis");
let VaultContract = class VaultContract {
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
            const previousBlock = (0, _core.BNify)(bNumber).minus(1).toString();
            promises.push(this.web3Client.call(previousMethods, previousBlock));
        }
        const contractData = await Promise.all(promises).then(([current, previous])=>{
            const contractData = this.parseCallResponses(current, prefill == null ? void 0 : prefill.current);
            // Process previous block data if set
            if (!(0, _lodash.isEmpty)(previous)) {
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
   */ makeProtocolData({ abi, abiCode, address, protocol }, type, token, values, parent) {
        const { contract, methods } = this.getContractMethods((0, _vaultweb3lib.ensureAbi)({
            abi,
            abiCode
        }), address, protocol, type, token);
        return methods.map((m)=>this.makeMethodData(contract, m, parent, values, token));
    }
    /**
   * Check if the pool block is >= block number
   * @param pool pool data
   * @param blockNumber web3 call block number
   * @returns
   */ checkPoolBlock(pool, blockNumber) {
        if (!pool.fromBlock || blockNumber === 'latest' || (0, _core.BNify)(blockNumber).isNaN()) {
            return true;
        }
        return (0, _core.BNlte)(pool.fromBlock, blockNumber);
    }
    /**
   * Check is the amount is formatted correctly for the contract
   * @param amount normalized amount
   * @returns true | false
   */ checkContractAmount(amount) {
        return amount !== '' && !(0, _core.BNify)(amount).isNaN() && (0, _core.BNgte)(amount, this.minTokenAmount) && (0, _core.BNlte)(amount, this.maxTokenAmount);
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
   * Get pools tokens data
   * @param contractData contract dta
   * @returns pools tokens data
   */ async getPoolsTokensData(contractData) {
        var _contractData_pools;
        const web3Client = this.web3Client;
        if (!web3Client) {
            throw new Error('Web3 Client not available');
        }
        if (!((_contractData_pools = contractData.pools) == null ? void 0 : _contractData_pools.length)) {
            return [];
        }
        const poolTokenAddrs = contractData.pools.flatMap((p)=>(p.tokensInfo || []).flatMap((t)=>t.address));
        const promises = (0, _lodash.uniq)(poolTokenAddrs).map((tokenAddress)=>web3Client.getERC20(tokenAddress));
        const tokensData = await Promise.all(promises);
        return tokensData.filter((t)=>t !== undefined);
    }
    /**
   * Prepare wallet data
   * @param address - the wallet address
   * @returns the web3 call data
   */ makeWalletData(walletAddress, { abi, abiCode, address, protocol }) {
        const { contract, methods } = this.getContractMethods((0, _vaultweb3lib.ensureAbi)({
            abi,
            abiCode
        }), address, protocol, 'WALLET');
        return methods.map((m)=>this.makeMethodData(contract, m, undefined, {
                walletAddress
            }));
    }
    /**
   * Prepare pool data
   * @param pool - the vault pool
   * @returns the web3 call data
   */ makePoolData(pool, blockNumber) {
        var _pool_oracle, _this_walletAddresses;
        // Skip pool is fromBlock < blockNumber
        if (!this.checkPoolBlock(pool, blockNumber)) {
            return [];
        }
        let callData = this.makeProtocolData(pool, 'POOL', undefined, {
            oracleAddress: (_pool_oracle = pool.oracle) == null ? void 0 : _pool_oracle.address
        });
        // Add wallet pool data
        if ((_this_walletAddresses = this.walletAddresses) == null ? void 0 : _this_walletAddresses.length) {
            callData = this.walletAddresses.reduce((acc, walletAddress)=>{
                var _pool_oracle;
                return [
                    ...acc,
                    ...this.makeProtocolData(pool, 'WALLET_POOL', undefined, {
                        walletAddress,
                        oracleAddress: (_pool_oracle = pool.oracle) == null ? void 0 : _pool_oracle.address
                    })
                ];
            }, [
                ...callData
            ]);
        }
        // Check oracle
        if (pool.oracle) {
            const { abi: oracleAbi, abiCode, address: oracleAddress, protocol: oracleProtocol } = pool.oracle;
            const abi = (0, _vaultweb3lib.ensureAbi)({
                abi: oracleAbi,
                abiCode
            });
            const oracle = this.getContractMethods(abi, oracleAddress, oracleProtocol || pool.protocol, 'ORACLE');
            const { protocol, address } = pool;
            callData = [
                ...callData,
                ...oracle.methods.map((m)=>this.makeMethodData(oracle.contract, m, {
                        protocol,
                        address,
                        type: 'POOL'
                    }, {
                        poolAddress: pool.address
                    }))
            ];
        }
        // Check tokens
        if (pool.tokens) {
            callData = pool.tokens.reduce((acc, poolToken)=>{
                var _pool_oracle;
                return [
                    ...acc,
                    ...this.makeProtocolData(_extends._({}, poolToken, {
                        protocol: pool.protocol
                    }), 'POOL_TOKEN', undefined, {
                        poolAddress: pool.address,
                        oracleAddress: (_pool_oracle = pool.oracle) == null ? void 0 : _pool_oracle.address
                    }, {
                        protocol: pool.protocol,
                        address: pool.address,
                        type: 'POOL'
                    })
                ];
            }, [
                ...callData
            ]);
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
            methods: _web3client.WEB3_CONTRACT_METHODS.filter((m)=>m.protocol === protocol && m.type === type && m.tokenSymbol === (token == null ? void 0 : token.symbol))
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
        const methodAbi = jsonInterface.find((f)=>f.name === method);
        if (!methodAbi) {
            throw new Error(`No ABI method '${method}' found for ${protocol} at contract ${contract.options.address} for vault: ${this.vault.address}`);
        }
        if (methodAbi.inputs.length !== params.length) {
            throw new Error(`The ABI method '${method}' found for ${protocol} at contract ${contract.options.address} has incompatible params: ${methodAbi.inputs.length} required, ${params} given.`);
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
            case '0':
            case '1':
                value = param;
                break;
            case '1e18':
                value = '1000000000000000000';
                break;
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
            case 'yieldSourceAddress':
            case 'poolAddress':
            case 'oracleAddress':
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
            case 'PARETO_DOLLAR':
                methodData = this.parseParetoDollarResponse(data, response);
                break;
            case 'PARETO_DOLLAR_QUEUE':
                methodData = this.parseParetoDollarQueueResponse(data, response);
                break;
            case 'PARETO_DOLLAR_QUEUE_EPOCH_PENDING':
                methodData = this.parseParetoDollarQueueEpochPendingResponse(data, response);
                break;
            case 'PARETO_DOLLAR_QUEUE_YIELD_SOURCE':
                methodData = this.parseVaultBlockParetoDollarYieldSourceResponse(data, response);
                break;
            case 'PARETO_DOLLAR_STAKING':
                methodData = this.parseParetoDollarStakingResponse(data, response);
                break;
            case 'WALLET_PARETO_DOLLAR_STAKING':
                methodData = this.parseWalletParetoDollarStakingResponse(data, response);
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
            case 'WALLET_CDO_EPOCH_WRITEOFF':
                methodData = this.parseWalletCdoEpochWriteOffResponse(data, response);
                break;
            case 'POOL':
                methodData = this.parsePoolResponse(data, response);
                break;
            case 'POOL_TOKEN':
                methodData = this.parsePoolTokenResponse(data, response);
                break;
            case 'WALLET_POOL':
                methodData = this.parseWalletPoolResponse(data, response);
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
            case 'WALLET_EULER_ACCOUNT_LENS':
                methodData = this.parseEulerAccountLens(data, response);
                break;
            case 'ORACLE':
                // Use parent type parsing if specified
                if (response.parent && response.parent.type !== 'ORACLE') {
                    methodData = this.parseCallResponse(data, _extends._({}, response, response.parent));
                } else {
                    // Use oracle parsing
                    methodData = this.parseOracleResponse(data, _extends._({}, response, response.parent));
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
        return _extends._({}, data, methodData);
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
                methodData.cdo = _extends._({}, data.cdo || {}, {
                    APRSplitRatio: outputs[0].value
                });
                break;
            case 'virtualPrice':
                methodData.price = outputs[0].value;
                break;
            case 'getCurrentAARatio':
                methodData.cdo = _extends._({}, data.cdo || {}, {
                    currentAARatio: outputs[0].value
                });
                break;
        }
        return _extends._({}, data, methodData);
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
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    lastApr: outputs[0].value
                });
                break;
            case 'totalSupply':
                methodData.totalSupply = outputs[0].value;
                break;
            case 'lastEpochInterest':
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    lastInterest: outputs[0].value
                });
                break;
            case 'epochEndDate':
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    endDate: outputs[0].value
                });
                break;
            case 'epochDuration':
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    duration: outputs[0].value
                });
                break;
            case 'getContractValue':
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    contractValue: outputs[0].value
                });
                break;
            case 'bufferPeriod':
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    bufferDuration: outputs[0].value
                });
                break;
            case 'expectedEpochInterest':
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    expectedInterest: outputs[0].value
                });
                break;
            case 'unclaimedFees':
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    unclaimedFees: outputs[0].value
                });
                break;
            case 'disableInstantWithdraw':
                var _data_cdoEpoch;
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends._({}, ((_data_cdoEpoch = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch.instantWithdraws) || {}, {
                        disabled: outputs[0].value
                    })
                });
                break;
            case 'instantWithdrawAprDelta':
                var _data_cdoEpoch1;
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends._({}, ((_data_cdoEpoch1 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch1.instantWithdraws) || {}, {
                        aprDelta: outputs[0].value
                    })
                });
                break;
            case 'instantWithdrawDelay':
                var _data_cdoEpoch2;
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends._({}, ((_data_cdoEpoch2 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch2.instantWithdraws) || {}, {
                        delay: outputs[0].value
                    })
                });
                break;
            case 'allowInstantWithdraw':
                var _data_cdoEpoch3;
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends._({}, ((_data_cdoEpoch3 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch3.instantWithdraws) || {}, {
                        allowed: outputs[0].value
                    })
                });
                break;
            case 'instantWithdrawDeadline':
                var _data_cdoEpoch4;
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends._({}, ((_data_cdoEpoch4 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch4.instantWithdraws) || {}, {
                        deadline: outputs[0].value
                    })
                });
                break;
            case 'pendingWithdrawFees':
                var _data_cdoEpoch5;
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    withdraws: _extends._({}, ((_data_cdoEpoch5 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch5.withdraws) || {}, {
                        fees: outputs[0].value
                    })
                });
                break;
            case 'isEpochRunning':
                var _methodData_cdoEpoch;
                if (outputs[0].value) {
                    methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                        status: 'RUNNING'
                    });
                } else if (((_methodData_cdoEpoch = methodData.cdoEpoch) == null ? void 0 : _methodData_cdoEpoch.status) !== 'DEFAULTED') {
                    methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                        status: 'WAITING'
                    });
                }
                break;
            case 'defaulted':
                if (outputs[0].value) {
                    methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                        status: 'DEFAULTED'
                    });
                }
                break;
            case 'virtualPrice':
                methodData.price = outputs[0].value;
                break;
        }
        return _extends._({}, data, methodData);
    }
    /**
   * Parse Pareto Dollar response
   * @param data - the already processed data
   * @param response - the Pareto Dollar response
   * @returns the contract data
   */ parseParetoDollarResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'totalSupply':
                methodData.totalSupply = outputs[0].value;
                break;
        }
        return _extends._({}, data, methodData);
    }
    /**
   * Parse Pareto Dollar Queue response
   * @param data - the already processed data
   * @param response - the Pareto Dollar Queue response
   * @returns the contract data
   */ parseParetoDollarQueueResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'epochNumber':
                var _data_paretoDollar;
                methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                    queue: _extends._({}, ((_data_paretoDollar = data.paretoDollar) == null ? void 0 : _data_paretoDollar.queue) || {}, {
                        epochNumber: outputs[0].value
                    })
                });
                break;
            case 'getTotalCollateralsScaled':
                var _data_paretoDollar1;
                methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                    queue: _extends._({}, ((_data_paretoDollar1 = data.paretoDollar) == null ? void 0 : _data_paretoDollar1.queue) || {}, {
                        totalCollateralsScaled: outputs[0].value
                    })
                });
                break;
            case 'getUnlentBalanceScaled':
                var _data_paretoDollar2;
                methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                    queue: _extends._({}, ((_data_paretoDollar2 = data.paretoDollar) == null ? void 0 : _data_paretoDollar2.queue) || {}, {
                        unlentBalanceScaled: outputs[0].value
                    })
                });
                break;
            case 'totReservedWithdrawals':
                var _data_paretoDollar3;
                methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                    queue: _extends._({}, ((_data_paretoDollar3 = data.paretoDollar) == null ? void 0 : _data_paretoDollar3.queue) || {}, {
                        totalReservedWithdrawals: outputs[0].value
                    })
                });
                break;
            case 'getAllYieldSources':
                var _data_paretoDollar4;
                methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                    queue: _extends._({}, ((_data_paretoDollar4 = data.paretoDollar) == null ? void 0 : _data_paretoDollar4.queue) || {}, {
                        yieldSources: outputs[0].value.map((s)=>({
                                tokenAddress: s.token,
                                sourceAddress: s.source,
                                vaultAddress: s.vaultToken,
                                maxCap: s.maxCap,
                                depositedAmount: s.depositedAmount,
                                vaultType: s.vaultType
                            }))
                    })
                });
                break;
        }
        return _extends._({}, data, methodData);
    }
    /**
   * Parse Pareto Dollar Queue response
   * @param data - the already processed data
   * @param response - the Pareto Dollar Queue response
   * @returns the contract data
   */ parseVaultBlockParetoDollarYieldSourceResponse(data, { method, inputs, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'getCollateralsYieldSourceScaled':
                {
                    var _data_paretoDollar, _data_paretoDollar_queue, _data_paretoDollar1;
                    const sourceAddress = inputs[0].value;
                    methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                        queue: _extends._({}, ((_data_paretoDollar = data.paretoDollar) == null ? void 0 : _data_paretoDollar.queue) || {}, {
                            yieldSources: (((_data_paretoDollar1 = data.paretoDollar) == null ? void 0 : (_data_paretoDollar_queue = _data_paretoDollar1.queue) == null ? void 0 : _data_paretoDollar_queue.yieldSources) || []).map((ys)=>(0, _utilitylib.compLower)(ys.sourceAddress, sourceAddress) ? _extends._({}, ys, {
                                    depositedAmount: outputs[0].value
                                }) : ys)
                        })
                    });
                }
                break;
        }
        return _extends._({}, data, methodData);
    }
    /**
   * Parse Pareto Dollar Queue response
   * @param data - the already processed data
   * @param response - the Pareto Dollar Queue response
   * @returns the contract data
   */ parseParetoDollarQueueEpochPendingResponse(data, { method, params, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'epochPending':
                {
                    var _data_paretoDollar;
                    const fieldName = (params == null ? void 0 : params.includes('prevEpochNumber')) ? 'prevEpochPending' : 'epochPending';
                    methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                        queue: _extends._({}, ((_data_paretoDollar = data.paretoDollar) == null ? void 0 : _data_paretoDollar.queue) || {}, {
                            [fieldName]: outputs[0].value
                        })
                    });
                }
                break;
        }
        return _extends._({}, data, methodData);
    }
    /**
   * Parse Pareto Dollar Strategy response
   * @param data - the already processed data
   * @param response - the Pareto Dollar Strategy response
   * @returns the contract data
   */ parseParetoDollarStakingResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'convertToAssets':
                methodData.price = outputs[0].value;
                break;
            case 'totalSupply':
                var _data_paretoDollar;
                methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                    staking: _extends._({}, ((_data_paretoDollar = data.paretoDollar) == null ? void 0 : _data_paretoDollar.staking) || {}, {
                        totalSupply: outputs[0].value
                    })
                });
                break;
            case 'totalAssets':
                var _data_paretoDollar1;
                methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                    staking: _extends._({}, ((_data_paretoDollar1 = data.paretoDollar) == null ? void 0 : _data_paretoDollar1.staking) || {}, {
                        totalAssets: outputs[0].value
                    })
                });
                break;
            case 'rewardsLastDeposit':
                var _data_paretoDollar2;
                methodData.paretoDollar = _extends._({}, data.paretoDollar || {}, {
                    staking: _extends._({}, ((_data_paretoDollar2 = data.paretoDollar) == null ? void 0 : _data_paretoDollar2.staking) || {}, {
                        rewardsLastDeposit: outputs[0].value
                    })
                });
                break;
        }
        return _extends._({}, data, methodData);
    }
    /**
   * Parse Pareto Dollar Strategy response
   * @param data - the already processed data
   * @param response - the Pareto Dollar Strategy response
   * @returns the contract data
   */ parseWalletParetoDollarStakingResponse(data, { method, inputs, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'balanceOf':
                {
                    const address = inputs[0].value;
                    const stakedBalance = outputs[0].value;
                    // Update to existing wallet
                    methodData.wallets = (data.wallets || []).map((wallet)=>(0, _utilitylib.compLower)(wallet.address, address) ? _extends._({}, wallet, {
                            paretoDollar: _extends._({}, wallet.paretoDollar || {}, {
                                stakedBalance
                            })
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>(0, _utilitylib.compLower)(wallet.address, address))) {
                        methodData.wallets.push({
                            balance: '0',
                            address,
                            paretoDollar: {
                                stakedBalance
                            }
                        });
                    }
                }
                break;
        }
        return _extends._({}, data, methodData);
    }
    parseWalletCdoEpochWriteOffResponse(data, { method, inputs, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'userRequests':
                {
                    const address = inputs[0].value;
                    const tranches = String(outputs[0].value);
                    const underlyings = String(outputs[1].value);
                    const writeOff = {
                        tranches,
                        underlyings
                    };
                    // Update to existing wallet
                    methodData.wallets = (data.wallets || []).map((wallet)=>(0, _utilitylib.compLower)(wallet.address, address) ? _extends._({}, wallet, {
                            cdoEpoch: _extends._({}, wallet.cdoEpoch || {}, {
                                writeOff
                            })
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>(0, _utilitylib.compLower)(wallet.address, address))) {
                        methodData.wallets.push({
                            balance: '0',
                            address,
                            cdoEpoch: {
                                writeOff
                            }
                        });
                    }
                }
                break;
        }
        return _extends._({}, data, methodData);
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
                    methodData.wallets = (data.wallets || []).map((wallet)=>(0, _utilitylib.compLower)(wallet.address, address) ? _extends._({}, wallet, {
                            cdoEpoch: _extends._({}, wallet.cdoEpoch || {}, {
                                pendingDepositAmount
                            })
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>(0, _utilitylib.compLower)(wallet.address, address))) {
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
        return _extends._({}, data, methodData);
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
                    methodData.wallets = (data.wallets || []).map((wallet)=>(0, _utilitylib.compLower)(wallet.address, address) ? _extends._({}, wallet, {
                            cdoEpoch: _extends._({}, wallet.cdoEpoch || {}, {
                                pendingWithdrawAmount
                            })
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>(0, _utilitylib.compLower)(wallet.address, address))) {
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
        return _extends._({}, data, methodData);
    }
    /**
   * Parse wallet euler account lens
   * @param data - the already processed data
   * @param response - the wallet deposit queue response
   * @returns the contract data
   */ parseEulerAccountLens(data, { method, inputs, outputs, protocol, address, parent }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'getVaultAccountInfo':
                {
                    var _this_walletAddresses, _data_wallets;
                    const lpBalance = String(outputs[0].value.shares);
                    const balance = String(outputs[0].value.assets);
                    const walletPoolData = {
                        address: (parent == null ? void 0 : parent.address) || address,
                        protocol: (parent == null ? void 0 : parent.protocol) || protocol,
                        balance,
                        lpBalance
                    };
                    const subAccount = inputs[0].value;
                    // Get native wallet address from sub-account
                    const walletAddress = (_this_walletAddresses = this.walletAddresses) == null ? void 0 : _this_walletAddresses.find((wAddr)=>(0, _utilitylib.compLower)(wAddr.substring(0, 40), subAccount.substring(0, 40)));
                    if (!walletAddress) {
                        return data;
                    }
                    const walletExists = (_data_wallets = data.wallets) == null ? void 0 : _data_wallets.some((wallet)=>(0, _utilitylib.compLower)(wallet.address, walletAddress));
                    if (walletExists) {
                        methodData.wallets = (data.wallets || []).map((wallet)=>{
                            if (!(0, _utilitylib.compLower)(wallet.address, walletAddress)) return wallet;
                            // Wallet found
                            const pools = wallet.pools || [];
                            const poolExists = pools.some((pool)=>(0, _utilitylib.compLower)(pool.address, walletPoolData.address));
                            // Pool exists: sum balance
                            if (poolExists) {
                                return _extends._({}, wallet, {
                                    pools: pools.map((pool)=>(0, _utilitylib.compLower)(pool.address, walletPoolData.address) ? _extends._({}, pool, {
                                            balance: (0, _core.BNFixed)((0, _core.BNify)(pool.balance).plus(balance)),
                                            lpBalance: (0, _core.BNFixed)((0, _core.BNify)(pool.lpBalance).plus(lpBalance))
                                        }) : pool)
                                });
                            } else {
                                // Pool doesn't exist: add it
                                return _extends._({}, wallet, {
                                    pools: [
                                        ...pools,
                                        walletPoolData
                                    ]
                                });
                            }
                        });
                    } else {
                        // Wallet doesn't exist: add it
                        methodData.wallets = [
                            ...data.wallets || [],
                            {
                                balance: '0',
                                address: walletAddress,
                                pools: [
                                    walletPoolData
                                ]
                            }
                        ];
                    }
                }
        }
        return _extends._({}, data, methodData);
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
                    methodData.wallets = (data.wallets || []).map((wallet)=>(0, _utilitylib.compLower)(wallet.address, address) ? _extends._({}, wallet, {
                            cdoEpoch: _extends._({}, wallet.cdoEpoch || {}, {
                                [methodName]: amount
                            })
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>(0, _utilitylib.compLower)(wallet.address, address))) {
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
        return _extends._({}, data, methodData);
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
                    methodData.wallets = (data.wallets || []).map((wallet)=>(0, _utilitylib.compLower)(wallet.address, address) ? _extends._({}, wallet, {
                            balance
                        }) : wallet);
                    // Add new wallet
                    if (!methodData.wallets.some((wallet)=>(0, _utilitylib.compLower)(wallet.address, address))) {
                        methodData.wallets.push({
                            address,
                            balance
                        });
                    }
                }
                break;
        }
        return _extends._({}, data, methodData);
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
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    apr: outputs[0].value
                });
                break;
            case 'epochNumber':
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    epochNumber: outputs[0].value
                });
                break;
            case 'pendingInstantWithdraws':
                var _data_cdoEpoch;
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    instantWithdraws: _extends._({}, ((_data_cdoEpoch = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch.instantWithdraws) || {}, {
                        amount: outputs[0].value
                    })
                });
                break;
            case 'pendingWithdraws':
                var _data_cdoEpoch1;
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    withdraws: _extends._({}, ((_data_cdoEpoch1 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch1.withdraws) || {}, {
                        amount: outputs[0].value
                    })
                });
                break;
            case 'totEpochDeposits':
                methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                    deposits: outputs[0].value
                });
                break;
        }
        return _extends._({}, data, methodData);
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
                    methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                        depositQueue: _extends._({}, ((_data_cdoEpoch = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch.depositQueue) || {}, {
                            [amountField]: outputs[0].value
                        })
                    });
                }
                break;
        }
        return _extends._({}, data, methodData);
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
            case 'epochWithdrawPrice':
                {
                    var _data_cdoEpoch;
                    methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                        withdrawQueue: _extends._({}, ((_data_cdoEpoch = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch.withdrawQueue) || {}, {
                            epochWithdrawPrice: outputs[0].value
                        })
                    });
                }
                break;
            case 'isEpochInstant':
                {
                    var _data_cdoEpoch1;
                    methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                        withdrawQueue: _extends._({}, ((_data_cdoEpoch1 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch1.withdrawQueue) || {}, {
                            isInstant: outputs[0].value
                        })
                    });
                }
                break;
            case 'epochPendingWithdrawals':
                {
                    var _data_cdoEpoch2;
                    const amountField = (params == null ? void 0 : params.includes('prevEpochNumber')) ? 'lastAmount' : 'amount';
                    methodData.cdoEpoch = _extends._({}, data.cdoEpoch || {}, {
                        withdrawQueue: _extends._({}, ((_data_cdoEpoch2 = data.cdoEpoch) == null ? void 0 : _data_cdoEpoch2.withdrawQueue) || {}, {
                            [amountField]: outputs[0].value
                        })
                    });
                }
                break;
        }
        return _extends._({}, data, methodData);
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
                methodData.strategy = _extends._({}, data.strategy || {}, {
                    APR: outputs[0].value
                });
                break;
            case 'getRewardTokens':
                methodData.strategy = _extends._({}, data.strategy || {}, {
                    rewardTokens: outputs[0].value
                });
                break;
        }
        return _extends._({}, data, methodData);
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
        return _extends._({}, data, oracleData);
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
        return _extends._({}, data, tokensData);
    }
    /**
   * Parse pool token reponse
   * @param data contract data
   * @param param1 web3 call data
   * @returns pool token data
   */ parsePoolTokenResponse(data, { method, outputs, protocol, address, parent }) {
        var _data_pools;
        if (!this.web3Client) {
            throw new Error('Web3 Client not available');
        }
        // Exit if no parent set
        if (!parent) {
            return data;
        }
        const methodName = method.split('(')[0];
        const poolData = ((_data_pools = data.pools) == null ? void 0 : _data_pools.find((p)=>(0, _utilitylib.compLower)(p.address, parent.address))) || {
            protocol,
            address: parent.address
        };
        switch(methodName){
            // Pool token balance
            case 'balanceOf':
                {
                    var _poolData_tokensInfo;
                    const tokenExists = (_poolData_tokensInfo = poolData.tokensInfo) == null ? void 0 : _poolData_tokensInfo.find((t)=>(0, _utilitylib.compLower)(t.address, address));
                    if (!tokenExists) {
                        poolData.tokensInfo = [
                            ...poolData.tokensInfo || [],
                            {
                                address,
                                balance: outputs[0].value,
                                balanceScaled: outputs[0].value
                            }
                        ];
                    }
                }
                break;
        }
        return _extends._({}, data, {
            pools: this.implementPoolsData(data.pools, poolData)
        });
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
            // Pendle SY balance
            case 'balanceOf':
                poolData.underlyingBalance = String(outputs[0].value);
                break;
            // Napier YT price
            case 'get_dy':
                poolData.exchangeRate = (0, _core.BNFixed)((0, _core.BNify)(1e18).minus(outputs[0].value));
                break;
            // Napier PT price
            case 'lp_price':
                poolData.exchangeRate = String(outputs[0].value);
                break;
            // Calculate Sky APR
            case 'ssr':
                {
                    const ssr = (0, _core.BNify)(outputs[0].value).div(1e27).toNumber();
                    poolData.APR = String((Math.pow(ssr, _core.SECONDS_IN_YEAR) - 1) * 100);
                }
                break;
            case 'getRate':
                poolData.exchangeRate = outputs[0].value;
                break;
            case 'getTokenInfo':
                poolData.tokensInfo = outputs[0].value.map((tokenAddress, index)=>({
                        address: tokenAddress,
                        balance: outputs[2].value[index],
                        balanceScaled: outputs[3].value[index]
                    }));
                break;
            case 'totalSupply':
                poolData.totalSupply = outputs[0].value;
                break;
            case 'totalBorrows':
                poolData.totalBorrow = outputs[0].value;
                break;
            case 'convertToAssets':
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
        return _extends._({}, data, {
            pools: this.implementPoolsData(data.pools, poolData)
        });
    }
    /**
   * Parse wallet deposit queue response
   * @param data - the already processed data
   * @param response - the wallet deposit queue response
   * @returns the contract data
   */ parseWalletPoolResponse(data, { method, outputs, inputs, protocol, address }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'balanceOf':
                {
                    var _data_wallets;
                    const lpBalance = String(outputs[0].value);
                    const walletPoolData = {
                        address,
                        protocol,
                        lpBalance
                    };
                    const walletAddress = inputs[0].value;
                    const walletExists = (_data_wallets = data.wallets) == null ? void 0 : _data_wallets.some((wallet)=>(0, _utilitylib.compLower)(wallet.address, walletAddress));
                    if (walletExists) {
                        methodData.wallets = (data.wallets || []).map((wallet)=>{
                            if (!(0, _utilitylib.compLower)(wallet.address, walletAddress)) return wallet;
                            // Wallet found
                            const pools = wallet.pools || [];
                            const poolExists = pools.some((pool)=>(0, _utilitylib.compLower)(pool.address, walletPoolData.address));
                            // Pool exists: update it
                            if (poolExists) {
                                return _extends._({}, wallet, {
                                    pools: pools.map((pool)=>(0, _utilitylib.compLower)(pool.address, walletPoolData.address) ? _extends._({}, pool, walletPoolData) : pool)
                                });
                            } else {
                                // Pool doesn't exist: add it
                                return _extends._({}, wallet, {
                                    pools: [
                                        ...pools,
                                        walletPoolData
                                    ]
                                });
                            }
                        });
                    } else {
                        // Wallet doesn't exist: add it
                        methodData.wallets = [
                            ...data.wallets || [],
                            {
                                balance: '0',
                                address: walletAddress,
                                pools: [
                                    walletPoolData
                                ]
                            }
                        ];
                    }
                }
                break;
        }
        return _extends._({}, data, methodData);
    }
    /**
   * Implement pools data with new pool data
   * @param pools pools data
   * @param poolData new pool data
   * @returns combined pools data and new pool data
   */ implementPoolsData(pools = [], poolData) {
        const poolCheck = pools.find((pool)=>pool.protocol === poolData.protocol && (0, _utilitylib.compLower)(pool.address, poolData.address));
        if (!poolCheck) {
            return [
                ...pools,
                poolData
            ];
        }
        return pools.map((pool)=>pool.protocol === poolData.protocol && (0, _utilitylib.compLower)(pool.address, poolData.address) ? _extends._({}, pool, poolData) : pool);
    }
    /**
   * Implements wallets data
   * @param wallets wallets data to be implemented
   * @param walletsData new wallets data
   * @returns implemented wallets data
   */ implementWalletsData(wallets, walletsData) {
        return walletsData.reduce((acc, walletData)=>{
            const walletAddress = walletData.address;
            const walletExists = acc.some((wallet)=>(0, _utilitylib.compLower)(wallet.address, walletAddress));
            if (!walletExists) {
                return [
                    ...wallets,
                    walletData
                ];
            }
            return acc.map((wallet)=>{
                if (!(0, _utilitylib.compLower)(wallet.address, walletAddress)) return wallet;
                const pools = (walletData.pools || []).reduce((acc, walletPoolData)=>this.implementPoolsData(acc, walletPoolData), wallet.pools || []);
                return _extends._({}, wallet, {
                    pools
                });
            });
        }, [
            ...wallets
        ]);
    }
    /**
   * Implements pools tokens with erc20 data
   * @param pools pools
   * @param tokensData tokens data
   * @returns pools data with tokens info
   */ implementPoolsTokensData(pools, tokensData) {
        return pools.map((p)=>{
            var _p_tokensInfo;
            return _extends._({}, p, {
                tokensInfo: (_p_tokensInfo = p.tokensInfo) == null ? void 0 : _p_tokensInfo.map((t)=>{
                    const tokenData = tokensData.find((tD)=>(0, _utilitylib.compLower)(tD.address, t.address));
                    return _extends._({}, t, {
                        tokenData
                    });
                })
            });
        });
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
   * Get wallet deposit amount
   * @param options - the method options
   * @returns the deposit amount
   */ getWalletBalance(options) {
        if ((options == null ? void 0 : options.walletAddress) === undefined) {
            throw Error('Wallet address is mandatory');
        }
        const method = this.getContractNonPayableMethod({
            abi: _abis.ERC20_ABI,
            address: this.token.address,
            method: 'balanceOf',
            params: [
                options.walletAddress
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((balance)=>(0, _core.BNFixed)(balance));
    }
    /**
   * Get wallet deposit amount
   * @param options - the method options
   * @returns the deposit amount
   */ async getWalletDeposit(options) {
        if ((options == null ? void 0 : options.walletAddress) === undefined) {
            throw Error('Wallet address is mandatory');
        }
        const { abi, abiCode, address } = this.vault;
        const method = this.getContractNonPayableMethod({
            abi: (0, _vaultweb3lib.ensureAbi)({
                abi,
                abiCode
            }),
            address,
            method: 'balanceOf',
            params: [
                options.walletAddress
            ]
        });
        if (!method) {
            throw Error('Not method available');
        }
        return method.call().then((deposit)=>(0, _core.BNFixed)(deposit));
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
};

//# sourceMappingURL=vault-contract.class.js.map