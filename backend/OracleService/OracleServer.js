// backend/OracleService/OracleServer.js

const { ethers } = require("ethers");
const settings = require('../../config/settings.json');
const { calculateReputationScore } = require('../BlockchainAnalyzer/ReputationScorer');
const { relayVerificationStatus } = require('./ContractRelayer');

// Konfigürasyon ve Sözleşme Adresleri (Bu kısım .env ve config/contractAddresses.json'dan yüklenmelidir)
const RPC_URL = process.env.RPC_URL;
const ORACLE_PRIVATE_KEY = process.env.ORACLE_PRIVATE_KEY; // ÇOK GİZLİ!
const BRIDGE_ADDRESS = settings.contractAddresses.ReputationBridge;
const BRIDGE_ABI = [...]; // ReputationBridge.sol'ün ABI'si

// Ethers.js: Provider (Zincir ile iletişim kurar) ve Signer (İşlem imzalar)
const provider = new ethers.JsonRpcProvider(RPC_URL);
const oracleWallet = new ethers.Wallet(ORACLE_PRIVATE_KEY, provider);

// Bridge Sözleşmesinin örneği
const bridgeContract = new ethers.Contract(BRIDGE_ADDRESS, BRIDGE_ABI, oracleWallet);


/**
 * Bridge Sözleşmesi üzerindeki LinkRequested event'lerini dinlemeye başlar.
 */
function startOracleListener() {
    console.log(`[ORACLE] Bağlantı Başlatılıyor... RPC: ${RPC_URL}`);
    console.log(`[ORACLE] Oracle Adresi: ${oracleWallet.address}`);
    
    // LinkRequested event'ini dinlemeye başla
    bridgeContract.on("LinkRequested", async (oldAddress, newAddress, proofHash, event) => {
        console.log(`\n--- YENİ TALEP ALINDI (Blok: ${event.blockNumber}) ---`);
        console.log(`Eski Adres (Source): ${oldAddress}`);
        console.log(`Yeni Adres (Target): ${newAddress}`);

        const claimTime = new Date(); // Talep olayının dinlendiği anı kullanıyoruz
        
        try {
            // 1. İtibar Puanını Hesapla
            const { totalScore, isVerified } = await calculateReputationScore(
                oldAddress,
                newAddress,
                claimTime
            );

            console.log(`[ANALİZ SONUÇ] Puan: ${totalScore}, Doğrulama: ${isVerified}`);

            // 2. Sonucu Sözleşmeye Geri Bildir (Relay işlemi)
            await relayVerificationStatus(
                oracleWallet, 
                BRIDGE_ADDRESS, 
                oldAddress, 
                isVerified, 
                totalScore
            );

            console.log(`--- TALEP BAŞARIYLA TAMAMLANDI (${oldAddress}) ---`);

        } catch (error) {
            console.error(`[HATA] Talep işlenirken kritik hata oluştu (${oldAddress}):`, error.message);
            // Hata durumunda bile bir işlem göndermek (örn: REDDEDİLDİ olarak) düşünülebilir.
        }
    });

    console.log("[ORACLE] Event Dinleyicisi Başarılıyla Kuruldu.");
}

// startOracleListener(); // Bu, sunucu başlangıcında çağrılacak.

module.exports = {
    startOracleListener
};