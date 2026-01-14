
export type AgeGroup = 'child' | 'teen' | 'adult';
export type Language = 'ar' | 'en' | 'fr' | 'es' | 'de';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type MediaType = 'image' | 'video' | 'file';

export interface Category {
  id: string;
  name: Record<Language, string>;
  icon: string;
  color: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  total: number;
  category: string;
  difficulty: Difficulty;
  age: AgeGroup;
  date: number;
}

export interface CommunityComment {
  id: string;
  userName: string;
  text: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  fileName?: string;
  date: number;
  lang: Language;
}

export interface QuizState {
  language: Language;
  showLanding: boolean;
  showIntro: boolean;
  showAbout: boolean;
  showAcknowledgments: boolean;
  age: AgeGroup | null;
  category: Category | null;
  difficulty: Difficulty;
  questions: Question[];
  currentIndex: number;
  score: number;
  isFinished: boolean;
  isLoading: boolean;
  error: string | null;
  showLeaderboard: boolean;
  isDailyChallenge: boolean;
  hintUsedInQuiz: boolean;
}
