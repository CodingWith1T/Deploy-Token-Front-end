export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD'
// Main Fee
export const creationFee = {
    '1': 0.018, // Ethereum Mainnet
    '56': 0.077, // BNB Chain (BSC)
    '8453': 0.018, // Base
    '42161': 0.018, // Arbitrum
    '10': 0.018, // Optimism
    '137': 165, // Polygon POS (158 POL)
    '43114': 2, // Avalanche
    '1868': 0.018, // Soneium
    '3797': 7500, // AlveyChain (2 ALV)
    '1116': 98, // core
    '81457': 0.018, // Blast
    '324': 0.018, // zksync
    '5000': 48, // Mantle (44 MNT)
    '130': 0.018, // Unichain
    '204': 0.077, // Op BNB
    // New Added
    '146': 66, // Sonic
    '369': 1000000, // Pulsechain (PLS)
    '2741': 0.018, // Abstract (ETH)
    '59144': 0.018, // Linea

    '11155111': 0.1, // Sepolia
    '97': 0.1, // BNB Chain Testnet
};


export const feeAddress ={
    '1':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // Ethereum
    '56':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // bsc 
    '8453':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // base
    '42161':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // arbitrum 
    '10':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // optimism
    '137':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // polygon
    '43114':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // Avalanche
    '1868':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // Soneium 
    '3797':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // Alvey
    '1116':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da", // Core 
    '81457':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da",  // blast
    '204':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da",  // Op BNB
    '324':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da",  // zksync
    '9998':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da",  // Mantle

    '146':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da",  // Sonic
    '369':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da",  // Pulsechain
    '2741':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da",  // Abstract
    '59144':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da",  // Lenia
    '130':"0xc6f4Ed55921E0B73c5b3A916F005d80216cF17da",  // UniChain

    '11155111': "0xFe674cC158a6900b8D3Da018296565861329c398", // sepolia
    '97': "0xFe674cC158a6900b8D3Da018296565861329c398", // bscTestnet
}

// Add on Fee
export const utilitiesFee = {
    '1': 0.0018, // Ethereum Mainnet
    '56': 0.0077, // BNB Chain (BSC)
    '8453': 0.0018, // Base
    '42161': 0.0018, // Arbitrum
    '10': 0.0018, // Optimism
    '137': 17, // Polygon POS (158 POL)
    '43114': 0.2, // Avalanche
    '1868': 0.0018, // Soneium
    '3797': 750, // AlveyChain (2 ALV)
    '1116': 10, // core
    '81457': 0.0018, // Blast
    '204': 0.0077, // Op BNB
    '324': 0.0086, // zksync
    '5000': 4.8, // Mantle (44 MNT)

    '146': 7, // Sonic (S)
    '369': 100000, // Pulsechain (PLS)
    '2741': 0.0018, // Abstract
    '59144': 0.0018, // Linea
    '130': 0.0018, // UniChain

    '11155111': 0.003, // Sepolia
    '97': 0.0040, // BNB Chain Testnet
};


// export const TokenManager ={
//     '1':"0x8C85627e1138fDBd5B2C377F29dffbf59e42443B", // mainnet simple Token

//     '11155111':"0xb92cd831bB592f4bcF6710dcaDf995Cf4222862E", // sepolia

//     '56':"0x5FC1AB5dC2E6DF2347aDC7946beEA027f6a5a5d0", // bsc done
	
//     '1868':"0xd0c53e7078b195fa5f410ad7ab27a3cd7ef57ca0", // Soneium done

//     '97':"0xF8F88413a4bbB2821c5562fE92bCC46313C9aa54", // bscTestnet done

//     '42161':"0x8024C7Ad520c8CaeF8D20007daFb70B314B80741", // arbitrum done

//     '8453':"0x37C4796a5a96b382AFD6F90DB73646681630207B", // base done

//     '1088':"0xC4D68bF8695536b1aC6c7fe8921Ce34AE9eA1489", // Metis pending

//     '81457':"0x9d147bAf2974B03836969E5d34FC2A8a41eC8500",  // blast

//     '137':"0x5218DBBaF7c228A0b436F28CB9b171E28DfC6990", // polygon done

//     '10':"0x37C4796a5a96b382AFD6F90DB73646681630207B", // optimism done

//     '43114':"0x37c4796a5a96b382afd6f90db73646681630207b", // Avalanche 

//     '3797':"0x20870C578e476359F84565053e58BCd465F12d71", // Alvay done
// }       



// Remix 
// Compiler - 0.8.23
// EVM Version - shanghai