import { API_URL } from '../config';

export async function getBotResponse(prompt: string): Promise<string> {
    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: prompt }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.bot_response) {
             throw new Error("Invalid response format from the API.");
        }
        
        return data.bot_response;

    } catch (error) {
        console.error("API service error:", error);
        throw new Error("Failed to communicate with the Cynthia API service. Please ensure the backend is running.");
    }
}
