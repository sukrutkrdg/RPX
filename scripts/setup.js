// scripts/setup.js

const { ethers } = require("hardhat");
require('dotenv').config(); 
const contractAddresses = require('../config/contractAddresses.json');
const settings = require('../config/settings.json');

async function main() {
    // 1. Oracle Cüzdanını Tanımlama
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    // Dağıtımı yapan cüzdanın özel anahtarını kullanıyoruz (Owner)
    const ownerWallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider); 
    
    // ORACLE'IN KENDİ ADRESİNİ .env'den çek
    const oracleWallet = new ethers.Wallet(process.env.ORACLE_PRIVATE_KEY, provider); 
    const oracleAddress = await oracleWallet.getAddress();
    
    const bridgeAddress = contractAddresses.ReputationBridge.address;

    // 2. Bridge Sözleşmesini Tanımlama
    // Owner olarak hareket edeceğiz
    const ReputationBridge = await ethers.getContractFactory("ReputationBridge", ownerWallet);
    const bridgeContract = await ReputationBridge.attach(bridgeAddress);
    
    console.log(`--- REP-X Kurulum İşlemi Başlatılıyor ---`);
    console.log(`Bridge Adresi: ${bridgeAddress}`);
    console.log(`Yeni Oracle Adresi: ${oracleAddress}`);

    // 3. Oracle Adresini Atama (Owner yetkisiyle)
    // Constructor'da atama yapılmadıysa veya değiştirilecekse bu kullanılır
    if (bridgeContract.oracleAddress() !== oracleAddress) {
        console.log("🛠️ Bridge sözleşmesinde Oracle adresi güncelleniyor...");
        const tx = await bridgeContract.setOracleAddress(oracleAddress);
        await tx.wait();
        console.log(`✅ Oracle Adresi Başarıyla Atandı: ${oracleAddress}`);
    } else {
        console.log("✅ Oracle Adresi Zaten Tanımlı.");
    }
    
    // 4. (Opsiyonel) Başarı Ücretini Tanımlama
    const SUCCESS_FEE_WEI = ethers.parseEther(settings.settings.successFeeEth || "0.05"); // Örn: 0.05 ETH
    // successFee'yi Bridge sözleşmesinde bir fonksiyon ile set etme
    // Not: setSuccessFee fonksiyonunu ReputationBridge.sol'e eklememiz gerekir.
    // const txFee = await bridgeContract.setSuccessFee(SUCCESS_FEE_WEI); 
    // await txFee.wait();
    
    console.log("--- Kurulum Tamamlandı. Protokol Aktif. ---");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});