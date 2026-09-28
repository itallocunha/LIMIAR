import { useEffect, useState } from "react";
import { Image, FileText, AudioLines, Play, Pause } from "lucide-react";
import { evidence } from "./data";

function Waveform({ playing }: { playing: boolean }) {
  const [seed, setSeed] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const i = setInterval(() => setSeed((s) => s + 1), 120);
    return () => clearInterval(i);
  }, [playing]);

  return (
    <div className="flex h-16 items-end gap-0.5 border border-border bg-background p-1">
      {Array.from({ length: 90 }).map((_, i) => {
        const h = playing
          ? 10 + ((Math.sin(i * 0.7 + seed * 0.9) + 1) / 2) * 85 * (i % 13 === 0 ? 0.2 : 1)
          : 8 + ((i * 37) % 30);
        return (
          <div
            key={i}
            className={playing ? "flex-1 bg-sick/70" : "flex-1 bg-muted-foreground/40"}
            style={{ height: `${h}%` }}
          />
        );
      })}
    </div>
  );
}

export function EvidenceApp() {
  const [sel, setSel] = useState(evidence[0].id);
  const [playing, setPlaying] = useState(false);
  const item = evidence.find((e) => e.id === sel)!;

  return (
    <div className="flex h-full min-h-0">
      <ul className="w-56 shrink-0 overflow-y-auto border-r border-border bg-background/60">
        {evidence.map((e) => (
          <li key={e.id}>
            <button
              onClick={() => {
                setSel(e.id);
                setPlaying(false);
              }}
              className={`flex w-full items-center gap-2 border-b border-border px-2 py-2 text-left hover:bg-secondary ${
                e.id === sel ? "bg-secondary" : ""
              }`}
            >
              {e.type === "foto" ? (
                <Image size={12} className="text-rust" />
              ) : e.type === "audio" ? (
                <AudioLines size={12} className="text-sick" />
              ) : (
                <FileText size={12} className="text-muted-foreground" />
              )}
              <span className="truncate text-sm text-bone">{e.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="min-w-0 flex-1 overflow-y-auto p-4">
        <h3 className="text-xl uppercase text-bone">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.meta}</p>

        {item.type !== "audio" && (
          <div className="vignette noise relative mt-4 h-48 overflow-hidden border border-border bg-gradient-to-br from-[#0b0b0c] via-[#161513] to-[#080808]">
            <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(115deg,transparent_0_6px,rgba(255,255,255,0.05)_6px_7px)]" />
            <p className="absolute bottom-2 left-2 text-sm text-rust text-glitch">
              {item.type === "documento"
                ? "██████ CENSURADO ██████ CENSURADO ██████"
                : "IMAGEM DEGRADADA — 61% DE PERDA"}
            </p>
          </div>
        )}

        {item.type === "audio" && (
          <div className="mt-4 space-y-2">
            <Waveform playing={playing} />
            <button
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-2 border border-sick/60 px-3 py-1 text-sm text-sick hover:bg-sick/10"
            >
              {playing ? <Pause size={12} /> : <Play size={12} />}
              {playing ? "interromper reprodução" : "reproduzir gravação"}
            </button>
            {playing && (
              <p className="text-sm text-destructive text-glitch">
                atenção: a faixa contém 41s a mais do que o registrado.
              </p>
            )}
          </div>
        )}

        <div className="mt-4 space-y-1 text-lg leading-6">
          {item.desc.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
