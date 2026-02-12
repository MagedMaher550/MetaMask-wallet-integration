import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

const infuraProjectId = import.meta.env.VITE_INFURA_PROJECT_ID

export const wagmiConfig = createConfig({
    chains: [mainnet],
    connectors: [
        metaMask(),
    ],
    transports: {
        [mainnet.id]: http(
            `https://mainnet.infura.io/v3/${infuraProjectId}`
        ),
    },
})
