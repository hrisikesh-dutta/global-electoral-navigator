import React, { useState, useRef, useEffect } from 'react';
import { useJourney } from '../context/JourneyContext';
import { Send, PieChart, CalendarDays, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainDashboard() {
  const { profile } = useJourney();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const hasMessages = messages.length > 0;

  // Auto-scroll chat
  useEffect(() => {
    if (hasMessages) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `Here is the information regarding elections in ${profile.state}. The next major assembly cycle is scheduled shortly. Would you like to check candidate profiles or polling stations?` 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* HERO SECTION: Dynamic sizing based on if messages exist */}
      <motion.div 
        animate={{ 
          paddingTop: hasMessages ? '80px' : '160px',
          paddingBottom: hasMessages ? '40px' : '100px',
          borderRadius: hasMessages ? '0 0 2rem 2rem' : '0 0 4rem 4rem'
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative px-6 mesh-gradient-vibrant dark:mesh-gradient-dark shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden shrink-0 z-10"
      >
        <motion.div 
          animate={{ scale: hasMessages ? 0.85 : 1, y: hasMessages ? -10 : 0 }} 
          className="relative z-10 max-w-4xl w-full"
        >
          {/* Only show welcome text if no messages exist yet */}
          <AnimatePresence>
            {!hasMessages && (
              <motion.div 
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                  Hello, {profile.userName}
                </h1>
                <p className="text-blue-100 dark:text-blue-200 text-lg md:text-xl font-medium mb-10 drop-shadow">
                  How can I help you navigate the elections in {profile.state}?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gemini-Style Prominent Search Bar */}
          <form onSubmit={handleSend} className="relative w-full shadow-2xl group max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full transition-opacity opacity-0 group-hover:opacity-100"></div>
            <div className="relative flex items-center bg-white dark:bg-slate-900 border border-white/50 dark:border-slate-700 rounded-full pl-6 pr-2 py-2 transition-transform hover:scale-[1.01] shadow-lg">
              <Sparkles className="w-6 h-6 text-blue-500 mr-2 hidden sm:block" />
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={hasMessages ? "Ask a follow up question..." : "Ask about EVMs, candidate lists, or polling locations..."}
                className="flex-1 bg-transparent text-slate-800 dark:text-slate-100 text-lg placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none py-3"
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="w-12 h-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-blue-600 dark:hover:bg-blue-100 transition-colors shadow-md ml-2 shrink-0 cursor-pointer"
              >
                <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
          </form>

          {/* Suggestion Pills - Fade out when chatting */}
          <AnimatePresence>
            {!hasMessages && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap justify-center gap-3 mt-8"
              >
                {["Upcoming Elections", "How to Vote", "EVM Security"].map(suggestion => (
                  <button 
                    key={suggestion} 
                    onClick={() => { setInput(suggestion); document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })); }}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors backdrop-blur-md cursor-pointer shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.div>

      {/* EXPANDING CHAT VIEW OR CONTENT CARDS */}
      <div className="flex-1 relative flex flex-col">
        {hasMessages ? (
          /* CHAT THREAD VIEW */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 w-full max-w-4xl mx-auto px-6 py-10 overflow-y-auto"
          >
            <div className="space-y-6 pb-20">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-md mr-3 shrink-0 mt-1">
                       <span className="text-white text-[10px] font-black">EC</span>
                     </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-6 py-4 text-base leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </motion.div>
        ) : (
          /* DEFAULT DASHBOARD CARDS */
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="max-w-7xl mx-auto w-full px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="col-span-1 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Electoral Horizon</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Upcoming milestones in {profile.state}</p>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Assembly Elections</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">Projected: Apr-May 2026</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Voter Roll Updates</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">Ongoing Verification</p>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform">
               <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Voter Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">Key demographics and structural data</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-6 rounded-2xl text-white shadow-md shadow-blue-500/20">
                  <p className="text-blue-100 text-sm font-medium mb-1">Registered Voters</p>
                  <p className="text-3xl font-black">2.4M+</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl text-white shadow-md shadow-purple-500/20">
                  <p className="text-purple-100 text-sm font-medium mb-1">Polling Stations</p>
                  <p className="text-3xl font-black">12,500</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
