import React, { useState, useRef } from 'react';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Video, Trash2, Sparkles, DollarSign, X, Check } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { enhanceAdDescription, suggestPrice } from '../geminiService';
import { Ad } from '../types';

interface AdminCadastroProps {
  onSave: (ad: Ad) => void;
  onBack: () => void;
}

export const AdminCadastro: React.FC<AdminCadastroProps> = ({ onSave, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: CATEGORIES[1],
    location: '',
    whatsapp: '',
    description: '',
    images: [] as string[],
    videos: [] as string[],
    featured: false
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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

  const handleAIPrice = async () => {
    if (!formData.title) return alert("Digite um título primeiro!");
    setLoading(true);
    try {
      const suggested = await suggestPrice(formData.title, formData.category);
      setFormData(prev => ({ ...prev, price: suggested.toString() }));
    } catch (error) {
      alert('Erro ao sugerir preço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAIDescription = async () => {
    if (!formData.title) return alert("Digite um título primeiro!");
    setLoading(true);
    try {
      const enhanced = await enhanceAdDescription(formData.title, formData.description);
      setFormData(prev => ({ ...prev, description: enhanced }));
    } catch (error) {
      alert('Erro ao melhorar descrição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      alert('Adicione pelo menos uma imagem!');
      return;
    }
    
    onSave({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      price: parseFloat(formData.price),
      created_at: new Date().toISOString(),
      isFavorite: false
    });
    
    // Reset form
    setFormData({
      title: '',
      price: '',
      category: CATEGORIES[1],
      location: '',
      whatsapp: '',
      description: '',
      images: [],
      videos: [],
      featured: false
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="bg-[#121212] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                Voltar ao Painel
              </button>
              <div className="h-6 w-px bg-white/10"></div>
              <h1 className="text-xl font-bold text-white">Cadastrar Novo Produto</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <div className="bg-[#121212] rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF033E] rounded-full"></div>
              Informações Básicas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Título do Produto *</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: iPhone 15 Pro Max 256GB" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
                  value={formData.title}
                  onChange={e => setFormData(p => ({...p, title: e.target.value}))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Categoria *</label>
                <select 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
                  value={formData.category}
                  onChange={e => setFormData(p => ({...p, category: e.target.value}))}
                >
                  {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Preço e Contato */}
          <div className="bg-[#121212] rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF033E] rounded-full"></div>
              Preço e Contato
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300">Preço (R$) *</label>
                  <button 
                    type="button"
                    onClick={handleAIPrice}
                    disabled={loading}
                    className="text-xs font-medium text-[#FF033E] flex items-center gap-1 hover:underline disabled:opacity-50"
                  >
                    <Sparkles size={12} /> Sugestão IA
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">WhatsApp *</label>
                <input 
                  required
                  type="tel" 
                  placeholder="11999999999" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
                  value={formData.whatsapp}
                  onChange={e => setFormData(p => ({...p, whatsapp: e.target.value.replace(/\D/g, '')}))}
                />
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium text-gray-300">Localização *</label>
              <input 
                required
                type="text" 
                placeholder="Ex: São Paulo, SP" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FF033E] transition-colors"
                value={formData.location}
                onChange={e => setFormData(p => ({...p, location: e.target.value}))}
              />
            </div>
          </div>

          {/* Mídia */}
          <div className="bg-[#121212] rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF033E] rounded-full"></div>
              Imagens e Vídeos
            </h2>
            
            {/* Imagens */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-300 block mb-4">Imagens do Produto *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg h-32 flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Upload size={20} className="text-gray-400 mb-2" />
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

            {/* Vídeos */}
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-4">Vídeos (Opcional)</label>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {formData.videos?.map((video, index) => (
                  <div key={index} className="relative group">
                    <video src={video} className="w-full h-32 object-cover rounded-lg" controls />
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg h-32 flex flex-col items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Video size={20} className="text-gray-400 mb-2" />
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
          <div className="bg-[#121212] rounded-2xl border border-white/5 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF033E] rounded-full"></div>
                Descrição Detalhada
              </h2>
              <button 
                type="button"
                onClick={handleAIDescription}
                disabled={loading}
                className="text-xs font-medium text-[#FF033E] flex items-center gap-1 hover:underline disabled:opacity-50"
              >
                <Sparkles size={12} /> Melhorar com IA
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

          {/* Opções */}
          <div className="bg-[#121212] rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF033E] rounded-full"></div>
              Opções de Destaque
            </h2>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={e => setFormData(p => ({...p, featured: e.target.checked}))}
                className="w-5 h-5 rounded border-white/20 bg-white/10 text-[#FF033E] focus:ring-[#FF033E]"
              />
              <label htmlFor="featured" className="text-sm text-gray-300">
                Destacar este produto (aparecerá em primeiro na lista)
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onBack}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#FF033E] hover:bg-[#d00232] text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-[#FF033E]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Save size={20} />
                  Cadastrar Produto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
