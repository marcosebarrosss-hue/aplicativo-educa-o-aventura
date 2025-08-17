
import React, { useState, useCallback, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import LearningModule from './components/LearningModule';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { useUserData } from './hooks/useUserData';
import { useTopicData } from './hooks/useTopicData';
import { Topic, View, User, Role } from './types';

const App: React.FC = () => {
  const {
    users,
    findUserById,
    addUser,
    addXp,
    completeTopic,
    levelUpInfo,
    clearLevelUpInfo,
  } = useUserData();

  const {
    topics,
    addTopic,
    updateTopic,
    deleteTopic
  } = useTopicData();
  
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    if (userId) {
      const user = findUserById(userId);
      if (user) {
        setLoggedInUser(user);
      }
    }
  }, [findUserById, users]);

  const handleLogin = (user: User) => {
    setLoggedInUser(user);
    const url = new URL(window.location.href);
    url.searchParams.set('userId', user.id);
    window.history.pushState({}, '', url);
    setCurrentView(View.DASHBOARD);
  };

  const handleCreatePlayer = (name: string) => {
    const newUser = addUser(name, Role.PLAYER);
    handleLogin(newUser);
  };
  
  const handleAdminLogin = (id: string) => {
    const adminUser = findUserById(id);
    if(adminUser && adminUser.role === Role.ADMIN) {
      handleLogin(adminUser);
    }
    return adminUser && adminUser.role === Role.ADMIN;
  }

  const handleLogout = () => {
    setLoggedInUser(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('userId');
    window.history.pushState({}, '', url);
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setActiveTopic(null);
  };

  const selectTopic = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      setActiveTopic(topic);
      setCurrentView(View.MODULE);
    }
  };

  const handleQuizCompletion = useCallback((topicId: string, score: number, totalQuestions: number) => {
    if (!loggedInUser) return;
    const xpGained = Math.round((score / totalQuestions) * 100);
    addXp(loggedInUser.id, xpGained);
    completeTopic(loggedInUser.id, topicId);
    setCurrentView(View.DASHBOARD);
    setActiveTopic(null);
  }, [addXp, completeTopic, loggedInUser]);

  if (!loggedInUser) {
    return <Login onPlayerLogin={handleCreatePlayer} onAdminLogin={handleAdminLogin} />;
  }
  
  const isRankingAvailable = users.some(u => u.role === Role.PLAYER && u.completedTopics.length > 0);

  const renderContent = () => {
    if (loggedInUser.role === Role.ADMIN) {
      return <AdminDashboard 
                topics={topics}
                onAddTopic={addTopic}
                onUpdateTopic={updateTopic}
                onDeleteTopic={deleteTopic}
             />;
    }
    
    // Player Content
    switch (currentView) {
      case View.MODULE:
        return activeTopic ? (
            <LearningModule 
                topic={activeTopic} 
                onQuizComplete={handleQuizCompletion} 
                onBack={() => navigateTo(View.DASHBOARD)}
            />
        ) : <Dashboard onSelectTopic={selectTopic} user={loggedInUser} topics={topics} />;
      case View.LEADERBOARD:
        if (!isRankingAvailable) {
             return (
                <div className="text-center bg-brand-surface p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-brand-text mb-2">Ranking Bloqueado!</h2>
                    <p className="text-brand-text-light">Complete pelo menos uma missão para desbloquear o ranking e ver sua posição.</p>
                </div>
            );
        }
        return <Leaderboard users={users.filter(u => u.role === Role.PLAYER)} currentUserId={loggedInUser.id} />;
      case View.DASHBOARD:
      default:
        return <Dashboard onSelectTopic={selectTopic} user={loggedInUser} topics={topics} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-background text-brand-text font-sans">
      <Header 
        user={loggedInUser} 
        onNavigate={navigateTo} 
        onLogout={handleLogout} 
        isRankingAvailable={isRankingAvailable} 
      />
      <main className="container mx-auto p-4 md:p-8">
        {levelUpInfo && (
          <div 
            className="bg-brand-secondary/90 border-l-4 border-green-700 text-white p-4 mb-6 rounded-lg shadow-lg relative animate-fade-in"
            role="alert"
          >
            <strong className="font-bold">Parabéns!</strong>
            <span className="block sm:inline ml-2">Você alcançou o Nível {levelUpInfo.level}!</span>
            <button
              onClick={clearLevelUpInfo}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              aria-label="Fechar notificação de nível"
            >
              <span className="text-2xl" aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
