import React, { useState } from 'react';
import { X, Sparkles, Moon, Sun, Flame, Droplets, Wind, Mountain, Heart, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

const ELEMENT_ICONS = {
  Fire: { icon: Flame, color: 'text-amber-400 bg-amber-500/20 border-amber-500/40' },
  Water: { icon: Droplets, color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40' },
  Air: { icon: Wind, color: 'text-purple-400 bg-purple-500/20 border-purple-500/40' },
  Earth: { icon: Mountain, color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40' },
};

export const ZodiacMatchModal = ({ isOpen, onClose, targetUser }) => {
  const { currentUser, users } = useApp();
  const { theme } = useTheme();

  const [selectedUser, setSelectedUser] = useState(targetUser || users[0]);

  if (!isOpen) return null;

  const partner = selectedUser || targetUser || users[0];
  const userZodiac = currentUser?.zodiac || 'Leo ♌';
  const partnerZodiac = partner?.zodiac || 'Scorpio ♏';
  const partnerElement = partner?.element?.split(' ')[0] || 'Water';

  // Deterministic astrological synastry calculation based on sign strings
  const hash = (userZodiac + partnerZodiac).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const synastryScore = 80 + (hash % 19); // 80% to 98%
  const passionScore = 75 + ((hash * 3) % 24);
  const emotionalScore = 78 + ((hash * 7) % 21);
  const banterScore = 82 + ((hash * 11) % 17);

  const getVerdict = () => {
    if (synastryScore >= 92) {
      return "Cosmic Soulmates! The planetary alignment shows intense magnetic chemistry, magnetic banter, and rare natural understanding.";
    } else if (synastryScore >= 85) {
      return "Electric Sparks! Opposites attract with intoxicating friction. Keep things playful and expect deep conversations under the stars.";
    }
    return "Harmonious Vibe! Grounded connection with gentle warmth. A cozy coffee shop or quiet scenic viewpoint will bring out the best in both of you.";
  };

  const ElementIcon = ELEMENT_ICONS[partnerElement]?.icon || Flame;
  const elementStyles = ELEMENT_ICONS[partnerElement]?.color || 'text-rose-400 bg-rose-500/20 border-rose-500/40';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/15 overflow-hidden shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88vh] ${theme.cardBg}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                Cosmic Synastry Radar ✨
              </h3>
              <p className="text-[10px] text-gray-400">Astrology & Elemental Chemistry Matcher</p>
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
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Celestial Pair Orbs */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-b from-purple-950/40 via-slate-900/60 to-black/80 border border-purple-500/30 flex items-center justify-between text-center overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* User Orb */}
            <div className="flex flex-col items-center z-10 w-28">
              <img
                src={currentUser?.avatar}
                alt="You"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-400 shadow-xl"
              />
              <span className="text-xs font-bold text-white mt-1.5 truncate w-full">You</span>
              <span className="text-[10px] text-purple-300 font-semibold">{userZodiac}</span>
            </div>

            {/* Score Center Ring */}
            <div className="flex flex-col items-center justify-center z-10">
              <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-xl shadow-rose-500/30 animate-pulse">
                <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center">
                  <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
                    {synastryScore}%
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold">Synastry</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-300 mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Cosmic Alignment
              </span>
            </div>

            {/* Partner Orb */}
            <div className="flex flex-col items-center z-10 w-28">
              <img
                src={partner.avatar}
                alt={partner.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-pink-400 shadow-xl"
              />
              <span className="text-xs font-bold text-white mt-1.5 truncate w-full">{partner.name.split(' ')[0]}</span>
              <span className="text-[10px] text-pink-300 font-semibold">{partnerZodiac}</span>
            </div>
          </div>

          {/* Elemental Resonance Badge */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl border ${elementStyles}`}>
                <ElementIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Dominant Element: {partnerElement}</p>
                <p className="text-[10px] text-gray-400">Fluid intuition meets grounded creativity</p>
              </div>
            </div>
            <span className="text-xs font-black text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              High Resonance
            </span>
          </div>

          {/* Dimensional Breakdown Progress Bars */}
          <div className="space-y-2.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              Synastry Dimensions
            </h4>
            
            {/* Passion */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                <span>🔥 Passion & Chemistry</span>
                <span className="text-amber-400">{passionScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" style={{ width: `${passionScore}%` }} />
              </div>
            </div>

            {/* Banter */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                <span>⚡ Banter & Intellectual Flow</span>
                <span className="text-purple-400">{banterScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${banterScore}%` }} />
              </div>
            </div>

            {/* Emotional Depth */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                <span>🌊 Emotional Harmony</span>
                <span className="text-cyan-400">{emotionalScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${emotionalScore}%` }} />
              </div>
            </div>
          </div>

          {/* Astrologer's Verdict */}
          <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5 mb-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              The Cosmic Verdict
            </h4>
            <p className="text-xs text-gray-200 leading-relaxed italic">
              "{getVerdict()}"
            </p>
          </div>

          {/* Lucky Date Idea */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <span className="text-xl">🪐</span>
            <div>
              <p className="text-xs font-bold text-white">Ideal First Encounter</p>
              <p className="text-[10px] text-gray-400">A rooftop cocktail lounge or indie art gallery exhibition</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
