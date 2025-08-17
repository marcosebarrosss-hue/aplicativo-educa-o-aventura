
import React, { useState } from 'react';
import { Topic } from '../types';
import Quiz from './Quiz';
import { BackArrowIcon, QuizIcon } from './Icons';

interface LearningModuleProps {
  topic: Topic;
  onQuizComplete: (topicId: string, score: number, totalQuestions: number) => void;
  onBack: () => void;
}

const LearningModule: React.FC<LearningModuleProps> = ({ topic, onQuizComplete, onBack }) => {
    const [showQuiz, setShowQuiz] = useState(false);

    if(showQuiz) {
        return <Quiz topic={topic} onQuizComplete={onQuizComplete} />;
    }

    return (
        <div className="bg-brand-surface p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
             <button onClick={onBack} className="flex items-center text-brand-primary font-bold mb-6 hover:underline">
                <BackArrowIcon />
                <span className="ml-2">Voltar para as Missões</span>
            </button>
            <div className="flex items-center mb-4">
                <div className={`w-12 h-12 p-2 rounded-full ${topic.color} text-white mr-4 flex-shrink-0`}>
                    {topic.icon}
                </div>
                <h2 className="text-3xl font-extrabold text-brand-text">{topic.title}</h2>
            </div>
            <p className="text-brand-text-light mb-8 text-lg italic">{topic.content.introduction}</p>

            <div className="space-y-8">
                {topic.content.sections.map((section, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <h3 className="text-2xl font-bold text-brand-primary mb-3">{section.title}</h3>
                        {section.image && (
                            <img src={section.image} alt={section.title} className="w-full h-64 object-cover rounded-lg mb-4 shadow-md" />
                        )}
                        <p className="text-brand-text leading-relaxed">{section.text}</p>
                    </div>
                ))}
            </div>

            <div className="mt-10 text-center">
                <button 
                    onClick={() => setShowQuiz(true)}
                    className="bg-brand-secondary hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
                >
                    <div className="flex items-center">
                        <QuizIcon />
                        <span className="ml-2">Testar meus conhecimentos!</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LearningModule;
