
import { LeaderboardEntry } from '../types';
import { firebaseService } from './firebaseService';

const STORAGE_KEY = 'quiz_leaderboard';

export const leaderboardService = {
  getScores: async (): Promise<LeaderboardEntry[]> => {
    // Try to get from Firebase first
    try {
      const firebaseScores = await firebaseService.getTopScores(20);
      if (firebaseScores.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(firebaseScores));
        return firebaseScores;
      }
    } catch (e) {
      console.warn("Falling back to local leaderboard");
    }

    // Fallback to local
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data).sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score);
    } catch (e) {
      return [];
    }
  },

  addScore: async (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => {
    // Save to Firebase (Global)
    try {
      await firebaseService.saveLeaderboardScore(entry);
    } catch (e) {
      console.error("Failed to save score to Firebase");
    }

    // Save to LocalStorage (Local History)
    const localData = localStorage.getItem(STORAGE_KEY);
    const scores: LeaderboardEntry[] = localData ? JSON.parse(localData) : [];
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      date: Date.now(),
    };
    const updatedScores = [...scores, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
  },

  clearScores: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
