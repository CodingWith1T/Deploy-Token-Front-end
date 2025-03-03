import SupportedChain from '@/Componests/SupportedChain/SupportedChain';
import SupportedWallet from '@/Componests/SupportedWallet/SupportedWallet';
import Link from 'next/link';

function Page() {
  return (
    <main>
      <section className="slider" id='slider'>
        <div className="container">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-7">
              <div className="caption text-center text-xl-start">
                <div>
                  <h1 className="display-5 mb-2">
                    The Ultimate Token Maker <br /> for Every Blockchain
                  </h1>
                  <p><h2 style={{ color: 'blue' }}>Create Token under a Minute</h2><br/> DeployTokens is the ultimate Token Maker and Token Creator for every blockchain, making it easy to create and deploy custom crypto tokens in minutes. Whether you need an ERC20, BEP20, or any other blockchain token, our no-code platform ensures a seamless experience. No technical skills required – just configure, deploy, and launch your token instantly. Start building your crypto project today!</p>
                </div>

                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start text-white">
                  <Link className="startcreating btn btn-primary btn-lg px-4 me-sm-3" href="/create-token/ethereum">Create Token <i className="bi bi-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5  sliderimages">
              <img className="animationimg" src="/assets/images/sliderimg.png" alt="slider" />
            </div>

          </div>
        </div>
      </section>
      <SupportedChain />
      <SupportedWallet />
      {/* <Blog /> */}
    </main>
  );
}

export default Page;