'use client';

import React, { useEffect, useState } from 'react';

const TokenBadge = () => {
    // const [networkList, setNetworkList] = useState([]);
    const networkList = [
        { "id": "eth", "name": "Ethereum" },
        { "id": "bsc", "name": "BNB Chain" },
        { "id": "base", "name": "Base" },
        { "id": "arbitrum", "name": "Arbitrum" },
        { "id": "optimism", "name": "Optimism" },
        { "id": "polygon_pos", "name": "Polygon POS" },
        { "id": "avax", "name": "Avalanche" },
        { "id": "core", "name": "Core" },
        { "id": "zksync", "name": "ZkSync" },
        { "id": "mantle", "name": "Mantle" },
        { "id": "pulsechain", "name": "PulseChain" },
        { "id": "linea", "name": "Linea" }
    ];
    const [network, setNetwork] = useState("");
    const [address, setAddress] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [tokenData, setTokenData] = useState(null);
    const [tikckerSymbol, setTickerSymbol] = useState(true);  // Default to true (checked)
    const [marketCap, setMarketCap] = useState(true);  // Default to true (checked)
    const [volume24, setVolume24] = useState(true);  // Default to true (checked)

    const handleAddressInput = (value) => {
        setAddress(value);
        setIsValid(/^0x[a-fA-F0-9]{40}$/.test(value));
    };

    const handleCreateBadge = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://api.geckoterminal.com/api/v2/networks/${network}/tokens/${address}`
            );
            const result = await response.json();
            const response1 = await fetch(
                `https://deep-index.moralis.io/api/v2.2/erc20/${address}/owners?chain=${network}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY,
                    }
                }
            );
            const result1 = await response1.json();
            result.data.holders = result1.result
            setTokenData(result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('https://api.geckoterminal.com/api/v2/networks');
    //             const result = await response.json();
    //             setNetworkList(result.data);
    //         } catch (error) {
    //             console.warn({ error });
    //         }
    //     };
    //     fetchData();
    // }, []);

    const formatCurrency = (amount) => {
        const num = parseFloat(amount);
        if (num >= 1e12) {
            // Trillion (T)
            return `$${(num / 1e12).toFixed(2)} T USD`;
        } else if (num >= 1e9) {
            // Billion (B)
            return `$${(num / 1e9).toFixed(2)} B USD`;
        } else if (num >= 1e6) {
            // Million (M)
            return `$${(num / 1e6).toFixed(2)} M USD`;
        } else {
            // For numbers less than 1 million, keep it in regular format
            return `$${num.toLocaleString()} USD`;
        }
    };

    return (
        <>
            <div className='tokenbadge'>
                <h1>Token Badge</h1>
                <select value={network} onChange={(e) => setNetwork(e.target.value)}>
                    <option value="">Select a chain</option>
                    {networkList.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {network && (
                    <>
                        <label>Enter address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => handleAddressInput(e.target.value)}
                            placeholder="Enter 0x address"
                        />
                        {!isValid && <p style={{ color: 'red' }}>Invalid Ethereum address</p>}

                        <button type="button" onClick={handleCreateBadge}>
                            Get Data
                        </button>
                    </>
                )}<br />

                {tokenData && (
                    <div className='container badgeboxdiv'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='badgebox'>
                                    <p className='tokendiv'>
                                        <img src={tokenData.attributes.image_url || ''} alt="Token Logo" />
                                        <span className='tokenname'>{tokenData.attributes.name}</span>
                                        {tikckerSymbol && <span className='tokennamesymbl'>({tokenData.attributes.symbol})</span>}<br />
                                        <span className='price'>
                                            {tokenData.attributes.price_usd} <strong>USD</strong>
                                            <b>({((tokenData.attributes.volume_usd.h24 / tokenData.attributes.market_cap_usd) * 100).toFixed(2)}%)</b>
                                        </span>
                                    </p>
                                    <ul>
                                        <li>
                                            <h4>Total Supply</h4>
                                            <span>{(parseFloat(tokenData.attributes.total_supply) / 1e18).toFixed(2)}</span>
                                        </li>
                                        {marketCap &&
                                            <li>
                                                <h4>Market Cap</h4>
                                                <span>{formatCurrency(tokenData.attributes.market_cap_usd)}</span>
                                            </li>
                                        }
                                        {volume24 &&
                                            <li>
                                                <h4>24 hr volume</h4>
                                                <span>{formatCurrency(tokenData.attributes.volume_usd.h24)}</span>
                                            </li>
                                        }
                                    </ul>
                                    
                                    <p>
                                        <span className='decimal'>Decimal : <b>{tokenData.attributes.decimals}</b></span>
                                        <span className='holders'>Holders : <b>{tokenData.holders.length}</b></span>
                                    </p>
                                    <p className='powerdby'>Powered by DeployTokens</p>
                                </div>
                                <div className="flex">
                                    <label>Show Primary Ticker Symbol?</label>
                                    <input
                                        type="checkbox"
                                        checked={tikckerSymbol}  // Bind the checkbox to tikckerSymbol state
                                        onChange={() => setTickerSymbol(prev => !prev)} // Toggle the state value
                                        className="w-1/2 h-1/2 border rounded-full"
                                    />
                                </div>
                                <div className="flex">
                                    <label>Show Market Cap?</label>
                                    <input
                                        type="checkbox"
                                        checked={marketCap}  // Bind the checkbox to tikckerSymbol state
                                        onChange={() => setMarketCap(prev => !prev)} // Toggle the state value
                                        className="w-1/2 h-1/2 border rounded-full"
                                    />
                                </div>

                                <div className="flex">
                                    <label>Show Volume (24h)?</label>
                                    <input
                                        type="checkbox"
                                        checked={volume24}  // Bind the checkbox to tikckerSymbol state
                                        onChange={() => setVolume24(prev => !prev)} // Toggle the state value
                                        className="w-1/2 h-1/2 border rounded-full"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                )}


            </div>
        </>
    );
};

export default TokenBadge;