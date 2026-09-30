import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  sunset: {
    id: 'sunset',
    name: 'Sunset Blaze',
    type: 'dark',
    badge: '🔥 Hot & Romantic',
    bgClass: 'bg-gradient-to-br from-slate-950 via-stone-900 to-rose-950 text-slate-100',
    navBg: 'bg-slate-900/80 border-rose-500/20',
    cardBg: 'bg-slate-900/60 border-rose-500/20 backdrop-blur-md',
    cardHover: 'hover:border-rose-500/50 hover:shadow-rose-500/10',
    accentGradient: 'from-rose-500 via-pink-500 to-amber-500',
    accentText: 'text-rose-400',
    accentBorder: 'border-rose-500',
    buttonClass: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25',
    inputBg: 'bg-slate-950/60 border-slate-700/60 text-white focus:border-rose-500',
    highlightBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber Neon',
    type: 'dark',
    badge: '⚡ Futuristic Glow',
    bgClass: 'bg-gradient-to-br from-black via-zinc-950 to-indigo-950 text-slate-100',
    navBg: 'bg-zinc-950/80 border-cyan-500/30',
    cardBg: 'bg-zinc-900/70 border-cyan-500/30 backdrop-blur-md',
    cardHover: 'hover:border-cyan-400 hover:shadow-cyan-500/20',
    accentGradient: 'from-fuchsia-500 via-purple-500 to-cyan-400',
    accentText: 'text-cyan-400',
    accentBorder: 'border-cyan-400',
    buttonClass: 'bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25',
    inputBg: 'bg-black/70 border-zinc-700 text-cyan-100 focus:border-cyan-400',
    highlightBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
  },
  rose: {
    id: 'rose',
    name: 'Midnight Rose',
    type: 'dark',
    badge: '🌹 Luxury Obsidian',
    bgClass: 'bg-gradient-to-br from-stone-950 via-neutral-950 to-red-950 text-neutral-100',
    navBg: 'bg-neutral-900/80 border-red-500/20',
    cardBg: 'bg-neutral-900/70 border-red-500/20 backdrop-blur-md',
    cardHover: 'hover:border-red-500/50 hover:shadow-red-500/20',
    accentGradient: 'from-red-600 via-rose-600 to-pink-500',
    accentText: 'text-rose-400',
    accentBorder: 'border-rose-500',
    buttonClass: 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30',
    inputBg: 'bg-neutral-950/60 border-neutral-700 text-white focus:border-red-500',
    highlightBadge: 'bg-red-500/20 text-red-300 border-red-500/30'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Royale',
    type: 'dark',
    badge: '👑 Rich & Royal',
    bgClass: 'bg-gradient-to-br from-gray-950 via-zinc-950 to-emerald-950 text-emerald-50',
    navBg: 'bg-zinc-900/80 border-emerald-500/20',
    cardBg: 'bg-zinc-900/70 border-emerald-500/25 backdrop-blur-md',
    cardHover: 'hover:border-emerald-400 hover:shadow-emerald-500/20',
    accentGradient: 'from-emerald-500 via-teal-500 to-amber-400',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-500',
    buttonClass: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25',
    inputBg: 'bg-zinc-950/60 border-zinc-700 text-emerald-100 focus:border-emerald-400',
    highlightBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Twilight',
    type: 'dark',
    badge: '🌊 Deep Serenity',
    bgClass: 'bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-slate-100',
    navBg: 'bg-slate-900/80 border-sky-500/20',
    cardBg: 'bg-slate-900/70 border-sky-500/25 backdrop-blur-md',
    cardHover: 'hover:border-sky-400 hover:shadow-sky-500/20',
    accentGradient: 'from-sky-500 via-blue-600 to-indigo-500',
    accentText: 'text-sky-400',
    accentBorder: 'border-sky-500',
    buttonClass: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25',
    inputBg: 'bg-slate-950/60 border-slate-700 text-sky-100 focus:border-sky-400',
    highlightBadge: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
  },
  light: {
    id: 'light',
    name: 'Aura Light Clean',
    type: 'light',
    badge: '☀️ Crisp & Modern',
    bgClass: 'bg-gradient-to-br from-rose-50 via-slate-50 to-pink-50 text-slate-800',
    navBg: 'bg-white/85 border-rose-200/80',
    cardBg: 'bg-white/85 border-rose-200/60 shadow-sm backdrop-blur-md',
    cardHover: 'hover:border-rose-400 hover:shadow-md hover:shadow-rose-100',
    accentGradient: 'from-rose-500 via-pink-500 to-orange-400',
    accentText: 'text-rose-600',
    accentBorder: 'border-rose-500',
    buttonClass: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-200',
    inputBg: 'bg-white/90 border-slate-200 text-slate-900 focus:border-rose-500',
    highlightBadge: 'bg-rose-100 text-rose-700 border-rose-200'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem('aura_dating_theme') || 'sunset';
  });

  const [deviceMode, setDeviceMode] = useState(() => {
    return localStorage.getItem('aura_device_mode') || 'web'; // 'web' or 'mobile-frame'
  });

  const [glassEnabled, setGlassEnabled] = useState(true);

  useEffect(() => {
    localStorage.setItem('aura_dating_theme', currentThemeId);
    if (THEMES[currentThemeId]?.type === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentThemeId]);

  useEffect(() => {
    localStorage.setItem('aura_device_mode', deviceMode);
  }, [deviceMode]);

  const activeTheme = THEMES[currentThemeId] || THEMES.sunset;

  return (
    <ThemeContext.Provider
      value={{
        theme: activeTheme,
        themeId: currentThemeId,
        setTheme: setCurrentThemeId,
        allThemes: Object.values(THEMES),
        deviceMode,
        setDeviceMode,
        glassEnabled,
        toggleGlass: () => setGlassEnabled(prev => !prev)
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
