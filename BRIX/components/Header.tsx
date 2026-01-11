
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onHomeClick: () => void;
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onHomeClick, onAddClick }) => {
  return (
    <header className="relative w-full">
      {/* Top Banner */}
      <div className="bg-[#8B3A2B] text-white p-4 lg:p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center relative overflow-hidden">
        <div className="z-10">
          <h1 
            className="text-4xl lg:text-7xl font-extrabold tracking-tighter cursor-pointer" 
            onClick={onHomeClick}
          >
            PROJECT POSTS
          </h1>
          <p className="text-sm lg:text-xl font-medium mt-1">Building up trust with every post!</p>
        </div>
        
        {/* Diagonal caution stripes */}
        <div className="absolute right-0 top-0 h-full w-1/2 construction-stripes hidden lg:block" />
      </div>

      {/* Navigation / Search Bar */}
      <div className="bg-[#5C2B21] p-3 flex items-center justify-between shadow-lg">
        <div className="relative w-full max-w-2xl mx-auto flex items-center gap-4">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search project names..."
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full leading-5 bg-[#FDF7E7] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white sm:text-sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button 
            onClick={onAddClick}
            className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg active:scale-90"
            title="Add new project"
          >
            <svg className="h-6 w-6 text-[#5C2B21]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
