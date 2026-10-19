import { useEffect, useState } from 'react';
import { LockKeyhole, FolderArchive, Settings as SettingsIcon, Shield, ArrowRight, Volume2, VolumeX, ChevronRight, LogOut, X, CircleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Window } from '@/game/Window';
import { CaseDesktop } from '@/investigation/CaseDesktop';
import { games } from '@/games/registry';
import type { GamePackage } from '@/games/types';
import emblem from '@/assets/limiar-emblema.png.asset.json';
import logo from '@/assets/limiar-logo-nome.png.asset.json';
import { clearCaseProgress, defaultSettings, motionEnabled, type Settings } from './settings';

type Panel = 'about' | 'settings' | 'archive' | 'denied';
const panels: Record<Panel, string> = { about: 'SOBRE A LIMIAR', settings: 'CONFIGURAÇÕES', archive: 'ARQUIVO LIMIAR', denied: 'ACESSO RESTRITO' };
const logs = ['LIMIAR / TERMINAL INTERNO v.01.04', 'Verificando integridade do núcleo... OK', 'Restaurando credenciais locais... OK', 'Sincronizando arquivos classificados... BLOQUEADO', 'Uma sessão anterior permanece aberta.', 'Terminal pronto. Aguardando agente.'];

export function LimiarSystem() {
  const [screen, setScreen] = useState<'boot' | 'login' | 'desktop' | 'case'>('boot');
  const [boot, setBoot] = useState(0);
  const [agent, setAgent] = useState('');
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [opened, setOpened] = useState<Panel[]>([]);
  const [menu, setMenu] = useState(false);
  const [clock, setClock] = useState('--:--');
  const [notice, setNotice] = useState('');
  const [sound, setSound] = useState(false);
  const [activeGame, setActiveGame] = useState<GamePackage>();
  useEffect(() => {
    try {
      setAgent(localStorage.getItem('limiar:agent') ?? '');
      const raw = localStorage.getItem('limiar:settings');
      if (raw) setSettings({ ...defaultSettings, ...JSON.parse(raw) });
    } catch { /* Local storage may be unavailable. */ }
  }, []);
  useEffect(() => {
    if (screen !== 'boot') return;
    const timer = setInterval(() => setBoot(b => Math.min(b + 1, logs.length)), 470);
    return () => clearInterval(timer);
  }, [screen]);
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    tick(); const timer = setInterval(tick, 1000); return () => clearInterval(timer);
  }, []);
  const update = (next: Settings) => {
    setSettings(next);
    try { localStorage.setItem('limiar:settings', JSON.stringify(next)); } catch { /* Keep settings in memory. */ }
  };
  const open = (panel: Panel) => { setOpened(prev => [...prev.filter(p => p !== panel), panel]); setMenu(false); };
  const enter = () => {
    if (!agent.trim()) return;
    try { localStorage.setItem('limiar:agent', agent.trim()); } catch { /* Identification still works without storage. */ }
    setScreen('desktop');
  };
  const activateSound = () => {
    setSound(true);
    if (settings.muted || !settings.volume) return;
    const context = new AudioContext();
    const tone = context.createOscillator(); const gain = context.createGain();
    tone.type = 'sine'; tone.frequency.value = 150;
    gain.gain.setValueAtTime(settings.volume / 5000, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + .2);
    tone.connect(gain); gain.connect(context.destination); tone.start(); tone.stop(context.currentTime + .2);
    tone.onended = () => { void context.close(); };
  };
  const effects = motionEnabled(settings);
  if (screen === 'case' && activeGame) return <CaseDesktop key={activeGame.manifest.id} game={activeGame} effects={effects} onExit={() => setScreen('desktop')} />;
  return <main className={`limiar-screen ${effects ? 'scanlines vignette crt-flicker' : 'motion-off'}`}>
    {screen === 'boot' && <div className="boot-screen">
      <div className="boot-top"><span>LIMIAR / NÚCLEO INTERNO</span><span>INICIALIZAÇÃO SEGURA</span></div>
      <img src={logo.url} className="boot-logo" alt="LIMIAR, Núcleo de Investigação de Fenômenos Anômalos" />
      <div className="boot-terminal"><div className="flex justify-between text-muted-foreground"><span>SEQUÊNCIA DE INICIALIZAÇÃO</span><span>{Math.round(boot / logs.length * 100)}%</span></div><div className="boot-progress"><div style={{ width: `${boot / logs.length * 100}%` }} /></div><div className="h-40 py-4">{logs.slice(0, boot).map((line, i) => <p key={line} className={i === 3 ? 'text-destructive' : 'text-muted-foreground'}><span className="mr-4 opacity-40">0{i + 1}</span>{line}</p>)}</div>
      <div className="flex flex-wrap items-center justify-between gap-3"><Button variant="ghost" onClick={activateSound}><Volume2 />{sound ? 'Som ativado' : 'Clique para ativar o som'}</Button><Button variant="outline" onClick={() => setScreen('login')}>{boot === logs.length ? 'Acessar terminal' : 'Pular inicialização'}<ArrowRight /></Button></div></div>
      <p className="boot-bottom">PROPRIEDADE DA LIMIAR / USO NÃO AUTORIZADO SERÁ REGISTRADO</p>
    </div>}
    {screen === 'login' && <div className="login-screen"><img src={emblem.url} alt="Emblema LIMIAR" className="h-36 w-36 object-contain" /><p className="text-muted-foreground">TERMINAL INTERNO / IDENTIFICAÇÃO LOCAL</p><h1 className="text-4xl">Identifique-se, agente.</h1><form onSubmit={e => { e.preventDefault(); enter(); }} className="mt-8 w-full max-w-sm space-y-3"><label htmlFor="agent" className="text-muted-foreground">AGENTE</label><input id="agent" autoFocus value={agent} onChange={e => setAgent(e.target.value)} maxLength={40} placeholder="Seu nome de agente" className="w-full border border-input bg-card p-3 text-xl outline-none focus:border-ring" required /><Button type="submit" className="w-full" disabled={!agent.trim()}>Entrar <ArrowRight /></Button></form><p className="mt-10 text-sm text-muted-foreground">IDENTIFICAÇÃO NESTE DISPOSITIVO / SEM CONEXÃO EXTERNA</p></div>}
    {screen === 'desktop' && <>
      <header className="desktop-header"><div><span className="text-foreground">LIMIAR</span><span className="ml-4 text-muted-foreground">TERMINAL DE INVESTIGAÇÃO</span></div><span className="text-muted-foreground">SESSÃO LOCAL <span className="ml-3 text-destructive">●</span></span></header>
      <div className="desktop-watermark"><img src={emblem.url} alt="" /><h1>SISTEMA LIMIAR</h1><p>NÚCLEO DE INVESTIGAÇÃO DE FENÔMENOS ANÔMALOS</p><span>O QUE ESTÁ DO OUTRO LADO NÃO DEVE ATRAVESSAR.</span></div>
      <section className="desktop-files" aria-label="Área de trabalho"><p className="desktop-section-label">CASOS / ACESSO NÍVEL 01</p><div className="desktop-grid">
        {games.map(game => { const m = game.manifest; const launch = () => { if (m.status === 'classified') open('denied'); else if (m.status === 'preparing') setNotice(m.notice ?? m.statusLabel); else { setActiveGame(game); setScreen('case'); } }; return <Button key={m.id} variant="ghost" className={`desktop-icon ${m.status === 'classified' ? 'locked' : ''}`} onDoubleClick={launch} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); launch(); } }} onClick={() => m.status === 'installed' ? setNotice(`${m.title} selecionado`) : launch()}>{m.status === 'classified' ? <LockKeyhole className="file-icon" /> : m.status === 'preparing' ? <div className="case-symbol">◯<span>{String(m.caseNumber).padStart(3, '0')}</span></div> : <FolderArchive className="file-icon" />}<span>{m.title}</span><small>{m.statusLabel}</small></Button>; })}
      </div><p className="desktop-section-label mt-10">ARQUIVOS DO SISTEMA</p><div className="desktop-grid">{(['archive', 'about', 'settings'] as Panel[]).map(p => <Button key={p} variant="ghost" className="desktop-icon" onClick={() => open(p)}>{p === 'settings' ? <SettingsIcon className="file-icon" /> : p === 'about' ? <img src={emblem.url} alt="" className="h-14 w-14" /> : <FolderArchive className="file-icon" />}<span>{panels[p]}</span><small>{p === 'archive' ? 'DOCUMENTOS INSTITUCIONAIS' : p === 'about' ? 'NÚCLEO / INFORMAÇÕES' : 'PREFERÊNCIAS LOCAIS'}</small></Button>)}</div></section>
      <div className="desktop-status"><p>AGENTE: {agent.toUpperCase()}</p><p>CONEXÃO EXTERNA: INATIVA</p><p className="text-destructive">ARQUIVOS OCULTOS: ███</p></div>
      {notice && <div role="status" className="desktop-notice">{notice}<Button aria-label="Fechar aviso" variant="ghost" size="icon" onClick={() => setNotice('')}><X /></Button></div>}
      {opened.map((p, i) => <Window key={p} title={panels[p]} subtitle="LIMIAR / INTERNO" initial={{ x: 260 + i * 20, y: 90 + i * 20, w: 620, h: 480 }} zIndex={100 + i} onFocus={() => open(p)} onClose={() => setOpened(prev => prev.filter(x => x !== p))}><div className="h-full overflow-y-auto p-6">
        {p === 'about' && <><img src={logo.url} alt="LIMIAR, Núcleo de Investigação de Fenômenos Anômalos" className="mb-8 w-full" /><p className="mb-5 text-muted-foreground">SISTEMA LIMIAR / VERSÃO 01.04</p><div className="font-typewriter text-sm leading-7"><p>Nem todo fenômeno pode ser explicado. Nem todo arquivo deve ser aberto.</p><p className="mt-4">A LIMIAR investiga ocorrências que permanecem além das classificações convencionais. Sua fundação, seus integrantes e a extensão de suas atividades são informações restritas.</p><p className="mt-5 text-destructive">CREDENCIAL NÍVEL 01 / ACESSO PARCIAL</p></div></>}
        {p === 'settings' && <><h2 className="mb-7 text-2xl">Preferências do terminal</h2><label className="flex justify-between" htmlFor="volume">Volume global<span>{settings.volume}%</span></label><input id="volume" type="range" min="0" max="100" value={settings.volume} onChange={e => update({ ...settings, volume: +e.target.value })} className="my-5 w-full accent-primary" />{([{ key: 'muted', label: 'Mudo' }, { key: 'glitch', label: 'Efeitos de glitch' }, { key: 'reducedMotion', label: 'Reduzir movimento' }] as const).map(({ key, label }) => <label key={key} className="flex items-center justify-between border-t border-border py-4">{label}<input type="checkbox" checked={settings[key]} onChange={e => update({ ...settings, [key]: e.target.checked })} className="h-4 w-4 accent-primary" /></label>)}<Button variant="outline" className="mt-5 text-destructive" onClick={() => { if (window.confirm('Apagar o progresso de todos os casos neste dispositivo?')) { clearCaseProgress(localStorage); setNotice('Progresso dos casos apagado.'); } }}>Apagar progresso dos casos</Button></>}
        {p === 'archive' && <><FolderArchive className="mb-4 text-muted-foreground" size={32} /><h2 className="text-2xl">Arquivo institucional</h2><p className="mt-4 text-muted-foreground">CATÁLOGO PARCIAL / NÍVEL 01</p>{['ORIGEM DA LIMIAR', 'FENÔMENOS DE CONTATO', 'OCORRÊNCIAS RELACIONADAS'].map(t => <div className="mt-5 border-b border-border pb-4" key={t}><p>{t}</p><Button variant="ghost" className="mt-2 bg-background text-muted-foreground" onClick={() => setNotice('Fragmento recuperado: não há registro da primeira sessão.')}>████████████████████</Button></div>)}<p className="mt-5 text-muted-foreground">Dossiê completo em preparação.</p></>}
        {p === 'denied' && <div className="flex h-full flex-col items-center justify-center text-center"><CircleAlert size={40} className="mb-5 text-destructive" /><h2 className="text-3xl">ACESSO NEGADO</h2><p className="mt-3 text-muted-foreground">Nível insuficiente.</p><p className="mt-6 text-sm text-muted-foreground">A existência deste arquivo não deve ser confirmada.</p></div>}
      </div></Window>)}
      {menu && <nav className="start-menu" aria-label="Menu iniciar"><div className="mb-4 flex items-center gap-3 border-b border-border pb-4"><img src={emblem.url} alt="" className="h-10 w-10" /><div>LIMIAR<p className="text-muted-foreground">AGENTE {agent.toUpperCase()}</p></div></div>{(['about', 'archive', 'settings'] as Panel[]).map(p => <Button key={p} variant="ghost" className="w-full justify-between" onClick={() => open(p)}>{panels[p]}<ChevronRight /></Button>)}<Button variant="ghost" className="mt-4 w-full justify-start border-t border-border" onClick={() => { setScreen('login'); setMenu(false); }}><LogOut /> Encerrar sessão</Button></nav>}
      <footer className="taskbar"><Button variant="ghost" onClick={() => setMenu(m => !m)} aria-expanded={menu} className="start-button"><img src={emblem.url} alt="" />INICIAR</Button><div className="taskbar-windows">{opened.map(p => <Button key={p} variant="secondary" onClick={() => open(p)}>{panels[p]}</Button>)}</div><div className="ml-auto flex items-center gap-4"><span className="hidden text-muted-foreground sm:inline">NÍVEL 01</span><Button variant="ghost" size="icon" aria-label={settings.muted ? 'Ativar volume' : 'Silenciar'} onClick={() => update({ ...settings, muted: !settings.muted })}>{settings.muted ? <VolumeX /> : <Volume2 />}</Button><span className="text-xl">{clock}</span></div></footer>
    </>}
  </main>;
}
