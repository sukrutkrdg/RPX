// scripts/deploy.js

// Hardhat'tan ethers modülünü alıyoruz
const { ethers } = require("hardhat");

async function main() {
    // Dağıtım için gerekli parametreler (config/settings.json dosyasından gelmeli)
    const FEE_RECEIVER = "0x...fee_receiver_address..."; // Ücretlerin gideceği cüzdan
    const BASE_FEE_WEI = ethers.parseEther("0.02"); // 0.02 ETH Base Ücret

    console.log("--- REP-X Sözleşme Dağıtım Başlatılıyor (Hedef Ağ: BASE/EVM) ---");

    // 1. ReputationNFT.sol'i Dağıtma
    const ReputationNFT = await ethers.getContractFactory("ReputationNFT");
    const repNFT = await ReputationNFT.deploy();
    await repNFT.waitForDeployment();
    
    const repNFTAddress = await repNFT.getAddress();
    console.log(`✅ ReputationNFT Sözleşmesi Dağıtıldı: ${repNFTAddress}`);

    // 2. ReputationBridge.sol'i Dağıtma
    const ReputationBridge = await ethers.getContractFactory("ReputationBridge");
    const repBridge = await ReputationBridge.deploy(
        repNFTAddress, 
        FEE_RECEIVER, 
        BASE_FEE_WEI
    );
    await repBridge.waitForDeployment();

    const repBridgeAddress = await repBridge.getAddress();
    console.log(`✅ ReputationBridge Sözleşmesi Dağıtıldı: ${repBridgeAddress}`);
    
    // 3. İki Sözleşme Arasındaki Bağlantıyı Kurma (NFT'ye Bridge adresini tanımlama)
    // Bridge'in dağıtıcısı (Owner), NFT'nin de Owner'ı olduğu için bu işlemi yapabilir.
    console.log("🛠️ NFT sözleşmesine Bridge adresini set etme...");
    const tx = await repNFT.setBridgeContract(repBridgeAddress);
    await tx.wait();
    console.log("✅ Bağlantı Kuruldu! NFT artık sadece Bridge'in basmasına izin veriyor.");

    // 4. Konfigürasyon Dosyasını Güncelleme
    // Bu adımda, dağıtılan adresleri config/contractAddresses.json dosyasına otomatik olarak kaydetmeliyiz.

    console.log("--- Dağıtım Başarılı. REP-X Protokol Çekirdeği Hazır. ---");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});