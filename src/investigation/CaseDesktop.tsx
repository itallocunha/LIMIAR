import { useEffect, useState } from 'react';
import { Mail, MessageSquare, FolderLock, Network, SignalLow, TriangleAlert, LogOut, ScanText, CheckCheck } from 'lucide-react';
import { Window } from '@/game/Window';
import { Button } from '@/components/ui/button';
import type { GamePackage, ModuleId, Pin } from '@/games/types';
import { BoardModule, ConclusionModule, EvidenceModule, MailModule, MessagesModule, SymbolsModule } from './Modules';
import { addPin, initialProgress, loadProgress, saveProgress, type Progress } from './progress';
import { ui } from './copy';
import './styles.css';
const icons = { mail: Mail, chat: MessageSquare, evidence: FolderLock, board: Network, symbols: ScanText, conclusion: CheckCheck };
const positions = { mail: { x:120,y:80,w:760,h:460 }, chat: { x:250,y:150,w:680,h:440 }, evidence: { x:180,y:110,w:780,h:480 }, board: { x:140,y:90,w:820,h:500 }, symbols: { x:220,y:110,w:620,h:460 }, conclusion: { x:260,y:100,w:500,h:480 } };
export function CaseDesktop({ game,onExit,effects }: { game:GamePackage;onExit:()=>void;effects:boolean }) {
 const [progress,setProgress]=useState<Progress>(()=>initialProgress(game.board)); const [ready,setReady]=useState(false);
 const [order,setOrder]=useState<ModuleId[]>(['mail']);const [clock,setClock]=useState('--:--:--');const [boot,setBoot]=useState(0);const [glitch,setGlitch]=useState(false);const [evidenceId,setEvidenceId]=useState<string>();const [emailId,setEmailId]=useState<string>();
 useEffect(()=>{try{setProgress(loadProgress(localStorage,game.manifest.id,game.board));}catch{/* Use in-memory state. */}setReady(true);},[game]);
 useEffect(()=>{if(ready)try{saveProgress(localStorage,game.manifest.id,progress);}catch{/* Storage can be denied. */}},[progress,ready,game]);
 useEffect(()=>{const t=setInterval(()=>setClock(effects&&game.copy.clockAnomaly&&Math.random()<.12?game.copy.clockAnomaly:new Date().toLocaleTimeString('pt-BR',{hour12:false})),1000);return()=>clearInterval(t);},[effects,game]);
 useEffect(()=>{if(boot>=game.copy.bootLines.length)return;const t=setTimeout(()=>setBoot(b=>b+1),420);return()=>clearTimeout(t);},[boot,game]);
 useEffect(()=>{if(!effects)return;let timeout:ReturnType<typeof setTimeout>;const t=setInterval(()=>{setGlitch(true);timeout=setTimeout(()=>setGlitch(false),180);},7000);return()=>{clearInterval(t);clearTimeout(timeout);};},[effects]);
 const focus=(id:ModuleId)=>setOrder(o=>[...o.filter(x=>x!==id),id]);
 const launch=(id:ModuleId)=>{setProgress(p=>({...p,windows:p.windows.includes(id)?p.windows:[...p.windows,id]}));focus(id);};
 const read=(id:string)=>setProgress(p=>p.opened.includes(id)?p:{...p,opened:[...p.opened,id]});
 const pin=(p:Pin)=>{setProgress(prev=>({...prev,board:addPin(prev.board,p)}));launch('board');};
 const mark=(id:string)=>setProgress(p=>({...p,symbols:p.symbols.includes(id)?p.symbols.filter(s=>s!==id):[...p.symbols,id]}));
 const showEvidence=(id:string)=>{setEvidenceId(id);launch('evidence');};
 const showEmail=(id:string)=>{setEmailId(id);launch('mail');};
 const open=game.manifest.modules.filter(id=>progress.windows.includes(id));
 if(!ready)return <main className={`${game.manifest.theme} h-screen bg-background`}/>;
 return <main className={`${game.manifest.theme} case-desktop ${effects?'scanlines vignette noise crt-flicker':'motion-off'} relative h-screen w-screen overflow-hidden bg-background`}>
 <header className="relative z-40 flex items-center gap-4 border-b border-border bg-secondary/80 px-3 py-1 text-sm"><span className={`uppercase text-blood ${glitch?'text-glitch':''}`}>{game.manifest.title}</span><span className="hidden text-muted-foreground sm:inline">{game.copy.caseId}</span><span className="ml-auto flex items-center gap-1 text-rust"><SignalLow size={12}/>{game.copy.signal}</span><span className="flex items-center gap-1 text-destructive"><TriangleAlert size={12}/>{game.copy.access}</span><span className={glitch?'text-destructive text-glitch':'text-bone'}>{clock}</span></header>
 <div className="case-icons relative z-30 flex flex-col gap-4 p-4">{game.manifest.modules.map(id=>{const Icon=icons[id];const app=game.copy.apps[id];return <Button key={id} variant="ghost" onClick={()=>launch(id)} className="case-icon glitch-hover group"><Icon size={28} className="text-sick group-hover:text-destructive"/><span className="text-xs uppercase leading-3 text-bone">{app.label}</span><span className="text-[10px] leading-3 text-muted-foreground">{app.hint}</span></Button>;})}</div>
 <pre className="pointer-events-none absolute bottom-16 right-4 z-20 text-right text-sm leading-5 text-muted-foreground">{game.copy.bootLines.slice(0,boot).join('\n')}{boot>=game.copy.bootLines.length&&'\n> _'}</pre>
 {open.map(id=><Window key={id} title={game.copy.apps[id].label} subtitle={game.copy.apps[id].hint} zIndex={100+order.indexOf(id)} initial={positions[id]} onFocus={()=>focus(id)} onClose={()=>setProgress(p=>({...p,windows:p.windows.filter(x=>x!==id)}))}>
 {id==='mail'&&<MailModule items={game.emails} selectedId={emailId} copy={game.copy} onRead={read} onPin={pin} onEvidence={showEvidence} opened={progress.opened} marked={progress.symbols} onMark={mark}/>}
 {id==='chat'&&<MessagesModule items={game.messages} copy={game.copy} onRead={read} onPin={pin}/>}
 {id==='evidence'&&<EvidenceModule items={game.evidence} selectedId={evidenceId} onRead={read} onPin={pin} marked={progress.symbols} onMark={mark}/>}
 {id==='board'&&<BoardModule board={progress.board} onChange={board=>setProgress(p=>({...p,board}))}/>}
 {id==='symbols'&&<SymbolsModule game={game} marked={progress.symbols} onEvidence={showEvidence} onEmail={showEmail}/>}
 {id==='conclusion'&&<ConclusionModule solution={game.solution} onComplete={()=>setProgress(p=>({...p,completedAt:p.completedAt??new Date().toISOString()}))}/>}
 </Window>)}
 <footer className="case-taskbar absolute bottom-0 left-0 z-[200] flex w-full items-center gap-2 border-t border-border bg-secondary/90 px-3 py-1 text-sm"><Button variant="ghost" className="shrink-0 text-bone" onClick={onExit}><LogOut size={12} className="text-destructive"/>{ui.exit}</Button><span className="case-operator text-muted-foreground">{game.copy.operator}</span><div className="flex min-w-0 gap-2 overflow-x-auto">{open.map(id=><Button key={id} variant="outline" className="h-7 shrink-0 text-xs text-bone" onClick={()=>focus(id)}>{game.copy.apps[id].label}</Button>)}</div><span className="ml-auto shrink-0 text-rust">{open.length+1} {ui.active}</span></footer>
 </main>;
}
