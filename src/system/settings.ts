export type Settings = { volume: number; glitch: boolean; reducedMotion: boolean; muted: boolean };
export const defaultSettings: Settings = { volume: 35, glitch: true, reducedMotion: false, muted: false };
export function motionEnabled(settings: Settings) {
  return settings.glitch && !settings.reducedMotion;
}
export function clearCaseProgress(storage: Pick<Storage, 'length' | 'key' | 'removeItem'>) {
  const keys = Array.from({ length: storage.length }, (_, i) => storage.key(i));
  keys.forEach(key => { if (key?.startsWith('limiar:game:')) storage.removeItem(key); });
}