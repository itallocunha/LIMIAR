import { useEffect, useState } from "react";
import { threads } from "./data";

const creepyStatus = ["lida", "lida às 04:04", "entregue", "lida por ██████", "digitando..."];

export function ChatApp() {
  const [sel, setSel] = useState(threads[0].id);
  const [tick, setTick] = useState(0);
  const thread = threads.find((t) => t.id === sel)!;

  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="flex h-full min-h-0">
      <ul className="w-48 shrink-0 overflow-y-auto border-r border-border bg-background/60">
        {threads.map((t) => (
          <li key={t.id}>
            <button
              onClick={() => setSel(t.id)}
              className={`w-full border-b border-border px-2 py-2 text-left hover:bg-secondary ${
                t.id === sel ? "bg-secondary" : ""
              }`}
            >
              <div className="text-sm text-bone">{t.contact}</div>
              <div className="text-xs text-muted-foreground">{t.subtitle}</div>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {thread.messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "vitima" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] border px-2 py-1 text-lg leading-6 ${
                  m.from === "vitima"
                    ? "border-border bg-secondary text-foreground"
                    : "border-destructive/50 bg-destructive/10 text-bone text-glitch"
                }`}
              >
                <p>{m.text}</p>
                <p className="mt-0.5 text-right text-xs text-muted-foreground">
                  {m.time}
                  {m.from === "vitima" &&
                    ` · ${
                      m.status === "não entregue"
                        ? m.status
                        : creepyStatus[(i + tick) % creepyStatus.length]
                    }`}
                </p>
              </div>
            </div>
          ))}
          {tick % 3 === 0 && (
            <p className="text-sm text-muted-foreground">██████ está digitando…</p>
          )}
        </div>
        <div className="shrink-0 border-t border-border bg-background px-3 py-2 text-sm text-muted-foreground">
          canal criptografado — envio de mensagens bloqueado pelo sistema
        </div>
      </div>
    </div>
  );
}
