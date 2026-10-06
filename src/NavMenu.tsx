import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';

const ANTON = { fontFamily: "'Anton', sans-serif" } as const;

export type NavKey = 'home' | 'corsi' | 'spazi' | 'centro' | 'dove' | 'social' | 'contattaci';

const ITEMS: { key: NavKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'corsi', label: 'I corsi' },
  { key: 'spazi', label: 'Gli spazi' },
  { key: 'centro', label: 'Il centro' },
  { key: 'dove', label: 'Dove siamo' },
  { key: 'social', label: 'Seguici sui social' },
  { key: 'contattaci', label: 'Contattaci' },
];

/* Hamburger menu + pannello di navigazione a schermo intero (portale su body). */
export default function NavMenu({ onNavigate }: { onNavigate: (key: NavKey) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const go = (key: NavKey) => {
    setOpen(false);
    onNavigate(key);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Apri menu"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full cursor-pointer shrink-0"
        style={{
          width: 44,
          height: 44,
          border: '1px solid rgba(255,255,255,0.45)',
          color: '#ffffff',
          background: 'transparent',
          transition: 'background-color 200ms, color 200ms',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.color = '#1a1a1a';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#ffffff';
        }}
      >
        <Menu size={20} strokeWidth={2} />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 flex flex-col"
            style={{
              zIndex: 300,
              backgroundColor: 'rgba(8,9,11,0.98)',
              backdropFilter: 'blur(8px)',
              fontFamily: "'Inter', sans-serif",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
          >
            {/* Top bar */}
            <div className="shrink-0 flex items-center justify-between px-5 sm:px-12 py-4 sm:py-5">
              <img
                src="/igea-logo.png"
                alt="Igea Club"
                className="w-20 sm:w-28 select-none"
                style={{ filter: 'brightness(0) invert(1)' }}
                draggable={false}
              />
              <button
                type="button"
                aria-label="Chiudi menu"
                onClick={() => setOpen(false)}
                className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shrink-0"
                style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', background: 'rgba(255,255,255,0.04)' }}
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>

            {/* Links — scrollabili se non entrano, centrati quando c'è spazio */}
            <nav className="flex-1 overflow-y-auto px-6 sm:px-16">
              <div className="min-h-full flex flex-col justify-center gap-1 py-4">
                {ITEMS.map((it, i) => (
                  <button
                    key={it.key}
                    type="button"
                    onClick={() => go(it.key)}
                    className="group flex items-baseline gap-3 sm:gap-6 py-1 text-left cursor-pointer"
                    style={{ background: 'none', border: 'none' }}
                  >
                    <span
                      className="shrink-0"
                      style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, letterSpacing: '0.2em', minWidth: 28 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="uppercase"
                      style={{
                        ...ANTON,
                        color: '#fff',
                        // si adatta sia alla larghezza (vw) sia all'altezza (vh),
                        // così tutte le 7 voci restano leggibili e dentro lo schermo
                        fontSize: 'min(clamp(22px, 6vw, 56px), 8.5vh)',
                        lineHeight: 1.05,
                        letterSpacing: '0.01em',
                        transition: 'opacity 200ms',
                        wordBreak: 'break-word',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                      {it.label}
                    </span>
                  </button>
                ))}
              </div>
            </nav>

            <p
              className="shrink-0 px-6 sm:px-16 py-4 sm:py-5 text-[10px] sm:text-xs uppercase"
              style={{ color: 'rgba(255,255,255,0.38)', letterSpacing: '0.28em' }}
            >
              Igea Club · Enjoy your wellness · Napoli, dal 1978
            </p>
          </div>,
          document.body
        )}
    </>
  );
}
