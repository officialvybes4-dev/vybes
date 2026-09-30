import React, { useState } from 'react';
import { X, QrCode, Share2, Copy, Check, Sparkles, Download, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

export const QrShareModal = ({ isOpen, onClose, user }) => {
  const { currentUser, triggerConfetti } = useApp();
  const { theme } = useTheme();

  const [copied, setCopied] = useState(false);
  const targetUser = user || currentUser;

  if (!isOpen) return null;

  const profileUrl = `https://aura.dating/u/${targetUser.id || 'me'}`;

  const handleCopyLink = () => {
    sounds.playPop();
    navigator.clipboard?.writeText(profileUrl);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 2500);
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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-md">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                VIP Holographic Dating Pass 💳
              </h3>
              <p className="text-[10px] text-gray-400">Scan to view full profile & connect instantly</p>
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
        <div className="p-6 flex flex-col items-center text-center space-y-5">
          
          {/* Holographic VIP Pass Card */}
          <div className="relative w-full max-w-[320px] aspect-[5/7] rounded-3xl p-5 bg-gradient-to-br from-slate-900 via-zinc-900 to-black border-2 border-white/30 shadow-[0_15px_50px_rgba(244,63,94,0.25)] flex flex-col justify-between overflow-hidden">
            
            {/* Holographic Shimmer Sheen Layer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(244,63,94,0.3) 25%, rgba(168,85,247,0.3) 50%, rgba(56,189,248,0.3) 75%, rgba(255,255,255,0.4) 100%)'
              }}
            />

            {/* Card Top Brand */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-tight text-white">VYBES</span>
                <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  VIP PASS
                </span>
              </div>
              <span className="text-[9px] font-mono text-gray-400">#VYB-9982</span>
            </div>

            {/* Center Profile & QR */}
            <div className="flex flex-col items-center z-10 space-y-3">
              <div className="relative">
                <img
                  src={targetUser.avatar}
                  alt={targetUser.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-400 shadow-xl"
                />
                {targetUser.verified && (
                  <span className="absolute bottom-0 right-0 p-1 rounded-full bg-blue-500 text-white shadow-md">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-base font-black text-white">{targetUser.name}, {targetUser.age}</h4>
                <p className="text-[10px] text-gray-300">{targetUser.location}</p>
              </div>

              {/* Dynamic SVG QR Code */}
              <div className="p-2.5 rounded-2xl bg-white shadow-xl">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <path d="M10 10h30v30h-30z M60 10h30v30h-30z M10 60h30v30h-30z" fill="#0f172a" />
                  <path d="M16 16h18v18h-18z M66 16h18v18h-18z M16 66h18v18h-18z" fill="#ffffff" />
                  <path d="M22 22h6v6h-6z M72 22h6v6h-6z M22 72h6v6h-6z" fill="#0f172a" />
                  <rect x="45" y="10" width="8" height="8" fill="#0f172a" />
                  <rect x="45" y="25" width="8" height="8" fill="#0f172a" />
                  <rect x="45" y="45" width="10" height="10" fill="#f43f5e" rx="2" />
                  <rect x="60" y="45" width="8" height="8" fill="#0f172a" />
                  <rect x="75" y="45" width="15" height="8" fill="#0f172a" />
                  <rect x="60" y="60" width="15" height="15" fill="#0f172a" />
                  <rect x="80" y="80" width="10" height="10" fill="#0f172a" />
                  <rect x="45" y="75" width="8" height="15" fill="#0f172a" />
                </svg>
              </div>
            </div>

            {/* Card Footer */}
            <div className="z-10 text-center">
              <p className="text-[9px] text-gray-400">Point camera to open direct profile</p>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="w-full flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 py-3 px-4 rounded-2xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Copy Direct Link'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs text-white flex items-center justify-center gap-2 ${theme.buttonClass} shadow-lg active:scale-95 transition-transform`}
            >
              <Share2 className="w-4 h-4" />
              <span>Share Pass</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
