import React, { useState } from 'react';
import { Topic } from '../types';
import { AddIcon, DeleteIcon } from './Icons';

interface ModuleEditorProps {
    topic?: Topic;
    onSave: (topic: any) => void;
    onCancel: () => void;
}

const colors = [
    { name: 'Verde', value: 'bg-green-500' },
    { name: 'Vermelho', value: 'bg-red-500' },
    { name: 'Azul', value: 'bg-blue-500' },
    { name: 'Amarelo', value: 'bg-yellow-500' },
    { name: 'Roxo', value: 'bg-purple-500' },
    { name: 'Rosa', value: 'bg-pink-500' },
];

// Helper to generate unique IDs for sections for stable keys and updates
let tempIdCounter = 0;

const ModuleEditor: React.FC<ModuleEditorProps> = ({ topic, onSave, onCancel }) => {
    const [formData, setFormData] = useState(() => {
        // Ensure every section has a defined `image` property (even if empty string)
        // and a unique tempId for stable rendering.
        const initialSections = (topic?.content?.sections || [{ title: '', text: '' }]).map(s => ({
            title: s.title || '',
            text: s.text || '',
            image: s.image || '', // Defensively ensure image property exists
            tempId: tempIdCounter++,
        }));

        return {
            title: topic?.title || '',
            description: topic?.description || '',
            color: topic?.color || 'bg-blue-500',
            content: {
                introduction: topic?.content?.introduction || '',
                sections: initialSections,
            },
        };
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            content: { ...prev.content, [name]: value }
        }));
    };

    const handleSectionChange = (tempId: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: prev.content.sections.map(s =>
                    s.tempId === tempId ? { ...s, [name]: value } : s
                ),
            }
        }));
    };
    
    const handleImageUpload = (tempId: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const imageBase64 = event.target.result as string;
                    setFormData(prev => ({
                        ...prev,
                        content: {
                            ...prev.content,
                            sections: prev.content.sections.map(s =>
                                s.tempId === tempId ? { ...s, image: imageBase64 } : s
                            ),
                        }
                    }));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const removeImage = (tempId: number) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: prev.content.sections.map(s =>
                    s.tempId === tempId ? { ...s, image: '' } : s
                ),
            }
        }));
    };

    const addSection = () => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: [...prev.content.sections, { title: '', text: '', image: '', tempId: tempIdCounter++ }]
            }
        }));
    };
    
    const removeSection = (tempId: number) => {
        setFormData(prev => ({
            ...prev,
            content: {
                ...prev.content,
                sections: prev.content.sections.filter(s => s.tempId !== tempId)
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalFormData = {
            ...formData,
            content: {
                ...formData.content,
                sections: formData.content.sections.map(({ tempId, ...rest }) => rest),
            },
        };
        onSave(topic ? { ...topic, ...finalFormData } : finalFormData);
    };

    return (
        <div className="container mx-auto p-4 md:p-8 animate-fade-in">
            <div className="bg-brand-surface p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-extrabold text-brand-text mb-6">{topic ? 'Editar Módulo' : 'Criar Novo Módulo'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-bold text-brand-text-light mb-1">Título do Módulo</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-bold text-brand-text-light mb-1">Descrição Curta</label>
                        <textarea name="description" id="description" value={formData.description} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary" required />
                    </div>
                    <div>
                        <label htmlFor="color" className="block text-sm font-bold text-brand-text-light mb-1">Cor do Módulo</label>
                        <select name="color" id="color" value={formData.color} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary">
                            {colors.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="introduction" className="block text-sm font-bold text-brand-text-light mb-1">Introdução</label>
                        <textarea name="introduction" id="introduction" value={formData.content.introduction} onChange={handleContentChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary" required />
                    </div>

                    <h3 className="text-xl font-bold text-brand-text border-t pt-6">Seções de Conteúdo</h3>
                    {formData.content.sections.map((section, index) => (
                        <div key={section.tempId} className="p-4 border rounded-lg space-y-4 relative bg-gray-50">
                            <label className="block text-sm font-bold text-brand-text-light">Seção {index + 1}</label>
                            <input type="text" name="title" value={section.title} onChange={e => handleSectionChange(section.tempId, e)} placeholder="Título da Seção" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                            <textarea name="text" value={section.text} onChange={e => handleSectionChange(section.tempId, e)} placeholder="Texto da Seção" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-brand-text-light">Imagem da Seção (Opcional)</label>
                                {section.image && (
                                    <div className="mt-2 relative group">
                                        <img src={section.image} alt="Pré-visualização" className="w-full h-48 object-cover rounded-lg shadow-inner" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(section.tempId)}
                                            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                                            title="Remover Imagem"
                                        >
                                            <DeleteIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                <div className="flex items-center space-x-4">
                                    <input 
                                        type="url" 
                                        name="image" 
                                        value={section.image && !section.image.startsWith('data:') ? section.image : ''} 
                                        onChange={e => handleSectionChange(section.tempId, e)} 
                                        placeholder="Ou cole uma URL" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary disabled:bg-gray-100" 
                                        disabled={!!section.image && section.image.startsWith('data:')}
                                    />
                                    <label className="cursor-pointer whitespace-nowrap bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                                        <span>Enviar do PC</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(section.tempId, e)} />
                                    </label>
                                </div>
                            </div>
                            
                            {formData.content.sections.length > 1 && (
                                <button type="button" onClick={() => removeSection(section.tempId)} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded-full" title="Remover Seção">
                                    <DeleteIcon />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addSection} className="flex items-center text-brand-primary font-bold hover:underline">
                        <AddIcon className="w-5 h-5" />
                        <span className="ml-1">Adicionar Seção</span>
                    </button>

                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <button type="button" onClick={onCancel} className="bg-gray-200 text-brand-text font-bold py-2 px-6 rounded-lg hover:bg-gray-300">Cancelar</button>
                        <button type="submit" className="bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600">Salvar Módulo</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModuleEditor;