import React, { useState } from 'react';
import { Sparkles, X, Copy, Check, Wand2, Send, Flame, Heart, Brain, Smile } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

export const AiWingmanModal = ({ isOpen, onClose, partnerUser, onSelectLine }) => {
  const { theme } = useTheme();
  const [selectedStyle, setSelectedStyle] = useState('witty');
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen || !partnerUser) return null;

  const name = partnerUser.name.split(' ')[0];
  const interest = partnerUser.interests?.[0] || 'Coffee';
  const secondInterest = partnerUser.interests?.[1] || 'Music';

  const lineGenerators = {
    witty: [
      `Quick debate: Is pineapple on pizza a crime, or are you ready to defend it over ${interest.toLowerCase()}? 🍕☕`,
      `On a scale of 1 to "planning our second date already", how spontaneous are you this weekend? ✨`,
      `My algorithm said we have a 96% match, but I am here to verify if you can match my banter. 😏🔥`,
      `Are you always this aesthetic, or did you just curate your profile to make my heart skip a beat? 🌸`
    ],
    romantic: [
      `I saw you love ${secondInterest.toLowerCase()} and ${interest.toLowerCase()}. That sounds like the soundtrack to a perfect sunset. 🌅✨`,
      `If you could freeze one Sunday morning in time with warm coffee and acoustic music, what would it look like? ☕🌸`,
      `Your smile has such genuine warmth. I had to stop scrolling and say hello. ❤️`,
      `Life is made of little serendipities, and finding your profile tonight definitely feels like one. 💫`
    ],
    playful: [
      `Two truths and a lie: You make the best coffee in the city, you secretly love cheesy romcoms, and you are about to reply to me. 😉`,
      `Do not judge me if I bring an entire dog treats pouch on our first meetup if you have a pet! 🐶🐾`,
      `I am officially applying to be your partner in crime for weekend cafe hopping. Here are my credentials! 🥐☕`,
      `Warning: I have a playlist for every mood and a strong opinion on where to get the crispiest croissants. 🥐🔥`
    ],
    intellectual: [
      `Your bio mentioned you love ${interest.toLowerCase()}. What is the most mind-bending idea or story you have encountered lately? 🧠📖`,
      `If we were stranded in an independent bookstore for 3 hours, which section would you pull me toward first? 📚✨`,
      `What is an opinion you hold strongly that most people completely disagree with? 💭`,
      `Curiosity check: What is something you are passionately learning or creating right now? 🎨💡`
    ]
  };

  const currentLines = lineGenerators[selectedStyle] || lineGenerators.witty;

  const handleUseLine = (line, idx) => {
    sounds.playMessageSent();
    onSelectLine(line);
    setCopiedIndex(idx);
    setTimeout(() => {
      setCopiedIndex(null);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl border-t sm:border shadow-2xl p-5 sm:p-6 max-h-[90dvh] overflow-y-auto relative ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-500 to-rose-500 text-white shadow-md">
              <Wand2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>AI Rizz Wingman</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  GPT-4o Tailored
                </span>
              </h3>
              <p className="text-[11px] text-gray-400">Tailored icebreakers for {partnerUser.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Style Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 my-3.5 p-1 rounded-2xl bg-black/40 border border-white/10">
          {[
            { id: 'witty', label: 'Witty', icon: Flame },
            { id: 'romantic', label: 'Sweet', icon: Heart },
            { id: 'playful', label: 'Playful', icon: Smile },
            { id: 'intellectual', label: 'Deep', icon: Brain },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = selectedStyle === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playPop();
                  setSelectedStyle(item.id);
                }}
                className={`py-2 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-all ${
                  isSelected ? `${theme.buttonClass} shadow-md scale-105` : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Generated Lines */}
        <div className="space-y-2.5 my-2">
          {currentLines.map((line, idx) => (
            <div
              key={idx}
              onClick={() => handleUseLine(line, idx)}
              className="p-3 sm:p-3.5 rounded-2xl border border-white/10 hover:border-rose-400/50 bg-white/5 hover:bg-white/10 cursor-pointer transition-all group flex items-start justify-between gap-3 active:scale-98"
            >
              <p className="text-xs text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                "{line}"
              </p>
              <button
                type="button"
                className="shrink-0 p-1.5 rounded-xl bg-white/5 group-hover:bg-rose-500 text-gray-400 group-hover:text-white transition-all shadow-sm"
                title="Send this line"
              >
                {copiedIndex === idx ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-center text-gray-400 mt-3">
          💡 Tap any icebreaker to insert directly into chat input with {name}!
        </p>

      </div>
    </div>
  );
};
