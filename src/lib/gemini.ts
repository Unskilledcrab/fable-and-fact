import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateMystery(theme: string, playerCount: number) {
  const prompt = `
    Create a detailed mystery dinner party scenario based on the following theme: "${theme}".
    The mystery should be designed for ${playerCount} players.
    
    Format the output as a JSON object with the following structure:
    {
      "title": "The name of the mystery",
      "setting": "Description of the location and atmosphere",
      "premise": "The core conflict or event (e.g., a murder, a theft)",
      "characters": [
        {
          "name": "Character Name",
          "role": "Their job or relationship to others",
          "difficulty": "Easy, Medium, or Hard",
          "secret": "A deep secret they are hiding",
          "objective": "What they are trying to achieve tonight"
        }
      ]
    }
    
    Ensure that character secrets and objectives are interconnected (e.g., one person's secret is the key to another's objective).
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Clean up potential markdown formatting in AI response
  const jsonString = text.replace(/```json|```/g, "").trim();
  return JSON.parse(jsonString);
}
