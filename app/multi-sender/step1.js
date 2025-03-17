import React from 'react'

export default function step1({ setStep, recipientsInput, handleRecipientsInputChange, tokenAddress, setTokenAddress }) {
    return (
        <>
            <div className='col-md-4'>
                <label for="cars">Chain</label><br></br>
                <select placeholder='Chain' id="Chain">
                    <option value="Eth">Eth</option>
                    <option value="BNB">BNB</option>
                </select>
            </div>
            <div className='col-md-8'>
                <label for="cars">Token</label><br></br>
                <input type="text" id="fname" placeholder='Token' name="fname" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
            </div>
            <div className='col-md-12'>
                <label for="cars">Enter reciepient addredsses:</label><br></br>
                <textarea id="w3review" name="w3review" value={recipientsInput} rows="4" cols="50" placeholder='Insert address and amount, separate with comma' onChange={handleRecipientsInputChange}>

                </textarea>
            </div>
            <button className='multisender' type="button" onClick={() => setStep(prevStep => prevStep + 1)}>Next</button>
        </>
    )
}
