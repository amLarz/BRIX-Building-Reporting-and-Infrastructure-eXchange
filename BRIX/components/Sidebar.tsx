
import React from 'react';
import { MaterialCategory } from '../types';

interface SidebarProps {
  categories: MaterialCategory[];
  onCategoryClick: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, onCategoryClick }) => {
  return (
    <aside className="bg-[#8B3A2B] rounded-xl overflow-hidden shadow-xl border-4 border-[#8B3A2B]">
      <div className="bg-[#8B3A2B] p-3 border-b-2 border-white/20 flex items-center justify-between">
        <h2 className="text-white font-black italic tracking-tighter text-xl">MATERIAL PRICES</h2>
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="h-4 w-1 bg-white/30 rotate-12" />)}
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-4 bg-[#6A2B20]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat.id)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl aspect-square transition-all hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            {/* Background specific colors matching wireframe vibe */}
            <div className={`absolute inset-0 opacity-80 ${
              cat.id === 'plywoods' ? 'bg-[#D2691E]' : 
              cat.id === 'hollow-blocks' ? 'bg-[#808080]' : 
              cat.id === 'cement' ? 'bg-[#B0C4DE]' : 
              cat.id === 'paints' ? 'bg-[#B22222]' :
              'bg-[#4A5568]'
            }`} />
            
            <div className="z-10 flex flex-col items-center">
              <span className="text-3xl mb-1">{cat.icon}</span>
              <span className="text-white text-[10px] font-black leading-tight text-center uppercase">
                {cat.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="h-24 bg-[#6A2B20] flex items-center justify-center">
        <div className="w-1.5 h-16 bg-white/20 rounded-full shadow-inner" />
      </div>
    </aside>
  );
};

export default Sidebar;
