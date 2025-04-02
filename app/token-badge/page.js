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
    const [network, setNetwork] = useState("bsc");
    const [address, setAddress] = useState("0x55d398326f99059ff775485246999027b3197955");
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
            return `$${(num / 1e12).toFixed(2)} T USD`;
        } else if (num >= 1e9) {
            return `$${(num / 1e9).toFixed(2)} B USD`;
        } else if (num >= 1e6) {
            return `$${(num / 1e6).toFixed(2)} M USD`;
        } else {
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
                            <div className='col-md-6 ticker'>
                                <h3 className='Widgettitles'>Coin Ticker Widget</h3>
                                <div className="flex">
                                    <label>Show Primary Ticker Symbol?</label>
                                    <input type="checkbox" checked={tikckerSymbol} onChange={() => setTickerSymbol(prev => !prev)} className="w-1/2 h-1/2  border rounded-full" />
                                </div>
                                <div className="flex">
                                    <label>Show Market Cap?</label>
                                    <input type="checkbox" checked={marketCap} onChange={() => setMarketCap(prev => !prev)} className="w-1/2 h-1/2 border rounded-full"/>
                                </div>

                                <div className="flex">
                                    <label>Show Volume (24h)?</label>
                                    <input type="checkbox" checked={volume24} onChange={() => setVolume24(prev => !prev)} className="w-1/2 h-1/2 border rounded-full"
                                    />
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <h3 className='Widgettitles'>Widget Preview</h3>
                                <div className='badgebox'>
                                    <p className='tokendiv'>
                                        {tokenData.attributes.image_url && <img src={tokenData.attributes.image_url} alt="Token Logo" />}
                                        <span className='tokenname'>{tokenData.attributes.name}</span>
                                        {tikckerSymbol && <span className='tokennamesymbl'>({tokenData.attributes.symbol})</span>}
                                        <br />
                                        <span className='price'>
                                            {parseFloat(tokenData.attributes.price_usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <strong>USD</strong>
                                            <b>({((tokenData.attributes.volume_usd.h24 / tokenData.attributes.market_cap_usd) * 100).toFixed(2)}%)</b>
                                        </span>
                                    </p>
                                    <ul>
                                        <li>
                                            <h4>Total Supply</h4>
                                            <span>{parseFloat(tokenData.attributes.total_supply / 1e18).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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

                                    <p className='decimalmain'>
                                        <span className='decimal'>Decimal : <b>{tokenData.attributes.decimals}</b></span>
                                        <span className='holders'>Holders : <b>{tokenData.holders.length}</b></span>
                                    </p>
                                    <p className='powerdby'>Powered by DeployTokens</p>
                                </div>

                                <h3 className='Widgettitle'>Website Widget</h3>
                                <div className='widgetbox'>
                                    <div className="html">
                                        <span className="hljs-tag">&lt;
                                            <span className="hljs-name">script</span>
                                            <span className="hljs-attr"> type</span>
                                            =
                                            <span className="hljs-string">"text/javascript"</span>
                                            <span className="hljs-attr"> src</span>
                                            =
                                            <span className="hljs-string">"https://files.deploytokens.com/static/widget/currency.js"</span>
                                            &gt;
                                        </span>
                                        <span className="hljs-tag">
                                            &lt;/
                                            <span className="hljs-name">script</span>
                                            &gt;
                                        </span>
                                        <span className="hljs-tag">
                                            &lt;
                                            <span className="hljs-name">div</span>
                                            <span className="hljs-attr"> class</span>
                                            =
                                            <span className="hljs-string">"deploytokens-currency-widget"</span>
                                            <span className="hljs-attr"> data-currencyid</span>
                                            =
                                            <span className="hljs-string">"1"</span>
                                            <span className="hljs-attr"> data-base</span>
                                            =
                                            <span className="hljs-string">"USD"</span>
                                            <span className="hljs-attr"> data-secondary</span>
                                            =
                                            <span className="hljs-string">
                                                ""
                                            </span>
                                            <span className="hljs-attr"> data-ticker</span>
                                            =
                                            <span className="hljs-string">
                                                "{tikckerSymbol.toString()}"
                                            </span>
                                            <span className="hljs-attr"> data-marketcap</span>
                                            =
                                            <span className="hljs-string">{marketCap.toString()}</span>
                                            <span className="hljs-attr"> data-volume</span>
                                            =
                                            <span className="hljs-string">"{volume24.toString()}"</span>
                                            <span className="hljs-attr">data-statsticker</span>
                                            =
                                            <span className="hljs-string">"true"</span>
                                            &gt;</span>
                                        <span className="hljs-tag">
                                            &lt;/
                                            <span className="hljs-name">div</span>
                                            &gt;
                                        </span>
                                    </div>
                                </div>

                                <div className='widget'>
                                    <script type="text/javascript" src="https://files.coinmarketcap.com/static/widget/currency.js"></script>
                                    <div className="coinmarketcap-currency-widget" data-currencyid="1" data-base="USD"
                                        data-secondary="" data-ticker="true" data-rank="true" data-marketcap="true"
                                        data-volume="true" data-statsticker="true" data-stats="USD">
                                    </div>
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