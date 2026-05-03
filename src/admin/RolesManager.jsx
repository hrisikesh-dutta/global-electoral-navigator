import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Shield, CheckCircle, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const DEFAULT_ROLES = [
  { id: 'r1', name: 'Super Admin', users: 2, permissions: ['all'] },
  { id: 'r2', name: 'Content Editor', users: 5, permissions: ['elections', 'candidates', 'constituencies'] },
  { id: 'r3', name: 'Localization Manager', users: 3, permissions: ['i18n'] },
  { id: 'r4', name: 'Analytics Viewer', users: 8, permissions: ['read-only'] }
];

export default function RolesManager() {
  const [invites, setInvites] = useState([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: '', roleId: 'r2' });

  // Load invites from localStorage
  useEffect(() => {
    const local = localStorage.getItem('data_invites');
    if (local) setInvites(JSON.parse(local));
  }, []);

  const handleInvite = (e) => {
    e.preventDefault();
    const role = DEFAULT_ROLES.find(r => r.id === inviteForm.roleId);
    const newInvite = {
      id: Date.now().toString(),
      email: inviteForm.email,
      roleName: role.name,
      date: new Date().toLocaleDateString(),
      status: 'Pending'
    };
    
    const updated = [...invites, newInvite];
    setInvites(updated);
    localStorage.setItem('data_invites', JSON.stringify(updated));
    
    setIsInviteModalOpen(false);
    setInviteForm({ email: '', roleId: 'r2' });
  };

  const getPermissionVariant = (perm) => {
    if (perm === 'all') return 'amber';
    if (perm === 'read-only') return 'blue';
    if (perm === 'i18n') return 'teal';
    return 'green';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Roles & Access</h1>
          <p className="text-slate-400 text-sm">Manage system permissions and invite team members.</p>
        </div>
        <Button onClick={() => setIsInviteModalOpen(true)} className="flex items-center gap-2">
          <UserPlus size={16} /> Invite User
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card className="h-full">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Shield size={18} className="text-[#f59e0b]" /> Active Roles
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500 font-mono">
                    <th className="pb-3 px-2">Role Name</th>
                    <th className="pb-3 px-2">Permissions</th>
                    <th className="pb-3 px-2 text-center">Users</th>
                  </tr>
                </thead>
                <tbody>
                  {DEFAULT_ROLES.map(role => (
                    <tr key={role.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-2 font-medium text-white">{role.name}</td>
                      <td className="py-4 px-2">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map(p => (
                            <Badge key={p} variant={getPermissionVariant(p)} className="text-[10px] px-1.5 py-0.5">{p}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center text-slate-300 font-mono">{role.users}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <h2 className="text-lg font-bold text-white mb-4">Pending Invites</h2>
            {invites.length === 0 ? (
              <div className="text-slate-500 text-sm text-center py-8">No pending invites.</div>
            ) : (
              <div className="space-y-4">
                {invites.map(inv => (
                  <div key={inv.id} className="bg-navy-2 p-3 rounded border border-white/5 flex justify-between items-center">
                    <div>
                      <div className="text-sm text-white truncate max-w-[150px]">{inv.email}</div>
                      <div className="text-xs text-slate-400 mt-1">{inv.roleName}</div>
                    </div>
                    <Badge variant="amber">Pending</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsInviteModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-navy-card border border-white/10 shadow-2xl rounded-xl overflow-hidden z-10"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-display font-bold text-white">Invite Team Member</h2>
                <button onClick={() => setIsInviteModalOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleInvite} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input required type="email" placeholder="colleague@gov.in" value={inviteForm.email} onChange={e => setInviteForm({...inviteForm, email: e.target.value})} className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-[#f59e0b] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Assign Role</label>
                  <select value={inviteForm.roleId} onChange={e => setInviteForm({...inviteForm, roleId: e.target.value})} className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-[#f59e0b] outline-none">
                    {DEFAULT_ROLES.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button type="button" onClick={() => setIsInviteModalOpen(false)} variant="ghost" className="flex-1 border-white/20">Cancel</Button>
                  <Button type="submit" className="flex-1">Send Invite</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
