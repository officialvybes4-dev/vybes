import React, { useState } from 'react';
import { X, Plane, Globe, MapPin, Check, Sparkles, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

const GLOBAL_DESTINATIONS = [
  { id: 'mumbai', city: 'Mumbai', country: 'India', flag: '🇮🇳', vibe: 'Marine Drive & Monsoon Romance', coords: '18.9220° N, 72.8347° E' },
  { id: 'paris', city: 'Paris', country: 'France', flag: '🇫🇷', vibe: 'The City of Love & Croissants', coords: '48.8566° N, 2.3522° E' },
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', flag: '🇯🇵', vibe: 'Neon Nightlife & Cozy Izakayas', coords: '35.6762° N, 139.6503° E' },
  { id: 'bali', city: 'Bali', country: 'Indonesia', flag: '🇮🇩', vibe: 'Tropical Sunsets & Beach Clubs', coords: '8.4095° S, 115.1889° E' },
  { id: 'nyc', city: 'New York', country: 'USA', flag: '🇺🇸', vibe: 'Manhattan Skylines & Rooftop Bars', coords: '40.7128° N, 74.0060° W' },
  { id: 'london', city: 'London', country: 'United Kingdom', flag: '🇬🇧', vibe: 'Historic Pubs & Autumn Romance', coords: '51.5074° N, 0.1278° W' },
  { id: 'dubai', city: 'Dubai', country: 'UAE', flag: '🇦🇪', vibe: 'Luxury Lounges & Desert Stargazing', coords: '25.2048° N, 55.2708° E' },
  { id: 'seoul', city: 'Seoul', country: 'South Korea', flag: '🇰🇷', vibe: 'K-Drama Cafes & River Banpo Night Lights', coords: '37.5665° N, 126.9780° E' }
];

export const PassportModal = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, triggerConfetti } = useApp();
  const { theme } = useTheme();

  const [selectedCity, setSelectedCity] = useState(GLOBAL_DESTINATIONS[0]);
  const [isTeleporting, setIsTeleporting] = useState(false);

  if (!isOpen) return null;

  const handleTeleport = (dest) => {
    setSelectedCity(dest);
    setIsTeleporting(true);
    sounds.playRewind();

    setTimeout(() => {
      setIsTeleporting(false);
      updateUserProfile({ location: `${dest.city}, ${dest.country} (Passport ✈️)` });
      sounds.playSuccess();
      triggerConfetti();
      onClose();
    }, 1200);
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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              <Plane className="w-4 h-4 transform -rotate-45" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                Passport Global Teleport 🌍
              </h3>
              <p className="text-[10px] text-gray-400">Change your GPS and match with singles worldwide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Location Banner */}
        <div className="p-4 bg-cyan-950/30 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-gray-300">
              Current Base: <strong className="text-white">{currentUser?.location || 'Mumbai, India'}</strong>
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
            Active GPS
          </span>
        </div>

        {/* City Destination Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            Select Romance Destination
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {GLOBAL_DESTINATIONS.map(dest => {
              const isCurrent = currentUser?.location?.toLowerCase().includes(dest.city.toLowerCase());

              return (
                <div
                  key={dest.id}
                  onClick={() => handleTeleport(dest)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 text-left flex flex-col justify-between group ${
                    isCurrent
                      ? 'bg-cyan-500/20 border-cyan-500/60 ring-1 ring-cyan-400/50 shadow-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{dest.flag}</span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {dest.city}
                        </h4>
                        <p className="text-[10px] text-gray-400">{dest.country}</p>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="p-1 rounded-full bg-cyan-500 text-slate-950">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] text-gray-300 mt-2 italic line-clamp-1">
                    "{dest.vibe}"
                  </p>
                </div>
              );
            })}
          </div>

          {/* Teleporting Animation Overlay */}
          {isTeleporting && (
            <div className="p-4 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-center animate-pulse">
              <p className="text-xs font-bold text-cyan-300">
                ✈️ Teleporting GPS coordinates to {selectedCity.city}...
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
