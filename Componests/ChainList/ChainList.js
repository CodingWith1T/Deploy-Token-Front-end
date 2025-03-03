'use client'; // This makes sure it's treated as a Client Component

import React, { useEffect, useState } from 'react';

export default function ChainList() {
  const [chains, setChains] = useState([]); // To store the fetched chain data
  const [filteredChains, setFilteredChains] = useState([]); // To store the filtered chains based on search
  const [loading, setLoading] = useState(true); // Loading state for the API call
  const [searchTerm, setSearchTerm] = useState(''); // To handle the search input

  // Fetch chain data from the API
  useEffect(() => {
    const fetchChainData = async () => {
      try {
        const response = await fetch('https://blog.deploytokens.com/api/chinlist.php');
        const data = await response.json();
        setChains(data); // Set the chains data
        setFilteredChains(data); // Initially show all chains
        setLoading(false); // Set loading to false after fetching is complete
      } catch (error) {
        console.error('Error fetching chain data:', error);
        setLoading(false);
      }
    };

    fetchChainData();
  }, []);

  // Function to handle the search input change and filter chains
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter chains based on the search term (searching by name)
    const filtered = chains.filter((chain) =>
      chain.name.toLowerCase().includes(searchValue)
    );
    setFilteredChains(filtered);
  };

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
                name: network.nativeCurrency.name,
                symbol: network.nativeCurrency.symbol, // Use the symbol from API
                decimals: network.nativeCurrency.decimals, // Use decimals from API
              },
              rpcUrls: network.rpc, // Use the rpcUrls from the API
              blockExplorerUrls: network.explorers.map(explorer => explorer.url), // Extract explorer URLs
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

  // Render the loading state or the chains
  if (loading) {
    return (
      <div className="loading-text">
        Loading...
      </div>
    );
  }
  return (
    <section className="chainslist">
      <div className="container">
        <div className="Createtheading">
          <h1 className="header">Chains List</h1>
          <p>
          Explore detailed information about various EVM networks with Chainlist. Find active RPC endpoints, chain IDs, native symbols, block explorers, and testnet faucets for any Chainlist network. Easily add custom networks to your MetaMask wallet with a single click using Chainlist MetaMask integration, making your Web3 experience seamless and hassle-free.
          </p>
        </div>

        {/* Search Input */}
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name (ETH, Matic...)"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <h3>Chains list</h3>
        <ul>
          {filteredChains.map((network) => (
            <li key={network.chainId}>
              <div className="row">
                <div className="col-md-7 logodiv">
                  {/* Load the logo based on network.icon (this might need to be adjusted) */}
                  <img
                    src={`/assets/images/chainDummyLogo.svg`}  // Placeholder logo, you can change this as needed
                    alt="Logo"
                  />
                  <span>{network.name}</span>
                </div>
                <div className="col-md-5 lts">
                  <span className="bg1">
                    <b>Chain ID</b> <br />
                    {network.chainId}
                  </span>
                  <span className="bg2">
                    <b>Currency</b> <br />
                    {network.nativeCurrency.symbol}
                  </span>
                  <span className="metamaskbutton">
                    <button
                      onClick={() => addToMetaMask(network)}
                      className="btn btn-primary"
                    >
                      Add to MetaMask
                    </button>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
