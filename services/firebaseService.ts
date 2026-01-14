
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs, Timestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";
import { CommunityComment, Language, MediaType, LeaderboardEntry, AgeGroup, Difficulty } from "../types";

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

// تهيئة Firebase
let app, db, storage;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export const firebaseService = {
  saveComment: async (userName: string, text: string, lang: Language, file?: File): Promise<void> => {
    if (!db) throw new Error("Database not initialized");

    let mediaUrl = "";
    let mediaType: MediaType | undefined;
    let fileName = "";

    try {
      if (file) {
        fileName = file.name;
        const extension = file.name.split('.').pop()?.toLowerCase();
        
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
          mediaType = 'image';
        } else if (['mp4', 'mov', 'avi', 'webm'].includes(extension || '')) {
          mediaType = 'video';
        } else {
          mediaType = 'file';
        }

        const path = `community/${mediaType}/${Date.now()}_${file.name}`;
        const storageRef = ref(storage, path);
        
        const snapshot = await uploadBytes(storageRef, file);
        mediaUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "comments"), {
        userName,
        text,
        lang,
        mediaUrl,
        mediaType,
        fileName,
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
          mediaUrl: data.mediaUrl,
          mediaType: data.mediaType,
          fileName: data.fileName,
          lang: data.lang,
          date: data.date ? data.date.toMillis() : Date.now()
        } as CommunityComment;
      });
    } catch (error) {
      console.error("Firebase error fetching comments:", error);
      return [];
    }
  },

  saveLeaderboardScore: async (entry: Omit<LeaderboardEntry, 'id' | 'date'>): Promise<void> => {
    if (!db) throw new Error("Database not initialized");
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
          date: data.date ? data.date.toMillis() : Date.now()
        } as LeaderboardEntry;
      });
    } catch (error) {
      console.error("Error fetching leaderboard from Firebase:", error);
      return [];
    }
  }
};
