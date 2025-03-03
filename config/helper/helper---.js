'use client'; // This makes sure it's treated as a Client Component

import React from 'react';

// Updated chain mapping object with symbols for each chain
const CHAIN_MAPPING = {
  'ethereum': { 
    name: 'Ethereum', 
    rpcUrl: 'https://rpc.mevblocker.io/', 
    logo: '1-DLc6yFb9.png', 
    chainId: '1',
    symbol: 'ETH'  // Added symbol for Ethereum
  },
  'binance-smart-chain': { 
    name: 'BNB Smart Chain', 
    rpcUrl: 'https://bsc-dataseed1.binance.org:443', 
    logo: 'chain_img/bnb.png', 
    chainId: '56',
    symbol: 'BNB'  // Added symbol for Binance Smart Chain
  },
  'base': { 
    name: 'Base', 
    rpcUrl: 'https://base-rpc.publicnode.com', 
    logo: 'chain_img/base.png', 
    chainId: '8453',
    symbol: 'BASE'  // Added symbol for Base
  },
  'arbitrum-one': { 
    name: 'Arbitrum One', 
    rpcUrl: 'https://arb1.arbitrum.io/rpc', 
    logo: 'chain_img/arbitrum.png', 
    chainId: '42161',
    symbol: 'ETH'  // Arbitrum uses Ethereum symbol
  },
  'optimism': { 
    name: 'Optimism', 
    rpcUrl: 'https://mainnet.optimism.io', 
    logo: 'chain_img/op.png', 
    chainId: '10',
    symbol: 'ETH'  // Optimism uses Ethereum symbol
  },
  'polygon': { 
    name: 'Polygon', 
    rpcUrl: 'https://polygon-rpc.com', 
    logo: 'chain_img/polygon.png', 
    chainId: '137',
    symbol: 'MATIC'  // Added symbol for Polygon
  },
  'alvey': { 
    name: 'Alvey', 
    rpcUrl: 'https://elves-core3.alvey.io', 
    logo: 'alvay.webp', 
    chainId: '3797',
    symbol: 'ALVEY'  // Added symbol for Alvey
  },
  'soneium': { 
    name: 'Soneium', 
    rpcUrl: 'https://soneium.drpc.org', 
    logo: 'soneium.png', 
    chainId: '1868',
    symbol: 'SON'  // Added symbol for Soneium
  },
  'core': { 
    name: 'Core', 
    rpcUrl: 'https://rpc.coredao.org', 
    logo: 'Core.png', 
    chainId: '1116',
    symbol: 'CORE'  // Added symbol for Core
  },
  'blast': { 
    name: 'Blast', 
    rpcUrl: 'https://blast-rpc.publicnode.com', 
    logo: 'chain_img/blast.png', 
    chainId: '81457',
    symbol: 'BLAST'  // Added symbol for Blast
  },
  'opbnb': { 
    name: 'OP BNB', 
    rpcUrl: 'https://rpc.opbnb.com', 
    logo: 'chain_img/opbnb.png', 
    chainId: '204',
    symbol: 'OPBNB'  // Added symbol for OP BNB
  },
  'zksync': { 
    name: 'zkSync', 
    rpcUrl: 'https://1rpc.io/zksync2-era', 
    logo: 'ZkSync.png', 
    chainId: '324',
    symbol: 'ZKS'  // Added symbol for zkSync
  },
  'avalanche': { 
    name: 'Avalanche', 
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc', 
    logo: 'Avalanche.png', 
    chainId: '43114',
    symbol: 'AVAX'  // Added symbol for Avalanche
  },
  'mantle': { 
    name: 'Mantle', 
    rpcUrl: 'https://1rpc.io/mantle', 
    logo: 'Mantle.png', 
    chainId: '5000',
    symbol: 'MNT'  // Added symbol for Mantle
  },
  'sonic': { 
    name: 'Sonic', 
    rpcUrl: 'https://rpc.ankr.com/sonic_mainnet', 
    logo: 'Sonic.png', 
    chainId: '146',
    symbol: 'SONIC'  // Added symbol for Sonic
  },
  'pulsechain': { 
    name: 'PulseChain', 
    rpcUrl: 'https://rpc.pulsechain.com', 
    logo: 'Pulsechain.png', 
    chainId: '369',
    symbol: 'PLS'  // Added symbol for PulseChain
  },
  'abstract': { 
    name: 'Abstract', 
    rpcUrl: 'https://api.mainnet.abs.xyz', 
    logo: 'Abstract.png', 
    chainId: '2741',
    symbol: 'ABSTRACT'  // Added symbol for Abstract
  },
  'linea': { 
    name: 'Linea', 
    rpcUrl: 'https://1rpc.io/linea', 
    logo: 'Linea.png', 
    chainId: '59144',
    symbol: 'LINEA'  // Added symbol for Linea
  },
  'unichain': { 
    name: 'Unichain', 
    rpcUrl: 'https://unichain.api.onfinality.io/public', 
    logo: 'unichain.webp', 
    chainId: '130',
    symbol: 'UNI'  // Added symbol for Unichain
  },
  // Variations
  'op-mainnet': { 
    name: 'OP Mainnet', 
    rpcUrl: 'https://mainnet.optimism.io', 
    logo: 'chain_img/op.png', 
    chainId: '10',
    symbol: 'ETH'  // OP Mainnet uses Ethereum symbol
  },
};

export default function Page() {
  // Function to add a network to MetaMask
  const addToMetaMask = async (network) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${parseInt(network.chainId, 10).toString(16)}`, // Convert chainId to hex
              chainName: network.name,
              nativeCurrency: {
                name: network.name,
                symbol: network.symbol,  // Use symbol instead of name
                decimals: 18,
              },
              rpcUrls: [network.rpcUrl],
              blockExplorerUrls: [`https://etherscan.io`], // Adjust if needed
            },
          ],
        });
        alert(`${network.name} added to MetaMask!`);
      } catch (error) {
        console.error('Failed to add network:', error);
        alert('Failed to add network to MetaMask.');
      }
    } else {
      alert('MetaMask is not installed.');
    }
  };

  return (
    <section className="chainslist">
      <div className="container">
        <div className="Createtheading">
          <div className="banner">
            <img src="/assets/images/banner.png" alt="Logo" />
          </div>
          <h1 className="header">Chains List</h1>
          <p>
            Find information such as active RPCs, chain ID, symbol, block explorers and testnet faucets about any EVM networks. Add any custom networks to your MetaMask wallet in one click.
          </p>
        </div>

        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input type="text" className="form-control" placeholder="ETH, Matic..." />
        </div>

        <h3>Chains list</h3>
        <ul>
          {Object.keys(CHAIN_MAPPING).map((chainKey) => {
            const network = CHAIN_MAPPING[chainKey];
            return (
              <li key={chainKey}>
                <div className="row">
                  <div className="col-md-7 logodiv">
                    <img src={`/assets/images/${network.logo}`} alt="Logo" />
                    <span>{network.name}</span>
                  </div>
                  <div className="col-md-5 lts">
                    <span className="bg1">
                      <b>Chain ID</b> <br />
                      {network.chainId}
                    </span>
                    <span className="bg2">
                      <b>Currency</b> <br />
                      {network.symbol}  {/* Displaying the currency symbol */}
                    </span>
                    <span className="metamaskbutton">
                      <button
                        onClick={() => addToMetaMask(network)}
                        className="btn btn-primary"
                      >
                        <span className='metamaskbutton'>Add to MetaMask</span>
                      </button>
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
