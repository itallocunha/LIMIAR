import { useEffect, useState } from "react";
import { Mail, MessageSquare, FolderLock, Network, Power, SignalLow, TriangleAlert } from "lucide-react";
import { Window } from "@/game/Window";
import { MailApp } from "@/game/MailApp";
import { ChatApp } from "@/game/ChatApp";
import { EvidenceApp } from "@/game/EvidenceApp";
import { CorkboardApp } from "@/game/CorkboardApp";
import { GAME_NAME, OPERATOR, CASE_ID, bootLines } from "@/game/data";

type AppId = "mail" | "chat" | "evidence" | "board";

const apps: {
  id: AppId;
  label: string;
  hint: string;
  icon: typeof Mail;
  initial: { x: number; y: number; w: number; h: number };
}[] = [
  { id: "mail", label: "CAIXA_DE_ENTRADA", hint: "4 mensagens / 2 corrompidas", icon: Mail, initial: { x: 120, y: 80, w: 760, h: 460 } },
  { id: "chat", label: "MENSAGENS.enc", hint: "canal criptografado", icon: MessageSquare, initial: { x: 250, y: 150, w: 680, h: 440 } },
  { id: "evidence", label: "EVIDÊNCIAS", hint: "fotos · áudios · documentos", icon: FolderLock, initial: { x: 180, y: 110, w: 780, h: 480 } },
  { id: "board", label: "QUADRO_DE_TEORIAS", hint: "conexões instáveis", icon: Network, initial: { x: 140, y: 90, w: 820, h: 500 } },
];

export function LegacyCase() {
  const [open, setOpen] = useState<AppId[]>(["mail"]);
  const [order, setOrder] = useState<AppId[]>(["mail"]);
  const [clock, setClock] = useState("--:--:--");
  const [boot, setBoot] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      const d = new Date();
      const broken = Math.random() < 0.12;
      setClock(
        broken
          ? "04:04:04"
          : d.toLocaleTimeString("pt-BR", { hour12: false }),
      );
    }, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (boot >= bootLines.length) return;
    const t = setTimeout(() => setBoot((b) => b + 1), 420);
    return () => clearTimeout(t);
  }, [boot]);

  useEffect(() => {
    const i = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 7000);
    return () => clearInterval(i);
  }, []);

  const focus = (id: AppId) => setOrder((o) => [...o.filter((x) => x !== id), id]);
  const launch = (id: AppId) => {
    setOpen((o) => (o.includes(id) ? o : [...o, id]));
    focus(id);
  };

  return (
    <main className="scanlines vignette noise crt-flicker relative h-screen w-screen overflow-hidden bg-background">
      {/* barra superior do sistema */}
      <header className="relative z-40 flex items-center gap-4 border-b border-border bg-secondary/80 px-3 py-1 text-sm">
        <span className={`uppercase tracking-[0.3em] text-blood ${glitch ? "text-glitch" : ""}`}>
          {GAME_NAME}
        </span>
        <span className="hidden text-muted-foreground sm:inline">{CASE_ID}</span>
        <span className="ml-auto flex items-center gap-1 text-rust">
          <SignalLow size={12} /> SINAL FRACO
        </span>
        <span className="flex items-center gap-1 text-destructive">
          <TriangleAlert size={12} /> ACESSO NÃO AUTORIZADO
        </span>
        <span className={glitch ? "text-destructive text-glitch" : "text-bone"}>{clock}</span>
      </header>

      {/* ícones da área de trabalho */}
      <div className="relative z-30 flex w-28 flex-col gap-4 p-4">
        {apps.map((a) => (
          <button
            key={a.id}
            onDoubleClick={() => launch(a.id)}
            onClick={() => launch(a.id)}
            className="glitch-hover group flex flex-col items-center gap-1 text-center"
          >
            <a.icon size={28} className="text-sick group-hover:text-destructive" />
            <span className="text-xs uppercase leading-3 text-bone">{a.label}</span>
            <span className="text-[10px] leading-3 text-muted-foreground">{a.hint}</span>
          </button>
        ))}
      </div>

      {/* log de boot */}
      <pre className="pointer-events-none absolute bottom-10 right-4 z-20 text-right text-sm leading-5 text-muted-foreground">
        {bootLines.slice(0, boot).join("\n")}
        {boot >= bootLines.length && "\n> _"}
      </pre>

      {/* janelas */}
      {apps
        .filter((a) => open.includes(a.id))
        .map((a) => (
          <Window
            key={a.id}
            title={a.label}
            subtitle={a.hint}
            zIndex={100 + order.indexOf(a.id)}
            initial={a.initial}
            onFocus={() => focus(a.id)}
            onClose={() => setOpen((o) => o.filter((x) => x !== a.id))}
          >
            {a.id === "mail" && <MailApp />}
            {a.id === "chat" && <ChatApp />}
            {a.id === "evidence" && <EvidenceApp />}
            {a.id === "board" && <CorkboardApp />}
          </Window>
        ))}

      {/* barra de tarefas */}
      <footer className="absolute bottom-0 left-0 z-40 flex w-full items-center gap-2 border-t border-border bg-secondary/90 px-3 py-1 text-sm">
        <Power size={12} className="text-destructive" />
        <span className="text-muted-foreground">{OPERATOR}</span>
        <div className="ml-4 flex gap-2">
          {apps
            .filter((a) => open.includes(a.id))
            .map((a) => (
              <button
                key={a.id}
                onClick={() => focus(a.id)}
                className="border border-border px-2 text-bone hover:bg-background"
              >
                {a.label}
              </button>
            ))}
        </div>
        <span className="ml-auto text-rust">
          {open.length + 1} janelas ativas
        </span>
      </footer>
    </main>
  );
}
