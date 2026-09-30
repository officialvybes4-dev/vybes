import React from 'react';
import { Compass, MessageCircle, Heart, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const BottomNav = ({ isHidden }) => {
  const { activeTab, setActiveTab, totalUnreadCount, matches } = useApp();
  const { theme } = useTheme();

  if (isHidden) return null;

  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { 
      id: 'chats', 
      label: 'Chat', 
      icon: MessageCircle, 
      badge: totalUnreadCount > 0 ? totalUnreadCount : null 
    },
    { 
      id: 'likes', 
      label: 'Matches', 
      icon: Heart, 
      badge: matches.length > 0 ? matches.length : null 
    },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t ${theme.navBg} backdrop-blur-2xl transition-all duration-300 pb-[env(safe-area-inset-bottom)]`}>
      <div className="grid grid-cols-4 h-14 max-w-md mx-auto items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center py-1 transition-all active:scale-90"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive ? `${theme.accentText} scale-110 stroke-[2.5]` : 'text-gray-400 stroke-[1.8]'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-rose-500 text-white text-[9px] font-black rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight font-medium transition-colors ${
                  isActive ? `${theme.accentText} font-bold` : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 w-4 h-0.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
