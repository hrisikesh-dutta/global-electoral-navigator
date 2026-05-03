import React from 'react';
import { ShieldAlert, Check } from 'lucide-react';

export default function MythBusterCard() {
  return (
    <div className="bg-surface rounded-2xl p-6 shadow-xl border border-white/5 h-full">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-error" /> Myth-Buster
      </h3>
      <div className="space-y-4">
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <p className="text-xs text-error font-semibold uppercase tracking-wider mb-2">Myth</p>
          <p className="text-sm text-gray-300">"My vote doesn't really count in a heavily populated area."</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
          <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
            <Check className="w-3 h-3" /> Fact
          </p>
          <p className="text-sm text-gray-300">Local and state elections are often decided by extremely narrow margins. Every single vote shapes the policy outcomes.</p>
        </div>
      </div>
    </div>
  );
}
