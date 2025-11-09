// backend/OracleService/OracleServer.js

import { ethers } from "ethers";
import settings from '../../config/settings.json' assert { type: "json" };
import { calculateReputationScore } from '../BlockChainAnalyzer/ReputationScorer.js';
import { relayVerificationStatus } from './ContractRelayer.js';

// Konfigürasyon ve Sözleşme Adresleri .env ve config/contractAddresses.json'dan yüklenmelidir
const RPC_URL = process.env.RPC_URL;
const ORACLE_PRIVATE_KEY = process.env.ORACLE_PRIVATE_KEY; 
const BRIDGE_ADDRESS = settings.contractAddresses.ReputationBridge.address;
const BRIDGE_ABI = []; // Buraya ABI içeriği Hardhat compile sonrası kopyalanacak

// Ethers.js: Provider ve Signer
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
    
    // ... (rest of function body remains the same) ...

    console.log("[ORACLE] Event Dinleyicisi Başarılıyla Kuruldu.");
}

export { startOracleListener };