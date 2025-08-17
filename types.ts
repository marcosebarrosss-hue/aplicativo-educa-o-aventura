
import type { JSX } from 'react';

export enum Role {
  PLAYER = 'player',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  role: Role;
  level: number;
  xp: number;
  completedTopics: string[];
  badges: string[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      text: string;
      image?: string;
    }[];
  };
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  MODULE = 'MODULE',
  LEADERBOARD = 'LEADERBOARD',
}
