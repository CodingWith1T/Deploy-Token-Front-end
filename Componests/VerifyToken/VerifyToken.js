import { multicall } from '@wagmi/core';
import {config} from "@/wagmi"
import abi from '../../config/helper/erc20.json';
import { formatUnits } from 'viem';
import {DEAD_ADDRESS} from "../../config/helper/helper"
// Helper function to validate Ethereum addresses
export const isValidAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address.trim());

export const VerifyToken = async (tokenAddress, address, setName, setSymbol, setDecimals, setTotalSupply, setBalance, setError) => {

    if (!tokenAddress) {
        return;
    }

    if (!isValidAddress(tokenAddress)) {
        setError && setError('Invalid token address');
        return;
    }

    const tokenContract = {
        address: tokenAddress.trim(),
        abi,
    };

    try {
        const results = await multicall(config, {
            contracts: [
                { ...tokenContract, functionName: 'name' },
                { ...tokenContract, functionName: 'symbol' },
                { ...tokenContract, functionName: 'totalSupply' },
                { ...tokenContract, functionName: 'decimals' },
                { ...tokenContract, functionName: 'balanceOf', args: [address ?? DEAD_ADDRESS] },
            ],

        });

        // Extract results and update state
        setName(results[0]?.result?.toString() || null);
        setSymbol(results[1]?.result?.toString() || null);
        setTotalSupply && setTotalSupply(formatUnits(BigInt(results[2]?.result.toString()), results[3]?.result.toString()) || null);
        setDecimals(results[3]?.result?.toString() || null);
        setBalance(results[4]?.result ? formatUnits(results[4].result, results[3]?.result?.toString()) : "0");


        // Clear any previous errors
        setError && setError('');
    } catch (error) {
        setName(null);
        setSymbol(null);
        setTotalSupply && setTotalSupply(null);
        setDecimals(null);
        setError && setError('Failed to fetch token data');
        setBalance(0);
    }
};
