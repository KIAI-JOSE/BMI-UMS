import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error processing your request.";
  }
};