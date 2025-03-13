import { multicall } from '@wagmi/core';
import { config } from "@/wagmi"
import abi from '../../config/helper/erc20.json';
import { formatUnits } from 'viem';
import { DEAD_ADDRESS } from "../../config/helper/helper"

// Helper function to validate Ethereum addresses
export const isValidAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address.trim());

export const VerifyToken = async (tokenAddress, setName, setSymbol, setDecimals, setTotalSupply, setBalance, address, setError) => {

    if (!tokenAddress) {
        setName(null);
        setSymbol(null);
        setTotalSupply && setTotalSupply(null);
        setDecimals(null);
        setBalance(0);
        return;
    }

    if (!isValidAddress(tokenAddress)) {
        setName(null);
        setSymbol(null);
        setTotalSupply && setTotalSupply(null);
        setDecimals(null);
        setError && setError('⚠️Invalid token address');
        setBalance(0);
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
        setBalance(results[4]?.result ? formatUnits(results[4].result, 18) : "0");

        // Clear any previous errors
        setError && setError('');
    } catch (error) {
        setName(null);
        setSymbol(null);
        setTotalSupply && setTotalSupply(null);
        setDecimals(null);
        setBalance(0);
        setError && setError('Failed to fetch token data');
    }
};
