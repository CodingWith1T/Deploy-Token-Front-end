'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white justify-content-center sticky-top">
    <div className="container-fluid">
      <Link className="navbar-brand" href="/">
        <img src='/assets/images/icons/logo.png' alt="Logo" /> 
      </Link> 
      
      {/* <div className="navbar-collapse justify-content-center" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link topbtn nav-link text-gray-600 hover:text-blue-600" href="/create-token/ethereum">Create Token</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link topbtn nav-link text-gray-600 hover:text-blue-600" href="/airdrop">Airdrop</Link>
          </li>
          <li className="nav-item">
            <Link target='_blank' className="nav-link topbtn nav-link text-gray-600 hover:text-blue-600" href="https://blog.deploytokens.com/token-creation-fees/">Fees</Link>
          </li>
          <li className="nav-item">
            <Link target='_blank' className="nav-link topbtn nav-link text-gray-600 hover:text-blue-600" href="https://blog.deploytokens.com/">Blog</Link>
          </li>
          <li className="nav-item telegram">
            <Link target='_blank' className="nav-link topbtn nav-link text-gray-600 hover:text-blue-600" href="https://t.me/deploytokens"><i className="fa fa-telegram"></i> Telegram</Link>
          </li>
          <li className="nav-item ConnectButton">
            {isClient && <ConnectButton accountStatus="avatar" />}
          </li>
        </ul>
      </div> */}
      <div className='ConnectButtonright'>
        {isClient && <ConnectButton accountStatus="avatar" />}
      </div>
    </div>
  </nav>
  )
}
