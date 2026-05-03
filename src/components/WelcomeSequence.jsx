import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useJourney } from '../context/JourneyContext';
import { ArrowRight, SkipForward } from 'lucide-react';

export default function WelcomeSequence() {
  const { updateProfile, completeOnboarding } = useJourney();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.name.trim()) {
      updateProfile({ 
        userName: formData.name.trim(), 
        email: formData.email,
        country: 'India', 
        state: 'Delhi' 
      });
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    updateProfile({ 
      userName: 'Guest', 
      email: '',
      country: 'India', 
      state: 'Delhi' 
    });
    completeOnboarding();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10 mesh-gradient-vibrant dark:mesh-gradient-dark pt-20 px-4 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-800 text-center transition-colors"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-white text-2xl font-black">EC</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Create Account</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium text-sm">Personalize your electoral journey.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="Username" 
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            autoFocus
            required
          />
          <input 
            type="email" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            placeholder="Email address" 
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            required
          />
          <input 
            type="password" 
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            placeholder="Password" 
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            required
          />
          <button 
            type="submit"
            disabled={!formData.name.trim() || !formData.email.trim() || !formData.password.trim()}
            className="w-full bg-slate-900 dark:bg-white disabled:opacity-50 text-white dark:text-slate-900 font-bold py-3.5 mt-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 dark:hover:bg-blue-50 transition-colors shadow-lg"
          >
            Sign Up <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <button 
            onClick={handleSkip}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white text-sm font-medium flex items-center gap-1 transition-colors"
          >
            Skip for now <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
