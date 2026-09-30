import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, EyeOff, Send, Clock, Sparkles, Heart, RefreshCw, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

const ICEBREAKERS = [
  "What is your all-time favorite midnight guilty pleasure?",
  "If you had to move to another country tomorrow, where would you go?",
  "Tell me the most spontaneous thing you did in the last 6 months!",
  "What song immediately puts you in a good mood?"
];

export const BlindDateModal = ({ isOpen, onClose }) => {
  const { users, likeUser, triggerConfetti } = useApp();
  const { theme } = useTheme();

  const [partnerIndex, setPartnerIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes
  const [isRevealed, setIsRevealed] = useState(false);

  const messagesEndRef = useRef(null);
  const currentPartner = users[partnerIndex % users.length] || users[0];

  // Reset or initialize date
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 'init',
          sender: 'system',
          text: `🎭 Welcome to Blind Date! You have 3 minutes of mystery chat. Send messages to gradually unblur each other's identity!`
        },
        {
          id: 'partner-1',
          sender: 'partner',
          text: `Hey mystery stranger! Let's see if we have conversational chemistry first ✨`
        }
      ]);
      setSecondsLeft(180);
      setIsRevealed(false);
      sounds.playPop();
    }
  }, [isOpen, partnerIndex]);

  // Live countdown timer
  useEffect(() => {
    let timer;
    if (isOpen && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(s => s - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, secondsLeft]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  // Calculate blur level based on messages sent by user
  const userMessagesCount = messages.filter(m => m.sender === 'user').length;
  let blurAmount = 24;
  let revealPercent = 0;

  if (isRevealed || userMessagesCount >= 4) {
    blurAmount = 0;
    revealPercent = 100;
  } else if (userMessagesCount === 3) {
    blurAmount = 4;
    revealPercent = 75;
  } else if (userMessagesCount === 2) {
    blurAmount = 10;
    revealPercent = 50;
  } else if (userMessagesCount === 1) {
    blurAmount = 16;
    revealPercent = 25;
  }

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    sounds.playMessageSent();
    const userMsg = { id: 'usr-' + Date.now(), sender: 'user', text: inputText.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Check if triggers full reveal
    const newCount = userMessagesCount + 1;
    if (newCount >= 4 && !isRevealed) {
      setIsRevealed(true);
      sounds.playMatchChime();
      triggerConfetti();
    }

    // Simulate partner response
    setTimeout(() => {
      sounds.playMessageReceived();
      const replies = [
        "Haha totally agree! You have great taste 🔥",
        "No way, I literally did the exact same thing last month!",
        "Okay I'm officially intrigued now... can't wait for the reveal!",
        "That's so genuine. Loving this vibe already 😊"
      ];
      const replyMsg = {
        id: 'reply-' + Date.now(),
        sender: 'partner',
        text: replies[Math.floor(Math.random() * replies.length)]
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  const handleNextBlindDate = () => {
    setPartnerIndex(p => p + 1);
  };

  const handleMatchWithPartner = () => {
    likeUser(currentPartner.id);
    triggerConfetti();
    onClose();
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fadeIn p-0 sm:p-4">
      <div 
        className={`w-full max-w-lg h-full sm:h-[720px] sm:rounded-3xl border-0 sm:border border-white/15 overflow-hidden shadow-2xl flex flex-col ${theme.cardBg}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Blind Date 3-Min Mystery 🎭
              </h3>
              <p className="text-[10px] text-gray-400">Conversations before appearances</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5 animate-pulse text-rose-400" />
              <span>{formatTimer(secondsLeft)}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mystery Avatar & Reveal Progress Bar */}
        <div className="p-4 bg-gradient-to-b from-purple-950/30 to-transparent border-b border-white/10 flex flex-col items-center text-center">
          
          <div className="relative mb-2">
            <img
              src={currentPartner.avatar}
              alt="Mystery Match"
              style={{ filter: `blur(${blurAmount}px)` }}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-400/50 transition-all duration-700 shadow-xl"
            />
            {blurAmount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-lg">❓</span>
              </div>
            )}
          </div>

          <h4 className="text-sm font-bold text-white">
            {isRevealed ? `${currentPartner.name}, ${currentPartner.age}` : 'Mystery Soul'}
          </h4>
          <p className="text-[10px] text-purple-300">
            {isRevealed ? currentPartner.location : `Unblur: ${revealPercent}% (${userMessagesCount}/4 messages sent)`}
          </p>

          {/* Unblur Progress Line */}
          <div className="w-48 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-rose-500 transition-all duration-500" 
              style={{ width: `${revealPercent}%` }}
            />
          </div>

        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m => {
            if (m.sender === 'system') {
              return (
                <div key={m.id} className="text-center p-2 rounded-2xl bg-white/5 border border-white/5 text-[11px] text-gray-300">
                  {m.text}
                </div>
              );
            }
            const isMe = m.sender === 'user';
            return (
              <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-2xl text-xs sm:text-sm ${
                  isMe ? `${theme.buttonClass} text-white rounded-br-none` : 'bg-white/10 text-white rounded-bl-none border border-white/10'
                }`}>
                  {m.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Conversation Icebreakers */}
        <div className="px-3 py-1.5 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto bg-black/20">
          {ICEBREAKERS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(q)}
              className="px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
            >
              💡 {q}
            </button>
          ))}
        </div>

        {/* Input Bar or Match Action */}
        {isRevealed ? (
          <div className="p-4 border-t border-white/10 flex items-center gap-3 bg-black/40">
            <button
              onClick={handleNextBlindDate}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-gray-200 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Match</span>
            </button>
            <button
              onClick={handleMatchWithPartner}
              className={`flex-1 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-1.5 ${theme.buttonClass} shadow-lg`}
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Match & Keep Chatting with {currentPartner.name.split(' ')[0]}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex items-center gap-2 bg-black/30">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Send message to reveal mystery identity..."
              className={`flex-1 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm border outline-none ${theme.inputBg}`}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2.5 rounded-2xl text-white font-bold transition-all ${
                inputText.trim() ? `${theme.buttonClass} active:scale-95` : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
