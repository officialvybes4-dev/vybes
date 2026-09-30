import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  Zap
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
      <div className="text-center py-16">
        <p className="text-gray-400 text-sm">No profiles found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {users.map((user) => {
        const isLiked = likesGiven.includes(user.id);
        const photo = user.photos ? user.photos[0] : user.avatar;

        return (
          <div
            key={user.id}
            onClick={() => setDetailUser(user)}
            className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between ${theme.cardBg} ${theme.cardHover}`}
          >
            {/* Top Photo Frame */}
            <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-black">
              <img
                src={photo}
                alt={user.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Match Score Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-bold text-white">{user.matchScore}% Match</span>
              </div>

              {/* Online indicator */}
              {user.online && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span>Online</span>
                </div>
              )}

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 flex flex-col justify-end">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {user.name}, {user.age}
                  </h3>
                  {user.verified && (
                    <span className="p-0.5 rounded-full bg-blue-500 text-white" title="Verified">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <p className="flex items-center gap-1 text-[11px] text-gray-300 mt-0.5">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{user.location} • {user.distance}</span>
                </p>
              </div>
            </div>

            {/* Content & Actions Body */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              
              {/* Bio snippet */}
              <p className="text-xs text-gray-300 line-clamp-2">
                {user.bio}
              </p>

              {/* Interest Badges */}
              {user.interests && (
                <div className="flex flex-wrap gap-1">
                  {user.interests.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons Bar */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                
                {/* Instant Chat Button ("koi kisi se bhi chatting kar sake") */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startChatWith(user.id);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${theme.buttonClass} transition-transform active:scale-95`}
                  title="Direct Instant Chat"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct Chat</span>
                </button>

                {/* Like Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    likeUser(user.id);
                  }}
                  className={`p-2 rounded-xl border transition-all active:scale-90 ${
                    isLiked
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:text-rose-400 hover:border-rose-500/40'
                  }`}
                  title={isLiked ? 'Liked' : 'Like'}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                </button>

              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};
