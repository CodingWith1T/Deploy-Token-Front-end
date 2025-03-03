import { defineChain } from 'viem';

const UniChian = defineChain({
  id: 130, // Replace with the actual chain ID
  name: 'Uni',
  network: 'ETH',
  rpcUrls: {
    default: {
      http: ['https://mainnet.unichain.org'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'Uni',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'UniChian Explorer',
      url: 'https://uniscan.xyz/', // Replace with the actual explorer URL
    },
  },
  iconUrl: '/assets/images/unichain.webp', // Use the imported image directly
});

export default UniChian;