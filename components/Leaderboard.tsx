
import React from 'react';
import { User } from '../types';
import { TrophyIcon } from './Icons';

interface LeaderboardProps {
  users: User[];
  currentUserId: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUserId }) => {
  const getRankColor = (rank: number) => {
    if (rank === 0) return 'text-yellow-500';
    if (rank === 1) return 'text-gray-400';
    if (rank === 2) return 'text-yellow-700';
    return 'text-brand-text-light';
  };

  return (
    <div className="bg-brand-surface rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <TrophyIcon className="text-yellow-500" />
        <h2 className="text-3xl font-extrabold text-brand-text ml-3">Ranking de Aventureiros</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="p-4 text-sm font-bold uppercase text-brand-text-light">Pos.</th>
              <th className="p-4 text-sm font-bold uppercase text-brand-text-light">Nome</th>
              <th className="p-4 text-sm font-bold uppercase text-brand-text-light text-center">Nível</th>
              <th className="p-4 text-sm font-bold uppercase text-brand-text-light text-right">XP</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-100 last:border-b-0 ${user.id === currentUserId ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
              >
                <td className={`p-4 font-bold text-lg ${getRankColor(index)}`}>{index + 1}</td>
                <td className="p-4 font-bold text-brand-text">{user.name}</td>
                <td className="p-4 font-bold text-brand-text-light text-center">{user.level}</td>
                <td className="p-4 font-bold text-brand-primary text-right">{user.xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
