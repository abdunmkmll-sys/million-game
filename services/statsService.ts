
const STATS_KEY = 'million_platform_stats';

export interface UserStats {
  totalGames: number;
  totalCorrect: number;
  totalQuestions: number;
  dailyChallengesCompleted: number;
  bestScorePercentage: number;
}

const defaultStats: UserStats = {
  totalGames: 0,
  totalCorrect: 0,
  totalQuestions: 0,
  dailyChallengesCompleted: 0,
  bestScorePercentage: 0
};

export const statsService = {
  getStats: (): UserStats => {
    const data = localStorage.getItem(STATS_KEY);
    if (!data) return defaultStats;
    try {
      return JSON.parse(data);
    } catch {
      return defaultStats;
    }
  },

  recordGame: (correct: number, total: number, isDaily: boolean) => {
    const stats = statsService.getStats();
    const percentage = (correct / total) * 100;
    
    const updated: UserStats = {
      totalGames: stats.totalGames + 1,
      totalCorrect: stats.totalCorrect + correct,
      totalQuestions: stats.totalQuestions + total,
      dailyChallengesCompleted: isDaily ? stats.dailyChallengesCompleted + 1 : stats.dailyChallengesCompleted,
      bestScorePercentage: Math.max(stats.bestScorePercentage, percentage)
    };
    
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
    return updated;
  }
};
