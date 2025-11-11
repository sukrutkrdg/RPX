"use client";

import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, stringToBytes, bytesToHex } from 'viem';

// --- DÜZELTME 1: Gerekli dosyalar doğru import edildi ---
import settings from '../../config/settings.json';
import contractAddresses from '../../config/contractAddresses.json';
// ABI'yi boş 'abis.js' yerine derlenmiş artifact'tan al
import ReputationBridgeArtifact from '../../artifacts/contracts/ReputationBridge.sol/ReputationBridge.json';

// --- DÜZELTME 2: Adres, ABI ve Ücret doğru okundu ---
const BRIDGE_ABI = ReputationBridgeArtifact.abi;
// Not: Ağı 'baseSepolia' olarak sabit kodluyoruz, çünkü deploy betiğimiz oraya kaydetti
const BRIDGE_ADDRESS = (contractAddresses as any).baseSepolia.ReputationBridge as `0x${string}`;
const BASE_FEE = parseEther(settings.baseFeeEth); // 'settings.settings' hatası düzeltildi

export const RequestForm = () => {
    const { address: connectedAddress, isConnected } = useAccount();
    const [oldAddress, setOldAddress] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    
    // Wagmi hook'ları
    const { data: hash, isPending, writeContract } = useWriteContract();
    
    // İşlem onayı (receipt) bekleme
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    // Talep gönderme fonksiyonu
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isConnected || !connectedAddress) {
            setStatusMessage("Lütfen önce cüzdanınızı (yeni adresiniz olarak) bağlayın.");
            return;
        }
        if (!oldAddress || !ethers.isAddress(oldAddress)) {
            setStatusMessage("Lütfen geçerli bir 'Eski Cüzdan Adresi' girin.");
            return;
        }

        setStatusMessage("Talep hazırlanıyor...");

        // 1. Kanıt (Proof) oluştur (Şimdilik basit bir string)
        const proofMessage = `Link ${oldAddress} to ${connectedAddress}`;
        const proofHash = bytesToHex(stringToBytes(proofMessage, { size: 32 }));

        // 2. Kontratı Çağır (requestLink)
        try {
            writeContract({
                address: BRIDGE_ADDRESS,
                abi: BRIDGE_ABI,
                functionName: 'requestLink',
                args: [oldAddress, proofHash],
                value: BASE_FEE,
            });
            setStatusMessage("Lütfen cüzdanınızdan işlemi onaylayın...");
        } catch (error) {
            console.error("Kontrat çağrısı hatası:", error);
            setStatusMessage(`Hata: ${(error as Error).message}`);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>İtibar Transferi (RPX) Talebi</h2>
            <p>Bu form, eski cüzdanınızdaki itibarı yeni cüzdanınıza (şu an bağlı olan) bağlamak için kullanılır.</p>
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Eski Cüzdan Adresi (İtibarını aktarmak istediğiniz):
                        <input
                            type="text"
                            value={oldAddress}
                            onChange={(e) => setOldAddress(e.target.value)}
                            placeholder="0x..."
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            disabled={isPending || isConfirming}
                        />
                    </label>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Yeni Cüzdan Adresi (Mevcut bağlı olan):
                        <input
                            type="text"
                            value={connectedAddress || 'Cüzdan bağlı değil'}
                            readOnly
                            disabled
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </div>
                
                <button 
                    type="submit" 
                    disabled={!isConnected || isPending || isConfirming}
                    style={{ padding: '10px 15px', cursor: 'pointer' }}
                >
                    {isPending ? 'İşlem Gönderiliyor...' : 
                     isConfirming ? 'Onay Bekleniyor...' : 
                     `Talep Gönder (${settings.baseFeeEth} ETH)`}
                </button>
            </form>

            {statusMessage && <p><strong>Durum:</strong> {statusMessage}</p>}
            
            {isConfirmed && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                    <p><strong>Talep Başarılı!</strong></p>
                    <p>İşleminiz onaylandı (Tx: {hash}).</p>
                    <p>Backend Oracle şimdi puanınızı hesaplayacak ve (eğer başarılıysa) NFT'nizi basacaktır.</p>
                    <a href={`https://sepolia.basescan.org/tx/${hash}`} target="_blank" rel="noopener noreferrer">İşlemi Görüntüle</a>
                </div>
            )}
        </div>
    );
};

// Ethers.js'in 'isAddress' fonksiyonu React'te çalışmayabilir,
// viem'in 'isAddress' fonksiyonunu kullanmak daha iyidir ancak şu an import edilmemiş.
// Geçici bir 'ethers' objesi (gerçekte 'ethers' paketi import edilmedi, bu bir TypeScript sorunu)
// Bu satırı geçici olarak ekliyoruz:
const ethers = {
    isAddress: (address: string) => {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    }
};