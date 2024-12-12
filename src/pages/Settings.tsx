import { useEffect } from 'react';
import type { UserProfile, UserSettings } from '../types/user';
import { useFitness } from '../context/FitnessContext';
import ProfileSection from '../components/settings/ProfileSection';
import GoalsSection from '../components/settings/GoalsSection';
import PreferencesSection from '../components/settings/PreferencesSection';

const defaultSettings: UserSettings = {
  goals: {
    waterIntake: 2.5,
    steps: 10000,
    sleepHours: 8,
    exerciseCount: 3,
  },
  notifications: true,
  theme: 'dark',
};

export default function Settings() {
  const { currentProfile, userSettings, updateProfile, updateSettings } = useFitness();

  useEffect(() => {
    if (!userSettings) {
      updateSettings(defaultSettings);
    }
  }, [userSettings, updateSettings]);

  const handleProfileUpdate = (profile: UserProfile) => {
    updateProfile(profile);
  };

  const handleSettingsUpdate = (settings: UserSettings) => {
    updateSettings(settings);
  };

  if (!userSettings) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <div className="grid grid-cols-1 gap-6">
        <ProfileSection
          profile={currentProfile || { id: '', name: '', age: 0, height: 0, weight: 0, avatar: '' }}
          onUpdate={handleProfileUpdate}
        />
        <GoalsSection settings={userSettings} onUpdate={handleSettingsUpdate} />
        <PreferencesSection settings={userSettings} onUpdate={handleSettingsUpdate} />
      </div>
    </div>
  );
}