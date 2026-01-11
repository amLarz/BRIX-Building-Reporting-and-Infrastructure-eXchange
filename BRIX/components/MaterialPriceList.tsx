
import React, { useState } from 'react';
import { MaterialCategory } from '../types';

interface MaterialPriceListProps {
  category: MaterialCategory;
  onBack: () => void;
}

const MaterialPriceList: React.FC<MaterialPriceListProps> = ({ category, onBack }) => {
  const [showInspector, setShowInspector] = useState(false);
  const GLOBAL_DB_URL = "https://share.google/AaBXqWaNwFF6RrT0u";

  return (
    <div className="space-y-6 animate-in">
      <div className="bg-[#2D2926] text-white rounded-t-lg overflow-hidden border-2 border-[#2D2926] shadow-xl">
        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-white/20">
          <div className="p-4 lg:w-1/3 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <span className="text-3xl">{category.icon}</span>
               <h2 className="text-3xl font-black italic tracking-tighter uppercase">{category.name}</h2>
            </div>
            <div className="h-8 w-24 construction-stripes" />
          </div>
          <div className="p-4 lg:w-48 flex items-center justify-center font-black italic uppercase text-2xl">
             {showInspector ? 'LIVE VIEW' : 'UNIT'}
          </div>
          <div className="p-4 flex-grow flex items-center justify-between font-black italic uppercase text-2xl px-8">
             {showInspector ? 'EXTERNAL DATABASE' : 'PRICE IN PhP'}
             <div className="flex items-center gap-4">
               <button 
                 onClick={() => setShowInspector(!showInspector)}
                 className={`text-[10px] font-black uppercase px-4 py-2 rounded border-2 transition-all flex items-center gap-2 ${
                   showInspector 
                   ? 'bg-white text-[#8B3A2B] border-white' 
                   : 'bg-[#8B3A2B] text-white border-white/30 hover:bg-white hover:text-[#8B3A2B]'
                 }`}
               >
                 {showInspector ? '✕ Close Inspector' : '🔍 Inspect Live Data'}
               </button>
               <button 
                onClick={onBack}
                className="p-2 bg-[#8B3A2B] rounded-full border-2 border-white hover:bg-white hover:text-[#8B3A2B] transition-all"
                title="Back to Home"
               >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
               </button>
             </div>
          </div>
        </div>
      </div>

      <div className="relative bg-[#EAD8B1] border-2 border-gray-900 rounded-b-lg overflow-hidden shadow-2xl min-h-[600px]">
        {showInspector ? (
          <div className="w-full h-[800px] flex flex-col">
            <div className="bg-gray-900 px-6 py-2 flex items-center justify-between">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Secure Frame: philconprices.com via Google Share
              </span>
              <a href={GLOBAL_DB_URL} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-[#EAD8B1] hover:underline">
                Open in Full Window ↗
              </a>
            </div>
            <div className="flex-grow bg-white">
              {/* Note: Google Share links may restrict embedding. 
                  We use an iframe to attempt the "peeking window" effect. */}
              <iframe 
                src={GLOBAL_DB_URL}
                className="w-full h-full border-none"
                title="Global Material Database Inspector"
                allow="autoplay"
              />
            </div>
            <div className="p-4 bg-gray-900 border-t border-white/10 flex justify-center">
               <div className="flex gap-1">
                  {[1,2,3,4,5,6].map(i => <div key={i} className="h-2 w-8 bg-yellow-500/20 rounded-full" />)}
               </div>
            </div>
          </div>
        ) : (
          <div className="divide-y-2 divide-gray-900 animate-in fade-in">
             {category.items.map((item, idx) => (
               <div key={idx} className="flex flex-col lg:flex-row hover:bg-white/40 transition-colors group">
                  <div className="p-6 lg:w-1/3 text-lg font-bold text-gray-800 lg:border-r-2 lg:border-gray-900">
                     {item.name}
                  </div>
                  <div className="p-6 lg:w-48 text-center text-lg font-medium text-gray-700 lg:border-r-2 lg:border-gray-900 bg-black/5 group-hover:bg-transparent">
                     {item.unit}
                  </div>
                  <div className="p-6 flex-grow text-xl font-black text-gray-900 pl-8">
                     {item.price}
                  </div>
               </div>
             ))}
             
             {/* Placeholders matching PDF style */}
             {[1, 2, 3].map(i => (
               <div key={`empty-${i}`} className="flex flex-col lg:flex-row opacity-30">
                  <div className="p-6 lg:w-1/3 lg:border-r-2 lg:border-gray-900 italic font-medium">BRIX verified entry...</div>
                  <div className="p-6 lg:w-48 lg:border-r-2 lg:border-gray-900 italic font-medium">pending</div>
                  <div className="p-6 flex-grow italic font-medium">...</div>
               </div>
             ))}
          </div>
        )}
      </div>

      {!showInspector && (
        <div className="flex justify-between items-center mt-6 px-4">
           <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
             Data Synchronized with PhilConPrices Standards
           </div>
           <button 
             onClick={() => setShowInspector(true)}
             className="flex items-center gap-2 group"
           >
              <div className="h-0.5 w-12 bg-gray-200 group-hover:bg-[#8B3A2B] transition-colors" />
              <span className="text-[10px] font-black text-gray-400 group-hover:text-[#8B3A2B] uppercase tracking-widest">
                Toggle Live Database Inspector
              </span>
           </button>
        </div>
      )}
    </div>
  );
};

export default MaterialPriceList;
