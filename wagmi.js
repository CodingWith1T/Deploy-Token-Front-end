import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  bsc,
  base,
  arbitrum,
  optimism,
  avalanche,
  blast,
  mantle,
  zkSync,
  polygon,
  coreDao,
  bscTestnet,
  sepolia,
} from 'wagmi/chains';
import Soneium from "@/custom-chains/Sonium"
import Alvey from "@/custom-chains/Alvey"
import opBNB from "@/custom-chains/opBNB"
import PulseChain from "@/custom-chains/PulseChain"
import Sonic from "@/custom-chains/Sonic"
import Abstract from "@/custom-chains/Abstract"
import Linea from "@/custom-chains/Linea"
import UniChian from "@/custom-chains/UniChain"

export const config = getDefaultConfig({
  appName: 'DeployTokens',
  projectId: '2c714cfad8a2dd87aca80dddc0e2d717',
  chains: [
    mainnet,
    bsc,
    base,
    arbitrum,
    optimism,
    polygon,
    avalanche,
    Soneium,
    Alvey,
    coreDao,
    blast,
    opBNB,
    zkSync,
    mantle,
    Sonic,
    PulseChain,
    Abstract,
    Linea,
    UniChian,
    bscTestnet,
    sepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});