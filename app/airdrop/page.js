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
    const [recipientValues, setRecipientValues] = useState(''); // Values to send to each recipient
    const [sendEther, setSendEther] = useState(false); // Toggle for Ether vs Token

    useEffect(() => {
        // Reset the transaction hash when a new deposit is being made
        setDepositHash(null);
    }, [depositAmount, recipientsInput, recipientValues]);

    const handleRecipientValuesChange = (e) => {
        setRecipientValues(e.target.value);
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

        // Parse recipients
        const recipients = recipientsInput.split(',').map((address) => address.trim()).filter(Boolean);
        const values = recipientValues.split(',').map((value) => value.trim()).filter(Boolean);

        // Validate recipient and value lengths match
        if (recipients.length === 0 || values.length === 0 || recipients.length !== values.length) {
            alert('Please ensure recipients and values are provided correctly.');
            return;
        }

        // Validate if values are numbers
        const parsedValues = values.map(value => {
            const parsed = parseUnits(value, 18); // Use default decimals (18) here if needed
            if (parsed === undefined) {
                return null; // Or handle invalid values accordingly
            }
            return parsed;
        }).filter(Boolean); // Remove invalid values

        if (parsedValues.length === 0) {
            return; // If no valid values, do not proceed with the transaction
        }

        try {
            if (!address) {
                await connectAsync();
            }

            // Contract details
            const contract = {
                address: "0x62E765B0A3D74D27DEEF5b9442807f65e7236784",
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
                console.log({ args: [recipients, etherValues] })
                const data = await writeContractAsync({
                    ...contract,
                    functionName: 'disperseEther',
                    args: [recipients, etherValues], // Pass recipients and ether values
                    value: etherValues, // Total Ether to send in Wei
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

                console.log('Decimals:', decimals);

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

                // Wait for approval transaction receipt
                // const approvalReceipt = await waitForTransactionReceipt(config, {
                //     hash: approveData.hash,
                // });
                // console.log('Approval receipt:', approvalReceipt);

                // Sending ERC-20 tokens after approval
                const tokenValues = parsedValues.map(value => value.toString());
                const data = await writeContractAsync({
                    ...contract,
                    functionName: 'disperseTokenSimple',
                    args: [tokenAddress, recipients, tokenValues],
                    value: 0,
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
                            {/* 
            <div>
                <label>Send Ether?</label>
                <input type="checkbox" checked={sendEther} onChange={handleSendEtherToggle} />
            </div> */}

                            {!sendEther && (
                                <>

                                    <div className="col-md-6">
                                        <label>Token Address:</label>
                                        <input
                                            type="  text"
                                            value={tokenAddress}
                                            onChange={(e) => setTokenAddress(e.target.value)}
                                            placeholder="Enter ERC-20 token address"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Deposit Amount (Ether or Token Value):</label>
                                        <input
                                            type="text"
                                            value={depositAmount}
                                            onChange={(e) => setDepositAmount(e.target.value)}
                                            placeholder="Enter Ether or Token amount"
                                        />
                                    </div>
                                </>
                            )}

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
                                    onChange={handleRecipientValuesChange}
                                    placeholder="Enter the value for each recipient, separated by commas"
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
        </div>
    );
}