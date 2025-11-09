// backend/BlockchainAnalyzer/ReputationScorer.js

import settings from '../../config/settings.json' assert { type: "json" };
import { fetchTransactionHistory, fetchProtocolInteractions } from './APIClients.js';
import { verifyRecoveryTransfer } from './ProofVerifier.js';
import { differenceInDays } from 'date-fns';

// Puanlama ağırlıklarını çekme
const WEIGHTS = settings.proofWeights;

/**
 * Bir cüzdanın tüm itibar puanını hesaplar.
 */
async function calculateReputationScore(oldAddress, newAddress, claimTime) {
    // ... (function body remains the same) ...
}

export { calculateReputationScore };