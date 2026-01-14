
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
  onClose: () => void;
  onOpenAcknowledgments?: () => void;
}

const About: React.FC<Props> = ({ lang, onClose, onOpenAcknowledgments }) => {
  const t = translations[lang];

  return (
    <div className="w-full animate-fade-slide overflow-y-auto max-h-[80vh] custom-scrollbar px-2">
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/10 backdrop-blur-md p-2 rounded-2xl z-20">
        <h2 className="text-3xl font-black text-indigo-900">{t.about.title}</h2>
        <button 
          onClick={onClose}
          className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all"
        >
          ✕
        </button>
      </div>

      <div className="space-y-8 pb-10">
        <section className="bg-white/40 p-6 rounded-3xl border border-indigo-100 shadow-sm">
          <div className="text-4xl mb-4">🌍</div>
          <h3 className="text-xl font-black text-indigo-800 mb-3">{lang === 'ar' ? 'رسالتنا' : 'Our Mission'}</h3>
          <p className="text-gray-700 leading-relaxed font-medium">
            {t.about.description}
          </p>
        </section>

        <section className="bg-white/40 p-6 rounded-3xl border border-indigo-100 shadow-sm">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-black text-indigo-800 mb-3">{lang === 'ar' ? 'الهدف' : 'The Goal'}</h3>
          <p className="text-gray-700 leading-relaxed font-medium">
            {t.about.purpose}
          </p>
        </section>

        <section className="bg-white/40 p-6 rounded-3xl border border-indigo-100 shadow-sm">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-black text-indigo-800 mb-3">{lang === 'ar' ? 'التقنية المستخدمة' : 'Technology'}</h3>
          <p className="text-gray-700 leading-relaxed font-medium">
            {t.about.tech}
          </p>
        </section>

        {/* إضافة زر الشكر والتقدير */}
        {lang === 'ar' && onOpenAcknowledgments && (
          <button 
            onClick={onOpenAcknowledgments}
            className="w-full p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl text-white text-center transform hover:scale-[1.02] transition-all group"
          >
            <div className="text-4xl mb-2 group-hover:animate-bounce">💌</div>
            <h3 className="text-xl font-black">شكر وتقدير خاص</h3>
            <p className="text-white/80 text-sm mt-1">رسالة وفاء إلى من أناروا لنا دروب العلم</p>
          </button>
        )}

        <section className="bg-indigo-900/10 p-8 rounded-3xl border-2 border-dashed border-indigo-300 text-center">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-black text-indigo-900 mb-4">{lang === 'ar' ? 'فريق العمل' : 'The Team'}</h3>
          <p className="text-gray-600 mb-6 italic font-bold">
            {t.about.credits}
          </p>
          <div className="flex items-center justify-center gap-4">
             <div className="h-px flex-1 bg-indigo-300"></div>
             <p className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
               MADE WITH ABDO
             </p>
             <div className="h-px flex-1 bg-indigo-300"></div>
          </div>
        </section>
      </div>

      <button
        onClick={onClose}
        className="w-full mt-4 bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all hover:-translate-y-1 active:scale-95"
      >
        {t.backHome}
      </button>
    </div>
  );
};

export default About;