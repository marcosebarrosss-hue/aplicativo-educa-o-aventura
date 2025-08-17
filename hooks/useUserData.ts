
import { useState, useCallback } from 'react';
import { User, Role } from '../types';
import { ADMIN_USER, LEVELS_XP } from '../constants';

interface LevelUpInfo {
  level: number;
}

export const useUserData = () => {
  const [users, setUsers] = useState<User[]>([ADMIN_USER]);
  const [levelUpInfo, setLevelUpInfo] = useState<LevelUpInfo | null>(null);

  const getLevelFromXp = (xp: number): number => {
    let level = 1;
    for (let i = 1; i < LEVELS_XP.length; i++) {
      if (xp >= LEVELS_XP[i]) {
        level = i + 1;
      } else {
        break;
      }
    }
    return Math.min(level, LEVELS_XP.length);
  };

  const clearLevelUpInfo = useCallback(() => {
    setLevelUpInfo(null);
  }, []);

  const addUser = useCallback((name: string, role: Role): User => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      role,
      level: 1,
      xp: 0,
      completedTopics: [],
      badges: [],
    };
    setUsers(currentUsers => [...currentUsers, newUser]);
    return newUser;
  }, []);

  const addXp = useCallback((userId: string, amount: number) => {
    setUsers(currentUsers =>
      currentUsers.map(user => {
        if (user.id === userId) {
          const oldLevel = user.level;
          const newXp = user.xp + amount;
          const newLevel = getLevelFromXp(newXp);
          
          if (newLevel > oldLevel) {
            setLevelUpInfo({ level: newLevel });
          }

          return { ...user, xp: newXp, level: newLevel };
        }
        return user;
      })
    );
  }, []);

  const completeTopic = useCallback((userId: string, topicId: string) => {
    setUsers(currentUsers =>
      currentUsers.map(user => {
        if (user.id === userId && !user.completedTopics.includes(topicId)) {
          return { ...user, completedTopics: [...user.completedTopics, topicId] };
        }
        return user;
      })
    );
  }, []);
  
  const findUserById = useCallback((id: string) => {
    return users.find(u => u.id === id);
  }, [users]);

  return {
    users: [...users].sort((a, b) => b.xp - a.xp),
    findUserById,
    addUser,
    addXp,
    completeTopic,
    levelUpInfo,
    clearLevelUpInfo,
  };
};
