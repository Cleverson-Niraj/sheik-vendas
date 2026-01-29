
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

export default function App() {
  const [ads, setAds] = useState<Ad[]>(() => {
    const saved = localStorage.getItem('sheik_vendas_ads');
    return saved ? JSON.parse(saved) : MOCK_ADS;
  });

  const [view, setView] = useState<ViewState>('home');
  const [adminError, setAdminError] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync localStorage
  useEffect(() => {
    localStorage.setItem('sheik_vendas_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredAds = useMemo(() => {
    const sorted = [...ads].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return sorted.filter((ad) => {
      const matchesCategory =
        activeCategory === 'Todos' || ad.category === activeCategory;
      const matchesSearch =
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [ads, activeCategory, searchQuery]);

  const toggleFavorite = (id: string) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === id ? { ...ad, isFavorite: !ad.isFavorite } : ad
      )
    );
  };

  const handleSaveAd = (newAd: Ad) => {
    setAds((prev) => [newAd, ...prev]);
  };

  const handleDeleteAd = (id: string) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  const handleAdminLogin = (pass: string) => {
    if (pass === 'admin123') {
      setView('admin-dashboard');
      setAdminError('');
    } else {
      setAdminError('Senha incorreta! Tente novamente.');
    }
  };

  // Views
  if (view === 'admin-login') {
    return (
      <AdminLogin
        onLogin={handleAdminLogin}
        onBack={() => setView('home')}
        error={adminError}
      />
    );
  }

  if (view === 'admin-cadastro') {
    return (
      <div className="min-h-screen bg-white text-slate-900">
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
    <div className="min-h-screen bg-white text-slate-900">
      <Header onSearchChange={setSearchQuery} />

      <main className="pt-24 pb-24">
        {/* Categories */}
        <CategoryBar
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Ads Grid */}
        <section className="px-4 lg:px-8 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl lg:text-2xl font-bold flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[#0066cc] rounded-full" />
              {searchQuery
                ? `Procurando "${searchQuery}"`
                : 'Últimas Ofertas'}
            </h3>

            <span className="text-sm text-slate-500 font-medium">
              {filteredAds.length} resultados
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-slate-100 rounded-2xl h-[420px] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAds.map((ad) => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredAds.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-500">
                Nenhum anúncio encontrado com esses critérios.
              </p>
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
