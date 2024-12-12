import { createContext, useContext, useState, useEffect } from 'react';
import type { FitnessMetrics, DailyMetrics } from '../types/fitness';
import type { UserProfile, UserSettings } from '../types/user';

interface FitnessContextType {
  dailyMetrics: Record<string, FitnessMetrics>;
  currentProfile: UserProfile | null;
  userSettings: UserSettings | null;
  likedPosts: Set<string>;
  updateDailyMetrics: (date: string, metrics: FitnessMetrics) => void;
  updateProfile: (profile: UserProfile) => void;
  updateSettings: (settings: UserSettings) => void;
  togglePostLike: (postId: string) => void;
}

const FitnessContext = createContext<FitnessContextType | null>(null);

export function FitnessProvider({ children }: { children: React.ReactNode }) {
  const [dailyMetrics, setDailyMetrics] = useState<Record<string, FitnessMetrics>>({});
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedMetrics = localStorage.getItem('dailyMetrics');
    const loadedProfile = localStorage.getItem('userProfile');
    const loadedSettings = localStorage.getItem('userSettings');
    const loadedLikes = localStorage.getItem('likedPosts');

    if (loadedMetrics) setDailyMetrics(JSON.parse(loadedMetrics));
    if (loadedProfile) setCurrentProfile(JSON.parse(loadedProfile));
    if (loadedSettings) setUserSettings(JSON.parse(loadedSettings));
    if (loadedLikes) setLikedPosts(new Set(JSON.parse(loadedLikes)));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('dailyMetrics', JSON.stringify(dailyMetrics));
  }, [dailyMetrics]);

  useEffect(() => {
    if (currentProfile) {
      localStorage.setItem('userProfile', JSON.stringify(currentProfile));
    }
  }, [currentProfile]);

  useEffect(() => {
    if (userSettings) {
      localStorage.setItem('userSettings', JSON.stringify(userSettings));
    }
  }, [userSettings]);

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify([...likedPosts]));
  }, [likedPosts]);

  const updateDailyMetrics = (date: string, metrics: FitnessMetrics) => {
    setDailyMetrics(prev => ({
      ...prev,
      [date]: metrics
    }));
  };

  const updateProfile = (profile: UserProfile) => {
    setCurrentProfile(profile);
  };

  const updateSettings = (settings: UserSettings) => {
    setUserSettings(settings);
  };

  const togglePostLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(postId)) {
        newLikes.delete(postId);
      } else {
        newLikes.add(postId);
      }
      return newLikes;
    });
  };

  return (
    <FitnessContext.Provider value={{
      dailyMetrics,
      currentProfile,
      userSettings,
      likedPosts,
      updateDailyMetrics,
      updateProfile,
      updateSettings,
      togglePostLike,
    }}>
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
}