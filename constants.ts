import React from 'react';
import { User, Role } from './types';

export const LEVELS_XP: readonly number[] = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000, 5000];

export const ADMIN_USER: User = {
    id: '13112010',
    name: 'Admin',
    role: Role.ADMIN,
    level: 99,
    xp: 99999,
    completedTopics: [],
    badges: ['Mestre do Conhecimento']
};