import React, { useState } from 'react';
import { 
  User, 
  Edit3, 
  Camera, 
  Sparkles, 
  Check, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  Plus, 
  X,
  Palette,
  Users,
  QrCode,
  Volume2,
  VolumeX,
  EyeOff,
  Zap,
  Moon,
  Smile
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';
import { QrShareModal } from '../features/QrShareModal';
import { VerificationModal } from '../features/VerificationModal';
import { LoveTarotModal } from '../features/LoveTarotModal';

const VIBE_STATUSES = [
  'Craving boba & deep talks 🧋',
  'Looking for a concert buddy 🎸',
  'Sunset drive & cozy chai ☕',
  'Spontaneous weekend roadtrip 🚗',
  'Need sushi & anime recs 🍣',
  'Gym partner & workout vibes 🏋️'
];

export const MyProfilePage = ({ onOpenThemePicker, onOpenPersonaModal }) => {
  const { currentUser, updateUserProfile, triggerConfetti } = useApp();
  const { theme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    age: currentUser.age,
    location: currentUser.location,
    occupation: currentUser.occupation || '',
    bio: currentUser.bio,
    avatar: currentUser.avatar,
    interests: currentUser.interests || [],
    vibeStatus: currentUser.vibeStatus || VIBE_STATUSES[0],
    incognito: currentUser.incognito || false
  });

  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isTarotOpen, setIsTarotOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);
  const [newTag, setNewTag] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
    sounds.playSuccess();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleAddTag = () => {
    if (!newTag.trim() || formData.interests.includes(newTag.trim())) return;
    setFormData(prev => ({
      ...prev,
      interests: [...prev.interests, newTag.trim()]
    }));
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(t => t !== tagToRemove)
    }));
  };

  const toggleSound = () => {
    const nextState = sounds.toggleSound();
    setSoundEnabled(nextState);
  };

  const handleSelectVibe = (vibe) => {
    sounds.playPop();
    setFormData(prev => ({ ...prev, vibeStatus: vibe }));
    updateUserProfile({ vibeStatus: vibe });
    triggerConfetti();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-xl animate-fadeIn flex items-center gap-2">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className={`p-5 sm:p-8 rounded-3xl border relative overflow-hidden ${theme.cardBg}`}>
        
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <User className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">Your Dating Profile</h1>
              <p className="text-xs text-gray-400">Manage VIP pass, biometric verification & preferences</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sound Effects Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl text-xs font-semibold border flex items-center gap-1 transition-colors ${
                soundEnabled ? 'bg-white/10 text-white border-white/20' : 'bg-white/5 text-gray-400 border-white/10'
              }`}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
            </button>

            {/* VIP Pass Modal */}
            <button
              onClick={() => setIsQrOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 text-rose-300 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-rose-400" />
              <span>VIP Pass</span>
            </button>

            <button
              onClick={onOpenPersonaModal}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>Persona</span>
            </button>

            <button
              onClick={onOpenThemePicker}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span>Theme</span>
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isEditing ? 'bg-white/10 text-white' : `${theme.buttonClass} shadow-md`
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>
        </div>

        {/* Profile Content View / Edit Mode */}
        {!isEditing ? (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Avatar & Photo Showcase */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover ring-4 ring-rose-500/40 shadow-2xl"
                />
                {currentUser.verified ? (
                  <span className="absolute bottom-2 right-2 p-1.5 bg-blue-500 rounded-full text-white shadow-md" title="Verified Human">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                ) : (
                  <button
                    onClick={() => setIsVerificationOpen(true)}
                    className="absolute bottom-2 right-2 px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-full shadow-lg flex items-center gap-1 animate-pulse"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>Get Verified</span>
                  </button>
                )}
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-extrabold text-white">
                  {currentUser.name}, {currentUser.age}
                </h2>
                <p className="text-xs text-rose-400 font-medium mt-0.5">{currentUser.occupation}</p>
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{currentUser.location}</span>
                </p>
              </div>

              {/* Vibe Status Pill */}
              <div className="mt-3 px-3 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-amber-300 font-medium max-w-xs">
                {currentUser.vibeStatus || 'Looking for good banter & coffee ✨'}
              </div>
            </div>

            {/* Profile Bio & Details */}
            <div className="md:col-span-8 space-y-4">
              
              {/* Daily Mood / Vibe Status Quick Picker (Feature #21) */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5" />
                  <span>Today's Dating Mood & Vibe</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {VIBE_STATUSES.map((vibe, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectVibe(vibe)}
                      className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                        (currentUser.vibeStatus || VIBE_STATUSES[0]) === vibe
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm'
                          : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {vibe}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Bio</h3>
                <p className="text-sm text-gray-200 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                  {currentUser.bio}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Interests & Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests?.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${theme.highlightBadge}`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Feature Launchers Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setIsVerificationOpen(true)}
                  className="p-3.5 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white">AI Face Verification</h4>
                      <p className="text-[10px] text-gray-400">Unlock official verified shield</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase">
                    {currentUser.verified ? 'Verified ✓' : 'Scan'}
                  </span>
                </button>

                <button
                  onClick={() => setIsTarotOpen(true)}
                  className="p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Moon className="w-5 h-5 text-amber-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Daily Love Tarot</h4>
                      <p className="text-[10px] text-gray-400">Draw Cupid's daily oracle</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Draw</span>
                </button>
              </div>

            </div>

          </div>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSave} className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Display Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                  min="18"
                  max="99"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Occupation / Title</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">City / Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Avatar Image URL</label>
              <input
                type="text"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows="3"
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Interests</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add interest (e.g. Hiking, Sushi, Anime)..."
                  className={`flex-1 px-3.5 py-2 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {formData.interests.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-white flex items-center gap-1.5"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-400 hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-xl text-xs font-bold ${theme.buttonClass} shadow-md`}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Feature Modals */}
      <QrShareModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        user={currentUser}
      />

      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
      />

      <LoveTarotModal
        isOpen={isTarotOpen}
        onClose={() => setIsTarotOpen(false)}
      />

    </div>
  );
};
