"use client"
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

// Chain mapping with RPC URLs and logos for each network
const CHAIN_MAPPING = {
    'ethereum': { name: 'Ethereum', rpcUrl: 'https://rpc.mevblocker.io/', logo: '1-DLc6yFb9.png' },
    'binance-smart-chain': { name: 'BNB Smart Chain', rpcUrl: 'https://bsc-dataseed1.binance.org:443', logo: 'chain_img/bnb.png' },
    'base': { name: 'Base', rpcUrl: 'https://base-rpc.publicnode.com', logo: 'chain_img/base.png' },
    'arbitrum-one': { name: 'Arbitrum One', rpcUrl: 'https://arb1.arbitrum.io/rpc', logo: 'chain_img/arbitrum.png' },
    'optimism': { name: 'Optimism', rpcUrl: 'https://mainnet.optimism.io', logo: 'chain_img/op.png' },
    'polygon': { name: 'Polygon', rpcUrl: 'https://polygon-rpc.com', logo: 'chain_img/polygon.png' },
    'alvey': { name: 'Alvey', rpcUrl: 'https://elves-core3.alvey.io', logo: 'alvay.webp' },
    'soneium': { name: 'Soneium', rpcUrl: 'https://soneium.drpc.org', logo: 'soneium.png' },
    'core': { name: 'Core', rpcUrl: 'https://rpc.coredao.org', logo: 'Core.png' },
    'blast': { name: 'Blast', rpcUrl: 'https://blast-rpc.publicnode.com', logo: 'chain_img/blast.png' },
    'opbnb': { name: 'OP BNB', rpcUrl: 'https://rpc.opbnb.com', logo: 'chain_img/opbnb.png' },
    'zksync': { name: 'zkSync', rpcUrl: 'https://1rpc.io/zksync2-era', logo: 'ZkSync.png' },
    'avalanche': { name: 'Avalanche', rpcUrl: 'https://api.avax.network/ext/bc/C/rpc', logo: 'Avalanche.png' },
    'mantle': { name: 'Mantle', rpcUrl: 'https://1rpc.io/mantle', logo: 'Mantle.png' },
    'sonic': { name: 'Sonic', rpcUrl: 'https://rpc.ankr.com/sonic_mainnet	', logo: 'Sonic.png' },
    'pulsechain': { name: 'PulseChain', rpcUrl: 'https://rpc.pulsechain.com', logo: 'Pulsechain.png' },
    'abstract': { name: 'Abstract', rpcUrl: 'https://api.mainnet.abs.xyz', logo: 'Abstract.png' },
    'linea': { name: 'Linea', rpcUrl: 'https://1rpc.io/linea', logo: 'Linea.png' },
    'unichain': { name: 'Unichain', rpcUrl: 'https://unichain.api.onfinality.io/public', logo: 'unichain.webp' },
    //   'binance-smart-chain-testnet': { name: 'BNB Smart Chain Testnet', rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545', logo: 'chain_img/bnb.png' },
    //   'sepolia': { name: 'Sepolia', rpcUrl: 'https://sepolia.infura.io/v3/2c714cfad8a2dd87aca80dddc0e2d717', logo: 'sepolia-DY1y1bSg.png' },

    // Variations
    'op-mainnet': { name: 'OP Mainnet', rpcUrl: 'https://mainnet.optimism.io', logo: 'chain_img/op.png' },
    'zksync-era': { name: 'zkSync Era', rpcUrl: 'https://rpc.zksync.io', logo: 'ZkSync.png' }
};

