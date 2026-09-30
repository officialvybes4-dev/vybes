import React, { useState } from 'react';
import { X, Sparkles, Moon, Sun, Heart, Flame, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

const TAROT_DECK = [
  {
    id: 'lovers',
    name: 'The Lovers (VI)',
    symbol: '💑',
    title: 'Divine Soul Connection',
    meaning: 'Unmistakable magnetic synergy. Your next conversation has high potential to spark something truly lasting.',
    luckyHour: '9:30 PM Tonight',
    element: 'Air ♊',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'star',
    name: 'The Star (XVII)',
    symbol: '⭐',
    title: 'Pure Serendipity & Hope',
    meaning: 'An unexpected connection will surprise you today. Keep your heart open to someone with different hobbies.',
    luckyHour: '7:15 PM Evening',
    element: 'Air ♒',
    color: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'cups',
    name: 'Two of Cups (II)',
    symbol: '🥂',
    title: 'Mutual Chemistry & Warmth',
    meaning: 'Equal balance of give and take. You will receive an enthusiastic prompt reply from someone you like.',
    luckyHour: '4:00 PM Coffee Time',
    element: 'Water ♋',
    color: 'from-cyan-400 to-blue-600'
  },
  {
    id: 'sun',
    name: 'The Sun (XIX)',
    symbol: '☀️',
    title: 'Radiant Joy & Spontaneity',
    meaning: 'Confidence is at your peak. Today is the perfect day to send that bold first message or suggest a spontaneous date.',
    luckyHour: '12:45 PM Lunch Break',
    element: 'Fire ♌',
    color: 'from-orange-400 to-red-500'
  }
];

export const LoveTarotModal = ({ isOpen, onClose }) => {
  const { triggerConfetti } = useApp();
  const { theme } = useTheme();

  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

  if (!isOpen) return null;

  const handlePickCard = (card) => {
    if (selectedCard) return;
    setIsFlipping(true);
    sounds.playPop();

    setTimeout(() => {
      setSelectedCard(card);
      setIsFlipping(false);
      sounds.playMatchChime();
      triggerConfetti();
    }, 600);
  };

  const handleReset = () => {
    setSelectedCard(null);
    sounds.playPop();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/15 overflow-hidden shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88vh] ${theme.cardBg}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                Daily Love Tarot & Cupid Fortune 🔮
              </h3>
              <p className="text-[10px] text-gray-400">Draw 1 card to reveal today's romance destiny</p>
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
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-center">
          
          {!selectedCard ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-300">
                Focus on what you desire in a partner, then tap one card from the deck:
              </p>

              {/* 3 Face Down Cards */}
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto pt-2">
                {[0, 1, 2].map(idx => {
                  const card = TAROT_DECK[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => handlePickCard(card)}
                      className={`aspect-[2/3] rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-purple-950 via-slate-900 to-black p-2 flex flex-col items-center justify-center cursor-pointer shadow-xl hover:scale-105 hover:border-amber-400 transition-all group ${
                        isFlipping ? 'animate-pulse' : ''
                      }`}
                    >
                      <div className="w-full h-full rounded-xl border border-amber-500/20 flex flex-col items-center justify-center relative overflow-hidden">
                        <Moon className="w-6 h-6 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
                        <span className="text-[8px] font-black tracking-widest text-amber-300 uppercase mt-2">
                          AURA
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Revealed Card */}
              <div className="w-48 aspect-[2/3] mx-auto rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-slate-900 to-black p-3.5 shadow-2xl flex flex-col items-center justify-between relative overflow-hidden">
                <div className="w-full text-left">
                  <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider">
                    {selectedCard.name}
                  </span>
                </div>

                <div className="text-5xl my-auto animate-bounce">
                  {selectedCard.symbol}
                </div>

                <div className="w-full text-center">
                  <h4 className="text-xs font-black text-white">{selectedCard.title}</h4>
                  <p className="text-[9px] text-amber-300 mt-0.5">{selectedCard.element}</p>
                </div>
              </div>

              {/* Interpretation Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2">
                <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Oracle Interpretation</span>
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed">
                  {selectedCard.meaning}
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
                  <span className="text-gray-400">Peak Romantic Hour:</span>
                  <span className="font-bold text-emerald-400">{selectedCard.luckyHour}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Draw Another Card</span>
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
