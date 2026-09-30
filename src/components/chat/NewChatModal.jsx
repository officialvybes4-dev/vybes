import React, { useState } from 'react';
import { X, Search, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const NewChatModal = ({ isOpen, onClose }) => {
  const { users, startChatWith, currentUser } = useApp();
  const { theme } = useTheme();
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  // Filter users except current user
  const selectableUsers = users.filter(u => u.id !== currentUser.id && (
    !search.trim() || 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.location.toLowerCase().includes(search.toLowerCase()) ||
    u.occupation?.toLowerCase().includes(search.toLowerCase())
  ));

  const handleSelectUser = (userId) => {
    startChatWith(userId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl transition-all ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Direct Chat Directory</h2>
              <p className="text-[11px] text-gray-400">Message anyone directly — no limits!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search any user by name, job, city..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
          />
        </div>

        {/* User List */}
        <div className="mt-4 max-h-80 overflow-y-auto space-y-2 pr-1">
          {selectableUsers.length === 0 ? (
            <p className="text-center py-8 text-xs text-gray-400">No users found.</p>
          ) : (
            selectableUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user.id)}
                className="p-3 rounded-2xl border border-white/10 hover:border-white/30 bg-black/20 hover:bg-white/5 flex items-center justify-between cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-rose-400 transition-all"
                    />
                    {user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-black"></span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      {user.name}, {user.age}
                      {user.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      )}
                    </h4>
                    <p className="text-[10px] text-gray-400 line-clamp-1">{user.occupation || user.location}</p>
                  </div>
                </div>

                <button 
                  className={`p-2 rounded-xl text-xs font-bold text-white ${theme.buttonClass} opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Chat</span>
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
