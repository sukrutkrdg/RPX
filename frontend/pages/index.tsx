// frontend/pages/index.tsx

import Head from 'next/head';
import { WalletConnect } from '../components/WalletConnect';
import { RequestForm } from '../components/RequestForm';
import { useAccount } from 'wagmi';
import Link from 'next/link';

// Sabitler (Basitleştirilmiş Markalama)
const PROJECT_NAME = "REP-X: İtibar Köprüsü";

const Home = () => {
    const { isConnected, address } = useAccount();

    return (
        <>
            <Head>
                <title>{PROJECT_NAME} - Güvenli On-Chain İtibar Transferi</title>
                <meta name="description" content="Ele geçirilen cüzdanlardan itibar geçmişinizi güvenle yeni cüzdanınıza aktarın." />
            </Head>

            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
                
                {/* Header / Logo Alanı */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
                        {PROJECT_NAME}
                    </h1>
                    <p className="text-xl text-indigo-600 font-medium">
                        Kripto İtibarınızı Geri Kazanın!
                    </p>
                </header>

                {/* Ana İçerik ve Cüzdan Etkileşimi */}
                <main className="w-full max-w-4xl px-4">
                    
                    <div className="flex justify-center mb-8">
                        <WalletConnect />
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                        
                        <section className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Protokol Hakkında
                            </h2>
                            <p className="text-lg text-gray-600 mb-4">
                                REP-X, eski (ele geçirilmiş) cüzdanınızdaki tüm on-chain aktivite geçmişini 
                                (işlem sayısı, protokol etkileşimi, cüzdan yaşı) yeni, güvenli adresinize 
                                **otomatik ve doğrulanabilir** bir yöntemle bağlar. 
                            </p>
                            <p className="text-lg text-gray-600">
                                Böylece, gelecekteki **Airdrop uygunluklarınızı** kaybetmezsiniz.
                            </p>
                        </section>
                        
                        <hr className="my-8" />

                        <section>
                            {isConnected ? (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-gray-800">
                                        İtibar Transferine Başlayın
                                    </h2>
                                    <RequestForm />
                                    
                                    <div className="mt-6 text-center">
                                        <Link href="/verification" legacyBehavior>
                                            <a className="text-indigo-600 hover:text-indigo-800 font-semibold underline">
                                                Talebinizin Durumunu Takip Edin →
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <h2 className="text-3xl font-bold text-gray-500">
                                        Devam Etmek İçin Cüzdanınızı Bağlayın
                                    </h2>
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;