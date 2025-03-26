"use client"
import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useWriteContract } from "wagmi";
import { multicall } from "@wagmi/core";
import { config as wagmiconfig } from "../../wagmi";
import erc20Abi from "../../config/helper/erc20.json";
import lockAbi from "../../config/helper/lock.json";
import lptokenAbi from "../../config/helper/lptoken.json";
import { VerifyToken } from '../../Componests/VerifyToken/VerifyToken';
import Link from "next/link";
import { waitForTransactionReceipt } from "@wagmi/core";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import FormButton from "../../Componests/FormButton/FormButton";

const locker = {
    '11155111': '0x7AF39aC33c2a873E81A754c4B292B8a537bBeDc4',
    '97': '0xa266Df3552FDE990976273bb943504d344684B8C',
    '56': '0xa43ef79D27a0aB7f4F2Fc7C9b1999cBBd3b06c6F',
    '1116': '0x18b4F74084F33aa7fBa058D7F623d4bf26A28906',
    '16507': '0x6E0Dcc442501c46098Ac010FC48B50c0f205f562',
    '8453': '0xa266Df3552FDE990976273bb943504d344684B8C',
}

const Input = ({ label, type, placeholder, min = null, rows = null, value, onChange, note = null, error }) => {
    return (
        <div className={`mb-3 ${type !== 'textarea' ? 'space-y-1' : 'space-y-2'}`}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    placeholder={placeholder}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    placeholder={placeholder}
                    min={min}
                    value={value}
                    onChange={onChange}
                />
            )}
            {error && <span className="text-sm text-red-500">{error}</span>}
            {note && <span className="text-sm text-gray-500">{note}</span>}
        </div>
    );
};

