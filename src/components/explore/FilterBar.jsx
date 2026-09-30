import React from 'react';
import { Search, Layers, LayoutGrid, Sparkles } from 'lucide-react';
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
    <div className="space-y-2.5 mb-3 sm:mb-5">
      
      {/* Search Input & Controls Row */}
      <div className="flex items-center gap-2">
        
        {/* Compact Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, city, tag..."
            className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border transition-all outline-none ${theme.inputBg}`}
          />
        </div>

        {/* Online Filter Pill */}
        <button
          onClick={() => setOnlineOnly(!onlineOnly)}
          className={`px-2.5 py-2 rounded-xl text-[11px] font-semibold border flex items-center gap-1 transition-all shrink-0 ${
            onlineOnly
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
              : 'bg-white/5 text-gray-400 border-white/10'
          }`}
          title="Filter Online Profiles"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${onlineOnly ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
          <span className="hidden sm:inline">Online</span>
        </button>

        {/* Swipe vs Grid Layout Switcher */}
        <div className="flex items-center p-0.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
          <button
            onClick={() => setExploreView('swipe')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              exploreView === 'swipe'
                ? `${theme.buttonClass} shadow-sm`
                : 'text-gray-400 hover:text-white'
            }`}
            title="Swipe Mode"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setExploreView('grid')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              exploreView === 'grid'
                ? `${theme.buttonClass} shadow-sm`
                : 'text-gray-400 hover:text-white'
            }`}
            title="Grid Mode"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Horizontal Scrollable Interest Tags */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 text-xs">
        {sampleTags.map((tag) => {
          const isSelected = (tag === 'All' && !selectedTag) || selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === 'All' ? '' : tag)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
                isSelected
                  ? `${theme.buttonClass} shadow-sm scale-105`
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
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
