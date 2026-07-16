import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MODEL = "gemini-3.5-flash";
const MAX_ATTEMPTS = 3;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateGroundedAnswer(prompt: string) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
      });
      return response.text ?? "";
    } catch (err) {
      lastError = err;
      const status = (err as { status?: number })?.status;  
      if (status === 503 && attempt < MAX_ATTEMPTS) {
        await sleep(attempt * 1000);
        continue;
      }
      break;
    }
  }

  throw lastError;
}