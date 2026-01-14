
import { Category, AgeGroup } from './types';

export const CATEGORIES: Category[] = [
  { id: 'football', name: { ar: 'كرة القدم', en: 'Football', fr: 'Football', es: 'Fútbol', de: 'Fußball' }, icon: '⚽', color: 'bg-green-500' },
  { id: 'science', name: { ar: 'العلوم', en: 'Science', fr: 'Sciences', es: 'Ciencia', de: 'Wissenschaft' }, icon: '🔬', color: 'bg-blue-500' },
  { id: 'chemistry', name: { ar: 'الكيمياء', en: 'Chemistry', fr: 'Chimie', es: 'Química', de: 'Chemie' }, icon: '🧪', color: 'bg-purple-500' },
  { id: 'technology', name: { ar: 'تكنولوجيا', en: 'Technology', fr: 'Technologie', es: 'Tecnología', de: 'Technologie' }, icon: '💻', color: 'bg-cyan-600' },
  { id: 'movies', name: { ar: 'أفلام', en: 'Movies', fr: 'Films', es: 'Películas', de: 'Filme' }, icon: '🎬', color: 'bg-rose-600' },
  { id: 'history', name: { ar: 'التاريخ', en: 'History', fr: 'Histoire', es: 'Historia', de: 'Geschichte' }, icon: '📜', color: 'bg-amber-500' },
  { id: 'geography', name: { ar: 'الجغرافيا', en: 'Geography', fr: 'Géographie', es: 'Geografía', de: 'Geografie' }, icon: '🗺️', color: 'bg-teal-500' },
  { id: 'art', name: { ar: 'الفنون', en: 'Art', fr: 'Art', es: 'Arte', de: 'Kunst' }, icon: '🎨', color: 'bg-pink-500' },
  { id: 'music', name: { ar: 'الموسيقى', en: 'Music', fr: 'Musique', es: 'Música', de: 'Musik' }, icon: '🎵', color: 'bg-indigo-500' },
  { id: 'general', name: { ar: 'ثقافة عامة', en: 'General Knowledge', fr: 'Culture Générale', es: 'Cultura General', de: 'Allgemeinwissen' }, icon: '🌍', color: 'bg-red-500' },
];

export const AGE_GROUPS_CONFIG: { id: AgeGroup; emoji: string }[] = [
  { id: 'child', emoji: '👦' },
  { id: 'teen', emoji: '🧑' },
  { id: 'adult', emoji: '🧔' },
];
