
import React, { useState } from 'react';
import { BookOpenIcon } from './Icons';

interface LoginProps {
  onPlayerLogin: (name: string) => void;
  onAdminLogin: (id: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onPlayerLogin, onAdminLogin }) => {
  const [playerName, setPlayerName] = useState('');
  const [adminId, setAdminId] = useState('');
  const [error, setError] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onAdminLogin(adminId.trim());
    if (!success) {
      setError('ID de Administrador inválido.');
    }
  };

  const handlePlayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (playerName.trim().length < 3) {
      setError('Seu nome deve ter pelo menos 3 caracteres.');
      return;
    }
    onPlayerLogin(playerName.trim());
  };

  return (
    <div className="min-h-screen bg-brand-background flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="inline-block bg-brand-primary text-white p-3 rounded-full">
            <BookOpenIcon />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mt-2">EduAventura</h1>
        <p className="text-brand-text-light mt-2">Sua jornada pelo conhecimento começa aqui!</p>
      </div>

      <div className="w-full max-w-md bg-brand-surface p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Player Login */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-brand-text mb-4 text-center">Sou Jogador</h2>
          <form onSubmit={handlePlayerSubmit} className="flex flex-col h-full">
            <label htmlFor="name" className="block text-sm font-medium text-brand-text-light mb-1">Seu Nome de Aventureiro</label>
            <input
              id="name"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
            />
            <div className="flex-grow"></div>
            <button type="submit" className="w-full bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-green-600 transition-colors">
              Começar Aventura!
            </button>
          </form>
        </div>

        {/* Admin Login */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-brand-text mb-4 text-center">Sou Administrador</h2>
          <form onSubmit={handleAdminSubmit} className="flex flex-col h-full">
             <label htmlFor="adminId" className="block text-sm font-medium text-brand-text-light mb-1">Seu ID de Admin</label>
            <input
              id="adminId"
              type="password"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="Digite seu ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
            />
            <div className="flex-grow"></div>
            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-indigo-700 transition-colors">
              Acessar Painel
            </button>
          </form>
        </div>
      </div>
       {error && <p className="mt-4 w-full max-w-md text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
    </div>
  );
};

export default Login;
