import React from 'react';

export default function Step2({ setStep, depositAmount, name, symbol, decimals, totalSupply, recipientsInput, handleDeposit }) {
    return (
        <div className="step2-container">
            <h2>Transaction Details</h2>
            <p><strong>Deposit Amount:</strong> {depositAmount}</p>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Symbol:</strong> {symbol}</p>
            <p><strong>Decimals:</strong> {decimals}</p>
            <p><strong>Total Supply:</strong> {totalSupply}</p>

            <h3>Recipients:</h3>
            <div className="recipients-list">
                {recipientsInput.split('\n').map((recipient, index) => {
                    const [address, value] = recipient.split(',');
                    return (
                        <p key={index}>
                            <strong>Address:</strong> {address} | <strong>Value to send:</strong> {value}
                        </p>
                    );
                })}
            </div>

            <div className="button-group">
                <button className="multisender" type="button" onClick={() => setStep(prevStep => prevStep - 1)}>Previous</button>
                <button className="multisender" type="button" onClick={handleDeposit}>MultiSender</button>
            </div>
        </div>
    );
}
