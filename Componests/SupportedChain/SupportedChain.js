"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function SupportedChain() {
  const pathname = usePathname();

  const isActive = (route) => {
    // Normalize routes to handle variations
    const normalizedPathname = pathname.replace('/create-token/', '').toLowerCase();
    const normalizedRoute = route.replace('/create-token/', '').toLowerCase();

    // Comprehensive route aliases and variations
    const routeAliases = {
      'unichain': 'uni',
      'uni': 'unichain',
      'opbnb': 'opbnb-mainnet',
      'opbnb-mainnet': 'opbnb',
      'optimism-bnb': 'opbnb',
      'optimism': 'op-mainnet',
      'op-mainnet': 'optimism',
      'zksync': 'zksync-era',
      'zksync-era': 'zksync',
      'bnb-smart-chain': 'binance-smart-chain',
      'binance-smart-chain': 'bnb-smart-chain',
      'pulsechain': 'pulsechain',
      'pulsechain': 'pulsechain'
    };

    // Normalize with hyphens and spaces
    const normalizeRoute = (route) => route
      .replace(/-/g, ' ')
      .replace(/\s+/g, '-')
      .replace(/\s/g, '-')
      .toLowerCase();

    const normalizedPathnameVariant = normalizeRoute(normalizedPathname);
    const normalizedRouteVariant = normalizeRoute(normalizedRoute);

    // Check multiple matching conditions
    return (
      normalizedPathname === normalizedRoute || 
      normalizedPathname === routeAliases[normalizedRoute] || 
      routeAliases[normalizedPathname] === normalizedRoute ||
      normalizedPathnameVariant === normalizedRouteVariant
    ) ? 'active' : '';
  };

  return (
    <section className="Supported py-5">
      <div className="container">
        <div className="gx-5">
          <div className="col-lg-12 col-xl-12">
            <h2 className="fw-bolder">Create Token on</h2>
          </div>
        </div>
        <div className="row gx-5 my-3 chain">
          <ul>
            {[
              { to: "/create-token/ethereum", imgSrc: "/assets/images/1-DLc6yFb9.png", alt: "Ethereum", name: "Ethereum" },
              { to: "/create-token/binance-smart-chain", imgSrc: "/assets/images/bnb-wHTSaPfa.png", alt: "BNB", name: "BNB" },
              { to: "/create-token/base", imgSrc: "/assets/images/base-O8_WHCgp.png", alt: "Base", name: "Base" },
              { to: "/create-token/arbitrum-one", imgSrc: "/assets/images/arbitrum-LPNhWe-8.png", alt: "Arbitrum", name: "Arbitrum" },
              { to: "/create-token/optimism", imgSrc: "/assets/images/Optimism.png", alt: "Optimism", name: "Optimism" },
              { to: "/create-token/polygon", imgSrc: "/assets/images/polygon-y4PkePcY.png", alt: "Polygon", name: "Polygon" },
              { to: "/create-token/alvey", imgSrc: "/assets/images/alvay.webp", alt: "ALV", name: "Alvey" },
              { to: "/create-token/soneium", imgSrc: "/assets/images/soneium-chain.png", alt: "Soneium", name: "Soneium" },
              { to: "/create-token/core", imgSrc: "/assets/images/Core.png", alt: "Core", name: "Core" },
              { to: "/create-token/blast", imgSrc: "/assets/images/Blast.png", alt: "Blast", name: "Blast" },
              { to: "/create-token/opbnb", imgSrc: "/assets/images/opBNB.png", alt: "opBNB", name: "opBNB" },
              { to: "/create-token/zksync", imgSrc: "/assets/images/ZkSync.png", alt: "ZkSync", name: "ZkSync" },
              { to: "/create-token/avalanche", imgSrc: "/assets/images/Avalanche.png", alt: "Avalanche", name: "Avalanche" },
              { to: "/create-token/mantle", imgSrc: "/assets/images/Mantle.png", alt: "Mantle", name: "Mantle" },
              { to: "/create-token/sonic", imgSrc: "/assets/images/Sonic.png", alt: "Sonic", name: "Sonic" },
              { to: "/create-token/pulsechain", imgSrc: "/assets/images/Pulsechain.png", alt: "Pulsechain", name: "PulseChain" },
              { to: "/create-token/abstract", imgSrc: "/assets/images/Abstract.png", alt: "Abstract", name: "Abstract" },
              { to: "/create-token/linea", imgSrc: "/assets/images/Linea.png", alt: "Linea", name: "Linea" },
              { to: "/create-token/unichain", imgSrc: "/assets/images/unichain.webp", alt: "unichain", name: "Uni" },
              { to: "/create-token/binance-smart-chain-testnet", imgSrc: "/assets/images/bnb-wHTSaPfa.png", alt: "tbnb", name: "BNB Testnet" },
              { to: "/create-token/sepolia", imgSrc: "/assets/images/sepolia-DY1y1bSg.png", alt: "Sepolia", name: "Sepolia" },
            ].map((chain, index) => (
              <li key={index} className={`cursor-pointer hover:bg-gray-100 transition-all duration-300 rounded-lg p-2 ${isActive(chain.to)}`}>
                <Link href={chain.to} className="flex flex-col items-center text-decoration-none">
                  <img src={chain.imgSrc} alt={chain.alt} className="w-16 h-16 mb-2" />
                  <span className="text-center text-sm font-medium">{chain.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
