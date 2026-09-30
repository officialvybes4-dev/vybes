import React, { useState } from 'react';
import { Check, CheckCheck, Smile, Maximize2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const MessageBubble = ({ message, partnerUser }) => {
  const { addReaction, setPreviewImage } = useApp();
  const { theme } = useTheme();
  const [showReactionMenu, setShowReactionMenu] = useState(false);

  const isMe = message.senderId === 'me';
  const emojis = ['❤️', '🔥', '😍', '😂', '👏'];

  const formatTime = (ts) => {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleToggleReaction = (emoji) => {
    addReaction(partnerUser.id, message.id, emoji);
    setShowReactionMenu(false);
  };

  return (
    <div 
      className={`group relative flex flex-col mb-3 ${isMe ? 'items-end' : 'items-start'}`}
      onMouseLeave={() => setShowReactionMenu(false)}
    >
      <div className={`relative max-w-[82%] sm:max-w-[70%] flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Recipient small avatar if not me */}
        {!isMe && (
          <img
            src={partnerUser.avatar}
            alt={partnerUser.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10 shrink-0 mb-1"
          />
        )}

        {/* Bubble Box */}
        <div
          className={`relative rounded-3xl p-3 sm:p-3.5 transition-all shadow-md ${
            isMe
              ? `${theme.buttonClass} rounded-br-sm text-white`
              : 'bg-white/10 text-white rounded-bl-sm border border-white/10 backdrop-blur-md'
          }`}
        >
          {/* Attached Image if present */}
          {message.imageUrl && (
            <div 
              className="relative rounded-2xl overflow-hidden mb-2 cursor-pointer group/img border border-black/20 max-w-xs"
              onClick={() => setPreviewImage({ url: message.imageUrl, caption: message.text })}
            >
              <img
                src={message.imageUrl}
                alt="Shared attachment"
                className="w-full max-h-64 object-cover rounded-2xl transition-transform duration-200 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>
          )}

          {/* Text Message */}
          {message.text && (
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.text}
            </p>
          )}

          {/* Timestamp & Read Status */}
          <div className={`flex items-center gap-1 mt-1 text-[10px] ${isMe ? 'justify-end text-white/80' : 'text-gray-400'}`}>
            <span>{formatTime(message.timestamp)}</span>
            {isMe && (
              message.status === 'read' ? (
                <CheckCheck className="w-3.5 h-3.5 text-cyan-300 stroke-[2.5]" title="Read" />
              ) : (
                <Check className="w-3.5 h-3.5 text-white/70" title="Delivered" />
              )
            )}
          </div>

          {/* Attached Reaction Tag if present */}
          {message.reaction && (
            <div 
              onClick={() => handleToggleReaction(message.reaction)}
              className={`absolute -bottom-2.5 ${isMe ? 'right-2' : 'left-2'} px-1.5 py-0.2 rounded-full text-xs bg-slate-900 border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform`}
            >
              {message.reaction}
            </div>
          )}
        </div>

        {/* Quick Reaction Button (Appears on Hover) */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity relative self-center">
          <button
            onClick={() => setShowReactionMenu(!showReactionMenu)}
            className="p-1 rounded-full text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            title="React"
          >
            <Smile className="w-4 h-4" />
          </button>

          {/* Floating Reaction Drawer */}
          {showReactionMenu && (
            <div className={`absolute z-30 bottom-8 ${isMe ? 'right-0' : 'left-0'} flex items-center gap-1 p-1 rounded-full bg-slate-950/90 border border-white/20 shadow-xl backdrop-blur-lg animate-fadeIn`}>
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleToggleReaction(emoji)}
                  className="w-7 h-7 flex items-center justify-center text-sm hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
