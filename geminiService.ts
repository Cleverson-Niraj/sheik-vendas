
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhanceAdDescription = async (title: string, currentDesc: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Melhore esta descrição de anúncio para o produto "${title}". Descrição original: "${currentDesc}". Torne-a persuasiva, profissional e em português brasileiro. Use bullet points se necessário.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    return response.text || currentDesc;
  } catch (error) {
    console.error("Gemini Error:", error);
    return currentDesc;
  }
};

export const suggestPrice = async (title: string, category: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sugira um preço médio de mercado para um "${title}" na categoria "${category}" no Brasil. Responda apenas o valor numérico em reais.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedPrice: { type: Type.NUMBER }
          },
          required: ["suggestedPrice"]
        }
      }
    });
    const data = JSON.parse(response.text || '{"suggestedPrice": 0}');
    return data.suggestedPrice;
  } catch (error) {
    console.error("Price Suggestion Error:", error);
    return 0;
  }
};
