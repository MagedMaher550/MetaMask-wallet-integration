import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
    Chip,
    Button,
    IconButton,
    Skeleton,
    Snackbar,
    Alert,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LogoutIcon from '@mui/icons-material/Logout'
import { useDisconnect, useWalletClient, useConnect, useAccount } from 'wagmi'
import { useState } from 'react'
import { isMobile } from '../utils/mobile'

const shortenAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`

export const WalletSection = () => {
    const { data: walletClient, isLoading: isLoadingWallet } = useWalletClient()
    const { address: accountAddress, status: accountStatus } = useAccount()
    const { disconnect } = useDisconnect()
    const { connect, connectors, isPending: isConnecting } = useConnect()
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'error'>('success')
    const [isMobileDevice] = useState(() => isMobile())

    const address = walletClient?.account?.address || accountAddress
    const injected = connectors.find((c) => c.id === 'injected')

    // Show skeleton only if:
    // 1. We're actively connecting (isConnecting) AND don't have address
    // 2. Status is connecting/reconnecting AND don't have address
    // 3. We're loading AND don't have address
    // NEVER show skeleton if we already have an address (wallet already connected)
    // This prevents the flash on first render when wallet is already connected
    const isLoading = 
        address ? false : (
            isConnecting || 
            accountStatus === 'connecting' || 
            accountStatus === 'reconnecting' || 
            isLoadingWallet
        )

    const handleCopyAddress = async () => {
        if (address) {
            try {
                await navigator.clipboard.writeText(address)
                setSnackbarMessage('Address copied to clipboard!')
                setSnackbarSeverity('success')
                setSnackbarOpen(true)
            } catch (err) {
                console.error('Failed to copy address:', err)
                setSnackbarMessage('Failed to copy address')
                setSnackbarSeverity('error')
                setSnackbarOpen(true)
            }
        }
    }

    const handleConnectWallet = async () => {
        if (isMobileDevice) {
            // For mobile, check if MetaMask mobile browser is available
            const ethereum = typeof window !== 'undefined' ? (window as Window & { ethereum?: unknown }).ethereum : undefined
            if (ethereum && injected) {
                // MetaMask mobile browser detected, use injected connector
                connect({ connector: injected })
            } else {
                // No injected provider, guide user to use MetaMask mobile browser
                setSnackbarMessage('Please open this site in MetaMask mobile browser (Menu > Browser) or install MetaMask app')
                setSnackbarSeverity('info')
                setSnackbarOpen(true)
                
                // Also try to open MetaMask app link as fallback
                const currentUrl = window.location.href
                const metamaskAppDeepLink = `https://metamask.app.link/dapp/${encodeURIComponent(currentUrl)}`
                
                // Try to open MetaMask app after a short delay
                setTimeout(() => {
                    try {
                        window.location.href = metamaskAppDeepLink
                    } catch (err) {
                        console.error('Failed to open MetaMask:', err)
                    }
                }, 500)
            }
        } else {
            // Desktop: use injected connector
            if (injected) {
                connect({ connector: injected })
            } else {
                // No injected wallet found
                setSnackbarMessage('Please install MetaMask browser extension')
                setSnackbarSeverity('info')
                setSnackbarOpen(true)
            }
        }
    }

    return (
        <Card
            sx={{
                borderRadius: 4,
                background: '#111',
                border: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            <CardContent>
                {isLoading ? (
                    <Stack spacing={3}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Skeleton
                                    variant="text"
                                    width={120}
                                    height={20}
                                    sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                                />
                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                    <Skeleton
                                        variant="circular"
                                        width={8}
                                        height={8}
                                        sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={140}
                                        height={24}
                                        sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                                    />
                                </Box>
                            </Box>
                            <Skeleton
                                variant="rounded"
                                width={60}
                                height={24}
                                sx={{ borderRadius: 2, bgcolor: 'rgba(255,255,255,0.08)' }}
                            />
                        </Box>

                        <Box
                            sx={{
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 3,
                                px: 2,
                                py: 1.5,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Skeleton
                                variant="text"
                                width={100}
                                height={24}
                                sx={{
                                    fontFamily: 'monospace',
                                    bgcolor: 'rgba(255,255,255,0.08)',
                                }}
                            />
                            <Skeleton
                                variant="circular"
                                width={32}
                                height={32}
                                sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                            />
                        </Box>

                        <Skeleton
                            variant="rounded"
                            width="100%"
                            height={40}
                            sx={{ borderRadius: 2, bgcolor: 'rgba(255,255,255,0.08)' }}
                        />
                    </Stack>
                ) : !address ? (
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h6">No Wallet Connected</Typography>

                        {isMobileDevice ? (
                            <Stack spacing={2} alignItems="center" width="100%">
                                <Button
                                    variant="contained"
                                    onClick={handleConnectWallet}
                                    sx={{ textTransform: 'none', width: '100%' }}
                                    disabled={isConnecting}
                                >
                                    {isConnecting ? 'Connecting...' : 'Connect with MetaMask'}
                                </Button>
                                <Typography variant="caption" color="text.secondary" textAlign="center" px={2}>
                                    Make sure you have MetaMask mobile app installed
                                </Typography>
                            </Stack>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleConnectWallet}
                                sx={{ textTransform: 'none' }}
                                disabled={!injected || isConnecting}
                            >
                                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                            </Button>
                        )}
                    </Stack>
                ) : (
                    <Stack spacing={3}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Connected Wallet
                                </Typography>

                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                    <Box
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: '#22c55e',
                                        }}
                                    />
                                    <Typography fontWeight={500}>Ethereum Mainnet</Typography>
                                </Box>
                            </Box>

                            <Chip
                                label="Active"
                                size="small"
                                sx={{
                                    backgroundColor: 'rgba(34,197,94,0.15)',
                                    color: '#22c55e',
                                    fontWeight: 500,
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 3,
                                px: 2,
                                py: 1.5,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ fontFamily: 'monospace' }}>
                                {shortenAddress(address)}
                            </Typography>

                            <IconButton
                                size="small"
                                onClick={handleCopyAddress}
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<LogoutIcon />}
                            onClick={() => disconnect()}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                            }}
                        >
                            Disconnect Wallet
                        </Button>
                    </Stack>
                )}
            </CardContent>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{
                        width: '100%',
                        backgroundColor: '#151515',
                        color: '#fff',
                        '& .MuiAlert-icon': {
                            color: snackbarSeverity === 'success' ? '#22c55e' : snackbarSeverity === 'error' ? '#ef4444' : '#3b82f6',
                        },
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Card>
    )
}
