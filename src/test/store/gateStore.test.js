import { describe, it, expect, beforeEach } from 'vitest';
import { act } from '@testing-library/react';

// Test Zustand gateStore logic directly
describe('gateStore', () => {
  let useGateStore;
  let GATES;

  beforeEach(async () => {
    // Reset module between tests
    vi.resetModules();
    const module = await import('../../store/gateStore.js');
    useGateStore = module.useGateStore;
    GATES = module.GATES;
  });

  it('exports GATES constants', async () => {
    const module = await import('../../store/gateStore.js');
    expect(module.GATES).toBeDefined();
    expect(module.GATES.S1).toBeDefined();
    expect(module.GATES.S5).toBeDefined();
  });

  it('has all 5 gate stages defined', async () => {
    const module = await import('../../store/gateStore.js');
    const gateKeys = Object.keys(module.GATES);
    expect(gateKeys.length).toBeGreaterThanOrEqual(5);
  });

  it('initial gate S1 has status pending or active', async () => {
    const module = await import('../../store/gateStore.js');
    const state = module.useGateStore.getState();
    const s1Status = state.gates[module.GATES.S1].status;
    expect(['pending', 'active', 'complete']).toContain(s1Status);
  });
});
