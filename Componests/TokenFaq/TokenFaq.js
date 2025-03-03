"use client"
import React, { useState } from 'react'

export default function TokenFaq({ tokenName }) {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        // Toggle the accordion item
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='row'>

        <h2 className="faqtittle">FAQ - How to Create Token on {tokenName}</h2>
        
        <ul className='faqnew'>
         <li>
         <h3>What is DeployTokens.com?</h3>
         <p> DeployTokens.com is a no-code platform that allows users to create ERC-20 tokens instantly on {tokenName} and other blockchains.</p>
         </li>

         <li>
         <h3>How do I create a token on {tokenName}?</h3>
         <p> Visit DeployTokens.com, select {tokenName}, configure your token settings, and deploy it within minutes-no coding required.</p>
         </li>

         <li>
         <h3>What types of tokens can I create on {tokenName}?</h3>
         <p> You can create ERC-20 tokens with optional features like minting, burning, pausing, transaction fees, and more.</p>
         </li>

         <li>
         <h3>How much does it cost to create a token on {tokenName}?</h3>
         <p> The cost ranges from $50 to $70, plus {tokenName} gas fees required for deployment.</p>
         </li>

         <li>
         <h3>Do I need coding skills to create an {tokenName} token?</h3>
         <p> No, our platform automates the token creation process, making it easy for anyone to launch a token without technical knowledge.</p>
         </li>

         <li>
         <h3>Is my token instantly available after deployment?</h3>
         <p> Yes, once deployed, your token is live on {tokenName} and can be viewed on {tokenName}.</p>
         </li>

         <li>
         <h3>Can I list my token on exchanges after creation?</h3>
         <p> Yes, after creation, you can list your token on decentralized exchanges (DEXs) like Uniswap or apply for listings on centralized exchanges.</p>
         </li>

         <li>
         <h3>Can I customize my {tokenName} token with advanced features?</h3>
         <p>Yes, you can add advanced functionalities such as Mint, Setting Supply Cap, Burn Pause , and more.</p>
         </li>

         <li>
         <h3>Do I need to verify my token on {tokenName} Scan?</h3>
         <p>No, all tokens created on DeployTokens.com are manually verified by our tech team within a few hours. You don't need to do anything.</p>
         </li>

         <li>
         <h3>Is DeployTokens.com secure?</h3>
         <p>Yes, we use standardized and audited smart contracts to ensure secure and transparent token creation. Let me know if you need further updates! ??</p>
         </li>


        </ul>


             <div className='faqsections'>
            {/* <h2 className="text-2xl font-medium">FAQ - How to Create Token on {tokenName}</h2> */}
            {/* <div className="w-full max-w-md mx-auto mt-4 ">
                <div className="faqb">
                 
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800  border-b border-gray-300 focus:outline-none"
                            onClick={() => toggleAccordion(0)}
                        >
                            What is DeployTokens.com?
                        </button>
                        {activeIndex === 0 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                DeployTokens.com is a no-code platform that allows users to create ERC-20 tokens instantly on {tokenName} and other blockchains.
                            </div>
                        )}
                    </div>

                  
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border-b border-gray-300 focus:outline-none"
                            onClick={() => toggleAccordion(1)}
                        >
                            How do I create a token on {tokenName}?
                        </button>
                        {activeIndex === 1 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                Visit DeployTokens.com, select {tokenName}, configure your token settings, and deploy it within minutes-no coding required.
                            </div>
                        )}
                    </div>

                   
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border-b border-gray-300 focus:outline-none"
                            onClick={() => toggleAccordion(2)}
                        >
                            What types of tokens can I create on {tokenName}?
                        </button>
                        {activeIndex === 2 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                You can create ERC-20 tokens with optional features like minting, burning, pausing, transaction fees, and more.
                            </div>
                        )}
                    </div>

                   
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border-b border-gray-300 focus:outline-none"
                            onClick={() => toggleAccordion(3)}
                        >
                            How much does it cost to create a token on {tokenName}?
                        </button>
                        {activeIndex === 3 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                The cost ranges from $50 to $70, plus {tokenName} gas fees required for deployment.
                            </div>
                        )}
                    </div>

                   
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border-b border-gray-300 focus:outline-none"
                            onClick={() => toggleAccordion(4)}
                        >
                            Do I need coding skills to create an {tokenName} token?
                        </button>
                        {activeIndex === 4 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                No, our platform automates the token creation process, making it easy for anyone to launch a token without technical knowledge.
                            </div>
                        )}
                    </div>

                    
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border-b border-gray-300 rounded-b-md focus:outline-none"
                            onClick={() => toggleAccordion(5)}
                        >
                            Is my token instantly available after deployment?
                        </button>
                        {activeIndex === 5 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                Yes, once deployed, your token is live on {tokenName} and can be viewed on {tokenName}.
                            </div>
                        )}
                    </div>

                   
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border-b border-gray-300 rounded-b-md focus:outline-none"
                            onClick={() => toggleAccordion(6)}
                        >
                            Can I list my token on exchanges after creation?
                        </button>
                        {activeIndex === 6 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                Yes, after creation, you can list your token on decentralized exchanges (DEXs) like Uniswap or apply for listings on centralized exchanges.
                            </div>
                        )}
                    </div>
                   
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border-b border-gray-300 rounded-b-md focus:outline-none"
                            onClick={() => toggleAccordion(7)}
                        >
                            Can I customize my {tokenName} token with advanced features?
                        </button>
                        {activeIndex === 7 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                Yes, you can add advanced functionalities such as Mint, Setting Supply Cap, Burn Pause , and more.
                            </div>
                        )}
                    </div>
                   
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border-b border-gray-300 rounded-b-md focus:outline-none"
                            onClick={() => toggleAccordion(8)}
                        >
                            Do I need to verify my token on {tokenName}Scan?
                        </button>
                        {activeIndex === 8 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                No, all tokens created on DeployTokens.com are manually verified by our tech team within a few hours. You don't need to do anything.
                            </div>
                        )}
                    </div>
                   
                    <div>
                        <button
                            className="faqdiv w-full text-left px-4 py-2 text-gray-800 bg-gray-100 border-b border-gray-300 rounded-b-md focus:outline-none"
                            onClick={() => toggleAccordion(9)}
                        >
                            Is DeployTokens.com secure?
                        </button>
                        {activeIndex === 9 && (
                            <div className="faqcontentb px-4 py-2 text-gray-600">
                                Yes, we use standardized and audited smart contracts to ensure secure and transparent token creation.
                                Let me know if you need further updates! ??
                            </div>
                        )}
                    </div>
                </div>
            </div> */}
            </div>
        </div>
    )
}
