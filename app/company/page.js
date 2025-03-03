import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <>
            {/* About section one */}  
            <section className="abtbox" id="scroll-target">
                <div className="container">
                    <div className="abtboxsub row gx-5 align-items-center">
                       
                    <div className="col-lg-12 Companysection">
                            <h2 className="fw-bolder">About Us</h2>
                            <img className="aboutimg" src={"/assets/images/aboutimg.png"} alt="slider" />
                            <p className="lead fw-normal text-muted mb-3">Welcome to DeployTokens.com, your one-stop solution for creating and deploying tokens across all major blockchains. We are passionate about empowering businesses, developers, and entrepreneurs to unlock the potential of blockchain technology without the hassle of coding or navigating complex technical barriers.</p>
                            <p className="lead fw-normal text-muted mb-3"> At DeployTokens.com, we believe that blockchain innovation should be accessible to everyone. That’s why we’ve built a user-friendly platform that allows you to create tokens in minutes, whether you need them for your business, project, or personal use. With token creation prices ranging from just $50 to $100, we’re making blockchain technology affordable and straightforward.</p>
                            <h2>Our Mission</h2>
                            <p>Our mission is to democratize access to blockchain technology by providing a seamless and cost-effective way to create tokens. We strive to be a trusted partner in your blockchain journey, delivering a platform that prioritizes simplicity, efficiency, and reliability.</p>
                          
                        </div>

                        <div className="col-lg-6 videobox">
                       
                           {/* <video autoPlay muted loop id="myVideo">
                                <source src={deploytoken} type="video/mp4" />
                            </video> */}
                        </div>
                      
                    </div>
                </div>
            </section>


  <section class="generator Apart">
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="display-6"> What Sets Us Apart?</h3>
        </div>
      </div>
    </div>
    <div className="abt container px-3 py-0" id="icon-grid">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <div className="col d-flex align-items-start"> <span className="icon"> 🚀</span>
          <div>
            <h4 className="fw-bold mb-0">Instant Token Creation</h4>
            <p> Deploy tokens on major blockchains like Ethereum, Binance Smart Chain, Polygon, and more, instantly. </p>
          </div>
        </div>
        <div className="col d-flex align-items-start"> <span className="icon"> ✅ </span>
          <div>
            <h4 className="fw-bold mb-0">Affordable Pricing</h4>
            <p>High-quality service doesn’t have to break the bank. Our pricing ensures that anyone can bring their blockchain ideas to life.</p>
          </div>
        </div>
        <div className="col d-flex align-items-start"><svg xmlns="http://www.w3.org/2000/svg" class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"></path>
          </svg>
          <div>
            <h4 className="fw-bold mb-0">No Coding Required</h4>
            <p>Test your tokens for free on testnets before launching them on the mainnet.</p>
          </div>
        </div>
        <div className="col d-flex align-items-start"><span className="icon"> 🌐</span>
          <div>
            <h4 className="fw-bold mb-0">Secure and Reliable</h4>
            <p> Security is at the core of what we do. We prioritize your data and ensure all token deployments meet industry standards.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="affiliate WhyChoosesection">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <div className="WhyChoose">
          <h3 className="fw-bolder">Why Choose DeployTokens.com?</h3>
          <p>We’re not just a platform; we’re your blockchain partner. Whether you’re launching a new cryptocurrency, creating tokens for your project, or experimenting with blockchain technology, we’re here to make it easy and efficient. Our team of experts is constantly improving the platform to stay ahead of the curve and meet your evolving needs.</p>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="WhyChoose">
          <h3 className="fw-bolder">Join the Blockchain Revolution</h3>
          <p>The future is decentralized, and we’re here to help you be a part of it. With DeployTokens.com, you can turn your vision into reality and join the thousands of innovators shaping the blockchain ecosystem.</p>
          <p>Let’s build the future together. Start creating your tokens today! </p>
        </div>
      </div>
    </div>
  </div>
</section>

            
        </>
  )
}