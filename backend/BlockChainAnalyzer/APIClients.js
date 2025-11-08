// backend/BlockchainAnalyzer/APIClients.js

const { EtherscanProvider } = require("ethers");
const axios = require("axios");

// API anahtarları .env dosyasından çekilecektir.
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; 
const RPC_URL = process.env.RPC_URL; // Base veya EVM ağının RPC URL'si

// Ethers.js sağlayıcısı
const provider = new EtherscanProvider("mainnet", ETHERSCAN_API_KEY); 

// Alternatif RPC sağlayıcısı (daha hızlı okuma için)
// const rpcProvider = new ethers.JsonRpcProvider(RPC_URL); 

/**
 * Bir cüzdan adresinin tüm geçmiş işlemlerini çeker.
 * @param {string} address - Sorgulanacak cüzdan adresi.
 * @returns {Array} - İşlem nesneleri dizisi.
 */
async function fetchTransactionHistory(address) {
    try {
        // Etherscan API ile tüm işlemleri çekme (limitlere dikkat!)
        // Eğer Etherscan desteklemiyorsa, doğrudan RPC'den (getHistory) veya Dune API'den çekilebilir.
        const history = await provider.getHistory(address);
        
        // config/settings.json'daki limite göre kesilebilir
        return history.slice(0, settings.maxTransactionsToFetch);
    } catch (error) {
        console.error(`İşlem geçmişi çekilirken hata oluştu (${address}):`, error.message);
        return [];
    }
}

/**
 * Cüzdanın bir protokol ile etkileşim geçmişini sorgular (Örn: DeFiLlama'dan protokol listesi)
 * Bu kısım, daha derin entegrasyon gerektirir (Örn: Dune API veya özel subgraph)
 * Şimdilik bir placeholder olarak kalır.
 */
async function fetchProtocolInteractions(address) {
    // Burada, cüzdanın etkileşimde bulunduğu akıllı sözleşmelerin listesi çekilmelidir.
    // Bu liste, 'protocolInteractions' skorunu hesaplamak için kullanılacaktır.
    return {
        uniqueContracts: 15, // Örnek veri: Etkileşimde olunan benzersiz sözleşme sayısı
        nftCollections: 5    // Örnek veri: Sahip olunan NFT koleksiyonu sayısı
    };
}

module.exports = {
    fetchTransactionHistory,
    fetchProtocolInteractions,
    provider
};