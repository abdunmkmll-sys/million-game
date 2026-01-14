
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  lang: Language;
  onClose: () => void;
}

const PRODUCTION_MESSAGES = [
  "Initializing Vertical Studio (9:16)...",
  "Scripting Scene 1: هل تحب التحدي؟",
  "Animating Scene 2: Quiz & Timer...",
  "Rendering Scene 3: Knowledge Icons...",
  "Processing Scene 4: Progress & Competition...",
  "Capturing Scene 5: User Achievement...",
  "Finalizing Scene 6: App Mockup...",
  "Polishing AI-generated transitions...",
  "Preparing 30-second mobile promo..."
];

const PromoVideo: React.FC<Props> = ({ lang, onClose }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productionStep, setProductionStep] = useState(0);
  const t = translations[lang];

  useEffect(() => {
    let interval: number;
    if (isLoading) {
      interval = window.setInterval(() => {
        setProductionStep((prev) => (prev + 1) % PRODUCTION_MESSAGES.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setProductionStep(0);

    try {
      // Check for API key selection as required for Veo models
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const promoPrompt = `Create a 30-second high-quality vertical (9:16) educational mobile app promotional video for 'Genius Challenge'.
      Visual Style: Simple, clean, modern, informative, using a color palette of indigo, violet, and white.
      Audio: Cinematic, inspiring professional instrumental background music. No voice narration. No lyrics.
      The video must follow this storyboard with Arabic text overlays:
      Scene 1: A person using a smartphone with a modern UI. Text: "هل تحب التحدي؟"
      Scene 2: Animated quiz questions with a 15-second timer and choices. Text: "اختبر معلوماتك في مختلف المجالات"
      Scene 3: Modern 3D icons representing culture, science, sports, and history floating. Text: "معرفة متنوعة… بطريقة ممتعة"
      Scene 4: A progress bar and score increasing with competitive animations. Text: "تعلّم… نافس… وتطوّر"
      Scene 5: A happy user moment with a trophy notification appearing. Text: "كل سؤال يقربك من الأفضل"
      Scene 6: Final app mockup on a sleek phone frame. Text: "تطبيق الأسئلة والمعرفة – قريبًا على هاتفك"
      Transitions: Smooth, futuristic, and fast-paced.`;

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: promoPrompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '9:16'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        // @ts-ignore
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed to return a URI.");

      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch the generated video file.");
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    } catch (err: any) {
      console.error("Promo Generation Error:", err);
      if (err.message?.includes("Requested entity was not found")) {
        setError(lang === 'ar' ? "يرجى اختيار مفتاح API صالح من مشروع مدفوع." : "Please select a valid API key from a paid GCP project.");
        // @ts-ignore
        window.aistudio.openSelectKey();
      } else {
        setError(lang === 'ar' ? "فشل إنشاء الفيديو. تأكد من إعدادات المفتاح والإنترنت." : "Video generation failed. Please check your API key settings and connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 animate-fade-slide">
      {!videoUrl && !isLoading && (
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-5xl shadow-inner border border-indigo-200">
            📱
          </div>
          <h2 className="text-3xl font-black text-indigo-900">
            {lang === 'ar' ? 'استوديو الفيديو القصير (AI)' : 'Mobile Promo Studio'}
          </h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            {lang === 'ar' 
              ? 'سنقوم بإنشاء فيديو ترويجي طولي (9:16) مدته 30 ثانية بتصميم عصري يناسب منصات التواصل الاجتماعي.' 
              : 'We will generate a 30-second vertical (9:16) promo video with a modern design perfect for social media.'}
          </p>
          
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-[10px] text-indigo-800 text-start space-y-1">
             <p className="font-bold mb-1">🎬 {lang === 'ar' ? 'المشاهد المبرمجة:' : 'Storyboard Scenes:'}</p>
             <p>1. {lang === 'ar' ? 'هل تحب التحدي؟' : 'Do you love challenges?'}</p>
             <p>2. {lang === 'ar' ? 'اختبر معلوماتك...' : 'Test your knowledge...'}</p>
             <p>3. {lang === 'ar' ? 'معرفة متنوعة...' : 'Diverse knowledge...'}</p>
             <p>4. {lang === 'ar' ? 'تعلّم ونافس...' : 'Learn & Compete...'}</p>
             <p>5. {lang === 'ar' ? 'الإنجاز الشخصي' : 'Personal Achievement'}</p>
             <p>6. {lang === 'ar' ? 'قريباً على هاتفك' : 'Coming soon to your phone'}</p>
          </div>

          {error && (
            <p className="text-red-600 font-bold bg-red-50 p-3 rounded-xl border border-red-100 text-sm">
              {error}
            </p>
          )}

          <button
            onClick={handleGenerate}
            className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-xl hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            🎬 {lang === 'ar' ? 'إنشاء العرض القصير' : 'Generate Mobile Promo'}
          </button>
        </div>
      )}

      {isLoading && (
        <div className="text-center space-y-8 animate-pulse">
          <div className="relative">
             <div className="w-32 h-32 border-8 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
             <div className="absolute inset-0 flex items-center justify-center text-4xl">📽️</div>
          </div>
          <div className="space-y-4">
             <h3 className="text-2xl font-black text-indigo-900">
                {lang === 'ar' ? 'جاري بناء الفيديو القصير...' : 'Building Mobile Promo...'}
             </h3>
             <p className="text-indigo-600 font-black tracking-widest uppercase text-xs">
                {PRODUCTION_MESSAGES[productionStep]}
             </p>
          </div>
          <div className="w-full bg-indigo-100 h-2 rounded-full max-w-xs mx-auto overflow-hidden">
             <div className="h-full bg-indigo-600 animate-progress"></div>
          </div>
        </div>
      )}

      {videoUrl && (
        <div className="w-full space-y-6 animate-fade-slide flex flex-col items-center">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-[500px] aspect-[9/16] bg-black relative">
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              loop
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4 w-full max-w-sm">
            <a 
              href={videoUrl} 
              download="GeniusChallenge_Vertical_Promo.mp4"
              className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-center shadow-lg hover:bg-indigo-700 transition-all"
            >
              📥 {lang === 'ar' ? 'تحميل الفيديو' : 'Download Video'}
            </a>
            <button 
              onClick={() => {setVideoUrl(null); handleGenerate();}}
              className="bg-white text-indigo-600 border-2 border-indigo-100 py-4 px-6 rounded-2xl font-black hover:bg-indigo-50 transition-all"
            >
              🔄
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 font-bold hover:text-indigo-600 transition-colors"
          >
            {lang === 'ar' ? 'إغلاق والعودة' : 'Close and Return'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PromoVideo;
