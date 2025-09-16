import React, { useState, useRef, useEffect, useMemo, memo } from 'react';
import { Send, X, Minimize2, Maximize2, Plus, Trash2, ChevronDown } from 'lucide-react';
import { chatService } from '../services/chatService';

// --- TYPE DEFINITIONS ---
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

// --- CUSTOM SVG ICON FOR CHATBOT ---
const ChatbotIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a8 8 0 0 0-8 8c0 1.83.67 3.54 1.88 4.88L3 21l6-3 3 3 3-3 6 3-2.88-6.12A8 8 0 0 0 12 2z" />
    <path d="M7.5 10.5h.01" /><path d="M16.5 10.5h.01" />
  </svg>
);

// --- HELPER HOOKS & COMPONENTS ---
const useTypewriter = (text: string) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [text]);
  return displayText;
};

const FormattedContent: React.FC<{ content: string, isTyping: boolean }> = ({ content, isTyping }) => {
  const formattedHtml = content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400 font-semibold">$1</strong>')
    .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded-md font-mono text-sm">$1</code>');
  
  return (
    <div
      className="text-gray-300 text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: formattedHtml + (isTyping ? '<span class="animate-pulse">|</span>' : '') }}
    />
  );
};

// Memoized AssistantMessage to prevent re-rendering and re-typing
const AssistantMessage = memo(({ message, isLast }: { message: Message; isLast: boolean }) => {
  const displayText = useTypewriter(message.content);
  const isTyping = isLast && displayText.length < message.content.length;

  return (
    <div className="flex items-start space-x-3 animate-slide-in-left">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
        <ChatbotIcon size={16} className="text-white/80" />
      </div>
      <div className="flex-1 space-y-1">
        {isLast ? (
          <FormattedContent content={displayText} isTyping={isTyping} />
        ) : (
          <FormattedContent content={message.content} isTyping={false} />
        )}
      </div>
    </div>
  );
});

