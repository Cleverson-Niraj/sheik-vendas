
import React from 'react';
import { Plus, Menu, Search, User } from 'lucide-react';

interface HeaderProps {
  onPostClick: () => void;
  onSearchChange: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onPostClick, onSearchChange }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 lg:gap-8">
        <h1 className="text-xl lg:text-2xl font-black text-[#FF033E] tracking-tighter">
          SHEIK <span className="text-white">VENDAS</span>
        </h1>
        
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-64 lg:w-96">
          <Search className="text-gray-500 mr-2" size={18} />
          <input 
            type="text" 
            placeholder="O que você está procurando?" 
            className="bg-transparent border-none outline-none text-sm text-white w-full"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <button 
          onClick={onPostClick}
          className="flex items-center gap-2 bg-[#FF033E] text-white px-4 py-2 lg:px-6 lg:py-2.5 rounded-full font-bold shadow-lg shadow-[#FF033E]/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Anunciar</span>
        </button>
        
        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
          <User size={24} />
        </button>
        
        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};
