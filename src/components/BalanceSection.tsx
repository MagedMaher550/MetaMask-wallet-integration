import {
    Card,
    CardContent,
    Typography,
    Stack,
    Skeleton,
    Box,
} from '@mui/material'
import { useWalletClient, useBalance } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { formatUnits } from 'viem'

const formatBalance = (value: bigint, decimals: number) =>
    Number(formatUnits(value, decimals)).toFixed(6)

export const BalanceSection = () => {
    const { data: walletClient } = useWalletClient()
    const address = walletClient?.account?.address

    const balanceQuery = useBalance({
        address,
        chainId: mainnet.id,
        query: {
            enabled: !!address,
            refetchOnWindowFocus: false,
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

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    <Typography variant="h6">Balances</Typography>

                    {balanceQuery.isLoading ? (
                        <Box>
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
                        </Box>
                    ) : balanceQuery.data ? (
                        <Box>
                            <Typography variant="h4" fontWeight={600}>
                                {formatBalance(
                                    balanceQuery.data.value,
                                    balanceQuery.data.decimals
                                )}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {balanceQuery.data.symbol}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography color="error">
                            Failed to fetch balance
                        </Typography>
                    )}
                </Stack>
            </CardContent>
        </Card>
    )

}
