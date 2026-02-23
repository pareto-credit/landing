"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WalletService", {
    enumerable: true,
    get: function() {
        return WalletService;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _vaults = require("../../vaults");
let WalletService = class WalletService {
    async getBalance(contractAddress, blockNumber) {
        const contract = this.web3Client.initContract(_vaults.ERC20_ABI, contractAddress);
        const contractMethod = {
            protocol: 'Idle',
            type: 'WALLET',
            block: 'current',
            method: 'balanceOf',
            params: [
                'walletAddress'
            ]
        };
        const callData = this.makeMethodData(contract, contractMethod);
        const responses = await this.web3Client.call([
            callData
        ], blockNumber);
        return this.parseCallResponses(responses);
    }
    async getAllowance(tokenAddress, spenderAddress, blockNumber) {
        const contract = this.web3Client.initContract(_vaults.ERC20_ABI, tokenAddress);
        const contractMethod = {
            type: 'WALLET',
            protocol: 'Idle',
            block: 'current',
            method: 'allowance',
            params: [
                'walletAddress',
                'spenderAddress'
            ]
        };
        const callData = this.makeMethodData(contract, contractMethod, {
            spenderAddress
        });
        const responses = await this.web3Client.call([
            callData
        ], blockNumber);
        return this.parseCallResponses(responses);
    }
    /**
   * Parse method into Web3CallData
   * @param method - the contract method
   * @returns the web3CallData
   */ makeMethodData(contract, contractMethod, values) {
        const { jsonInterface } = contract.options;
        const { protocol, type, method, block, params = [] } = contractMethod;
        const address = contract.options.address;
        if (!address) {
            throw new Error('Contract without a valid address');
        }
        // Get ABI method to prepare the right types
        const methodAbi = jsonInterface.find((f)=>f.name === method && f.inputs.length === params.length);
        if (!methodAbi) {
            throw new Error(`No ABI method '${method}' found for ${protocol} at contract ${contract.options.address}`);
        }
        // Method name + params
        const inputTypes = methodAbi.inputs.map((i)=>i.type);
        const methodName = `${methodAbi.name}(${inputTypes.join(',')})`;
        // Input & Outputs
        const inputs = methodAbi.inputs.map((input, i)=>this.makeMethodParamData(input, params[i], values));
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
            block,
            inputs,
            outputs
        };
    }
    /**
   * Parse vault json param
   * @param vault - the vault
   * @param input - the ABI Json Param
   * @returns the vault data param
   */ makeMethodParamData(input, param, values) {
        const type = input.type;
        return {
            type,
            value: param ? this.parseMethodParam(param, values) : undefined
        };
    }
    /**
   * Parse method param
   * @param param - the method param
   * @returns the value of the param
   */ parseMethodParam(param, values) {
        let value;
        switch(param){
            case 'walletAddress':
                value = this.address;
                break;
            case 'spenderAddress':
                value = values ? values['spenderAddress'] : undefined;
                break;
        }
        return value;
    }
    /**
   * Parse Web3CallData into contract data
   * @param response - the response from web3call data
   * @returns the vault contract data
   */ parseCallResponses(responses) {
        return responses.reduce((acc, res)=>this.parseCallResponse(acc, res), {});
    }
    /**
   * Parse call response
   * @param data - the already processed data
   * @param response - the call response
   * @returns the contract data
   */ parseCallResponse(data, { method, outputs }) {
        const methodName = method.split('(')[0];
        const methodData = {};
        switch(methodName){
            case 'balanceOf':
                methodData.balance = outputs[0].value;
                break;
            case 'allowance':
                methodData.allowance = outputs[0].value;
                break;
        }
        return _extends._({}, data, methodData);
    }
    constructor(address, web3Client){
        this.address = address;
        this.web3Client = web3Client;
    }
};

//# sourceMappingURL=wallet-service.class.js.map