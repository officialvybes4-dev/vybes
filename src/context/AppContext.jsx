import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_USERS, CURRENT_USER } from '../data/mockUsers';
import { INITIAL_CHATS, PERSONA_RESPONSES, SAMPLE_PHOTOS } from '../data/initialChats';

const AppContext = createContext();

export const DEFAULT_ACCOUNTS = [
  {
    id: 'me',
    name: 'Dev Maverick',
    email: 'dev@aura.dating',
    password: 'password123',
    age: 25,
    location: 'Downtown City Center',
    bio: 'Full-stack builder, tech enthusiast & night owl. Building cool products, love music, hiking and good coffee! ✨💻',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
    occupation: 'Lead Engineer & Founder',
    interests: ['Coding', 'Startups', 'Travel', 'Gaming', 'Coffee', 'Music'],
    authProvider: 'email',
    verified: true
  },
  {
    id: 'google-alex',
    name: 'Alex Rivera',
    email: 'alex.rivera.dev@gmail.com',
    password: 'google_oauth_token',
    age: 24,
    location: 'San Francisco, CA',
    bio: 'Google verified developer & creative soul. Lover of photography, good music & warm espresso. 📸☕',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    occupation: 'Frontend Architect',
    interests: ['Design', 'Coffee', 'Photography', 'Travel'],
    authProvider: 'google',
    verified: true
  }
];

