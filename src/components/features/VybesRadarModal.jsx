import React, { useState } from 'react';
import { X, Radar, Compass, MapPin, Sparkles, MessageCircle, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

export const VybesRadarModal = ({ isOpen, onClose }) => {
  const { users, startChatWith, setDetailUser } = useApp();
  const { theme } = useTheme();

  const [maxDistance, setMaxDistance] = useState(10); // in km
  const [selectedBlip, setSelectedBlip] = useState(null);

  if (!isOpen) return null;

  // Filter users within maxDistance
  const nearbyUsers = users.filter(u => {
    const dist = u.radarDistance || 3.5;
    return dist <= maxDistance;
  });

  const handleSelectBlip = (u) => {
    sounds.playPop();
    setSelectedBlip(u);
  };

  const handleChat = (u) => {
    onClose();
    startChatWith(u.id);
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
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Radar className="w-4 h-4 animate-spin [animation-duration:6s]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                Vybes Live Proximity Radar 📡
              </h3>
              <p className="text-[10px] text-gray-400">Discover singles walking near you in real-time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Range Slider Control */}
        <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-white/5">
          <span className="text-xs font-semibold text-gray-300">
            Search Radius: <span className="text-emerald-400 font-bold">{maxDistance} km</span>
          </span>
          <input
            type="range"
            min="2"
            max="20"
            value={maxDistance}
            onChange={e => setMaxDistance(Number(e.target.value))}
            className="w-36 accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Radar Viewport */}
        <div className="p-4 sm:p-6 flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-950 via-zinc-950 to-black overflow-hidden">
          
          {/* Circular Radar Screen */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_50px_rgba(16,185,129,0.15)] flex items-center justify-center overflow-hidden">
            
            {/* Concentric Distance Rings */}
            <div className="absolute inset-8 rounded-full border border-emerald-500/25 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-emerald-500/20 pointer-events-none" />
            <div className="absolute inset-24 rounded-full border border-emerald-500/15 pointer-events-none" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-500/20 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-emerald-500/20 pointer-events-none" />

            {/* Sweeping Beam */}
            <div 
              className="absolute inset-0 origin-center rounded-full pointer-events-none animate-[spin_3s_linear_infinite]"
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.45) 0deg, rgba(16, 185, 129, 0) 65deg, transparent 360deg)'
              }}
            />

            {/* User Center Dot */}
            <div className="relative z-20 w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-emerald-500/30 shadow-lg shadow-emerald-400">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-emerald-300 uppercase tracking-wider">You</span>
            </div>

            {/* User Radar Blips */}
            {nearbyUsers.map((u, idx) => {
              // Derive deterministic X & Y position within circular radar bounds
              const coords = u.radarCoords || {
                x: 20 + ((idx * 37) % 60),
                y: 20 + ((idx * 53) % 60)
              };

              const isSelected = selectedBlip?.id === u.id;

              return (
                <button
                  key={u.id}
                  onClick={() => handleSelectBlip(u)}
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                  className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all group ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                  }`}
                  title={`${u.name} (${u.radarDistance || 2.4} km)`}
                >
                  <div className="relative">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 shadow-lg ${
                        isSelected 
                          ? 'ring-rose-500 scale-110 shadow-rose-500/50' 
                          : 'ring-emerald-400 shadow-emerald-500/40'
                      }`}
                    />
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-black" />
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Found {nearbyUsers.length} active profiles within {maxDistance} km</span>
          </p>

        </div>

        {/* Selected Profile Card Drawer */}
        {selectedBlip ? (
          <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={selectedBlip.avatar}
                alt={selectedBlip.name}
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-400/50 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">{selectedBlip.name}, {selectedBlip.age}</h4>
                  <span className="text-[10px] font-bold text-emerald-400">{selectedBlip.radarDistance || 2.4} km</span>
                </div>
                <p className="text-[10px] text-gray-300 line-clamp-1">{selectedBlip.bio}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setDetailUser(selectedBlip)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white"
              >
                Profile
              </button>
              <button
                onClick={() => handleChat(selectedBlip)}
                className={`px-3 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1 ${theme.buttonClass} shadow-md`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 text-center border-t border-white/10 text-[11px] text-gray-400">
            Tap on any glowing profile blip on the radar to inspect or message!
          </div>
        )}

      </div>
    </div>
  );
};
