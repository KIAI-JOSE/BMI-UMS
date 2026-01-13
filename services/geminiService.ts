import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, context?: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `You are the BMI University AI Assistant, a high-level institutional advisor for the BMI University Management System. 
    BMI University is a prestigious institution known for its specialized faculties: 
    1. School of Theology (Dean: Dr. Samuel Kiptoo)
    2. Department of ICT (Lead: Prof. Alice Mwangi)
    3. School of Business (Lead: Dr. Jane Okumu)
    4. Education Department (Lead: Prof. Peter Kamau)
    
    Institutional Data Context:
    - Total Students: ~3,600
    - Total Staff: ~150
    - Motto: "Excellence in Faith and Knowledge"
    - Location: Main campus in a serene environment with Bethlehem Hall and Eden Residence.
    
    Your role is to help administrators with data analysis, drafting official communications, summarizing financial reports, and providing academic insights. 
    Always be professional, concise, and helpful. Use institutional terminology where appropriate.
    
    Current User Context: ${context || 'General Administrator'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      }
    });
    
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I apologize, but I encountered an error while accessing the institutional knowledge base. Please try again or contact the ICT department.";
  }
};