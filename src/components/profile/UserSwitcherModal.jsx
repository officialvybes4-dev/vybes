import React from 'react';
import { X, Check, ShieldCheck, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { CURRENT_USER } from '../../data/mockUsers';

export const UserSwitcherModal = ({ isOpen, onClose }) => {
  const { users, currentUser, switchPersona } = useApp();
  const { theme } = useTheme();

  if (!isOpen) return null;

  const allAvailablePersonas = [
    CURRENT_USER,
    ...users
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl transition-all ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Switch Active Persona</h2>
              <p className="text-[11px] text-gray-400">Test chatting from any user's perspective</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 max-h-80 overflow-y-auto space-y-2 pr-1">
          {allAvailablePersonas.map((persona) => {
            const isCurrent = currentUser.id === persona.id || (persona.id === 'me' && currentUser.id === 'me');
            return (
              <div
                key={persona.id}
                onClick={() => {
                  switchPersona(persona.id);
                  onClose();
                }}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  isCurrent 
                    ? 'border-rose-500 bg-rose-500/15 shadow-sm'
                    : 'border-white/10 hover:border-white/30 bg-black/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10"
                    />
                    {persona.verified && (
                      <span className="absolute bottom-0 right-0 p-0.5 bg-blue-500 rounded-full text-white">
                        <ShieldCheck className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      {persona.name}, {persona.age}
                      {persona.id === 'me' && (
                        <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.2 rounded font-mono">
                          Default
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-gray-400 line-clamp-1">{persona.occupation || persona.bio}</p>
                  </div>
                </div>

                {isCurrent && (
                  <span className="p-1 rounded-full bg-rose-500 text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] text-center text-gray-400">
          Tip: You can switch users to simulate real two-way chatting!
        </p>
      </div>
    </div>
  );
};
