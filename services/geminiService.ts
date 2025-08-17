import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY is not configured. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const quizSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: {
          type: Type.STRING,
          description: "A pergunta do quiz."
        },
        options: {
          type: Type.ARRAY,
          description: "Uma lista de 4 possíveis respostas.",
          items: {
            type: Type.STRING
          }
        },
        correctAnswerIndex: {
          type: Type.INTEGER,
          description: "O índice (0-3) da resposta correta na lista de opções."
        }
      },
      required: ["question", "options", "correctAnswerIndex"]
    }
};


export const generateQuiz = async (topicName: string): Promise<QuizQuestion[]> => {
    try {
        const prompt = `Gere 5 perguntas de múltipla escolha para um estudante de educação básica no Brasil sobre o tópico: "${topicName}". A linguagem deve ser Português do Brasil. As perguntas devem ser simples e diretas. Para cada pergunta, forneça 4 opções e indique o índice da resposta correta (de 0 a 3).`;

        if (!API_KEY) {
            throw new Error("A chave da API não está configurada. O quiz não pode ser gerado.");
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        // Basic validation
        if (Array.isArray(parsedJson) && parsedJson.every(q => 'question' in q && 'options' in q && 'correctAnswerIndex' in q)) {
            return parsedJson as QuizQuestion[];
        } else {
            throw new Error("Formato do JSON de resposta inválido.");
        }

    } catch (error) {
        console.error("Erro ao gerar quiz com a API Gemini:", error);
        return Promise.reject(`Não foi possível gerar o quiz. Detalhes: ${error instanceof Error ? error.message : String(error)}`);
    }
};
