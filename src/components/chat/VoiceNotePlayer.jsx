import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Mic, Volume2 } from 'lucide-react';
import { sounds } from '../../lib/soundFx';

export const VoiceNotePlayer = ({ voiceNote, isMe = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const timerRef = useRef(null);

  const durationSec = 14; // Default simulated duration in seconds
  const bars = voiceNote?.waveform || [35, 65, 95, 45, 80, 100, 70, 85, 40, 75, 55, 90, 30];

  useEffect(() => {
    if (isPlaying) {
      sounds.playPop();
      timerRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + (100 / (durationSec * 10));
        });
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSeconds = Math.floor((progress / 100) * durationSec);
  const formattedTime = `0:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

  return (
    <div className={`p-3 rounded-2xl flex flex-col gap-2 max-w-[280px] sm:max-w-[320px] ${
      isMe 
        ? 'bg-rose-500/20 border border-rose-500/40 text-white' 
        : 'bg-white/10 border border-white/10 text-white'
    }`}>
      {/* Voice Note Header */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-rose-300">
        <span className="flex items-center gap-1">
          <Mic className="w-3.5 h-3.5 text-rose-400" />
          <span>Voice Note</span>
        </span>
        <span className="text-[10px] text-gray-300 font-mono">
          {isPlaying ? formattedTime : (voiceNote?.duration || '0:14')}
        </span>
      </div>

      {/* Waveform & Play Control */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={togglePlay}
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-90 ${
            isPlaying 
              ? 'bg-rose-500 text-white animate-pulse' 
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        {/* Animated Sound Waveform Bars */}
        <div className="flex-1 flex items-center gap-1 h-8">
          {bars.map((height, idx) => {
            const barProgress = (idx / bars.length) * 100;
            const isPassed = progress >= barProgress;
            return (
              <div
                key={idx}
                className={`flex-1 rounded-full transition-all duration-150 ${
                  isPassed 
                    ? 'bg-rose-400 shadow-sm' 
                    : 'bg-white/30'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(25, (height * (0.6 + Math.random() * 0.5)))}%` : `${height}%`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Voice caption */}
      {voiceNote?.caption && (
        <p className="text-[10px] sm:text-[11px] text-gray-300 italic line-clamp-1 border-t border-white/10 pt-1.5">
          "{voiceNote.caption}"
        </p>
      )}
    </div>
  );
};
