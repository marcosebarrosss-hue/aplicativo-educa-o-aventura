
import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, Topic } from '../types';
import { generateQuiz } from '../services/geminiService';
import Spinner from './Spinner';

interface QuizProps {
  topic: Topic;
  onQuizComplete: (topicId: string, score: number, totalQuestions: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ topic, onQuizComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null);
        const quizQuestions = await generateQuiz(topic.title);
        setQuestions(quizQuestions);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topic.title]);

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === questions[currentQuestionIndex].correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  }, [currentQuestionIndex, questions.length]);

  if (loading) return <div className="flex justify-center items-center p-8"><Spinner /></div>;
  if (error) return <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>;

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-brand-surface p-8 rounded-xl shadow-lg text-center animate-fade-in">
        <h2 className="text-3xl font-extrabold text-brand-text mb-4">Quiz Finalizado!</h2>
        <p className="text-xl text-brand-text-light mb-6">Você acertou {score} de {questions.length} perguntas!</p>
        <div className="w-full bg-gray-200 rounded-full h-8 mb-6">
            <div className="bg-brand-secondary h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ width: `${percentage}%` }}>
                {percentage}%
            </div>
        </div>
        <button
          onClick={() => onQuizComplete(topic.id, score, questions.length)}
          className="bg-brand-primary hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Coletar Recompensa (+{percentage} XP)
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-brand-surface p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
        <div className="mb-4">
            <p className="text-sm text-brand-text-light">Pergunta {currentQuestionIndex + 1} de {questions.length}</p>
            <div className="w-full bg-gray-200 rounded-full mt-1">
                <div className="bg-brand-primary h-2 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
        </div>
      <h3 className="text-2xl font-bold text-brand-text mb-6">{currentQuestion.question}</h3>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctAnswerIndex;
          const isSelected = selectedAnswer === index;
          
          let buttonClass = 'border-gray-300 hover:border-brand-primary hover:bg-indigo-50';
          if(isAnswered) {
              if (isCorrect) {
                  buttonClass = 'bg-green-100 border-green-500 text-green-800 font-bold';
              } else if(isSelected) {
                  buttonClass = 'bg-red-100 border-red-500 text-red-800';
              }
          } else if (isSelected) {
              buttonClass = 'border-brand-primary bg-indigo-100';
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all ${buttonClass} disabled:cursor-not-allowed`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <div className="text-right mt-6">
            <button 
                onClick={handleNextQuestion}
                className="bg-brand-primary hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
                {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
            </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
