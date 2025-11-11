import type { AppProps } from 'next/app';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, base, baseSepolia } from 'wagmi/chains'; // Base ağını kullanacağız
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import '../styles/globals.css'; // Global CSS dosyası (Önceki adımda devre dışı bırakmıştık)
import settings from '../../config/settings.json';

// --- React Hooks import edildi ---
import { useState, useEffect } from 'react';

// --- 1. Zincir ve Transport Tanımlaması ---
// settings.json'daki targetChainId'ye göre ağı seç
// Not: Wagmi'nin `baseSepolia` desteği olması lazım, import'a ekledim.
const targetChain = settings.targetChainId === 8453 ? base : baseSepolia;

const config = createConfig({
  chains: [targetChain, mainnet], // Hedef ağımızı ve mainnet'i ekleyelim
  transports: {
    [targetChain.id]: http(),
    [mainnet.id]: http(),
  },
});

// --- 2. React Query Client ---
const queryClient = new QueryClient();

// --- 3. Ana Uygulama Bileşeni ---
function MyApp({ Component, pageProps }: AppProps) {
  
  // ----- HİDRASYON HATASI DÜZELTMESİ -----
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Component mount olduğunda (yani sadece tarayıcıda)
    // state'i true yap.
    setIsClient(true);
  }, []);
  // ----- DÜZELTME SONU -----

  return (
    <>
      {/* Tüm Wagmi ve Query sağlayıcılarını SADECE 'isClient' true ise (yani tarayıcıda) render et.
        Sunucuda null (boş) render et.
        Bu, sunucu ve tarayıcı arasındaki HTML uyuşmazlığını çözer.
      */}
      {isClient ? (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </WagmiProvider>
      ) : (
        null 
      )}
    </>
  );
}

export default MyApp;