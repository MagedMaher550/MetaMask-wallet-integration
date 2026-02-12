import { Card, CardContent, Typography } from '@mui/material'

export const WalletSection = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    Wallet Status
                </Typography>
                <Typography variant="body2">
                    Not connected
                </Typography>
            </CardContent>
        </Card>
    )
}
