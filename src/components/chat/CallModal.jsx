import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, SwitchCamera, Sparkles, ShieldCheck } from 'lucide-react';
import { sounds } from '../../lib/soundFx';

export const CallModal = ({ isOpen, onClose, partnerUser, callType = 'Video' }) => {
  const [callStatus, setCallStatus] = useState('ringing'); // 'ringing' | 'connected'
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === 'Video');
  const [cameraFacing, setCameraFacing] = useState('front');

  useEffect(() => {
    if (!isOpen) {
      setCallStatus('ringing');
      setSeconds(0);
      return;
    }

    sounds.playPop();

    // Simulate partner picking up after 2.5 seconds
    const ringTimeout = setTimeout(() => {
      setCallStatus('connected');
      sounds.playSuccess();
    }, 2400);

    return () => clearTimeout(ringTimeout);
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (isOpen && callStatus === 'connected') {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, callStatus]);

  if (!isOpen || !partnerUser) return null;

  const handleEndCall = () => {
    sounds.playPop();
    onClose();
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fadeIn p-0 sm:p-4">
      <div className="relative w-full h-full sm:max-w-md sm:h-[720px] sm:rounded-3xl overflow-hidden bg-slate-950 flex flex-col justify-between shadow-2xl border border-white/10">
        
        {/* Fullscreen Video / Photo Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={partnerUser.avatar}
            alt={partnerUser.name}
            className={`w-full h-full object-cover ${callStatus === 'connected' && isVideoEnabled ? 'brightness-90 filter blur-none' : 'blur-sm brightness-40'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        </div>

        {/* Top Header Bar */}
        <div className="relative z-10 pt-10 sm:pt-6 px-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] text-gray-300 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>End-to-End Encrypted {callType} Call</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {partnerUser.name}
          </h2>

          <p className="text-xs text-rose-300 font-semibold mt-1">
            {callStatus === 'ringing' ? (
              <span className="animate-pulse">Ringing...</span>
            ) : (
              <span className="font-mono text-emerald-400 text-sm tracking-wide">
                {formatTimer(seconds)}
              </span>
            )}
          </p>
        </div>

        {/* Center Ringing Graphic (If not connected yet) */}
        {callStatus === 'ringing' && (
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full ring-4 ring-rose-500/40 animate-ping absolute inset-0" />
              <img
                src={partnerUser.avatar}
                alt={partnerUser.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-rose-500 shadow-2xl relative z-10"
              />
            </div>
            <p className="text-xs text-gray-400 mt-4">Connecting securely to {partnerUser.location.split(',')[0]}...</p>
          </div>
        )}

        {/* User Pip Camera Preview (Bottom right corner when connected) */}
        {callStatus === 'connected' && (
          <div className="absolute right-4 top-24 z-20 w-24 h-36 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-slate-900">
            {isVideoEnabled ? (
              <div className="w-full h-full bg-gradient-to-tr from-rose-950 to-purple-900 flex flex-col items-center justify-center p-2 text-center">
                <span className="text-[10px] text-white font-bold">You</span>
                <span className="text-[8px] text-emerald-400 mt-1">HD Video</span>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-gray-400">
                <VideoOff className="w-5 h-5 text-gray-500" />
                <span className="text-[9px] mt-1">Camera Off</span>
              </div>
            )}
          </div>
        )}

        {/* Bottom Call Controls Dock */}
        <div className="relative z-10 pb-10 sm:pb-8 px-6 flex flex-col items-center gap-6">
          
          <div className="flex items-center justify-center gap-4 sm:gap-6 bg-black/60 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
            {/* Mute Mic */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3.5 rounded-full transition-transform active:scale-90 ${
                isMuted ? 'bg-amber-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Video Toggle */}
            <button
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`p-3.5 rounded-full transition-transform active:scale-90 ${
                !isVideoEnabled ? 'bg-zinc-700 text-white' : 'bg-white/15 text-white hover:bg-white/25'
              }`}
              title={isVideoEnabled ? 'Turn Off Video' : 'Turn On Video'}
            >
              {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            {/* Switch Camera */}
            <button
              onClick={() => setCameraFacing(prev => prev === 'front' ? 'back' : 'front')}
              className="p-3.5 rounded-full bg-white/15 text-white hover:bg-white/25 transition-transform active:scale-90"
              title="Flip Camera"
            >
              <SwitchCamera className="w-5 h-5" />
            </button>

            {/* Hangup Button */}
            <button
              onClick={handleEndCall}
              className="p-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-600/50 transition-transform active:scale-90"
              title="End Call"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
