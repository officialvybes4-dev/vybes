import React, { useState } from 'react';
import { X, Flame, Check, Sparkles, Heart, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

const ROUNDS = [
  {
    q: 'The Perfect Weekend Beverage',
    optionA: 'Morning Espresso ☕',
    optionB: 'Midnight Cocktails 🍸',
    partnerChoice: 'A'
  },
  {
    q: 'Dream Vacation Escape',
    optionA: 'Tropical Beach Resort 🏖️',
    optionB: 'Cozy Mountain Cabin 🏔️',
    partnerChoice: 'B'
  },
  {
    q: 'Dinner Date Style',
    optionA: 'Cook Gourmet at Home 🍝',
    optionB: 'Trendy Food Truck Hopping 🌮',
    partnerChoice: 'A'
  },
  {
    q: 'Spontaneity Test',
    optionA: 'Pack at 4 AM & Roadtrip 🚗',
    optionB: 'Detailed Planned Itinerary 🗺️',
    partnerChoice: 'A'
  },
  {
    q: 'Friday Night Energy',
    optionA: 'Sunset Rooftop Chill 🌅',
    optionB: 'Electric Music Gig 🎸',
    partnerChoice: 'B'
  }
];

export const ThisOrThatModal = ({ isOpen, onClose, partnerUser }) => {
  const { startChatWith, sendMessage, triggerConfetti } = useApp();
  const { theme } = useTheme();

  const [currentRound, setCurrentRound] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen || !partnerUser) return null;

  const currentQ = ROUNDS[currentRound];

  const handlePick = (choice) => {
    sounds.playPop();
    const nextChoices = [...userChoices, choice];
    setUserChoices(nextChoices);

    if (currentRound + 1 < ROUNDS.length) {
      setCurrentRound(r => r + 1);
    } else {
      setIsFinished(true);
      sounds.playMatchChime();
      triggerConfetti();
    }
  };

  // Calculate chemistry score
  const matchesCount = userChoices.filter((c, idx) => c === ROUNDS[idx].partnerChoice).length;
  const chemistryPercent = Math.max(60, Math.round((matchesCount / ROUNDS.length) * 100));

  const handleShareToChat = () => {
    sendMessage(partnerUser.id, {
      text: `🎮 We played "This or That" and got a ${chemistryPercent}% Soulmate Chemistry Score! We matched on ${matchesCount}/${ROUNDS.length} lifestyle choices ✨`
    });
    onClose();
    startChatWith(partnerUser.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/15 overflow-hidden shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88vh] ${theme.cardBg}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                This or That: Chemistry Battle ⚔️
              </h3>
              <p className="text-[10px] text-gray-400">See how your tastes compare with {partnerUser.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-center">
          
          {!isFinished ? (
            <div className="space-y-5">
              {/* Round counter */}
              <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
                <span>Round {currentRound + 1} of {ROUNDS.length}</span>
                <span className="text-rose-400 font-bold">{partnerUser.name.split(' ')[0]}'s turn</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${((currentRound + 1) / ROUNDS.length) * 100}%` }}
                />
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white pt-2">
                {currentQ.q}
              </h4>

              {/* Two Dilemma Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handlePick('A')}
                  className="p-5 rounded-3xl bg-gradient-to-tr from-rose-950/40 to-slate-900 border border-rose-500/30 hover:border-rose-400 hover:scale-102 transition-all flex flex-col items-center justify-center gap-2 group shadow-xl"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">✨</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{currentQ.optionA}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePick('B')}
                  className="p-5 rounded-3xl bg-gradient-to-tr from-amber-950/40 to-slate-900 border border-amber-500/30 hover:border-amber-400 hover:scale-102 transition-all flex flex-col items-center justify-center gap-2 group shadow-xl"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🔥</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{currentQ.optionB}</span>
                </button>
              </div>

              <p className="text-[10px] text-gray-400">
                Pick intuitively without overthinking!
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-2xl">
                <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-rose-400">{chemistryPercent}%</span>
                  <span className="text-[8px] uppercase font-bold text-gray-400">Chemistry</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-black text-white">
                  High Chemistry Resonance! 🔥
                </h4>
                <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
                  You and {partnerUser.name.split(' ')[0]} agree on {matchesCount} out of {ROUNDS.length} core lifestyle choices.
                </p>
              </div>

              {/* Answers Comparison */}
              <div className="space-y-2 text-left bg-white/5 p-3.5 rounded-2xl border border-white/10 text-xs">
                {ROUNDS.map((r, i) => {
                  const userC = userChoices[i];
                  const partnerC = r.partnerChoice;
                  const isMatch = userC === partnerC;

                  return (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                      <span className="text-gray-300 truncate max-w-[200px]">{r.q}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isMatch ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {isMatch ? 'Match ✓' : 'Opposite'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleShareToChat}
                className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 ${theme.buttonClass} shadow-lg active:scale-95 transition-transform`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share Chemistry Score in Chat</span>
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
