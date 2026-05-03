import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import Card from '../components/Card';
import StatCard from '../components/StatCard';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'or', name: 'Odia' },
  { code: 'ur', name: 'Urdu' }
];

export default function Landing() {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const [toastMsg, setToastMsg] = React.useState('');

  const handleLangClick = (code) => {
    if (['en', 'hi', 'bn'].includes(code)) {
      setLang(code);
      setToastMsg('');
    } else {
      setToastMsg(`Language ${code.toUpperCase()} is upcoming!`);
      setTimeout(() => setToastMsg(''), 3000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.2 }}
      className="min-h-screen relative overflow-hidden pb-20"
    >
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 pt-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 whitespace-pre-line">
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight text-gradient-white">
            {t('landing.heroTitle').split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {i === arr.length - 1 ? <span className="text-gradient-saffron">{line}</span> : line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-xl text-slate-400 font-body max-w-2xl mx-auto">
            {t('landing.heroSub')}
          </p>
        </div>

        {/* Language Pill Selector */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto relative">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => handleLangClick(l.code)}
                className={`px-4 py-1.5 rounded-full text-sm font-mono transition-colors ${
                  lang === l.code 
                    ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/50' 
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/20'
                }`}
              >
                {l.name}
              </button>
            ))}
            {toastMsg && (
              <div className="absolute -bottom-8 bg-[#f59e0b] text-navy px-4 py-1 rounded shadow-lg text-sm font-bold animate-[fadeIn_0.2s_ease-out]">
                {toastMsg}
              </div>
            )}
          </div>
        </div>

        {/* Location Banner */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#f59e0b]/5 border border-[#f59e0b]/30 rounded-full text-[#f59e0b] font-medium">
            <MapPin size={18} />
            <span>{t('landing.detectLocation')}</span>
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card accent="amber" hover className="flex flex-col justify-center">
            <h3 className="font-display font-bold text-xl mb-2 text-white">West Bengal</h3>
            <ul className="text-slate-400 space-y-2 font-mono text-sm">
              <li className="flex justify-between"><span>Lok Sabha Seats</span> <span className="text-white">42</span></li>
              <li className="flex justify-between"><span>Expected Election</span> <span className="text-white">Q1 2026</span></li>
              <li className="flex justify-between"><span>Current Phase</span> <span className="text-white">Pre-Poll</span></li>
            </ul>
          </Card>

          <Card className="flex flex-col justify-between" hover>
            <div>
              <h3 className="font-display font-bold text-xl mb-2 text-white">Ready to Vote?</h3>
              <p className="text-slate-400 text-sm mb-4">Check your eligibility, find your polling booth, and generate your voter slip.</p>
              
              <div className="relative mb-6">
                <select 
                  onChange={(e) => {
                    if (e.target.value) navigate('/navigate');
                  }}
                  className="w-full px-4 py-3 bg-navy-2 border border-white/10 rounded-lg text-slate-300 outline-none focus:border-[#f59e0b] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select Voter Status</option>
                  <option value="registered">Registered Voter</option>
                  <option value="unregistered">Not Registered</option>
                  <option value="overseas">Overseas Voter</option>
                </select>
                <ChevronDown size={16} className="text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            
            <Button className="w-full group" onClick={() => navigate('/navigate')}>
              {t('landing.beginNav')} 
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </div>

        {/* Bottom Stat Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard color="teal" value={t('landing.stats.voters')} label="Total Voters" />
          <StatCard color="amber" value={t('landing.stats.constituencies')} label="Constituencies" />
          <StatCard color="blue" value={t('landing.stats.languages')} label="Languages" />
        </div>
      </div>
    </motion.div>
  );
}
