import React from 'react';
import { 
  Search, 
  Layers, 
  LayoutGrid, 
  Sparkles,
  Radar,
  EyeOff,
  Plane,
  Moon,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

export const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedTag, 
  setSelectedTag, 
  onlineOnly, 
  setOnlineOnly,
  onOpenRadar,
  onOpenBlindDate,
  onOpenPassport,
  onOpenTarot,
  onOpenBoost,
  onOpenVerification
}) => {
  const { exploreView, setExploreView } = useApp();
  const { theme } = useTheme();

  const sampleTags = ['All', 'Coffee', 'Travel', 'Fitness', 'Music', 'Design', 'Tech', 'Foodie'];

  return (
    <div className="space-y-2 mb-3 sm:mb-4">
      
      {/* Search Input & Controls Row */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        
        {/* Compact Search Bar */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, city, interest..."
            className={`w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 rounded-xl text-xs border transition-all outline-none ${theme.inputBg}`}
          />
        </div>

        {/* Online Filter Pill */}
        <button
          onClick={() => {
            sounds.playPop();
            setOnlineOnly(!onlineOnly);
          }}
          className={`px-2.5 py-1.5 sm:py-2 rounded-xl text-[11px] font-semibold border flex items-center gap-1 transition-all shrink-0 ${
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
            onClick={() => {
              sounds.playPop();
              setExploreView('swipe');
            }}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              exploreView === 'swipe'
                ? `${theme.buttonClass} shadow-sm`
                : 'text-gray-400 hover:text-white'
            }`}
            title="Swipe Deck Mode"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              setExploreView('grid');
            }}
            className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
              exploreView === 'grid'
                ? `${theme.buttonClass} shadow-sm`
                : 'text-gray-400 hover:text-white'
            }`}
            title="Profile Grid Mode"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Elite 20+ Dating Feature Quick Actions Ribbon */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
        
        {/* Proximity Radar */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenRadar?.();
          }}
          className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shrink-0 transition-transform active:scale-95 shadow-sm"
        >
          <Radar className="w-3.5 h-3.5 text-emerald-400 animate-spin [animation-duration:8s]" />
          <span>Radar</span>
        </button>

        {/* Blind Date 3-Min Mystery */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenBlindDate?.();
          }}
          className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 flex items-center gap-1 shrink-0 transition-transform active:scale-95 shadow-sm"
        >
          <EyeOff className="w-3.5 h-3.5 text-purple-400" />
          <span>Blind Date</span>
        </button>

        {/* Global Passport Teleport */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenPassport?.();
          }}
          className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 shrink-0 transition-transform active:scale-95 shadow-sm"
        >
          <Plane className="w-3.5 h-3.5 text-cyan-400 transform -rotate-45" />
          <span>Passport</span>
        </button>

        {/* Love Tarot Fortune */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenTarot?.();
          }}
          className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 flex items-center gap-1 shrink-0 transition-transform active:scale-95 shadow-sm"
        >
          <Moon className="w-3.5 h-3.5 text-amber-400" />
          <span>Love Tarot</span>
        </button>

        {/* 30-min Boost */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenBoost?.();
          }}
          className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 flex items-center gap-1 shrink-0 transition-transform active:scale-95 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-rose-400" />
          <span>Boost ⚡</span>
        </button>

        {/* Face Verification */}
        <button
          onClick={() => {
            sounds.playPop();
            onOpenVerification?.();
          }}
          className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 flex items-center gap-1 shrink-0 transition-transform active:scale-95 shadow-sm"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Verify</span>
        </button>

      </div>

      {/* Horizontal Scrollable Interest Tags */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 text-xs">
        {sampleTags.map((tag) => {
          const isSelected = (tag === 'All' && !selectedTag) || selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => {
                sounds.playPop();
                setSelectedTag(tag === 'All' ? '' : tag);
              }}
              className={`px-2.5 py-0.5 rounded-full whitespace-nowrap text-[10px] sm:text-xs font-semibold transition-all shrink-0 ${
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
