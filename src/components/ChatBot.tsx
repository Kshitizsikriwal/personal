import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, ChevronsDownUp, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const welcomeMessage: Message = {
    id: 'welcome-msg',
    type: 'bot',
    content: "Hello there! I'm Kshitiz's AI assistant. Feel free to ask me about his experience, projects, or skills.",
    timestamp: new Date()
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isOpening, setIsOpening] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleToggleOpen = (openState: boolean) => {
    if (openState) {
        setIsOpen(true);
        setIsOpening(true);
        setTimeout(() => setIsOpening(false), 500);
    } else {
        setIsOpen(false);
    }
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), type: 'user', content: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // --- THIS IS THE KEY CHANGE FOR VERCEL ---
      // The URL is now relative, pointing to our serverless function.
      const response = await axios.post('/api', { query: input.trim() });

      // ------------------------------------------

      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.data.answer || "I'm here to help. Can you please clarify?",
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, botReply]);
        setIsTyping(false);
      }, 500);

    } catch (error) {
      console.error('Proxy API Error:', error);
      toast({ title: "Error", description: "Failed to fetch response from the server.", variant: "destructive" });
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }
  };
  
  // (The rest of your component's return statement and styling is perfectly fine and remains unchanged)
  // ... Paste the entire return statement from your original file here ...
  return (
    <>
      <style>{`
        @keyframes genie-in { from { transform: scale(0.1) translateY(100%); opacity: 0; clip-path: circle(10% at 50% 90%); } to { transform: scale(1) translateY(0); opacity: 1; clip-path: circle(100% at 50% 50%); } }
        .chat-window-genie { transform-origin: bottom right; animation: genie-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
        .typing-indicator span { display: inline-block; width: 8px; height: 8px; margin: 0 2px; background-color: #a78bfa; border-radius: 50%; opacity: 0.4; animation: typing-dot 1.4s infinite; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing-dot { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1a1a2e; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #4a3f6d; border-radius: 10px; border: 2px solid #1a1a2e; }
      `}</style>
      {!isOpen && (
        <Button onClick={() => handleToggleOpen(true)} className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:scale-110 transition-transform duration-300 shadow-lg z-50">
          <MessageCircle size={28} />
        </Button>
      )}
      {isOpen && (
        <Card className={`fixed bottom-0 right-0 z-50 flex flex-col transition-all duration-300 ease-in-out bg-[#0f0f19] text-white border-purple-800/50 w-full h-full sm:w-[400px] sm:h-[650px] sm:bottom-6 sm:right-6 sm:rounded-2xl ${isOpening ? 'chat-window-genie' : ''} ${isMinimized ? 'sm:h-20' : 'sm:h-[650px]'}`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center"><Bot size={20} /></div>
              <div><h3 className="font-bold text-lg">AI Assistant</h3><p className="text-sm text-gray-400">Online</p></div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex hover:bg-gray-700/50" onClick={() => setIsMinimized(!isMinimized)}><ChevronsDownUp size={16} /></Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-700/50" onClick={() => handleToggleOpen(false)}><X size={16} /></Button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 items-end ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'bot' && <Bot className="w-6 h-6 shrink-0 text-purple-400" />}
                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user' ? 'bg-gradient-to-br from-purple-600 to-blue-600 rounded-br-none' : 'bg-gray-800 rounded-bl-none'}`}><p className="text-sm leading-relaxed">{msg.content}</p></div>
                    {msg.type === 'user' && <User className="w-6 h-6 shrink-0 text-blue-400" />}
                  </div>
                ))}
                {isTyping && (<div className="flex justify-start"><div className="bg-gray-800 rounded-2xl rounded-bl-none p-3"><div className="typing-indicator"><span></span><span></span><span></span></div></div></div>)}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t border-gray-700/50 shrink-0">
                <div className="flex items-center gap-2">
                  <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask a question..." className="flex-1 bg-gray-800 border-gray-700 rounded-full focus:ring-2 focus:ring-purple-500 transition-all" disabled={isTyping} />
                  <Button onClick={handleSendMessage} disabled={isTyping || !input.trim()} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shrink-0 disabled:opacity-50 transition-all hover:scale-110"><Send size={18} /></Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatBot;