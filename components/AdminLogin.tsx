
import React, { useState } from 'react';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (pass: string) => void;
  onBack: () => void;
  error?: string;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack, error }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md bg-[#121212] rounded-3xl p-8 border border-white/5 shadow-2xl">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} /> Voltar para a loja
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#FF033E]/10 rounded-2xl flex items-center justify-center mb-4 border border-[#FF033E]/20">
            <Lock className="text-[#FF033E]" size={32} />
          </div>
          <h2 className="text-2xl font-black text-white">Área Restrita</h2>
          <p className="text-gray-500 text-sm">Acesse o painel administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Senha de Acesso</label>
            <input 
              autoFocus
              type="password" 
              className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-4 text-white outline-none focus:border-[#FF033E] transition-all`}
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FF033E] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#FF033E]/20 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck size={20} /> Entrar no Painel
          </button>
        </form>
      </div>
    </div>
  );
};
