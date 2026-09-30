import React from 'react';
import { X, Check, Sparkles, Moon, Sun, Monitor, Smartphone } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemePickerModal = ({ isOpen, onClose }) => {
  const { allThemes, themeId, setTheme, theme, deviceMode, setDeviceMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl transition-all duration-300 ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Dynamic Theme Engine</h2>
              <p className="text-xs text-gray-400">Personalize your dating app experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Themes Grid */}
        <div className="mt-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Choose Visual Theme</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allThemes.map((t) => {
              const isSelected = t.id === themeId;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`relative p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 group overflow-hidden ${
                    isSelected 
                      ? 'border-rose-400 ring-2 ring-rose-400/30 scale-[1.02] shadow-lg' 
                      : 'border-white/10 hover:border-white/30 bg-black/20'
                  }`}
                >
                  {/* Theme Preview Gradient Pill */}
                  <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${t.accentGradient} mb-3 flex items-center justify-end px-2 shadow-inner`}>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1">
                      {t.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                      {t.badge}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Device Mode Toggle */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Responsive Layout Mode</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setDeviceMode('web')}
              className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                deviceMode === 'web'
                  ? 'border-emerald-500 bg-emerald-500/10 text-white'
                  : 'border-white/10 text-gray-400 hover:bg-white/5'
              }`}
            >
              <Monitor className={`w-5 h-5 ${deviceMode === 'web' ? 'text-emerald-400' : 'text-gray-400'}`} />
              <div className="text-left">
                <p className="text-xs font-bold">Responsive Web</p>
                <p className="text-[10px] text-gray-400">Full desktop layout</p>
              </div>
            </button>

            <button
              onClick={() => setDeviceMode('mobile-frame')}
              className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                deviceMode === 'mobile-frame'
                  ? 'border-rose-500 bg-rose-500/10 text-white'
                  : 'border-white/10 text-gray-400 hover:bg-white/5'
              }`}
            >
              <Smartphone className={`w-5 h-5 ${deviceMode === 'mobile-frame' ? 'text-rose-400' : 'text-gray-400'}`} />
              <div className="text-left">
                <p className="text-xs font-bold">Mobile Device Frame</p>
                <p className="text-[10px] text-gray-400">iPhone Pro preview</p>
              </div>
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl font-medium text-xs text-white ${theme.buttonClass} transition-transform active:scale-95`}
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
};
