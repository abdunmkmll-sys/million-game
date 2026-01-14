
import React, { useState, useEffect } from 'react';
import { AgeGroup, Category, QuizState, Language, Difficulty } from './types';
import { CATEGORIES } from './constants';
import { fetchQuestions } from './services/geminiService';
import { translations } from './translations';
import Intro from './components/Intro';
import AgeSelector from './components/AgeSelector';
import CategorySelector from './components/CategorySelector';
import QuizCard from './components/QuizCard';
import Results from './components/Results';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
import LandingPage from './components/LandingPage';
import Acknowledgments from './components/Acknowledgments';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    language: 'ar',
    showLanding: true,
    showIntro: false,
    showAbout: false,
    showAcknowledgments: false,
    age: null,
    category: null,
    difficulty: 'medium',
    questions: [],
    currentIndex: 0,
    score: 0,
    isFinished: false,
    isLoading: false,
    error: null,
    showLeaderboard: false,
    isDailyChallenge: false,
    hintUsedInQuiz: false,
  });

  const t = translations[state.language];

  const handleStart = () => {
    setState(prev => ({ ...prev, showLanding: false, showIntro: true, isDailyChallenge: false }));
  };

  const handleDailyChallenge = async () => {
    // For daily challenge, we default to 'adult' difficulty or use current if set
    const age = state.age || 'adult';
    setState(prev => ({ 
      ...prev, 
      showLanding: false, 
      showIntro: false, 
      age, 
      isDailyChallenge: true, 
      isLoading: true, 
      category: { id: 'daily', name: { ar: 'تحدي اليوم', en: 'Daily Challenge', fr: 'Défi Quotidien', es: 'Desafío Diario', de: 'Tages-Herausforderung' }, icon: '📅', color: 'bg-amber-600' } as any
    }));

    try {
      const questions = await fetchQuestions(age, 'daily', state.language, 'hard');
      setState(prev => ({
        ...prev,
        questions,
        isLoading: false,
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isDailyChallenge: false,
        error: err.message || "Error",
      }));
    }
  };

  const handleAgeSelect = (age: AgeGroup) => {
    setState(prev => ({ ...prev, age }));
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setState(prev => ({ ...prev, difficulty }));
  };

  const handleCategorySelect = async (category: Category) => {
    if (!state.age || state.isLoading) return;
    
    setState(prev => ({ ...prev, category, isLoading: true, error: null }));
    
    try {
      const questions = await fetchQuestions(state.age, category, state.language, state.difficulty);
      setState(prev => ({
        ...prev,
        questions,
        isLoading: false,
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        category: null,
        isLoading: false,
        error: err.message || "Error",
      }));
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    const nextIndex = state.currentIndex + 1;
    const isFinished = nextIndex >= state.questions.length;

    setState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      currentIndex: nextIndex,
      isFinished,
    }));
  };

  const handleBack = () => {
    if (state.showAcknowledgments) {
      setState(prev => ({ ...prev, showAcknowledgments: false, showAbout: true }));
      return;
    }
    if (state.showAbout) {
      setState(prev => ({ ...prev, showAbout: false }));
      return;
    }
    if (state.showLeaderboard) {
      setState(prev => ({ ...prev, showLeaderboard: false }));
      return;
    }
    if (state.isFinished) {
      resetQuiz();
      return;
    }
    if (state.questions.length > 0) {
      setState(prev => ({ ...prev, questions: [], currentIndex: 0, score: 0, isDailyChallenge: false }));
      return;
    }
    if (state.category) {
      setState(prev => ({ ...prev, category: null, isDailyChallenge: false }));
      return;
    }
    if (state.age) {
      setState(prev => ({ ...prev, age: null, isDailyChallenge: false }));
      return;
    }
    if (state.showIntro) {
      setState(prev => ({ ...prev, showIntro: false, showLanding: true }));
      return;
    }
    // If none of the above match, it means we are in the Age Selection state
    // and should go back to the Intro screen
    if (!state.showLanding) {
      setState(prev => ({ ...prev, showIntro: true }));
      return;
    }
  };

  const resetQuiz = () => {
    setState(prev => ({
      ...prev,
      showLanding: true,
      showIntro: false,
      showAbout: false,
      showAcknowledgments: false,
      age: null,
      category: null,
      questions: [],
      currentIndex: 0,
      score: 0,
      isFinished: false,
      isLoading: false,
      error: null,
      showLeaderboard: false,
      isDailyChallenge: false,
      hintUsedInQuiz: false,
    }));
  };

  const setHintUsed = () => {
    setState(prev => ({ ...prev, hintUsedInQuiz: true }));
  };

  const cycleLanguage = () => {
    const langs: Language[] = ['ar', 'en', 'fr', 'es', 'de'];
    const currentIndex = langs.indexOf(state.language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setState(prev => ({ ...prev, language: langs[nextIndex] }));
  };

  const toggleLeaderboard = () => {
    setState(prev => ({ ...prev, showLeaderboard: !prev.showLeaderboard }));
  };

  const toggleAbout = () => {
    setState(prev => ({ ...prev, showAbout: !prev.showAbout, showAcknowledgments: false }));
  };

  const openAcknowledgments = () => {
    setState(prev => ({ ...prev, showAcknowledgments: true, showAbout: false }));
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center text-slate-100" dir={t.dir}>
      <div className="w-full h-full glass shadow-2xl overflow-hidden flex flex-col relative z-10 border-0 md:border-x border-white/10">
        {/* Header */}
        {!state.showLanding && (
          <header className="px-6 py-5 bg-black/80 border-b border-white/5 flex flex-row justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleBack}
                className="btn-pro w-12 h-12 text-xl"
                title={t.back}
              >
                {t.dir === 'rtl' ? '→' : '←'}
              </button>
              <h1 className="text-lg md:text-xl font-black text-white uppercase tracking-wider">
                {state.isDailyChallenge ? t.dailyTitle : state.showAbout ? t.about.title : state.showLeaderboard ? t.leaderboard.title : t.title}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              {state.isDailyChallenge && (
                <div className="hidden md:flex items-center px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-500 font-black text-xs uppercase tracking-widest">
                  <span className="mr-2">✨</span> Daily Mode
                </div>
              )}
              <button 
                onClick={cycleLanguage}
                className="btn-pro px-6 py-2.5 text-sm font-black tracking-widest bg-black border-blue-500/30"
              >
                <span className="text-white uppercase">{t.langName}</span>
                <span className="mr-2 opacity-60">🌐</span>
              </button>
            </div>
          </header>
        )}

        {/* Content Container - Scrollable */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 lg:p-16 flex flex-col items-center relative">
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            {state.error ? (
              <div className="text-center p-8 animate-fade-slide">
                <div className="text-6xl mb-6">⚠️</div>
                <p className="text-xl font-bold text-rose-400 mb-8">{state.error}</p>
                <button onClick={resetQuiz} className="btn-blue px-12 py-4 text-lg">
                  {t.backHome}
                </button>
              </div>
            ) : state.showLanding ? (
              <LandingPage lang={state.language} onStart={handleStart} onDailyChallenge={handleDailyChallenge} />
            ) : state.showAcknowledgments ? (
              <Acknowledgments lang={state.language} onClose={handleBack} />
            ) : state.showAbout ? (
              <About lang={state.language} onClose={toggleAbout} onOpenAcknowledgments={openAcknowledgments} />
            ) : state.showLeaderboard ? (
              <Leaderboard lang={state.language} onClose={toggleLeaderboard} />
            ) : state.showIntro ? (
              <Intro lang={state.language} onStart={() => setState(prev => ({ ...prev, showIntro: false }))} />
            ) : !state.age ? (
              <AgeSelector lang={state.language} onSelect={handleAgeSelect} />
            ) : (state.questions.length === 0 && !state.isFinished) ? (
              <CategorySelector 
                lang={state.language} 
                onSelect={handleCategorySelect} 
                difficulty={state.difficulty}
                onDifficultyChange={handleDifficultyChange}
                isLoading={state.isLoading}
                selectedCategoryId={state.category?.id}
              />
            ) : state.isFinished ? (
              <Results 
                lang={state.language}
                score={state.score} 
                total={state.questions.length} 
                onReset={resetQuiz} 
                onViewLeaderboard={toggleLeaderboard}
                age={state.age}
                category={state.category!}
                difficulty={state.difficulty}
                isDailyChallenge={state.isDailyChallenge}
              />
            ) : (
              <QuizCard 
                lang={state.language}
                question={state.questions[state.currentIndex]} 
                onAnswer={handleAnswer}
                currentIndex={state.currentIndex}
                total={state.questions.length}
                hintUsedInQuiz={state.hintUsedInQuiz}
                onUseHint={setHintUsed}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
