import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Map, MapPin, Navigation, Download, Bell } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

export default function ConstituencyFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Constituency Finder</h1>
        <p className="text-slate-400">Locate your polling booth and election details by entering your PIN code or EPIC number.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter PIN code, Locality or EPIC Number..."
          className="w-full bg-navy-2 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-lg text-white focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] outline-none transition-all placeholder:text-slate-500"
        />
        <Button type="submit" className="absolute right-2 top-2 bottom-2">Search</Button>
      </form>

      {hasSearched && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Map Placeholder */}
          <div className="relative w-full h-64 bg-navy-3 rounded-xl border border-white/10 overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
            }} />
            
            {/* Pulsing Dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="absolute w-12 h-12 bg-[#f59e0b]/20 rounded-full animate-ping-slow" />
              <div className="relative w-4 h-4 bg-[#f59e0b] rounded-full border-2 border-white flex items-center justify-center">
                <MapPin size={24} className="text-[#f59e0b] absolute -top-8 drop-shadow-md" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 bg-navy-card/90 backdrop-blur border border-white/10 px-3 py-1.5 rounded text-sm font-mono text-white">
              Your Booth Location
            </div>
          </div>

          {/* Result Card */}
          <Card accent="teal">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="teal">Match Found</Badge>
                  <span className="text-sm font-mono text-slate-400">WB-01</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Kolkata Paschim</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <span className="text-slate-500 block mb-1">Polling Booth</span>
                    <strong className="text-white">Room 2, Assembly High School</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Returning Officer</span>
                    <strong className="text-white">Amitabh Sen, IAS</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block mb-1">Booth Address</span>
                    <strong className="text-white block">12, BBD Bagh East, Kolkata 700001</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  <Button variant="ghost" className="flex-1 sm:flex-none flex items-center justify-center gap-2 border-white/20">
                    <Navigation size={16} /> Directions
                  </Button>
                  <Button variant="ghost" className="flex-1 sm:flex-none flex items-center justify-center gap-2 border-white/20">
                    <Download size={16} /> Download Slip
                  </Button>
                  <Button variant="ghost" className="flex-1 sm:flex-none flex items-center justify-center gap-2 border-white/20 text-[#f59e0b] border-[#f59e0b]/30">
                    <Bell size={16} /> Set Reminder
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
