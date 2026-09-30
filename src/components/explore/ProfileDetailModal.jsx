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
  Sparkles,
  QrCode,
  Moon,
  Flame,
  CheckCircle2,
  Mic,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { SpotifyAnthemPlayer } from '../features/SpotifyAnthemPlayer';
import { ZodiacMatchModal } from '../features/ZodiacMatchModal';
import { ThisOrThatModal } from '../features/ThisOrThatModal';
import { QrShareModal } from '../features/QrShareModal';
import { VoiceNotePlayer } from '../chat/VoiceNotePlayer';
import { sounds } from '../../lib/soundFx';

export const ProfileDetailModal = () => {
  const { detailUser, setDetailUser, likeUser, superLikeUser, startChatWith, setPreviewImage } = useApp();
  const { theme } = useTheme();
  
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isZodiacOpen, setIsZodiacOpen] = useState(false);
  const [isThisOrThatOpen, setIsThisOrThatOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

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
    sounds.playMatchChime();
    likeUser(detailUser.id);
    setDetailUser(null);
  };

  const handleSuperLike = () => {
    sounds.playSuperLike();
    superLikeUser(detailUser.id);
    setDetailUser(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-2xl h-[94dvh] sm:h-auto sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border-t sm:border shadow-2xl relative flex flex-col ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Buttons */}
        <div className="absolute top-3 inset-x-3 z-30 flex items-center justify-between pointer-events-none">
          {/* Share QR Pass */}
          <button
            onClick={() => setIsQrOpen(true)}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-90 pointer-events-auto"
            title="VIP Holographic Pass"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Floating Close Button */}
          <button
            onClick={() => setDetailUser(null)}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-90 pointer-events-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Photo Carousel Area */}
          <div className="relative w-full h-80 sm:h-[420px] bg-black overflow-hidden group">
            <img
              src={photos[photoIndex]}
              alt={detailUser.name}
              className="w-full h-full object-cover transition-opacity duration-300"
              onClick={() => setPreviewImage(photos[photoIndex])}
            />

            {/* Top Progress Bars for Photos */}
            {photos.length > 1 && (
              <div className="absolute top-2.5 left-14 right-14 flex items-center gap-1 z-20">
                {photos.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i === photoIndex ? 'bg-white shadow-md' : 'bg-white/35'
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
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Gradient Overlay at Bottom of Photo */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-end p-4 sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {detailUser.name}, {detailUser.age}
                  </h2>
                  {detailUser.verified && (
                    <span className="p-0.5 rounded-full bg-blue-500 text-white" title="Verified Profile">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {detailUser.online && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online
                    </span>
                  )}
                </div>
                <p className="flex items-center gap-1 text-[11px] text-gray-300 mt-0.5">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{detailUser.location} ({detailUser.distance})</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Compatibility Actions Hub */}
          <div className="px-4 sm:px-6 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between gap-2 overflow-x-auto">
            <button
              onClick={() => setIsZodiacOpen(true)}
              className="flex-1 py-2 px-3 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 whitespace-nowrap"
            >
              <Moon className="w-3.5 h-3.5 text-purple-400" />
              <span>Cosmic Synastry</span>
            </button>

            <button
              onClick={() => setIsThisOrThatOpen(true)}
              className="flex-1 py-2 px-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 whitespace-nowrap"
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Chemistry Battle</span>
            </button>

            <button
              onClick={() => setIsQrOpen(true)}
              className="py-2 px-3 rounded-2xl bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10 text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 whitespace-nowrap"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>VIP Pass</span>
            </button>
          </div>

          {/* Details Body */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            
            {/* Bio */}
            <div>
              <h3 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-1.5">About Me</h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/10">
                {detailUser.bio}
              </p>
            </div>

            {/* Spotify Anthem Player (Feature #7) */}
            <div>
              <h3 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-1.5">Dating Anthem</h3>
              <SpotifyAnthemPlayer anthem={detailUser.anthem} userName={detailUser.name} />
            </div>

            {/* Voice Clip if available */}
            {detailUser.voiceNote && (
              <div>
                <h3 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-1.5">Audio Bio Sample</h3>
                <VoiceNotePlayer voiceNote={detailUser.voiceNote} isMe={false} />
              </div>
            )}

            {/* Green Flags (Feature #18) */}
            {detailUser.greenFlags && detailUser.greenFlags.length > 0 && (
              <div>
                <h3 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Green Flags</span>
                </h3>
                <div className="space-y-1.5">
                  {detailUser.greenFlags.map((flag, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Work & Education */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {detailUser.occupation && (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-rose-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{detailUser.occupation}</p>
                    {detailUser.company && <p className="text-[10px] text-gray-400 truncate">{detailUser.company}</p>}
                  </div>
                </div>
              )}
              {detailUser.education && (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{detailUser.education}</p>
                    <p className="text-[10px] text-gray-400">Graduate</p>
                  </div>
                </div>
              )}
            </div>

            {/* Interests Pills */}
            {detailUser.interests && detailUser.interests.length > 0 && (
              <div>
                <h3 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-1.5">Interests</h3>
                <div className="flex flex-wrap gap-1.5">
                  {detailUser.interests.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${theme.highlightBadge}`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prompts Q&A */}
            {detailUser.prompts && detailUser.prompts.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-gray-400">Dating Prompts</h3>
                {detailUser.prompts.map((p, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <p className="text-xs font-bold text-rose-400">{p.question}</p>
                    <p className="text-xs sm:text-sm text-gray-200 italic leading-relaxed">"{p.answer}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Lifestyle Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center">
              {detailUser.zodiac && (
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[9px] text-gray-400 uppercase font-bold">Zodiac</p>
                  <p className="text-xs font-bold text-white mt-0.5">{detailUser.zodiac}</p>
                </div>
              )}
              {detailUser.height && (
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[9px] text-gray-400 uppercase font-bold">Height</p>
                  <p className="text-xs font-bold text-white mt-0.5">{detailUser.height}</p>
                </div>
              )}
              {detailUser.drinking && (
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[9px] text-gray-400 uppercase font-bold">Drinks</p>
                  <p className="text-xs font-bold text-white mt-0.5">{detailUser.drinking}</p>
                </div>
              )}
              {detailUser.datingIntent && (
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-[9px] text-gray-400 uppercase font-bold">Intent</p>
                  <p className="text-xs font-bold text-white mt-0.5 truncate">{detailUser.datingIntent}</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Docked Action Footer */}
        <div className="p-3 sm:p-4 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center gap-2 sm:gap-3 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            onClick={handleSuperLike}
            className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 transition-transform active:scale-90"
            title="Super Like"
          >
            <Star className="w-5 h-5 fill-amber-400" />
          </button>

          <button
            onClick={handleLike}
            className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 transition-transform active:scale-90"
            title="Like Profile"
          >
            <Heart className="w-5 h-5 fill-rose-500" />
          </button>

          <button
            onClick={handleChat}
            className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 ${theme.buttonClass} transition-transform active:scale-95 shadow-lg shadow-rose-500/30`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Instant Direct Chat</span>
          </button>
        </div>

      </div>

      {/* Embedded Feature Modals */}
      <ZodiacMatchModal
        isOpen={isZodiacOpen}
        onClose={() => setIsZodiacOpen(false)}
        targetUser={detailUser}
      />

      <ThisOrThatModal
        isOpen={isThisOrThatOpen}
        onClose={() => setIsThisOrThatOpen(false)}
        partnerUser={detailUser}
      />

      <QrShareModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        user={detailUser}
      />

    </div>
  );
};
