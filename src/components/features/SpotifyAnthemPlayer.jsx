import React, { useState, useEffect } from 'react';
import { Play, Pause, Disc3, Music2, Volume2, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../../lib/soundFx';

export const SpotifyAnthemPlayer = ({ anthem, userName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);

  const track = anthem || {
    title: 'Die With A Smile',
    artist: 'Lady Gaga & Bruno Mars',
    genre: 'Soul Pop',
    resonanceScore: 95
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 1));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    sounds.playPop();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-3.5 sm:p-4 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-black/80 border border-emerald-500/30 text-white shadow-xl">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
          <Disc3 className="w-3.5 h-3.5" />
          <span>Profile Anthem • Spotify Vibe</span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          {track.resonanceScore}% Musical Match
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Spinning Vinyl Record */}
        <div className="relative shrink-0">
          <div 
            className={`w-14 h-14 rounded-full bg-slate-950 border-2 border-emerald-500/40 flex items-center justify-center shadow-lg relative ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-black" />
            </div>
            {/* Vinyl Grooves */}
            <div className="absolute inset-1 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-2.5 rounded-full border border-white/5 pointer-events-none" />
          </div>

          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all"
            title={isPlaying ? 'Pause Anthem' : 'Play Anthem'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>
        </div>

        {/* Track Metadata */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-white truncate">{track.title}</h4>
          <p className="text-[11px] text-gray-300 truncate">{track.artist}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 text-gray-300">
              {track.genre}
            </span>
            {isPlaying && (
              <div className="flex items-center gap-0.5 h-3">
                {[40, 80, 100, 60, 90, 50].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-emerald-400 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
