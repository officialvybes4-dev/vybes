import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const ProfileGrid = ({ users }) => {
  const { 
    likeUser, 
    startChatWith, 
    setDetailUser, 
    likesGiven 
  } = useApp();
  const { theme } = useTheme();

  if (users.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-gray-400 text-xs sm:text-sm">No profiles found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 pb-6">
      {users.map((user) => {
        const isLiked = likesGiven.includes(user.id);
        const photo = user.photos ? user.photos[0] : user.avatar;

        return (
          <div
            key={user.id}
            onClick={() => setDetailUser(user)}
            className={`group rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-200 active:scale-95 sm:hover:scale-[1.02] cursor-pointer flex flex-col justify-between ${theme.cardBg} ${theme.cardHover}`}
          >
            {/* Top Photo Frame */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-black">
              <img
                src={photo}
                alt={user.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Match Score Badge */}
              <div className="absolute top-2 left-2 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1 shadow-md">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                <span className="text-[9px] sm:text-[10px] font-bold text-white">{user.matchScore}%</span>
              </div>

              {/* Online Indicator */}
              {user.online && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-[9px] font-bold flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span className="hidden sm:inline">Online</span>
                </div>
              )}

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-x-0 bottom-0 pt-10 pb-2 px-2.5 sm:px-3 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end">
                <div className="flex items-center gap-1">
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                    {user.name}, {user.age}
                  </h3>
                  {user.verified && (
                    <ShieldCheck className="w-3 h-3 text-blue-400 shrink-0" />
                  )}
                </div>

                <p className="flex items-center gap-0.5 text-[9px] sm:text-[10px] text-gray-300 truncate">
                  <MapPin className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                  <span className="truncate">{user.location.split(',')[0]}</span>
                </p>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-2 sm:p-3 pt-1.5 border-t border-white/10 flex items-center gap-1.5">
              
              {/* Instant Chat Button ("koi kisi se bhi chatting kar sake") */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startChatWith(user.id);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1 ${theme.buttonClass} transition-transform active:scale-95 shadow-sm`}
                title="Direct Chat"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Chat</span>
              </button>

              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  likeUser(user.id);
                }}
                className={`p-1.5 sm:p-2 rounded-xl border transition-all active:scale-90 ${
                  isLiked
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-rose-400 hover:border-rose-500/40'
                }`}
                title={isLiked ? 'Liked' : 'Like'}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
};
