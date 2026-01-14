
import { GoogleGenAI, Type } from "@google/genai";
import { Question, AgeGroup, Category, Language, Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchQuestions = async (
  age: AgeGroup, 
  category: Category | 'daily', 
  lang: Language, 
  difficulty: Difficulty
): Promise<Question[]> => {
  const langName = { ar: "Arabic", en: "English", fr: "French", es: "Spanish", de: "German" }[lang];
  const dateStr = new Date().toISOString().split('T')[0];
  
  const isDaily = category === 'daily';
  const categoryName = isDaily ? "Mixed Daily Challenge" : (category as Category).name[lang];
  
  const prompt = `Quickly generate 10 unique MCQs in ${langName}.
Date Context: ${dateStr}
Category: ${categoryName}
Target: ${age} group, ${isDaily ? 'Hard' : difficulty} level.
${isDaily ? 'Note: Since this is a Daily Challenge, make the questions highly interesting and diverse across different fields (science, history, football, technology, etc.).' : ''}
Structure: Question, 4 options, 1 correct, short explanation, and a helpful hint that doesn't reveal the answer directly.
Format: JSON only.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING },
              hint: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer", "explanation", "hint"]
          }
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error(lang === 'ar' ? "فشل التحميل، حاول مجدداً." : "Failed to load, try again.");
  }
};
