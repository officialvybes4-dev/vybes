import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FilterBar } from './FilterBar';
import { SwipeDeck } from './SwipeDeck';
import { ProfileGrid } from './ProfileGrid';
import { ProfileDetailModal } from './ProfileDetailModal';

export const ExplorePage = () => {
  const { users, exploreView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [onlineOnly, setOnlineOnly] = useState(false);

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
      
      {/* Top Controls & Search */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        onlineOnly={onlineOnly}
        setOnlineOnly={setOnlineOnly}
      />

      {/* Main View Area */}
      {exploreView === 'swipe' ? (
        <SwipeDeck users={filteredUsers} />
      ) : (
        <ProfileGrid users={filteredUsers} />
      )}

      {/* Detailed Profile Modal */}
      <ProfileDetailModal />

    </div>
  );
};
