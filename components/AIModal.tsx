import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles, Loader2, Info } from 'lucide-react';
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
    { role: 'ai', text: 'Welcome to the BMI University AI Intelligence Node. I have access to current institutional parameters for Theology, ICT, Business, and Education departments. How may I assist your administrative duties today?' }
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

    const institutionalContext = "User is currently accessing the Executive Dashboard with full administrative privileges.";
    const responseText = await getGeminiResponse(input, institutionalContext);
    
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a0033]/80 backdrop-blur-md animate-fade-in p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl h-[650px] rounded-none shadow-2xl flex flex-col overflow-hidden relative border border-[#FFD700]/30">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4B0082]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

        <div className="bg-gray-900 p-6 flex justify-between items-center text-white relative z-10 border-b border-[#FFD700]/20">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#FFD700] rounded-none text-[#4B0082] shadow-lg">
                <Sparkles size={24} />
            </div>
            <div>
                <h3 className="font-bold text-lg tracking-tight uppercase">BMI AI Advisor</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <p className="text-xs font-semibold opacity-80 uppercase tracking-widest">Institutional Intelligence Active</p>
                </div>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-950 no-scrollbar relative z-10">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-none text-sm leading-relaxed shadow-sm transition-all ${
                msg.role === 'user' 
                  ? 'bg-[#4B0082] text-white font-medium' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700'
              }`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                    <Bot size={16} className="text-[#FFD700]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">BMI Response</span>
                  </div>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          {isThinking && (
             <div className="flex justify-start">
               <div className="bg-white dark:bg-gray-800 p-4 rounded-none border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-3">
                 <Loader2 size={18} className="animate-spin text-[#4B0082]" />
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-widest animate-pulse">Consulting Ledger...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 relative z-10">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Draft a graduation notice for the Theology department..."
              className="w-full pl-5 pr-14 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 focus:border-[#4B0082] rounded-none outline-none resize-none text-sm transition-all dark:text-white shadow-inner min-h-[100px]"
              rows={3}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isThinking}
              className="absolute right-3 bottom-3 p-3 bg-[#4B0082] text-white rounded-none hover:bg-black disabled:opacity-30 transition-all shadow-lg"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
             <Info size={12} className="text-gray-400" />
             <p className="text-xs font-semibold text-center text-gray-400 uppercase tracking-tighter">
               Official BMI Intelligence Node • Subject to Institutional Oversight
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIModal;