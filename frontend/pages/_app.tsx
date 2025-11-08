// frontend/pages/_app.tsx

import type { AppProps } from 'next/app';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, base } from 'wagmi/chains'; // Base ağını kullanacağız
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css'; // Global CSS dosyası (Örn: Tailwind CSS veya temel stiller)
import settings from '../config/settings.json';

// --- 1. Zincir ve Transport Tanımlaması ---
// Konfigürasyon dosyasından Base ağını hedef alıyoruz
const TARGET_CHAIN = base; // Başlangıç olarak Base (8453) ağını kullanıyoruz

const config = createConfig({
  chains: [mainnet, TARGET_CHAIN], // Ana ağı ve hedef ağı ekliyoruz
  transports: {
    // Tüm etkileşimleri RPC ile yönlendir
    [mainnet.id]: http(),
    [TARGET_CHAIN.id]: http(), 
  },
  // Cüzdan bağlayıcıları (MetaMask, WalletConnect vb.)
  connectors: [
    // MetaMask, TrustWallet vb. tarayıcı içi cüzdanlar
    // Not: Injected connector'ün doğru kurulması gerekir
  ],
});

// --- 2. Query Client Tanımlaması ---
// Veri önbellekleme ve sorgulama için kullanılır
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    // QueryClientProvider, veri önbellekleme ve durum yönetimini sağlar
    <QueryClientProvider client={queryClient}>
      
      {/* WagmiProvider, tüm EVM etkileşimleri için global kontekst sağlar */}
      <WagmiProvider config={config}>
        
        <Component {...pageProps} />
        
      </WagmiProvider>
    </QueryClientProvider>
  );
}