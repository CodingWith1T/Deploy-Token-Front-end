'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';

const Page = () => {
  const [recipientList, setRecipientList] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [isNativeToken, setIsNativeToken] = useState(true);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [totalAmount, setTotalAmount] = useState('0');
  const [remainingBalance, setRemainingBalance] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [costDetails, setCostDetails] = useState(null);
  const { address: userAddress, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const supportedChains = [
    { id: 56, name: 'Binance Smart Chain', nativeCurrency: 'BNB', multisenderAddress: '0x43924f32140b16a4cd2980471429733512da144f', explorerBaseUrl: 'https://bscscan.com' },
 // { id: 97, name: 'BNB Testnet', nativeCurrency: 'tBNB', multisenderAddress: '0x7d208e1d8b5ac9b3299ae7319d4fdcda1c7581a9', explorerBaseUrl: 'https://testnet.bscscan.com' },
  ];

  const DEFAULT_CHAIN_ID = 56; // BNB Mainnet

  const currentChain = supportedChains.find(chain => chain.id === chainId) || supportedChains[0];
  const nativeCurrencySymbol = currentChain.nativeCurrency;
  const multisenderAddress = currentChain.multisenderAddress;
  const explorerBaseUrl = currentChain.explorerBaseUrl;

  const erc20Abi = [
    'function approve(address spender, uint256 amount) public returns (bool)',
    'function transfer(address to, uint256 amount) public returns (bool)',
    'function decimals() public view returns (uint8)',
    'function balanceOf(address account) public view returns (uint256)',
    'function name() public view returns (string)',
    'function symbol() public view returns (string)',
    'function allowance(address owner, address spender) public view returns (uint256)',
  ];

  const multisenderAbi = [
    'function sendNative(address[] calldata recipients, uint256[] calldata amounts) external payable',
    'function sendTokens(address token, address[] calldata recipients, uint256[] calldata amounts) external payable',
    'function adminFee() public view returns (uint256)',
  ];

  const MAX_RECIPIENTS_PER_BATCH = 200;

  // Switch to BNB Mainnet only on initial connect
  useEffect(() => {
    if (isConnected && !supportedChains.some(chain => chain.id === chainId)) {
      // Switch to mainnet only if wallet is not on a supported chain
      switchChain({ chainId: DEFAULT_CHAIN_ID });
    }
  }, [isConnected, chainId, switchChain]);

  useEffect(() => {
    setIsApproved(false);
    setTransactionDetails(null);
    setRemainingBalance(null);
    if (isNativeToken) setTokenAddress('');
  }, [isNativeToken]);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!isConnected || !tokenAddress || !ethers.isAddress(tokenAddress)) {
        setTokenBalance(null);
        setTokenDecimals(null);
        setTokenName(null);
        setTokenSymbol(null);
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);
        const balance = await tokenContract.balanceOf(userAddress);
        const decimals = await tokenContract.decimals();
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        setTokenBalance(ethers.formatUnits(balance, decimals));
        setTokenDecimals(decimals);
        setTokenName(name);
        setTokenSymbol(symbol);
        setError('');
      } catch (err) {
        setError('Failed to fetch token details: ' + err.message);
      }
    };
    fetchTokenDetails();
  }, [tokenAddress, userAddress, isConnected]);

  useEffect(() => {
    const fetchNativeBalance = async () => {
      if (!isConnected || !isNativeToken) {
        setTokenBalance(null);
        setTokenDecimals(null);
        setTokenName(null);
        setTokenSymbol(null);
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(userAddress);
        setTokenBalance(ethers.formatEther(balance));
        setTokenDecimals(18);
        setTokenName(nativeCurrencySymbol);
        setTokenSymbol(nativeCurrencySymbol);
        setError('');
      } catch (err) {
        setError('Failed to fetch native token balance: ' + err.message);
      }
    };
    fetchNativeBalance();
  }, [isNativeToken, userAddress, isConnected, nativeCurrencySymbol]);

  const parseRecipients = () => {
    const lines = recipientList.trim().split('\n');
    const recipients = [];
    const amounts = [];
    let total = BigInt(0);

    for (const line of lines) {
      const [address, amount] = line.split(',').map(item => item.trim());
      if (!ethers.isAddress(address)) throw new Error(`Invalid address: ${address}`);
      if (!amount || isNaN(amount) || parseFloat(amount) <= 0) throw new Error(`Invalid amount for address ${address}: ${amount}`);
      recipients.push(address);
      const parsedAmount = isNativeToken ? ethers.parseEther(amount) : ethers.parseUnits(amount, tokenDecimals || 18);
      amounts.push(parsedAmount);
      total += parsedAmount;
    }
    return { recipients, amounts, total };
  };

  const estimateGas = async (signer, recipients, amounts, totalValue, adminFee) => {
    const multisenderContract = new ethers.Contract(multisenderAddress, multisenderAbi, signer);
    try {
      return isNativeToken
        ? await multisenderContract.sendNative.estimateGas(recipients, amounts, { value: totalValue + adminFee })
        : await multisenderContract.sendTokens.estimateGas(tokenAddress, recipients, amounts, { value: adminFee });
    } catch (err) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const nativeBalance = await provider.getBalance(userAddress);
      if (isNativeToken && nativeBalance < (totalValue + adminFee)) {
        throw new Error(`Insufficient ${nativeCurrencySymbol} balance. Required: ${ethers.formatEther(totalValue + adminFee)} ${nativeCurrencySymbol} for amount + admin fee`);
      } else if (!isNativeToken && nativeBalance < adminFee) {
        throw new Error(`Insufficient ${nativeCurrencySymbol} balance. Required: ${ethers.formatEther(adminFee)} ${nativeCurrencySymbol} for admin fee`);
      }
      throw err;
    }
  };

  const fetchAdminFee = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const multisenderContract = new ethers.Contract(multisenderAddress, multisenderAbi, provider);
    return await multisenderContract.adminFee();
  };

  const checkAllowance = async () => {
    if (isNativeToken || !tokenAddress || !ethers.isAddress(tokenAddress)) return true;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);
    const { total } = parseRecipients();
    const allowance = await tokenContract.allowance(userAddress, multisenderAddress);
    return allowance >= total;
  };

  const calculateCost = async () => {
    if (!recipientList || !isConnected) return;
    setError('');
    setCostDetails(null);

    try {
      const { recipients, amounts, total } = parseRecipients();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const gasPrice = ethers.parseUnits("5", "gwei");
      const adminFee = await fetchAdminFee();

      if (!isNativeToken && (!tokenAddress || !ethers.isAddress(tokenAddress))) {
        setError('Please enter a valid token address.');
        return;
      }

      if (!isNativeToken) {
        const hasAllowance = await checkAllowance();
        if (!hasAllowance) {
          setError(`Insufficient allowance for ${tokenSymbol || 'token'}. Please approve at least ${ethers.formatUnits(total, tokenDecimals || 18)} ${tokenSymbol || 'tokens'}`);
          return;
        }
      }

      const nativeBalance = await provider.getBalance(userAddress);
      if (isNativeToken && nativeBalance < (total + adminFee)) {
        setError(`Insufficient ${nativeCurrencySymbol} balance. Required: ${ethers.formatEther(total + adminFee)} ${nativeCurrencySymbol} for amount + admin fee`);
        return;
      } else if (!isNativeToken && nativeBalance < adminFee) {
        setError(`Insufficient ${nativeCurrencySymbol} balance. Required: ${ethers.formatEther(adminFee)} ${nativeCurrencySymbol} for admin fee`);
        return;
      }

      const gasEstimate = await estimateGas(signer, recipients, amounts, total, adminFee);
      const gasCost = gasEstimate * gasPrice;

      if (isNativeToken && nativeBalance < (total + adminFee + gasCost)) {
        setError(`Insufficient ${nativeCurrencySymbol} balance. Required: ${ethers.formatEther(total + adminFee + gasCost)} ${nativeCurrencySymbol} for amount + admin fee + gas`);
        return;
      } else if (!isNativeToken && nativeBalance < (adminFee + gasCost)) {
        setError(`Insufficient ${nativeCurrencySymbol} balance. Required: ${ethers.formatEther(adminFee + gasCost)} ${nativeCurrencySymbol} for admin fee + gas`);
        return;
      }

      setCostDetails({
        totalSent: isNativeToken ? ethers.formatEther(total) : ethers.formatUnits(total, tokenDecimals || 18),
        adminFee: ethers.formatEther(adminFee),
        gasCost: ethers.formatEther(gasCost),
        totalCost: isNativeToken ? ethers.formatEther(total + adminFee + gasCost) : ethers.formatEther(adminFee + gasCost),
      });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleApprove = async () => {
    if (!isConnected) {
      setError('Please connect your wallet to proceed.');
      return;
    }
    if (!tokenAddress || !ethers.isAddress(tokenAddress)) {
      setError('Please enter a valid token address.');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    setTransactionDetails(null);
    setRemainingBalance(null);

    try {
      const { total } = parseRecipients();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);

      const allowance = await tokenContract.allowance(userAddress, multisenderAddress);
      if (allowance < total) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const approveTx = await tokenContract.approve(multisenderAddress, total);
        await approveTx.wait();
        setIsApproved(true);
        setSuccess('Token approved successfully! Now you can send.');
      } else {
        setIsApproved(true);
        setSuccess('Already approved! Proceed to send.');
      }
      await calculateCost();
    } catch (err) {
      console.error("Approval error:", err);
      if (err.code === -32603 && err.message.includes('already pending')) {
        setError('A transaction is already pending. Please wait for it to complete or clear it in your wallet.');
      } else {
        setError('Approval failed: ' + (err.message || 'Transaction rejected or insufficient funds'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMultisend = async () => {
    if (!isConnected) return setError('Please connect your wallet.');
    if (!isNativeToken && (!tokenAddress || !ethers.isAddress(tokenAddress))) return setError('Please enter a valid token address.');
    if (!multisenderAddress) return setError('Multisender contract not available on this chain.');
    if (!isNativeToken && !isApproved) return setError('Please approve the token first.');

    setError('');
    setSuccess('');
    setLoading(true);
    setTransactionDetails(null);
    setRemainingBalance(null);

    try {
      const { recipients, amounts, total } = parseRecipients();
      setTotalAmount(isNativeToken ? ethers.formatEther(total) : ethers.formatUnits(total, tokenDecimals || 18));
      if (recipients.length > MAX_RECIPIENTS_PER_BATCH) throw new Error(`Too many recipients. Maximum allowed per batch is ${MAX_RECIPIENTS_PER_BATCH}.`);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const gasPrice = ethers.parseUnits("5", "gwei");
      const adminFee = await fetchAdminFee();

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isNativeToken) {
        const balance = await provider.getBalance(userAddress);
        const gasEstimate = await estimateGas(signer, recipients, amounts, total, adminFee);
        const gasCost = gasEstimate * gasPrice;
        const totalCost = total + adminFee + gasCost;

        if (balance < totalCost) throw new Error(`Insufficient ${nativeCurrencySymbol} balance. Required: ${ethers.formatEther(totalCost)} ${nativeCurrencySymbol} for amount + admin fee + gas`);

        const multisenderContract = new ethers.Contract(multisenderAddress, multisenderAbi, signer);
        const tx = await multisenderContract.sendNative(recipients, amounts, { 
          value: total + adminFee,
          gasLimit: gasEstimate * BigInt(12) / BigInt(10),
          gasPrice
        });
        const receipt = await tx.wait();
        if (receipt.status === 0) throw new Error('Transaction reverted.');

        const newBalance = await provider.getBalance(userAddress);
        setRemainingBalance(ethers.formatEther(newBalance));
        const details = {
          totalSent: ethers.formatEther(total),
          adminFee: ethers.formatEther(adminFee),
          recipientCount: recipients.length,
          txHash: receipt.transactionHash || tx.hash,
          explorerUrl: `${explorerBaseUrl}/tx/${receipt.transactionHash || tx.hash}`,
        };
        setTransactionDetails(details);
        setSuccess(`Successfully sent ${ethers.formatEther(total)} ${nativeCurrencySymbol} to ${recipients.length} addresses`);
        setTimeout(() => setSuccess(''), 5000);
      } else {
        const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);
        const decimals = await tokenContract.decimals();
        const tokenBalance = await tokenContract.balanceOf(userAddress);

        if (tokenBalance < total) throw new Error(`Insufficient ${tokenSymbol || 'token'} balance. Required: ${ethers.formatUnits(total, decimals)} ${tokenSymbol || 'tokens'}`);

        const nativeBalance = await provider.getBalance(userAddress);
        const gasEstimate = await estimateGas(signer, recipients, amounts, 0, adminFee);
        const gasCost = gasEstimate * gasPrice;

        if (nativeBalance < (adminFee + gasCost)) throw new Error(`Insufficient ${nativeCurrencySymbol} balance. Required: ${ethers.formatEther(adminFee + gasCost)} ${nativeCurrencySymbol} for admin fee + gas`);

        const multisenderContract = new ethers.Contract(multisenderAddress, multisenderAbi, signer);
        const tx = await multisenderContract.sendTokens(tokenAddress, recipients, amounts, {
          value: adminFee,
          gasLimit: gasEstimate * BigInt(12) / BigInt(10),
          gasPrice
        });
        const receipt = await tx.wait();
        if (receipt.status === 0) throw new Error('Transaction reverted.');

        const newTokenBalance = await tokenContract.balanceOf(userAddress);
        setRemainingBalance(ethers.formatUnits(newTokenBalance, decimals));
        const details = {
          totalSent: ethers.formatUnits(total, decimals),
          adminFee: ethers.formatEther(adminFee),
          recipientCount: recipients.length,
          txHash: receipt.transactionHash || tx.hash,
          explorerUrl: `${explorerBaseUrl}/tx/${receipt.transactionHash || tx.hash}`,
        };
        setTransactionDetails(details);
        setSuccess(`Successfully sent ${ethers.formatUnits(total, decimals)} ${tokenSymbol} to ${recipients.length} addresses`);
        setTimeout(() => setSuccess(''), 5000);
        setIsApproved(false);
      }
    } catch (err) {
      console.error("Transaction error:", err);
      if (err.code === -32603 && err.message.includes('already pending')) {
        setError('A transaction is already pending in your wallet. Please wait for it to complete or clear it before trying again.');
      } else {
        setError(err.message || 'An unexpected error occurred during the transaction.');
      }
      if (err.transactionHash) {
        setTransactionDetails({
          totalSent: totalAmount,
          adminFee: ethers.formatEther(await fetchAdminFee()),
          recipientCount: parseRecipients().recipients.length,
          txHash: err.transactionHash,
          explorerUrl: `${explorerBaseUrl}/tx/${err.transactionHash}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateCost();
  }, [recipientList, isNativeToken, tokenAddress]);

  return (
    <div className="multisenderbox airdroppage">
      <h1>Multisender: The fastest way to send tokens in bulk</h1>
      <div className="formbox">
        {!isConnected && (
          <p className="wallet-warning">Please connect your wallet to proceed.</p>
        )}
        <div className="input-group">
          <label className="label">Select Blockchain</label>
          <select
            className="select"
            value={chainId || DEFAULT_CHAIN_ID}
            onChange={(e) => {
              const newChainId = parseInt(e.target.value);
              switchChain({ chainId: newChainId })
                .catch((err) => {
                  setError(`Failed to switch to ${supportedChains.find(c => c.id === newChainId)?.name || 'selected chain'}. Please add it to your wallet.`);
                });
            }}
            disabled={!isConnected}
          >
            {supportedChains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name} ({chain.nativeCurrency})
              </option>
            ))}
          </select>
          {costDetails && <p>Admin Fee: {costDetails.adminFee} {nativeCurrencySymbol}</p>}
        </div>
        <div className="label"><b>Token Type</b></div>
        <div className="toggle-group">
          <button
            className={`toggle-button ${isNativeToken ? 'toggle-button-active' : ''}`}
            onClick={() => setIsNativeToken(true)}
            disabled={!isConnected}
          >
            Native ({nativeCurrencySymbol})
          </button>
          <button
            className={`toggle-button ${!isNativeToken ? 'toggle-button-active' : ''}`}
            onClick={() => setIsNativeToken(false)}
            disabled={!isConnected}
          >
            ERC20/BEP20
          </button>
        </div>

        {!isNativeToken && (
          <div className="input-group">
            <label className="label">Token Address</label>
            <input
              type="text"
              className="input"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="e.g. 0x..."
              disabled={!isConnected}
            />
            {tokenName && tokenSymbol && tokenBalance !== null && (
              <p><b>Token:</b> {tokenName} ({tokenSymbol})<br /><b>Your Balance:</b> {tokenBalance}</p>
            )}
          </div>
        )}

        {isNativeToken && tokenBalance !== null && (
          <div className="input-group">
            <p><b>Token:</b> {tokenName} ({tokenSymbol})<br /><b>Your Balance:</b> {tokenBalance}</p>
          </div>
        )}

        <div className="input-group">
          <label className="label">Recipient List (Format: address,amount per line)</label>
          <textarea
            className="textarea"
            value={recipientList}
            onChange={(e) => setRecipientList(e.target.value)}
            placeholder="Insert address and amount, separate with a comma"
            disabled={!isConnected}
          />
          <p><b>Maximum recipients per batch:</b> {MAX_RECIPIENTS_PER_BATCH}</p>
        </div>

        {costDetails && (
          <div className="Maximumbox input-group">
            <p><b>Total Sent:</b> {costDetails.totalSent} {isNativeToken ? nativeCurrencySymbol : tokenSymbol || 'Tokens'}</p>
            <p><b>Admin Fee:</b> {costDetails.adminFee} {nativeCurrencySymbol}</p>
            <p><b>Estimated Gas Cost:</b> {costDetails.gasCost} {nativeCurrencySymbol}</p>
            <p><b>Total Cost:</b> {costDetails.totalCost} {isNativeToken ? nativeCurrencySymbol : nativeCurrencySymbol} + {costDetails.totalSent} {tokenSymbol || 'Tokens'}</p>
          </div>
        )}

        {!isNativeToken && !isApproved ? (
          <button
            className="approvebutton"
            onClick={handleApprove}
            disabled={!isConnected || loading || !recipientList}
          >
            {loading ? 'Approving...' : 'Approve Tokens'}
          </button>
        ) : (
          <button
            className="sendtoken"
            onClick={async () => {
              if (!isNativeToken) {
                const hasAllowance = await checkAllowance();
                if (!hasAllowance) {
                  setIsApproved(false);
                  setError(`Insufficient allowance for ${tokenSymbol || 'token'}. Please approve at least ${ethers.formatUnits(parseRecipients().total, tokenDecimals || 18)} ${tokenSymbol || 'tokens'}`);
                  return;
                }
              }
              handleMultisend();
            }}
            disabled={!isConnected || loading || !recipientList}
          >
            {loading ? 'Processing...' : 'Send Tokens'}
          </button>
        )}

        {transactionDetails && (
          <div className="transaction-details">
            <h3>Transaction Summary</h3>
            <p>Total Sent: {transactionDetails.totalSent} {isNativeToken ? nativeCurrencySymbol : tokenSymbol || 'Tokens'}</p>
            <p>Admin Fee: {transactionDetails.adminFee} {nativeCurrencySymbol}</p>
            <p>Recipients: {transactionDetails.recipientCount}</p>
            <p>Remaining Balance: {remainingBalance} {isNativeToken ? nativeCurrencySymbol : tokenSymbol || 'Tokens'}</p>
            <p>
              Transaction Hash:{' '}
              {transactionDetails.txHash ? (
                <a href={transactionDetails.explorerUrl} target="_blank" rel="noopener noreferrer">
                  {transactionDetails.txHash}
                </a>
              ) : (
                'Not Available'
              )}
            </p>
          </div>
        )}

        {error && <div className="error"><p>{error}</p></div>}
        {success && <div className="success"><p>{success}</p></div>}
      </div>
      {isConnected && (
        <p className="connected-wallet">Connected Wallet: <strong>{userAddress}</strong></p>
      )}
    </div>
  );
};

export default Page;