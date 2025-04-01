"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { useAccount, useDeployContract, useSwitchChain, useWriteContract } from 'wagmi';
import { config } from '@/wagmi';
import { parseEther } from 'ethers';
import { BeatLoader } from 'react-spinners';
import Link from 'next/link';
import PopUp from "@/Componests/PopUp/PopUp"
import { useRouter } from 'next/navigation';

import StandardTokenSimple from "@/config/helper/ERC20/Standard/StandardTokenSimple.sol/StandardToken.json";
import mintAble from "@/config/helper/ERC20/Standard/StandardTokenMint.sol/StandardToken.json";
import burnAble from "@/config/helper/ERC20/Standard/StandardTokenBurn.sol/StandardToken.json";
import pauseAble from "@/config/helper/ERC20/Standard/StandardTokenPause.sol/StandardToken.json";
import mintPause from "@/config/helper/ERC20/Standard/StandardTokenPauseMint.sol/StandardToken.json";
import mintBurn from "@/config/helper/ERC20/Standard/StandardTokenBurnMint.sol/StandardToken.json";
import burnPause from "@/config/helper/ERC20/Standard/StandardTokenPauseBurn.sol/StandardToken.json";
import mintBurnPause from "@/config/helper/ERC20/Standard/StandardTokenPauseMintBurn.sol/StandardToken.json";
import cappedMintBurnPause from "@/config/helper/ERC20/Standard/StandardTokenPauseMintBurnCapped.sol/StandardToken.json";
import cappedMintBurn from "@/config/helper/ERC20/Standard/StandardTokenBurnMintCapped.sol/StandardToken.json";
import cappedMintPause from "@/config/helper/ERC20/Standard/StandardTokenPauseMintCapped.sol/StandardToken.json";
import cappedMintAble from "@/config/helper/ERC20/Standard/StandardTokenMintCapped.sol/StandardToken.json";
import { creationFee, feeAddress, utilitiesFee } from '@/config/helper/helper';
import { deployContract, waitForTransactionReceipt } from "@wagmi/core";
import TokenFaq from '../TokenFaq/TokenFaq';

// blackList
import blackListMintBurn from "@/config/helper/ERC20/Standard/StandardTokenBurnMintBlacklist.sol/StandardToken.json";
import cappedMintBurnPauseBlackList from "@/config/helper/ERC20/Standard/StandardTokenPauseMintBurnCappedBlacklist.sol/StandardToken.json";
import blackListMintPause from "@/config/helper/ERC20/Standard/StandardTokenPauseMintBlacklist.sol/StandardToken.json";
import blackListMintCapped from "@/config/helper/ERC20/Standard/StandardTokenMintCappedBlacklist.sol/StandardToken.json";
import blackListBurn from "@/config/helper/ERC20/Standard/StandardTokenBurnBlacklist.sol/StandardToken.json";
import blackListPause from "@/config/helper/ERC20/Standard/StandardTokenPauseBlacklist.sol/StandardToken.json";
import blackListMint from "@/config/helper/ERC20/Standard/StandardTokenMintBlacklist.sol/StandardToken.json";
import blackList from "@/config/helper/ERC20/Standard/StandardTokenBlacklist.sol/StandardToken.json";

// Tex
import taxable from "@/config/helper/ERC20/Standard_old/StandardTokenTaxable.sol/StandardToken.json";
import MintTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenMintTaxable.sol/StandardToken.json";
import BlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenBlacklistTaxable.sol/StandardToken.json";
import PauseTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseTaxable.sol/StandardToken.json";
import BurnTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenBurnTaxable.sol/StandardToken.json";
import MintCappedTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenMintCappedTaxable.sol/StandardToken.json";
import MintBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenMintBlacklistTaxable.sol/StandardToken.json";
import PauseMintTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseMintTaxable.sol/StandardToken.json";
import PauseBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseBlacklistTaxable.sol/StandardToken.json";
import PauseBurnTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseBurnTaxable.sol/StandardToken.json";
import BurnMintTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenBurnMintTaxable.sol/StandardToken.json";
import BurnBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenBurnBlacklistTaxable.sol/StandardToken.json";
import PauseMintBurnCappedTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseMintBurnCappedTaxable.sol/StandardToken.json";
import PauseMintBurnCappedBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseMintBurnCappedBlacklistTaxable.sol/StandardToken.json";
import PauseMintCappedBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseMintCappedBlacklistTaxable.sol/StandardToken.json";
import PauseMintCappedTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseMintCappedTaxable.sol/StandardToken.json";
import MintCappedBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenMintCappedBlacklistTaxable.sol/StandardToken.json";
import BurnMintBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenBurnMintBlacklistTaxable.sol/StandardToken.json";
import PauseBurnBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseBurnBlacklistTaxable.sol/StandardToken.json";
import BurnMintCappedTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenBurnMintCappedTaxable.sol/StandardToken.json";
import BurnMintCappedBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenBurnMintCappedBlacklistTaxable.sol/StandardToken.json";
import PauseMintBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseMintBlacklistTaxable.sol/StandardToken.json";
import PauseMintBurnBlacklistTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseMintBurnBlacklistTaxable.sol/StandardToken.json";
import PauseMintBurnTaxable from "@/config/helper/ERC20/Standard_old/StandardTokenPauseMintBurnTaxable.sol/StandardToken.json";

