import type { Board, Pin, Solution } from '@/games/types';
export type Progress = { opened: string[]; windows: string[]; board: Board; symbols: string[]; startedAt: string; completedAt?: string };
export const progressKey = (id: string) => `limiar:game:${id}:progress`;
export function initialProgress(board: Board): Progress { return { opened: [], windows: ['mail'], board: { pins: board.pins.map(p => ({ ...p })), links: board.links.map(l => [...l]) }, symbols: [], startedAt: new Date().toISOString() }; }
export function loadProgress(storage: Pick<Storage, 'getItem'>, id: string, board: Board): Progress {
 const fallback = initialProgress(board);
 try { const raw = storage.getItem(progressKey(id)); if (!raw) return fallback; const p = JSON.parse(raw); if (!Array.isArray(p.opened) || !Array.isArray(p.windows) || !Array.isArray(p.symbols) || !p.board || !Array.isArray(p.board.pins) || !Array.isArray(p.board.links) || typeof p.startedAt !== 'string') return fallback; return p; } catch { return fallback; }
}
export function saveProgress(storage: Pick<Storage, 'setItem'>, id: string, p: Progress) { try { storage.setItem(progressKey(id), JSON.stringify(p)); } catch { /* Device storage is optional. */ } }
export function addPin(board: Board, pin: Pin): Board {
 if (board.pins.some(p => p.id === pin.id)) return board;
 const slots = [8, 28, 48, 68].flatMap(x => [8, 35, 62].map(y => ({ x, y })));
 const slot = slots.find(s => !board.pins.some(p => Math.abs(p.x - s.x) < 18 && Math.abs(p.y - s.y) < 25));
 return { ...board, pins: [...board.pins, { ...pin, ...(slot ?? {}) }] };
}
export function toggleLink(board: Board, a: string, b: string): Board { if (a === b) return board; const matches = ([x,y]: [string,string]) => (x === a && y === b) || (x === b && y === a); return { ...board, links: board.links.some(matches) ? board.links.filter(l => !matches(l)) : [...board.links, [a,b]] }; }
export function evaluate(solution: Solution, answers: Record<'who' | 'how' | 'why', string>): 'total' | 'partial' | 'wrong' { const hits = (['who','how','why'] as const).filter(k => answers[k] === solution.fields[k].correct).length; return hits === 3 ? 'total' : hits ? 'partial' : 'wrong'; }
