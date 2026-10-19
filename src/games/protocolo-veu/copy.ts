import type { GameCopy } from '../types';
export const bootLines = [
  "VELUM OS v0.4.4 / TERMINAL SEGURO",
  "montando /dev/arquivo_morto ............ OK",
  "verificando integridade do operador .... FALHA",
  "sessão anterior encerrada às 04:04 ..... NÃO ENCERRADA",
  "restaurando 806 imagens ................ CORROMPIDO",
  "acesso concedido a: ███████",
];

export const copy: GameCopy = {
 operator: 'R. AMARAL // INVESTIGADOR-CHEFE', caseId: 'CASO 0-VÉU / DESAPARECIMENTO EM SERRA OCA', bootLines,
 signal: 'SINAL FRACO', access: 'ACESSO NÃO AUTORIZADO', channel: 'canal criptografado / envio de mensagens bloqueado pelo sistema', typing: '██████ está digitando…', animatedStatuses: ['lida', 'lida às 04:04', 'entregue', 'lida por ██████', 'digitando...'], alert: 'ALERTA MÁXIMO / conteúdo não verificado pela central',
 apps: { mail: { label: 'CAIXA_DE_ENTRADA', hint: '4 mensagens / 2 corrompidas' }, chat: { label: 'MENSAGENS.enc', hint: 'canal criptografado' }, evidence: { label: 'EVIDÊNCIAS', hint: 'fotos · áudios · documentos' }, board: { label: 'QUADRO_DE_TEORIAS', hint: 'conexões instáveis' }, symbols: { label: 'SÍMBOLOS', hint: 'ocorrências em documentos' }, conclusion: { label: 'Concluir caso', hint: 'quem · como · por quê' } }
};
