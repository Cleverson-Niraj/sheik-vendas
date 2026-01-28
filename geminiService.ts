
import { GoogleGenAI } from "@google/genai";

// Pega a chave do Vite (frontend). Se não tiver, desliga o Gemini sem quebrar o site.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Só cria o cliente se tiver chave
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// 🔹 Melhora a descrição do anúncio (se Gemini existir)
export const enhanceAdDescription = async (
  title: string,
  currentDesc: string
) => {
  try {
    // ✅ Sem chave = não chama Gemini, retorna a descrição atual
    if (!ai) return currentDesc;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Melhore esta descrição de anúncio para o item: ${title}. Descrição atual: ${currentDesc}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    return response.text || currentDesc;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentDesc;
  }
};

// 🔹 Sugere preço (fallback para não quebrar o build)
export const suggestPrice = async (_title: string, _desc?: string) => {
  // Gemini desligado por enquanto
  return null;
};
