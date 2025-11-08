// backend/BlockchainAnalyzer/ReputationScorer.js

const settings = require('../../config/settings.json');
const { fetchTransactionHistory, fetchProtocolInteractions } = require('./APIClients');
const { verifyRecoveryTransfer } = require('./ProofVerifier');
const { differenceInDays, parseISO } = require('date-fns'); // Tarih farkını hesaplamak için

// Puanlama ağırlıklarını çekme
const WEIGHTS = settings.proofWeights;

/**
 * Bir cüzdanın tüm itibar puanını hesaplar.
 * @param {string} oldAddress - Eski cüzdan adresi.
 * @param {string} newAddress - Yeni cüzdan adresi.
 * @param {Date} claimTime - REP-X talep zamanı.
 * @returns {object} - { totalScore: 0-100, isVerified: boolean }
 */
async function calculateReputationScore(oldAddress, newAddress, claimTime) {
    console.log(`[REPUTATION SCORER] ${oldAddress} için itibar puanı hesaplanıyor.`);
    let totalScore = 0;
    
    // Geçmiş işlem verisini bir kere çekelim
    const transactions = await fetchTransactionHistory(oldAddress);
    
    if (transactions.length === 0) {
        console.log("... İşlem geçmişi boş. Skor hesaplanamaz.");
        return { totalScore: 0, isVerified: false };
    }

    // --- 1. KANIT: KURTARMA TRANSFERİ (40 Puan) ---
    // Bu fonksiyon, gerekli 40 puanı (veya 0) döndürür ve en önemli güvenlik kontrolünü yapar.
    const recoveryScore = await verifyRecoveryTransfer(oldAddress, newAddress, claimTime);
    totalScore += recoveryScore;
    
    // Eğer temel kurtarma kanıtı başarısızsa (0 puan), diğerlerini hesaplamaya gerek olmayabilir 
    // veya diğer kanıtların toplamı 70'i geçmeyeceği için zaman kaybetmeye gerek yoktur.
    if (recoveryScore === 0) {
        console.log("... Temel Kurtarma Kanıtı Başarısız. Doğrulama Reddedildi.");
        return { totalScore: 0, isVerified: false };
    }


    // --- 2. KANIT: İŞLEM TUTARLILIĞI (30 Puan) ---
    // Amaç: Hacker'ların yaptığı tek, büyük transferleri değil, istikrarlı, "gerçek kullanıcı" aktivitesini ödüllendirmek.
    
    // Puanlama Metriği: Aylık Ortalama İşlem Sıklığı
    const firstTxTime = new Date(transactions[transactions.length - 1].timestamp * 1000); // İlk işlem zamanı (en eski)
    const walletAgeDays = differenceInDays(claimTime, firstTxTime);
    
    if (walletAgeDays < 30) { 
        // Cüzdan çok yeniyse (1 aydan az), bu skordan puan alması zor
        totalScore += 0; 
    } else {
        const walletAgeMonths = walletAgeDays / 30;
        const avgTxsPerMonth = transactions.length / walletAgeMonths;
        
        // Örn: Ayda 10-20 işlem = Tam Puan (30). 0-5 işlem = 10 Puan.
        let consistencyScore = Math.min(avgTxsPerMonth * 1.5, WEIGHTS.transactionConsistency);
        totalScore += consistencyScore;
        console.log(`... İşlem Tutarlılık Puanı: ${consistencyScore.toFixed(2)}/${WEIGHTS.transactionConsistency}`);
    }


    // --- 3. KANIT: CÜZDAN YAŞI (10 Puan) ---
    // Puanlama Metriği: Cüzdanın kaç yıldır aktif olduğu (1 yıl = 5 puan, 2+ yıl = 10 puan)
    const walletAgeYears = walletAgeDays / 365.25;
    let ageScore = Math.min(walletAgeYears * 5, WEIGHTS.walletAge);
    totalScore += ageScore;
    console.log(`... Cüzdan Yaşı Puanı: ${ageScore.toFixed(2)}/${WEIGHTS.walletAge}`);


    // --- 4. KANIT: PROTOKOL ETKİLEŞİMLERİ (20 Puan) ---
    // Puanlama Metriği: Kaç farklı DeFi/NFT protokolüyle etkileşime girdiği
    const protocolData = await fetchProtocolInteractions(oldAddress);
    
    // Örn: 10'dan fazla benzersiz akıllı sözleşmeyle etkileşim tam puan getirir.
    let interactionScore = Math.min(protocolData.uniqueContracts * 2, WEIGHTS.protocolInteractions); 
    totalScore += interactionScore;
    console.log(`... Protokol Etkileşim Puanı: ${interactionScore.toFixed(2)}/${WEIGHTS.protocolInteractions}`);


    // --- NİHAİ KARAR ---
    const finalScore = Math.round(totalScore);
    const isVerified = finalScore >= settings.minScoreForVerification;

    console.log(`[SONUÇ] Toplam Puan: ${finalScore}. Eşik: ${settings.minScoreForVerification}. Durum: ${isVerified ? 'ONAYLANDI' : 'REDDEDİLDİ'}`);

    return {
        totalScore: finalScore,
        isVerified: isVerified
    };
}

module.exports = {
    calculateReputationScore
};