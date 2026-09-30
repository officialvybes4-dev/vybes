import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  MessageCircle, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  MapPin,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export const LikesPage = () => {
  const { 
    users, 
    likesReceived, 
    matches, 
    likesGiven, 
    likeUser, 
    startChatWith, 
    setDetailUser 
  } = useApp();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState('received'); // 'received' | 'matches' | 'sent'
  const [isUnlocked, setIsUnlocked] = useState(true);

  // Users who liked me
  const receivedUsers = users.filter(u => likesReceived.includes(u.id));
  // Mutual matches
  const matchUsers = users.filter(u => matches.includes(u.id));
  // Sent likes
  const sentUsers = users.filter(u => likesGiven.includes(u.id));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${theme.cardBg}`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 text-white shadow-lg shadow-rose-500/30">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Likes & Matches Activity
            </h1>
            <p className="text-xs text-gray-400">
              See who is interested in you and connect immediately.
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/30 border border-white/10 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('received')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'received' ? `${theme.buttonClass} shadow-md` : 'text-gray-400 hover:text-white'
            }`}
          >
            Liked You ({receivedUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'matches' ? `${theme.buttonClass} shadow-md` : 'text-gray-400 hover:text-white'
            }`}
          >
            Matches ({matchUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'sent' ? `${theme.buttonClass} shadow-md` : 'text-gray-400 hover:text-white'
            }`}
          >
            Sent ({sentUsers.length})
          </button>
        </div>
      </div>

      {/* Grid of Profiles based on Tab */}
      {activeTab === 'received' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {receivedUsers.map((user) => {
            const isMatch = matches.includes(user.id);
            return (
              <div
                key={user.id}
                onClick={() => setDetailUser(user)}
                className={`group rounded-3xl overflow-hidden border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${theme.cardBg} ${theme.cardHover}`}
              >
                <div className="relative w-full h-72 overflow-hidden bg-black">
                  <img
                    src={user.photos ? user.photos[0] : user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                    <Heart className="w-3 h-3 fill-white" />
                    <span>Liked You!</span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
                      {user.name}, {user.age}
                      {user.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />}
                    </h3>
                    <p className="text-[11px] text-gray-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{user.location}</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-gray-300 line-clamp-2">{user.bio}</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    {!isMatch ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          likeUser(user.id);
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${theme.buttonClass} transition-transform active:scale-95`}
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        <span>Match Back</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startChatWith(user.id);
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${theme.buttonClass} transition-transform active:scale-95`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat Now</span>
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startChatWith(user.id);
                      }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      title="Direct Chat"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {matchUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setDetailUser(user)}
              className={`group rounded-3xl overflow-hidden border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${theme.cardBg} ${theme.cardHover}`}
            >
              <div className="relative w-full h-72 overflow-hidden bg-black">
                <img
                  src={user.photos ? user.photos[0] : user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>Mutual Match</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
                    {user.name}, {user.age}
                  </h3>
                  <p className="text-[11px] text-gray-300">{user.location}</p>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startChatWith(user.id);
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${theme.buttonClass} transition-transform active:scale-95`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open Direct Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sent' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {sentUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setDetailUser(user)}
              className={`group rounded-3xl overflow-hidden border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${theme.cardBg} ${theme.cardHover}`}
            >
              <div className="relative w-full h-72 overflow-hidden bg-black">
                <img
                  src={user.photos ? user.photos[0] : user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  <span>You Liked</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white">{user.name}, {user.age}</h3>
                  <p className="text-[11px] text-gray-300">{user.location}</p>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startChatWith(user.id);
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${theme.buttonClass} transition-transform active:scale-95`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
