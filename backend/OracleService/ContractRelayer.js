// backend/OracleService/ContractRelayer.js

const { ethers } = require("ethers");
const BRIDGE_ABI = [...]; // ReputationBridge.sol'ün ABI'si

/**
 * Analiz sonucunu Bridge sözleşmesine geri yazar (setVerificationStatus).
 * @param {ethers.Wallet} oracleWallet - İşlemi imzalayan Oracle cüzdanı.
 * @param {string} bridgeAddress - Bridge sözleşmesinin adresi.
 * @param {string} oldAddress - Eski cüzdan adresi.
 * @param {boolean} status - Doğrulama sonucu (ONAYLANDI/REDDEDİLDİ).
 * @param {number} finalScore - Nihai İtibar Puanı.
 */
async function relayVerificationStatus(oracleWallet, bridgeAddress, oldAddress, status, finalScore) {
    try {
        const bridgeContract = new ethers.Contract(bridgeAddress, BRIDGE_ABI, oracleWallet);
        
        // setVerificationStatus işlemi: Sadece Oracle'ın çağırabileceği fonksiyon
        const tx = await bridgeContract.setVerificationStatus(
            oldAddress, 
            status, 
            finalScore
        );
        
        console.log(`[RELAYER] İşlem gönderildi, Hash: ${tx.hash}`);
        await tx.wait(); // İşlemin onaylanmasını bekle
        console.log(`[RELAYER] İşlem Onaylandı! Doğrulama durumu zincire yazıldı.`);

    } catch (error) {
        console.error("[RELAYER HATA] setVerificationStatus gönderilemedi:", error.message);
        // Gaz maliyeti yetersizliği veya RPC hatası durumunda tekrar deneme mekanizması eklenebilir.
        throw new Error("Zincir üzerinde doğrulama durumu güncelleme başarısız.");
    }
}

module.exports = {
    relayVerificationStatus
};