export default function CreateToken({ token }) {
    const router = useRouter();
    const { isConnected, chain } = useAccount();
    const [hash, setHash] = useState("");
    const [fee, setFee] = useState(0);
    const { chains, switchChain } = useSwitchChain();
    const [isLoading, setIsLoading] = useState(false);

    // Comprehensive chain name mapping
    const chainNameMap = {
        'ethereum': { chainName: 'ETH Smart Chain', chainId: '1' },
        'binance-smart-chain': { chainName: 'BNB Smart Chain', chainId: '56' },
        'base': { chainName: 'Base', chainId: '8453' },
        'arbitrum-one': { chainName: 'Arbitrum One', chainId: '42161' },
        'optimism': { chainName: 'OP Mainnet', chainId: '10' },
        'polygon': { chainName: 'Polygon', chainId: '137' },
        'alvey': { chainName: 'Alvey', chainId: '3797' },
        'soneium': { chainName: 'Soneium', chainId: '1868' },
        'core': { chainName: 'Core', chainId: '1116' },
        'blast': { chainName: 'Blast', chainId: '81457' },
        'opbnb': { chainName: 'opBNB', chainId: '204' },
        'zksync': { chainName: 'ZkSync', chainId: '324' },
        'avalanche': { chainName: 'Avalanche Mainnet', chainId: '43114' },
        'mantle': { chainName: 'Mantle', chainId: '5000' },
        'sonic': { chainName: 'Sonic', chainId: '146' },
        'pulsechain': { chainName: 'Pulsechain', chainId: '369' },
        'abstract': { chainName: 'Abstract', chainId: '2741' },
        'linea': { chainName: 'Linea', chainId: '59144' },
        'unichain': { chainName: 'Unichain', chainId: '130' },
        'binance-smart-chain-testnet': { chainName: 'Binance Smart Chain Testnet', chainId: '97' },
        'sepolia': { chainName: 'Sepolia', chainId: '11155111' }
    };

    // Normalize token parameter
    const normalizeToken = (tokenName) => {
        if (!tokenName) return null;

        const normalizedToken = tokenName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace('smart-chain', 'smart-chain')
            .replace('op-mainnet', 'optimism')
            .replace('zksync-era', 'zksync');

        return Object.keys(chainNameMap).find(key =>
            key === normalizedToken ||
            normalizedToken.includes(key)
        ) || normalizedToken;
    };

    // Normalize the token
    const normalizedToken = normalizeToken(token);

    // Find the selected chain
    const selectedChain = useMemo(() => {
        if (!normalizedToken) return null;

        const chainInfo = chainNameMap[normalizedToken];
        if (!chainInfo) return null;

        return chains.find((c) =>
            c.name.toLowerCase() === chainInfo.chainName.toLowerCase() ||
            c.id === parseInt(chainInfo.chainId)
        );
    }, [normalizedToken, chains]);

    // State and other component logic remains the same...

    // Modify useEffect for chain switching
    useEffect(() => {
        const switchToChain = async () => {
            if (selectedChain) {
                try {
                    await switchChain({ chainId: selectedChain.id });
                } catch (error) {
                    console.error('Failed to switch chain:', error);
                }
            }
        };

        switchToChain();
    }, [selectedChain, switchChain]);

    // Modify handleChainClick to use normalized routing
    const handleChainClick = async (id, chainName) => {
        try {
            // Switch blockchain in wallet
            await switchChain({ chainId: parseInt(id) });

            // Normalize chain name for URL
            const normalizedChainName = chainName
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace('smart-chain', 'smart-chain')
                .replace('smart-chain-testnet', 'smart-chain-testnet');

            // Update active token and URL
            router.push(`/create-token/${normalizedChainName}`);
        } catch (error) {
            console.error('Chain switch failed:', error);
        }
    };

    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [tokenInitial, setTokenInitial] = useState(21000000); // Type as number
    const [Capped, setCapped] = useState(21000000);
    const [isCheckedMint, setIsCheckedMint] = useState(false);
    const [isCheckedBurn, setIsCheckedBurn] = useState(false);
    const [isCheckedPausing, setIsCheckedPausing] = useState(false);
    const [isCheckedBlacklist, setIsCheckedBlacklist] = useState(false);
    const [isCheckedChargeTex, setIsCheckedChargeTex] = useState(false);
    const [isCheckedCapped, setIsCheckedCapped] = useState(false);
    const [Decimals, setDecimals] = useState(18);
    const [taxFeeReceive, setTaxFeeReceive] = useState('');
    const [taxFeeReceiverAddress, setTaxFeeReceiverAddress] = useState('');

    // Update the chain fee whenever chain or other relevant states change
    useEffect(() => {
        if (chain?.id) {
            setFee(
                parseFloat(
                    (creationFee[chain?.id] +
                        utilitiesFee[chain?.id] *
                        (Number(isCheckedBurn) + Number(isCheckedCapped) + Number(isCheckedMint) + Number(isCheckedPausing) + Number(isCheckedBlacklist) + Number(isCheckedChargeTex))
                    ).toFixed(5)
                )
            );
        }
    }, [chain, isCheckedBurn, isCheckedCapped, isCheckedMint, isCheckedPausing, isCheckedBlacklist, isCheckedChargeTex]);


    const handleTokenNameChange = (e) => {
        setTokenName(e.target.value);
    };

    const handleTokenSymbolChange = (e) => {
        setTokenSymbol(e.target.value);
    };

    const handleTokenInitialChange = (e) => {
        setTokenInitial(Number(e.target.value));  // Ensure the value is a number
    };

    const handleTokenTaxFeeReceiveChange = (e) => {
        setTaxFeeReceive(e.target.value);  // Ensure the value is a number
    };

    const handleTokenTaxFeeReceiverAddressChange = (e) => {
        setTaxFeeReceiverAddress(e.target.value);  // Ensure the value is a number
    };

    const handleCappedChange = (e) => {
        const value = Number(e.target.value);  // Convert to number
        if (value >= tokenInitial) {
            setCapped(value);
        } else {
            alert("Maximum Supply cannot be less than Initial Supply of 10,000.");
        }
    };

    const { deployContractAsync, isPending, isSuccess } = useDeployContract({
        config,
    })

    const handleToggleMint = () => {
        setIsCheckedMint((prev) => !prev);
    };
    const handleToggleCapped = () => {
        setIsCheckedCapped((prev) => !prev);
    };
    const handleToggleBurn = () => {
        setIsCheckedBurn((prev) => !prev);
    };

    const handleTogglePausing = () => {
        setIsCheckedPausing((prev) => !prev);
    };

    const handleToggleBlacklist = () => {
        setIsCheckedBlacklist((prev) => !prev);
    };

    const handleToggleChargeTex = () => {
        setIsCheckedChargeTex((prev) => !prev);
    };

    const handleRangeChange = (e) => {
        setDecimals(e.target.value);
    };

    const handleDeploy = async () => {
        try {
            let result;
            let args;
            let contractCode = 'https://github.com/deploytokens/contract-code/tree/main/src/'

            // Ensure the bytecode is in the correct format
            const getBytecode = (bytecode) => {
                return bytecode.startsWith('0x') ? bytecode : bytecode;
            }

            if (isCheckedChargeTex) {

                if (isCheckedMint && isCheckedBurn && isCheckedPausing && isCheckedCapped && isCheckedBlacklist) {
                    contractCode = 'StandardTokenPauseMintBurnCappedBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseMintBurnCappedBlacklistTaxable.abi,
                        bytecode: getBytecode(PauseMintBurnCappedBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedMint && isCheckedBurn && isCheckedPausing && isCheckedCapped) {
                    contractCode = 'StandardTokenPauseMintBurnCappedTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseMintBurnCappedTaxable.abi,
                        bytecode: getBytecode(PauseMintBurnCappedTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedPausing && isCheckedMint && isCheckedCapped && isCheckedBlacklist) {
                    contractCode = 'StandardTokenPauseMintCappedBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseMintCappedBlacklistTaxable.abi,
                        bytecode: getBytecode(PauseMintCappedBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedBurn && isCheckedMint && isCheckedCapped && isCheckedBlacklist) {
                    contractCode = 'StandardTokenBurnMintCappedBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: BurnMintCappedBlacklistTaxable.abi,
                        bytecode: getBytecode(BurnMintCappedBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedPausing && isCheckedMint && isCheckedCapped && isCheckedChargeTex) {
                    contractCode = 'StandardTokenPauseMintCappedTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseMintCappedTaxable.abi,
                        bytecode: getBytecode(PauseMintCappedTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedPausing && isCheckedMint && isCheckedBurn && isCheckedBlacklist) {
                    contractCode = 'StandardTokenPauseMintBurnBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseMintBurnBlacklistTaxable.abi,
                        bytecode: getBytecode(PauseMintBurnBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedMint && isCheckedCapped && isCheckedBlacklist) {
                    contractCode = 'StandardTokenMintCappedBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: MintCappedBlacklistTaxable.abi,
                        bytecode: getBytecode(MintCappedBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedMint && isCheckedBurn && isCheckedBlacklist) {
                    contractCode = 'StandardTokenBurnMintBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: BurnMintBlacklistTaxable.abi,
                        bytecode: getBytecode(BurnMintBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedPausing && isCheckedBurn && isCheckedBlacklist) {
                    contractCode = 'StandardTokenPauseBurnBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseBurnBlacklistTaxable.abi,
                        bytecode: getBytecode(PauseBurnBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedBurn && isCheckedMint && isCheckedCapped) {
                    contractCode = 'StandardTokenBurnMintCappedTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: BurnMintCappedTaxable.abi,
                        bytecode: getBytecode(BurnMintCappedTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedPausing && isCheckedMint && isCheckedBlacklist) {
                    contractCode = 'StandardTokenPauseMintBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseMintBlacklistTaxable.abi,
                        bytecode: getBytecode(PauseMintBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
                else if (isCheckedPausing && isCheckedMint && isCheckedBurn) {
                    contractCode = 'StandardTokenPauseMintBurnTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseMintBurnTaxable.abi,
                        bytecode: getBytecode(PauseMintBurnTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedMint && isCheckedBurn) {
                    contractCode = 'StandardTokenBurnMintTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: BurnMintTaxable.abi,
                        bytecode: getBytecode(BurnMintTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedBurn && isCheckedBlacklist) {
                    contractCode = 'StandardTokenBurnBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: BurnBlacklistTaxable.abi,
                        bytecode: getBytecode(BurnBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedMint && isCheckedPausing) {
                    contractCode = 'StandardTokenPauseMintTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseMintTaxable.abi,
                        bytecode: getBytecode(PauseMintTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedPausing && isCheckedBlacklist) {
                    contractCode = 'StandardTokenPauseBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseBlacklistTaxable.abi,
                        bytecode: getBytecode(PauseBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedPausing && isCheckedBurn) {
                    contractCode = 'StandardTokenPauseBurnTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseBurnTaxable.abi,
                        bytecode: getBytecode(PauseBurnTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedMint && isCheckedCapped) {
                    contractCode = 'StandardTokenMintCappedTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: MintCappedTaxable.abi,
                        bytecode: getBytecode(MintCappedTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedMint && isCheckedBlacklist) {
                    contractCode = 'StandardTokenMintBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: MintBlacklistTaxable.abi,
                        bytecode: getBytecode(MintBlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedBurn) {
                    contractCode = 'StandardTokenBurnTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: BurnTaxable.abi,
                        bytecode: getBytecode(BurnTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedPausing) {
                    contractCode = 'StandardTokenPauseTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: PauseTaxable.abi,
                        bytecode: getBytecode(PauseTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedMint) {
                    contractCode = 'StandardTokenMintTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: MintTaxable.abi,
                        bytecode: getBytecode(MintTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else if (isCheckedBlacklist) {
                    contractCode = 'StandardTokenBlacklistTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: BlacklistTaxable.abi,
                        bytecode: getBytecode(BlacklistTaxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }

                else {
                    contractCode = 'StandardTokenTaxable.sol';
                    console.log(contractCode)
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString()), taxFeeReceive, taxFeeReceiverAddress];
                    result = await deployContract(config, {
                        abi: taxable.abi,
                        bytecode: getBytecode(taxable.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
            }

            else if (isCheckedBlacklist) {
                if (isCheckedMint && isCheckedBurn && isCheckedPausing && isCheckedCapped) {
                    contractCode = 'StandardTokenPauseMintBurnCappedBlacklist.sol';
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString())];
                    result = await deployContract(config, {
                        abi: cappedMintBurnPauseBlackList.abi,
                        bytecode: getBytecode(cappedMintBurnPauseBlackList.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
                else if (isCheckedMint && isCheckedBurn) {
                    contractCode = 'StandardTokenBurnMintBlacklist.sol';
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())];
                    result = await deployContract(config, {
                        abi: blackListMintBurn.abi,
                        bytecode: getBytecode(blackListMintBurn.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
                else if (isCheckedMint && isCheckedPausing) {
                    contractCode = 'StandardTokenPauseMintBlacklist.sol';
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())];
                    result = await deployContract(config, {
                        abi: blackListMintPause.abi,
                        bytecode: getBytecode(blackListMintPause.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
                else if (isCheckedMint && isCheckedCapped) {
                    contractCode = 'StandardTokenMintCappedBlacklist.sol';
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString())];
                    result = await deployContract(config, {
                        abi: blackListMintCapped.abi,
                        bytecode: getBytecode(blackListMintCapped.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
                else if (isCheckedBurn) {
                    contractCode = 'StandardTokenBurnBlacklist.sol';
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())];
                    result = await deployContract(config, {
                        abi: blackListBurn.abi,
                        bytecode: getBytecode(blackListBurn.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
                else if (isCheckedPausing) {
                    contractCode = 'StandardTokenPauseBlacklist.sol';
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())];
                    result = await deployContract(config, {
                        abi: blackListPause.abi,
                        bytecode: getBytecode(blackListPause.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
                else if (isCheckedMint) {
                    contractCode = 'StandardTokenMintBlacklist.sol';
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())];
                    result = await deployContract(config, {
                        abi: blackListMint.abi,
                        bytecode: getBytecode(blackListMint.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
                else {
                    contractCode = 'StandardTokenBlacklist.sol';
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())];
                    result = await deployContract(config, {
                        abi: blackList.abi,
                        bytecode: getBytecode(blackList.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
            }

            else if (isCheckedCapped) {
                if (isCheckedMint && isCheckedBurn && isCheckedPausing && isCheckedCapped) {
                    contractCode = contractCode + 'StandardTokenPauseMintBurnCapped.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: cappedMintBurnPause.abi,
                        bytecode: getBytecode(cappedMintBurnPause.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else if (isCheckedMint && isCheckedBurn) {
                    contractCode = contractCode + 'StandardTokenBurnMintCapped.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: cappedMintBurn.abi,
                        bytecode: getBytecode(cappedMintBurn.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else if (isCheckedMint && isCheckedPausing) {
                    contractCode = contractCode + 'StandardTokenPauseMintCapped.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: cappedMintPause.abi,
                        bytecode: getBytecode(cappedMintPause.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else if (isCheckedMint) {
                    contractCode = contractCode + 'StandardTokenMintCapped.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, Capped, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: cappedMintAble.abi,
                        bytecode: getBytecode(cappedMintAble.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                }
            }

            else if (!isCheckedCapped) {
                if (isCheckedMint && isCheckedBurn && isCheckedPausing) {
                    contractCode = contractCode + 'StandardTokenPauseMintBurn.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: mintBurnPause.abi,
                        bytecode: getBytecode(mintBurnPause.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else if (isCheckedMint && isCheckedBurn) {
                    contractCode = contractCode + 'StandardTokenBurnMint.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: mintBurn.abi,
                        bytecode: getBytecode(mintBurn.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else if (isCheckedMint && isCheckedPausing) {
                    contractCode = contractCode + 'StandardTokenPauseMint.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: mintPause.abi,
                        bytecode: getBytecode(mintPause.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else if (isCheckedBurn && isCheckedPausing) {
                    contractCode = contractCode + 'StandardTokenPauseBurn.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: burnPause.abi,
                        bytecode: getBytecode(burnPause.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else if (isCheckedMint) {
                    contractCode = contractCode + 'StandardTokenMint.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: mintAble.abi,
                        bytecode: getBytecode(mintAble.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else if (isCheckedBurn) {
                    contractCode = contractCode + 'StandardTokenBurn.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: burnAble.abi,
                        bytecode: getBytecode(burnAble.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else if (isCheckedPausing) {
                    contractCode = contractCode + 'StandardTokenPause.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())]
                    result = await deployContract(config, {
                        abi: pauseAble.abi,
                        bytecode: getBytecode(pauseAble.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    });
                } else {
                    contractCode = contractCode + 'StandardTokenSimple.sol'
                    args = [tokenName, tokenSymbol, Decimals, tokenInitial, feeAddress[chain.id], parseEther(fee.toString())];
                    result = await deployContractAsync({
                        abi: StandardTokenSimple.abi,
                        bytecode: getBytecode(StandardTokenSimple.bytecode.object),
                        args,
                        value: parseEther(fee.toString()),
                    })
                }
                setIsLoading(true);
                const receipt = await waitForTransactionReceipt(config, {
                    hash: result,
                });
                setHash(receipt);
                setHash(receipt);

                const deploymentData = {
                    tokenname: tokenName,
                    tokensymbol: tokenSymbol,
                    decimals: Decimals,
                    tokenInitial: tokenInitial,
                    chainid: chain.id,
                    chainname: chain.name, // Assuming chain.name exists
                    capped: isCheckedCapped ? 'yes' : 'no',
                    mintable: isCheckedMint ? 'yes' : 'no',
                    burnable: isCheckedBurn ? 'yes' : 'no',
                    pausable: isCheckedPausing ? 'yes' : 'no',
                    feeAddress: feeAddress[chain.id],
                    contractAddress: receipt.contractAddress, // Assuming receipt contains contractAddress
                    transactionHash: receipt.transactionHash,
                    result: 'yes', // Assuming successful deployment
                    description: contractCode,
                    deploymentTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19), // Format as "YYYY-MM-DD HH:MM:SS"
                };

                console.log({ deploymentData });

                setIsLoading(false);

                // Send data to the API as JSON
                const apiUrl = 'https://blog.deploytokens.com/api/createtoken.php';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(deploymentData),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('API Response:', data);
                } else {
                    console.error('Failed to send data to the API');
                }
            }

        } catch (error) {
            setIsLoading(false);
            console.log({ error });
        }
    };

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        if (hash) {
            setIsPopupVisible(true);
        }
    }, [hash]);


    return (
        <main className="tokenformmain  mntoken flex flex-col items-center justify-between space-y-4 pt-10 ">
            <div className='container tokencontainer'>
                <div className='Createtheading'>
                    <h1>Create Token on {chain?.name || token}</h1>
                    <p>
                        Instantly create your token on the {chain?.name || token} blockchain with
                        DeployTokens.com, the ultimate Token Generator.
                        No coding required – launch secure, affordable, and
                        customizable tokens in just a few clicks. Start your
                        crypto journey today!
                    </p>
                </div>
                <div className='row'>
                    <div className="mx-auto w-full max-w-7xl xl:px-0">
                        <div className="max-w-4xl space-y-2 text-center md:mx-auto xl:max-w-none">
                            <h3 className="mx-auto max-w-2xl tracking-tight md:text-lg faqsub"></h3>
                        </div>
                    </div>
                    <div className="col-xl-4 chainbox">

                        <ul className="space-y-2">

                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'ETH Smart Chain' ? 'border-[10px] border-white' : ''}`}
                                onClick={() => handleChainClick('1', 'Ethereum')}>
                                <img src="/assets/images/1-DLc6yFb9.png" alt="bnb" className="w-6 h-6" />
                                <span>ETH</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'BNB Smart Chain' ? 'border-[10px] border-white' : ''}`}
                                onClick={() => handleChainClick('56', 'Binance Smart Chain')}>
                                <img src="/assets/images/chain_img/bnb.png" alt="bnb" className="w-6 h-6" />
                                <span>BNB</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Base' ? 'border-[10px] border-white' : ''}`}
                                onClick={() => handleChainClick('8453', 'Base')}>
                                <img src="/assets/images/chain_img/base.png" alt="base" className="w-6 h-6" />
                                <span>Base</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Arbitrum One' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('42161', 'Arbitrum One')}>
                                <img src="/assets/images/chain_img/arbitrum.png" alt="arbitrum" className="w-6 h-6" />
                                <span>Arbitrum</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Polygon' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('137', 'Polygon')}>
                                <img src="/assets/images/chain_img/polygon.png" alt="polygon" className="w-6 h-6" />
                                <span>Polygon</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'OP Mainnet' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('10', 'Optimism')}>
                                <img src="/assets/images/chain_img/op.png" alt="op" className="w-6 h-6" />
                                <span>Optimism</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Avalanche Mainnet' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('43114', 'Avalanche')}>
                                <img src="/assets/images/Avalanche.png" alt="op" className="w-6 h-6" />
                                <span>Avalanche</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Alvey' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('3797', 'Alvey')}>
                                <img src="/assets/images/alvay.webp" alt="Alvey" className="w-6 h-6" />
                                <span>Alvey</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Soneium' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('1868', 'Soneium')}>
                                <img src="/assets/images/soneium.png" alt="Soneium" className="w-6 h-6" />
                                <span>Soneium</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Core' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('1116', 'Core')}>
                                <img src="/assets/images/Core.png" alt="Core" className="w-6 h-6" />
                                <span>Core</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Blast' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('81457', 'Blast')}>
                                <img src="/assets/images/chain_img/blast.png" alt="Blast" className="w-6 h-6" />
                                <span>Blast</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'opBNB' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('204', 'Opbnb')}>
                                <img src="/assets/images/chain_img/opbnb.png" alt="opBNB" className="w-6 h-6" />
                                <span>opBNB</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'ZkSync' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('324', 'ZkSync')}>
                                <img src="/assets/images/ZkSync.png" alt="ZkSync" className="w-6 h-6" />
                                <span>ZkSync</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Mantle' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('5000', 'Mantle')}>
                                <img src="/assets/images/Mantle.png" alt="Mantle" className="w-6 h-6" />
                                <span>Mantle</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Sonic' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('146', 'Sonic')}>
                                <img src="/assets/images/Sonic.png" alt="Sonic" className="w-6 h-6" />
                                <span>Sonic</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Pulsechain' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('369', 'Pulsechain')}>
                                <img src="/assets/images/Pulsechain.png" alt="Pulsechain" className="w-6 h-6" />
                                <span>Pulsechain</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Abstract' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('2741', 'Abstract')}>
                                <img src="/assets/images/Abstract.png" alt="Abstract" className="w-6 h-6" />
                                <span>Abstract</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Linea' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('59144', 'Linea')}>
                                <img src="/assets/images/Linea.png" alt="Linea" className="w-6 h-6" />
                                <span>Linea</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Unichain' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('130', 'Unichain')}>
                                <img src="/assets/images/unichain.webp" alt="Linea" className="w-6 h-6" />
                                <span>Unichain</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Binance Smart Chain Testnet' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('97', 'Binance Smart Chain Testnet')}>
                                <img src="/assets/images/chain_img/bnb.png" alt="BNB" className="w-6 h-6" />
                                <span>BNBTestnet</span>
                            </li>
                            <li className={`border-[0.5px] border-black rounded-lg p-3 hover:bg-gray-200 cursor-pointer flex items-center space-x-2 ${chain?.name === 'Sepolia' ? 'border-[10px] border-white' : ''}`} onClick={() => handleChainClick('11155111', 'Sepolia')}>
                                <img src="/assets/images/sepolia-DY1y1bSg.png" alt="sepolia" className="w-6 h-6" />
                                <span>Sepolia</span>
                            </li>

                        </ul>

                    </div>
                    <div className="col-xl-8 createtoken">
                        <div className="firstform rounded-xl border bg-card text-card-foreground shadow-sm w-full">
                            <div className="p-0">
                                <div className="from-box grid grid-cols-2 gap-4">
                                    <div className="space-y-2 row">
                                        <div className="col-xl-3">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Token Name :</label>
                                        </div>
                                        <div className="col-xl-9">
                                            <input type="text" className="flex w-full text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-transparent" placeholder="e.g. New Moon Token" autoComplete="off" onChange={handleTokenNameChange} />
                                        </div>
                                    </div>
                                    <div className="space-y-2 row">
                                        <div className="col-xl-3">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Token Symbol :</label>
                                        </div>
                                        <div className="col-xl-9">
                                            <input type="text" className="flex w-full text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-transparent" placeholder="e.g. NMT" autoComplete="off" onChange={handleTokenSymbolChange} />
                                        </div>
                                    </div>

                                    <div className="space-y-2 row">
                                        <div className="col-xl-3">
                                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Initial Supply :</label>
                                        </div>
                                        <div className="col-xl-9">
                                            <input type="number" className="flex w-full text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-transparent" id="initial-supply" min="0" step="1" max="Infinity" value={tokenInitial} onChange={handleTokenInitialChange} />
                                        </div>
                                    </div>

                                    {isCheckedCapped &&
                                        <div className="space-y-2 row">
                                            <div className="col-xl-3">
                                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Maximum Supply :</label>
                                            </div>
                                            <div className="col-xl-9">
                                                <div className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 ring-offset-background tabular-nums">
                                                    <input type="number" className="flex w-full text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-transparent" min="0" step="1" max="Infinity" value={Capped} onChange={handleCappedChange} />
                                                </div>
                                            </div>
                                        </div>}
                                    <div className="space-y-2 row">
                                        <div className="col-xl-3">
                                            <label className="text-sm font-medium leading-none mr-4">
                                                Decimals :
                                            </label>
                                        </div>
                                        <div className="col-xl-9 decimal">
                                            <input
                                                type="range"
                                                min="0"
                                                max="18"
                                                value={Decimals}
                                                onChange={handleRangeChange}
                                                className="" // Add margin for spacing
                                            />
                                            <div className="text-sm text-gray-700">
                                                {Decimals}
                                            </div>
                                        </div>
                                    </div>

                                    {isCheckedChargeTex &&
                                        <>
                                            <div className="space-y-2 row">
                                                <div className="col-xl-3">
                                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Recipient address:</label>
                                                </div>
                                                <div className="col-xl-9">
                                                    <input type="text" className="flex w-full text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-transparent" placeholder='e.g. 0x...' id="initial-supply" onChange={handleTokenTaxFeeReceiverAddressChange} />
                                                </div>
                                            </div>

                                            <div className="space-y-2 row">
                                                <div className="col-xl-3">
                                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Tax / fee on transfer in basis points (bps)</label>
                                                </div>
                                                <div className="col-xl-9">
                                                    <input type="number" className="flex w-full text-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:bg-transparent" placeholder='e.g. 100' id="initial-supply" onChange={handleTokenTaxFeeReceiveChange} />
                                                    <p>i.e. 1% is equal to 100 bps. Example: to charge a tax / fee of 3.5%, enter the number 350.</p>
                                                </div>
                                            </div>
                                        </>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="secondtform rounded-xl border bg-card text-card-foreground shadow-sm w-full">
                            <div className="p-4 otherconfig">
                                <h4>Other Config : </h4>
                                <ul>
                                    <li>
                                        <input type="checkbox" id="Mint- cap" onClick={handleToggleMint} name="Mint- cap" value="Mint- cap" />
                                        <label htmlFor="Mint- cap"> Can Mint &nbsp; <span>(Allows additional token minting after the initial creation) </span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Mint- cap" name="Mint- cap" onClick={handleToggleCapped} value="Mint- cap" />
                                        <label htmlFor="Mint- cap"> Set Supply Cap &nbsp; <span>(Sets a Max supply of token. this limit cannot be changed) </span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Mint- cap" onClick={handleToggleBurn} name="Mint- cap" value="Mint- cap" />
                                        <label htmlFor="Mint- cap"> Can Burn  &nbsp; <span>( Enables token burning, allowing holders to remove tokens from circulation.) </span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Mint- cap" onClick={handleTogglePausing} name="Mint- cap" value="Mint- cap" />
                                        <label htmlFor="Mint- cap"> Can Pause  &nbsp; <span>(Ability to halt and resume all token operations when needed.) </span></label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="Mint- cap" onClick={handleToggleBlacklist} name="Mint- cap" value="Mint- cap" />
                                        <label htmlFor="Mint- cap"> Blacklist  &nbsp; <span>(Allows blacklisting of malicious accounts.) </span></label>
                                    </li>

                                    <li>
                                        <input type="checkbox" id="Mint- cap" onClick={handleToggleChargeTex} name="Mint- cap" value="Mint- cap" />
                                        <label htmlFor="Mint- cap"> Charge Transaction Tax / Fee  &nbsp; <span>(If enabled, a portion of the transfer will go to the fee wallet.)</span>
                                        </label>
                                    </li>
                                    {isCheckedChargeTex && <span>Cannot be deactivated after token creation</span>}
                                </ul>
                            </div>
                        </div>
                        {isPending && (
                            <>
                                <div className="spinner-overlay">
                                    <BeatLoader color="#3498db" loading={isPending} size={30} />
                                </div>
                                <div className="blurred-background"></div>
                            </>
                        )}
                        {isConnected ? (<div className="rounded-xl border bg-sky-500 text-black shadow-sm w-full">
                            <div className="p-4">
                                <div className="mx-auto flex flex-col items-center space-y-2">
                                    <div className="space-x-2">
                                        <span className="font-bold">{+(fee)} {chain?.nativeCurrency?.symbol} + Gas Fees</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="p-4 m-auto createbtns">
                                <div>
                                    <button
                                        className={`w-full inline-flex items-center justify-center h-10 px-4 py-2 bg-blue-500 text-sm font-medium rounded-full ${tokenName && tokenSymbol ? ' text-black' : ' text-black'}`}
                                        onClick={handleDeploy}
                                        disabled={!tokenName || !tokenSymbol} // Disable if either field is empty
                                    >
                                        Create Token
                                    </button>
                                </div>
                            </div>
                        </div>) : (
                            <h3 className="ConnectWallet mx-auto tracking-tight text-gray-600 md:text-lg">Connect Wallet</h3>
                        )}
                    </div>
                </div>
                {isPopupVisible && <PopUp receipt={hash} closePopup={closePopup} />}
                <TokenFaq tokenName={chain?.name || token} />
            </div>
        </main>
    )
}