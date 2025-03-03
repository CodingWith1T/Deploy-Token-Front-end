import { defineChain } from 'viem';

const PulseChain = defineChain({
  id: 369, // Replace with the actual chain ID
  name: 'PulseChain',
  network: 'PLS',
  rpcUrls: {
    default: {
      http: ['https://pulsechain-rpc.publicnode.com'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'PulseChain',
    symbol: 'PLS',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Pulse Explorer',
      url: 'https://scan.pulsechainfoundation.org/#/', // Replace with the actual explorer URL
    },
  },
  iconUrl: '/assets/images/Pulsechain.png', // Use the imported image directly
});

export default PulseChain;