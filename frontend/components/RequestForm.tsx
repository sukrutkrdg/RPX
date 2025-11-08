// frontend/components/RequestForm.tsx

import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem'; 
// Sözleşme adresleri ve ABI'lar config/contractAddresses.json'dan çekilmelidir
import settings from '../../config/settings.json'; 
import { BRIDGE_ABI } from '../../config/abis'; // Örnek ABI

const BRIDGE_ADDRESS = settings.contractAddresses.ReputationBridge;
const BASE_FEE = parseEther(settings.settings.baseFeeEth); // 0.02 ETH viem formatında

export const RequestForm = () => {
    const { address: newAddress, isConnected } = useAccount();
    const [oldAddress, setOldAddress] = useState('');
    const [proofHash, setProofHash] = useState('');
    
    // Wagmi hook'u ile sözleşmeye yazma işlemini hazırla
    const { data: hash, isPending, writeContract } = useWriteContract();
    
    // İşlem onayını bekle
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isConnected || !oldAddress || !proofHash || !newAddress) return;

        // requestLink işlemini tetikle
        writeContract({
            address: BRIDGE_ADDRESS as `0x${string}`,
            abi: BRIDGE_ABI,
            functionName: 'requestLink',
            args: [oldAddress, proofHash],
            value: BASE_FEE, // BaseFee (0.02 ETH) ile birlikte gönder
        });
    };

    if (!isConnected) return <p className="text-gray-500">Lütfen başlamak için cüzdanınızı bağlayın.</p>;

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">🔗 İtibar Bağlama Talebi</h2>
            <p className="mb-4 text-sm text-gray-600">
                **Ücret:** {settings.settings.baseFeeEth} ETH (Başlangıç Talep Ücreti)
            </p>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Ele Geçirilen Cüzdan Adresi (Eski Adres)
                    </label>
                    <input 
                        type="text" 
                        value={oldAddress}
                        onChange={(e) => setOldAddress(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="0x..."
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Kurtarma Transferi İşlemi Hash'i (Kanıt)
                    </label>
                    <input 
                        type="text" 
                        value={proofHash}
                        onChange={(e) => setProofHash(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="0x..."
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Bu, fonlarınızı yeni cüzdanınıza çektiğiniz işlemin hash'i olmalıdır.</p>
                </div>
                
                <button 
                    type="submit"
                    disabled={isPending || isConfirming}
                    className={`w-full text-white font-bold py-2 px-4 rounded ${isPending || isConfirming ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isPending ? 'Cüzdan Onayı Bekleniyor...' : isConfirming ? 'İşlem Onaylanıyor...' : 'Talebi Başlat ve Ücreti Öde'}
                </button>
            </form>
            
            {hash && <p className="mt-4 text-sm text-blue-600">İşlem Hash'i: {hash}</p>}
            {isConfirmed && <p className="mt-4 text-lg font-bold text-green-600">🎉 Talep Başarıyla Gönderildi! Doğrulama sürecini takibe başlayabilirsiniz.</p>}
        </div>
    );
};