export const AppProvider = ({ children }) => {
  // Profiles
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('aura_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Registered Accounts
  const [registeredAccounts, setRegisteredAccounts] = useState(() => {
    const saved = localStorage.getItem('aura_accounts');
    return saved ? JSON.parse(saved) : DEFAULT_ACCOUNTS;
  });

  // Auth Status (defaults to true for smooth start, can logout anytime)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('aura_is_authenticated');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Current active user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('aura_current_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('signin'); // 'signin' | 'signup'
  const [authPromptMessage, setAuthPromptMessage] = useState('');

  // Chat conversations
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('aura_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  // Active chat recipient
  const [activeChatUserId, setActiveChatUserId] = useState('user-1');

  // Active main tab: 'explore' | 'chats' | 'likes' | 'profile'
  const [activeTab, setActiveTab] = useState('explore');

  // Explore sub-view: 'swipe' | 'grid'
  const [exploreView, setExploreView] = useState('swipe');

  // Likes and Matches
  const [likesGiven, setLikesGiven] = useState(['user-1', 'user-2']);
  const [likesReceived, setLikesReceived] = useState(['user-1', 'user-3', 'user-4', 'user-5', 'user-7']);
  const [matches, setMatches] = useState(['user-1', 'user-2']);
  const [dislikes, setDislikes] = useState([]);

  // Match celebration modal state
  const [newMatchUser, setNewMatchUser] = useState(null);

  // Selected profile for full details modal
  const [detailUser, setDetailUser] = useState(null);

  // Lightbox for full screen image viewing
  const [previewImage, setPreviewImage] = useState(null);

  // Typing indicators: { [userId]: boolean }
  const [isTyping, setIsTyping] = useState({});

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('aura_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('aura_accounts', JSON.stringify(registeredAccounts));
  }, [registeredAccounts]);

  useEffect(() => {
    localStorage.setItem('aura_is_authenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('aura_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('aura_chats', JSON.stringify(chats));
  }, [chats]);

  // Trigger celebration fireworks
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#fbbf24']
      });
    } catch {}
  };

  // Open Auth Modal with custom prompt
  const openAuthModal = (tab = 'signin', promptMsg = '') => {
    setAuthModalTab(tab);
    setAuthPromptMessage(promptMsg);
    setIsAuthModalOpen(true);
  };

  // Login with Email & Password
  const loginWithEmail = (email, password) => {
    const account = registeredAccounts.find(
      a => a.email?.toLowerCase() === email?.toLowerCase()
    );

    if (!account) {
      return { success: false, error: 'No account found with this email. Please Sign Up.' };
    }

    if (account.password && account.password !== password) {
      return { success: false, error: 'Incorrect password. Try password123 or check your input.' };
    }

    // Success
    setCurrentUser(account);
    setIsAuthenticated(true);
    triggerConfetti();
    return { success: true, account };
  };

  // Login with Google OAuth
  const loginWithGoogle = (googleProfile) => {
    let existing = registeredAccounts.find(
      a => a.email?.toLowerCase() === googleProfile.email?.toLowerCase()
    );

    if (!existing) {
      existing = {
        id: 'google-' + Date.now(),
        name: googleProfile.name,
        email: googleProfile.email,
        password: 'google_oauth_token',
        age: googleProfile.age || 24,
        location: googleProfile.location || 'Mumbai, Downtown',
        bio: 'Google verified explorer. Lover of good coffee & deep conversations! ✨',
        avatar: googleProfile.avatar,
        occupation: 'Product Architect',
        interests: ['Tech', 'Design', 'Coffee', 'Travel'],
        authProvider: 'google',
        verified: true
      };

      setRegisteredAccounts(prev => [existing, ...prev]);
    }

    setCurrentUser(existing);
    setIsAuthenticated(true);
    triggerConfetti();
    return { success: true, account: existing };
  };

  // Sign Up new User
  const signUp = (userData) => {
    const existing = registeredAccounts.find(
      a => a.email?.toLowerCase() === userData.email?.toLowerCase()
    );

    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please Sign In.' };
    }

    const newAccount = {
      id: 'usr-' + Date.now(),
      name: userData.name.trim(),
      email: userData.email.trim(),
      password: userData.password,
      age: Number(userData.age) || 23,
      location: userData.location || 'Mumbai',
      bio: userData.bio || 'Hello there! Excited to connect on AURA.',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
      occupation: userData.occupation || 'Creative Explorer',
      interests: userData.interests || ['Coffee', 'Music'],
      authProvider: 'email',
      verified: true
    };

    setRegisteredAccounts(prev => [newAccount, ...prev]);
    setCurrentUser(newAccount);
    setIsAuthenticated(true);
    triggerConfetti();
    return { success: true, account: newAccount };
  };

  // Logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Like a user (Protected: prompts login if logged out)
  const likeUser = (userId) => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Create a free account or Sign In to like profiles and match!');
      return;
    }

    if (!likesGiven.includes(userId)) {
      setLikesGiven(prev => [...prev, userId]);
    }
    // Check if match
    if (likesReceived.includes(userId) && !matches.includes(userId)) {
      setMatches(prev => [...prev, userId]);
      const matchedUser = users.find(u => u.id === userId);
      setNewMatchUser(matchedUser);
      triggerConfetti();
    }
  };

  // Super Like (Protected)
  const superLikeUser = (userId) => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign in to Super Like profiles and get instant matches!');
      return;
    }

    likeUser(userId);
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#fbbf24', '#f59e0b', '#ec4899', '#8b5cf6']
      });
    } catch {}
    
    // Automatically match on super like
    if (!matches.includes(userId)) {
      setMatches(prev => [...prev, userId]);
      const matchedUser = users.find(u => u.id === userId);
      setNewMatchUser(matchedUser);
    }
  };

  // Pass / Dislike
  const passUser = (userId) => {
    if (!dislikes.includes(userId)) {
      setDislikes(prev => [...prev, userId]);
    }
  };

  // Open direct chat with ANY user
  const startChatWith = (userId) => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'Sign in to start chatting with anyone on AURA!');
      return;
    }

    if (!chats[userId]) {
      // Create new chat room immediately
      setChats(prev => ({
        ...prev,
        [userId]: {
          userId,
          unreadCount: 0,
          lastActivity: Date.now(),
          messages: [
            {
              id: 'init-' + Date.now(),
              senderId: userId,
              text: `Hey ${currentUser.name}! Glad we connected. Feel free to say hi or send a photo! 😊`,
              timestamp: Date.now(),
              status: 'delivered'
            }
          ]
        }
      }));
    }
    setActiveChatUserId(userId);
    setActiveTab('chats');
  };

  // Send message or photo
  const sendMessage = (recipientId, { text = '', imageUrl = null }) => {
    if (!isAuthenticated) {
      openAuthModal('signin', 'Sign in to send messages or images!');
      return;
    }

    if (!text.trim() && !imageUrl) return;

    const newMessage = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      senderId: 'me',
      text: text.trim(),
      imageUrl: imageUrl || null,
      timestamp: Date.now(),
      status: 'sent'
    };

    setChats(prev => {
      const existingChat = prev[recipientId] || {
        userId: recipientId,
        unreadCount: 0,
        messages: []
      };

      return {
        ...prev,
        [recipientId]: {
          ...existingChat,
          lastActivity: Date.now(),
          messages: [...existingChat.messages, newMessage]
        }
      };
    });

    // Simulate double-check read status after 1s
    setTimeout(() => {
      setChats(prev => {
        const c = prev[recipientId];
        if (!c) return prev;
        return {
          ...prev,
          [recipientId]: {
            ...c,
            messages: c.messages.map(m => m.id === newMessage.id ? { ...m, status: 'read' } : m)
          }
        };
      });
    }, 1000);

    // Simulate smart persona response after 1.5 - 2.5 seconds
    simulatePersonaReply(recipientId, text, !!imageUrl);
  };

  // Persona auto-reply with realistic delay and typing indicator
  const simulatePersonaReply = (recipientId, userText, userSentImage) => {
    setTimeout(() => {
      setIsTyping(prev => ({ ...prev, [recipientId]: true }));
    }, 1200);

    const replyDelay = 2600 + Math.random() * 1200;

    setTimeout(() => {
      setIsTyping(prev => ({ ...prev, [recipientId]: false }));

      const responses = PERSONA_RESPONSES[recipientId] || PERSONA_RESPONSES.default;
      let replyText = responses[Math.floor(Math.random() * responses.length)];
      let replyImage = null;

      if (userSentImage) {
        replyText = `That photo is so cool! Loved it ✨ Here is one from my side:`;
        const randomPhoto = SAMPLE_PHOTOS[Math.floor(Math.random() * SAMPLE_PHOTOS.length)];
        replyImage = randomPhoto.url;
      }

      const replyMsg = {
        id: 'reply-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        senderId: recipientId,
        text: replyText,
        imageUrl: replyImage,
        timestamp: Date.now(),
        status: 'delivered'
      };

      setChats(prev => {
        const existingChat = prev[recipientId] || {
          userId: recipientId,
          unreadCount: 0,
          messages: []
        };

        const isCurrentlyViewing = activeTab === 'chats' && activeChatUserId === recipientId;

        return {
          ...prev,
          [recipientId]: {
            ...existingChat,
            unreadCount: isCurrentlyViewing ? 0 : (existingChat.unreadCount || 0) + 1,
            lastActivity: Date.now(),
            messages: [...existingChat.messages, replyMsg]
          }
        };
      });
    }, replyDelay);
  };

  // Mark active chat as read
  const markChatAsRead = (userId) => {
    setChats(prev => {
      if (!prev[userId]) return prev;
      return {
        ...prev,
        [userId]: {
          ...prev[userId],
          unreadCount: 0
        }
      };
    });
  };

  // Add message reaction
  const addReaction = (userId, messageId, emoji) => {
    setChats(prev => {
      const c = prev[userId];
      if (!c) return prev;
      return {
        ...prev,
        [userId]: {
          ...c,
          messages: c.messages.map(m => {
            if (m.id === messageId) {
              return { ...m, reaction: m.reaction === emoji ? null : emoji };
            }
            return m;
          })
        }
      };
    });
  };

  // Switch persona
  const switchPersona = (targetUserId) => {
    if (targetUserId === 'me') {
      setCurrentUser(CURRENT_USER);
      return;
    }
    const found = users.find(u => u.id === targetUserId);
    if (found) {
      setCurrentUser({
        id: found.id,
        name: found.name,
        age: found.age,
        location: found.location,
        bio: found.bio,
        avatar: found.avatar,
        photos: found.photos,
        occupation: found.occupation,
        interests: found.interests,
        verified: found.verified
      });
    }
  };

  // Update current user profile
  const updateUserProfile = (updatedFields) => {
    setCurrentUser(prev => ({ ...prev, ...updatedFields }));
  };

  // Total unread messages count
  const totalUnreadCount = Object.values(chats).reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        updateUserProfile,
        isAuthenticated,
        registeredAccounts,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        authPromptMessage,
        openAuthModal,
        loginWithEmail,
        loginWithGoogle,
        signUp,
        logout,
        chats,
        activeChatUserId,
        setActiveChatUserId,
        activeTab,
        setActiveTab,
        exploreView,
        setExploreView,
        likesGiven,
        likesReceived,
        matches,
        likeUser,
        superLikeUser,
        passUser,
        dislikes,
        startChatWith,
        sendMessage,
        markChatAsRead,
        addReaction,
        newMatchUser,
        setNewMatchUser,
        detailUser,
        setDetailUser,
        previewImage,
        setPreviewImage,
        isTyping,
        switchPersona,
        totalUnreadCount,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
