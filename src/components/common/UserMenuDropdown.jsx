import React from 'react';
import { 
  User, 
  LogOut, 
  Settings, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Users,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const UserMenuDropdown = ({ isOpen, onClose, onOpenPersonaModal }) => {
  const { currentUser, logout, setActiveTab } = useApp();
  const { theme } = useTheme();

  if (!isOpen) return null;

  const isGoogle = currentUser.authProvider === 'google';

  const handleGoTo = (tab) => {
    setActiveTab(tab);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-6"
      onClick={onClose}
    >
      <div 
        className={`w-72 mt-12 rounded-3xl p-4 border shadow-2xl space-y-3 animate-fadeIn relative ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Card Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-rose-500/50"
            />
            {currentUser.verified && (
              <span className="absolute bottom-0 right-0 p-0.5 bg-blue-500 rounded-full text-white">
                <ShieldCheck className="w-3 h-3" />
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">
              {currentUser.name}, {currentUser.age}
            </h4>
            <p className="text-[11px] text-gray-400 truncate">{currentUser.email || 'aura_member@dating.com'}</p>

            {/* Auth Provider Badge */}
            <div className="mt-1 flex items-center gap-1">
              {isGoogle ? (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-semibold">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google Auth</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-semibold">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Verified User</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Menu Links */}
        <div className="space-y-1">
          <button
            onClick={() => handleGoTo('profile')}
            className="w-full p-2.5 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs text-gray-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-rose-400" />
              <span>My Dating Profile</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <button
            onClick={() => handleGoTo('chats')}
            className="w-full p-2.5 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs text-gray-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span>Direct Messages</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </button>

          <button
            onClick={() => {
              onOpenPersonaModal();
              onClose();
            }}
            className="w-full p-2.5 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs text-gray-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Switch Persona</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>

        {/* Log Out CTA */}
        <div className="pt-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center gap-2 text-xs font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out (Logout)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