const LockCreate = () => {
    const { chain, address } = useAccount();
    const { connectAsync } = useConnect();
    const { writeContractAsync } = useWriteContract();

    const [tokenAddress, setTokenAddress] = useState("");
    const [enableDifferentOwner, setEnableDifferentOwner] = useState(false);
    const [owner, setOwner] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [enableVesting, setEnableVesting] = useState(false);
    const [lockUntil, setLockUntil] = useState("");
    const [tgeDate, setTgeDate] = useState("");
    const [tgePercent, setTgePercent] = useState("");
    const [cycle, setCycle] = useState("");
    const [cycleReleasePercent, setCycleReleasePercent] = useState("");
    const [name, setName] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [totalSupply, setTotalSupply] = useState(null);
    const [balance, setBalance] = useState(null);
    const [decimals, setDecimals] = useState(null);
    const [enableApprove, setEnableApprove] = useState(false);
    const [enableSubmit, setEnableSubmit] = useState(true);
    const [complete, setComplete] = useState(false);
    const [approvalHash, setApprovalHash] = useState(null);
    const [lockHash, setLockHash] = useState(null);

    // const [tokenAddressError, setTokenAddressError] = useState(tokenAddress == '' ? 'null' : null);
    const [tokenAddressError, setTokenAddressError] = useState(null);
    const [ownerError, setOwnerError] = useState(enableDifferentOwner && owner == '' ? 'null' : null)
    const [titleError, setTitleError] = useState(null) //optional
    const [amountError, setAmountError] = useState(amount == '' ? 'null' : null);
    const [lockUntilError, setLockUntilError] = useState(!enableVesting && lockUntil == '' ? 'null' : null);
    const [tgeDateError, setTgeDateError] = useState(enableVesting && tgePercent == '' ? 'null' : null)
    const [tgePercentError, setTgePercentError] = useState(enableVesting && tgePercent == '' ? 'null' : null)
    const [cycleError, setCycleError] = useState(enableVesting && cycle == '' ? 'null' : null)
    const [cycleReleasePercentError, setCycleReleasePercentError] = useState(enableVesting && cycleReleasePercent == '' ? 'null' : null)
    //   console.log({
    //     "error":
    //       tokenAddressError ||
    //       ownerError ||
    //       titleError ||
    //       amountError ||
    //       lockUntilError ||
    //       tgePercentError ||
    //       tgeDateError ||
    //       cycleError ||
    //       cycleReleasePercentError
    //   })
    //   console.log({ tokenAddressError })
    //   console.log({ ownerError })
    //   console.log({ titleError })
    //   console.log({ amountError })
    //   console.log({ lockUntilError })
    //   console.log({ tgePercentError })
    //   console.log({ tgeDateError })
    //   console.log({ cycleError })
    //   console.log({ cycleReleasePercentError })

    const handleOwner = (value) => {
        if (value <= 0) {
            setOwnerError('Presale rate must be positive number!');
        } else {
            setOwnerError(null);
        }
        setOwner(value);
    };

    const handleTitle = (value) => {
        if (value <= 0) {
            setTitleError('Presale rate must be positive number!');
        } else {
            setTitleError(null);
        }
        setTitle(value);
    };

    const handleAmount = (value) => {
        if (value <= 0) {
            setAmountError('Amount must be positive number!');
        } else {
            setAmountError(null);
        }
        setAmount(value);
    };

    const handleLockUntil = (value) => {
        const newLockUntil = new Date(value);
        if (isNaN(newLockUntil.getTime())) {
            setLockUntilError('Start time must not be empty');
        } else {
            setLockUntilError(null);
            setLockUntil(value);
        }
    };

    const handleTgePercent = (value) => {
        if (value <= 0) {
            setTgePercentError('Presale rate must be positive number!');
        } else {
            setTgePercentError(null);
        }
        setTgePercent(value);
    };

    const handleTgeDate = (value) => {
        const newTgeDate = new Date(value);
        if (isNaN(newTgeDate.getTime())) {
            setTgeDateError('Start time must not be empty');
        } else {
            setTgeDateError(null);
            setTgeDate(value);
        }
    };

    const handleCycle = (value) => {
        if (value <= 0) {
            setCycleError('Presale rate must be positive number!');
        } else {
            setCycleError(null);
        }
        setCycle(value);
    };

    const handleCycleReleasePercent = (value) => {
        if (value <= 0) {
            setCycleReleasePercentError('Presale rate must be positive number!');
        } else {
            setCycleReleasePercentError(null);
        }
        setCycleReleasePercent(value);
    };

    //Date & Time  management
    const [minTime, setMinTime] = useState('');
    const [maxTime, setMaxTime] = useState('');

    useEffect(() => {
        const now = new Date();
        const oneHourFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const maxFutureTime = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year from now

        setMinTime(oneHourFromNow.toISOString().slice(0, 16));
        setMaxTime(maxFutureTime.toISOString().slice(0, 16));
    }, []);

    useEffect(() => {
        VerifyToken(
            tokenAddress,
            address,
            setName,
            setSymbol,
            setDecimals,
            setTotalSupply,
            setBalance,
            setTokenAddressError
        );
    }, [tokenAddress, chain]);

    const tokenContract = {
        address: tokenAddress.trim(),
        abi: erc20Abi,
    }
    const handleApprove = async () => {
        try {

            if (!address) {
                await connectAsync()
            }
            const args = [
                locker[chain?.id],
                BigInt(amount) * BigInt(10 ** decimals)
            ];

            // console.log({ args })

            const data = await writeContractAsync({
                ...tokenContract,
                functionName: 'approve',
                args,
            })
            setApprovalHash('Loading...');
            const receipt = await waitForTransactionReceipt(wagmiconfig, {
                hash: data,
            })
            setApprovalHash(receipt.transactionHash);
            setLockHash(null);
            setEnableApprove(true);
            setEnableSubmit(false);
        }
        catch (error) {
            console.log({ error })
            setApprovalHash('Error occurred. Try again.');
            setLockHash(null);
            setEnableApprove(false);
            setEnableSubmit(true);
            const message = error.shortMessage;
            if (message) {
                if (message.includes('reason:')) {
                    const reason = message.split('reason:')[1].trim();
                    alert(reason);
                } else {
                    alert(message);
                }
            }
        }
    };

    const checkIsLPToken = async () => {
        try {
            const results = await multicall(wagmiconfig, {
                contracts: [
                    {
                        address: tokenAddress,
                        abi: lptokenAbi,
                        functionName: 'factory',
                    },
                    {
                        address: tokenAddress,
                        abi: lptokenAbi,
                        functionName: 'token0',
                    },
                    {
                        address: tokenAddress,
                        abi: lptokenAbi,
                        functionName: 'token1',
                    },
                ],
            })

            // console.log({ results })

            if (results[0].result && results[1].result && results[3].result) {
                return true;
            }

            return false;
        } catch (error) {
            console.error("Error checking LP token:", error);
            return false;
        }
    }

    const handleSubmit = async () => {
        try {
            if (!address) {
                await connectAsync()
            }

            const isLp = await checkIsLPToken();
            const args = enableVesting
                ? [
                    enableDifferentOwner ? owner : address,
                    tokenAddress,
                    isLp,
                    (BigInt(amount) * BigInt(10 ** decimals)).toString(), // Fixed multiplication
                    (BigInt(Date.parse(`${tgeDate.replace("T", " ")} GMT`)) / BigInt(1000)).toString(), // Fixed division
                    (BigInt(tgePercentError) * BigInt(100)).toString(), // Fixed multiplication
                    (BigInt(cycle) * BigInt(3600 * 24)).toString(), // Fixed multiplication
                    (BigInt(cycleReleasePercent) * BigInt(100)).toString(), // Fixed multiplication
                    title,
                ]
                : [
                    enableDifferentOwner ? owner : address,
                    tokenAddress,
                    isLp,
                    (BigInt(amount) * BigInt(10 ** decimals)).toString(), // Fixed multiplication
                    (BigInt(Date.parse(`${lockUntil.replace("T", " ")} GMT`)) / BigInt(1000)).toString(), // Fixed division
                    title,
                ];
            const data = await writeContractAsync({
                chainID: parseInt(chain.id, 10),
                abi: lockAbi,
                address: locker[chain?.id],
                functionName: enableVesting ? 'vestingLock' : 'lock',
                args,
            })
            setLockHash(data);
            setComplete(true);
        }
        catch (error) {
            setLockHash(null)
            const message = error.shortMessage;
            if (message) {
                if (message.includes('reason:')) {
                    const reason = message.split('reason:')[1].trim();
                    alert(reason);
                } else {
                    alert(message);
                }
            }
        }
    };

    return (
        <div className="creatlock max-w-4xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-2xl font-semibold mb-4">Create Lock</h2>
            <div>
                <Input
                    label={"Token or LP Token address*"}
                    type={"text"}
                    placeholder={"Input token address"}
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    note={(name && symbol && totalSupply) ? (
                        `Name: ${name} Symbol: ${symbol} Decimals: ${decimals.toString()} Total Supply: ${totalSupply.toString()}`
                    ) : (
                        "Enter the token address and verify"
                    )}
                    error={tokenAddressError != 'null' && <p className="text-danger">{tokenAddressError}</p>}
                />
                <div className="my-4 flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={enableDifferentOwner}
                        onChange={() => setEnableDifferentOwner(!enableDifferentOwner)}
                    />
                    <span>Use Different Owner?</span>
                </div>
                {enableDifferentOwner && (
                    <Input
                        label={`Owner*`}
                        type={"text"}
                        placeholder={"Enter owner address"}
                        value={owner}
                        onChange={(e) => handleOwner(e.target.value)}
                        error={ownerError !== 'null' && <p className="text-danger">{ownerError}</p>}
                    />
                )}
                <Input
                    label={`Title`}
                    type={"text"}
                    placeholder={"Enter Lock Title"}
                    value={title}
                    onChange={(e) => handleTitle(e.target.value)}
                    error={titleError !== 'null' && <p className="text-danger">{titleError}</p>}
                />

                <Input
                    label={`Amount*`}
                    type={"number"}
                    placeholder={"Enter amount"}
                    min={0}
                    value={amount}
                    onChange={(e) => handleAmount(e.target.value)}
                    error={amountError !== 'null' && <p className="text-danger">{amountError}</p>}
                />
                <div className="my-4 flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={enableVesting}
                        onChange={() => setEnableVesting(!enableVesting)}
                    />
                    <span>Use Vesting?</span>
                </div>
                {enableVesting ? (
                    <>
                        <Input
                            label="TGE Date (UTC)*"
                            type="datetime-local"
                            value={tgeDate}
                            min={minTime}
                            max={maxTime}
                            onChange={(e) => handleTgeDate(e.target.value)}
                        />
                        {tgeDateError !== 'null' && <span className="text-danger">{tgeDateError}</span>}
                        <Input
                            label={`TGE Percent*`}
                            type={"number"}
                            placeholder={"Enter TGE Percentage"}
                            min={0}
                            value={tgePercent}
                            onChange={(e) => handleTgePercent(e.target.value)}
                            error={tgePercentError !== 'null' && <p className="text-danger">{tgePercentError}</p>}
                        />

                        <Input
                            label={`Cycle (days)*`}
                            type={"number"}
                            placeholder={"Enter cycle"}
                            min={0}
                            value={cycle}
                            onChange={(e) => handleCycle(e.target.value)}
                            error={cycleError !== 'null' && <p className="text-danger">{cycleError}</p>}
                        />

                        <Input
                            label={`Cycle Release Percent*`}
                            type={"number"}
                            placeholder={"Enter Cycle Release Percentage"}
                            min={0}
                            value={cycleReleasePercent}
                            onChange={(e) => handleCycleReleasePercent(e.target.value)}
                            error={cycleReleasePercentError !== 'null' && <p className="text-danger">{cycleReleasePercentError}</p>}
                        />
                    </>
                ) : (
                    <>
                        <Input
                            label="Lock Until / Unlock Date (UTC)"
                            type="datetime-local"
                            value={lockUntil}
                            min={minTime}
                            max={maxTime}
                            onChange={(e) => handleLockUntil(e.target.value)}
                        />
                        {lockUntilError !== 'null' && <p className="text-danger">{lockUntilError}</p>}
                    </>
                )}
                {complete ? (
                    <FormButton
                        className="lockbtn"
                        href='/lock/tokens'
                        disabled={!complete}
                        buttonName={"Go to Locks page"}
                    />
                ) : (
                    
                    <>
                    { address && 
                    <FormButton
                        className="lockbtn"
                        onClick={handleApprove}
                        disabled={
                            tokenAddressError ||
                            ownerError ||
                            titleError ||
                            amountError ||
                            lockUntilError ||
                            tgePercentError ||
                            tgeDateError ||
                            cycleError ||
                            cycleReleasePercentError ||
                            enableApprove
                        }
                        buttonName={"Approve"}

                    />
                }
                        <FormButton
                            className="lockbtn"
                            onClick={handleSubmit}
                            disabled={enableSubmit}
                            buttonName={"Submit"}
                        /></>
                )}
            </div>
            {approvalHash && <div>Approval Hash: <Link href={`${chain.blockExplorers.default.url}/tx/${approvalHash}`} target="_blank" rel="noopener noreferrer">{approvalHash}</Link></div>}
            {lockHash && <div>Lock Hash: <Link href={`${chain.blockExplorers.default.url}/tx/${lockHash}`} target="_blank" rel="noopener noreferrer">{lockHash}</Link></div>}
        </div >
    );
};

export default LockCreate;
