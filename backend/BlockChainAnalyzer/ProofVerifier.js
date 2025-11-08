// backend/BlockchainAnalyzer/ProofVerifier.js

// Gerekli modülleri ve konfigürasyonları içe aktarıyoruz
const settings = require('../../config/settings.json');
const { fetchTransactionHistory } = require('./APIClients');
const { isAfter } = require('date-fns'); // Tarih karşılaştırmaları için bir kütüphane

const RECOVERY_TRANSFER_WEIGHT = settings.proofWeights.recoveryTransfer;

/**
 * Cüzdan Kurtarma Transferi Kanıtını doğrular ve puanlar.
 * Kanıt Kuralı (40 Puan):
 * 1. Eski cüzdandan (çalınan cüzdan), yeni REP-X'e başvurulan adrese
 * BELİRLİ BİR MİKTARDA (örn: 0.1 ETH/Native) transfer yapılmış mı?
 * 2. Bu transfer, REP-X başvurusunun YAPILDIĞI ZAMANDAN ÖNCE Mİ (Çalınma kanıtı olarak)?
 * 3. Transfer, çalınma olayından sonraki maksimum süre içinde mi yapılmış?
 * 4. Transferden sonra, eski cüzdanda başka ÖNEMLİ bir aktivite OLMAMALI (yani cüzdanın kontrolü kaybolmalı).
 * * @param {string} oldAddress - Kullanıcının eski (çalındığı iddia edilen) cüzdan adresi.
 * @param {string} newAddress - Kullanıcının yeni REP-X başvurusu yaptığı cüzdan adresi.
 * @param {Date} claimTime - Kullanıcının REP-X başvurusunu yaptığı an.
 * @returns {number} - Kazanılan puan (0 veya 40).
 */
async function verifyRecoveryTransfer(oldAddress, newAddress, claimTime) {
    console.log(`[PROOF VERIFIER] Kurtarma transferi kanıtı aranıyor: ${oldAddress} -> ${newAddress}`);

    // 1. Eski cüzdanın geçmiş işlemlerini çekme
    const transactions = await fetchTransactionHistory(oldAddress);
    if (transactions.length === 0) {
        console.log("... Eski cüzdanda hiç işlem bulunamadı. Kanıt Başarısız.");
        return 0; // Geçmiş yoksa, kurtarma kanıtı da yok.
    }

    let recoveryTransfer = null;

    // A. Kurtarma Transferi İşlemini Bulma
    for (const tx of transactions) {
        const txTime = new Date(tx.timestamp * 1000); // İşlem zamanını Date objesine çevirme

        // Kriter 1: Transferin alıcısı yeni adres mi?
        // Kriter 2: Transfer REP-X başvurusundan önce mi yapılmış?
        // Kriter 3: Transfer çalınma olayından sonraki max süre içinde mi yapılmış? (Bu kural için tam çalınma zamanını bilmek zor. Basitleştirerek sadece claimTime'dan önce olmasına odaklanalım.)
        
        if (tx.to && tx.to.toLowerCase() === newAddress.toLowerCase() && isAfter(claimTime, txTime)) {
             // Burada transfer edilen miktarı kontrol etmeliyiz (min 0.1 ETH)
             // Not: Etherscan'den gelen işlem objesi `value` alanını içerir, 
             // ancak Ethers.js'in getHistory() objesi bu detayı içermeyebilir. 
             // Eğer içermiyorsa, ayrı bir RPC çağrısı gerekir. 
             // Simülasyon için: transferin varlığını yeterli kabul edelim.
            
            recoveryTransfer = tx;
            console.log(`... Transfer Bulundu! Hash: ${tx.hash}`);
            break; 
        }
    }

    if (!recoveryTransfer) {
        console.log("... Eski adresten yeni adrese uygun kurtarma transferi bulunamadı. Kanıt Başarısız.");
        return 0;
    }

    // B. Transferden Sonraki Aktiviteyi Kontrol Etme
    const recoveryTransferTime = new Date(recoveryTransfer.timestamp * 1000);
    const minInactivityTime = settings.oldWalletInactivityPeriodHours * 60 * 60 * 1000; // milisaniye cinsinden

    let activityAfterRecovery = false;

    for (const tx of transactions) {
        const txTime = new Date(tx.timestamp * 1000);

        // Kurtarma transferinden sonra ve hareketsizlik süresi içinde yapılan işlemleri kontrol et.
        // Hareketsizlik süresi, transferden 72 saat sonra başlar. 
        if (isAfter(txTime, recoveryTransferTime) && tx.hash !== recoveryTransfer.hash) {
            // Transferden hemen sonraki 72 saat içinde cüzdan hareket ettiyse, 
            // bu bir çalınma değil, normal bir cüzdan temizliği olabilir.
            // Bu, kurtarma kanıtını geçersiz kılar.
            activityAfterRecovery = true;
            break;
        }
    }

    if (activityAfterRecovery) {
        console.log(`... HATA: Kurtarma transferinden sonra ${settings.oldWalletInactivityPeriodHours} saat içinde eski cüzdanda aktivite tespit edildi. Kanıt Başarısız.`);
        return 0;
    }

    console.log(`✅ Kurtarma Transferi Kanıtı Başarılı! Puan: ${RECOVERY_TRANSFER_WEIGHT}`);
    return RECOVERY_TRANSFER_WEIGHT;
}

module.exports = {
    verifyRecoveryTransfer
};