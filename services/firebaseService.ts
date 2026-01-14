
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs, Timestamp } from "firebase/firestore";
import { CommunityComment, Language, LeaderboardEntry } from "../types";

// إعدادات المشروع
const firebaseConfig = {
  apiKey: "AIzaSyD_k-T0xyR4bEZwnrlzEEaFij75YXOk9ts",
  authDomain: "game-9a072.firebaseapp.com",
  projectId: "game-9a072",
  storageBucket: "game-9a072.firebasestorage.app",
  messagingSenderId: "747869983667",
  appId: "1:747869983667:web:73fd5d60b2de14873bf1c6",
  measurementId: "G-4CDJRLNQY1"
};

// تهيئة Firebase بشكل آمن
let db: any = null;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export const firebaseService = {
  saveComment: async (userName: string, text: string, lang: Language): Promise<void> => {
    if (!db) {
      console.warn("Database not initialized. Comment saved locally only.");
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        userName,
        text,
        lang,
        date: Timestamp.now()
      });
    } catch (error: any) {
      console.error("Error in saveComment:", error);
      throw error;
    }
  },

  getRecentComments: async (limitCount: number = 15): Promise<CommunityComment[]> => {
    if (!db) return [];
    try {
      const q = query(collection(db, "comments"), orderBy("date", "desc"), limit(limitCount));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userName: data.userName,
          text: data.text,
          lang: data.lang,
          date: data.date ? (data.date.toMillis ? data.date.toMillis() : Date.now()) : Date.now()
        } as CommunityComment;
      });
    } catch (error) {
      console.error("Firebase error fetching comments:", error);
      return [];
    }
  },

  saveLeaderboardScore: async (entry: Omit<LeaderboardEntry, 'id' | 'date'>): Promise<void> => {
    if (!db) return;
    try {
      await addDoc(collection(db, "leaderboard"), {
        ...entry,
        date: Timestamp.now()
      });
    } catch (error) {
      console.error("Error saving score to Firebase:", error);
      throw error;
    }
  },

  getTopScores: async (limitCount: number = 20): Promise<LeaderboardEntry[]> => {
    if (!db) return [];
    try {
      const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(limitCount));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date ? (data.date.toMillis ? data.date.toMillis() : Date.now()) : Date.now()
        } as LeaderboardEntry;
      });
    } catch (error) {
      console.error("Error fetching leaderboard from Firebase:", error);
      return [];
    }
  }
};
