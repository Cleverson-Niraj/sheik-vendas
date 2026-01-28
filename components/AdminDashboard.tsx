
import React, { useState } from 'react';
import { Trash2, Edit3, LogOut, Package, TrendingUp, DollarSign, Plus, Search } from 'lucide-react';
import { Ad } from '../types';
import { AdModal } from './AdModal';

interface AdminDashboardProps {
  ads: Ad[];
  onDelete: (id: string) => void;
  onLogout: () => void;
  onSave: (ad: Ad) => void;
  onNavigateToCadastro: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ ads, onDelete, onLogout, onSave, onNavigateToCadastro }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const totalValue = ads.reduce((acc, ad) => acc + ad.price, 0);
  
  const filteredAds = ads.filter(ad => 
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSaveAd = (newAd: Ad) => {
    onSave(newAd);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-black text-white">Catálogo de Produtos</h1>
            <p className="text-gray-500">Gerencie seu marketplace profissional</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onNavigateToCadastro}
              className="flex items-center gap-2 bg-[#FF033E] hover:bg-[#d00232] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#FF033E]/20"
            >
              <Plus size={20} /> Novo Produto
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
            >
              <Plus size={20} /> Quick Add
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-gray-400 px-6 py-2.5 rounded-xl border border-white/5 transition-all"
            >
              <LogOut size={20} /> Sair
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#121212] p-6 rounded-2xl border border-white/5">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <Package className="text-blue-500" size={24} />
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">Total de Itens</h3>
            <p className="text-3xl font-black text-white">{ads.length}</p>
          </div>
          <div className="bg-[#121212] p-6 rounded-2xl border border-white/5">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="text-green-500" size={24} />
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">Valor em Estoque</h3>
            <p className="text-3xl font-black text-white">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
            </p>
          </div>
          <div className="bg-[#121212] p-6 rounded-2xl border border-white/5">
            <div className="w-12 h-12 bg-[#FF033E]/10 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="text-[#FF033E]" size={24} />
            </div>
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">Status</h3>
            <p className="text-3xl font-black text-white">Ativo</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#121212] rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Produtos ({filteredAds.length})</h2>
            <div className="text-sm text-gray-500">
              {ads.filter(ad => ad.featured).length} destacados
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Preço</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4">Localização</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAds.map(ad => (
                  <tr key={ad.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={ad.images[0]} className="w-10 h-10 rounded-lg object-cover" alt="" />
                        <div>
                          <span className="font-bold text-white text-sm block">{ad.title}</span>
                          {ad.featured && (
                            <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full">Destaque</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#FF033E] font-bold">
                      R$ {ad.price.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-white/5 px-2 py-1 rounded text-[10px] text-gray-400 font-bold uppercase">
                        {ad.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{ad.location}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-blue-500/10 hover:text-blue-500 text-gray-500 rounded-lg transition-colors">
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if(window.confirm('Excluir este anúncio permanentemente?')) onDelete(ad.id);
                          }}
                          className="p-2 hover:bg-red-500/10 hover:text-red-500 text-gray-500 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredAds.length === 0 && (
            <div className="p-20 text-center text-gray-500">
              {searchQuery ? 'Nenhum produto encontrado para esta busca.' : 'Nenhum produto no catálogo. Adicione seu primeiro produto!'}
            </div>
          )}
        </div>
        
        <AdModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveAd}
        />
      </div>
    </div>
  );
};
