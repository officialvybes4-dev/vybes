import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MessageSquarePlus, 
  ShieldCheck, 
  Heart, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { NewChatModal } from './NewChatModal';

export const ConversationList = ({ onSelectConversation }) => {
  const { 
    users, 
    chats, 
    activeChatUserId, 
    setActiveChatUserId, 
    matches, 
    startChatWith 
  } = useApp();
  const { theme } = useTheme();

  const [search, setSearch] = useState('');
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  // Matched users list
  const matchedUsers = users.filter(u => matches.includes(u.id));

  // Chat entries sorted by last activity
  const chatEntries = Object.values(chats)
    .sort((a, b) => (b.lastActivity || 0) - (a.lastActivity || 0))
    .map(chat => {
      const partner = users.find(u => u.id === chat.userId);
      const lastMsg = chat.messages[chat.messages.length - 1];
      return {
        ...chat,
        partner,
        lastMsg
      };
    })
    .filter(entry => {
      if (!entry.partner) return false;
      if (!search.trim()) return true;
      return entry.partner.name.toLowerCase().includes(search.toLowerCase());
    });

  const formatChatTime = (ts) => {
    if (!ts) return '';
    const now = Date.now();
    const diff = now - ts;
    if (diff < 1000 * 60 * 60) {
      const mins = Math.max(1, Math.floor(diff / (1000 * 60)));
      return `${mins}m`;
    }
    if (diff < 1000 * 60 * 60 * 24) {
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      return `${hrs}h`;
    }
    return new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const handleSelectChat = (userId) => {
    setActiveChatUserId(userId);
    if (onSelectConversation) {
      onSelectConversation(userId);
    }
  };

  return (
    <div className={`flex flex-col h-full rounded-none md:rounded-3xl border md:border-white/10 overflow-hidden ${theme.cardBg}`}>
      
      {/* Top Header */}
      <div className="p-4 border-b border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Direct Messages</h2>
            <p className="text-[11px] text-gray-400">Open communication without barriers</p>
          </div>

          {/* Start Chat with Anyone Button */}
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className={`p-2.5 rounded-2xl flex items-center gap-1.5 font-bold text-xs ${theme.buttonClass} transition-transform active:scale-95 shadow-md`}
            title="Start Chat with Anyone"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none ${theme.inputBg}`}
          />
        </div>
      </div>

      {/* Horizontal Matches Tray (Stories style) */}
      {matchedUsers.length > 0 && (
        <div className="px-4 py-3 border-b border-white/10 bg-black/20">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>Instant Matches ({matchedUsers.length})</span>
          </p>
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
            {matchedUsers.map((mUser) => (
              <div
                key={mUser.id}
                onClick={() => handleSelectChat(mUser.id)}
                className="flex flex-col items-center gap-1 cursor-pointer group shrink-0"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-rose-500 to-amber-400 group-hover:scale-105 transition-transform shadow-md">
                    <img
                      src={mUser.avatar}
                      alt={mUser.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  {mUser.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-black"></span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-gray-300 max-w-[52px] truncate text-center">
                  {mUser.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
        {chatEntries.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-xs text-gray-400">No active chats found.</p>
            <button
              onClick={() => setIsNewChatModalOpen(true)}
              className={`mt-4 px-4 py-2 rounded-xl text-xs font-semibold ${theme.buttonClass}`}
            >
              Start chatting with someone
            </button>
          </div>
        ) : (
          chatEntries.map((chat) => {
            const isSelected = activeChatUserId === chat.userId;
            const partner = chat.partner;
            const lastMsg = chat.lastMsg;

            return (
              <div
                key={chat.userId}
                onClick={() => handleSelectChat(chat.userId)}
                className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-rose-500/15 border border-rose-500/30 shadow-sm'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                    />
                    {partner.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-black"></span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white truncate">
                        {partner.name}
                      </h4>
                      {partner.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      )}
                    </div>

                    <p className="text-[11px] text-gray-400 truncate mt-0.5 flex items-center gap-1">
                      {lastMsg?.imageUrl && (
                        <span className="flex items-center gap-0.5 text-rose-400 font-medium">
                          <ImageIcon className="w-3 h-3" />
                          <span>Photo</span>
                        </span>
                      )}
                      <span>
                        {lastMsg?.text || (lastMsg?.imageUrl ? '' : 'No messages yet')}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
                  <span className="text-[10px] text-gray-500">
                    {formatChatTime(chat.lastActivity)}
                  </span>
                  {chat.unreadCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full shadow-md shadow-rose-500/40 animate-pulse">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* New Chat Directory Modal */}
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
      />

    </div>
  );
};
