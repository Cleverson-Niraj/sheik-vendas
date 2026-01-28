
import React, { useState } from 'react';
import { Heart, MapPin, Clock, MessageCircle, ChevronLeft, ChevronRight, Video as VideoIcon, Image as ImageIcon } from 'lucide-react';
import { Ad } from '../types';

interface AdCardProps {
  ad: Ad;
  onToggleFavorite: (id: string) => void;
}

export const AdCard: React.FC<AdCardProps> = ({ ad, onToggleFavorite }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(ad.price);

  // Combinar imagens e vídeos para exibição
  const allMedia = [
    ...ad.images.map(img => ({ type: 'image', url: img })),
    ...(ad.videos || []).map(video => ({ type: 'video', url: video }))
  ];

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " anos";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " min";
    return "agora";
  };

  return (
    <div className="group bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-[#FF033E]/50 transition-all duration-300 shadow-xl flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        {allMedia[currentMediaIndex]?.type === 'image' ? (
          <img 
            src={allMedia[currentMediaIndex].url} 
            alt={ad.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <video 
            src={allMedia[currentMediaIndex]?.url} 
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
          />
        )}
        
        {/* Controles da galeria */}
        {allMedia.length > 1 && (
          <>
            <button 
              onClick={prevMedia}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextMedia}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
            
            {/* Indicadores */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {allMedia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMediaIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Indicador de tipo de mídia */}
        <div className="absolute top-3 left-3 flex gap-2">
          {ad.videos && ad.videos.length > 0 && (
            <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <VideoIcon size={12} /> Vídeo
            </span>
          )}
          <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <ImageIcon size={12} /> {ad.images.length}
          </span>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <button 
          onClick={() => onToggleFavorite(ad.id)}
          className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:text-[#FF033E] transition-colors"
        >
          <Heart size={20} fill={ad.isFavorite ? "#FF033E" : "transparent"} stroke={ad.isFavorite ? "#FF033E" : "currentColor"} />
        </button>

        {ad.featured && (
          <span className="absolute top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            ⭐ DESTAQUE
          </span>
        )}
        
        <span className="absolute bottom-3 left-3 bg-[#FF033E] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
          {ad.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-bold text-white text-lg line-clamp-1 mb-1 group-hover:text-[#FF033E] transition-colors">
          {ad.title}
        </h4>
        <p className="text-2xl font-extrabold text-[#FF033E] mb-3">
          {formattedPrice}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mb-6">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-[#FF033E]" /> {ad.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-[#FF033E]" /> {timeAgo(ad.created_at)}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5">
          <a
            href={`https://wa.me/55${ad.whatsapp}?text=Olá,%20tenho%20interesse%20no%20anúncio:%20${encodeURIComponent(ad.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#25D366]/10"
          >
            <MessageCircle size={20} />
            Negociar agora
          </a>
        </div>
      </div>
    </div>
  );
};
