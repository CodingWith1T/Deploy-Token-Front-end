"use client"
import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { multicall, readContract } from "@wagmi/core";
import { config as wagmiconfig } from "../../wagmi";
import erc20Abi from "./erc20.json";
import lockAbi from "./lock.json";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const FormButton = ({ onClick, href, disabled, buttonName }) => {
    const { isConnected } = useAccount();

    const getButtonStyle = () => {
        if (buttonName === 'Approve') return 'bg-red-500 hover:bg-red-600';
        if (buttonName === 'Previous') return 'bg-gray-500 hover:bg-gray-600';
        return 'bg-blue-500 hover:bg-blue-600';
    };

    return isConnected ? (
        href ? (

            <a
                href={href}
                className={`clbtn inline-block px-4 py-2 text-white font-medium rounded-md ${getButtonStyle()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {buttonName}
            </a>
        ) : (
            <div className="lbtnbox">
                <button
                    onClick={onClick}
                    disabled={disabled}
                    className={`clbtn px-4 py-2 text-white font-medium rounded-md ${getButtonStyle()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {buttonName}
                </button>
            </div>
        )
    ) : (
        <ConnectButton />
    );
};

const locker = {
    '11155111': '0x7AF39aC33c2a873E81A754c4B292B8a537bBeDc4',
    '97': '0xa266Df3552FDE990976273bb943504d344684B8C',
    '56': '0xa43ef79D27a0aB7f4F2Fc7C9b1999cBBd3b06c6F',
    '1116': '0x18b4F74084F33aa7fBa058D7F623d4bf26A28906',
    '16507': '0x6E0Dcc442501c46098Ac010FC48B50c0f205f562',
    '8453': '0xa266Df3552FDE990976273bb943504d344684B8C',
}

const LockList = () => {
    const { chain, address } = useAccount();
    const { connectAsync } = useConnect()
    const { writeContractAsync, isPending, isSuccess } = useWriteContract();
    const [chainData, setChainData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chainId, setChainId] = useState(chain?.id || 97);
    const selectedChain = wagmiconfig.chains.find(c => c.id === chainId);
    const [page, setPage] = useState(1);
    const [tokenType, setTokenType] = useState(true);
    const [allMine, setAllMine] = useState(true);
    const [unlockHash, setUnlockHash] = useState(null);

    const lockContract = {
        address: locker[chainId],
        abi: lockAbi
    };

    // Pagination button states
    const [next, setNext] = useState(false);
    const prev = page === 1;

    // const formatAmount = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const fetchChainData = async () => {
        setLoading(true);
        if (!chain) {
            setAllMine(true)
        }
        try {
            // Fetch the count of locked tokens
            const end = allMine ? await readContract(wagmiconfig, {
                abi: lockAbi,
                address: locker[chainId],
                functionName: tokenType ? 'allNormalTokenLockedCount' : 'allLpTokenLockedCount',
                chainId
            }) : -1;

            const start = (page - 1) * 10; // Assuming page size is 10
            setNext(parseInt(end) < 10); // Disable next if less than 10 items

            // Fetch the lock info for the current page
            const result = await readContract(wagmiconfig, {
                ...lockContract,
                functionName: allMine ? (tokenType ? 'getCumulativeNormalTokenLockInfo' : 'getCumulativeLpTokenLockInfo') : (tokenType ? 'normalLocksForUser' : 'lpLocksForUser'),
                args: allMine ? [start, Math.min(start + 10, parseInt(end))] : [address], // Fetch in range
                chainId
            });

            const dataWithTokenNames = await Promise.all(
                result.reverse().map(async (item) => {
                    try {
                        const tokenContract = {
                            address: item.token,
                            abi: erc20Abi,
                        };
                        const results = await multicall(wagmiconfig, {
                            contracts: [
                                { ...tokenContract, functionName: 'name' },
                                { ...tokenContract, functionName: 'symbol' },
                                { ...tokenContract, functionName: 'decimals' },
                            ],
                            chainId
                        });

                        return { ...item, tokenName: results[0]?.result?.toString(), tokenSymbol: results[1]?.result?.toString(), tokenDecimals: results[2]?.result?.toString() };

                    } catch (tokenError) {
                        console.error('Failed to fetch token name:', tokenError);
                        return { ...item, tokenName: 'Unknown' };
                    }
                })
            );
            setChainData(dataWithTokenNames);
        } catch (err) {
            console.error('Failed to fetch data:', err);
            setChainData([]);
        } finally {
            setLoading(false);
        }
    };



    const handleUnlock = async (id) => {
        try {
            if (!address) {
                await connectAsync()
            }

            const data = await writeContractAsync({
                ...lockContract,
                chainID: parseInt(chain?.id, 10),
                args: [id],
                functionName: 'unlock',
            })
            setUnlockHash(data);
        }
        catch (error) {
            setUnlockHash(null);
            console.error({ error });
        }
    }

    useEffect(() => {
        fetchChainData();
    }, [page, chainId, tokenType, allMine]);

    const handleNext = () => {
        setPage((prev) => prev + 1);
    };

    const handlePrevious = () => {
        setPage((prev) => prev - 1);
    };

    return (
        <div className="container locklist">
            <>
                <div className="topbutton">
                    {chain && (
                        <select
                            className="px-4 py-2 border rounded"
                            value={allMine}
                            onChange={(e) => setAllMine(e.target.value === "true")}
                        >
                            <option value="true">All Token</option>
                            <option value="false">My Token</option>
                        </select>
                    )}
                    {allMine && (
                        <select
                            className="px-4 py-2 border rounded"
                            value={chainId}
                            onChange={(e) => setChainId(Number(e.target.value))}
                        >
                            {wagmiconfig.chains.map((chain) => (
                                <option key={chain.id} value={chain.id}>
                                    {chain.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <select
                        className="px-4 py-2 border rounded"
                        value={tokenType ? "normal" : "lp"}
                        onChange={(e) => setTokenType(e.target.value === "normal")}
                    >
                        <option value="normal">Normal Token</option>
                        <option value="lp">LP Token</option>
                    </select>


                    <div>Page Number: {page}</div>
                </div>
                {loading ? (
                    <div>
                        <center className="text-danger">
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <br />
                        </center>
                    </div>
                ) : (
                    <>
                        {chainData.length > 0 ? (
                            <>
                                <table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Token Name(Symbol)</th>
                                            <th>Decimals</th>
                                            <th>Amount</th>
                                            <th>View</th>
                                            {chainData[0].tgeDate && <th>Unlock Date</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chainData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.tokenName}({item.tokenSymbol})</td>
                                                <td>{item.tokenDecimals}</td>
                                                <td>{(parseInt(item.amount) / 10 ** parseInt(item.tokenDecimals)).toString()}</td>
                                                <td>
                                                    <Link
                                                        href={`${selectedChain.blockExplorers.default.url}/address/${item.token}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {item.token}
                                                    </Link>
                                                </td>
                                                {
                                                    item.tgeDate && (
                                                        <td>
                                                            {parseInt(item.tgeDate) < Date.now() / 1000 ? (
                                                                <FormButton
                                                                    onClick={() => handleUnlock(item.id.toString())}
                                                                    disabled={parseInt(item.tgeDate) > Date.now() / 1000}
                                                                    buttonName={"Unlock"}
                                                                />
                                                            ) : (
                                                                `Can be unlocked after ${Math.floor((parseInt(item.tgeDate) - Date.now() / 1000) / 86400)} days and ${Math.floor(((parseInt(item.tgeDate) - Date.now() / 1000) % 86400) / 3600)} hours`
                                                            )}
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {unlockHash && <div>Unlock Hash: <Link href={`${chain?.blockExplorers.default.url}/tx/${unlockHash}`} target="_blank" rel="noopener noreferrer">{unlockHash}</Link></div>}
                                {allMine && <div className="pagination-controls">
                                    <button onClick={handlePrevious} disabled={prev} variant="secondary">Previous</button>
                                    <button onClick={handleNext} disabled={next} variant="primary">Next</button>
                                </div>}
                            </>
                        ) : (
                            <div>
                                <center className="text-danger">
                                    <p>No Locked {tokenType ? 'Normal' : 'LP'} tokens available for this chain. Please select a different chain.</p>
                                </center>
                            </div>
                        )}
                    </>
                )}
            </>
        </div>
    );
};

export default LockList;