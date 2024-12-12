import type { LeaderboardEntry } from '../../types/fitness';
import { Trophy } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="bg-navy-900 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-6 w-6 text-green-400" />
        <h2 className="text-xl font-semibold text-white">Leaderboard</h2>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div
            key={entry.userId}
            className="flex items-center gap-4 bg-navy-800 rounded-lg p-4"
          >
            <span className="text-2xl font-bold text-green-400">#{index + 1}</span>
            <img
              src={entry.avatar}
              alt={entry.username}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{entry.username}</h3>
              <p className="text-sm text-gray-400">{entry.streak} day streak</p>
            </div>
            <span className="text-lg font-semibold text-green-400">
              {entry.totalPoints} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}