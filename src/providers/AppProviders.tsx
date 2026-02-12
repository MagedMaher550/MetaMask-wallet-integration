import type { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { wagmiConfig } from '../web3/config'
import { theme } from '../theme/theme'

const queryClient = new QueryClient()

type AppProvidersProps = {
    children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={wagmiConfig}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </WagmiProvider>
        </QueryClientProvider>
    )
}
