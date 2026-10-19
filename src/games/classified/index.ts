import type { GamePackage } from '../types';
import { game as template } from '../copo-nao-parou';
export const classifiedGames: GamePackage[] = [2, 3].map(n => ({ ...template, manifest: { ...template.manifest, id: `classified-${n}`, caseNumber: n, title: `CASO 00${n} ▒▒▒▒▒▒`, status: 'classified', statusLabel: 'CLASSIFICADO', modules: [] }, emails: [], messages: [], evidence: [], board: { pins: [], links: [] } }));
