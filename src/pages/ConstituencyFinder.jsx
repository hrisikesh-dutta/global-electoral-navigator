import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, Download, Bell } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

// Kolkata Paschim booth coordinates for Google Maps embed
const BOOTH_LAT = 22.5726;
const BOOTH_LNG = 88.3639;
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${BOOTH_LAT},${BOOTH_LNG}&z=16&output=embed`;

export default function ConstituencyFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
      if (window.trackEvent) window.trackEvent('constituency_search', 'engagement', searchQuery.trim());
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
      <form onSubmit={handleSearch} className="mb-8 relative" role="search" aria-label="Constituency search">
        <label htmlFor="constituency-search" className="sr-only">Search by PIN code, locality or EPIC number</label>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" aria-hidden="true">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input 
          id="constituency-search"
          type="search" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.slice(0, 50))}
          placeholder="Enter PIN code, Locality or EPIC Number..."
          className="w-full bg-navy-2 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-lg text-white focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] outline-none transition-all placeholder:text-slate-500"
          maxLength={50}
          autoComplete="off"
          aria-required="true"
        />
        <Button type="submit" className="absolute right-2 top-2 bottom-2" aria-label="Search constituency">Search</Button>
      </form>

      {hasSearched && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Google Maps Embed */}
          <div className="relative w-full h-72 rounded-xl border border-white/10 overflow-hidden" role="region" aria-label="Polling booth location map">
            <iframe
              title="Polling Booth Location — Kolkata Paschim"
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Maps showing polling booth location"
            />
            <div className="absolute bottom-4 left-4 bg-[#0a0e1a]/90 backdrop-blur border border-[#f59e0b]/30 px-3 py-1.5 rounded text-sm font-mono text-[#f59e0b] flex items-center gap-2">
              <MapPin size={14} aria-hidden="true" />
              Room 2, Assembly High School
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
                <h2 className="text-2xl font-display font-bold text-white mb-4">Kolkata Paschim</h2>
                
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                  <div>
                    <dt className="text-slate-500 mb-1">Polling Booth</dt>
                    <dd className="text-white font-semibold">Room 2, Assembly High School</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 mb-1">Returning Officer</dt>
                    <dd className="text-white font-semibold">Amitabh Sen, IAS</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-slate-500 mb-1">Booth Address</dt>
                    <dd className="text-white font-semibold">12, BBD Bagh East, Kolkata 700001</dd>
                  </div>
                </dl>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  <a
                    href={`https://maps.google.com/maps?q=${BOOTH_LAT},${BOOTH_LNG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get directions to polling booth in Google Maps"
                    className="btn-ghost flex-1 sm:flex-none flex items-center justify-center gap-2 border-white/20"
                    onClick={() => window.trackEvent && window.trackEvent('get_directions', 'engagement', 'constituency_finder')}
                  >
                    <Navigation size={16} aria-hidden="true" /> Directions
                  </a>
                  <Button variant="ghost" className="flex-1 sm:flex-none flex items-center justify-center gap-2 border-white/20" aria-label="Download voter slip">
                    <Download size={16} aria-hidden="true" /> Download Slip
                  </Button>
                  <Button variant="ghost" className="flex-1 sm:flex-none flex items-center justify-center gap-2 border-white/20 text-[#f59e0b] border-[#f59e0b]/30" aria-label="Set election day reminder">
                    <Bell size={16} aria-hidden="true" /> Set Reminder
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
