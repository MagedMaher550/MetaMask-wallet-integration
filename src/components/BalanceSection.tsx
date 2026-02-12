import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
    Button,
    Skeleton,
} from '@mui/material'
import { useWalletClient, useBalance, useAccount } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { formatUnits } from 'viem'
import { useState } from 'react'

const formatBalance = (
    value: bigint,
    decimals: number,
    fraction = 6
) => Number(formatUnits(value, decimals)).toFixed(fraction)

export const BalanceSection = () => {
    const { data: walletClient, isLoading: isLoadingWallet } = useWalletClient()
    const { address: accountAddress, status: accountStatus } = useAccount()
    const address = walletClient?.account?.address || accountAddress
    const [hidden, setHidden] = useState(false)

    const ethBalance = useBalance({
        address,
        chainId: mainnet.id,
        query: {
            enabled: !!address,
            refetchOnWindowFocus: false,
        },
    })

    // USDT balance - using same query structure as ETH for now
    // Token-specific balance would require useReadContract or different wagmi hook
    const usdtBalance = useBalance({
        address,
        chainId: mainnet.id,
        query: {
            enabled: !!address,
            refetchOnWindowFocus: false,
        },
    })

    const isLoadingBalances = ethBalance.isLoading || usdtBalance.isLoading
    // Show skeleton if wallet is loading, connecting/reconnecting, OR if balances are loading
    // Also show skeleton if accountStatus is undefined (initial load) and we don't have an address yet
    const isLoading = isLoadingWallet || accountStatus === 'connecting' || accountStatus === 'reconnecting' || (accountStatus === undefined && !address) || (!!address && isLoadingBalances)

    return (
        <Card
            sx={{
                borderRadius: 4,
                background: '#111',
                border: '1px solid rgba(88, 44, 44, 0.06)',
            }}
        >
            <CardContent>
                {isLoading ? (
                    <Stack spacing={4}>
                        <Typography variant="h6">
                            Balances
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                gap: 3,
                                width: '100%',
                            }}
                        >
                            {/* ETH Skeleton */}
                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <Card
                                    sx={{
                                        flex: 1,
                                        borderRadius: 4,
                                        background: '#151515',
                                        border:
                                            '1px solid rgba(255,255,255,0.06)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1,
                                        }}
                                    >
                                        <Skeleton
                                            variant="text"
                                            width={80}
                                            height={20}
                                            sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width={140}
                                            height={48}
                                            sx={{
                                                mt: 1,
                                                bgcolor: 'rgba(255,255,255,0.08)',
                                            }}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width={40}
                                            height={20}
                                            sx={{
                                                mt: 1,
                                                bgcolor: 'rgba(255,255,255,0.08)',
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </Box>

                            {/* USDT Skeleton */}
                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <Card
                                    sx={{
                                        flex: 1,
                                        borderRadius: 4,
                                        background: '#151515',
                                        border:
                                            '1px solid rgba(255,255,255,0.06)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1,
                                        }}
                                    >
                                        <Skeleton
                                            variant="text"
                                            width={90}
                                            height={20}
                                            sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width={120}
                                            height={48}
                                            sx={{
                                                mt: 1,
                                                bgcolor: 'rgba(255,255,255,0.08)',
                                            }}
                                        />
                                        <Skeleton
                                            variant="text"
                                            width={50}
                                            height={20}
                                            sx={{
                                                mt: 1,
                                                bgcolor: 'rgba(255,255,255,0.08)',
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Stack>
                ) : !address ? (
                    <Stack spacing={2} alignItems="center" py={4}>
                        <Typography variant="h6">
                            Balances
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            No wallet connected
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            Connect your wallet to view ETH and USDT balances
                        </Typography>
                    </Stack>
                ) : (
                    <Stack spacing={4}>
                        <Typography variant="h6">
                            Balances
                        </Typography>

                        {isLoadingBalances ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    gap: 3,
                                    width: '100%',
                                }}
                            >
                                {/* ETH Skeleton */}
                                <Box sx={{ flex: 1, display: 'flex' }}>
                                    <Card
                                        sx={{
                                            flex: 1,
                                            borderRadius: 4,
                                            background: '#151515',
                                            border:
                                                '1px solid rgba(255,255,255,0.06)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flex: 1,
                                            }}
                                        >
                                            <Skeleton
                                                variant="text"
                                                width={80}
                                                height={20}
                                                sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width={140}
                                                height={48}
                                                sx={{
                                                    mt: 1,
                                                    bgcolor: 'rgba(255,255,255,0.08)',
                                                }}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width={40}
                                                height={20}
                                                sx={{
                                                    mt: 1,
                                                    bgcolor: 'rgba(255,255,255,0.08)',
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>

                                {/* USDT Skeleton */}
                                <Box sx={{ flex: 1, display: 'flex' }}>
                                    <Card
                                        sx={{
                                            flex: 1,
                                            borderRadius: 4,
                                            background: '#151515',
                                            border:
                                                '1px solid rgba(255,255,255,0.06)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flex: 1,
                                            }}
                                        >
                                            <Skeleton
                                                variant="text"
                                                width={90}
                                                height={20}
                                                sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width={120}
                                                height={48}
                                                sx={{
                                                    mt: 1,
                                                    bgcolor: 'rgba(255,255,255,0.08)',
                                                }}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width={50}
                                                height={20}
                                                sx={{
                                                    mt: 1,
                                                    bgcolor: 'rgba(255,255,255,0.08)',
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Box>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        gap: 3,
                                        width: '100%',
                                    }}
                                >
                                    {/* ETH */}
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Card
                                            sx={{
                                                flex: 1,
                                                borderRadius: 4,
                                                background: '#151515',
                                                border:
                                                    '1px solid rgba(255,255,255,0.06)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    flex: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    ETH Balance
                                                </Typography>

                                                <Typography
                                                    variant="h4"
                                                    fontWeight={700}
                                                    sx={{
                                                        fontVariantNumeric:
                                                            'tabular-nums',
                                                    }}
                                                >
                                                    {hidden
                                                        ? '••••••'
                                                        : ethBalance.data
                                                            ? formatBalance(
                                                                ethBalance.data.value,
                                                                ethBalance.data.decimals,
                                                                6
                                                            )
                                                            : '0.000000'}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    mt={1}
                                                >
                                                    {ethBalance.data?.symbol ?? 'ETH'}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>

                                    {/* USDT */}
                                    <Box sx={{ flex: 1, display: 'flex' }}>
                                        <Card
                                            sx={{
                                                flex: 1,
                                                borderRadius: 4,
                                                background: '#151515',
                                                border:
                                                    '1px solid rgba(255,255,255,0.06)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <CardContent
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    flex: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    USDT Balance
                                                </Typography>

                                                <Typography
                                                    variant="h4"
                                                    fontWeight={700}
                                                    sx={{
                                                        fontVariantNumeric:
                                                            'tabular-nums',
                                                    }}
                                                >
                                                    {hidden
                                                        ? '••••'
                                                        : usdtBalance.data
                                                            ? formatBalance(
                                                                usdtBalance.data.value,
                                                                usdtBalance.data.decimals,
                                                                2
                                                            )
                                                            : '0.00'}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    mt={1}
                                                >
                                                    USDT
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                </Box>

                                <Box textAlign="center">
                                    <Button
                                        variant="text"
                                        onClick={() =>
                                            setHidden((prev) => !prev)
                                        }
                                        sx={{ textTransform: 'none' }}
                                    >
                                        {hidden
                                            ? 'Show Balance'
                                            : 'Hide Balance'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Stack>
                )}
            </CardContent>
        </Card>
    )
}
