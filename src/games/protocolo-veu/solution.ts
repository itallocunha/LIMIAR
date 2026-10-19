import type { Solution } from '../types';
export const solution: Solution = { provisional: true, fields: {
 who: { label: 'Quem?', options: [{ id: 'entidade', label: '[EDITAR] Entidade do Véu' }, { id: 'amaral', label: 'R. Amaral' }, { id: 'helena', label: 'Helena V.' }], correct: 'entidade' },
 how: { label: 'Como?', options: [{ id: 'contato', label: '[EDITAR] Contato através do Véu' }, { id: 'fuga', label: 'Fuga voluntária' }, { id: 'engano', label: 'Engano nos registros' }], correct: 'contato' },
 why: { label: 'Por quê?', options: [{ id: 'abertura', label: '[EDITAR] A abertura despertou a entidade' }, { id: 'acidente', label: 'Acidente isolado' }, { id: 'fraude', label: 'Fraude institucional' }], correct: 'abertura' }
} };
