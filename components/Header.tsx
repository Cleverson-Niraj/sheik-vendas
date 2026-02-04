
import React from 'react';
import { Menu, Search } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onSearchChange: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onSearchChange }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 py-3 flex items-center justify-between">
      
      {/* LOGO */}
      <div className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Logo Sheik Vendas"
          className="h-10 w-auto object-contain"
        />

        {/* Busca */}
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

      {/* MENU (abre admin) */}
      <button
        onClick={onOpenAdmin}
        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
        title="Painel Admin"
      >
        <Menu size={26} />
      </button>
    </header>
  );
};
