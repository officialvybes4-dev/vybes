import React, { useState, useEffect } from 'react';
import { X, Rocket, Zap, Clock, Sparkles, TrendingUp, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

export const BoostModal = ({ isOpen, onClose }) => {
  const { triggerConfetti } = useApp();
  const { theme } = useTheme();

  const [isBoostActive, setIsBoostActive] = useState(() => {
    return localStorage.getItem('aura_boost_active') === 'true';
  });
  const [secondsRemaining, setSecondsRemaining] = useState(1800); // 30 minutes

  useEffect(() => {
    let timer;
    if (isBoostActive && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(s => s - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBoostActive, secondsRemaining]);

  if (!isOpen) return null;

  const handleActivateBoost = () => {
    sounds.playSuperLike();
    setIsBoostActive(true);
    localStorage.setItem('aura_boost_active', 'true');
    triggerConfetti();
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-md rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/15 overflow-hidden shadow-2xl flex flex-col ${theme.cardBg}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-md">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                Profile Supercharge Boost ⚡
              </h3>
              <p className="text-[10px] text-gray-400">10x visibility to top singles in your area</p>
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
        <div className="p-6 text-center space-y-4">
          
          {isBoostActive ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center shadow-2xl">
                  <Zap className="w-10 h-10 text-white animate-bounce" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-black text-amber-300">Boost is LIVE! 🔥</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Your card is currently featured as the top profile in the local swipe stack.
                </p>
              </div>

              {/* Timer Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-base font-bold">
                <Clock className="w-4 h-4 animate-spin [animation-duration:4s]" />
                <span>{formatTimer(secondsRemaining)} remaining</span>
              </div>

              {/* Live Simulated Stats */}
              <div className="grid grid-cols-2 gap-2 text-left pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    Profile Impressions
                  </span>
                  <p className="text-sm font-bold text-white mt-1">+142 views</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-400" />
                    Inbound Likes
                  </span>
                  <p className="text-sm font-bold text-white mt-1">+9 new likes</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400/20 to-rose-500/20 border border-amber-400/30 flex items-center justify-center">
                <Rocket className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>

              <div>
                <h4 className="text-base font-bold text-white">Skip the Line for 30 Mins</h4>
                <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
                  Be the very first profile seen by everyone currently swiping in your city.
                </p>
              </div>

              <div className="space-y-2 text-left bg-white/5 p-3.5 rounded-2xl border border-white/10 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">⚡ 10x</span>
                  <span>More profile views than regular browsing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 font-bold">❤️ 3x</span>
                  <span>Higher match rate within the first 10 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">✨ Free</span>
                  <span>Included complimentary with your Aura VIP pass</span>
                </div>
              </div>

              <button
                onClick={handleActivateBoost}
                className="w-full py-3 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Supercharge My Profile (Free)</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
