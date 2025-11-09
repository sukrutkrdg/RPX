// backend/BlockChainAnalyzer/APIClients.js

import { EtherscanProvider, JsonRpcProvider } from "ethers"; // Ethers'ı import ediyoruz
import axios from "axios";
import settings from '../../config/settings.json' assert { type: "json" };

// API anahtarları .env dosyasından çekilecektir.
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; 
const RPC_URL = process.env.RPC_URL; // Base veya EVM ağının RPC URL'si

// Ethers.js sağlayıcısı
const provider = new EtherscanProvider("mainnet", ETHERSCAN_API_KEY); 

// Alternatif RPC sağlayıcısı (daha hızlı okuma için)
// const rpcProvider = new JsonRpcProvider(RPC_URL); 

/**
 * Bir cüzdan adresinin tüm geçmiş işlemlerini çeker.
 * @param {string} address - Sorgulanacak cüzdan adresi.
 * @returns {Array} - İşlem nesneleri dizisi.
 */
async function fetchTransactionHistory(address) {
    // ... (function body remains the same) ...
}

/**
 * Cüzdanın bir protokol ile etkileşim geçmişini sorgular
 */
async function fetchProtocolInteractions(address) {
    // ... (function body remains the same) ...
    return {
        uniqueContracts: 15, 
        nftCollections: 5    
    };
}

export {
    fetchTransactionHistory,
    fetchProtocolInteractions,
    provider
};