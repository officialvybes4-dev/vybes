import React, { useState } from 'react';
import { Check, CheckCheck, Smile, Maximize2, Calendar, MapPin, Clock, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { VoiceNotePlayer } from './VoiceNotePlayer';
import { sounds } from '../../lib/soundFx';

export const MessageBubble = ({ message, partnerUser }) => {
  const { addReaction, setPreviewImage, triggerConfetti } = useApp();
  const { theme } = useTheme();
  const [showReactionMenu, setShowReactionMenu] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(message.dateInvite?.status || 'pending');

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

  const handleAcceptDate = () => {
    sounds.playMatchChime();
    setRsvpStatus('accepted');
    triggerConfetti();
  };

  const handleDeclineDate = () => {
    sounds.playPop();
    setRsvpStatus('declined');
  };

  return (
    <div 
      className={`group relative flex flex-col mb-3 ${isMe ? 'items-end' : 'items-start'}`}
      onMouseLeave={() => setShowReactionMenu(false)}
    >
      <div className={`relative max-w-[85%] sm:max-w-[75%] flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        
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
          {/* Attached Voice Note if present */}
          {message.voiceNote && (
            <div className="mb-2">
              <VoiceNotePlayer voiceNote={message.voiceNote} isMe={isMe} />
            </div>
          )}

          {/* Attached Image if present */}
          {message.imageUrl && (
            <div 
              className="relative rounded-2xl overflow-hidden mb-2 cursor-pointer group/img border border-black/20 max-w-xs"
              onClick={() => setPreviewImage(message.imageUrl)}
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

          {/* Interactive Date Invitation Card if present */}
          {message.dateInvite && (
            <div className="mb-2 p-3.5 rounded-2xl bg-gradient-to-br from-rose-950/60 via-slate-900/80 to-black border border-rose-500/40 text-white space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Date RSVP Pass</span>
                </span>
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  rsvpStatus === 'accepted' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : rsvpStatus === 'declined'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {rsvpStatus === 'accepted' ? 'Accepted ✨' : rsvpStatus === 'declined' ? 'Declined' : 'Pending RSVP'}
                </span>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">{message.dateInvite.activity}</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-300 mt-1">
                  <Clock className="w-3 h-3 text-rose-400" />
                  <span>{message.dateInvite.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-300 mt-0.5">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{message.dateInvite.venue}</span>
                </div>
              </div>

              {message.dateInvite.note && (
                <p className="text-[10px] text-gray-300 italic border-t border-white/10 pt-1.5">
                  "{message.dateInvite.note}"
                </p>
              )}

              {/* RSVP Action Buttons for recipient */}
              {rsvpStatus === 'pending' && !isMe && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleAcceptDate}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-md active:scale-95 transition-transform"
                  >
                    Accept with Joy ❤️
                  </button>
                  <button
                    onClick={handleDeclineDate}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-semibold"
                  >
                    Alternate
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Regular Text Message */}
          {message.text && !message.dateInvite && (
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
