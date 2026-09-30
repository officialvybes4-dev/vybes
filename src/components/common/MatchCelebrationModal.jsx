import React from 'react';
import { Heart, MessageCircle, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const MatchCelebrationModal = () => {
  const { newMatchUser, setNewMatchUser, currentUser, startChatWith } = useApp();
  const { theme } = useTheme();

  if (!newMatchUser) return null;

  const handleStartChat = () => {
    const targetId = newMatchUser.id;
    setNewMatchUser(null);
    startChatWith(targetId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div 
        className={`w-full max-w-md rounded-3xl p-6 border text-center shadow-2xl relative overflow-hidden ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setNewMatchUser(null)}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating Sparks */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/50 mb-4 animate-bounce">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
          IT'S A MATCH!
        </h2>
        <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
          You and <span className="text-rose-400 font-semibold">{newMatchUser.name}</span> liked each other. The spark is lit!
        </p>

        {/* Dual Avatars with Heart Connection */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="relative group">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-rose-500/60 shadow-xl"
            />
            <span className="absolute bottom-1 right-1 text-xs bg-slate-900 px-2 py-0.5 rounded-full text-gray-300 font-medium border border-white/10">
              You
            </span>
          </div>

          <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center animate-pulse">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          </div>

          <div className="relative group">
            <img
              src={newMatchUser.avatar}
              alt={newMatchUser.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-pink-500/60 shadow-xl"
            />
            <span className="absolute bottom-1 right-1 text-xs bg-slate-900 px-2 py-0.5 rounded-full text-rose-300 font-medium border border-white/10">
              {newMatchUser.name.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleStartChat}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${theme.buttonClass} transition-transform active:scale-95`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Send Direct Message</span>
          </button>

          <button
            onClick={() => setNewMatchUser(null)}
            className="w-full py-3 rounded-2xl font-semibold text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Keep Exploring
          </button>
        </div>

      </div>
    </div>
  );
};
