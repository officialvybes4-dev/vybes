import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { ThemePickerModal } from './components/common/ThemePickerModal';
import { MatchCelebrationModal } from './components/common/MatchCelebrationModal';
import { ImageModal } from './components/common/ImageModal';
import { UserSwitcherModal } from './components/profile/UserSwitcherModal';
import { AuthModal } from './components/auth/AuthModal';
import { ExplorePage } from './components/explore/ExplorePage';
import { ChatPage } from './components/chat/ChatPage';
import { LikesPage } from './components/likes/LikesPage';
import { MyProfilePage } from './components/profile/MyProfilePage';
import { Smartphone, Monitor } from 'lucide-react';

const DatingAppContent = () => {
  const { activeTab } = useApp();
  const { theme, deviceMode, setDeviceMode } = useTheme();

  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [isMobileRoomActive, setIsMobileRoomActive] = useState(false);
  const [isRealMobileScreen, setIsRealMobileScreen] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsRealMobileScreen(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Render the current view
  const renderCurrentView = () => {
    switch (activeTab) {
      case 'explore':
        return <ExplorePage />;
      case 'chats':
        return <ChatPage onMobileRoomChange={setIsMobileRoomActive} />;
      case 'likes':
        return <LikesPage />;
      case 'profile':
        return (
          <MyProfilePage
            onOpenThemePicker={() => setIsThemePickerOpen(true)}
            onOpenPersonaModal={() => setIsPersonaModalOpen(true)}
          />
        );
      default:
        return <ExplorePage />;
    }
  };

  // If user is on an actual mobile device, always render native full screen without the desktop mockup frame
  const showDeviceFrame = deviceMode === 'mobile-frame' && !isRealMobileScreen;

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans selection:bg-rose-500 selection:text-white ${theme.bgClass}`}>
      
      {/* Device Frame Simulator Container (Desktop Testing Only) */}
      {showDeviceFrame ? (
        <div className="min-h-screen py-6 px-4 flex flex-col items-center justify-center bg-black/95">
          
          {/* Top Frame Controller */}
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-rose-400" />
              <span>iPhone 16 Pro Preview Simulator</span>
            </span>
            <button
              onClick={() => setDeviceMode('web')}
              className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Switch to Desktop Web
            </button>
          </div>

          {/* iPhone Frame Simulator */}
          <div className="w-[390px] h-[844px] rounded-[50px] border-[9px] border-zinc-800 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden relative flex flex-col bg-slate-950 ring-1 ring-white/20">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3">
              <div className="w-2 h-2 rounded-full bg-slate-900 border border-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-blue-950/60 ring-1 ring-cyan-500/40"></div>
            </div>

            {/* Inner Phone Viewport */}
            <div className={`flex-1 flex flex-col overflow-hidden relative pt-6 ${theme.bgClass}`}>
              <Navbar
                onOpenThemePicker={() => setIsThemePickerOpen(true)}
                onOpenPersonaModal={() => setIsPersonaModalOpen(true)}
              />
              <main className="flex-1 overflow-y-auto">
                {renderCurrentView()}
              </main>
              <BottomNav isHidden={activeTab === 'chats' && isMobileRoomActive} />
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-50"></div>
          </div>
        </div>
      ) : (
        /* Full Native App / Responsive Web Layout */
        <div className="min-h-screen flex flex-col">
          <Navbar
            onOpenThemePicker={() => setIsThemePickerOpen(true)}
            onOpenPersonaModal={() => setIsPersonaModalOpen(true)}
          />

          <main className="flex-1 pb-16 md:pb-6">
            {renderCurrentView()}
          </main>

          {/* BottomNav hides automatically when inside a direct mobile chat room */}
          <BottomNav isHidden={activeTab === 'chats' && isMobileRoomActive} />
        </div>
      )}

      {/* Global Modals */}
      <ThemePickerModal
        isOpen={isThemePickerOpen}
        onClose={() => setIsThemePickerOpen(false)}
      />

      <UserSwitcherModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
      />

      <AuthModal />
      <MatchCelebrationModal />
      <ImageModal />

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <DatingAppContent />
      </AppProvider>
    </ThemeProvider>
  );
}
