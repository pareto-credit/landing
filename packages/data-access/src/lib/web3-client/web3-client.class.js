"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Web3Client", {
    enumerable: true,
    get: function() {
        return Web3Client;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
const _web3clientconst = require("./web3-client.const");
const _core = require("../core");
const _vaults = require("../vaults");
let Web3Client = class Web3Client {
    /**
   * Initialize contract instance
   * @param abi - the contract ABI
   * @param address - the address
   * @returns the new instance of Web3 Contract
   */ initContract(abi, address) {
        return new this.web3.eth.Contract(abi, address);
    }
    /**
   * Create a topic from a type
   * @param topicType - the topic type
   * @returns the topic encoded
   */ createTopic(topicType) {
        const argument = topicType === 'transfer' ? 'Transfer(address,address,uint256)' : '';
        return this.web3.utils.sha3(argument) || '';
    }
    /**
   * Get web3 transaction from hash
   * @param hash transaction hash
   * @returns web3 transaction object
   */ async getTransaction(hash) {
        if (!(0, _core.isTxHash)(hash)) return;
        return this.web3.eth.getTransaction(hash);
    }
    /**
   * Get transcation logs from hash
   * @param hash transaction hash
   * @returns transaction logs array
   */ async getTransactionLogs(hash) {
        if (!(0, _core.isTxHash)(hash)) return [];
        const receipt = await this.web3.eth.getTransactionReceipt(hash);
        return (receipt == null ? void 0 : receipt.logs) || [];
    }
    /**
   * Get block data
   * @param blockNumber - the block number
   * @returns the promise to load block data
   */ async getBlock(blockNumber = 'latest') {
        return this.web3.eth.getBlock(blockNumber);
    }
    /**
   * Get contract events using block range
   * @param contract vault contract
   * @param eventType event type
   * @param startBlock start block number
   * @param endBlock end block number
   * @param maxBlocks max blocks per batch
   * @returns concatenated past events
   */ async getContractEvents(contract, eventType, startBlock, endBlock = 'latest', filters = {}, maxBlocks = 1000) {
        var _this_logger;
        // Get latest block if not specified
        if (endBlock === 'latest') {
            endBlock = (await this.getBlock()).number;
        }
        if ((0, _core.BNlt)(endBlock, startBlock)) {
            endBlock = startBlock;
        }
        // Total blocks to get
        const totalBlocks = _bignumber.default.maximum(1, (0, _core.BNify)(endBlock).minus((0, _core.BNify)(startBlock)));
        (_this_logger = this.logger) == null ? void 0 : _this_logger.debug(`Get ${eventType} events for ${contract.options.address} from ${startBlock} to ${endBlock}, maxBlocks: ${maxBlocks}.`);
        // Set from and to block
        let fromBlock = (0, _core.BNify)(startBlock);
        let toBlock = (0, _core.BNlt)(totalBlocks, maxBlocks) ? (0, _core.BNify)(endBlock) : _bignumber.default.minimum((0, _core.BNify)(endBlock), (0, _core.BNify)(startBlock).plus(maxBlocks));
        let pastEvents = [];
        let retry = 0;
        do {
            try {
                var _this_logger1;
                // @ts-expect-error: use whatever eventType
                const events = await contract.getPastEvents(eventType, _extends._({
                    fromBlock: this.parseBlock(fromBlock.toNumber()),
                    toBlock: this.parseBlock(toBlock.toNumber())
                }, filters));
                // Concat events
                pastEvents = [
                    ...pastEvents,
                    ...events
                ];
                (_this_logger1 = this.logger) == null ? void 0 : _this_logger1.debug(`Get ${eventType} events for ${contract.options.address} from ${fromBlock} to ${toBlock}. Events: ${events.length}, Total: ${pastEvents.length}`);
                // Increment from and to block
                fromBlock = toBlock.plus(1);
                toBlock = _bignumber.default.minimum((0, _core.BNify)(endBlock), toBlock.plus(maxBlocks));
            } catch (error) {
                var _this_logger2;
                retry++;
                (_this_logger2 = this.logger) == null ? void 0 : _this_logger2.error(`Error while getting past events for ${contract.options.address} from ${fromBlock} to ${toBlock}. Count: ${retry}`);
            }
        }while ((0, _core.BNlt)(toBlock, endBlock) && retry < 10)
        return pastEvents;
    }
    /**
   * Parse block number into hex string
   * @param blockNumber - the block number
   * @returns the block number HEX string
   */ parseBlock(blockNumber) {
        return this.web3.utils.toHex(blockNumber);
    }
    /**
   * Decode parameters by ABI
   * @param abi - the ABI
   * @param params - the params encoded
   * @returns the parameters
   */ decodeParams(abi, params) {
        return Object.values(this.web3.eth.abi.decodeParameters(abi, params));
    }
    /**
   * Extract data param into flag values
   * @param params - the data params
   * @returns the object with values
   */ extractDataParams(params) {
        return params.reduce((acc, input)=>({
                names: [
                    ...acc.names,
                    input.name
                ],
                types: [
                    ...acc.types,
                    input.components ? {
                        components: input.components,
                        type: input.type
                    } : input.type
                ],
                values: [
                    ...acc.values,
                    input.value
                ]
            }), {
            names: [],
            types: [],
            values: []
        });
    }
    /**
   * Get ERC20 token info
   * @param address token address
   * @returns ERC20 info
   */ async getERC20(address) {
        if (!(0, _core.isAddress)(address)) {
            return;
        }
        const contract = this.initContract(_vaults.ERC20_ABI, address);
        const methods = _web3clientconst.WEB3_CONTRACT_METHODS.filter((m)=>m.type === 'ERC20');
        const callData = methods.map((m)=>(0, _vaults.makeWeb3CallData)(contract, m));
        const response = await this.call(callData);
        return response.reduce((acc, callData)=>{
            const methodName = callData.method.split('(')[0];
            switch(methodName){
                case 'symbol':
                case 'name':
                case 'decimals':
                    return _extends._({}, acc, {
                        [methodName]: callData.outputs[0].value
                    });
                default:
                    return acc;
            }
        }, {
            address,
            decimals: 18,
            symbol: '',
            name: ''
        });
    }
    /**
   * Execute Web3 Call
   * @param callData - the call params
   * @param blockNumber - what block to use as the current state
   * @returns the promise to use for load contract data
   */ async call(callData, blockNumber = 'latest') {
        if (blockNumber !== 'latest' && (0, _core.BNlt)(blockNumber, _web3clientconst.WEB3_MULTICALL_FIRST_BLOCK)) {
            return await this.singleCalls(callData, blockNumber);
        }
        // Encode params
        const requests = this.encodeCallsParams(callData);
        // Execute multicalls
        const responses = await this.web3.eth.call({
            data: requests,
            to: this.contractAddress,
            from: this.contractAddress
        }, blockNumber);
        // Decode response
        return this.decodeCallsResponse(responses, callData);
    }
    /**
   * Perform single calls to blockchain
   * @param callData calls data
   * @param blockNumber block number
   * @returns parsed data for passed calls
   */ async singleCalls(callData, blockNumber = 'latest') {
        const promises = callData.map((param)=>{
            const request = this.parseCallParams(param);
            return this.web3.eth.call({
                data: request.bytes,
                to: request.address,
                from: request.address
            }, blockNumber).catch((err)=>'');
        }, []);
        const responses = await Promise.all(promises);
        return responses.map((response, i)=>{
            const success = !!response.length;
            return this.decodeCallResponse(success, response, callData[i]);
        });
    }
    /**
   * Encode multi calls params
   * @param callData - the list of the call data
   * @returns the string encoded of the params
   */ encodeCallsParams(callData, limit) {
        // Prepare call method
        const methodEncoded = this.web3.utils.keccak256(_web3clientconst.WEB3_MULTICALL_METHOD_ABI).substring(0, 10);
        const callDataLimited = limit ? callData.slice(0, limit) : callData;
        // Prepare call params
        const params = callDataLimited.map((param)=>this.parseCallParams(param)).map((param)=>[
                param.address,
                param.allowFailure,
                param.bytes
            ]);
        const paramsEncoded = (0, _core.strip0x)(this.web3.eth.abi.encodeParameters(_web3clientconst.WEB3_MULTICALL_PARAM_ABI, [
            params
        ]));
        return methodEncoded + paramsEncoded;
    }
    /**
   * Parse call parameters
   * @param callData - the call data to parse
   * @returns the call data keccak256 encoded string
   */ parseCallParams(callData) {
        // Encode params
        const { types, values } = this.extractDataParams(callData.inputs);
        let params;
        try {
            params = types.length ? (0, _core.strip0x)(this.web3.eth.abi.encodeParameters(types, values)) : '';
        } catch (err) {
            throw new Error(`Error while encoding parameters types(${types.join(',')}), values(${values.join(',')}) for method ${callData.method}`);
        }
        // Encode method
        const method = this.web3.utils.keccak256(callData.method).substring(0, 10);
        return {
            address: callData.address,
            allowFailure: 1,
            bytes: method + params
        };
    }
    /**
   * Decode multicall response
   * @param response - the call encoded response
   */ decodeCallsResponse(encodedResponses, requests) {
        // Decode response
        const res = this.decodeParams(_web3clientconst.WEB3_MULTICALL_RESPONSE_ABI, encodedResponses);
        if (!res.length || !res[0]) {
            throw new Error('Response method not available');
        }
        // Parse responses based of requests
        const responses = res[0];
        return responses.map((r, i)=>{
            const response = responses[i];
            return this.decodeCallResponse(response[0], response[1], requests[i]);
        });
    }
    /**
   * Decode single call response
   * @param success - True if it's ok
   * @param response - the response encoded
   * @param request - the request object
   * @returns the callData object
   */ decodeCallResponse(success, response, request) {
        // Return empty output if not succeded
        if (!success) {
            return request;
        }
        const { types } = this.extractDataParams(request.outputs);
        try {
            const values = this.decodeParams(types, response);
            // Parse response values
            return _extends._({}, request, {
                outputs: request.outputs.map((output, i)=>_extends._({}, output, {
                        value: values[i]
                    }))
            });
        } catch (err) {
            var _this_logger;
            (_this_logger = this.logger) == null ? void 0 : _this_logger.error({
                request,
                types,
                response
            }, 'Decode Error');
            return request;
        }
    }
    constructor({ web3, provider, contractAddress = _web3clientconst.WEB3_MULTICALL_CONTRACT_ADDR, blocksPerYear = _web3clientconst.WEB3_DEFAULT_BLOCK_PER_YEAR, logger }){
        this.web3 = web3;
        this.provider = provider;
        this.contractAddress = contractAddress;
        this.blocksPerYear = blocksPerYear;
        this.logger = logger;
    }
};

//# sourceMappingURL=web3-client.class.js.map