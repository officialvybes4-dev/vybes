import React from 'react';
import { Search, SlidersHorizontal, Layers, LayoutGrid, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedTag, 
  setSelectedTag, 
  onlineOnly, 
  setOnlineOnly 
}) => {
  const { exploreView, setExploreView } = useApp();
  const { theme } = useTheme();

  const sampleTags = ['All', 'Coffee', 'Travel', 'Fitness', 'Music', 'Design', 'Tech', 'Foodie'];

  return (
    <div className="space-y-3 mb-6">
      
      {/* Top Search + View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, interests, city (e.g. Aanya, Mumbai, Tech)..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm border transition-all outline-none ${theme.inputBg}`}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Online Only Filter */}
          <button
            onClick={() => setOnlineOnly(!onlineOnly)}
            className={`px-3 py-2 rounded-2xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              onlineOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlineOnly ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
            <span>Online Now</span>
          </button>

          {/* Swipe vs Grid Mode Switch */}
          <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10">
            <button
              onClick={() => setExploreView('swipe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                exploreView === 'swipe'
                  ? `${theme.buttonClass} shadow-sm`
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Swipe Card View"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Swipe</span>
            </button>
            <button
              onClick={() => setExploreView('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                exploreView === 'grid'
                  ? `${theme.buttonClass} shadow-sm`
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Grid Feed View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>

        </div>
      </div>

      {/* Filter Chips / Interests Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {sampleTags.map((tag) => {
          const isSelected = (tag === 'All' && !selectedTag) || selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === 'All' ? '' : tag)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                isSelected
                  ? `${theme.buttonClass} shadow-sm scale-105`
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10'
              }`}
            >
              {tag !== 'All' && '#'}
              {tag}
            </button>
          );
        })}
      </div>

    </div>
  );
};
