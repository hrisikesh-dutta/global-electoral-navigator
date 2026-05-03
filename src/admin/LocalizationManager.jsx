import React from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function LocalizationManager() {
  const languages = [
    { code: 'en', name: 'English', coverage: 100, status: 'Verified', date: '2026-05-01' },
    { code: 'hi', name: 'Hindi', coverage: 100, status: 'Verified', date: '2026-05-01' },
    { code: 'bn', name: 'Bengali', coverage: 98, status: 'Reviewing', date: '2026-05-02' },
    { code: 'ta', name: 'Tamil', coverage: 85, status: 'Translating', date: '2026-04-28' },
    { code: 'te', name: 'Telugu', coverage: 80, status: 'Translating', date: '2026-04-28' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-white mb-6">Localization Manager</h1>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono text-slate-500 uppercase">
                <th className="pb-3 px-4">Language</th>
                <th className="pb-3 px-4 w-64">Coverage</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 pl-4 text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((lang) => (
                <tr key={lang.code} className="border-b border-white/5 last:border-0 text-sm">
                  <td className="py-4 px-4">
                    <div className="font-bold text-white">{lang.name}</div>
                    <div className="text-xs font-mono text-slate-500">{lang.code.toUpperCase()}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-navy-3 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${lang.coverage === 100 ? 'bg-[#10b981]' : lang.coverage > 90 ? 'bg-[#f59e0b]' : 'bg-[#3b82f6]'}`} 
                          style={{ width: `${lang.coverage}%` }} 
                        />
                      </div>
                      <span className="text-xs font-mono text-slate-400">{lang.coverage}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={lang.coverage === 100 ? 'green' : lang.coverage > 90 ? 'amber' : 'blue'}>
                      {lang.status}
                    </Badge>
                  </td>
                  <td className="py-4 pl-4 text-right font-mono text-slate-400 text-xs">
                    {lang.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
