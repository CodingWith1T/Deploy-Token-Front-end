import { defineChain } from 'viem';

const Soneium = defineChain({
  id: 1868, // Replace with the actual chain ID
  name: 'Soneium',
  network: 'ETH',
  rpcUrls: {
    default: {
      http: ['https://rpc.soneium.org'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'Soneium',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Soneium Explorer',
      url: 'https://soneium.blockscout.com', // Replace with the actual explorer URL
    },
  },
  iconUrl: '/assets/images/soneium-chain.png', // Use the imported image directly
});

export default Soneium;