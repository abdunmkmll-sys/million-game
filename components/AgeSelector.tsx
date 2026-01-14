
import React from 'react';
import { AGE_GROUPS_CONFIG } from '../constants';
import { AgeGroup, Language } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
  onSelect: (age: AgeGroup) => void;
}

const AgeSelector: React.FC<Props> = ({ lang, onSelect }) => {
  const t = translations[lang];

  return (
    <div className="w-full space-y-10 animate-fade-slide">
      <div className="text-center">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight">{t.ageSelect}</h2>
        <p className="text-slate-500 text-sm mt-3 font-bold uppercase tracking-widest">{t.ageSub}</p>
      </div>
      
      <div className="grid gap-5">
        {AGE_GROUPS_CONFIG.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelect(group.id)}
            className="btn-pro group flex items-center p-6 text-start border-white/10 hover:border-blue-500"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl group-hover:bg-blue-600/20 transition-all border border-white/5">
              {group.emoji}
            </div>
            <div className={`flex-1 ${lang === 'ar' ? 'mr-6' : 'ml-6'}`}>
              <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase">
                {t.ageGroups[group.id].label}
              </h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wide mt-1 opacity-70">
                {t.ageGroups[group.id].sub}
              </p>
            </div>
            <span className="text-2xl text-slate-700 group-hover:text-blue-500 transition-colors ml-4">❯</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgeSelector;
