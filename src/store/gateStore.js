import { create } from 'zustand';

// Gate Configuration
export const GATES = {
  S1: 'LOCATION_DETECT',
  S2: 'ELIGIBILITY_CHECK',
  S3: 'EPIC_LOOKUP',
  S4: 'BOOTH_ASSIGN',
  S5: 'DASHBOARD_READY'
};

const initialGatesState = {
  [GATES.S1]: { status: 'active', data: {}, unlockedAt: null }, // First gate is active by default
  [GATES.S2]: { status: 'locked', data: {}, unlockedAt: null },
  [GATES.S3]: { status: 'locked', data: {}, unlockedAt: null },
  [GATES.S4]: { status: 'locked', data: {}, unlockedAt: null },
  [GATES.S5]: { status: 'locked', data: {}, unlockedAt: null }
};

export const useGateStore = create((set, get) => ({
  gates: initialGatesState,
  isS3Loading: false,
  s3Error: null,

  // Complete a gate and unlock the next one
  completeGate: (gateKey, data) => set((state) => {
    const newGates = { ...state.gates };
    
    // Mark current gate complete
    if (newGates[gateKey]) {
      newGates[gateKey] = {
        status: 'complete',
        data: { ...newGates[gateKey].data, ...data },
        unlockedAt: Date.now()
      };
    }

    // Unlock next gate based on sequence
    if (gateKey === GATES.S1) newGates[GATES.S2] = { ...newGates[GATES.S2], status: 'active' };
    else if (gateKey === GATES.S2) newGates[GATES.S3] = { ...newGates[GATES.S3], status: 'active' };
    else if (gateKey === GATES.S3) newGates[GATES.S4] = { ...newGates[GATES.S4], status: 'active' };
    else if (gateKey === GATES.S4) newGates[GATES.S5] = { ...newGates[GATES.S5], status: 'complete', unlockedAt: Date.now() }; 

    return { gates: newGates };
  }),

  // Fix 4: EPIC Lookup Logic (Gate S3)
  submitEpicLookup: async (epic) => {
    set({ isS3Loading: true, s3Error: null });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const votersModule = await import('../data/voters.json');
      const voters = votersModule.default || votersModule;
      
      const match = voters.find(v => v.epic.toLowerCase().trim() === epic.toLowerCase().trim());
      
      if (match) {
        get().completeGate(GATES.S3, { voter: match });
        set({ isS3Loading: false });
        
        // Auto-complete S4 after 500ms
        setTimeout(async () => {
          try {
            const constituenciesModule = await import('../data/constituencies.json');
            const constituencies = constituenciesModule.default || constituenciesModule;
            const constMatch = constituencies.find(c => c.id === match.constituencyId);
            
            get().completeGate(GATES.S4, { constituency: constMatch, boothId: match.boothId });
            
            // Auto-complete S5 after 300ms
            setTimeout(() => {
              // trigger S4 completion which unlocks S5
              // get().completeGate(GATES.S5, {}); // S4 completion already unlocks S5 in completeGate
            }, 300);
          } catch (err) {
             console.error("Failed to load constituencies", err);
          }
        }, 500);
        
      } else {
        set({ isS3Loading: false, s3Error: "EPIC not found — try WB/01/232/123456 for demo" });
      }
    } catch (error) {
      set({ isS3Loading: false, s3Error: "Error connecting to database." });
    }
  },

  // Reset the entire flow
  resetFlow: () => set({ gates: initialGatesState, isS3Loading: false, s3Error: null }),
  
  // Get current active gate
  getCurrentGate: () => {
    const { gates } = get();
    if (gates[GATES.S5].status === 'complete') return GATES.S5;
    if (gates[GATES.S4].status === 'active') return GATES.S4;
    if (gates[GATES.S3].status === 'active') return GATES.S3;
    if (gates[GATES.S2].status === 'active') return GATES.S2;
    return GATES.S1;
  }
}));
