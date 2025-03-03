import { defineChain } from 'viem';

const ArbitrumNova = defineChain({
  id: 42170, // Replace with the actual chain ID
  name: 'Arbitrum Nova',
  network: 'ETH',
  rpcUrls: {
    default: {
      http: ['https://arbitrum-nova-rpc.publicnode.com'], // Use an array for the HTTP URL
    },
  },
  nativeCurrency: {
    name: 'Arbitrum Nova',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'Arbitrum-Nova',
      url: 'https://opbnbscan.com/', // Replace with the actual explorer URL
    },
  },
  iconUrl: './assets/images/chain_img/arbitrumNova.png', // Use the imported image directly
});

export default ArbitrumNova;