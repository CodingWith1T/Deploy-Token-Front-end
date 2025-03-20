import React, { useState } from 'react';

export default function Step1({ setStep, sendEther, name, balance, recipientsInput, handleRecipientsInputChange, tokenAddress, setTokenAddress }) {
    const [errorMessage, setErrorMessage] = useState('');

    // Regex to validate Ethereum address format
    const isValidAddress = (address) => {
        const regex = /^0x[a-fA-F0-9]{40}$/;
        return regex.test(address);
    };

    // Function to check if the amount is valid
    const isValidAmount = (amount) => {
        return !isNaN(amount) && parseFloat(amount) > 0;
    };

    const handleTextareaChange = (e) => {
        const value = e.target.value;
        handleRecipientsInputChange(e); // Calls the parent function to handle recipients input change

        // Split the addresses and amounts by new lines
        const recipients = value.split('\n');
        let invalidInput = false;
        let invalidLineMessage = '';

        recipients.forEach((line, index) => {
            const [address, amount] = line.split(',').map((part) => part.trim());
            if (!address || !amount) {
                invalidInput = true;
                invalidLineMessage = `Line ${index + 1}: Address and amount cannot be empty.`;
            } else if (!isValidAddress(address)) {
                invalidInput = true;
                invalidLineMessage = `Line ${index + 1}: Invalid Ethereum address format.`;
            } else if (!isValidAmount(amount)) {
                invalidInput = true;
                invalidLineMessage = `Line ${index + 1}: Invalid amount. Amount should be a positive number.`;
            }
        });

        if (invalidInput) {
            setErrorMessage(invalidLineMessage);
        } else {
            setErrorMessage('');
        }
    };

    // Check if the form is valid for enabling the button
    const isFormValid = () => {
        const isRecipientsValid = recipientsInput.split('\n').every((line) => {
            const [address, amount] = line.split(',').map((part) => part.trim());
            return isValidAddress(address) && isValidAmount(amount);
        });

        return isRecipientsValid && recipientsInput.trim() !== '';
    };

    return (
        <>
            {!sendEther && (
                <>
                    <div className='col-md-4'>
                        <label htmlFor="Chain">Chain</label><br />
                        <select placeholder='Chain' id="Chain">
                            <option value="BNB">BNB</option>
                        </select>
                    </div>
                    <div className='col-md-8'>
                        <label htmlFor="Token">Token</label><br />
                        <input
                            type="text"
                            id="Token"
                            placeholder='Token'
                            name="Token"
                            value={tokenAddress}
                            onChange={(e) => setTokenAddress(e.target.value)}
                        />
                        {tokenAddress && <div className='col-md-12'><strong>Token Name : </strong>{name} <span><strong>Balance : </strong></span> {balance}</div>}
                    </div>

                    <div className='col-md-12'>
                        <label htmlFor="Recipients">Enter recipient addresses and amounts:</label><br />
                        <textarea
                            id="w3review"
                            name="w3review"
                            value={recipientsInput}
                            rows="4"
                            cols="50"
                            placeholder='Insert address and amount, separate with a comma'
                            onChange={handleTextareaChange}
                        />
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <p>Note: Insert one address and respective amount per line. Separate the address and amount with a comma and no space in between.</p>

                </>
            )}
            {sendEther && (
                <>
                    <div className='col-md-12'>
                        <label htmlFor="Recipients">Enter recipient addresses and amounts:</label><br />
                        <textarea
                            id="w3review"
                            name="w3review"
                            value={recipientsInput}
                            rows="4"
                            cols="50"
                            placeholder='Insert address and amount, separate with a comma'
                            onChange={handleTextareaChange}
                        />
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <p>Note: Insert one address and respective amount per line. Separate the address and amount with a comma and no space in between.</p>

                </>
            )}
            <button
                className={`multisender ${!isFormValid() ? 'bg-black' : 'multisender'}`}
                disabled={!isFormValid()}
                type="button"
                onClick={() => setStep(prevStep => prevStep + 1)}
            >
                Next
            </button>
        </>
    );
}
