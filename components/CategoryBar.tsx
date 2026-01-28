
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryBarProps {
  activeCategory: string;
  onSelect: (cat: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 lg:px-8 py-6 no-scrollbar">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-6 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all border ${
            activeCategory === cat 
              ? "bg-[#FF033E] border-[#FF033E] text-white shadow-lg shadow-[#FF033E]/20" 
              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
