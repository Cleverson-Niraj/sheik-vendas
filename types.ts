
export interface Ad {
  id: string;
  title: string;
  price: number;
  location: string;
  category: string;
  images: string[];
  videos?: string[];
  whatsapp: string;
  description: string;
  created_at: string;
  isFavorite?: boolean;
  featured?: boolean;
}

export type Category = "Todos" | "Veículos" | "Motos" | "Eletrônicos" | "Imóveis" | "Móveis" | "Pets";

export type ViewState = 'home' | 'admin-login' | 'admin-dashboard' | 'admin-cadastro';
