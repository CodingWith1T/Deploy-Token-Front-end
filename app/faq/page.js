import React from 'react'

export default function page() {
    return (
        <section className="faqpage py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="fw-bolder">
                        DeployTokens.com – <span style={{ color: '#0082db' }}>FAQ</span>
                    </h1>
                    <p className="faqsub lead fw-normal text-muted mb-0">
                        We're here to answer any question you may have, and here is a curated list of the most <br></br>commonly asked questions. Feel free to ask more!
                    </p>
                </div>
                <div className="row gx-5">
                    <div className="col-md-6">
                        <div className="faqsection">
                            <h3>What is DeployTokens.com?</h3>
                            <p>DeployTokens.com is a platform that allows users to create tokens on all major blockchains instantly. Our platform offers a fast, easy, and cost-effective way to launch customized tokens without the need for coding expertise.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="faqsection">
                            <h3>Which blockchains are supported for token creation?</h3>
                            <p>We support major blockchains including Ethereum, Binance Smart Chain (BSC), Polygon, Avalanche, Fantom, and more.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="faqsection">
                            <h3>What is the cost to create a token on DeployTokens.com?</h3>
                            <p>Our pricing ranges from $50 to $80 per token, depending on the blockchain and the features you select.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="faqsection">
                            <h3>How long does it take to deploy a token?</h3>
                            <p>Token deployment is instant. As soon as you complete the process and payment, your token is live on the blockchain of your choice.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="faqsection">
                            <h3>Can I customize the token’s name, symbol, and supply?</h3>
                            <p>Yes, you have complete control over the name, symbol, total supply, and other parameters of your token during the creation process.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="faqsection">
                            <h3>Do you support tokens with advanced features like minting or burning?</h3>
                            <p>Yes, we support tokens with advanced features like minting or burning.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="faqsection">
                            <h3>Are the tokens created compliant with ERC-20 or BEP-20 standards?</h3>
                            <p>Yes, all tokens created through DeployTokens.com adhere to the standard protocols of their respective blockchains, such as ERC-20, BEP-20, and others.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="faqsection">
                            <h3>How can I contact DeployTokens.com for support or inquiries?</h3>
                            <p>You can reach us via Email: <span>support@deploytokens.com</span>, Telegram: <span>deploytokens</span>, or through the live chat feature on our website.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}