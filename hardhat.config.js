// hardhat.config.js

import 'dotenv/config'; 
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from 'hardhat/config';
// parseEther fonksiyonu ethers'ın global namespace'inde olmadığı için doğrudan Hardhat tarafından alınır.

// --- Ortam Değişkenlerini Çekme ---
const RPC_URL = process.env.RPC_URL;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; 

// --- Sabitler ---
const BASE_CHAIN_ID = 8453; // Base Mainnet ID'si
const BASE_SEPOLIA_CHAIN_ID = 84532; // Base Sepolia Testnet ID'si

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
    // Sözleşme derleme ayarları
    solidity: {
        version: "0.8.20", 
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    
    // Ağ konfigürasyonları
    networks: {
        hardhat: {},
        base: {
            url: RPC_URL || "https://mainnet.base.org", 
            accounts: DEPLOYER_PRIVATE_KEY ? [`0x${DEPLOYER_PRIVATE_KEY}`] : [], 
            chainId: BASE_CHAIN_ID,
        },
        baseSepolia: {
            url: process.env.BASE_SEPOLIA_RPC_URL || RPC_URL || "", 
            accounts: DEPLOYER_PRIVATE_KEY ? [`0x${DEPLOYER_PRIVATE_KEY}`] : [],
            chainId: BASE_SEPOLIA_CHAIN_ID, 
        }
    },

    // Etherscan/BaseScan doğrulama ayarları
    etherscan: {
        apiKey: {
            base: ETHERSCAN_API_KEY,
            baseSepolia: ETHERSCAN_API_KEY,
        },
        customChains: [
            {
                network: "base",
                chainId: BASE_CHAIN_ID,
                urls: {
                    apiURL: "https://api.basescan.org/api",
                    browserURL: "https://basescan.org"
                }
            },
            {
                network: "baseSepolia",
                chainId: BASE_SEPOLIA_CHAIN_ID,
                urls: {
                    apiURL: "https://api-sepolia.basescan.org/api",
                    browserURL: "https://sepolia.basescan.org"
                }
            },
        ]
    }
};

export default config;