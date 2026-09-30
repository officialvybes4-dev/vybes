import React, { useState } from 'react';
import { X, Image as ImageIcon, Mic, Calendar, Download, Eye, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const MediaVaultDrawer = ({ isOpen, onClose, partnerUser }) => {
  const { chats, activeChatUserId, setPreviewImage } = useApp();
  const { theme } = useTheme();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'photos' | 'dates'

  if (!isOpen || !partnerUser) return null;

  const currentChat = chats[activeChatUserId] || { messages: [] };
  
  // Extract all photos sent in this chat, fallback to partner profile gallery
  const sharedPhotos = currentChat.messages
    .filter(m => m.imageUrl)
    .map(m => ({
      id: m.id,
      url: m.imageUrl,
      sender: m.senderId === 'me' ? 'You' : partnerUser.name,
      timestamp: m.timestamp
    }));

  // Fallback to initial sample photos if none sent yet so the vault is populated
  const displayPhotos = sharedPhotos.length > 0 ? sharedPhotos : (partnerUser.photos || [partnerUser.avatar]).map((url, i) => ({
    id: `partner-sample-${i}`,
    url,
    sender: partnerUser.name,
    timestamp: Date.now() - (i + 1) * 3600000 * 8
  }));

  const dateInvites = currentChat.messages.filter(m => m.dateInvite);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l border-white/10 ${theme.cardBg}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Shared Media Vault
              </h3>
              <p className="text-[10px] text-gray-400">With {partnerUser.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All Media ({displayPhotos.length + dateInvites.length})
          </button>
          <button
            onClick={() => setActiveFilter('photos')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'photos'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Photos ({displayPhotos.length})
          </button>
          <button
            onClick={() => setActiveFilter('dates')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === 'dates'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Date Passes ({dateInvites.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Photo Gallery Grid */}
          {(activeFilter === 'all' || activeFilter === 'photos') && (
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                <span>Photos & Moments</span>
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {displayPhotos.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setPreviewImage(item.url)}
                    className="relative group aspect-square rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-slate-900"
                  >
                    <img
                      src={item.url}
                      alt="Shared moment"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Date Passes */}
          {(activeFilter === 'all' || activeFilter === 'dates') && dateInvites.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Scheduled Date Passes</span>
              </h4>
              <div className="space-y-2">
                {dateInvites.map(d => (
                  <div key={d.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{d.dateInvite.activity}</p>
                      <p className="text-[10px] text-gray-400">{d.dateInvite.time} • {d.dateInvite.venue}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Confirmed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
