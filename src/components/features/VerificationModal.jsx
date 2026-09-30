import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Camera, CheckCircle2, Sparkles, RefreshCw, ScanFace } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

export const VerificationModal = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, triggerConfetti } = useApp();
  const { theme } = useTheme();

  const [step, setStep] = useState(1); // 1: Ready, 2: Scanning, 3: Success
  const [progress, setProgress] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState('Center your face in the reticle');

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startScan = () => {
    setStep(2);
    setProgress(0);
    sounds.playPop();

    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);

      if (p === 30) {
        setCurrentPrompt('Turn your head gently to the left 👈');
      } else if (p === 65) {
        setCurrentPrompt('Now smile warmly for the camera 😊');
      } else if (p >= 100) {
        clearInterval(interval);
        setStep(3);
        updateUserProfile({ verified: true });
        sounds.playSuccess();
        triggerConfetti();
      }
    }, 60);
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
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                AI Biometric Verification
              </h3>
              <p className="text-[10px] text-gray-400">Get the official blue verified checkmark</p>
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
        <div className="p-6 flex flex-col items-center text-center">
          
          {step === 1 && (
            <div className="space-y-4">
              <div className="w-24 h-24 rounded-full mx-auto relative p-1 bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-base font-bold text-white">Verify Your Identity</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Our neural biometric engine checks facial symmetry against your profile photos to ensure 100% genuine humans.
                </p>
              </div>

              <div className="space-y-2 text-left bg-white/5 p-3.5 rounded-2xl border border-white/10 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>3-second motion scan with no photo uploads required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Permanent blue checkmark badge across all feeds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>300% boost in inbound replies and matches</span>
                </div>
              </div>

              <button
                onClick={startScan}
                className="w-full py-3 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Begin Biometric Scan</span>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 w-full">
              {/* Camera Scanner Simulation Reticle */}
              <div className="relative w-48 h-56 mx-auto rounded-[40px] border-2 border-blue-400/80 overflow-hidden shadow-2xl bg-black">
                <img
                  src={currentUser.avatar}
                  alt="Scanning"
                  className="w-full h-full object-cover brightness-75"
                />

                {/* Animated Horizontal Laser Scanner Line */}
                <div 
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse"
                  style={{ top: `${progress}%` }}
                />

                {/* Reticle Corner Brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
              </div>

              <div>
                <p className="text-xs font-bold text-cyan-300 animate-pulse">
                  {currentPrompt}
                </p>
                <p className="text-[10px] text-gray-400 mt-1 font-mono">
                  Biometric analysis in progress: {progress}%
                </p>
              </div>

              {/* Progress Line */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto shadow-xl">
                <ShieldCheck className="w-10 h-10 text-blue-400 animate-bounce" />
              </div>

              <div>
                <h4 className="text-lg font-black text-white">Identity Verified! 🛡️</h4>
                <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
                  Congratulations {currentUser.name}! Your profile now proudly wears the verified badge.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Done
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
