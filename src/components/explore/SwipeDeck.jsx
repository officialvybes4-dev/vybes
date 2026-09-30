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
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const SwipeDeck = ({ users }) => {
  const { 
    likeUser, 
    passUser, 
    superLikeUser, 
    startChatWith, 
    setDetailUser,
    likesGiven,
    dislikes 
  } = useApp();
  const { theme } = useTheme();

  // Filter out already swiped users
  const activeDeck = users.filter(u => !likesGiven.includes(u.id) && !dislikes.includes(u.id));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left' | 'right' | 'up'

  const currentUserCard = activeDeck[currentIndex];
  const nextUserCard = activeDeck[currentIndex + 1];

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

  const handlePass = () => {
    if (!currentUserCard) return;
    setSwipeDirection('left');
    setTimeout(() => {
      passUser(currentUserCard.id);
      setSwipeDirection(null);
      setPhotoIndex(0);
    }, 280);
  };

  const handleLike = () => {
    if (!currentUserCard) return;
    setSwipeDirection('right');
    setTimeout(() => {
      likeUser(currentUserCard.id);
      setSwipeDirection(null);
      setPhotoIndex(0);
    }, 280);
  };

  const handleSuperLike = () => {
    if (!currentUserCard) return;
    setSwipeDirection('up');
    setTimeout(() => {
      superLikeUser(currentUserCard.id);
      setSwipeDirection(null);
      setPhotoIndex(0);
    }, 320);
  };

  const handleInstantChat = (e) => {
    e.stopPropagation();
    if (!currentUserCard) return;
    startChatWith(currentUserCard.id);
  };

  // Reset swiped cards
  const handleReset = () => {
    localStorage.removeItem('aura_chats'); // optional or keep
    window.location.reload();
  };

  if (!currentUserCard) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[480px]">
        <div className="w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
          <Sparkles className="w-10 h-10 animate-bounce" />
        </div>
        <h3 className="text-xl font-bold text-white">You've explored everyone for now!</h3>
        <p className="text-xs text-gray-400 mt-2 max-w-sm">
          You have seen all profiles nearby. Check out your active chats or reset the stack to view again.
        </p>
        <button
          onClick={handleReset}
          className={`mt-6 px-6 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 ${theme.buttonClass} transition-transform active:scale-95`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Swipe Stack</span>
        </button>
      </div>
    );
  }

  const photos = currentUserCard.photos || [currentUserCard.avatar];

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto h-[560px] sm:h-[620px] flex flex-col items-center justify-center select-none">
      
      {/* Background Under-Card Preview */}
      {nextUserCard && (
        <div className="absolute inset-0 top-3 scale-[0.95] opacity-50 rounded-3xl overflow-hidden pointer-events-none shadow-lg">
          <img 
            src={nextUserCard.photos ? nextUserCard.photos[0] : nextUserCard.avatar} 
            alt={nextUserCard.name}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      )}

      {/* Main Top Card */}
      <div 
        className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-300 transform ${
          swipeDirection === 'left' 
            ? '-translate-x-full rotate-[-15deg] opacity-0' 
            : swipeDirection === 'right'
            ? 'translate-x-full rotate-[15deg] opacity-0'
            : swipeDirection === 'up'
            ? '-translate-y-full scale-110 opacity-0'
            : 'translate-x-0 rotate-0 opacity-100'
        }`}
      >
        {/* Swipe Indicators */}
        {swipeDirection === 'right' && (
          <div className="absolute top-8 left-8 z-30 px-4 py-2 border-4 border-emerald-400 rounded-2xl text-emerald-400 font-black text-2xl uppercase tracking-wider rotate-[-20deg] shadow-lg backdrop-blur-md">
            LIKE ❤️
          </div>
        )}
        {swipeDirection === 'left' && (
          <div className="absolute top-8 right-8 z-30 px-4 py-2 border-4 border-rose-500 rounded-2xl text-rose-500 font-black text-2xl uppercase tracking-wider rotate-[20deg] shadow-lg backdrop-blur-md">
            NOPE ❌
          </div>
        )}
        {swipeDirection === 'up' && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 px-4 py-2 border-4 border-amber-400 rounded-2xl text-amber-400 font-black text-2xl uppercase tracking-wider shadow-lg backdrop-blur-md">
            SUPER LIKE ⭐
          </div>
        )}

        {/* Photo Image */}
        <img
          src={photos[photoIndex]}
          alt={currentUserCard.name}
          className="w-full h-full object-cover"
        />

        {/* Top Segmented Photo Progress Bar */}
        {photos.length > 1 && (
          <div className="absolute top-3 inset-x-4 flex items-center gap-1.5 z-20">
            {photos.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i === photoIndex ? 'bg-white shadow-md' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Touch / Clickable Hotspots for photo navigation */}
        <div className="absolute inset-0 flex z-10">
          <div 
            onClick={handlePrevPhoto} 
            className="w-1/2 h-4/5 cursor-pointer opacity-0 hover:opacity-10 bg-white/10 transition-opacity flex items-center pl-4"
          >
            <ChevronLeft className="w-8 h-8 text-white drop-shadow-md" />
          </div>
          <div 
            onClick={handleNextPhoto} 
            className="w-1/2 h-4/5 cursor-pointer opacity-0 hover:opacity-10 bg-white/10 transition-opacity flex items-center justify-end pr-4"
          >
            <ChevronRight className="w-8 h-8 text-white drop-shadow-md" />
          </div>
        </div>

        {/* Gradient Gradient Bottom Info Overlay */}
        <div className="absolute inset-x-0 bottom-0 pt-24 pb-20 px-5 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none">
          
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">
                {currentUserCard.name}, {currentUserCard.age}
              </h2>
              {currentUserCard.verified && (
                <span className="p-1 rounded-full bg-blue-500 text-white" title="Verified">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <button
              onClick={() => setDetailUser(currentUserCard)}
              className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-all hover:scale-110 pointer-events-auto"
              title="Full Profile"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-300 mt-1 pointer-events-auto">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>{currentUserCard.location} • {currentUserCard.distance}</span>
          </div>

          <p className="text-xs text-gray-200 mt-2 line-clamp-2 pointer-events-auto">
            {currentUserCard.bio}
          </p>

          {/* Interests Pill preview */}
          {currentUserCard.interests && (
            <div className="flex flex-wrap gap-1.5 mt-2.5 pointer-events-auto">
              {currentUserCard.interests.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-md border border-white/20"
                >
                  #{tag}
                </span>
              ))}
              {currentUserCard.interests.length > 3 && (
                <span className="text-[10px] text-gray-400 self-center">
                  +{currentUserCard.interests.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Floating Action Buttons Toolbar */}
        <div className="absolute inset-x-0 bottom-3 px-4 flex items-center justify-between z-30">
          
          {/* Pass button */}
          <button
            onClick={handlePass}
            className="w-12 h-12 rounded-full bg-slate-900/80 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-90"
            title="Pass"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Super Like button */}
          <button
            onClick={handleSuperLike}
            className="w-11 h-11 rounded-full bg-slate-900/80 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-90"
            title="Super Like"
          >
            <Star className="w-5 h-5 fill-amber-400" />
          </button>

          {/* Direct Instant Chat ("koi kisi se bhi chatting kar sake") */}
          <button
            onClick={handleInstantChat}
            className={`px-4 py-2.5 rounded-2xl flex items-center gap-1.5 font-bold text-xs ${theme.buttonClass} shadow-lg shadow-rose-500/30 transition-all hover:scale-105 active:scale-95`}
            title="Instant Direct Chat (No Waiting)"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Direct Chat</span>
          </button>

          {/* Like button */}
          <button
            onClick={handleLike}
            className="w-12 h-12 rounded-full bg-slate-900/80 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-90"
            title="Like"
          >
            <Heart className="w-6 h-6 stroke-[2.5] fill-emerald-400/20 hover:fill-emerald-400" />
          </button>

        </div>

      </div>
    </div>
  );
};
