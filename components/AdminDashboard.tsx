
import React, { useState } from 'react';
import { Topic } from '../types';
import { AddIcon, DeleteIcon, EditIcon } from './Icons';
import ModuleEditor from './ModuleEditor';

interface AdminDashboardProps {
    topics: Topic[];
    onAddTopic: (topic: Omit<Topic, 'id' | 'icon'>) => void;
    onUpdateTopic: (topic: Topic) => void;
    onDeleteTopic: (topicId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ topics, onAddTopic, onUpdateTopic, onDeleteTopic }) => {
    const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleSaveTopic = (topic: Topic) => {
        onUpdateTopic(topic);
        setEditingTopic(null);
    };

    const handleCreateTopic = (topic: Omit<Topic, 'id'|'icon'>) => {
        onAddTopic(topic);
        setIsCreating(false);
    }

    const handleCancel = () => {
        setEditingTopic(null);
        setIsCreating(false);
    }
    
    if (isCreating) {
        return <ModuleEditor 
                onSave={handleCreateTopic}
                onCancel={handleCancel}
               />
    }
    
    if (editingTopic) {
        return <ModuleEditor 
                topic={editingTopic}
                onSave={handleSaveTopic}
                onCancel={handleCancel}
              />
    }

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-brand-text">Gerenciar Módulos</h2>
                <button 
                    onClick={() => setIsCreating(true)}
                    className="flex items-center bg-brand-primary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    <AddIcon />
                    <span className="ml-2">Novo Módulo</span>
                </button>
            </div>
            
            <div className="bg-brand-surface rounded-xl shadow-lg p-6">
                <div className="space-y-4">
                    {topics.map(topic => (
                        <div key={topic.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center">
                                <div className={`w-10 h-10 p-2 rounded-full ${topic.color} text-white mr-4 flex-shrink-0`}>
                                    {topic.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-brand-text">{topic.title}</h3>
                                    <p className="text-sm text-brand-text-light">{topic.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => setEditingTopic(topic)} className="p-2 text-brand-text-light hover:text-brand-primary" title="Editar">
                                    <EditIcon />
                                </button>
                                <button onClick={() => {
                                    if (window.confirm(`Tem certeza que deseja deletar o módulo "${topic.title}"?`)) {
                                        onDeleteTopic(topic.id);
                                    }
                                }} className="p-2 text-brand-text-light hover:text-red-500" title="Deletar">
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
