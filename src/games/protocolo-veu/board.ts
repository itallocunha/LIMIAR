import type { Pin } from '../types';
export const pins: Pin[] = [
  { id: "p1", label: "R. AMARAL", note: "desaparecido / 14 NOV", x: 12, y: 14, kind: "suspeito" },
  { id: "p2", label: "HELENA V.", note: "quarto 447-B / vazio", x: 62, y: 10, kind: "suspeito" },
  { id: "p3", label: "SERRA OCA", note: "cota 1.480 / 12 sapatos", x: 38, y: 44, kind: "foto" },
  { id: "p4", label: "SÍMBOLO DO VÉU", note: "gravado em 9 árvores", x: 78, y: 48, kind: "simbolo" },
  { id: "p5", label: "JORNAL 1974", note: "'12 sumiram na serra'", x: 16, y: 62, kind: "recorte" },
  { id: "p6", label: "CHAMADA 04:04", note: "a central respondeu sozinha", x: 56, y: 74, kind: "recorte" },
];

export const links: [string, string][] = [
  ["p1", "p3"],
  ["p2", "p3"],
  ["p3", "p4"],
  ["p5", "p3"],
  ["p6", "p1"],
  ["p5", "p4"],
];
export const board = { pins, links };

