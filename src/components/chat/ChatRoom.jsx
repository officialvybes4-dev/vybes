import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Phone, 
  Video, 
  ChevronLeft, 
  Info, 
  ShieldCheck, 
  Smile, 
  Sparkles,
  Calendar,
  Mic,
  FolderHeart,
  Wand2,
  Flame,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { MessageBubble } from './MessageBubble';
import { ImageUploaderModal } from './ImageUploaderModal';
import { AiWingmanModal } from './AiWingmanModal';
import { DatePlannerModal } from './DatePlannerModal';
import { CallModal } from './CallModal';
import { MediaVaultDrawer } from './MediaVaultDrawer';
import { sounds } from '../../lib/soundFx';

export const ChatRoom = ({ onBackToList }) => {
  const { 
    users, 
    chats, 
    activeChatUserId, 
    sendMessage, 
    markChatAsRead, 
    isTyping, 
    setDetailUser,
    triggerConfetti
  } = useApp();
  const { theme } = useTheme();

  const [inputText, setInputText] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isWingmanOpen, setIsWingmanOpen] = useState(false);
  const [isDatePlannerOpen, setIsDatePlannerOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [callType, setCallType] = useState('Video');
  const [isMediaVaultOpen, setIsMediaVaultOpen] = useState(false);
  const [showEmojiBar, setShowEmojiBar] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const partnerUser = users.find(u => u.id === activeChatUserId);
  const chatData = chats[activeChatUserId] || { messages: [] };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatData.messages, isTyping[activeChatUserId]]);

  useEffect(() => {
    if (activeChatUserId) {
      markChatAsRead(activeChatUserId);
    }
  }, [activeChatUserId]);

  if (!partnerUser) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-400">
        <p className="text-xs sm:text-sm">Select a conversation or start a new chat with anyone!</p>
      </div>
    );
  }

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sounds.playMessageSent();
    sendMessage(activeChatUserId, { text: inputText.trim() });
    setInputText('');
  };

  const handleSendImage = ({ imageUrl, text }) => {
    sounds.playMessageSent();
    sendMessage(activeChatUserId, { imageUrl, text });
  };

  const handleSendVoiceNote = () => {
    sounds.playPop();
    const mockNote = partnerUser.voiceNote || {
      duration: '0:12',
      caption: 'Quick audio message for you! 🎙️✨',
      waveform: [40, 75, 90, 50, 80, 100, 65, 85, 45, 70, 95, 55, 30]
    };
    sendMessage(activeChatUserId, {
      text: '🎙️ Voice message',
      voiceNote: mockNote
    });
  };

  const handleTriggerCall = (type) => {
    setCallType(type);
    setIsCallOpen(true);
  };

  const handleTriggerFloatingEmoji = (emoji) => {
    sounds.playPop();
    const id = Date.now() + Math.random();
    setFloatingEmojis(prev => [...prev, { id, emoji, left: 15 + Math.random() * 70 }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(item => item.id !== id));
    }, 2000);
  };

  const quickStarters = [
    "Hey! Loved your photos ✨",
    "What is your favorite coffee spot?",
    "Up for a weekend adventure? 🚗",
    "Sent you a photo! Check it out 📸"
  ];

  return (
    <div className={`flex flex-col h-full rounded-none md:rounded-3xl border-0 md:border md:border-white/10 overflow-hidden relative ${theme.cardBg}`}>
      
      {/* Floating Emojis Animation Layer */}
      <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
        {floatingEmojis.map(item => (
          <div
            key={item.id}
            style={{ left: `${item.left}%` }}
            className="absolute bottom-16 text-3xl animate-[floatUp_2s_ease-out_forwards]"
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Top Sticky Header */}
      <div className="px-3 py-2 sm:px-4 sm:py-3 border-b border-white/10 flex items-center justify-between backdrop-blur-md bg-black/30 shrink-0">
        
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="md:hidden p-1 -ml-1 rounded-full text-gray-400 hover:text-white transition-colors"
              title="Back to conversations"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div 
            onClick={() => setDetailUser(partnerUser)}
            className="relative cursor-pointer shrink-0"
          >
            <img
              src={partnerUser.avatar}
              alt={partnerUser.name}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-white/10 hover:ring-rose-400 transition-all"
            />
            {partnerUser.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-black"></span>
            )}
          </div>

          <div 
            onClick={() => setDetailUser(partnerUser)}
            className="cursor-pointer min-w-0"
          >
            <div className="flex items-center gap-1">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                {partnerUser.name}, {partnerUser.age}
              </h3>
              {partnerUser.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              )}
            </div>
            <p className="text-[10px] text-gray-400 flex items-center gap-1.5 truncate">
              {isTyping[activeChatUserId] ? (
                <span className="text-rose-400 font-medium animate-pulse">Typing...</span>
              ) : partnerUser.online ? (
                <span className="text-emerald-400">Online now</span>
              ) : (
                <span>{partnerUser.lastSeen || 'Recently active'}</span>
              )}
              {partnerUser.responseTime && (
                <span className="text-amber-400 font-semibold">• {partnerUser.responseTime}</span>
              )}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          {/* Plan Date Pass Button */}
          <button
            onClick={() => setIsDatePlannerOpen(true)}
            className="p-1.5 sm:p-2 rounded-full text-rose-400 hover:text-rose-300 hover:bg-white/10 transition-colors"
            title="Plan a Date Ticket"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Media Vault Drawer Toggle */}
          <button
            onClick={() => setIsMediaVaultOpen(true)}
            className="p-1.5 sm:p-2 rounded-full text-purple-400 hover:text-purple-300 hover:bg-white/10 transition-colors"
            title="Shared Media Vault"
          >
            <FolderHeart className="w-4 h-4" />
          </button>

          {/* Audio Call */}
          <button
            onClick={() => handleTriggerCall('Voice')}
            className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Audio Call"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* Video Call */}
          <button
            onClick={() => handleTriggerCall('Video')}
            className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Video Call"
          >
            <Video className="w-4 h-4" />
          </button>

          {/* Profile Info */}
          <button
            onClick={() => setDetailUser(partnerUser)}
            className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="View Full Profile"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-3 py-3 sm:p-4 space-y-1">
        
        {/* Notice Banner */}
        <div className="text-center py-1 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] text-gray-400 bg-white/5 border border-white/5 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-400" />
            <span>Encrypted Direct Chat with {partnerUser.name.split(' ')[0]}</span>
          </span>
        </div>

        {/* Empty chat suggestion */}
        {chatData.messages.length === 0 && (
          <div className="text-center py-6 sm:py-10 space-y-2">
            <img
              src={partnerUser.avatar}
              alt={partnerUser.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto object-cover ring-2 ring-rose-500/40 shadow-lg"
            />
            <h4 className="text-xs sm:text-sm font-bold text-white">Say hello to {partnerUser.name}!</h4>
            <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
              Break the ice! Send any message, voice note, or plan a date pass.
            </p>
            <div className="flex flex-wrap justify-center gap-1 pt-1">
              {quickStarters.map((starter, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(activeChatUserId, { text: starter })}
                  className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Render all messages */}
        {chatData.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            partnerUser={partnerUser}
          />
        ))}

        {/* Typing indicator bubble */}
        {isTyping[activeChatUserId] && (
          <div className="flex items-center gap-2 mb-2">
            <img
              src={partnerUser.avatar}
              alt={partnerUser.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10"
            />
            <div className="px-3 py-1.5 rounded-2xl bg-white/10 border border-white/10 text-white text-xs flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Reaction Quick Bar */}
      <div className="px-3 py-1 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs">
        <span className="text-[10px] text-gray-400 font-semibold">Quick Vibe:</span>
        <div className="flex items-center gap-3">
          {['❤️', '🔥', '✨', '🥂', '🌹', '🫣'].map(emoji => (
            <button
              key={emoji}
              onClick={() => handleTriggerFloatingEmoji(emoji)}
              className="text-sm hover:scale-130 transition-transform active:scale-95"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Emoji Bar (Collapsible) */}
      {showEmojiBar && (
        <div className="px-3 py-1.5 border-t border-white/10 bg-black/60 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {['❤️', '🔥', '😍', '✨', '☕', '🌹', '😂', '👋', '🎉', '🥂', '🍕', '🌸', '🚀', '💯'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setInputText(prev => prev + emoji);
                inputRef.current?.focus();
              }}
              className="text-base sm:text-lg hover:scale-125 transition-transform p-0.5"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input Action Bar */}
      <form 
        onSubmit={handleSend} 
        className="p-2 sm:p-3 border-t border-white/10 backdrop-blur-md bg-black/30 flex items-center gap-1.5 sm:gap-2 shrink-0 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        {/* AI Wingman / Rizz Button */}
        <button
          type="button"
          onClick={() => setIsWingmanOpen(true)}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-pink-300 border border-purple-500/30 transition-transform active:scale-90 shrink-0"
          title="AI Dating Wingman & Icebreakers"
        >
          <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-pulse" />
        </button>

        {/* Image Attachment Button */}
        <button
          type="button"
          onClick={() => setIsImageModalOpen(true)}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 text-rose-400 border border-white/10 transition-transform active:scale-90 shrink-0"
          title="Send Photo"
        >
          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Voice Note Quick Clip Button */}
        <button
          type="button"
          onClick={handleSendVoiceNote}
          className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 text-emerald-400 border border-white/10 transition-transform active:scale-90 shrink-0"
          title="Send Voice Note"
        >
          <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Emoji Bar Toggle */}
        <button
          type="button"
          onClick={() => setShowEmojiBar(!showEmojiBar)}
          className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all shrink-0 ${
            showEmojiBar 
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
              : 'bg-white/5 text-gray-400 border-white/10'
          }`}
          title="Emojis"
        >
          <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${partnerUser.name.split(' ')[0]}...`}
          className={`flex-1 px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm border outline-none transition-all ${theme.inputBg}`}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim()}
          className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center transition-all shrink-0 ${
            inputText.trim()
              ? `${theme.buttonClass} active:scale-90 text-white shadow-md`
              : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
          }`}
          title="Send"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>

      {/* Image Uploader Modal */}
      <ImageUploaderModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSendImage={handleSendImage}
      />

      {/* AI Wingman Modal */}
      <AiWingmanModal
        isOpen={isWingmanOpen}
        onClose={() => setIsWingmanOpen(false)}
        partnerUser={partnerUser}
        onSelectLine={(line) => {
          setInputText(line);
          inputRef.current?.focus();
        }}
      />

      {/* Date Planner Modal */}
      <DatePlannerModal
        isOpen={isDatePlannerOpen}
        onClose={() => setIsDatePlannerOpen(false)}
        partnerUser={partnerUser}
      />

      {/* Encrypted Audio/Video Call Modal */}
      <CallModal
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        partnerUser={partnerUser}
        callType={callType}
      />

      {/* Media Vault Drawer */}
      <MediaVaultDrawer
        isOpen={isMediaVaultOpen}
        onClose={() => setIsMediaVaultOpen(false)}
        partnerUser={partnerUser}
      />

    </div>
  );
};
