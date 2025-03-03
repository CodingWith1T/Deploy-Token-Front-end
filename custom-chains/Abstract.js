import { defineChain } from 'viem';

const Abstract = defineChain({
  id: 2741, // Replace with the actual chain ID
  name: 'Abstract',
  network: 'ETH',
  rpcUrls: {
    default: {
      http: ['https://api.mainnet.abs.xyz'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'Sonic',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Abstract Explorer',
      url: 'https://abscan.org/', // Replace with the actual explorer URL
    },
  },
  iconUrl: '/assets/images/Abstract.png', // Use the imported image directly
});

export default Abstract;