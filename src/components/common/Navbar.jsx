import React, { useState } from 'react';
import { 
  Flame, 
  Compass, 
  MessageCircle, 
  Heart, 
  User, 
  Palette, 
  Smartphone, 
  Monitor, 
  Sparkles, 
  Users,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { UserMenuDropdown } from './UserMenuDropdown';

export const Navbar = ({ onOpenThemePicker, onOpenPersonaModal }) => {
  const { 
    activeTab, 
    setActiveTab, 
    totalUnreadCount, 
    matches, 
    currentUser,
    isAuthenticated,
    openAuthModal
  } = useApp();
  const { theme, deviceMode, setDeviceMode } = useTheme();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors duration-300 border-b backdrop-blur-xl ${theme.navBg}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center shadow-md shadow-rose-500/30 group-hover:scale-105 transition-transform duration-200">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              VYBES
            </span>
            <span className="text-[9px] sm:text-xs uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
              APP
            </span>
          </div>
        </div>

        {/* Center Navigation (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'explore'
                ? `${theme.buttonClass} scale-105`
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('chats')}
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'chats'
                ? `${theme.buttonClass} scale-105`
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Direct Chat</span>
            {totalUnreadCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full animate-bounce shadow-md">
                {totalUnreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('likes')}
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'likes'
                ? `${theme.buttonClass} scale-105`
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Matches</span>
            {matches.length > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold rounded-full">
                {matches.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'profile'
                ? `${theme.buttonClass} scale-105`
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </button>
        </nav>

        {/* Right Action Bar (Mobile + Desktop Responsive) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Persona switcher (Desktop only) */}
          {isAuthenticated && (
            <button
              onClick={onOpenPersonaModal}
              title="Switch Persona"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>Persona</span>
            </button>
          )}

          {/* Desktop Simulator Frame Toggle (Desktop Only) */}
          <button
            onClick={() => setDeviceMode(deviceMode === 'web' ? 'mobile-frame' : 'web')}
            title="Toggle Device Preview"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
          >
            {deviceMode === 'web' ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Phone Frame</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                <span>Desktop View</span>
              </>
            )}
          </button>

          {/* Theme Switcher Button (Compact icon on mobile, badge on desktop) */}
          <button
            onClick={onOpenThemePicker}
            title={`Active Theme: ${theme.name}`}
            className="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 sm:bg-gradient-to-r sm:from-purple-500/20 sm:to-rose-500/20 text-rose-400 sm:text-rose-300 border border-white/10 sm:border-rose-500/30 flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <Palette className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">{theme.name}</span>
          </button>

          {/* Auth State Button / User Avatar */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="relative cursor-pointer flex items-center focus:outline-none"
                title="Account Settings & Logout"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-rose-500/50 hover:ring-rose-400 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900"></span>
              </button>

              <UserMenuDropdown
                isOpen={isUserMenuOpen}
                onClose={() => setIsUserMenuOpen(false)}
                onOpenPersonaModal={onOpenPersonaModal}
              />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => openAuthModal('signin')}
                className="px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>

              <button
                onClick={() => openAuthModal('signup')}
                className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1 ${theme.buttonClass} transition-transform active:scale-95 shadow-sm`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
