import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm your electoral guide. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput("");

    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "I'm a demo assistant right now, but soon I'll be able to answer specifically about your local voting rules!" 
      }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-surface border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="bg-primary/10 p-4 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Voter Assistant</h3>
                  <p className="text-xs text-primary">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user' ? 'bg-primary text-black rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..." 
                className="flex-1 bg-background border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
              />
              <button type="submit" className="w-10 h-10 bg-primary text-black rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Send className="w-4 h-4 -ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
