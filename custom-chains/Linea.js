import { defineChain } from 'viem';

const Lenia = defineChain({
  id: 59144, // Replace with the actual chain ID
  name: 'Lenia',
  network: 'ETH',
  rpcUrls: {
    default: {
      http: ['https://linea.drpc.org'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'Lenia',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Lenia Explorer',
      url: 'https://lineascan.build/', // Replace with the actual explorer URL
    },
  },
  iconUrl: '/assets/images/Linea.png', // Use the imported image directly
});

export default Lenia;