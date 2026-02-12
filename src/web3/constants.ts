export const USDT_ADDRESS =
    '0xdAC17F958D2ee523a2206206994597C13D831ec7'

export const ERC20_ABI = [
    {
        constant: true,
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
        stateMutability: 'view',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function',
        stateMutability: 'view',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        type: 'function',
        stateMutability: 'view',
    },
] as const
