// hardhat.config.ts

import 'dotenv/config'; 
import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from 'hardhat/config';

// Hardhat'ın .env'den çektiği değişkenleri kullanıyoruz
const RPC_URL = process.env.RPC_URL;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; 

// Konfigürasyon Objesi
const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.20", 
        settings: { optimizer: { enabled: true, runs: 200 } },
    },
    networks: {
        hardhat: {},
        base: {
            url: RPC_URL || "https://mainnet.base.org", 
            accounts: DEPLOYER_PRIVATE_KEY ? [`0x${DEPLOYER_PRIVATE_KEY}`] : [], 
            chainId: 8453,
        },
        baseSepolia: {
            url: process.env.BASE_SEPOLIA_RPC_URL || RPC_URL || "", 
            accounts: DEPLOYER_PRIVATE_KEY ? [`0x${DEPLOYER_PRIVATE_KEY}`] : [],
            chainId: 84532, 
        }
    },
    etherscan: {
        apiKey: {
            base: ETHERSCAN_API_KEY,
            baseSepolia: ETHERSCAN_API_KEY,
        },
        customChains: [
            { network: "base", chainId: 8453, urls: { apiURL: "https://api.basescan.org/api", browserURL: "https://basescan.org" } },
            { network: "baseSepolia", chainId: 84532, urls: { apiURL: "https://api-sepolia.basescan.org/api", browserURL: "https://sepolia.basescan.org" } },
        ]
    }
};

export default config;