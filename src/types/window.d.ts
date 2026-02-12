/**
 * Extended Window interface to include Ethereum provider
 */
interface Window {
    ethereum?: {
        isMetaMask?: boolean
        request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
        [key: string]: unknown
    }
}

