import type { ReactNode } from 'react'
import { Container, Box } from '@mui/material'

type AppLayoutProps = {
    children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <Container maxWidth="sm">
            <Box
                minHeight="100vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                gap={4}
            >
                {children}
            </Box>
        </Container>
    )
}
