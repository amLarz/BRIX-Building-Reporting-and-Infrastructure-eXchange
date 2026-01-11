
import { Project, MaterialCategory } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'leyte-tide-protection',
    name: 'Leyte Tide Protection Wall',
    location: 'Tacloban City, Leyte',
    description: 'A multi-phase infrastructure project aimed at protecting the shoreline of Tacloban and Palo from storm surges similar to Typhoon Haiyan.',
    status: 'Developing Project',
    deadline: '2026-12-30',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000',
    upvotes: 342,
    downvotes: 89,
    materials: [
      { material: 'Portland Cement, 40kg', unit: 'Bag', price: 'PhP 259.00' },
      { material: 'Deformed Bar 12mm', unit: 'pc', price: 'PhP 310.00' },
      { material: 'Crushed Gravel', unit: 'Cubic Meter', price: 'PhP 1,150.00' },
      { material: 'Washed Sand', unit: 'Cubic Meter', price: 'PhP 950.00' },
    ],
    comments: [
      {
        id: 'c1',
        author: 'Engr. Santos',
        role: 'Citizen Auditor',
        text: 'The concrete pouring on Section 4 seems consistent with standards, but Section 3 has some visible honeycombing.',
        avatar: 'https://i.pravatar.cc/150?u=santos',
        date: '2024-03-10'
      }
    ]
  },
  {
    id: 'quezon-skyway-ext',
    name: 'Quezon Avenue Flyover Rehabilitation',
    location: 'Quezon City, Metro Manila',
    description: 'Structural reinforcement and asphalt overlay for the existing flyover to improve safety and traffic flow in one of Manila’s busiest corridors.',
    status: 'Finished Project',
    deadline: '2025-01-15',
    finishDate: '01/15/25',
    imageUrl: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=1000',
    upvotes: 890,
    downvotes: 45,
    materials: [
      { material: 'Asphalt Premix', unit: 'Metric Ton', price: 'PhP 6,200.00' },
      { material: 'Paint Latex Gloss', unit: 'gal', price: 'PhP 640.20' },
      { material: 'LED Street Lamp', unit: 'Set', price: 'PhP 14,500.00' },
    ],
    comments: [
      {
        id: 'c2',
        author: 'Maria Clara',
        role: 'Commuter',
        text: 'The road is much smoother now! Hope the drainage issues were also fixed underneath.',
        avatar: 'https://i.pravatar.cc/150?u=maria',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400',
        date: '2025-01-20'
      }
    ]
  }
];

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  {
    id: 'cement',
    name: 'CEMENT',
    icon: '🧱',
    items: [
      { name: 'Portland Cement, 40kg', unit: 'Bag', price: 'PhP 259.00' },
      { name: 'Pozzolan Cement, 40kg', unit: 'Bag', price: 'PhP 261.00' },
      { name: 'White Cement, 40kg', unit: 'Bag', price: 'PhP 750.00' },
    ]
  },
  {
    id: 'hollow-blocks',
    name: 'HOLLOW BLOCKS',
    icon: '🏗️',
    items: [
      { name: 'Concrete Hollow Blocks (CHB) 4"', unit: 'pc', price: 'PhP 12.00' },
      { name: 'Concrete Hollow Blocks (CHB) 6"', unit: 'pc', price: 'PhP 18.00' },
      { name: 'Concrete Hollow Blocks (CHB) 8"', unit: 'pc', price: 'PhP 24.50' },
    ]
  },
  {
    id: 'plywoods',
    name: 'PLYWOODS',
    icon: '🪵',
    items: [
      { name: '1/4" x 4\' x 8\' Marine Plywood', unit: 'pc', price: 'PhP 435.00' },
      { name: '1/2" x 4\' x 8\' Marine Plywood', unit: 'pc', price: 'PhP 790.00' },
      { name: '1/4" x 4\' x 8\' Ordinary Plywood', unit: 'pc', price: 'PhP 381.00' },
      { name: '1/2" x 4\' x 8\' Ordinary Plywood', unit: 'pc', price: 'PhP 674.00' },
    ]
  },
  {
    id: 'paints',
    name: 'PAINTS',
    icon: '🎨',
    items: [
      { name: 'Paint Latex Gloss', unit: 'gal', price: 'PhP 640.20' },
      { name: 'Paint Red Lead', unit: 'gal', price: 'PhP 581.00' },
      { name: 'Oil Paint', unit: 'Ltr', price: 'PhP 158.09' },
      { name: 'Paint Tinting Color', unit: 'Ltr', price: 'PhP 182.00' },
    ]
  },
  {
    id: 'steel',
    name: 'STEEL & METAL',
    icon: '🔩',
    items: [
      { name: 'Deformed Bar 10mm', unit: 'pc', price: 'PhP 215.00' },
      { name: 'Deformed Bar 12mm', unit: 'pc', price: 'PhP 310.00' },
      { name: 'G.I. Pipe 1-1/2"', unit: 'pc', price: 'PhP 840.00' },
    ]
  }
];
