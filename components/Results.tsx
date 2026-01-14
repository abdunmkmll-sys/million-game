
import React, { useState, useEffect } from 'react';
import { Language, AgeGroup, Category, Difficulty, CommunityComment } from '../types';
import { translations } from '../translations';
import { leaderboardService } from '../services/leaderboardService';
import { firebaseService } from '../services/firebaseService';
import { statsService } from '../services/statsService';

interface Props {
  lang: Language;
  score: number;
  total: number;
  onReset: () => void;
  onViewLeaderboard: () => void;
  age: AgeGroup;
  category: Category;
  difficulty: Difficulty;
  isDailyChallenge?: boolean;
}

const Results: React.FC<Props> = ({ lang, score, total, onReset, onViewLeaderboard, age, category, difficulty, isDailyChallenge }) => {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [recentComments, setRecentComments] = useState<CommunityComment[]>([]);
  
  const percentage = Math.round((score / total) * 100);
  const t = translations[lang];
  const incorrectCount = total - score;
  
  let feedback = t.excellent;
  let emoji = "🏆";
  
  if (percentage < 40) {
    feedback = t.keepTrying;
    emoji = "📚";
  } else if (percentage < 70) {
    feedback = t.good;
    emoji = "👏";
  }

  useEffect(() => {
    statsService.recordGame(score, total, !!isDailyChallenge);
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const comments = await firebaseService.getRecentComments(15);
      setRecentComments(comments);
    } catch (e) {
      console.error("Error fetching comments", e);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaved(true);
    try {
      await leaderboardService.addScore({
        name,
        score,
        total,
        category: isDailyChallenge ? t.dailyTitle : category.name[lang],
        difficulty,
        age
      });
    } catch (e) {
      console.error("Save error", e);
      setSaved(false);
    }
  };

  const handlePostComment = async () => {
    const finalName = name || (lang === 'ar' ? 'لاعب مجهول' : 'Anonymous Player');
    if (!commentText.trim()) return;

    setIsPosting(true);
    try {
      await firebaseService.saveComment(finalName, commentText, lang);
      setPostSuccess(true);
      setCommentText('');
      await fetchComments();
      
      setTimeout(() => setPostSuccess(false), 5000);
    } catch (e: any) {
      console.error("Post failed", e);
      alert(lang === 'ar' 
        ? "عذراً، فشل نشر التعليق. تأكد من إعدادات Firebase وتوفر الإنترنت." 
        : "Failed to post comment. Please check your Firebase settings and internet.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="text-center w-full animate-fade-slide overflow-y-auto max-h-[85vh] px-2 custom-scrollbar pb-10">
      <div className="text-8xl mb-6">{emoji}</div>
      
      {isDailyChallenge && score >= 7 && (
        <div className="mb-6 animate-bounce">
          <div className="bg-amber-100 text-amber-700 px-8 py-3 rounded-full border-2 border-amber-500 font-black inline-flex items-center gap-3 shadow-lg">
            <span>✨</span> {t.dailyReward}
          </div>
        </div>
      )}

      <h2 className="text-4xl font-black text-indigo-900 mb-2">{percentage}%</h2>
      <p className="text-xl text-gray-600 mb-6">
        {t.scoreMsg(score, total)}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex flex-col items-center">
          <span className="text-2xl mb-1">✅</span>
          <span className="text-xl font-black text-green-700">{score}</span>
          <span className="text-[10px] uppercase font-bold text-green-600">{t.stats.correct}</span>
        </div>
        <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex flex-col items-center">
          <span className="text-2xl mb-1">❌</span>
          <span className="text-xl font-black text-red-700">{incorrectCount}</span>
          <span className="text-[10px] uppercase font-bold text-red-600">{t.stats.incorrect}</span>
        </div>
        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex flex-col items-center">
          <span className="text-2xl mb-1">📋</span>
          <span className="text-xl font-black text-indigo-700">{total}</span>
          <span className="text-[10px] uppercase font-bold text-indigo-600">{t.stats.total}</span>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur p-5 rounded-3xl mb-10 border border-indigo-100 shadow-sm">
        <p className="text-indigo-800 font-black text-xl">{feedback}</p>
      </div>

      {!saved ? (
        <div className="mb-10 flex gap-2 p-1 bg-white rounded-2xl shadow-md border border-gray-100">
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.leaderboard.enterName}
            className="flex-1 px-5 py-4 rounded-xl outline-none transition-all text-base font-bold text-indigo-900 bg-transparent"
          />
          <button 
            onClick={handleSave}
            disabled={!name.trim()}
            className="bg-indigo-600 text-white px-6 py-4 rounded-xl font-black text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg active:scale-95"
          >
            {t.leaderboard.saveScore}
          </button>
        </div>
      ) : (
        <div className="mb-10 p-4 bg-green-50 text-green-700 rounded-2xl font-black text-sm animate-pop flex items-center justify-center gap-3 border border-green-200">
          <span className="text-xl">🌟</span>
          <span>{lang === 'ar' ? 'تم حفظ نتيجتك في قائمة الشرف!' : 'Your score is now on the leaderboard!'}</span>
        </div>
      )}

      <div className="mt-12 mb-10 bg-white/60 p-6 md:p-8 rounded-[3rem] border border-white shadow-2xl backdrop-blur-md text-start">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-indigo-900 flex items-center gap-3">
            <span className="bg-indigo-100 p-2 rounded-xl text-xl">🖼️</span> 
            {t.community.title}
          </h3>
        </div>
        
        {!postSuccess ? (
          <div className="space-y-5 mb-10">
            <div className="relative">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={t.community.commentPlaceholder}
                disabled={isPosting}
                className="w-full p-5 rounded-3xl border-2 border-indigo-50 focus:border-indigo-400 focus:bg-white outline-none h-32 text-base bg-white/50 resize-none transition-all shadow-inner font-medium disabled:opacity-50"
              />
            </div>
            
            <button
              onClick={handlePostComment}
              disabled={isPosting || !commentText.trim()}
              className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {isPosting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{lang === 'ar' ? 'جاري النشر...' : 'Posting...'}</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  {t.community.post}
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="p-8 bg-green-50 text-green-700 rounded-[2rem] font-black text-lg mb-10 animate-pop text-center border-2 border-green-200 shadow-md">
            <span className="block text-4xl mb-2">🎉</span>
            {t.community.success}
          </div>
        )}

        <div className="space-y-8">
          <div className="flex items-center gap-4">
             <h4 className="text-sm font-black text-indigo-400 uppercase tracking-[0.2em]">{t.community.recent}</h4>
             <div className="flex-1 h-px bg-indigo-100"></div>
          </div>
          
          {recentComments.length > 0 ? (
            <div className="grid gap-6">
              {recentComments.map((comment) => (
                <div key={comment.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group animate-fade-slide">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black">
                        {comment.userName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-black text-indigo-900 text-base">{comment.userName}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-black bg-gray-50 px-3 py-1 rounded-full">{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed font-medium">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-indigo-50/30 rounded-[2rem] border-2 border-dashed border-indigo-100">
               <p className="text-indigo-400 font-bold italic">{t.community.noComments}</p>
               <span className="text-4xl mt-4 block grayscale opacity-30">🏜️</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <button
          onClick={onReset}
          className="bg-indigo-600 text-white px-8 py-5 rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-95"
        >
          {t.tryAgain}
        </button>
        <button
          onClick={onViewLeaderboard}
          className="bg-white/80 backdrop-blur border-2 border-indigo-100 text-indigo-600 px-8 py-4 rounded-[2rem] font-black hover:bg-indigo-50 transition-all active:scale-95"
        >
          {t.leaderboard.viewAll}
        </button>
      </div>
    </div>
  );
};

export default Results;
