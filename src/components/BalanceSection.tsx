import { Card, CardContent, Typography } from '@mui/material'

export const BalanceSection = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Balances
                </Typography>
                <Typography variant="body2">
                    Connect wallet to view balances
                </Typography>
            </CardContent>
        </Card>
    )
}
