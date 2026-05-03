import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Info } from 'lucide-react';

export default function EducationalCards() {
  const [flipped, setFlipped] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);

  const cards = [
    {
      term: "EPIC",
      fullName: "Electors Photo Identity Card",
      fact: "Also known as your Voter ID card. It is issued by the Election Commission of India. It is mandatory for casting your vote."
    },
    {
      term: "VVPAT",
      fullName: "Voter Verifiable Paper Audit Trail",
      fact: "An independent system attached to the EVM that allows you to verify that your vote was cast correctly via a printed paper slip."
    },
    {
      term: "EVM",
      fullName: "Electronic Voting Machine",
      fact: "The device used to record your vote electronically, replacing the traditional paper ballot system."
    }
  ];

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCardIdx((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  return (
    <div className="bg-surface rounded-3xl p-8 border border-white/5 shadow-2xl h-full flex flex-col">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
        <Info className="text-secondary" /> Learn the Lingo
      </h3>

      <div className="flex-1 perspective-1000 relative">
        <motion.div
          className="w-full h-full min-h-[250px] cursor-pointer"
          onClick={() => setFlipped(!flipped)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/20 p-6 flex flex-col items-center justify-center backface-hidden">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
              {cards[cardIdx].term}
            </span>
            <span className="text-sm text-gray-400">Tap to flip</span>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 bg-surface rounded-2xl border border-secondary/20 p-6 flex flex-col items-center justify-center backface-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <h4 className="text-lg font-bold text-white mb-2 text-center">{cards[cardIdx].fullName}</h4>
            <p className="text-sm text-gray-300 text-center leading-relaxed">
              {cards[cardIdx].fact}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleNext} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <RefreshCcw className="w-4 h-4" /> Next Term
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; }
      `}} />
    </div>
  );
}
