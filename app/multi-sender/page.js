"use client"
import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useConnect, useWriteContract, } from 'wagmi';
import AirdropABI from '@/config/helper/AirdropABI.json';
import erc20Abi from "@/config/helper/erc20.json";
import { parseUnits } from 'viem';
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/wagmi";
import { VerifyToken } from '../../Componests/VerifyToken/VerifyToken';
import Step1 from '../../Componests/MultiSender/Step1';
import Step2 from '../../Componests/MultiSender/Step2';

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
    const [errorRecipient, setErrorRecipient] = useState('');

    const [name, setName] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [decimals, setDecimals] = useState(null);
    const [totalSupply, setTotalSupply] = useState(null);
    const [balance, setBalance] = useState(0);
    const [step, setStep] = useState(1);

    const { data, isError, isLoading } = useBalance({
        address: address, // Get the balance of the connected wallet
    });

    const [balanceWallet, setBalanceWallet] = useState(null);

    useEffect(() => {
        if (data) {
            // Format the balance to 4 decimal places
            const formattedBalance = parseFloat(data.formatted).toFixed(4);
            setBalanceWallet(formattedBalance); // Set the formatted balance
        }
    }, [data]);


    useEffect(() => {
        // Reset the transaction hash when a new deposit is being made
        setDepositHash(null);
        setError(null); // Clear any previous error
    }, [depositAmount, recipientsInput]);

    useEffect(() => {
        VerifyToken(tokenAddress, address, setName, setSymbol, setDecimals, setTotalSupply, setBalance, setError);
    }, [tokenAddress, chain]);

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
                address: "0x2C5263B3aC5af6d5aA79FB70c6EFE252Bab0Dc03", // BNB Address
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
                    value: BigInt(recipients1.length) * 91000000000000n,
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
                    value: BigInt(tokenValues.length) * 91000000000000n,
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
                <h1>Multisender: The fastest way to send tokens in bulk</h1>
                <div className='arbox'>
                    <div className="ether">
                        <input type="checkbox" checked={sendEther} onChange={handleSendEtherToggle} /> <label>Send BNB?</label>
                    </div>
                    <div className='row'>
                        {step == 1 && <Step1 setStep={setStep} sendEther={sendEther} name={name} balance={balance} recipientsInput={recipientsInput} handleRecipientsInputChange={handleRecipientsInputChange} tokenAddress={tokenAddress} setTokenAddress={setTokenAddress} />}
                        {step === 2 && (
                            <Step2
                                depositAmount={depositAmount}
                                name={name}
                                symbol={symbol}
                                decimals={decimals}
                                totalSupply={totalSupply}
                                balance={balance}
                                sendEther={sendEther}
                                address={address}
                                balanceWallet={balanceWallet}
                                recipientsInput={recipientsInput}
                                setStep={setStep}
                                handleDeposit={handleDeposit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
