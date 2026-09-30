import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Phone, 
  Video, 
  MoreVertical, 
  ChevronLeft, 
  Info, 
  ShieldCheck, 
  Smile, 
  Sparkles,
  Paperclip
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { MessageBubble } from './MessageBubble';
import { ImageUploaderModal } from './ImageUploaderModal';

export const ChatRoom = ({ onBackToList }) => {
  const { 
    users, 
    chats, 
    activeChatUserId, 
    sendMessage, 
    markChatAsRead, 
    isTyping, 
    setDetailUser 
  } = useApp();
  const { theme } = useTheme();

  const [inputText, setInputText] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showEmojiBar, setShowEmojiBar] = useState(false);
  const [callAlert, setCallAlert] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const partnerUser = users.find(u => u.id === activeChatUserId);
  const chatData = chats[activeChatUserId] || { messages: [] };

  // Scroll to bottom when new messages appear or partner is typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatData.messages, isTyping[activeChatUserId]]);

  // Clear unread count when opening this chat
  useEffect(() => {
    if (activeChatUserId) {
      markChatAsRead(activeChatUserId);
    }
  }, [activeChatUserId]);

  if (!partnerUser) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-400">
        <p className="text-sm">Select a conversation or start a new chat with anyone!</p>
      </div>
    );
  }

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeChatUserId, { text: inputText.trim() });
    setInputText('');
  };

  const handleSendImage = ({ imageUrl, text }) => {
    sendMessage(activeChatUserId, { imageUrl, text });
  };

  const handleTriggerCall = (type) => {
    setCallAlert(`Starting encrypted ${type} call with ${partnerUser.name}... (Simulated)`);
    setTimeout(() => setCallAlert(null), 3500);
  };

  const quickStarters = [
    "Hey! Loved your photos ✨",
    "What is your favorite coffee spot?",
    "Up for a weekend adventure? 🚗",
    "Sent you a photo! Check it out 📸"
  ];

  return (
    <div className={`flex flex-col h-full rounded-none md:rounded-3xl border md:border-white/10 overflow-hidden relative ${theme.cardBg}`}>
      
      {/* Toast Alert for simulated call */}
      {callAlert && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-slate-900/90 text-white text-xs border border-rose-500/40 shadow-xl backdrop-blur-md animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{callAlert}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between backdrop-blur-md bg-black/20">
        
        <div className="flex items-center gap-3">
          {/* Back button on mobile */}
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="md:hidden p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Partner Avatar & Online badge */}
          <div 
            onClick={() => setDetailUser(partnerUser)}
            className="relative cursor-pointer group"
          >
            <img
              src={partnerUser.avatar}
              alt={partnerUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-rose-400 transition-all"
            />
            {partnerUser.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-black"></span>
            )}
          </div>

          {/* Name & Status */}
          <div 
            onClick={() => setDetailUser(partnerUser)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">
                {partnerUser.name}, {partnerUser.age}
              </h3>
              {partnerUser.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              )}
            </div>
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              {isTyping[activeChatUserId] ? (
                <span className="text-rose-400 font-medium animate-pulse">Typing...</span>
              ) : partnerUser.online ? (
                <span className="text-emerald-400">Online now</span>
              ) : (
                <span>{partnerUser.lastSeen || 'Recently active'}</span>
              )}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleTriggerCall('Voice')}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Audio Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleTriggerCall('Video')}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Video Call"
          >
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDetailUser(partnerUser)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="View Profile"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        
        {/* Encrypted Notice Banner */}
        <div className="text-center py-2">
          <span className="px-3 py-1 rounded-full text-[10px] text-gray-400 bg-white/5 border border-white/5 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-400" />
            <span>Direct instant chat with {partnerUser.name}</span>
          </span>
        </div>

        {/* Empty chat suggestion */}
        {chatData.messages.length === 0 && (
          <div className="text-center py-10 space-y-3">
            <img
              src={partnerUser.avatar}
              alt={partnerUser.name}
              className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-rose-500/40 shadow-lg"
            />
            <h4 className="text-sm font-bold text-white">Say hello to {partnerUser.name}!</h4>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Break the ice! You can send any message or share photos directly.
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              {quickStarters.map((starter, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(activeChatUserId, { text: starter })}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
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
            <div className="px-3 py-2 rounded-2xl bg-white/10 border border-white/10 text-white text-xs flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Emoji Bar (Collapsible) */}
      {showEmojiBar && (
        <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center gap-2 overflow-x-auto">
          {['❤️', '🔥', '😍', '✨', '☕', '🌹', '😂', '👋', '🎉', '🥂', '🍕', '🌸'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setInputText(prev => prev + emoji);
                inputRef.current?.focus();
              }}
              className="text-lg hover:scale-125 transition-transform p-1"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input Action Bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/10 backdrop-blur-md bg-black/30 flex items-center gap-2">
        
        {/* Image Attachment Button ("image send kar sake") */}
        <button
          type="button"
          onClick={() => setIsImageModalOpen(true)}
          className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-rose-400 border border-white/10 hover:border-rose-400/40 transition-all hover:scale-105"
          title="Send Photo (Upload from device or choose presets)"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Emoji Bar Toggle */}
        <button
          type="button"
          onClick={() => setShowEmojiBar(!showEmojiBar)}
          className={`p-2.5 rounded-2xl border transition-all ${
            showEmojiBar 
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
              : 'bg-white/5 hover:bg-white/10 text-gray-400 border-white/10'
          }`}
          title="Emojis"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${partnerUser.name.split(' ')[0]}...`}
          className={`flex-1 px-4 py-2.5 rounded-2xl text-xs sm:text-sm border outline-none transition-all ${theme.inputBg}`}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim()}
          className={`p-2.5 rounded-2xl font-bold flex items-center justify-center transition-all ${
            inputText.trim()
              ? `${theme.buttonClass} hover:scale-105 active:scale-95 text-white`
              : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
          }`}
          title="Send message"
        >
          <Send className="w-5 h-5" />
        </button>

      </form>

      {/* Image Uploader Modal */}
      <ImageUploaderModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSendImage={handleSendImage}
      />

    </div>
  );
};
