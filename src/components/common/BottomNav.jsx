import React from 'react';
import { Compass, MessageCircle, Heart, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab, totalUnreadCount, matches } = useApp();
  const { theme } = useTheme();

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
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t ${theme.navBg} backdrop-blur-xl transition-colors duration-300`}>
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center gap-1 transition-all duration-200"
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-all duration-200 ${
                    isActive ? `${theme.accentText} scale-110` : 'text-gray-400'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-medium transition-colors ${
                  isActive ? theme.accentText : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-1 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
