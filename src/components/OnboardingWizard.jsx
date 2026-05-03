import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, UserCheck, Languages, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';

export default function OnboardingWizard() {
  const { completeOnboarding } = useJourney();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ location: '', voterStatus: '', language: 'English' });

  const steps = [
    {
      id: 'welcome',
      title: "Welcome to your Electoral Assistant! 👋",
      desc: "Let's get you ready for the upcoming elections. It only takes a minute.",
      icon: <UserCheck className="w-12 h-12 text-primary" />,
      content: (
        <button onClick={() => setStep(1)} className="w-full py-3 bg-primary text-black rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-primary/90 transition-colors">
          Let's Start <ArrowRight className="w-5 h-5" />
        </button>
      )
    },
    {
      id: 'location',
      title: "Where will you be voting?",
      desc: "This helps me fetch the correct dates and local rules for you.",
      icon: <MapPin className="w-12 h-12 text-secondary" />,
      content: (
        <div className="space-y-3">
          {['India (West Bengal)', 'India (Tamil Nadu)', 'India (Other)', 'United States'].map(loc => (
            <button 
              key={loc}
              onClick={() => { setFormData(p => ({...p, location: loc})); setStep(2); }}
              className="w-full p-4 border border-white/10 rounded-xl hover:border-primary hover:bg-primary/10 text-left transition-colors font-medium text-white"
            >
              {loc}
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'status',
      title: "Are you already registered to vote?",
      desc: "Don't worry if you aren't sure, we can figure it out together.",
      icon: <CheckCircle2 className="w-12 h-12 text-green-400" />,
      content: (
        <div className="space-y-3">
          {['Yes, I am registered', 'No, not yet', 'I am not sure'].map(status => (
            <button 
              key={status}
              onClick={() => { setFormData(p => ({...p, voterStatus: status})); setStep(3); }}
              className="w-full p-4 border border-white/10 rounded-xl hover:border-secondary hover:bg-secondary/10 text-left transition-colors font-medium text-white"
            >
              {status}
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'language',
      title: "What language do you prefer?",
      desc: "I'll keep official terms like 'EPIC' in English so you don't get confused at the booth.",
      icon: <Languages className="w-12 h-12 text-blue-400" />,
      content: (
        <div className="space-y-3">
          {['English', 'Hindi', 'Bengali', 'Tamil'].map(lang => (
            <button 
              key={lang}
              onClick={() => { 
                const finalData = { ...formData, language: lang };
                setFormData(finalData); 
                completeOnboarding(finalData); 
              }}
              className="w-full p-4 border border-white/10 rounded-xl hover:border-blue-400 hover:bg-blue-400/10 text-left transition-colors font-medium text-white"
            >
              {lang}
            </button>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-lg mx-auto mt-20 p-6">
      <div className="relative h-2 bg-white/10 rounded-full mb-12 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="relative bg-surface p-8 rounded-3xl shadow-2xl border border-white/5 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full justify-center"
          >
            <div className="flex justify-center mb-6">
              {steps[step].icon}
            </div>
            <h2 className="text-2xl font-bold text-center mb-2 text-white">{steps[step].title}</h2>
            <p className="text-gray-400 text-center mb-8">{steps[step].desc}</p>
            {steps[step].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
