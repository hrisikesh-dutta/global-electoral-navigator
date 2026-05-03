import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Download, Save, X, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

// Hook to manage localStorage seeded from JSON
function useLocalStorageData(key, jsonFileFallback) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const local = localStorage.getItem(`data_${key}`);
        if (local) {
          setData(JSON.parse(local));
        } else {
          let fallbackData;
          switch (jsonFileFallback) {
            case 'elections.json': fallbackData = (await import('../data/elections.json')).default; break;
            case 'constituencies.json': fallbackData = (await import('../data/constituencies.json')).default; break;
            case 'candidates.json': fallbackData = (await import('../data/candidates.json')).default; break;
            case 'voters.json': fallbackData = (await import('../data/voters.json')).default; break;
            default: fallbackData = [];
          }
          setData(fallbackData);
          localStorage.setItem(`data_${key}`, JSON.stringify(fallbackData));
        }
      } catch (err) {
        console.error(`Error loading data for ${key}:`, err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [key, jsonFileFallback]);

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem(`data_${key}`, JSON.stringify(newData));
  };

  return [data, saveData, loading];
}

const TABS = [
  { id: 'Elections', file: 'elections.json' },
  { id: 'Constituencies', file: 'constituencies.json' },
  { id: 'Candidates', file: 'candidates.json' },
  { id: 'Voters', file: 'voters.json' }
];

export default function DataManager({ defaultTab = 'Elections' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const activeTabConfig = TABS.find(t => t.id === activeTab);
  const [data, setData, loading] = useLocalStorageData(activeTab.toLowerCase(), activeTabConfig.file);
  
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Derive columns dynamically from the first item
  const columns = data.length > 0 
    ? Object.keys(data[0]).filter(k => typeof data[0][k] !== 'object') 
    : ['id', 'name'];

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab.toLowerCase()}_export.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEditClick = (item) => {
    setEditingId(item.id || item.epic); // fallback for voters
    setEditFormData(item);
  };

  const handleSaveEdit = () => {
    const newData = data.map(item => 
      (item.id || item.epic) === editingId ? { ...item, ...editFormData } : item
    );
    setData(newData);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const newData = data.filter(item => (item.id || item.epic) !== id);
    setData(newData);
    setDeleteConfirmId(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newItem = { ...editFormData };
    if (!newItem.id && !newItem.epic) {
      newItem.id = `new-${Date.now()}`;
    }
    setData([...data, newItem]);
    setIsAdding(false);
    setEditFormData({});
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Data Manager</h1>
          <p className="text-slate-400 text-sm">Manage core system data tables natively in your browser.</p>
        </div>
        <Button onClick={handleExport} variant="ghost" className="border-white/20 text-slate-300 hover:text-white flex items-center gap-2">
          <Download size={16} /> Export JSON
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-px">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSearch('');
              setIsAdding(false);
              setEditingId(null);
            }}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id 
                ? 'border-[#f59e0b] text-[#f59e0b]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.id}
          </button>
        ))}
      </div>

      <Card className="bg-navy-card shadow-2xl">
        {/* Toolbar */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search data..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-navy border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:border-[#f59e0b] outline-none"
            />
          </div>
          <Button 
            onClick={() => {
              setIsAdding(true);
              setEditFormData({});
            }} 
            className="flex items-center gap-2 text-sm px-3 py-1.5"
          >
            <Plus size={16} /> Add Row
          </Button>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading data...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500 font-mono bg-navy/50">
                  {columns.map(col => <th key={col} className="p-3">{col}</th>)}
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 && !isAdding && (
                  <tr><td colSpan={columns.length + 1} className="p-8 text-center text-slate-500">No records found.</td></tr>
                )}
                
                {filteredData.map(item => {
                  const itemId = item.id || item.epic;
                  const isEditing = editingId === itemId;
                  
                  return (
                    <tr key={itemId} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      {columns.map(col => (
                        <td key={col} className="p-3 text-sm text-slate-300">
                          {isEditing ? (
                            <input 
                              type="text" 
                              value={editFormData[col] || ''}
                              onChange={(e) => setEditFormData({...editFormData, [col]: e.target.value})}
                              className="w-full bg-navy border border-white/20 rounded px-2 py-1 text-white focus:border-[#f59e0b] outline-none"
                            />
                          ) : (
                            String(item[col])
                          )}
                        </td>
                      ))}
                      <td className="p-3 text-right space-x-2">
                        {isEditing ? (
                          <>
                            <button onClick={handleSaveEdit} className="text-[#10b981] hover:text-[#059669] p-1"><Save size={16} /></button>
                            <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-white p-1"><X size={16} /></button>
                          </>
                        ) : deleteConfirmId === itemId ? (
                          <div className="inline-flex items-center gap-2 bg-[#ef4444]/20 text-[#ef4444] px-2 py-1 rounded text-xs">
                            <AlertCircle size={12} /> Delete?
                            <button onClick={() => handleDelete(itemId)} className="font-bold hover:underline">Yes</button>
                            <button onClick={() => setDeleteConfirmId(null)} className="hover:underline">No</button>
                          </div>
                        ) : (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-2">
                            <button onClick={() => handleEditClick(item)} className="text-slate-400 hover:text-[#f59e0b] p-1"><Edit2 size={16} /></button>
                            <button onClick={() => setDeleteConfirmId(itemId)} className="text-slate-400 hover:text-[#ef4444] p-1"><Trash2 size={16} /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {/* Inline Add Form */}
                {isAdding && (
                  <tr className="bg-[#f59e0b]/5 border-t-2 border-[#f59e0b]/50">
                    {columns.map(col => (
                      <td key={col} className="p-3">
                        <input 
                          type="text" 
                          placeholder={col}
                          value={editFormData[col] || ''}
                          onChange={(e) => setEditFormData({...editFormData, [col]: e.target.value})}
                          className="w-full bg-navy border border-[#f59e0b]/30 rounded px-2 py-1 text-white focus:border-[#f59e0b] outline-none text-sm"
                        />
                      </td>
                    ))}
                    <td className="p-3 text-right whitespace-nowrap">
                      <button onClick={handleAddSubmit} className="text-[#10b981] font-medium mr-3 text-sm">Save</button>
                      <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-white text-sm">Cancel</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
