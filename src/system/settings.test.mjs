import { describe, expect, test } from 'bun:test';
import { motionEnabled, clearCaseProgress, defaultSettings } from './settings';
describe('Configurações LIMIAR', () => {
  test('reduzir movimento desliga os efeitos', () => {
    expect(motionEnabled({ ...defaultSettings, reducedMotion: true })).toBe(false);
    expect(motionEnabled(defaultSettings)).toBe(true);
  });
  test('apagar progresso preserva agente e configurações', () => {
    const entries = new Map([['limiar:game:001', 'dados'], ['limiar:agent', 'agente'], ['limiar:settings', 'config']]);
    clearCaseProgress({ length: entries.size, key: i => [...entries.keys()][i] ?? null, removeItem: key => { entries.delete(key); } });
    expect(entries.has('limiar:game:001')).toBe(false);
    expect(entries.get('limiar:agent')).toBe('agente');
    expect(entries.get('limiar:settings')).toBe('config');
  });
});