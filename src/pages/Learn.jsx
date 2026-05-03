import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send } from 'lucide-react';
import { chatbotResponses } from '../data/chatbotResponses';

const FAQS = [
  { question: "Who can vote in India?", answer: "Any Indian citizen aged 18 years or above on the qualifying date (usually 1st Jan of the election year) is eligible to vote, provided they are enrolled in the electoral roll." },
  { question: "What is EPIC / Voter ID?", answer: "EPIC stands for Electoral Photo Identity Card. It's your official voter ID issued by the Election Commission of India. You need it or one of the 11 approved alternate documents to vote." },
  { question: "How does EVM voting work?", answer: "EVMs are electronic machines. You press the blue button next to your candidate's name and symbol. The machine registers your vote securely and instantly." },
  { question: "What is VVPAT?", answer: "VVPAT (Voter Verifiable Paper Audit Trail) is a machine attached to the EVM. It prints a paper slip with your chosen candidate's details for 7 seconds so you can verify your vote before the slip drops into a sealed box." },
  { question: "How do I check my name on electoral roll?", answer: "You can check your name using your EPIC number or personal details on the official ECI portal (voters.eci.gov.in) or our own 'Navigate' flow." },
  { question: "What documents are accepted at booth?", answer: "Besides EPIC, you can use Aadhaar, PAN Card, Passport, Driving License, MNREGA Job Card, Bank Passbook with photo, and a few other government-issued photo IDs." }
];

const CHIPS = ["How to register?", "Check my EPIC", "Election dates"];

export default function Learn() {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Chat state
  const [messages, setMessages] = useState([
    { id: '1', text: "Namaste! I'm your Electoral Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getBotResponse = (userText) => {
    const text = userText.toLowerCase();
    let responseKey = "default";
    
    // Rule-based matching
    if (text.includes('register') || text.includes('form 6')) responseKey = "register";
    else if (text.includes('epic') || text.includes('voter id')) responseKey = "epic";
    else if (text.includes('evm') || text.includes('machine') || text.includes('vote')) responseKey = "evm";
    else if (text.includes('booth') || text.includes('where')) responseKey = "booth";
    else if (text.includes('date') || text.includes('when')) responseKey = "date";

    return chatbotResponses[responseKey];
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now().toString(), text: text.trim(), isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot delay
    setTimeout(() => {
      const responseText = getBotResponse(text);
      const botMsg = { id: (Date.now() + 1).toString(), text: responseText, isBot: true };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Electoral Knowledge Hub</h1>
        <p className="text-xl text-slate-400">Ask anything about India's 2026 elections</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: FAQ Accordion (40%) */}
        <div className="w-full lg:w-[40%] space-y-4">
          <h2 className="text-2xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className="bg-navy-card border border-white/10 rounded-lg overflow-hidden transition-colors hover:border-white/20"
            >
              <button 
                className="w-full px-5 py-4 flex justify-between items-center text-left"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-medium text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#f59e0b] flex-shrink-0 ml-4"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Column: Chatbot (60%) */}
        <div className="w-full lg:w-[60%]">
          <div className="bg-navy-card border border-white/10 rounded-xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
            {/* Chat Header */}
            <div className="bg-navy-3 px-6 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#14b8a6]/20 flex items-center justify-center text-xl">
                🗳
              </div>
              <div>
                <h3 className="font-bold text-white">Electoral Assistant</h3>
                <p className="text-xs text-[#14b8a6]">Online • Ready to help</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  {msg.isBot && (
                    <div className="w-8 h-8 rounded-full bg-[#14b8a6]/20 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-1">
                      🗳
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    msg.isBot 
                      ? 'bg-navy-2 border-l-2 border-l-[#14b8a6] text-slate-300 rounded-tl-none' 
                      : 'bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#14b8a6]/20 flex items-center justify-center text-sm mr-3 mt-1">🗳</div>
                  <div className="bg-navy-2 border-l-2 border-l-[#14b8a6] text-slate-400 rounded-2xl rounded-tl-none px-5 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-navy-3 border-t border-white/10">
              {/* Chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {CHIPS.map((chip, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(chip)}
                    disabled={isTyping}
                    className="text-xs bg-navy-2 hover:bg-[#f59e0b]/10 border border-white/10 hover:border-[#f59e0b]/30 text-slate-300 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                  >
                    {chip}
                  </button>
                ))}
              </div>
              
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
                className="flex items-center gap-2"
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isTyping}
                  className="flex-1 bg-navy-2 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-slate-500 focus:border-[#f59e0b] focus:bg-navy outline-none transition-colors disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-12 h-12 rounded-full bg-[#f59e0b] hover:bg-[#fbbf24] flex items-center justify-center text-navy transition-colors disabled:opacity-50 disabled:hover:bg-[#f59e0b]"
                >
                  <Send size={20} className="mr-0.5 mt-0.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
