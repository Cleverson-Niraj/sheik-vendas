
import React, { useState, useRef } from 'react';
import { X, Sparkles, DollarSign, Camera, Check, Upload, Image as ImageIcon, Video, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { enhanceAdDescription, suggestPrice } from '../geminiService';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ad: any) => void;
}

export const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: CATEGORIES[1],
    location: '',
    whatsapp: '',
    description: '',
    images: ['https://picsum.photos/800/600?random=' + Math.random()],
    videos: [] as string[],
    featured: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAIPrice = async () => {
    if (!formData.title) return alert("Digite um título primeiro!");
    setLoading(true);
    const suggested = await suggestPrice(formData.title, formData.category);
    setFormData(prev => ({ ...prev, price: suggested.toString() }));
    setLoading(false);
  };

  const handleAIDescription = async () => {
    if (!formData.title) return alert("Digite um título primeiro!");
    setLoading(true);
    const enhanced = await enhanceAdDescription(formData.title, formData.description);
    setFormData(prev => ({ ...prev, description: enhanced }));
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === files.length) {
              setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newVideos: string[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newVideos.push(event.target.result as string);
            if (newVideos.length === files.length) {
              setFormData(prev => ({ ...prev, videos: [...prev.videos, ...newVideos] }));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      price: parseFloat(formData.price),
      created_at: new Date().toISOString(),
      isFavorite: false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#121212] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <PlusIcon /> Adicionar Produto ao Catálogo
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Título do Item</label>
              <input 
                required
                type="text" 
                placeholder="Ex: iPhone 15 Pro Max" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
                value={formData.title}
                onChange={e => setFormData(p => ({...p, title: e.target.value}))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Categoria</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
                value={formData.category}
                onChange={e => setFormData(p => ({...p, category: e.target.value}))}
              >
                {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preço (R$)</label>
                <button 
                  type="button"
                  onClick={handleAIPrice}
                  className="text-[10px] font-bold text-[#FF033E] flex items-center gap-1 hover:underline"
                >
                  <Sparkles size={10} /> Sugestão IA
                </button>
              </div>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  required
                  type="number" 
                  placeholder="0,00" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
                  value={formData.price}
                  onChange={e => setFormData(p => ({...p, price: e.target.value}))}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">WhatsApp</label>
              <input 
                required
                type="tel" 
                placeholder="11999999999" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
                value={formData.whatsapp}
                onChange={e => setFormData(p => ({...p, whatsapp: e.target.value}))}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Localização</label>
            <input 
              required
              type="text" 
              placeholder="Ex: São Paulo, SP" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
              value={formData.location}
              onChange={e => setFormData(p => ({...p, location: e.target.value}))}
            />
          </div>

          {/* Imagens */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Imagens do Produto</label>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg h-24 flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Upload size={16} className="text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">Adicionar Imagem</span>
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Vídeos */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Vídeos do Produto (Opcional)</label>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {formData.videos?.map((video, index) => (
                  <div key={index} className="relative group">
                    <video src={video} className="w-full h-24 object-cover rounded-lg" controls />
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg h-24 flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Video size={16} className="text-gray-400 mb-1" />
                  <span className="text-xs text-gray-400">Adicionar Vídeo</span>
                </button>
              </div>
              <input
                ref={videoInputRef}
                type="file"
                multiple
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Descrição Detalhada</label>
              <button 
                type="button"
                onClick={handleAIDescription}
                className="text-[10px] font-bold text-[#FF033E] flex items-center gap-1 hover:underline"
              >
                <Sparkles size={10} /> Melhorar com IA
              </button>
            </div>
            <textarea 
              rows={6}
              placeholder="Descreva detalhadamente o produto: estado, características, motivo da venda, etc..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors resize-none"
              value={formData.description}
              onChange={e => setFormData(p => ({...p, description: e.target.value}))}
            />
          </div>

          {/* Destaque */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={e => setFormData(p => ({...p, featured: e.target.checked}))}
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#FF033E] focus:ring-[#FF033E]"
            />
            <label htmlFor="featured" className="text-sm text-gray-300">
              Destacar este anúncio (aparecerá em primeiro)
            </label>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-[#FF033E] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d00232] transition-colors shadow-lg shadow-[#FF033E]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> : <><Check size={20} /> Adicionar Produto ao Catálogo</>}
          </button>
        </form>
      </div>
    </div>
  );
};

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
