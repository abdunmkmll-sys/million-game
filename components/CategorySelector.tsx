
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category, Language, Difficulty } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
  onSelect: (category: Category) => void;
  difficulty: Difficulty;
  onDifficultyChange: (diff: Difficulty) => void;
  isLoading?: boolean;
  selectedCategoryId?: string;
}

const CategorySelector: React.FC<Props> = ({ lang, onSelect, difficulty, onDifficultyChange, isLoading, selectedCategoryId }) => {
  const t = translations[lang];

  return (
    <div className="w-full space-y-10 relative animate-fade-slide">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 rounded-[2rem] backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="text-center">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">{t.catSelect}</h2>
        
        <div className="mt-8 inline-flex p-1.5 bg-black/40 rounded-xl border border-white/10 shadow-inner">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
            <button
              key={diff}
              onClick={() => onDifficultyChange(diff)}
              className={`px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                difficulty === diff 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t.difficulty[diff]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              disabled={isLoading}
              onClick={() => onSelect(cat)}
              className={`btn-pro flex flex-col items-center justify-center p-6 border-white/5 ${
                isSelected ? 'border-blue-500 bg-blue-900/10' : ''
              }`}
            >
              <div className="text-3xl mb-4 p-4 bg-white/5 rounded-full group-hover:bg-blue-600/10 transition-colors">
                {cat.icon}
              </div>
              <span className="font-black text-white text-sm uppercase tracking-wider">{cat.name[lang]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