// --- MAIN COMPONENT ---
const NotionChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const activeChat = useMemo(() => chats.find(c => c.id === activeChatId), [chats, activeChatId]);

  // Load chats from localStorage on initial render
  useEffect(() => {
    try {
      const savedChats = localStorage.getItem('portfolio-chats');
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats);
        if (parsedChats.length > 0) {
          setActiveChatId(parsedChats[0].id);
        } else {
          createNewChat();
        }
      } else {
        createNewChat();
      }
    } catch (error) {
      console.error("Failed to parse chats from localStorage", error);
      createNewChat();
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('portfolio-chats', JSON.stringify(chats));
    }
  }, [chats]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isLoading]);

  useEffect(() => { if (isOpen && !isMinimized) inputRef.current?.focus(); }, [isOpen, isMinimized, activeChatId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const createNewChat = () => {
    const newChat: ChatSession = {
      id: `chat-${Date.now()}`,
      title: 'New Chat',
      messages: [{
        id: 'welcome-msg',
        role: 'assistant',
        content: "Hi! I'm Kshitiz's AI assistant. I can help you learn about his **data science projects**, **technical skills**, and **professional experience**. What would you like to know?",
      }],
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(c => c.id !== chatId);
    setChats(updatedChats);
    if (activeChatId === chatId) {
      setActiveChatId(updatedChats[0]?.id || null);
      if (updatedChats.length === 0) {
        createNewChat();
      }
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading || !activeChatId) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message.trim(),
    };

    // Optimistically update UI with user message
    setChats(prev => prev.map(c => 
      c.id === activeChatId ? { ...c, messages: [...c.messages, userMessage] } : c
    ));
    
    // Update title if it's the first message
    if (activeChat?.messages.length === 1) {
       const newTitle = userMessage.content.substring(0, 30);
       setChats(prev => prev.map(c => c.id === activeChatId ? {...c, title: newTitle } : c));
    }

    setMessage('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(message.trim());
      const assistantMessage: Message = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: response,
      };
      
      setChats(prev => prev.map(c => 
        c.id === activeChatId ? { ...c, messages: [...c.messages, assistantMessage] } : c
      ));
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
      };
      setChats(prev => prev.map(c => 
        c.id === activeChatId ? { ...c, messages: [...c.messages, errorMessage] } : c
      ));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Render function for welcome screen
  const WelcomeScreen = () => (
     <div className="flex flex-col items-center text-center space-y-4 my-8 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center shadow-lg">
            <ChatbotIcon size={40} className="text-white/80" />
        </div>
        <div>
            <h3 className="text-xl font-semibold text-white mb-1">How can I help you today?</h3>
            <p className="text-sm text-gray-400">Ask me about Kshitiz's portfolio</p>
        </div>
        <div className="w-full pt-4 space-y-2">
            {[
              { text: "Summarize his portfolio", action: "Give me a summary of Kshitiz's experience" },
              { text: "Show key projects", action: "Tell me about Kshitiz's most important projects" }
            ].map((item) => (
              <button
                key={item.text}
                onClick={() => {
                  setMessage(item.action);
                  setTimeout(() => sendMessage(), 100);
                }}
                className="w-full p-3 text-left bg-black/20 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-300 group-hover:text-white">{item.text}</span>
                </div>
              </button>
            ))}
        </div>
    </div>
  );

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
            <button
                onClick={() => setIsOpen(true)}
                className="group relative w-16 h-16 rounded-full shadow-2xl shadow-purple-500/30 transition-transform duration-300 ease-in-out hover:scale-110"
                aria-label="Open AI Assistant"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full animate-[spin_5s_linear_infinite]"></div>
                <div className="absolute inset-0 bg-black/30 rounded-full backdrop-blur-sm"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <ChatbotIcon size={24} className="text-white/80 transition-transform duration-300 group-hover:scale-125 group-hover:text-white" />
                </div>
            </button>
        </div>
      )}

      {isOpen && (
        <div
          className={`fixed inset-0 sm:bottom-6 sm:right-6 sm:inset-auto bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl z-50 transition-all duration-300 ease-in-out flex flex-col overflow-hidden animate-fade-in-up ${
            isMinimized ? 'sm:rounded-full sm:w-64 sm:h-12' : 'h-full w-full sm:h-[700px] sm:w-[440px] sm:rounded-2xl'
          }`}
        >
          <div className={`flex items-center justify-between shrink-0 ${isMinimized ? 'px-4 py-1' : 'px-4 py-2 border-b border-white/10'}`}>
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => !isMinimized && setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-1 text-gray-200 hover:text-white transition-colors p-1 rounded-md disabled:pointer-events-none" disabled={isMinimized}>
                <span className={`font-medium ${isMinimized ? 'text-sm' : 'text-base'}`}>{isMinimized ? 'New Chat...' : (activeChat?.title || 'New Chat')}</span>
                <ChevronDown size={14} className={`opacity-60 transition-transform ${isDropdownOpen ? 'rotate-180' : ''} ${isMinimized ? 'hidden' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 animate-fade-in-fast">
                    <div className="p-1"><button onClick={() => { createNewChat(); setIsDropdownOpen(false); }} className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-left text-gray-300 hover:bg-slate-700 rounded-md"><Plus size={14} /><span>New Chat</span></button></div>
                    <div className="border-t border-slate-700 my-1"></div>
                    <div className="p-1 max-h-60 overflow-y-auto custom-scrollbar">
                        {chats.map(chat => (
                            <div key={chat.id} className="group flex items-center justify-between hover:bg-slate-700 rounded-md">
                                <button onClick={() => { setActiveChatId(chat.id); setIsDropdownOpen(false); }} className={`w-full text-left px-3 py-2 text-sm truncate ${activeChatId === chat.id ? 'text-blue-400' : 'text-gray-300'}`}>{chat.title}</button>
                                {chats.length > 1 && <button onClick={() => deleteChat(chat.id)} className="p-2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>}
                            </div>
                        ))}
                    </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200">{isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}</button>
              <button onClick={() => setIsOpen(false)} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"><X size={16} /></button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar">
                {activeChat && activeChat.messages.length === 1 && <WelcomeScreen />}
                {activeChat?.messages.slice(1).map((msg, index) => {
                  const isLastAssistantMessage = msg.role === 'assistant' && index === activeChat.messages.slice(1).length - 1;
                  return msg.role === 'user' ? (
                    <div key={msg.id} className="flex justify-end animate-slide-in-right">
                      <div className="max-w-[85%] bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-lg"><p className="text-sm">{msg.content}</p></div>
                    </div>
                  ) : (
                    <AssistantMessage key={msg.id} message={msg} isLast={isLastAssistantMessage} />
                  );
                })}
                {isLoading && (
                  <div className="flex items-start space-x-3 animate-slide-in-left">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md"><ChatbotIcon size={16} className="text-white/80" /></div>
                    <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-lg"><div className="flex items-center space-x-1"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div></div></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-white/10 bg-black/20 p-4">
                  <div className="relative">
                    <textarea ref={inputRef} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}} placeholder="Ask me anything about Kshitiz..." className="w-full pl-4 pr-12 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-gray-200 text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 custom-scrollbar" disabled={isLoading} rows={1} style={{ maxHeight: '100px' }} />
                    <button onClick={sendMessage} disabled={isLoading || !message.trim()} className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 flex items-center justify-center"><Send size={14} /></button>
                  </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NotionChatbot;