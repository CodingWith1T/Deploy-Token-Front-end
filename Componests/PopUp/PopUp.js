"use client"
import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

export default function PopUp({ receipt, closePopup }) {
    const { chain } = useAccount(); // Get the chain information
    const [transactionDetails, setTransactionDetails] = useState(null);

    useEffect(() => {
        const fetchTransactionDetails = async () => {
            try {
                if (receipt) {
                    // Fetch the transaction details and set the transaction details
                    setTransactionDetails(receipt);
                }
            } catch (error) {
                console.error("Error fetching transaction details:", error);
            }
        };

        if (receipt) {
            fetchTransactionDetails();
        }
    }, [receipt]);

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <img src="/assets/images/success.png" alt="Abstract" className="w-6 h-6" />
                <h2>Token Created Successfully</h2>
                {receipt?.transactionHash && (
                    <p className='transaction'>
                        <strong>View your transaction details here:</strong>{" "}
                        <br />
                        <a
                            href={`${chain?.blockExplorers?.default.url}/tx/${receipt.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                        >
                            {receipt.transactionHash}
                        </a>
                    </p>
                )}
                {receipt?.contractAddress && (
                    <p className='address'>
                        <strong>Token Address:</strong>{" "}
                        <br />
                        <a
                            href={`${chain?.blockExplorers?.default.url}/address/${receipt.contractAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                        >
                            {receipt.contractAddress}
                        </a>
                    </p>
                )}
                <p className='discription'>
                    All Token Created by Deploytokens.com will be manually verified by our tech team in
                    few hrs. in case not done, please message in our telegram group 
                    <a href='https://t.me/deploytokens'> https://t.me/deploytokens</a> , we will get it done. For any question, please feel free to
                    discuss in our telegram group
                </p>
                <button onClick={closePopup} className="close-button">
                    Close
                </button>
            </div>
            <style jsx>{`
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 999;
                }
                .popup-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
                    text-align: center;
                }
                .close-button {
                    background-color: #ff6347;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .close-button:hover {
                    background-color: #e5533d;
                }
            `}</style>
        </div>
    );
}
