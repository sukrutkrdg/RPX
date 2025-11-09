// backend/OracleService/ContractRelayer.js

import { ethers } from "ethers";
const BRIDGE_ABI = []; // Buraya ABI içeriği Hardhat compile sonrası kopyalanacak

/**
 * Analiz sonucunu Bridge sözleşmesine geri yazar (setVerificationStatus).
// ... (function signature remains the same) ...
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
        throw new Error("Zincir üzerinde doğrulama durumu güncelleme başarısız.");
    }
}

export { relayVerificationStatus };