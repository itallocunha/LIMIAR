import { useState, type ReactNode } from "react";
import { Minus, X, Square } from "lucide-react";
import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  initial: { x: number; y: number; w: number; h: number };
};

export function Window({
  title,
  subtitle,
  children,
  onClose,
  onFocus,
  zIndex,
  initial,
}: Props) {
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null);

  const style = maximized
    ? { left: 8, top: 8, width: "calc(100% - 16px)", height: "calc(100% - 90px)", zIndex }
    : { left: pos.x, top: pos.y, width: initial.w, height: minimized ? 34 : initial.h, zIndex };

  return (
    <section
      aria-label={title}
      tabIndex={0}
      className="system-window absolute flex flex-col border border-border bg-card shadow-window"
      style={style}
      onMouseDown={onFocus}
      onMouseMove={(e) => {
        if (!drag) return;
        setPos({ x: Math.max(0, e.clientX - drag.dx), y: Math.max(0, e.clientY - drag.dy) });
      }}
      onMouseUp={() => setDrag(null)}
      onMouseLeave={() => setDrag(null)}
    >
      <header
        className="flex shrink-0 cursor-move select-none items-center gap-2 border-b border-border bg-secondary px-2 py-1"
        onMouseDown={(e) => setDrag({ dx: e.clientX - pos.x, dy: e.clientY - pos.y })}
      >
        <span className="text-sm uppercase tracking-widest text-bone">{title}</span>
        {subtitle && (
          <span className="truncate text-xs text-muted-foreground">/ {subtitle}</span>
        )}
        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon"
            aria-label="Minimizar"
            className="p-1 text-muted-foreground hover:text-bone"
            onClick={() => setMinimized((m) => !m)}
          >
            <Minus size={12} />
          </Button>
          <Button variant="ghost" size="icon"
            aria-label="Maximizar"
            className="p-1 text-muted-foreground hover:text-bone"
            onClick={() => setMaximized((m) => !m)}
          >
            <Square size={10} />
          </Button>
          <Button variant="ghost" size="icon"
            aria-label="Fechar"
            className="p-1 text-muted-foreground hover:text-destructive"
            onClick={onClose}
          >
            <X size={12} />
          </Button>
        </div>
      </header>
      {!minimized && <div className="min-h-0 flex-1 overflow-hidden">{children}</div>}
    </section>
  );
}
