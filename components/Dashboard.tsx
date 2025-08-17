
import React from 'react';
import { Topic, User } from '../types';
import TopicCard from './TopicCard';

interface DashboardProps {
  onSelectTopic: (topicId: string) => void;
  user: User;
  topics: Topic[];
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectTopic, user, topics }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-brand-text mb-6">Missões de Conhecimento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {topics.map(topic => (
          <TopicCard 
            key={topic.id} 
            topic={topic} 
            onSelect={onSelectTopic} 
            isCompleted={user.completedTopics.includes(topic.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
