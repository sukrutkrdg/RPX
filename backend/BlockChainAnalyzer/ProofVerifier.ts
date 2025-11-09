// backend/BlockchainAnalyzer/ProofVerifier.js

import settings from '../../config/settings.json' assert { type: "json" };
import { fetchTransactionHistory } from './APIClients.js';
import { isAfter } from 'date-fns';

const RECOVERY_TRANSFER_WEIGHT = settings.proofWeights.recoveryTransfer;

/**
 * Cüzdan Kurtarma Transferi Kanıtını doğrular ve puanlar.
 */
async function verifyRecoveryTransfer(oldAddress, newAddress, claimTime) {
    // ... (function body remains the same) ...
}

export { verifyRecoveryTransfer };