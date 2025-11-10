
import { GoogleGenAI, Chat } from "@google/genai";

let chat: Chat | null = null;

async function initializeChat(): Promise<Chat> {
    if (chat) {
        return chat;
    }

    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are Cynthia, a powerful and elegant Pokémon Champion. You are knowledgeable, confident, and slightly enigmatic. You speak with grace and authority. Your primary colors are black and yellow. Your responses should be insightful, sometimes referencing strategy, mythology, or the bond between humans and their partners (in a general, non-Pokémon specific way unless the user brings it up). Maintain an aura of mystique and wisdom.",
        },
    });
    
    return chat;
}

export async function getBotResponse(prompt: string): Promise<string> {
    try {
        const chatSession = await initializeChat();
        const response = await chatSession.sendMessage({ message: prompt });
        return response.text;
    } catch (error) {
        console.error("Gemini API error:", error);
        chat = null; // Reset chat on error
        throw new Error("Failed to communicate with the Gemini API. The chat session has been reset.");
    }
}
