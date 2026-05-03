import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function AlertsComposer() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-white mb-6">Alerts Composer</h1>
      
      <Card className="max-w-2xl">
        <form className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Audience Target</label>
            <select className="w-full bg-navy-2 border border-white/10 rounded px-4 py-3 text-white focus:border-[#f59e0b] outline-none">
              <option>All Registered Voters (West Bengal)</option>
              <option>Only Phase 7 Constituencies</option>
              <option>Voters missing EPIC linking</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Alert Message</label>
            <textarea 
              rows="4" 
              className="w-full bg-navy-2 border border-white/10 rounded px-4 py-3 text-white focus:border-[#f59e0b] outline-none resize-none"
              placeholder="Enter your alert message here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Delivery Channel</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" defaultChecked className="accent-[#f59e0b]" /> SMS / WhatsApp
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" defaultChecked className="accent-[#f59e0b]" /> In-App Notification
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" className="accent-[#f59e0b]" /> Email Digest
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Schedule</label>
              <input 
                type="datetime-local" 
                className="w-full bg-navy-2 border border-white/10 rounded px-4 py-2 text-white focus:border-[#f59e0b] outline-none" 
              />
              <p className="text-xs text-slate-500 mt-2">Leave blank to send immediately.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end">
            <Button type="button" className="w-full sm:w-auto">Schedule & Send Alert</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
