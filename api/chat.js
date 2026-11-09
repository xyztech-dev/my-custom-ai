import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // It automatically pulls the key from Vercel's environment variables securely
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: message,
        });

        return res.status(200).json({ reply: response.text });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to generate response' });
    }
}
