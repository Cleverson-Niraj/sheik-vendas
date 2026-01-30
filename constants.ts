
import { Ad } from './types';

export const CATEGORIES = [
  "Todos",
  "Veículos",
  "Motos",
  "Eletrônicos",
  "Imóveis",
  "Móveis"
];

export const MOCK_ADS: Ad[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max 256GB Titanium',
    price: 7499,
    location: 'São Paulo, SP',
    category: 'Eletrônicos',
    images: [
      'https://picsum.photos/id/160/800/600',
      'https://picsum.photos/id/161/800/600'
    ],
    videos: [],
    whatsapp: '11999999999',
    description:
      'Aparelho em estado de novo, com garantia até outubro de 2024. Todos os acessórios inclusos.',
    created_at: new Date().toISOString(),
    featured: true,
  },
  {
    id: '2',
    title: 'Honda Civic Touring 2023',
    price: 185000,
    location: 'Curitiba, PR',
    category: 'Veículos',
    images: [
      'https://picsum.photos/id/111/800/600',
      'https://picsum.photos/id/112/800/600',
      'https://picsum.photos/id/113/800/600'
    ],
    videos: [],
    whatsapp: '41999999999',
    description:
      'Único dono, todas as revisões na concessionária. Carro impecável.',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    featured: false,
  },
  {
    id: '3',
    title: 'Apartamento de Luxo - 3 Suítes',
    price: 1250000,
    location: 'Balneário Camboriú, SC',
    category: 'Imóveis',
    images: [
      'https://picsum.photos/id/122/800/600',
      'https://picsum.photos/id/123/800/600'
    ],
    videos: [],
    whatsapp: '47988888888',
    description:
      'Vista mar permanente, mobiliado e decorado. Melhor localização da cidade.',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    featured: true,
  },
  {
    id: '4',
    title: 'Yamaha MT-07 2022',
    price: 45000,
    location: 'Rio de Janeiro, RJ',
    category: 'Motos',
    images: ['https://picsum.photos/id/146/800/600'],
    videos: [],
    whatsapp: '21977777777',
    description:
      'Escapamento Full Akrapovic, slider e protetor de radiador. Manual e chave reserva.',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    featured: false,
  }
];
