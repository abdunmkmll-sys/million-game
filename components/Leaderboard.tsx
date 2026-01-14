
import React, { useEffect, useState } from 'react';
import { Language, LeaderboardEntry } from '../types';
import { translations } from '../translations';
import { leaderboardService } from '../services/leaderboardService';
import { statsService, UserStats } from '../services/statsService';

interface Props {
  lang: Language;
  onClose: () => void;
}

const Leaderboard: React.FC<Props> = ({ lang, onClose }) => {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'global' | 'my-stats'>('global');
  const t = translations[lang];
  const stats = statsService.getStats();

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      const data = await leaderboardService.getScores();
      setScores(data);
      setLoading(false);
    };
    fetchScores();
  }, []);

  return (
    <div className="w-full animate-fade-slide pb-10 overflow-y-auto max-h-[85vh] custom-scrollbar px-2">
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/10 backdrop-blur-md p-2 rounded-2xl z-20">
        <h2 className="text-2xl font-black text-indigo-900">{t.leaderboard.title}</h2>
        <button 
          onClick={onClose}
          className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all"
        >
          ✕
        </button>
      </div>

      <div className="flex p-1 bg-white/50 backdrop-blur-sm rounded-2xl border border-indigo-100 mb-8 max-w-sm mx-auto">
        <button 
          onClick={() => setView('global')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${view === 'global' ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-900/40'}`}
        >
          {lang === 'ar' ? 'العالمية' : 'Global'}
        </button>
        <button 
          onClick={() => setView('my-stats')}
          className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${view === 'my-stats' ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-900/40'}`}
        >
          {lang === 'ar' ? 'إحصائياتي' : 'My Stats'}
        </button>
      </div>

      {view === 'global' ? (
        loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-indigo-900/40 font-black animate-pulse">{t.loading}</p>
          </div>
        ) : scores.length === 0 ? (
          <div className="text-center py-10 bg-white/40 rounded-[2rem] border-2 border-dashed border-indigo-100">
            <p className="text-indigo-900/40 font-bold">{t.leaderboard.noScores}</p>
          </div>
        ) : (
          <div className="overflow-hidden bg-white/80 backdrop-blur-sm rounded-[2rem] border border-indigo-50 shadow-xl">
            <table className="w-full text-start">
              <thead className="bg-indigo-50/50 text-indigo-900/40 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="px-5 py-4 text-start font-black">{t.leaderboard.rank}</th>
                  <th className="px-5 py-4 text-start font-black">{t.leaderboard.name}</th>
                  <th className="px-5 py-4 text-center font-black">{t.leaderboard.category}</th>
                  <th className="px-5 py-4 text-center font-black">{t.leaderboard.score}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-50/30">
                {scores.map((entry, index) => (
                  <tr key={entry.id} className={`${index === 0 ? 'bg-amber-50/30' : ''} hover:bg-indigo-50/20 transition-colors`}>
                    <td className="px-5 py-5 font-black text-indigo-900/60">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </td>
                    <td className="px-5 py-5 font-black text-indigo-900 truncate max-w-[120px]">
                      {entry.name}
                    </td>
                    <td className="px-5 py-5 text-center">
                      <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-center font-black text-indigo-700 text-lg">
                      {entry.score}<span className="text-[10px] text-indigo-900/30 font-bold ml-1">/{entry.total}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-slide">
          <StatCard icon="🎮" label={lang === 'ar' ? 'إجمالي الألعاب' : 'Total Games'} value={stats.totalGames} />
          <StatCard icon="🎯" label={lang === 'ar' ? 'إجابات صحيحة' : 'Correct Answers'} value={stats.totalCorrect} />
          <StatCard icon="📅" label={lang === 'ar' ? 'تحديات يومية' : 'Daily Completed'} value={stats.dailyChallengesCompleted} />
          <StatCard icon="⚡" label={lang === 'ar' ? 'أفضل نسبة' : 'Best Percentage'} value={`${stats.bestScorePercentage}%`} />
          <div className="col-span-full bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10"></div>
             <h3 className="text-xl font-black mb-2">{lang === 'ar' ? 'إجمالي الأسئلة' : 'Total Questions'}</h3>
             <p className="text-5xl font-black">{stats.totalQuestions}</p>
             <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white shadow-[0_0_10px_white]" style={{ width: `${stats.totalQuestions > 0 ? (stats.totalCorrect / stats.totalQuestions) * 100 : 0}%` }}></div>
             </div>
          </div>
        </div>
      )}

      <button
        onClick={onClose}
        className="w-full mt-12 bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl hover:bg-indigo-700 transition-all hover:-translate-y-1 active:scale-95"
      >
        {t.backHome}
      </button>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: string, label: string, value: string | number }) => (
  <div className="bg-white/80 p-6 rounded-[2rem] border border-indigo-50 shadow-sm flex items-center gap-5">
    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">{icon}</div>
    <div>
      <h4 className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest">{label}</h4>
      <p className="text-2xl font-black text-indigo-900">{value}</p>
    </div>
  </div>
);

export default Leaderboard;
