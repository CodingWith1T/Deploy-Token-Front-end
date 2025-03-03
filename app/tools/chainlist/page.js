import ChainList from "../../../Componests/ChainList/ChainList";

export async function generateMetadata() {

  // Define the title and description
  const title = `Find & Add EVM Networks to MetaMask | DeployTokens`;
  const description = `Explore a comprehensive list of EVM networks on Chainlist with DeployTokens. Find active RPCs, chain IDs, symbols, block explorers, and testnet faucets for any Chainlist network. Easily connect and add custom networks to your MetaMask wallet with a single click, simplifying your Web3 and token deployment experience.`;

  return { 
    title,
    description,
  };
}

export default function Page() {
  return (
    <ChainList/>
  );
}
