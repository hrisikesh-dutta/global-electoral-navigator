import React, { useState } from 'react';
import { MapPin, User, Globe, ChevronRight } from 'lucide-react';

export default function InitializationForm({ onComplete }) {
  const [location, setLocation] = useState('');
  const [voterStatus, setVoterStatus] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location && voterStatus && language) {
      onComplete({ location, voterStatus, language });
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-xl border border-white/5 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2 relative z-10">
        <MapPin className="text-primary" /> Setup Your Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-background border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
              required
            >
              <option value="" disabled>Select your country</option>
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Voter Status</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select 
              value={voterStatus}
              onChange={(e) => setVoterStatus(e.target.value)}
              className="w-full bg-background border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
              required
            >
              <option value="" disabled>Select status</option>
              <option value="Unregistered">Unregistered</option>
              <option value="Registered">Registered</option>
              <option value="Voted">Voted</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Preferred Language</label>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-background border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
            required
          >
            <option value="" disabled>Select language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95"
        >
          Initialize Dashboard <ChevronRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
