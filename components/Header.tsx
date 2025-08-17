
import React from 'react';
import { User, View, Role } from '../types';
import { LEVELS_XP } from '../constants';
import ProgressBar from './ProgressBar';
import { BookOpenIcon, ChartBarIcon, LogoutIcon, LockIcon } from './Icons';

interface HeaderProps {
  user: User;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  isRankingAvailable: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout, isRankingAvailable }) => {
  const currentLevelXp = LEVELS_XP[user.level - 1] ?? 0;
  const nextLevelXp = LEVELS_XP[user.level] ?? user.xp;
  const xpInLevel = user.xp - currentLevelXp;
  const xpForNextLevel = nextLevelXp - currentLevelXp;
  const progress = xpForNextLevel > 0 ? (xpInLevel / xpForNextLevel) * 100 : 100;

  const isPlayer = user.role === Role.PLAYER;

  return (
    <header className="bg-brand-surface shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center">
           <h1 className="text-xl md:text-2xl font-extrabold text-brand-primary">EduAventura</h1>
        </div>
        
        {isPlayer && (
            <div className="flex-1 mx-4 hidden md:flex justify-center items-center space-x-4">
                <button onClick={() => onNavigate(View.DASHBOARD)} className="flex items-center space-x-2 text-brand-text-light hover:text-brand-primary font-bold transition-colors">
                    <BookOpenIcon />
                    <span>Módulos</span>
                </button>
                <button 
                  onClick={() => onNavigate(View.LEADERBOARD)} 
                  className="flex items-center space-x-2 text-brand-text-light hover:text-brand-primary font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isRankingAvailable}
                  aria-disabled={!isRankingAvailable}
                >
                    <ChartBarIcon />
                    <span>Ranking</span>
                    {!isRankingAvailable && <LockIcon className="w-4 h-4 ml-1" />}
                </button>
            </div>
        )}

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="text-right">
            <p className="font-bold text-brand-text">{user.name}</p>
            {isPlayer ? (
                 <p className="text-sm text-brand-text-light">Nível {user.level}</p>
            ) : (
                <p className="text-sm text-brand-secondary font-bold">Admin</p>
            )}
          </div>
          {isPlayer && (
            <div className="w-24">
                <ProgressBar progress={progress} />
                <p className="text-xs text-center text-brand-text-light">{user.xp} XP</p>
            </div>
          )}
          <button onClick={onLogout} title="Sair" className="text-brand-text-light hover:text-red-500 transition-colors">
            <LogoutIcon />
          </button>
        </div>
      </div>
       {isPlayer && (
         <nav className="md:hidden bg-gray-50 flex justify-around p-2 border-t">
            <button onClick={() => onNavigate(View.DASHBOARD)} className="flex flex-col items-center space-y-1 text-brand-text-light hover:text-brand-primary font-bold transition-colors text-sm">
                <BookOpenIcon />
                <span>Módulos</span>
            </button>
            <button 
              onClick={() => onNavigate(View.LEADERBOARD)} 
              className="flex flex-col items-center space-y-1 text-brand-text-light hover:text-brand-primary font-bold transition-colors text-sm disabled:opacity-50"
              disabled={!isRankingAvailable}
              aria-disabled={!isRankingAvailable}
            >
                <ChartBarIcon />
                <div className="flex items-center">
                  <span>Ranking</span>
                  {!isRankingAvailable && <LockIcon className="w-3 h-3 ml-1"/>}
                </div>
            </button>
        </nav>
       )}
    </header>
  );
};

export default Header;
