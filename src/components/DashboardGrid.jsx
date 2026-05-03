import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { Send, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardGrid() {
  const { profile } = useJourney();
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `System initialized for ${profile.state}, ${profile.country}. How may I assist you, ${profile.userName}?` }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");

    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `Processing query for ${profile.state}... The upcoming 2026 Assembly elections will utilize VVPAT-enabled EVMs. Please specify if you need candidate demographics or polling booth locators.` 
      }]);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-140px)] relative z-10">
      
      {/* Left Column: Electoral Horizon */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        className="col-span-1 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800 p-6 flex flex-col shadow-xl"
      >
        <h2 className="text-lg font-bold text-slate-100 mb-6 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-500" />
          Electoral Horizon
        </h2>
        
        <div className="flex-1 space-y-4">
          <div className="relative pl-4 border-l-2 border-slate-800">
            <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[7px] top-1 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
            <p className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-1">State Assembly</p>
            <h3 className="text-slate-100 font-medium mb-1">{profile.state} Elections</h3>
            <p className="text-slate-400 text-sm">Projected: Apr-May 2026</p>
          </div>
          
          <div className="relative pl-4 border-l-2 border-slate-800">
            <div className="absolute w-3 h-3 bg-slate-700 rounded-full -left-[7px] top-1"></div>
            <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-1">Delimitation</p>
            <h3 className="text-slate-300 font-medium mb-1">Boundary Updates</h3>
            <p className="text-slate-500 text-sm">Status: Pending Review</p>
          </div>
        </div>
      </motion.div>

      {/* Center/Right Column: The Navigator Console */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="col-span-1 md:col-span-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="bg-slate-950/50 border-b border-slate-800 p-4 px-6">
          <h2 className="font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Voter Query System
          </h2>
        </div>

        {/* Body (Messages) */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-slate-100 border border-slate-700' 
                  : 'bg-slate-950/50 text-slate-300 border border-slate-800/50'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Footer (Input) */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about candidates, EVM processes, or polling booth locations..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-4 pr-12 py-3 text-sm text-slate-100 focus:outline-none focus:border-green-600 transition-colors"
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-600 text-white rounded cursor-pointer disabled:opacity-50 hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      </motion.div>

    </div>
  );
}
