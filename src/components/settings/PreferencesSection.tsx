import { Bell, Moon } from 'lucide-react';
import type { UserSettings } from '../../types/user';

interface PreferencesSectionProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
}

export default function PreferencesSection({ settings, onUpdate }: PreferencesSectionProps) {
  return (
    <div className="bg-navy-900 rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold text-white">Preferences</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-navy-800 rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-green-400" />
            <span className="text-white">Notifications</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => onUpdate({ ...settings, notifications: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-navy-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-navy-800 rounded-lg">
          <div className="flex items-center gap-3">
            <Moon className="h-5 w-5 text-green-400" />
            <span className="text-white">Dark Mode</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.theme === 'dark'}
              onChange={(e) => onUpdate({ ...settings, theme: e.target.checked ? 'dark' : 'light' })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-navy-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
          </label>
        </div>
      </div>
    </div>
  );
}