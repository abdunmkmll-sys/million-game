
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
  onStart: () => void;
}

const Intro: React.FC<Props> = ({ lang, onStart }) => {
  const t = translations[lang];

  return (
    <div className="flex flex-col items-center justify-center text-center w-full animate-fade-slide space-y-12 py-12">
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        
        {/* Colorful ring container */}
        <div className="w-48 h-48 md:w-56 md:h-56 p-1.5 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 relative z-10 overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.4)]">
          <div className="w-full h-full bg-black rounded-full overflow-hidden border-4 border-black">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
              alt="Genius"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
          {t.title}
        </h2>
        <p className="text-slate-400 font-bold max-w-sm mx-auto text-base md:text-lg leading-relaxed">
          {lang === 'ar' ? 'تحدَّ حدود عقلك وانطلق في رحلة ذكاء غير محدودة.' : 'Challenge your brain limits and start an infinite journey.'}
        </p>
      </div>

      <div className="w-full max-w-sm">
        <button
          onClick={onStart}
          className="btn-blue w-full py-6 text-2xl tracking-tighter uppercase"
        >
          {lang === 'ar' ? 'ابدأ التحدي الآن' : 'START CHALLENGE'}
        </button>
      </div>

      <div className="pt-8">
        <p className="text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase">
          MADE WITH ABDO
        </p>
      </div>
    </div>
  );
};

export default Intro;