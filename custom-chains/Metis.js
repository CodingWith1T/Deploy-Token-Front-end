import { defineChain } from 'viem';

const Metis = defineChain({
  id: 1088, // Replace with the actual chain ID
  name: 'Metis',
  network: 'METIS',
  rpcUrls: {
    default: {
      http: ['https://metis-pokt.nodies.app'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'Metis',
    symbol: 'METIS',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Metis',
      url: 'https://explorer.metis.io/', // Replace with the actual explorer URL
    },
  },
  iconUrl: './assets/images/chain_img/metis.png', // Use the imported image directly
});

export default Metis;