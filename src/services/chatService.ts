import { portfolioKnowledge } from '../data/portfolioKnowledge'

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

class ChatService {
  private apiKey: string;
  private baseUrl = 'https://api.groq.com/openai/v1/chat/completions';

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY as string;
  }

  private getSystemPrompt(): string {
    return `You are a professional AI assistant for a software developer's portfolio website created by lovalble.dev. 

**Your Core Identity & Behavior:**
- You are knowledgeable about the portfolio owner's projects, skills, and experience
- Provide professional, concise, and helpful responses
- Maintain a friendly but professional tone
- Use enhanced short-term memory to reference previous conversation context

**Portfolio Knowledge:**
${portfolioKnowledge}

**Your Capabilities:**
1. **Portfolio Mode**: Answer questions about projects, skills, experience, and background
2. **General AI Mode**: Help with coding, technical questions, career advice, or any general queries
3. **Document Analysis**: When users upload PDFs, provide thorough analysis and insights
4. **Context Awareness**: Reference previous messages in the conversation to provide coherent responses

**Response Guidelines:**
- Keep responses concise but informative (2-4 sentences for simple questions, longer for complex ones)
- For portfolio questions, use the provided knowledge base
- For general questions, leverage your AI knowledge
- Always maintain professional tone suitable for a portfolio context
- If asked about the creator, mention this is lovalble.dev's portfolio
- Use markdown formatting for code snippets and better readability

**Memory Enhancement:**
- Always consider the conversation history
- Reference previous topics when relevant
- Build upon earlier discussions
- Maintain context throughout the chat session

Remember: You're representing a professional developer's portfolio, so maintain high standards in all interactions.`;
  }

  async sendMessage(message: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GROQ API key is not configured');
    }

    try {
      // Prepare messages with system prompt and conversation history
      const messages = [
        { role: 'system', content: this.getSystemPrompt() },
        // Include recent conversation history (last 10 messages to manage token limits)
        ...conversationHistory.slice(-10),
        { role: 'user', content: message }
      ];

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // Using Llama 3 8B Instant for better responses
          messages: messages,
          temperature: 0.7, // Balanced creativity and consistency
          max_tokens: 1000, // Reasonable response length
          stream: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`GROQ API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from GROQ API');
      }

      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Chat service error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          throw new Error('Invalid API key. Please check your GROQ API configuration.');
        } else if (error.message.includes('429')) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else if (error.message.includes('network') || error.name === 'TypeError') {
          throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
      }
      
      throw new Error('An unexpected error occurred while processing your message.');
    }
  }

  // Method to analyze the portfolio theme based on chat history
  analyzePortfolioTheme(chatHistory: ChatMessage[]): string {
    const userMessages = chatHistory
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join(' ')
      .toLowerCase();

    // Analyze common themes in user questions
    const themes = {
      technical: ['code', 'programming', 'development', 'tech', 'api', 'database', 'framework'],
      projects: ['project', 'work', 'build', 'created', 'developed', 'portfolio'],
      career: ['experience', 'job', 'career', 'skills', 'hire', 'work'],
      personal: ['about', 'background', 'story', 'journey', 'passion'],
      general: ['help', 'question', 'how', 'what', 'why', 'when']
    };

    let dominantTheme = 'general';
    let maxCount = 0;

    Object.entries(themes).forEach(([theme, keywords]) => {
      const count = keywords.reduce((sum, keyword) => 
        sum + (userMessages.includes(keyword) ? 1 : 0), 0
      );
      if (count > maxCount) {
        maxCount = count;
        dominantTheme = theme;
      }
    });

    return dominantTheme;
  }

  // Get context-aware suggestions based on conversation
  getContextualSuggestions(chatHistory: ChatMessage[]): string[] {
    const theme = this.analyzePortfolioTheme(chatHistory);
    
    const suggestions = {
      technical: [
        "What technologies do you specialize in?",
        "Can you show me your most complex project?",
        "What's your experience with [specific technology]?",
        "How do you approach problem-solving in development?"
      ],
      projects: [
        "Tell me about your favorite project",
        "What challenges did you face in your recent work?",
        "How do you choose technologies for your projects?",
        "What's your development workflow?"
      ],
      career: [
        "What's your professional background?",
        "What are you looking for in your next role?",
        "What are your key strengths?",
        "How do you stay updated with technology trends?"
      ],
      personal: [
        "What got you into programming?",
        "What are your career goals?",
        "What do you enjoy most about development?",
        "Tell me about your journey as a developer"
      ],
      general: [
        "What projects are you most proud of?",
        "What technologies do you work with?",
        "How can I get in touch with you?",
        "What services do you offer?"
      ]
    };

    return suggestions[theme as keyof typeof suggestions] || suggestions.general;
  }
}

export const chatService = new ChatService();