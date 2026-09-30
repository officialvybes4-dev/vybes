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
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const MyProfilePage = ({ onOpenThemePicker, onOpenPersonaModal }) => {
  const { currentUser, updateUserProfile } = useApp();
  const { theme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    age: currentUser.age,
    location: currentUser.location,
    occupation: currentUser.occupation || '',
    bio: currentUser.bio,
    avatar: currentUser.avatar,
    interests: currentUser.interests || []
  });

  const [newTag, setNewTag] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-xl animate-fadeIn flex items-center gap-2">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${theme.cardBg}`}>
        
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <User className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">Your Dating Profile</h1>
              <p className="text-xs text-gray-400">Manage how prospective matches discover you</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPersonaModal}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>Switch Persona</span>
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
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Profile Content View / Edit Mode */}
        {!isEditing ? (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Avatar & Photo Showcase */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover ring-4 ring-rose-500/40 shadow-2xl"
                />
                {currentUser.verified && (
                  <span className="absolute bottom-2 right-2 p-1.5 bg-blue-500 rounded-full text-white shadow-md">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
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
            </div>

            {/* Profile Bio & Details */}
            <div className="md:col-span-8 space-y-5">
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

              {/* Dating Verification Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-500/10 to-amber-500/20 border border-rose-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/30 text-rose-300">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Verified Authentic Dating Profile</h4>
                    <p className="text-[11px] text-gray-300">Your profile is 100% verified for direct chats</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  Active
                </span>
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

    </div>
  );
};
