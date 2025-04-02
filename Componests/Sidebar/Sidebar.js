'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
<div className="tooglebuttondiv justify-between items-center">
    {/* Hamburger Button */}
    <button
      className="togglebtn text-black md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? "✖" : "☰"}
    </button>
</div>


<ul id="nav" className={`sidebarleftmenu openmenu absolute left-0 top-full w-full bg-blue-600 md:static md:flex md:space-x-6 md:w-auto transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-y-0" : "-translate-y-[200%] md:translate-y-0 hidden md:flex"
        }`}
      >
    <li className="toggle">
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </li>
    <li className="sidebarlogo">
      <Link className="navbar-brand" href="/">
      <img src='/assets/images/sidebarlogo.png' alt="Logo" /> 
      </Link>
      </li>
    <li className="menu-item">
     <Link href="/create-token/ethereum">
      <span className="icon">
      <i className="fa fa-rocket"></i>
      </span>
      <span className="label">Create Token</span>
      </Link>
    </li>
    <li className="menu-item">
      <Link href="/multi-sender">
      <span className="icon">
      <i className="fa fa-users"></i>
      </span>
      <span className="label">Multisender</span>
      </Link>
    </li>

    <li className="menu-item">
      <Link href="/create-lock">
      <span className="icon">
      <i className="fa fa-lock"></i>
      </span>
      <span className="label">Create Lock</span>
      </Link>
    </li>

    <li className="menu-item">
      <Link href="/lock-list">
      <span className="icon">
      <i className="fa fa-list"></i>
      </span>
      <span className="label">Lock list</span>
      </Link>
    </li>

    <li className="menu-item">
      <Link href="/token-badge">
      <span className="icon">
      <i className="fa fa-certificate"></i>
      </span>
      <span className="label">Token Badge</span>
      </Link>
    </li>

    <li className="menu-item">
      <Link href="/tools/multi-chain-balance-checker">
      <span className="icon">
      <i className="fa fa-check-circle"></i>
      </span>
      <span className="label">Balance checker</span>
      </Link>
    </li>

    <li className="menu-item">
      <Link href="/tools/chainlist">
      <span className="icon">
      <i className="fa fa-file-text-o"></i>
      </span>
      <span className="label">Chainlist</span>
      </Link>
    </li>
    <li className="menu-item">
      <Link target="_blank" href="https://blog.deploytokens.com/token-creation-fees/">
      <span className="icon">
      <i className="fa fa-diamond"></i> 
      </span>
      <span className="label">Fees</span>
      </Link>
    </li>

    <li className="menu-item">
      <Link target="_blank" href="https://blog.deploytokens.com/">
      <span className="icon">
      <i className="fa fa-pencil-square-o"></i> 
      </span>
      <span className="label">Blog</span>
      </Link>
    </li>

    

    <li className="menu-item telegrambtn">
      <Link target="_blank" href="https://t.me/deploytokens">
      <span className="icon">
      <i className="fa fa-telegram"></i>
      </span>
      <span className="label">Support</span>
      </Link>
    </li>




  </ul>
</nav>





  );
}