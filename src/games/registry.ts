import { game as veu } from './protocolo-veu';
import { game as copo } from './copo-nao-parou';
import { classifiedGames } from './classified';
import type { GamePackage } from './types';
export const games: GamePackage[] = [copo, veu, ...classifiedGames];
