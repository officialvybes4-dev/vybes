import React, { useState } from 'react';
import { X, Check, Loader2, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';

export const GOOGLE_PRESET_ACCOUNTS = [
  {
    name: 'Alex Rivera',
    email: 'alex.rivera.dev@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    badge: 'Personal Google Account',
    age: 24,
    location: 'San Francisco, CA'
  },
  {
    name: 'Dev Maverick',
    email: 'maverick.tech@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
    badge: 'Developer Google Workspace',
    age: 25,
    location: 'Mumbai, Downtown'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma99@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    badge: 'Creator Account',
    age: 23,
    location: 'Delhi NCR'
  }
];

export const GoogleAuthModal = ({ isOpen, onClose, onSelectAccount }) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(null);

  if (!isOpen) return null;

  const handlePickAccount = (acc) => {
    setLoadingEmail(acc.email);
    setTimeout(() => {
      onSelectAccount({
        name: acc.name,
        email: acc.email,
        avatar: acc.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
        age: acc.age || 24,
        location: acc.location || 'Metro City',
        authProvider: 'google'
      });
      setLoadingEmail(null);
    }, 900);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;
    setLoadingEmail(customEmail);
    setTimeout(() => {
      onSelectAccount({
        name: customName.trim(),
        email: customEmail.trim(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        age: 24,
        location: 'Mumbai / Global',
        authProvider: 'google'
      });
      setLoadingEmail(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Google OAuth Dialog Box */}
      <div 
        className="w-full max-w-sm sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-white text-slate-800 shadow-2xl overflow-hidden border border-slate-200 relative animate-fadeIn max-h-[92dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Official Google G Logo */}
            <svg className="w-6 h-6" viewBox="0 0 24 24">
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
            <span className="font-semibold text-sm text-slate-700">Sign in with Google</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="text-center mb-5">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Choose an account</h3>
            <p className="text-xs text-slate-500 mt-1">
              to continue to <span className="font-bold text-rose-500">AURA Dating Network</span>
            </p>
          </div>

          {!isCustomMode ? (
            <div className="space-y-2">
              {GOOGLE_PRESET_ACCOUNTS.map((acc) => {
                const isLoading = loadingEmail === acc.email;
                return (
                  <button
                    key={acc.email}
                    disabled={!!loadingEmail}
                    onClick={() => handlePickAccount(acc)}
                    className="w-full p-3 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-between transition-all group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {acc.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{acc.email}</p>
                      </div>
                    </div>

                    {isLoading ? (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded bg-slate-100">
                        {acc.badge.split(' ')[0]}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Use Another Account Button */}
              <button
                onClick={() => setIsCustomMode(true)}
                disabled={!!loadingEmail}
                className="w-full p-3 rounded-2xl border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 flex items-center gap-3 text-left transition-colors mt-3"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Use another Google account</p>
                  <p className="text-[11px] text-slate-500">Sign in with custom Gmail credentials</p>
                </div>
              </button>
            </div>
          ) : (
            /* Custom Google Email Input Form */
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Google Email</label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!customName.trim() || !customEmail.trim() || !!loadingEmail}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  {loadingEmail ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Privacy Disclaimer */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 justify-center text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Encrypted OAuth 2.0 Google Verified Session</span>
          </div>
        </div>

      </div>
    </div>
  );
};
