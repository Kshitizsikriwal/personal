import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Call Groq API
    const response = await axios.post(
      GROQ_API_URL,
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = response.data?.result || "Sorry, I couldn't understand that.";

    return res.status(200).json({ answer });

  } catch (error: any) {
    console.error('Groq API Error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch response from Groq API.' });
  }
}
