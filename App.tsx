
import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { AdCard } from './components/AdCard';
import { CategoryBar } from './components/CategoryBar';
import { AdModal } from './components/AdModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminCadastro } from './components/AdminCadastro';
import { MOCK_ADS } from './constants';
import { Ad, ViewState } from './types';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';

export default function App() {
  const [ads, setAds] = useState<Ad[]>(() => {
    const saved = localStorage.getItem('sheik_vendas_ads');
    return saved ? JSON.parse(saved) : MOCK_ADS;
  });
  
  const [view, setView] = useState<ViewState>('home');
  const [adminError, setAdminError] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sheik_vendas_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAds = useMemo(() => {
    const sorted = [...ads].sort((a, b) => {
      // Destaques primeiro
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Depois por data (mais recentes primeiro)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    
    return sorted.filter(ad => {
      const matchesCategory = activeCategory === "Todos" || ad.category === activeCategory;
      const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           ad.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [ads, activeCategory, searchQuery]);

  const toggleFavorite = (id: string) => {
    setAds(prev => prev.map(ad => ad.id === id ? { ...ad, isFavorite: !ad.isFavorite } : ad));
  };

  const handleSaveAd = (newAd: Ad) => {
    setAds(prev => [newAd, ...prev]);
  };

  const handleDeleteAd = (id: string) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
  };

  const handleAdminLogin = (pass: string) => {
    if (pass === 'admin123') { // Senha padrão solicitada
      setView('admin-dashboard');
      setAdminError('');
    } else {
      setAdminError('Senha incorreta! Tente novamente.');
    }
  };

  // Render Logic
  if (view === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} onBack={() => setView('home')} error={adminError} />;
  }

  if (view === 'admin-cadastro') {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <AdminCadastro 
          onSave={handleSaveAd} 
          onBack={() => setView('admin-dashboard')} 
        />
      </div>
    );
  }

  if (view === 'admin-dashboard') {
    return (
      <AdminDashboard 
        ads={ads} 
        onDelete={handleDeleteAd} 
        onLogout={() => setView('home')} 
        onSave={handleSaveAd}
        onNavigateToCadastro={() => setView('admin-cadastro')}
      />
    );
  }

  return (
    <div className="min-h-screen text-white bg-[#0A0A0A]">
      <Header 
        onSearchChange={setSearchQuery} 
      />

      <main className="pt-20 pb-24 lg:pt-24">
        {/* Banner Hero */}
        <section className="px-4 lg:px-8 mb-8">
          <div className="relative h-64 lg:h-80 rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 flex items-center">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF033E]/10 blur-[100px] -z-10" />
            
            <div className="p-8 lg:p-16 max-w-2xl relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#FF033E] text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">
                  Premium
                </div>
                <button 
                  onClick={() => setView('admin-login')}
                  className="flex items-center gap-1 text-[10px] text-gray-500 font-bold hover:text-white uppercase tracking-widest"
                >
                  <Shield size={12} /> Painel Admin
                </button>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black mb-4 leading-tight">
                Anunciou, <span className="text-[#FF033E]">Vendeu!</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-md text-sm lg:text-base">
                A maior plataforma de vendas e doações com tecnologia Sheik. Contato direto via WhatsApp em segundos.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setView('admin-login')}
                  className="group flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[#FF033E] hover:text-white transition-all shadow-xl"
                >
                  <Shield size={18} /> Painel Admin
                </button>
              </div>
            </div>
            
            <div className="hidden lg:flex flex-1 justify-center items-center h-full relative">
               <div className="w-64 h-64 bg-white/5 rounded-3xl rotate-12 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles size={80} className="text-[#FF033E] animate-pulse" />
               </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />

        {/* Ads Grid */}
        <section className="px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[#FF033E] rounded-full" />
              {searchQuery ? `Procurando "${searchQuery}"` : "Últimas Ofertas"}
            </h3>
            <span className="text-sm text-gray-500 font-medium">
              {filteredAds.length} resultados
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white/5 rounded-2xl h-[420px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAds.map(ad => (
                <AdCard key={ad.id} ad={ad} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          )}

          {!isLoading && filteredAds.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500">Nenhum anúncio encontrado com esses critérios.</p>
            </div>
          )}
        </section>
      </main>

      <AdModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveAd}
      />
    </div>
  );
}
