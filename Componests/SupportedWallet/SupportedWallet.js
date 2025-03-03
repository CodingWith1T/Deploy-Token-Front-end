import Link from 'next/link'
import React from 'react'

export default function SupportedWallet() {
  return (
    <>
      <section className="py-5 lunchtoken">
        <div className="container">
          <div className="d-flex gx-5">
            <div className="col-lg-7 mb-5 mb-lg-0 d-flex justify-content-center align-items-center">
              {/* Uncomment this if you want a clickable title */}
              {/* <div className="moving_shape">
            <h3
              className="fw-bolder mb-0 Connect"
              style={{ textShadow: '1px 7px 1px rgba(0, 0, 0, 0.2)', cursor: 'pointer' }}
              onClick={ConnectWallet}
            >
              Connect with
            </h3>
          </div> */}
              <div>
                <h3 className='fw-bolder' style={{ marginBottom: 20, fontSize: 30, color: '#000' }}>
                  Launch Your Token on Major Blockchains
                </h3>
                <p className="Launchpara">Why spend weeks and thousands on developers when you can create a token in minutes? With DeployTokens, our powerful Token Maker and Token Creator, you can bring your ideas to life—no coding required.</p>
                <p className="Launchpara launchtokens">
                  Whether you're launching a token for fundraising, user incentives, or as a new digital currency, our user-friendly platform makes it seamless. DeployTokens supports all major blockchains, giving businesses, communities, and innovators the flexibility they need.
                </p>
				
				<p className="Launchpara">Starting at just $50, we make token creation fast, affordable, and hassle-free. Leave the coding to us while you focus on your vision. Get started today and experience effortless tokenization! </p>
                <Link className="startcreating btn btn-primary btn-lg px-4 me-sm-3" href="/create-token/ethereum">Launch Token
                  
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="connectbox h-100">
                <div className="feature1 Scratchimg">
                  <img src="/assets/images/launchtoken.png" alt='launchtoken' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="generator" id="features">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="display-6"> Why Choose DeployTokens?</h1>
              </div>
            </div>
          </div>
          <div className="container px-4 py-0" id="icon-grid">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
              <div className="col d-flex align-items-start"> <span className="icon"> 🚀</span>
                <div>
                  <h4 className="fw-bold mb-0">No coding required</h4>
                  <p> Easily create tokens without any programming skills </p>
                </div>
              </div>
              <div className="col d-flex align-items-start"> <span className="icon"> ✅ </span>
                <div>
                  <h4 className="fw-bold mb-0">Verified Contracts</h4>
                  <p>Source code instantly available and verified after deployment.</p>
                </div>
              </div>
              <div className="col d-flex align-items-start"> <span className="icon"> 🌐</span>
                <div>
                  <h4 className="fw-bold mb-0">Free Testnet Support</h4>
                  <p>Test your tokens for free on testnets before launching them on the mainnet.</p>
                </div>
              </div>
              <div className="col d-flex align-items-start"> <svg xmlns="http://www.w3.org/2000/svg" className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"></path>
              </svg>
                <div>
                  <h4 className="fw-bold mb-0">Unique Contracts</h4>
                  <p>Get 100% exact-match source code verified on BscScan, EtherScan, and more.</p>
                </div>
              </div>
              <div className="col d-flex align-items-start"> <span className="icon"> 🔒</span>
                <div>
                  <h4 className="fw-bold mb-0">Safe & Secure</h4>
                  <p>Enjoy peace of mind with a no-questions-asked refund if tokens are not delivered.</p>
                </div>
              </div>
              <div className="col d-flex align-items-start"> <svg className="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em" viewBox="0 0 16 16">
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"></path>
                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"></path>
              </svg>
                <div>
                  <h4 className="fw-bold mb-0">Embrace DeFi</h4>
                  <p>Join the next big revolution in decentralized finance.</p>
                </div>
              </div>
              <div className="col d-flex align-items-start"> <span className="icon"> 📈</span>
                <div>
                  <h4 className="fw-bold mb-0">Expand Your Business</h4>
                  <p> Unlock web3 potential and grow your enterprise effortlessly. </p>
                </div>
              </div>
              <div className="col d-flex align-items-start"> <span className="icon"> 💎 </span>
                <div>
                  <h4 className="fw-bold mb-0">Be Proud</h4>
                  <p> Share your tokens with family, friends, and the world. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted">
        <div className="container text-center">
          <div className="col-sm-12">
            <h3 className="display-6">Thriving Community</h3>
            <p className="thrivingsub">Connect with the largest community of token creators for inspiration and support.</p>
          </div>
          <h2 className="Connects"> Trusted by Startups </h2>
          <div className="row">
            <div className="col-sm">
              <div className="boxs">
                <h4>🔐 Reliable <br />
                  Smart Contracts</h4>
                <p>Secure your project with our trusted, thoroughly tested, solutions.</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="boxs">
                <h4>⚙️ Proven Platform</h4>
                <p>Join countless startups that rely on us—no reported issues, only success stories.</p>
              </div>
            </div>
            <div className="col-sm">
              <div className="boxs">
                <h4>✨ The Best Choice for <br />
                  Your Project</h4>
                <p>Take your project to the next level with our secure and dependable services.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container lastchild mt-2">
          <div className="row">
            <div className="col-sm">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">2K+</h5>
                  <p className="card-text">Tokens generated</p>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">10K+</h5>
                  <p className="card-text">Unique users</p>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">10K+</h5>
                  <p className="card-text">Automated tests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="affiliate">
        <div className="container">
          <div className="d-flex gx-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="affiliatebox">
                <h2 className="fw-bolder">Affiliate Program <br />
                Earn by referring users!</h2>
                <p>Join the DeployTokens.com Affiliate Program and earn Flat <br></br>30% per sale by referring users to our platform.</p>
                <p className='whyjoin'><strong>Why Join?</strong></p>
                <ul>
                  <li>💸 <strong>High Commissions - </strong> Flat 30% per referral.</li>
                  <li>💰 <strong>Lifetime Earnings  - </strong> Earn from every purchase your referrals make.</li>
                  <li>🚀 <strong>Easy Tracking   - </strong> Real-time stats via your affiliate dashboard.</li>
                  <li>🚀 <strong>Fast Payouts    - </strong> Withdraw earnings in crypto </li>
                </ul>
                <p className='afbuttion'>
                <a className="startcreating btn btn-primary btn-lg px-4 me-sm-3" href="#">Start earning as Affiliate  <i className="bi bi-arrow-right"></i></a>
                <p className='comingsoon'>Coming Soon</p>
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="h-100 afilateimg">

                <div className="feature1"> <img src="/assets/images/afilateprogram.png" alt="afilateprogram" /></div>
              </div>
            </div>



          </div>
        </div>
      </section>


    </>
  )
}