const MultiChainBalanceChecker = () => {
    // Set default wallet address
    const defaultAddress = '0xCF3a6070760cce17c8b876e4C1777539629115Bb';

    // State variables
    const [address, setAddress] = useState(defaultAddress);
    const [balances, setBalances] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [prices, setPrices] = useState({});

    // Fetch the prices of all tokens
    const fetchPrices = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,polygon,arbitrum,optimism,avalanche,matic,core,pulsechain,alvey,soneium,blast&vs_currencies=usd');
            setPrices(response.data);
        } catch (error) {
            console.error("Error fetching prices", error);
        }
    };

    useEffect(() => {
        fetchPrices();
    }, []);

    // Function to fetch balance for a given chain
    const getBalance = async (chain, provider) => {
        try {
            const balance = await provider.getBalance(address);
            return ethers.formatUnits(balance, 18);
        } catch (err) {
            console.error(`Error fetching balance for ${chain}:`, err);
            return null;
        }
    };

    // Function to handle form submission and check balances across multiple chains
    const handleCheckBalance = async () => {
        if (!ethers.isAddress(address)) {
            setError('Invalid Ethereum address');
            return;
        }

        setLoading(true);
        setBalances({});
        setError('');

        const newBalances = {};

        // Loop through the chains and fetch the balance for each one
        for (const [chain, { name, rpcUrl, logo }] of Object.entries(CHAIN_MAPPING)) {
            const provider = new ethers.JsonRpcProvider(rpcUrl);
            const balance = await getBalance(chain, provider);
            if (balance !== null) {
                let balanceInUSD = 0;
                switch (chain) {
                    case 'ethereum':
                        balanceInUSD = balance * (prices.ethereum?.usd || 0);
                        break;
                    case 'binance-smart-chain':
                        balanceInUSD = balance * (prices.binancecoin?.usd || 0);
                        break;
                    case 'polygon':
                        balanceInUSD = balance * (prices.polygon?.usd || 0);
                        break;
                    case 'arbitrum-one':
                        balanceInUSD = balance * (prices.arbitrum?.usd || 0);
                        break;
                    case 'optimism':
                        balanceInUSD = balance * (prices.optimism?.usd || 0);
                        break;
                    case 'avalanche':
                        balanceInUSD = balance * (prices.avalanche?.usd || 0);
                        break;
                    case 'pulsechain':
                        balanceInUSD = balance * (prices.pulsechain?.usd || 0);
                        break;
                    case 'alvey':
                        balanceInUSD = balance * (prices.alvey?.usd || 0);
                        break;
                    case 'soneium':
                        balanceInUSD = balance * (prices.soneium?.usd || 0);
                        break;
                    case 'blast':
                        balanceInUSD = balance * (prices.blast?.usd || 0);
                        break;
                    default:
                        balanceInUSD = 0;
                }

                newBalances[chain] = { name, balance: parseFloat(balance), balanceInUSD, logo };
            }
        }

        setBalances(newBalances);
        setLoading(false);
    };

    useEffect(() => {
        if (ethers.isAddress(address)) {
            handleCheckBalance();
        }
    }, [address]);

    return (
        <section className='Balancechecker'>
            <div className="container">
                <div className='Createtheading'>
                    <h1 className="header">Multi Chain Balance Checker</h1>
                    <p>
                        Easily check balances across multiple blockchains with <strong>DeployTokens.com</strong>. Multi-Chain Balance Checker. Enter your wallet address to view real-time balances on Ethereum, BNB Chain, Polygon, and more—no login required. Stay on top of your crypto holdings effortlessly!</p>
                </div>
                <div className='Balancecheckerformbox'>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Enter wallet address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input-field"
                        />
                        <hr></hr>
                    </div>

                    {loading && <>
                        <div className="loader"></div>
                    </>}
                    {error && <p className="error-text">{error}</p>}

                    <div className="grid-container">
                        {Object.entries(balances).map(([chain, { name, balance, balanceInUSD, logo }]) => (
                            <div className="grid-item" key={chain}>
                                <img src={`/assets/images/${logo}`} alt={name} className="w-6 h-6" />
                                <h3 className="chain-name">{name}</h3>
                                <p className="balance">
                                    {balance.toFixed(4)}
                                    (${balanceInUSD.toFixed(2)})
                                </p>
                            </div>
                        ))}
                        <div className='clearfix'></div>
                    </div>
                    <div className='clearfix'></div>
                </div>
                <div className='clearfix'></div>
            </div>
        </section>
    );
};

export default MultiChainBalanceChecker;
