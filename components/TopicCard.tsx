
import React from 'react';
import { Topic } from '../types';
import { CheckCircleIcon, LockIcon } from './Icons';

interface TopicCardProps {
  topic: Topic;
  onSelect: (topicId: string) => void;
  isCompleted: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect, isCompleted }) => {
  return (
    <div
      className="bg-brand-surface rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col"
      onClick={() => onSelect(topic.id)}
    >
      <div className={`h-32 ${topic.color} flex items-center justify-center text-white p-4`}>
        <div className="w-16 h-16">{topic.icon}</div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-brand-text mb-2">{topic.title}</h3>
        <p className="text-brand-text-light text-sm flex-grow">{topic.description}</p>
        <div className="mt-4 flex items-center justify-end">
            {isCompleted ? (
                <div className="flex items-center text-sm font-bold text-brand-secondary">
                    <CheckCircleIcon />
                    <span className="ml-1">Concluído</span>
                </div>
            ) : (
                 <div className="flex items-center text-sm font-bold text-brand-primary">
                    <span>Começar Missão</span>
                 </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
