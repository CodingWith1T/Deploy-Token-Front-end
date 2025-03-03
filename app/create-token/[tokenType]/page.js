import { redirect } from 'next/navigation';
import CreateToken from "@/Componests/Create-Token/CreateToken";
import Head from 'next/head';

// Comprehensive chain mapping
const CHAIN_MAPPING = {
  'ethereum': 'ethereum',
  'binance-smart-chain': 'binance-smart-chain',
  'base': 'base',
  'arbitrum-one': 'arbitrum-one',
  'optimism': 'optimism',
  'polygon': 'polygon',
  'alvey': 'alvey',
  'soneium': 'soneium',
  'core': 'core',
  'blast': 'blast',
  'opbnb': 'opbnb',
  'zksync': 'zksync',
  'avalanche': 'avalanche',
  'mantle': 'mantle',
  'sonic': 'sonic',
  'pulsechain': 'pulsechain',
  'abstract': 'abstract',
  'linea': 'linea',
  'unichain': 'unichain',
  'binance-smart-chain-testnet': 'binance-smart-chain-testnet',
  'sepolia': 'sepolia',
  
  // Variations
  'op-mainnet': 'optimism',
  'zksync-era': 'zksync'
};

// Static params for dynamic routing
export async function generateStaticParams() {
  return Object.keys(CHAIN_MAPPING).map(route => ({ 
    tokenType: route 
  }));
}

// Token normalization and validation
async function getToken(params) {
  const { tokenType } = await params;

  // Normalize the token (handle both hyphens and capitalization)
  const normalizedToken = tokenType
    ? decodeURIComponent(tokenType)
      .toLowerCase()
      .replace(/\s+/g, '-')
    : null;

  // Check if the original URL matches the normalized token
  if (tokenType !== normalizedToken) {
    // Redirect to lowercase URL if there's a capitalization mismatch
    redirect(`/create-token/${normalizedToken}`);
  }

  // Validate and map the token
  const validatedToken = CHAIN_MAPPING[normalizedToken];

  // If token is not found, redirect to default chain (ethereum)
  if (!validatedToken) {
    redirect('/create-token/ethereum');
  }

  return validatedToken;
}

// Metadata generation
export async function generateMetadata({ params }) {
  const token = await getToken(params);
  const canonicalUrl = `https://deploytokens.com/create-token/${token}`; // Dynamic URL based on token
  
  // Define the title and description
  const title = `${token.charAt(0).toUpperCase() + token.slice(1)} Token Generator `;
  const description = `Create your ${token.charAt(0).toUpperCase() + token.slice(1)} token instantly with our  ${token.charAt(0).toUpperCase() + token.slice(1)} Token Generator. No coding required – fast, secure, and affordable. Launch your ${token.charAt(0).toUpperCase() + token.slice(1)} token today!`;

  return { 
    title,
    description,
    canonical: canonicalUrl
  };
}

export default async function Page({ params }) {
  // Fetch and validate token
  const token = await getToken(params);
  
  return (
    <> 
      <Head>
        <link rel="canonical" href={`https://deploytokens.com/create-token/${token}`} />
      </Head>
      <div>
        <CreateToken token={token} />
      </div>
    </>
  );
}
