export const VAULTS_ROUTES_KEY = 'vaults';
export const VAULTS_IDLE_QUEUE = 'IDLE_VAULTS';
export const VAULTS_BC_QUEUE = 'BC_VAULTS';
export const VAULT_SIGNATURES = {
    CDO_EPOCH: {
        startEpoch: '0xa2c8b177',
        stopEpoch: '0xd48099ad',
        stopEpochWithDuration: '0xb4ecd47f',
        getInstantWithdrawFunds: '0xcfa56567',
        claimWithdraw: '0x33986ffa',
        claimInstantWithdraw: '0x991052b7',
        // Deposit requests
        requestDeposit: '0x0d1e6667',
        deleteDepositRequest: '0xe9a21bcd',
        processDeposits: '0x33cd5dc9',
        claimDepositRequest: '0xb975b387',
        // Withdraw requests
        requestWithdraw: '0x745400c9',
        deleteWithdrawRequest: '0xdc7137c3',
        processWithdrawRequests: '0xaa9d3a60',
        processWithdrawClaims: '0x9abf0d55',
        claimWithdrawRequest: '0xd2233918'
    }
};
export const ERC20_ABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address'
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'value',
                type: 'uint256'
            }
        ],
        name: 'Transfer',
        type: 'event'
    },
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
            {
                name: '',
                type: 'bytes32'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: 'src',
                type: 'address'
            }
        ],
        name: 'balanceOf',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'stopped',
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                name: '',
                type: 'bytes32'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'authority',
        outputs: [
            {
                name: '',
                type: 'address'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [
            {
                name: 'src',
                type: 'address'
            },
            {
                name: 'guy',
                type: 'address'
            }
        ],
        name: 'allowance',
        outputs: [
            {
                name: '',
                type: 'uint256'
            }
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'value',
                type: 'uint256'
            }
        ],
        name: 'approve',
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    }
];

//# sourceMappingURL=vault.const.js.map