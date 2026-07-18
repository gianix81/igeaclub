import { useEffect, useRef } from 'react';
import { FacebookIcon, InstagramIcon, GhostButton } from './Corsi';

const IG_PROFILE = 'https://www.instagram.com/igeaclub/';
const FB_PAGE = 'https://www.facebook.com/igea.club/';

const IG_POSTS = [
  'https://www.instagram.com/p/Da2WAHriPcn/',
  'https://www.instagram.com/p/Dae_PexiOdC/',
  'https://www.instagram.com/p/DZ-KGJJCZq0/',
  'https://www.instagram.com/p/DYgzPZXCB3b/',
  'https://www.instagram.com/p/DYOyybFnXjX/',
  'https://www.instagram.com/p/DXtQ7gqiGvS/',
];

const ANTON = { fontFamily: "'Anton', sans-serif" } as const;
const HAIRLINE = '1px solid rgba(255,255,255,0.08)';
const MUTED = 'rgba(255,255,255,0.62)';
const FAINT = 'rgba(255,255,255,0.38)';

declare global {
  interface Window {
    FB?: { XFBML: { parse: (element?: HTMLElement) => void } };
  }
}

function loadScriptOnce(id: string, src: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.src = src;
  s.async = true;
  document.body.appendChild(s);
}

export default function SocialFeed({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      // il focus non deve restare dentro la pagina resa inert
      if (rootRef.current?.contains(document.activeElement)) {
        (document.activeElement as HTMLElement | null)?.blur();
      }
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // SDK Facebook: caricato una sola volta, poi si processa il Page Plugin
  // (Instagram usa iframe diretti /embed/, nessuno script necessario)
  useEffect(() => {
    if (!open) return;
    loadScriptOnce('fb-sdk-js', 'https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v21.0');
    const timer = window.setInterval(() => {
      if (window.FB) {
        window.FB.XFBML.parse(rootRef.current ?? undefined);
        window.clearInterval(timer);
      }
    }, 700);
    return () => window.clearInterval(timer);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 overflow-y-auto"
      style={{
        zIndex: 105,
        backgroundColor: '#0B0D10',
        color: '#ffffff',
        fontFamily: "'Inter', sans-serif",
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        opacity: open ? 1 : 0,
        transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms',
        pointerEvents: open ? 'auto' : 'none',
      }}
      inert={!open}
    >
      <div id="fb-root" />

      {/* Header */}
      <div
        className="sticky top-0 flex items-center justify-between px-5 sm:px-12 py-5"
        style={{
          backgroundColor: 'rgba(11,13,16,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: HAIRLINE,
          zIndex: 10,
        }}
      >
        <button
          type="button"
          aria-label="Torna alla home"
          onClick={onClose}
          className="cursor-pointer"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <img
            src="/igea-logo.png"
            alt="Igea Club — torna alla home"
            className="w-24 sm:w-28 select-none"
            style={{ filter: 'brightness(0) invert(1)' }}
            draggable={false}
          />
        </button>
        <a
          href="tel:+390817333174"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold"
          style={{
            border: '1px solid rgba(255,255,255,0.45)',
            color: '#ffffff',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            transition: 'background-color 200ms, color 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#0B0D10';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          081 733 3174
        </a>
      </div>

      <section id="social" className="px-5 sm:px-12 pb-20 max-w-6xl mx-auto">
        {/* Intro */}
        <div className="mt-14 mb-12">
          <p className="uppercase mb-4" style={{ color: FAINT, fontSize: 11, letterSpacing: '0.34em' }}>
            Social · @igeaclub
          </p>
          <h2 className="uppercase mb-6" style={{ ...ANTON, fontSize: 'clamp(40px, 7vw, 88px)', lineHeight: 0.98 }}>
            Le nostre pubblicazioni
          </h2>
          <p className="text-sm sm:text-base" style={{ color: MUTED, maxWidth: 560, lineHeight: 1.7 }}>
            Gli ultimi contenuti ufficiali di Igea Club: allenamenti, eventi e vita
            del centro, direttamente dai nostri canali Instagram e Facebook.
          </p>
        </div>

        {/* Instagram */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <InstagramIcon size={16} />
            </span>
            <h3 className="uppercase" style={{ ...ANTON, fontSize: 24, letterSpacing: '0.03em' }}>
              Instagram
            </h3>
          </div>
          <GhostButton href={IG_PROFILE}>
            <InstagramIcon size={14} />
            Seguici su Instagram
          </GhostButton>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IG_POSTS.map((url) => (
            <div
              key={url}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: HAIRLINE,
                backgroundColor: '#101318',
              }}
            >
              <iframe
                title={`Post Instagram di @igeaclub — ${url}`}
                src={`${url}embed/`}
                loading="lazy"
                scrolling="no"
                allowFullScreen
                style={{
                  display: 'block',
                  width: '100%',
                  height: 460,
                  border: 0,
                  background: '#FFFFFF',
                }}
              />
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="block px-4 py-3 text-xs uppercase text-center"
                style={{ color: MUTED, textDecoration: 'none', letterSpacing: '0.12em', borderTop: HAIRLINE }}
              >
                Apri il post su Instagram
              </a>
            </div>
          ))}
        </div>

        {/* Facebook */}
        <div className="mt-16 mb-6 flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <FacebookIcon size={16} />
          </span>
          <h3 className="uppercase" style={{ ...ANTON, fontSize: 24, letterSpacing: '0.03em' }}>
            Facebook
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Fallback grafico sempre visibile (il feed FB spesso non appare ai non loggati) */}
          <div
            className="flex flex-col justify-between p-8"
            style={{ backgroundColor: '#101318', border: HAIRLINE, borderRadius: 14 }}
          >
            <div>
              <img
                src="/igea-logo.png"
                alt="Igea Club"
                className="w-28 mb-6 select-none"
                style={{ filter: 'brightness(0) invert(1)' }}
                draggable={false}
              />
              <p className="uppercase mb-2" style={{ color: FAINT, fontSize: 10, letterSpacing: '0.28em' }}>
                Pagina ufficiale
              </p>
              <p className="mb-3" style={{ ...ANTON, fontSize: 22, letterSpacing: '0.02em' }}>
                IGEA CLUB
              </p>
              <p className="text-sm mb-8" style={{ color: MUTED, lineHeight: 1.65 }}>
                Novità, orari, eventi e promozioni del centro: tutto passa prima
                dalla nostra Pagina Facebook. Seguila per restare aggiornato.
              </p>
            </div>
            <div>
              <GhostButton href={FB_PAGE}>
                <FacebookIcon size={14} />
                Segui la Pagina
              </GhostButton>
            </div>
          </div>
          {/* Page Plugin (visibile quando Meta lo consente) */}
          <div
            className="p-4"
            style={{ backgroundColor: '#101318', border: HAIRLINE, borderRadius: 14, minHeight: 300 }}
          >
            <div style={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
              <div
                className="fb-page"
                style={{ width: '100%', display: 'block' }}
                data-href={FB_PAGE}
                data-tabs="timeline"
                data-width="500"
                data-height="560"
                data-small-header="true"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="false"
              >
                <blockquote cite={FB_PAGE} className="fb-xfbml-parse-ignore">
                  <a href={FB_PAGE} target="_blank" rel="noreferrer" style={{ color: MUTED }}>
                    Igea Club su Facebook
                  </a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
