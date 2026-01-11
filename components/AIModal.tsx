import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello! I am the BMI University AI Assistant. I can help you analyze student performance, draft announcements, or summarize financial reports. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    const responseText = await getGeminiResponse(input);
    
    setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
    setIsThinking(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white w-full max-w-2xl h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4B0082] to-[#6A0DAD] p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg text-[#FFD700]">
                <Sparkles size={20} />
            </div>
            <div>
                <h3 className="font-bold">BMI AI Assistant</h3>
                <p className="text-xs opacity-80">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#4B0082] text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}>
                {msg.role === 'ai' && <Bot size={16} className="mb-1 text-[#4B0082]" />}
                {msg.text}
              </div>
            </div>
          ))}
          {isThinking && (
             <div className="flex justify-start">
               <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-[#4B0082]" />
                 <span className="text-xs text-gray-500">Analyzing...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about student stats, finance summaries, or draft a notice..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none text-sm"
              rows={2}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isThinking}
              className="absolute right-2 bottom-2 p-2 bg-[#4B0082] text-white rounded-lg hover:bg-[#320058] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-2">
            AI can make mistakes. Verify important institutional data.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AIModal;