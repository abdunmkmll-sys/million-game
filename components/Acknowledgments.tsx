
import React from 'react';
import { Language } from '../types';

interface Props {
  lang: Language;
  onClose: () => void;
}

const Acknowledgments: React.FC<Props> = ({ lang, onClose }) => {
  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar animate-fade-slide px-4 md:px-8 py-10 bg-white/5 backdrop-blur-sm rounded-[3rem]">
      {/* 1) العنوان الرئيسي */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-indigo-900 mb-4 leading-tight">
          رسالة حبّ ووفاء.. <br/> 
          <span className="text-indigo-600 text-2xl md:text-3xl">من القلب إلى صُنّاع العقول</span>
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-indigo-600 to-transparent mx-auto rounded-full"></div>
      </div>

      {/* 2) الفقرة الافتتاحية */}
      <section className="mb-12 text-center max-w-2xl mx-auto">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium italic">
          "إنّ الكلمات لتقف عاجزة، والحروف تتوارى خجلاً أمام عظمة العطاء الذي قدمتموه. أنتم المشاعل التي أضاءت لنا عتمة الجهل، والجسور التي عبرنا فوقها نحو ضفاف المعرفة. فإليكم، يا من بذلتم من أرواحكم لنحيا نحن بالعلم، نُهدي هذا العمل المتواضع."
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* 3) شكر الأستاذ فواز */}
        <div className="bg-white/80 p-8 rounded-[2.5rem] border-t-4 border-indigo-600 shadow-xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-5xl mb-6">💻</div>
          <h3 className="text-2xl font-black text-indigo-900 mb-4">الأستاذ الفاضل: فواز</h3>
          <p className="text-gray-700 leading-relaxed font-medium">
            إلى من وضع في يدي أول مفاتيح المنطق، وفتح لي آفاق التفكير البرمجي والإبداعي. الأستاذ فواز، لم يكن مجرد معلم للحاسوب، بل كان مُلهماً علّمني أن الأكواد ليست مجرد نصوص، بل هي لغة بناء المستقبل. بفضله أدركتُ أن كل مشكلة تقنية هي لغز ينتظر حلاً ذكياً. شكراً لأنك كنت الداعم الأول في بداياتي التقنية.
          </p>
        </div>

        {/* 4) شكر الأستاذ مصطفى */}
        <div className="bg-white/80 p-8 rounded-[2.5rem] border-t-4 border-emerald-600 shadow-xl transform hover:-translate-y-2 transition-all duration-300">
          <div className="text-5xl mb-6">📖</div>
          <h3 className="text-2xl font-black text-emerald-900 mb-4">الأستاذ الغالي: مصطفى</h3>
          <p className="text-gray-700 leading-relaxed font-medium">
            إلى من تشرّفتُ بالتلقّي على يديه آيات الكتاب الحكيم. الأستاذ مصطفى، الذي غرس في وجداني قيم الإيمان، وعلّمني أن العلم بلا أخلاق جسدٌ بلا روح. لقد كان قدوةً في الصبر وحسن التعليم، وشجّعني على تدبر القرآن الكريم والتمسك بهدي النبي الكريم. جزاك الله عني خير الجزاء، فبصمتك في قلبي ولساني باقية ما حييت.
          </p>
        </div>
      </div>

      {/* 5) مفردات شكر إضافية */}
      <section className="bg-indigo-900/5 p-8 rounded-[3rem] border-2 border-dashed border-indigo-200 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <span className="text-3xl block mb-2">✨</span>
            <h4 className="font-black text-indigo-900">إخلاصٌ منقطع النظير</h4>
            <p className="text-sm text-gray-600 mt-2">عطاءٌ لم يبتغِ صاحبه سوى وجه الله ونفع العباد.</p>
          </div>
          <div>
            <span className="text-3xl block mb-2">🌱</span>
            <h4 className="font-black text-indigo-900">أثرٌ خالد</h4>
            <p className="text-sm text-gray-600 mt-2">بذورُ علمٍ زرعتموها، فصارت اليوم ثماراً يقطفها الجميع.</p>
          </div>
          <div>
            <span className="text-3xl block mb-2">🤲</span>
            <h4 className="font-black text-indigo-900">دعواتٌ مستمرة</h4>
            <p className="text-sm text-gray-600 mt-2">نسأل الله أن يجعل كل حرفٍ علّمتمونا إياه في ميزان حسناتكم.</p>
          </div>
        </div>
      </section>

      {/* 6) الخاتمة والدعاء */}
      <div className="text-center space-y-6">
        <p className="text-xl font-bold text-indigo-900">
          ختاماً.. سيبقى فضلكم ديناً في أعناقنا، وستظل أسماؤكم محفورةً في ذاكرة كل من نهل من علمكم.
        </p>
        <p className="text-indigo-600 font-black text-2xl animate-pulse">
          "منصّة المليون… بفضل الله ثم بفضل معلّمينا"
        </p>
        
        <button
          onClick={onClose}
          className="mt-8 bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
        >
          {lang === 'ar' ? 'العودة للمنصة' : 'Back to Platform'}
        </button>
      </div>

      <p className="mt-12 text-center text-white font-black text-2xl tracking-tighter uppercase">
        MADE WITH ABDO
      </p>
    </div>
  );
};

export default Acknowledgments;