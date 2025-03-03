import { defineChain } from 'viem';

const opBNB = defineChain({
  id: 204, // Replace with the actual chain ID
  name: 'opBNB Mainnet',
  network: 'BNB',
  rpcUrls: {
    default: {
      http: ['https://1rpc.io/opbnb'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'opBNB Mainnet',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'opBNB Mainnet',
      url: 'https://opbnbscan.com/', // Replace with the actual explorer URL
    },
  },
  iconUrl: '/assets/images/chain_img/opbnb.png', // Use the imported image directly
});

export default opBNB;