import { useState } from "react";
import { pins as initialPins, links as baseLinks, type Pin } from "./data";

export function CorkboardApp() {
  const [pins, setPins] = useState<Pin[]>(initialPins);
  const [drag, setDrag] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [extra, setExtra] = useState<[string, string][]>([]);

  const all = [...baseLinks, ...extra];

  return (
    <div
      className="vignette relative h-full w-full overflow-hidden bg-[#131110] [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0_2px,transparent_2px_5px)]"
      onMouseMove={(e) => {
        if (!drag) return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        setPins((p) =>
          p.map((pin) =>
            pin.id === drag
              ? { ...pin, x: Math.min(88, Math.max(0, x)), y: Math.min(85, Math.max(0, y)) }
              : pin,
          ),
        );
      }}
      onMouseUp={() => setDrag(null)}
      onMouseLeave={() => setDrag(null)}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {all.map(([a, b], i) => {
          const pa = pins.find((p) => p.id === a);
          const pb = pins.find((p) => p.id === b);
          if (!pa || !pb) return null;
          return (
            <line
              key={i}
              x1={`${pa.x + 5}%`}
              y1={`${pa.y + 5}%`}
              x2={`${pb.x + 5}%`}
              y2={`${pb.y + 5}%`}
              stroke="var(--blood)"
              strokeWidth={1.5}
              opacity={0.8}
            />
          );
        })}
      </svg>

      {pins.map((pin) => (
        <div
          key={pin.id}
          onMouseDown={() => setDrag(pin.id)}
          onClick={() => {
            if (!selected) return setSelected(pin.id);
            if (selected === pin.id) return setSelected(null);
            setExtra((e) => [...e, [selected, pin.id]]);
            setSelected(null);
          }}
          className={`absolute w-36 cursor-grab select-none border bg-card/90 p-2 shadow-[0_6px_18px_rgba(0,0,0,0.8)] active:cursor-grabbing ${
            selected === pin.id ? "border-sick" : "border-border"
          }`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%`, rotate: `${(pin.x % 7) - 3}deg` }}
        >
          <div className="mx-auto mb-1 h-2 w-2 rounded-full bg-blood" />
          <p className="text-sm uppercase text-bone">{pin.label}</p>
          <p className="text-xs text-muted-foreground">{pin.note}</p>
          <p className="mt-1 text-xs text-rust">[{pin.kind}]</p>
        </div>
      ))}

      <p className="absolute bottom-2 left-2 z-10 text-sm text-muted-foreground">
        arraste os cartões · clique em dois cartões para ligar com linha vermelha
        {selected && <span className="text-sick"> · selecionado, escolha o segundo</span>}
      </p>
    </div>
  );
}
