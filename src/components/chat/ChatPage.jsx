import React, { useState, useEffect } from 'react';
import { ConversationList } from './ConversationList';
import { ChatRoom } from './ChatRoom';
import { useApp } from '../../context/AppContext';

export const ChatPage = ({ onMobileRoomChange }) => {
  const { activeChatUserId } = useApp();
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'room'

  const handleSelectConversation = () => {
    setMobileView('room');
    onMobileRoomChange?.(true);
  };

  const handleBackToList = () => {
    setMobileView('list');
    onMobileRoomChange?.(false);
  };

  useEffect(() => {
    return () => {
      onMobileRoomChange?.(false);
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-0 md:px-6 lg:px-8 py-0 md:py-6 h-[calc(100dvh-3.5rem)] md:h-[calc(100vh-4.5rem)]">
      
      {/* Desktop Responsive Dual-Pane View */}
      <div className="hidden md:grid md:grid-cols-12 gap-6 h-full">
        {/* Left Column: Conversation Directory */}
        <div className="md:col-span-5 lg:col-span-4 h-full">
          <ConversationList onSelectConversation={handleSelectConversation} />
        </div>

        {/* Right Column: Active Chat Room */}
        <div className="md:col-span-7 lg:col-span-8 h-full">
          <ChatRoom />
        </div>
      </div>

      {/* Mobile Responsive Single-Pane View */}
      <div className="md:hidden h-full">
        {mobileView === 'list' ? (
          <div className="h-full px-2 py-2">
            <ConversationList onSelectConversation={handleSelectConversation} />
          </div>
        ) : (
          <div className="h-full">
            <ChatRoom onBackToList={handleBackToList} />
          </div>
        )}
      </div>

    </div>
  );
};
