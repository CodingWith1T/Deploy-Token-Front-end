import "./globals.css";
import { Providers } from "./providers";
import '@rainbow-me/rainbowkit/styles.css';
import Navbar from "@/Componests/Navbar/Navbar";
import Footer from "@/Componests/Footer/Footer";
import Link from 'next/link';
import Sidebar from "@/Componests/Sidebar/Sidebar";

export const metadata = {
  title: "Token Maker – Create Your Own Crypto Token in Minutes | DeployTokens",
  description: "Create your own crypto token instantly with DeployTokens, the easiest Token Maker for ERC20, BEP20, and more. No coding required – launch in minutes!",
  twitterImage: "https://deploytokens.com/assets/images/twitterimg.png" 

};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.twitterImage} />
        <meta property="og:url" content="https://deploytokens.com" />  
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.twitterImage} />
      </head>
      <body>
        <Providers>
       <Sidebar/> 
       <div className="maindiv">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var _smartsupp = _smartsupp || {};
              _smartsupp.key = 'db4a83e313957d60291941926590a0f0e368bc3b';
              window.smartsupp = function(d) {
                var s,c,o = smartsupp = function(){ o._.push(arguments)}; o._ = [];
                s = d.getElementsByTagName('script')[0];
                c = d.createElement('script');
                c.type = 'text/javascript';
                c.charset = 'utf-8';
                c.async = true;
                c.src = 'https://www.smartsuppchat.com/loader.js?';
                s.parentNode.insertBefore(c, s);
              }(document);
            `,
          }}
        />
      

        {/* Smartsupp noscript */}
        <noscript>
          Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a>
        </noscript>
        
      </body>
      
    </html>
  );
}