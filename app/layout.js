import "./globals.css";
import { Providers } from "./providers";
import '@rainbow-me/rainbowkit/styles.css';
import Navbar from "@/Componests/Navbar/Navbar";
import Footer from "@/Componests/Footer/Footer";

export const metadata = {
  title: "Instant Token Maker on Your Favorite Chain | DeployTokens",
  description: "Why wait? Create and launch your token instantly on any blockchain- no coding, fast, secure, and effortless. Instant launch choose, customize.",
  twitterImage: "https://deploytokens.com/assets/images/sliderimg.png" 

};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
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
          <div>
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
