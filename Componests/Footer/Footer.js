"use client"
import { useState } from 'react'
import Link from 'next/link';

const footerLinks = [
  {
    title: 'Links',
    items: [
      { name: 'Home', path: '/' },
      { name: 'Company', path: '/company' },
      { name: 'Docs', path: 'https://docs.deploytokens.com/' },
      { name: 'Blog', path: 'https://blog.deploytokens.com/' },
      { name: 'Contact Us', path: '/contact-us' },
      { name: 'Privacy', path: '/privacy' },

    ],
  },
  {
    title: 'Token Tool',
    items: [
      { name: 'Create ERC20 Token', path: '/create-token/ethereum' },
      { name: 'Create BEP20 Token', path: '/create-token/binance-smart-chain' },
      { name: 'Create Base Token', path: '/create-token/base' },
      { name: 'Create Polygon Token', path: '/create-token/polygon' },
      { name: 'Create Arbitrum Token', path: '/create-token/arbitrum-one' },
      { name: 'Create Token on Blast', path: '/create-token/blast' },
      // { name: 'Create Avalanche Token', path: '/create-token/Avalanche' },
      // { name: 'Multi Chain Balance Checker', path: '/multi-chain-balance-checker/' },
    ],
  },


  {
    title: 'Resources',
    items: [
      //{ name: 'Create ERC20 Token', path: '/erc-20/Ethereum' },
      { name: 'How to Create ERC20 Token', path: 'https://blog.deploytokens.com/blog/how-to-create-erc20-token-instantly/' },
      { name: 'How to Create BEP20 Token', path: 'https://blog.deploytokens.com/blog/create-bep20-token-on-bnb-smart-chain-in-4-steps-2025-no-code/' },
      { name: 'How to Create Token on Base', path: 'https://blog.deploytokens.com/blog/how-to-create-a-token-on-base/' },
      { name: 'How to Launch a Successful Token', path: 'https://blog.deploytokens.com/blog/how-to-launch-a-successful-token-key-steps-from-creation-to-marketing/' },
      { name: 'How to Create Meme Coin', path: 'https://blog.deploytokens.com/blog/how-to-create-a-meme-coin-on-ethereum-in-1-minute/' },
      { name: 'How to Create Token on Unichain', path: 'https://blog.deploytokens.com/blog/how-to-create-token-on-unichain-in-1-minute-without-coding/' },
      //{ name: 'Create Token on Core', path: '/create-token/core' },
      //{ name: 'Create Token on OpBNB', path: '/create-token/opbnb' },

      ,
    ],
  },
];
export default function Footer() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  // Function to send email to the server or API
  const sendEmail = async (name, email) => {
    try {
      const response = await fetch('https://admin.deploytokens.com/api/send-subscribe ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const data = await response.json();
      setSuccessMessage('Thank you for subscribing!');
      setName('');
      setEmail('');
    } catch (error) {
      setError('There was an error sending your email');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Clear previous error
    setError('');

    // Send the email
    sendEmail(name, email);
  };

  // Helper function to check if the path is an external link
  const isExternalLink = (url) => {
    return url.startsWith('http');
  };

  return (
    <>
      <footer className="text-black text-center text-lg-start">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12 mb-4">
              <img src="/assets/images/logo2.png" alt="Abstract" className="w-auto h-6" />
              <p className='topparagrah'>Create your own token on major blockchains instantly, with zero coding required. Simplify token deployment and bring your ideas to life in just a few clicks!</p>
              <ul className="sociallink">
                <li> <a className="flink" href="https://x.com/deploytokens" target="_blank" rel="noopener noreferrer"> <i className="fa fa-twitter"></i> </a> </li>
                <li><a className="flink" href="https://t.me/deploytokens" target="_blank" rel="noopener noreferrer"> <i className="fa fa-telegram"></i> </a> </li>
                <li> <a className="flink" href="https://www.youtube.com/@deploytokens" target="_blank" rel="noopener noreferrer"> <i className="fa fa-youtube-play"></i> </a> </li>
                <li><a className="flink" href="https://github.com/deploytokens/" target="_blank" rel="noopener noreferrer"> <i className="fa fa-github"></i> </a> </li>

              </ul>

            </div>
            {footerLinks.map((section, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <h5>{section.title}</h5>
                <ul className="list-unstyled mb-0">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.path}
                        target={isExternalLink(item.path) ? '_blank' : '_self'}
                        rel={isExternalLink(item.path) ? 'noopener noreferrer' : ''}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>

    </>
  )
}