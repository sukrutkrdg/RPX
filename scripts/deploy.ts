// scripts/deploy.js

import { ethers } from "hardhat";

async function main() {
    // ... (Kalan kod aynı kalır)
    
    // ethers.parseEther'ın doğru çağrıldığından emin olun
    // Bu, Hardhat'ın güncel versiyonlarında sorunsuz çalışmalıdır.
    const BASE_FEE_WEI = ethers.parseEther("0.02"); // 0.02 ETH Base Ücret

    // ... (Kalan kod aynı kalır)
}

main().catch((error) => {
    // ...
});