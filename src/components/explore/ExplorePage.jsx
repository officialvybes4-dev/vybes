import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FilterBar } from './FilterBar';
import { SwipeDeck } from './SwipeDeck';
import { ProfileGrid } from './ProfileGrid';
import { ProfileDetailModal } from './ProfileDetailModal';
import { VybesRadarModal } from '../features/VybesRadarModal';
import { BlindDateModal } from '../features/BlindDateModal';
import { PassportModal } from '../features/PassportModal';
import { LoveTarotModal } from '../features/LoveTarotModal';
import { BoostModal } from '../features/BoostModal';
import { VerificationModal } from '../features/VerificationModal';

export const ExplorePage = () => {
  const { users, exploreView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [onlineOnly, setOnlineOnly] = useState(false);

  // Elite 20+ feature modals state
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const [isBlindDateOpen, setIsBlindDateOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isTarotOpen, setIsTarotOpen] = useState(false);
  const [isBoostOpen, setIsBoostOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  // Filter profiles based on user controls
  const filteredUsers = users.filter((user) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = user.name.toLowerCase().includes(q);
      const matchLocation = user.location.toLowerCase().includes(q);
      const matchOccupation = user.occupation?.toLowerCase().includes(q);
      const matchInterests = user.interests?.some(i => i.toLowerCase().includes(q));
      if (!matchName && !matchLocation && !matchOccupation && !matchInterests) {
        return false;
      }
    }

    // Tag filter
    if (selectedTag) {
      const hasTag = user.interests?.some(
        i => i.toLowerCase() === selectedTag.toLowerCase()
      );
      if (!hasTag) return false;
    }

    // Online only
    if (onlineOnly && !user.online) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-6">
      
      {/* Top Controls & 20+ Features Launcher */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        onlineOnly={onlineOnly}
        setOnlineOnly={setOnlineOnly}
        onOpenRadar={() => setIsRadarOpen(true)}
        onOpenBlindDate={() => setIsBlindDateOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenTarot={() => setIsTarotOpen(true)}
        onOpenBoost={() => setIsBoostOpen(true)}
        onOpenVerification={() => setIsVerificationOpen(true)}
      />

      {/* Main View Area */}
      {exploreView === 'swipe' ? (
        <SwipeDeck users={filteredUsers} />
      ) : (
        <ProfileGrid users={filteredUsers} />
      )}

      {/* Detailed Profile Modal */}
      <ProfileDetailModal />

      {/* 20+ Feature Modals */}
      <VybesRadarModal
        isOpen={isRadarOpen}
        onClose={() => setIsRadarOpen(false)}
      />

      <BlindDateModal
        isOpen={isBlindDateOpen}
        onClose={() => setIsBlindDateOpen(false)}
      />

      <PassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
      />

      <LoveTarotModal
        isOpen={isTarotOpen}
        onClose={() => setIsTarotOpen(false)}
      />

      <BoostModal
        isOpen={isBoostOpen}
        onClose={() => setIsBoostOpen(false)}
      />

      <VerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
      />

    </div>
  );
};
