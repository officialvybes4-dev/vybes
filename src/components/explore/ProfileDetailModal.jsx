import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Star, 
  MessageCircle, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Camera,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const ProfileDetailModal = () => {
  const { detailUser, setDetailUser, likeUser, superLikeUser, startChatWith, setPreviewImage } = useApp();
  const { theme } = useTheme();
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!detailUser) return null;

  const photos = detailUser.photos && detailUser.photos.length > 0 
    ? detailUser.photos 
    : [detailUser.avatar];

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleChat = () => {
    const uid = detailUser.id;
    setDetailUser(null);
    startChatWith(uid);
  };

  const handleLike = () => {
    likeUser(detailUser.id);
    setDetailUser(null);
  };

  const handleSuperLike = () => {
    superLikeUser(detailUser.id);
    setDetailUser(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl relative ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={() => setDetailUser(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Photo Carousel Area */}
        <div className="relative w-full h-96 sm:h-[450px] bg-black overflow-hidden group">
          <img
            src={photos[photoIndex]}
            alt={detailUser.name}
            className="w-full h-full object-cover transition-opacity duration-300"
            onClick={() => setPreviewImage(photos[photoIndex])}
          />

          {/* Top Progress Bars for Photos */}
          {photos.length > 1 && (
            <div className="absolute top-3 left-4 right-16 flex items-center gap-1.5 z-10">
              {photos.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i === photoIndex ? 'bg-white shadow-sm' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Carousel Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Gradient Overlay at Bottom of Photo */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-end p-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {detailUser.name}, {detailUser.age}
                </h2>
                {detailUser.verified && (
                  <span className="p-1 rounded-full bg-blue-500 text-white" title="Verified Profile">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
                {detailUser.online && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                )}
              </div>
              <p className="flex items-center gap-1.5 text-xs text-gray-300 mt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{detailUser.location} ({detailUser.distance})</span>
              </p>
            </div>
          </div>
        </div>

        {/* Details & Bio Body */}
        <div className="p-6 space-y-6">

          {/* Bio */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">About Me</h3>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              {detailUser.bio}
            </p>
          </div>

          {/* Work & Education */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detailUser.occupation && (
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-rose-400" />
                <div>
                  <p className="text-xs font-semibold text-white">{detailUser.occupation}</p>
                  {detailUser.company && <p className="text-[10px] text-gray-400">{detailUser.company}</p>}
                </div>
              </div>
            )}
            {detailUser.education && (
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-xs font-semibold text-white">{detailUser.education}</p>
                  <p className="text-[10px] text-gray-400">Graduate</p>
                </div>
              </div>
            )}
          </div>

          {/* Interests Pills */}
          {detailUser.interests && detailUser.interests.length > 0 && (
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-2">Interests & Passions</h3>
              <div className="flex flex-wrap gap-2">
                {detailUser.interests.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${theme.highlightBadge}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prompts Q&A */}
          {detailUser.prompts && detailUser.prompts.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-bold tracking-wider text-gray-400">Dating Prompts</h3>
              {detailUser.prompts.map((p, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <p className="text-xs font-bold text-rose-400">{p.question}</p>
                  <p className="text-sm text-gray-200 italic">"{p.answer}"</p>
                </div>
              ))}
            </div>
          )}

          {/* Lifestyle Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center">
            {detailUser.zodiac && (
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-gray-400 uppercase">Zodiac</p>
                <p className="text-xs font-bold text-white mt-0.5">{detailUser.zodiac}</p>
              </div>
            )}
            {detailUser.height && (
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-gray-400 uppercase">Height</p>
                <p className="text-xs font-bold text-white mt-0.5">{detailUser.height}</p>
              </div>
            )}
            {detailUser.drinking && (
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-gray-400 uppercase">Drinks</p>
                <p className="text-xs font-bold text-white mt-0.5">{detailUser.drinking}</p>
              </div>
            )}
            {detailUser.lookingFor && (
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-gray-400 uppercase">Looking For</p>
                <p className="text-xs font-bold text-white mt-0.5 truncate">{detailUser.lookingFor}</p>
              </div>
            )}
          </div>

          {/* Action Footer Buttons */}
          <div className="sticky bottom-0 pt-4 pb-2 bg-inherit border-t border-white/10 flex items-center gap-3">
            <button
              onClick={handleSuperLike}
              className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 transition-all active:scale-95"
              title="Super Like with Confetti"
            >
              <Star className="w-5 h-5 fill-amber-400" />
            </button>

            <button
              onClick={handleLike}
              className="p-3.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 transition-all active:scale-95"
              title="Like Profile"
            >
              <Heart className="w-5 h-5 fill-rose-500" />
            </button>

            <button
              onClick={handleChat}
              className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${theme.buttonClass} transition-transform active:scale-95`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Instant Direct Chat</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
