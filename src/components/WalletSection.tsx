import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
} from '@mui/material'
import {
    useAccount,
    useConnect,
    useDisconnect,
    useChainId,
    useSwitchChain,
} from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const WalletSection = () => {
    const { address, isConnected } = useAccount()
    const { connectAsync, connectors, isPending } = useConnect()
    const { disconnect } = useDisconnect()
    const chainId = useChainId()
    const { switchChain } = useSwitchChain()

    const injectedConnector = connectors.find(
        (connector) => connector.id === 'injected'
    )

    const isWrongNetwork = isConnected && chainId !== mainnet.id

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Typography variant="h6">Wallet</Typography>

                    {!isConnected && (
                        <Button
                            variant="contained"
                            disabled={!injectedConnector || isPending}
                            onClick={async () => {
                                if (injectedConnector) {
                                    try {
                                        await connectAsync({ connector: injectedConnector })
                                    } catch (error) {
                                        console.error('Connection error:', error)
                                    }
                                }
                            }}
                        >
                            {isPending ? 'Connecting...' : 'Connect Wallet'}
                        </Button>
                    )}

                    {isConnected && (
                        <>
                            <Typography variant="body2">Address:</Typography>
                            <Typography
                                variant="body2"
                                sx={{ wordBreak: 'break-all' }}
                            >
                                {address}
                            </Typography>

                            {isWrongNetwork && (
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    onClick={() =>
                                        switchChain({ chainId: mainnet.id })
                                    }
                                >
                                    Switch to Ethereum Mainnet
                                </Button>
                            )}

                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => disconnect()}
                            >
                                Disconnect
                            </Button>
                        </>
                    )}
                </Stack>
            </CardContent>
        </Card>
    )
}
