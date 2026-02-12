import {
    Card,
    CardContent,
    Typography,
    Stack,
    Skeleton,
    Box,
} from '@mui/material'
import {
    useWalletClient,
    useBalance,
    useReadContract,
} from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { formatUnits } from 'viem'
import { USDT_ADDRESS, ERC20_ABI } from '../web3/constants'

const formatEthBalance = (value: bigint, decimals: number) =>
    Number(formatUnits(value, decimals)).toFixed(6)

const formatTokenBalance = (
    value?: bigint,
    decimals?: number
) => {
    if (!value || decimals === undefined) return '0.00'
    return Number(formatUnits(value, decimals)).toFixed(2)
}

export const BalanceSection = () => {
    const { data: walletClient } = useWalletClient()
    const address = walletClient?.account?.address

    // ETH balance
    const ethBalance = useBalance({
        address,
        chainId: mainnet.id,
        query: {
            enabled: !!address,
            refetchOnWindowFocus: false,
        },
    })

    // USDT balance
    const usdtBalance = useReadContract({
        address: USDT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
            refetchOnWindowFocus: false,
        },
    })

    const usdtDecimals = useReadContract({
        address: USDT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'decimals',
        query: {
            enabled: !!address,
        },
    })

    if (!address) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">Balances</Typography>
                    <Typography variant="body2">
                        Connect wallet to view balances
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    const isEthLoading =
        ethBalance.isLoading || ethBalance.isFetching

    const isUsdtLoading =
        usdtBalance.isLoading || usdtDecimals.isLoading

    return (
        <Card>
            <CardContent>
                <Stack spacing={4}>
                    <Typography variant="h6">Balances</Typography>

                    {/* ETH */}
                    <Box>
                        {isEthLoading ? (
                            <>
                                <Skeleton
                                    variant="text"
                                    width="60%"
                                    height={48}
                                    animation="wave"
                                    sx={{ mb: 1 }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="20%"
                                    height={24}
                                    animation="wave"
                                />
                            </>
                        ) : ethBalance.data ? (
                            <>
                                <Typography variant="h4" fontWeight={600}>
                                    {formatEthBalance(
                                        ethBalance.data.value,
                                        ethBalance.data.decimals
                                    )}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {ethBalance.data.symbol}
                                </Typography>
                            </>
                        ) : (
                            <Typography color="error">
                                Failed to fetch ETH balance
                            </Typography>
                        )}
                    </Box>

                    {/* USDT */}
                    <Box>
                        {isUsdtLoading ? (
                            <Skeleton
                                variant="text"
                                width="40%"
                                height={32}
                                animation="wave"
                            />
                        ) : (
                            <Typography variant="body1">
                                {formatTokenBalance(
                                    usdtBalance.data as bigint,
                                    usdtDecimals.data as number
                                )}{' '}
                                USDT
                            </Typography>
                        )}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}
