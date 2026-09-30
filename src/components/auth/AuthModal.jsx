import React, { useState, useRef } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  ShieldCheck, 
  Upload, 
  Check, 
  AlertCircle,
  Heart,
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { GoogleAuthModal } from './GoogleAuthModal';

export const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80'
];

export const INTEREST_OPTIONS = [
  'Coffee', 'Design', 'Music', 'Fitness', 'Travel', 'Coding', 'Photography', 'Foodie', 'Anime', 'Art', 'Cinema', 'Yoga'
];

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    authPromptMessage,
    loginWithEmail, 
    loginWithGoogle, 
    signUp,
    registeredAccounts
  } = useApp();
  const { theme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign In Form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form state
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    age: 23,
    location: 'Mumbai, Bandra',
    occupation: 'Creative Designer',
    bio: 'Passionate about art, weekend coffee and spontaneous adventures! ✨',
    avatar: AVATAR_PRESETS[0],
    interests: ['Coffee', 'Design', 'Travel', 'Music']
  });

  const fileInputRef = useRef(null);

  if (!isAuthModalOpen) return null;

  // Handle Sign In submission
  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = loginWithEmail(signInEmail.trim(), signInPassword);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid email or password.');
      return;
    }
    setIsAuthModalOpen(false);
  };

  // Handle Sign Up submission
  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (signUpData.age < 18) {
      setErrorMsg('You must be at least 18 years old to join AURA.');
      return;
    }

    const res = signUp(signUpData);
    if (!res.success) {
      setErrorMsg(res.error || 'Could not create account.');
      return;
    }
    setIsAuthModalOpen(false);
  };

  // Google OAuth Success callback
  const handleGoogleAccountSelected = (googleProfile) => {
    setIsGoogleModalOpen(false);
    loginWithGoogle(googleProfile);
    setIsAuthModalOpen(false);
  };

  // Quick Demo Logins
  const handleQuickDemoLogin = (email, password) => {
    setSignInEmail(email);
    setSignInPassword(password);
    const res = loginWithEmail(email, password);
    if (res.success) {
      setIsAuthModalOpen(false);
    }
  };

  // Handle local image file upload for avatar
  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignUpData(prev => ({ ...prev, avatar: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle interest tags
  const toggleInterest = (tag) => {
    setSignUpData(prev => {
      const exists = prev.interests.includes(tag);
      return {
        ...prev,
        interests: exists ? prev.interests.filter(t => t !== tag) : [...prev.interests, tag]
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div 
        className={`w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 relative ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/30 mb-3 animate-pulse">
            <Flame className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {authModalTab === 'signin' ? 'Welcome Back to AURA' : 'Create Your AURA Account'}
          </h2>
          <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">
            {authPromptMessage || 'Connect authentically, chat freely, and discover real sparks.'}
          </p>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 mb-6">
          <button
            onClick={() => {
              setAuthModalTab('signin');
              setErrorMsg('');
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              authModalTab === 'signin'
                ? `${theme.buttonClass} shadow-md`
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthModalTab('signup');
              setErrorMsg('');
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              authModalTab === 'signup'
                ? `${theme.buttonClass} shadow-md`
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign Up (Join)
          </button>
        </div>

        {/* Official Google Sign-in Button */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setIsGoogleModalOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] border border-slate-200"
          >
            {/* Google SVG Logo */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-slate-900/90 px-3 text-[11px] uppercase tracking-wider text-gray-400 absolute">
              or continue with email
            </span>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {authModalTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="you@aura.dating or gmail.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-600 accent-rose-500"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert("Forgot password instructions sent to your email (Simulated).")}
                  className="hover:text-rose-400 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm ${theme.buttonClass} transition-transform active:scale-95 shadow-md`}
              >
                Sign In to AURA
              </button>

              {/* 1-Click Quick Demo Accounts */}
              <div className="pt-3 border-t border-white/10">
                <p className="text-[10px] uppercase font-bold text-gray-400 text-center mb-2">
                  ⚡ Quick Demo Accounts (1-Click Login):
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('dev@aura.dating', 'password123')}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium border border-white/10 transition-colors"
                  >
                    👨‍💻 Dev Maverick
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('alex.rivera.dev@gmail.com', 'google_oauth_token')}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium border border-white/10 transition-colors"
                  >
                    ✨ Alex Rivera (Google)
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* SIGN UP FORM */}
          {authModalTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              
              {/* Profile Photo Picker */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Choose Profile Photo (Avatar)
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative group shrink-0">
                    <img
                      src={signUpData.avatar}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-rose-500 shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center text-white transition-opacity"
                      title="Upload custom photo"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarFile}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Preset Avatars Row */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {AVATAR_PRESETS.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="preset"
                        onClick={() => setSignUpData({ ...signUpData, avatar: url })}
                        className={`w-10 h-10 rounded-xl object-cover cursor-pointer transition-all ${
                          signUpData.avatar === url
                            ? 'ring-2 ring-rose-400 scale-105'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                      placeholder="e.g. Samarth Kapoor"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Age (18+)</label>
                  <input
                    type="number"
                    value={signUpData.age}
                    onChange={(e) => setSignUpData({ ...signUpData, age: Number(e.target.value) })}
                    min="18"
                    max="99"
                    className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                    required
                  />
                </div>
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      placeholder="samarth@gmail.com"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      placeholder="Min 6 characters"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                      required
                      minLength={6}
                    />
                  </div>
                </div>
              </div>

              {/* City & Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Location / City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={signUpData.location}
                      onChange={(e) => setSignUpData({ ...signUpData, location: e.target.value })}
                      placeholder="Mumbai, Bandra West"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Occupation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={signUpData.occupation}
                      onChange={(e) => setSignUpData({ ...signUpData, occupation: e.target.value })}
                      placeholder="Product Designer / Engineer"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                    />
                  </div>
                </div>
              </div>

              {/* Dating Bio */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Your Bio</label>
                <textarea
                  value={signUpData.bio}
                  onChange={(e) => setSignUpData({ ...signUpData, bio: e.target.value })}
                  rows="2"
                  placeholder="Share what makes you smile, your hobbies, or favorite spots..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
                />
              </div>

              {/* Interests Tags */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Select Interests & Hobbies
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {INTEREST_OPTIONS.map((tag) => {
                    const isSelected = signUpData.interests.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleInterest(tag)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                          isSelected
                            ? 'bg-rose-500 text-white shadow-sm'
                            : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Sign Up Button */}
              <button
                type="submit"
                className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm ${theme.buttonClass} transition-transform active:scale-95 shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Dating Account & Start Exploring</span>
              </button>

            </form>
          )}

        </div>

      </div>

      {/* Google OAuth Account Picker Modal */}
      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectAccount={handleGoogleAccountSelected}
      />
    </div>
  );
};
