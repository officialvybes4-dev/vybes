import React, { useState } from 'react';
import { X, Calendar, MapPin, Sparkles, Clock, Check, Heart, Coffee, Wine, Car, Gamepad2, Utensils, Music } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../lib/soundFx';

const DATE_ACTIVITIES = [
  { id: 'coffee', label: 'Coffee & Banter', icon: Coffee, desc: 'Casual latte & pastry date' },
  { id: 'drinks', label: 'Rooftop Cocktails', icon: Wine, desc: 'Sunset drinks with skyline views' },
  { id: 'drive', label: 'Sunset Long Drive', icon: Car, desc: 'Scenic cruise with our playlist' },
  { id: 'arcade', label: 'Arcade & Bowling', icon: Gamepad2, desc: 'Friendly playful competition' },
  { id: 'dinner', label: 'Candlelight Dinner', icon: Utensils, desc: 'Authentic cuisine & intimate vibes' },
  { id: 'music', label: 'Live Indie Gig', icon: Music, desc: 'Good rhythm, dancing & vibes' }
];

const TIME_SLOTS = [
  'Tonight @ 8:00 PM',
  'Tomorrow @ 7:30 PM',
  'Friday @ 8:30 PM',
  'This Saturday @ 6:00 PM',
  'Sunday Brunch @ 11:30 AM'
];

export const DatePlannerModal = ({ isOpen, onClose, partnerUser }) => {
  const { sendMessage, activeChatUserId } = useApp();
  const { theme } = useTheme();

  const [selectedActivity, setSelectedActivity] = useState(DATE_ACTIVITIES[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [venue, setVenue] = useState('Bandra Artisan Roasters');
  const [note, setNote] = useState("Let's grab a table by the window! First round is on me.");

  if (!isOpen || !partnerUser) return null;

  const handleSendDateInvite = (e) => {
    e.preventDefault();
    sounds.playSuccess();

    // Send formatted invite ticket into the chat
    const invitePayload = {
      text: `🎟️ DATE INVITATION: ${selectedActivity.label}\n📍 Venue: ${venue}\n🕒 Time: ${selectedTime}\n💬 Note: "${note}"`,
      dateInvite: {
        activity: selectedActivity.label,
        venue,
        time: selectedTime,
        note,
        status: 'pending'
      }
    };

    sendMessage(activeChatUserId, invitePayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/15 overflow-hidden shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[85vh] ${theme.cardBg}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                Plan a Date with {partnerUser.name.split(' ')[0]}
              </h3>
              <p className="text-[10px] text-gray-400">Send an interactive RSVP date pass</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendDateInvite} className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Step 1: Select Activity */}
          <div>
            <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block mb-2">
              1. Choose Activity
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DATE_ACTIVITIES.map(act => {
                const Icon = act.icon;
                const isSelected = selectedActivity.id === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setSelectedActivity(act)}
                    className={`p-2.5 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                      isSelected
                        ? 'bg-rose-500/20 border-rose-500/60 shadow-md ring-1 ring-rose-400/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-rose-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{act.label}</p>
                      <p className="text-[9px] text-gray-400 line-clamp-1">{act.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Date & Time */}
          <div>
            <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block mb-2">
              2. When are we going?
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TIME_SLOTS.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedTime === t
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <Clock className="w-3 h-3 inline mr-1" />
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Venue / Location */}
          <div>
            <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block mb-1.5">
              3. Venue or Spot
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-rose-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={venue}
                onChange={e => setVenue(e.target.value)}
                placeholder="e.g. Blue Tokai Roasters / Marine Drive"
                className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
                required
              />
            </div>
          </div>

          {/* Step 4: Personal Icebreaker Note */}
          <div>
            <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block mb-1.5">
              4. Sweet Message
            </label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add a cute note or let them pick the dessert..."
              className="w-full px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Preview Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-amber-500/10 border border-rose-500/30">
            <div className="flex items-center justify-between text-xs text-rose-300 font-bold mb-1">
              <span>🎟️ Date RSVP Pass Preview</span>
              <span className="text-[10px] uppercase font-bold text-amber-400">Pending RSVP</span>
            </div>
            <p className="text-xs text-white font-medium">
              {selectedActivity.label} • {selectedTime}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              📍 {venue}
            </p>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 ${theme.buttonClass} shadow-lg shadow-rose-500/30 active:scale-95 transition-transform`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Send Date Invitation</span>
          </button>
        </form>

      </div>
    </div>
  );
};
