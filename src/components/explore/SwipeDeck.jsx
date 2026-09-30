import React, { useState } from 'react';
import { 
  Heart, 
  X, 
  Star, 
  Info, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  Moon,
  Zap,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';
import { ZodiacMatchModal } from '../features/ZodiacMatchModal';
import { ThisOrThatModal } from '../features/ThisOrThatModal';

export const SwipeDeck = ({ users }) => {
  const { 
    likeUser, 
    passUser, 
    superLikeUser, 
    startChatWith, 
    setDetailUser,
    likesGiven,
    dislikes,
    triggerConfetti
  } = useApp();
  const { theme } = useTheme();

  // Track history for Rewind (undo) functionality
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' | 'right' | 'up'

  // Modals for quick features
  const [isZodiacOpen, setIsZodiacOpen] = useState(false);
  const [isThisOrThatOpen, setIsThisOrThatOpen] = useState(false);

  // Filter out already swiped users (excluding rewound ones)
  const activeDeck = users.filter(u => {
    // If user was recently swiped in history and not undone, exclude
    const inHistory = swipeHistory.some(h => h.user.id === u.id);
    return !inHistory && !likesGiven.includes(u.id) && !dislikes.includes(u.id);
  });

  const currentUserCard = activeDeck[0];
  const nextUserCard = activeDeck[1];

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (!currentUserCard) return;
    const len = currentUserCard.photos ? currentUserCard.photos.length : 1;
    setPhotoIndex((prev) => (prev + 1) % len);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (!currentUserCard) return;
    const len = currentUserCard.photos ? currentUserCard.photos.length : 1;
    setPhotoIndex((prev) => (prev - 1 + len) % len);
  };

  const handlePass = (e) => {
    e?.stopPropagation();
    if (!currentUserCard) return;
    sounds.playPop();
    setSwipeDirection('left');
    setSwipeHistory(prev => [{ user: currentUserCard, action: 'pass' }, ...prev]);

    setTimeout(() => {
      passUser(currentUserCard.id);
      setSwipeDirection(null);
      setPhotoIndex(0);
    }, 250);
  };

  const handleLike = (e) => {
    e?.stopPropagation();
    if (!currentUserCard) return;
    sounds.playMatchChime();
    setSwipeDirection('right');
    setSwipeHistory(prev => [{ user: currentUserCard, action: 'like' }, ...prev]);

    setTimeout(() => {
      likeUser(currentUserCard.id);
      setSwipeDirection(null);
      setPhotoIndex(0);
    }, 250);
  };

  const handleSuperLike = (e) => {
    e?.stopPropagation();
    if (!currentUserCard) return;
    sounds.playSuperLike();
    setSwipeDirection('up');
    setSwipeHistory(prev => [{ user: currentUserCard, action: 'superlike' }, ...prev]);

    setTimeout(() => {
      superLikeUser(currentUserCard.id);
      setSwipeDirection(null);
      setPhotoIndex(0);
    }, 300);
  };

  // Rewind: Undo last swipe action!
  const handleRewind = (e) => {
    e?.stopPropagation();
    if (swipeHistory.length === 0) return;
    sounds.playRewind();

    const lastSwiped = swipeHistory[0];
    setSwipeHistory(prev => prev.slice(1));
    triggerConfetti();
  };

  const handleInstantChat = (e) => {
    e.stopPropagation();
    if (!currentUserCard) return;
    startChatWith(currentUserCard.id);
  };

  const handleReset = () => {
    localStorage.removeItem('aura_chats');
    setSwipeHistory([]);
    window.location.reload();
  };

  if (!currentUserCard) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center h-[calc(100dvh-200px)] min-h-[380px]">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 shadow-xl">
          <Sparkles className="w-8 h-8 animate-bounce" />
        </div>
        <h3 className="text-lg font-bold text-white">You've explored everyone for now!</h3>
        <p className="text-xs text-gray-400 mt-1 max-w-xs">
          Check out your active matches or reset the stack to view profiles again.
        </p>
        <div className="flex items-center gap-3 mt-5">
          {swipeHistory.length > 0 && (
            <button
              onClick={handleRewind}
              className="px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rewind Last Profile</span>
            </button>
          )}
          <button
            onClick={handleReset}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 ${theme.buttonClass} shadow-md`}
          >
            <span>Reset Stack</span>
          </button>
        </div>
      </div>
    );
  }

  const photos = currentUserCard.photos || [currentUserCard.avatar];

  return (
    <div className="relative w-full max-w-[400px] mx-auto h-[calc(100dvh-175px)] sm:h-[580px] min-h-[460px] max-h-[640px] flex flex-col items-center justify-center select-none px-2 sm:px-0">
      
      {/* Background Under-Card Preview */}
      {nextUserCard && (
        <div className="absolute inset-x-4 sm:inset-x-0 inset-y-2 top-3 scale-[0.96] opacity-40 rounded-3xl overflow-hidden pointer-events-none shadow-lg">
          <img 
            src={nextUserCard.photos ? nextUserCard.photos[0] : nextUserCard.avatar} 
            alt={nextUserCard.name}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      )}

      {/* Main Swipeable Card */}
      <div 
        className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 transition-all duration-250 transform ${
          swipeDirection === 'left' 
            ? '-translate-x-full rotate-[-15deg] opacity-0' 
            : swipeDirection === 'right'
            ? 'translate-x-full rotate-[15deg] opacity-0'
            : swipeDirection === 'up'
            ? '-translate-y-full scale-105 opacity-0'
            : 'translate-x-0 rotate-0 opacity-100'
        }`}
      >
        {/* Swipe Feedback Badges */}
        {swipeDirection === 'right' && (
          <div className="absolute top-6 left-6 z-30 px-3.5 py-1.5 border-4 border-emerald-400 rounded-2xl text-emerald-400 font-black text-xl uppercase tracking-wider rotate-[-15deg] shadow-lg backdrop-blur-md">
            LIKE ❤️
          </div>
        )}
        {swipeDirection === 'left' && (
          <div className="absolute top-6 right-6 z-30 px-3.5 py-1.5 border-4 border-rose-500 rounded-2xl text-rose-500 font-black text-xl uppercase tracking-wider rotate-[15deg] shadow-lg backdrop-blur-md">
            NOPE ❌
          </div>
        )}
        {swipeDirection === 'up' && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 border-4 border-amber-400 rounded-2xl text-amber-400 font-black text-xl uppercase tracking-wider shadow-lg backdrop-blur-md">
            SUPER LIKE ⭐
          </div>
        )}

        {/* Profile Photo */}
        <img
          src={photos[photoIndex]}
          alt={currentUserCard.name}
          className="w-full h-full object-cover"
        />

        {/* Top Photo Segmented Progress Bar */}
        {photos.length > 1 && (
          <div className="absolute top-2.5 inset-x-3 flex items-center gap-1 z-20">
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

        {/* Top Floating Feature Badges */}
        <div className="absolute top-5 inset-x-3 flex items-center justify-between z-20 pointer-events-auto">
          {/* Response time badge */}
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-amber-300 border border-amber-400/40 backdrop-blur-md flex items-center gap-1">
            <Zap className="w-3 h-3 fill-amber-400" />
            <span>{currentUserCard.responseTime || '< 5m'}</span>
          </span>

          {/* Quick Feature Shortcut Pills */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZodiacOpen(true);
              }}
              className="px-2 py-1 rounded-full text-[10px] font-bold bg-black/60 text-purple-300 border border-purple-400/40 backdrop-blur-md flex items-center gap-1 hover:scale-105 active:scale-95 transition-transform"
              title="Cosmic Synastry Radar"
            >
              <Moon className="w-3 h-3 text-purple-400" />
              <span>Synastry</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsThisOrThatOpen(true);
              }}
              className="px-2 py-1 rounded-full text-[10px] font-bold bg-black/60 text-rose-300 border border-rose-400/40 backdrop-blur-md flex items-center gap-1 hover:scale-105 active:scale-95 transition-transform"
              title="Play This or That Chemistry"
            >
              <Flame className="w-3 h-3 text-rose-400" />
              <span>Battle</span>
            </button>
          </div>
        </div>

        {/* Touch Hotspots for Photo Switching */}
        <div className="absolute inset-0 flex z-10">
          <div 
            onClick={handlePrevPhoto} 
            className="w-1/2 h-3/4 cursor-pointer"
            title="Previous photo"
          />
          <div 
            onClick={handleNextPhoto} 
            className="w-1/2 h-3/4 cursor-pointer"
            title="Next photo"
          />
        </div>

        {/* Gradient Bottom Overlay with User Details */}
        <div className="absolute inset-x-0 bottom-0 pt-24 pb-16 px-4 bg-gradient-to-t from-black via-black/85 to-transparent z-20 pointer-events-none">
          
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentUserCard.name}, {currentUserCard.age}
              </h2>
              {currentUserCard.verified && (
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              )}
            </div>

            <button
              onClick={() => setDetailUser(currentUserCard)}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all active:scale-95"
              title="Full Profile Details"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-gray-300 mt-0.5 pointer-events-auto">
            <MapPin className="w-3 h-3 text-rose-400" />
            <span>{currentUserCard.location} • {currentUserCard.distance}</span>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-200 mt-1.5 line-clamp-2 pointer-events-auto leading-tight">
            {currentUserCard.bio}
          </p>

          {/* Interests & Anthem Chips */}
          <div className="flex flex-wrap gap-1 mt-2 pointer-events-auto items-center">
            {currentUserCard.anthem && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                🎵 {currentUserCard.anthem.title}
              </span>
            )}
            {currentUserCard.interests && currentUserCard.interests.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/20 text-white backdrop-blur-md border border-white/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Tactile Action Buttons Dock */}
        <div className="absolute inset-x-0 bottom-2.5 px-3 flex items-center justify-between z-30">
          
          {/* Rewind / Undo Button (Feature #14) */}
          <button
            onClick={handleRewind}
            disabled={swipeHistory.length === 0}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-transform active:scale-90 ${
              swipeHistory.length > 0 
                ? 'bg-slate-950/85 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                : 'bg-slate-950/40 text-gray-600 border border-white/5 cursor-not-allowed'
            }`}
            title="Rewind (Undo Last Swipe)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Pass Button (❌) */}
          <button
            onClick={handlePass}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-950/85 hover:bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shadow-lg backdrop-blur-md transition-transform active:scale-90"
            title="Pass (Swipe Left)"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Super Like Button (⭐) */}
          <button
            onClick={handleSuperLike}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/85 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-lg backdrop-blur-md transition-transform active:scale-90"
            title="Super Like"
          >
            <Star className="w-4 h-4 fill-amber-400" />
          </button>

          {/* Instant Direct Chat Button */}
          <button
            onClick={handleInstantChat}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl flex items-center gap-1.5 font-bold text-[11px] sm:text-xs ${theme.buttonClass} shadow-lg shadow-rose-500/30 transition-transform active:scale-90`}
            title="Instant Direct Chat"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>

          {/* Like Button (❤️) */}
          <button
            onClick={handleLike}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-950/85 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shadow-lg backdrop-blur-md transition-transform active:scale-90"
            title="Like (Swipe Right)"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] fill-emerald-400/20 hover:fill-emerald-400" />
          </button>

        </div>

      </div>

      {/* Cosmic Synastry Modal */}
      <ZodiacMatchModal
        isOpen={isZodiacOpen}
        onClose={() => setIsZodiacOpen(false)}
        targetUser={currentUserCard}
      />

      {/* This or That Chemistry Modal */}
      <ThisOrThatModal
        isOpen={isThisOrThatOpen}
        onClose={() => setIsThisOrThatOpen(false)}
        partnerUser={currentUserCard}
      />

    </div>
  );
};
