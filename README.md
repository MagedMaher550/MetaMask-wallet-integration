# Web3 Wallet Dashboard

A modern, dark-themed Web3 wallet dashboard built with React and TypeScript. Connect your Ethereum wallet and view real-time balances for ETH and USDT tokens on Ethereum Mainnet.

## Features

- 🔗 **Wallet Connection**: Connect your MetaMask or other injected wallet providers
- 💰 **Balance Display**: View real-time ETH and USDT balances
- 📋 **Address Copy**: Copy wallet address to clipboard with visual feedback
- 🎨 **Modern UI**: Beautiful dark-themed interface with Material-UI components
- ⚡ **Loading States**: Smooth skeleton loaders during data fetching
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔒 **Secure**: Uses Wagmi v3 for secure wallet interactions

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Wagmi v3** - React Hooks for Ethereum
- **Viem** - TypeScript Ethereum library
- **Material-UI (MUI) v7** - Component library
- **React Query** - Data fetching and caching
- **Ethereum Mainnet** - Blockchain network

## Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- MetaMask or another Web3 wallet browser extension
- Infura API key (for Ethereum Mainnet RPC)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd getblocks-assesment
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory:
```env
VITE_INFURA_PROJECT_ID=your_infura_project_id_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your MetaMask or injected wallet
2. **View Balances**: Once connected, your ETH and USDT balances will be displayed automatically
3. **Copy Address**: Click the copy icon next to your wallet address to copy it to your clipboard
4. **Hide/Show Balance**: Toggle balance visibility using the "Hide Balance" / "Show Balance" button
5. **Disconnect**: Click "Disconnect Wallet" to disconnect your wallet

## Project Structure

```
src/
├── components/
│   ├── WalletSection.tsx    # Wallet connection and address display
│   └── BalanceSection.tsx    # ETH and USDT balance cards
├── layout/
│   └── AppLayout.tsx         # Main app layout wrapper
├── providers/
│   └── AppProviders.tsx     # React Query and Wagmi providers
├── theme/
│   └── theme.ts              # Material-UI theme configuration
├── web3/
│   ├── config.ts             # Wagmi configuration
│   └── constants.ts         # Web3 constants (USDT address, ABI)
├── App.tsx                   # Main app component
└── main.tsx                  # Application entry point
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_INFURA_PROJECT_ID` | Your Infura project ID for Ethereum Mainnet RPC | Yes |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Wallet Connection
- Supports injected wallet providers (MetaMask, Coinbase Wallet, etc.)
- Shows connection status and network information
- Displays shortened wallet address with copy functionality

### Balance Display
- Real-time ETH balance fetching
- USDT balance display (currently using ETH balance structure)
- Formatted balance display with proper decimal places
- Hide/Show balance toggle for privacy

### Loading States
- Skeleton loaders during wallet connection
- Skeleton loaders during balance fetching
- Prevents UI flashing during state transitions

### User Experience
- Snackbar notifications for successful actions
- Responsive design for all screen sizes
- Dark theme optimized for eye comfort

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Brave
- Other Chromium-based browsers

## Security Notes

- This app only reads wallet data - it does not request transaction permissions
- All wallet interactions are handled securely through Wagmi
- No private keys are stored or transmitted
- Always verify the app URL before connecting your wallet

## License

This project is private and proprietary.

## Contributing

This is an assessment project. For questions or issues, please contact the repository maintainer.
