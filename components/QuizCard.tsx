
import React, { useState, useEffect, useRef } from 'react';
import { Question, Language } from '../types';
import { audioService } from '../services/audioService';
import { translations } from '../translations';

interface Props {
  lang: Language;
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  currentIndex: number;
  total: number;
  hintUsedInQuiz: boolean;
  onUseHint: () => void;
}

const TIMER_DURATION = 15;

const QuizCard: React.FC<Props> = ({ lang, question, onAnswer, currentIndex, total, hintUsedInQuiz, onUseHint }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCurrentHint, setShowCurrentHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const t = translations[lang];

  useEffect(() => {
    setSelectedOption(null);
    setShowExplanation(false);
    setShowCurrentHint(false);
    setIsTransitioning(false);
    setTimeLeft(TIMER_DURATION);
  }, [question.id]);

  useEffect(() => {
    if (showExplanation || selectedOption || isTransitioning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        audioService.playTick(prev <= 5);
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question.id, showExplanation, selectedOption, isTransitioning]);

  const handleTimeUp = () => {
    audioService.playIncorrect();
    setSelectedOption('__TIME_UP__');
    setShowExplanation(true);
  };

  const handleSelect = (option: string) => {
    if (selectedOption || showExplanation || isTransitioning) return;
    setSelectedOption(option);
    
    setTimeout(() => {
      const isCorrect = option === question.correctAnswer;
      if (isCorrect) audioService.playCorrect();
      else audioService.playIncorrect();
      setShowExplanation(true);
    }, 100);
  };

  const handleUseHint = () => {
    if (hintUsedInQuiz || showExplanation || selectedOption) return;
    onUseHint();
    setShowCurrentHint(true);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      const isCorrect = selectedOption === question.correctAnswer;
      onAnswer(isCorrect);
    }, 200);
  };

  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="w-full animate-fade-slide space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-4">
            <span>{t.question} {currentIndex + 1} / {total}</span>
            {!showExplanation && !selectedOption && (
              <button 
                onClick={handleUseHint}
                disabled={hintUsedInQuiz}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${
                  hintUsedInQuiz 
                    ? 'opacity-20 border-white/5 grayscale cursor-not-allowed' 
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20 active:scale-95'
                }`}
              >
                <span className="text-xs">💡</span>
                <span className="font-black uppercase tracking-widest">{t.hintLabel}</span>
              </button>
            )}
          </div>
          <span className={`px-3 py-1 rounded-full border border-white/5 ${timeLeft <= 5 ? 'text-rose-500 border-rose-500/30 bg-rose-500/10' : 'text-blue-400 border-blue-500/30 bg-blue-500/10'}`}>
            {timeLeft}S
          </span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-700 shadow-[0_0_10px_rgba(37,99,235,0.5)]" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="bg-black/40 p-10 rounded-[2rem] border border-white/5 text-center shadow-xl relative overflow-hidden">
        {showCurrentHint && (
          <div className="absolute top-0 inset-x-0 bg-amber-500/20 border-b border-amber-500/30 py-2 animate-fade-slide">
             <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">
               {t.hintLabel}: {question.hint}
             </p>
          </div>
        )}
        <h3 className="text-xl md:text-3xl font-black text-white leading-tight tracking-tight">
          {question.question}
        </h3>
      </div>

      <div className="grid gap-4">
        {question.options.map((option, idx) => {
          const isCorrect = option === question.correctAnswer;
          const isSelected = option === selectedOption;
          let btnClass = "btn-pro";
          
          if (showExplanation) {
            if (isCorrect) btnClass = "bg-emerald-600/20 border-emerald-500 text-emerald-400";
            else if (isSelected) btnClass = "bg-rose-600/20 border-rose-500 text-rose-400";
            else btnClass = "opacity-30 border-white/5";
          }
          
          return (
            <button
              key={`${question.id}-${idx}`}
              disabled={!!selectedOption || showExplanation}
              onClick={() => handleSelect(option)}
              className={`p-6 text-start text-base md:text-lg flex justify-between items-center ${btnClass}`}
            >
              <span className="flex-1 font-bold">{option}</span>
              {showExplanation && isCorrect && <span className="text-emerald-400 text-2xl">✓</span>}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="animate-fade-slide space-y-6">
          <div className="p-6 bg-blue-900/10 rounded-2xl border border-blue-500/20">
            <p className="text-slate-300 text-base leading-relaxed">
              <span className="font-black text-white text-xs uppercase tracking-widest block mb-2">{t.correctInfo}</span> 
              {question.explanation}
            </p>
          </div>
          <button onClick={handleNext} className="btn-blue w-full py-5 text-xl tracking-widest uppercase">
            {lang === 'ar' ? 'التالي' : 'NEXT'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
