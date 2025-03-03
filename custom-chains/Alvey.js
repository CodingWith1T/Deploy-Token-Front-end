import { defineChain } from 'viem';

const Alvey = defineChain({
  id: 3797, // Replace with the actual chain ID
  name: 'Alvey',
  network: 'ALV',
  rpcUrls: {
    default: {
      http: ['https://elves-core2.alvey.io'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'Alvey',
    symbol: 'ALV',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Alvey Explorer',
      url: 'https://alveyscan.com/', // Replace with the actual explorer URL
    },
  },
  iconUrl: '/assets/images/alvay.webp', // Use the imported image directly
});

export default Alvey;