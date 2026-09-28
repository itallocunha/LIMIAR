import { useState } from "react";
import { AlertTriangle, Paperclip, Mail } from "lucide-react";
import { emails } from "./data";

export function MailApp() {
  const [sel, setSel] = useState(emails[0].id);
  const current = emails.find((e) => e.id === sel)!;

  return (
    <div className="flex h-full min-h-0">
      <ul className="w-56 shrink-0 overflow-y-auto border-r border-border bg-background/60">
        {emails.map((e) => (
          <li key={e.id}>
            <button
              onClick={() => setSel(e.id)}
              className={`w-full border-b border-border px-2 py-2 text-left transition-colors hover:bg-secondary ${
                e.id === sel ? "bg-secondary" : ""
              }`}
            >
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Mail size={10} />
                <span className="truncate">{e.from}</span>
              </div>
              <div className="truncate text-sm text-bone">{e.subject}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{e.date}</span>
                {e.flag && (
                  <span
                    className={
                      e.flag === "ALERTA MÁXIMO"
                        ? "text-destructive"
                        : e.flag === "CORROMPIDO"
                          ? "text-rust text-glitch"
                          : "text-sick"
                    }
                  >
                    {e.flag}
                  </span>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>

      <article className="min-w-0 flex-1 overflow-y-auto p-4">
        <h3 className="text-xl uppercase text-bone">{current.subject}</h3>
        <p className="text-sm text-muted-foreground">
          de {current.from} — {current.date}
        </p>
        {current.flag === "ALERTA MÁXIMO" && (
          <p className="mt-3 flex items-center gap-2 border border-destructive/60 bg-destructive/10 px-2 py-1 text-sm text-destructive">
            <AlertTriangle size={14} /> ALERTA MÁXIMO — conteúdo não verificado pela central
          </p>
        )}
        <div className="mt-4 space-y-1 text-lg leading-6">
          {current.body.map((line, i) => (
            <p
              key={i}
              className={line.includes("█") ? "text-rust text-glitch" : "text-foreground"}
            >
              {line || "\u00a0"}
            </p>
          ))}
        </div>
        {current.attachment && (
          <p className="mt-6 inline-flex items-center gap-2 border border-border bg-background px-2 py-1 text-sm text-sick">
            <Paperclip size={12} /> {current.attachment}
          </p>
        )}
      </article>
    </div>
  );
}
