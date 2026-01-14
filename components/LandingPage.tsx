
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
  onStart: () => void;
  onDailyChallenge?: () => void;
}

const LandingPage: React.FC<Props> = ({ lang, onStart, onDailyChallenge }) => {
  const t = translations[lang];

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar animate-fade-slide">
      {/* قسم الترحيب والإهداء (جديد) */}
      {lang === 'ar' && (
        <section className="px-6 pt-8 mb-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 md:p-8 rounded-[2.5rem] border border-indigo-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">✨</div>
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-black text-indigo-900 mb-4 flex items-center gap-2">
                <span>👋</span>
                مرحباً بكم في منصّة المليون
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed font-medium">
                <p>
                  نبدأ رحلتنا بوقفة إجلال وامتنان لصُنّاع العقول؛ شكرًا خاصًا للأستاذ الفاضل 
                  <span className="text-indigo-600 font-black"> مصطفى </span> 
                  الذي علّمني القرآن الكريم وغرس فيّ أسمى القيم والأخلاق، وللأستاذ المبدع 
                  <span className="text-indigo-600 font-black"> فواز </span> 
                  الذي علّمني أساسيات البرمجة وفتح لي آفاق التفكير المنطقي والإبداعي.
                </p>
                <p>
                  أنتم المشاعل التي تضيء دروبنا، جزاكم الله عنّا خير الجزاء وبارك في علمكم وعملكم، 
                  فبصماتكم هي الوقود الذي دفعنا لبناء هذه المنصة.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-indigo-100 text-indigo-600 font-black italic">
                منصّة المليون.. لكي لا تتوقف عجلة العلم أبداً.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 1) العنوان الرئيسي */}
      <section className="text-center py-12 px-4 bg-gradient-to-b from-indigo-900/20 to-transparent rounded-[3rem] mb-8">
        <h1 className="text-4xl md:text-6xl font-black text-indigo-900 mb-6 leading-tight">
          {lang === 'ar' ? 'منصة المليون' : 'The Million Platform'}
          <span className="block text-xl md:text-2xl text-indigo-600 mt-2 font-bold opacity-80">
            {lang === 'ar' ? 'بوابتك نحو عالم المعرفة اللامحدود' : 'Your gateway to a world of unlimited knowledge'}
          </span>
        </h1>
        <div className="w-24 h-2 bg-indigo-600 mx-auto rounded-full mb-8"></div>
      </section>

      {/* Feature: Daily Challenge Section */}
      <section className="px-6 mb-16">
        <div className="relative group cursor-pointer" onClick={onDailyChallenge}>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-[3rem] border-4 border-white shadow-2xl flex flex-col md:flex-row items-center gap-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full translate-x-10 -translate-y-10"></div>
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-5xl">📅</div>
            <div className="flex-1 text-center md:text-start">
              <span className="bg-amber-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-3 inline-block">Featured</span>
              <h2 className="text-2xl md:text-3xl font-black text-amber-900 mb-2">{t.dailyTitle}</h2>
              <p className="text-amber-800/70 font-bold">{t.dailySub}</p>
            </div>
            <button className="bg-amber-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl hover:bg-amber-700 transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
               {lang === 'ar' ? 'العب الآن' : 'Play Now'}
            </button>
          </div>
        </div>
      </section>

      {/* 2) فكرة المنصة */}
      <section className="px-6 mb-16 text-center max-w-2xl mx-auto">
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white shadow-xl">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
            {lang === 'ar' 
              ? 'تعتبر منصة المليون تجربة تعليمية فريدة تمزج بين "التحدي والمعرفة" و"المتعة"، حيث تقدم محتوى ثقافياً وتعليمياً متنوعاً مصمماً خصيصاً ليناسب مختلف الفئات العمرية بتطوير الفنان عبدو اشرف.'
              : 'The Million Platform is a unique educational experience that blends "Challenge, Knowledge, and Fun," offering diverse cultural and educational content tailored specifically to all age groups, developed by artist Abdo Ashraf.'}
          </p>
        </div>
      </section>

      {/* 3) أهداف المنصة */}
      <section className="px-6 mb-16">
        <h2 className="text-3xl font-black text-indigo-900 mb-8 flex items-center gap-3">
          <span className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl">🎯</span>
          {lang === 'ar' ? 'أهداف المنصة' : 'Platform Goals'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '💡', title: lang === 'ar' ? 'نشر المعرفة' : 'Spreading Knowledge', desc: lang === 'ar' ? 'نشر المعلومات بأسلوب ممتع وتفاعلي يكسر روتين التلقيد.' : 'Spreading information in a fun and interactive way.' },
            { icon: '🧠', title: lang === 'ar' ? 'تحفيز التفكير' : 'Stimulating Thinking', desc: lang === 'ar' ? 'تشجيع المستخدمين على التحليل والتفكير النقدي من خلال التحديات.' : 'Encouraging users to analyze and think critically.' },
            { icon: '📈', title: lang === 'ar' ? 'تطوير الثقافة' : 'Developing Culture', desc: lang === 'ar' ? 'إثراء الحصيلة المعلوماتية في مجالات العلوم، الرياضة، والتاريخ.' : 'Enriching knowledge in science, sports, and history.' },
            { icon: '⏳', title: lang === 'ar' ? 'استثمار الوقت' : 'Investing Time', desc: lang === 'ar' ? 'تحويل وقت الفراغ إلى قيمة معرفية مضافة تنمي المدارك.' : 'Transforming free time into added intellectual value.' },
            { icon: '🤝', title: lang === 'ar' ? 'روح التحدي' : 'Competitive Spirit', desc: lang === 'ar' ? 'خلق بيئة تنافسية إيجابية بين المستخدمين عالمياً.' : 'Creating a positive competitive environment globally.' }
          ].map((goal, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm hover:shadow-md transition-all group">
              <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform">{goal.icon}</div>
              <h3 className="text-xl font-black text-indigo-800 mb-2">{goal.title}</h3>
              <p className="text-gray-600 text-sm font-medium">{goal.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4) لماذا منصة المليون؟ */}
      <section className="px-6 mb-16">
        <h2 className="text-3xl font-black text-indigo-900 mb-8 flex items-center gap-3">
          <span className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl">✨</span>
          {lang === 'ar' ? 'لماذا منصة المليون؟' : 'Why Million Platform?'}
        </h2>
        <div className="space-y-4">
          {[
            { title: lang === 'ar' ? 'سهولة الاستخدام' : 'Ease of Use', icon: '📱', desc: lang === 'ar' ? 'واجهة عصرية وبسيطة تمكن الجميع من البدء فوراً.' : 'A modern and simple interface for everyone.' },
            { title: lang === 'ar' ? 'تنوع المجالات' : 'Diverse Fields', icon: '🌍', desc: lang === 'ar' ? 'شمال الثقافة، العلوم، التاريخ، والرياضة في مكان واحد.' : 'Culture, Science, History, and Sports in one place.' },
            { title: lang === 'ar' ? 'التدرج في المستويات' : 'Gradual Difficulty', icon: '🪜', desc: lang === 'ar' ? 'مستويات مخصصة تبدأ من السهل وصولاً إلى تحديات العباقرة.' : 'Levels ranging from easy to genius challenges.' },
            { title: lang === 'ar' ? 'نظام النقاط والإنجازات' : 'Achievements System', icon: '🏆', desc: lang === 'ar' ? 'لوحة متصدرين وجوائز رمزية تحفزك على الاستمرار.' : 'Leaderboard and awards to keep you motivated.' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-5 bg-indigo-50/50 p-5 rounded-[2rem] border border-indigo-100/50">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl">{item.icon}</div>
              <div>
                <h4 className="font-black text-indigo-900">{item.title}</h4>
                <p className="text-gray-600 text-xs font-bold">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5) الخاتمة والتحفيز */}
      <section className="px-6 pb-12 text-center">
        <div className="bg-indigo-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <h3 className="text-2xl md:text-3xl font-black mb-8 relative z-10">
            {lang === 'ar' ? 'منصة المليون… حيث المعرفة تصنع الفارق' : 'Million Platform... where knowledge makes the difference'}
          </h3>
          
          <button
            onClick={onStart}
            className="bg-white text-indigo-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-1 active:scale-95 relative z-10"
          >
            {lang === 'ar' ? 'انطلق الآن' : 'Start Now'}
          </button>
        </div>

        <p className="mt-8 text-white font-black text-2xl tracking-widest uppercase">
          MADE WITH ABDO
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
