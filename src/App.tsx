import { AppProviders } from './providers/AppProviders'
import { AppLayout } from './layout/AppLayout'
import { WalletSection } from './components/WalletSection'
import { BalanceSection } from './components/BalanceSection'

function App() {
  return (
    <AppProviders>
      <AppLayout>
        <WalletSection />
        <BalanceSection />
      </AppLayout>
    </AppProviders>
  )
}

export default App
