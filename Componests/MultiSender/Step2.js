import React from 'react';

export default function Step2({ setStep, depositAmount, name, symbol, decimals, balance, balanceWallet, recipientsInput, handleDeposit }) {
    return (
        <div className="step2-container">
            <h2>Summary</h2>
            <div className='row'>
            <div className='col-md-12'><strong>Name:</strong> {name} ({symbol})</div>   
            <div className='col-md-12'><strong>Total number of addresses  :</strong> {recipientsInput.split('\n').length}</div>
            <div className='col-md-12'><strong>Total number of token to be sent:</strong> {symbol} {depositAmount}</div>
            <div className='col-md-12'><strong>Your token balance :</strong> {symbol} {balance}</div>
            <div className='col-md-12'><strong>Remaining tokens :</strong> {symbol} {balance-depositAmount} </div>
            <div className='col-md-12'><strong>Your BNB balance  :</strong> BNB {balanceWallet}</div>

            </div>
            <h3>List of Recipients:</h3>
            <div className="recipients-list">
                {recipientsInput.split('\n').map((recipient, index) => {
                    const [address, value] = recipient.split(',');
                    return (
                        <p key={index}>
                            <strong>Address:</strong> {address} <span><strong>{symbol} : </strong> <b>{value}</b></span>
                        </p>
                    );
                })}
            </div>

            <div className="button-group">
                <button className="previous multisender" type="button" onClick={() => setStep(prevStep => prevStep - 1)}>Previous</button>
                <button className="multisender" type="button" onClick={handleDeposit}>MultiSender</button>
            </div>
        </div>
    );
}