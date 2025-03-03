import { defineChain } from 'viem';

const Sonic = defineChain({
  id: 146, // Replace with the actual chain ID
  name: 'Sonic',
  network: 'S',
  rpcUrls: {
    default: {
      http: ['https://sonic-rpc.publicnode.com'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'Sonic',
    symbol: 'S',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Pulse Explorer',
      url: 'https://sonicscan.org/', // Replace with the actual explorer URL
    },
  },
  iconUrl: '/assets/images/Sonic.png', // Use the imported image directly
});

export default Sonic;