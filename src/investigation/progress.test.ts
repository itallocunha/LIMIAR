import { describe, test, expect } from 'bun:test';
import { initialProgress, loadProgress, saveProgress, progressKey, evaluate, addPin, toggleLink } from './progress';
import { manifest } from '../games/copo-nao-parou/manifest';
import { emails } from '../games/copo-nao-parou/emails';
import { messages } from '../games/copo-nao-parou/messages';
import { evidence } from '../games/copo-nao-parou/evidence';
import { board } from '../games/copo-nao-parou/board';
import { solution } from '../games/protocolo-veu/solution';
describe('Pacotes e progresso local',()=>{
 test('caso 001 permanece em preparação com id estável',()=>{expect(manifest.id).toBe('copo-nao-parou');expect(manifest.caseNumber).toBe(1);expect(manifest.status).toBe('preparing');});
 test('pacote provisório tem 2 emails, 1 conversa, 3 evidências e 4 cartões',()=>{expect(emails.length).toBe(2);expect(messages.length).toBe(1);expect(evidence.length).toBe(3);expect(board.pins.length).toBe(4);});
 test('caso do copo não contém corpo, autopsia ou foto de morte',()=>{expect(evidence.some(e=>e.type==='autopsia')).toBe(false);expect(JSON.stringify(evidence).toLowerCase()).not.toMatch(/cadáver|foto de morte|corpo encontrado/);});
 test('salva leituras, quadro, janelas e horários sob a chave do caso',()=>{const data=new Map<string,string>();const storage={getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v);}};const p=initialProgress(board);p.opened=['copo-email-01'];p.windows=['board'];p.completedAt='2026-10-19T23:00:00Z';saveProgress(storage,manifest.id,p);expect(progressKey(manifest.id)).toBe('limiar:game:copo-nao-parou:progress');expect(loadProgress(storage,manifest.id,board)).toEqual(p);expect(data.has('limiar:game:protocolo-veu:progress')).toBe(false);});
 test('funciona com armazenamento bloqueado ou inválido',()=>{const denied={getItem:()=>{throw Error('denied');},setItem:()=>{throw Error('denied');}};expect(loadProgress(denied,'x',board).board).toEqual(board);expect(()=>saveProgress(denied,'x',initialProgress(board))).not.toThrow();expect(loadProgress({getItem:()=>'{broken'},'x',board).opened).toEqual([]);});
 test('cartões não duplicam e ligações são reversíveis',()=>{const pin={id:'new',label:'new',note:'',kind:'email',x:5,y:5};const b=addPin(board,pin);expect(addPin(b,pin).pins.length).toBe(5);expect(toggleLink(toggleLink(b,'new','copo-pin-01'),'copo-pin-01','new').links).toEqual([]);});
 test('três respostas certas dão acerto total',()=>{expect(evaluate(solution,{who:'entidade',how:'contato',why:'abertura'})).toBe('total');});
 test('uma resposta certa dá acerto parcial',()=>{expect(evaluate(solution,{who:'entidade',how:'fuga',why:'fraude'})).toBe('partial');});
 test('nenhuma resposta certa dá erro',()=>{expect(evaluate(solution,{who:'amaral',how:'fuga',why:'fraude'})).toBe('wrong');});
});
