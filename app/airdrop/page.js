"use client"
import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useWriteContract } from 'wagmi';
import AirdropABI from '@/config/helper/AirdropABI.json';
import erc20Abi from "@/config/helper/erc20.json";
import { parseUnits } from 'viem';
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/wagmi";

export default function Page() {
    const { address, isConnected, chain } = useAccount();
    const { connectAsync } = useConnect(); // For connecting the wallet
    const { writeContractAsync, isPending } = useWriteContract(); // To write to the contract
    const [depositHash, setDepositHash] = useState(null); // To store the transaction hash
    const [depositAmount, setDepositAmount] = useState(''); // Amount input field for Ether or tokens
    const [recipientsInput, setRecipientsInput] = useState(''); // Recipients' Ethereum addresses
    const [tokenAddress, setTokenAddress] = useState(''); // Token address for ERC-20 tokens
    let [recipientValues, setRecipientValues] = useState(''); // Values to send to each recipient
    const [sendEther, setSendEther] = useState(false); // Toggle for Ether vs Token
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reset the transaction hash when a new deposit is being made
        setDepositHash(null);
        setError(null); // Clear any previous error
    }, [depositAmount, recipientsInput]);

    const handleRecipientsInputChange = (e) => {
        setRecipientsInput(e.target.value);

        // Parse recipients and values from input
        const entries = e.target.value.split('\n').map(entry => entry.trim()).filter(Boolean);

        const recipients = [];
        const values = [];

        let isValid = true;

        entries.forEach(entry => {
            const [address, value] = entry.split(',').map(item => item.trim());

            if (isNaN(value) || parseFloat(value) <= 0) {
                isValid = false;
            }

            // Push to recipients and values if valid
            if (address && value && !isNaN(value)) {
                recipients.push(address);
                values.push(value);
            }

        });
        if (isValid) {
            setRecipientValues(values);
            setError(null); // Clear error if validation passes
            setDepositAmount(values.reduce((acc, curr) => acc + parseFloat(curr), 0).toString()); // Total deposit amount
        } else {
            setError('Invalid address or value format. Ensure each entry is "address,value".');
        }
    };



    const handleSendEtherToggle = () => {
        setSendEther(!sendEther);
    };

    const handleDeposit = async () => {
        // Ensure the wallet is connected and is on the correct network
        if (!isConnected) {
            alert('Please connect your wallet and ensure it is on the correct network.');
            return;
        }

        // Parse recipients and values from the input
        const recipients = recipientsInput.split('\n').map(entry => entry.trim()).filter(Boolean);
        const recipients1 = recipients.map(entry => entry.split(',')[0].trim()).filter(Boolean);

        let values = recipientValues;

        // Check if recipientValues is an array (if it is, join into a string)
        if (Array.isArray(values)) {
            values = values.join('\n');
        }

        // Now, we can safely use split() on values
        values = values.split('\n').map(value => value.trim()).filter(Boolean);

        // Validate that recipients and values arrays have the same length
        if (recipients.length === 0 || values.length === 0 || recipients.length !== values.length) {
            alert('Please ensure recipients and values are provided correctly.');
            return;
        }

        // Parse the values (token amounts) into appropriate units
        const parsedValues = values.map(value => {
            const parsed = parseUnits(value, 18); // Assuming 18 decimals for ERC-20 tokens
            if (parsed === undefined) {
                return null; // Invalid value
            }
            return parsed.toString();  // Convert BigInt to string
        }).filter(Boolean);// Remove any invalid values

        if (parsedValues.length === 0) {
            alert('Invalid value provided. Ensure each value is a valid number.');
            return;
        }

        try {
            if (!address) {
                await connectAsync();
            }

            // Contract details
            const contract = {
                address: "0xA4b66c2CdB424611119760113bd4926029185d16",
                abi: AirdropABI
            };
            if (sendEther) {
                // Validate deposit amount for Ether
                const parsedDepositAmount = parseFloat(depositAmount);
                if (isNaN(parsedDepositAmount) || parsedDepositAmount <= 0) {
                    alert('Please enter a valid deposit amount');
                    return;
                }

                // Sending Ether
                const etherValues = parsedValues.map(value => value.toString());
                const data = await writeContractAsync({
                    ...contract,
                    functionName: 'disperseEther',
                    args: [recipients1, etherValues], // Pass recipients and ether values
                    value: etherValues.reduce((acc, curr) => acc + BigInt(curr), BigInt(0)), // Total Ether to send in Wei
                });
                setDepositHash(data.hash);
            } else {
                // Validate token address
                if (!tokenAddress || tokenAddress.trim() === '') {
                    alert('Please enter a valid ERC-20 token address.');
                    return;
                }

                // Fetch token decimals (using read contract method)
                const tokenContract = {
                    address: tokenAddress,
                    abi: erc20Abi,
                };

                let decimals = await readContract(config, {
                    ...tokenContract,
                    functionName: 'decimals',
                    chainId: chain?.id
                });

                // Check if decimals is valid
                if (decimals === undefined) {
                    alert('Failed to fetch token decimals.');
                    return;
                }

                // Ensure the deposit amount is a valid number and within limits
                const parsedTokenAmount = parseFloat(depositAmount);
                if (isNaN(parsedTokenAmount) || parsedTokenAmount <= 0) {
                    alert('Please enter a valid token deposit amount');
                    return;
                }

                // Approve token transfer
                const approveData = await writeContractAsync({
                    ...tokenContract,
                    functionName: 'approve',
                    args: [contract.address, parseUnits(depositAmount, decimals)],
                });

                // Sending ERC-20 tokens after approval
                const tokenValues = parsedValues.map(value => value.toString());

                const data = await writeContractAsync({
                    ...contract,
                    functionName: 'disperseTokenSimple',
                    args: [tokenAddress, recipients1, tokenValues], // Correctly passing array of recipients and values
                    value: BigInt(tokenValues.length) * 500000000000000n,
                });
                setDepositHash(data.hash);
            }
        } catch (error) {
            const message = error.message || error.toString();
            alert(message);
            console.log('Error:', error);
        }
    };

    return (
        <div className="airdroppage">
            <div className="container">
                <h1>Your Proven Airdrop and Token Distribution Tool</h1>
                <div className="row">
                    <div className="col-md-4">
                        <div className="ardbox">
                            <h2>7,305</h2>
                            <p>Projects launched with Token Tool</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="ardbox">
                            <h2>50,000</h2>
                            <p>Maximum number of airdrop recipients</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="ardbox">
                            <h2>13,000+</h2>
                            <p>Community members</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="ardbox">
                            <h2>Use the most advanced airdrop tool</h2>
                            <ul>
                                <li>⦿ Save time by auto filling recipients</li>
                                <li>⦿ Minimize gas fees</li>
                                <li>⦿ Send any ERC20 token </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="ardbox">
                            <h2>Airdrop tokens in order to</h2>
                            <ul>
                                <li>⦿ Reward your community</li>
                                <li>⦿ Distribute tokens to investors</li>
                                <li>⦿ Make dividend or coupon payments</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="dispersesec">
                    <h3>Disperse Tokens</h3>
                    <div className="airdropform">
                        <div className="row">
                            {!sendEther && (
                                <>
                                    <div className="col-md-6">
                                        <label>Token Address:</label>
                                        <input
                                            type="text"
                                            value={tokenAddress}
                                            onChange={(e) => setTokenAddress(e.target.value)}
                                            placeholder="Enter ERC-20 token address"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="col-md-6">
                                <label>Deposit Amount (Calculated):</label>
                                <input
                                    type="text"
                                    value={depositAmount}
                                    disabled
                                    placeholder="Calculated Deposit Amount"
                                />
                            </div>
                            {/* 
                            <div className="col-md-6">
                                <label>Recipients (comma-separated addresses):</label>
                                <input
                                    type="text"
                                    value={recipientsInput}
                                    onChange={(e) => setRecipientsInput(e.target.value)}
                                    placeholder="Enter Ethereum addresses separated by commas"
                                />
                            </div>

                            <div className="col-md-6">
                                <label>Values (comma-separated values for each recipient):</label>
                                <input
                                    type="text"
                                    value={recipientValues}
                                    onChange={handleRecipientsInputChange}
                                    placeholder="Enter the value for each recipient, separated by commas"
                                />
                            </div> 
                            */}
                            <div className="col-md-12">
                                <label>Values (comma-separated values for each recipient):</label>
                                <textarea
                                    className="w-full" // This makes the textarea take up full width
                                    rows="10"
                                    value={recipientsInput}
                                    onChange={handleRecipientsInputChange}
                                    placeholder="Enter recipient addresses and values (e.g., 0xFe674cC158a6900b8H3Da018296565861329g398,1.05)"
                                />
                            </div>
                            

                            <button onClick={handleDeposit} disabled={isPending}>
                                {isPending ? 'Processing...' : 'Deposit'}
                            </button>

                            {depositHash && (
                                <div className="col-md-6">
                                    <p>Transaction Hash:</p>
                                    <a href={`https://etherscan.io/tx/${depositHash}`} target="_blank" rel="noopener noreferrer">
                                        {depositHash}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
