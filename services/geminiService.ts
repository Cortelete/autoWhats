
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API key for Gemini is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateMessage = async (clientType: string, service: string, tone: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.reject("API key not configured.");
  }

  const prompt = `Crie uma mensagem curta e eficaz para o WhatsApp para ser enviada a um cliente.
  
  **Informações:**
  - **Tipo de Cliente:** ${clientType}
  - **Serviço/Produto a ser oferecido:** ${service}
  - **Tom da mensagem:** ${tone}
  
  **Regras:**
  - A mensagem deve ser concisa e direta.
  - Use a variável {{nome}} para o nome do cliente.
  - Termine com uma pergunta clara para incentivar uma resposta.
  - Não inclua saudações como "Prezado(a)". Comece de forma mais pessoal.
  - Não use asteriscos para negrito, use a formatação natural do texto.
  - A mensagem deve ser em português do Brasil.

  **Exemplo de formato:**
  Olá {{nome}}, tudo bem? Notei que você [mencionar algo relevante sobre o cliente]. Tenho uma oferta especial em [serviço/produto] que pode te interessar. Gostaria de saber mais?
  
  Gere apenas o texto da mensagem.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 1,
          topK: 1,
          maxOutputTokens: 256,
          // Added thinkingConfig as it's required when maxOutputTokens is set for gemini-2.5-flash
          thinkingConfig: { thinkingBudget: 128 },
        },
    });
    
    const text = response.text;
    if (!text) {
        throw new Error("Received an empty response from the AI.");
    }
    return text.trim();
  } catch (error) {
    console.error("Error generating message with Gemini:", error);
    throw new Error("Failed to generate AI message.");
  }
};
