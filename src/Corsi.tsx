import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Star, Phone, Mail, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FIGURES } from './IgeaHero';
import NavMenu, { type NavKey } from './NavMenu';

type ScrollTarget = {
  sec: 'corsi' | 'spazi' | 'centro' | 'dove' | 'social' | 'contatti';
  n: number;
} | null;

const IG_PROFILE = 'https://www.instagram.com/igeaclub/';
const FB_PAGE = 'https://www.facebook.com/igea.club/';

// Anteprime salvate in locale (public/social/): niente script né iframe di Meta,
// console pulita e nessuna URL firmata che scade. Il click apre il post reale.
const IG_POSTS = [
  { url: 'https://www.instagram.com/p/Da2WAHriPcn/', img: '/social/post-1.jpg' },
  { url: 'https://www.instagram.com/p/Dae_PexiOdC/', img: '/social/post-2.jpg' },
  { url: 'https://www.instagram.com/p/DZ-KGJJCZq0/', img: '/social/post-3.jpg' },
  { url: 'https://www.instagram.com/p/DYgzPZXCB3b/', img: '/social/post-4.jpg' },
  { url: 'https://www.instagram.com/p/DYOyybFnXjX/', img: '/social/post-5.jpg' },
  { url: 'https://www.instagram.com/p/DXtQ7gqiGvS/', img: '/social/post-6.jpg' },
];

const WHATSAPP_NUMBER = '393200378643';
const MAPS_URL =
  'https://www.google.com/maps/place/Igea+Club/@40.8527988,14.3508411,19z/data=!4m14!1m7!3m6!1s0x133ba622ea0f5471:0xde95141c824f7bb!2sIgea+Club!8m2!3d40.8501835!4d14.3534236!16s%2Fg%2F1hc77cq2t!3m5!1s0x133ba622ea0f5471:0xde95141c824f7bb!8m2!3d40.8501835!4d14.3534236!16s%2Fg%2F1hc77cq2t?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D';

const CENTRO_PHOTOS = Array.from({ length: 18 }, (_, i) => ({
  src: `/centro/igea-${i + 1}.webp`,
  alt: `Igea Club — il centro sportivo (foto ${i + 1})`,
}));

const ANTON = { fontFamily: "'Anton', sans-serif" } as const;
const HAIRLINE = '1px solid rgba(255,255,255,0.08)';
const MUTED = 'rgba(255,255,255,0.62)';
const FAINT = 'rgba(255,255,255,0.38)';
const GOLD = '#D9B36A';

function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const CONTACT_CARDS = [
  {
    label: 'Telefono',
    value: '081 733 3174',
    note: 'Segreteria del centro',
    href: 'tel:+390817333174',
    icon: <Phone size={18} strokeWidth={1.75} />,
  },
  {
    label: 'WhatsApp',
    value: '+39 320 037 8643',
    note: 'Scrivici, rispondiamo subito',
    href: whatsappLink('Ciao! Vorrei informazioni su Igea Club. Grazie!'),
    icon: (
      <span style={{ color: '#25D366', display: 'inline-flex' }}>
        <WhatsAppGlyph size={18} />
      </span>
    ),
    external: true,
  },
  {
    label: 'Email',
    value: 'info@igeaclub.it',
    note: 'Per informazioni e iscrizioni',
    href: 'mailto:info@igeaclub.it',
    icon: <Mail size={18} strokeWidth={1.75} />,
  },
  {
    label: 'Dove siamo',
    value: 'Viale delle Rose 3',
    note: '80040 Cercola (NA)',
    href: MAPS_URL,
    icon: <MapPin size={18} strokeWidth={1.75} />,
    external: true,
  },
];

const CORSI = FIGURES.filter((f) => !f.spazio);
const SPAZI = FIGURES.filter((f) => f.spazio);

export function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function WhatsAppGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.241-.579-.486-.5-.668-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.148.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.57-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* Bottone ghost: bordo sottile, riempimento bianco su hover */
export function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase"
      style={{
        border: '1px solid rgba(255,255,255,0.28)',
        color: '#fff',
        textDecoration: 'none',
        letterSpacing: '0.14em',
        transition: 'background-color 200ms, color 200ms, border-color 200ms',
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
      {children}
    </a>
  );
}

function SectionHeading({ overline, title }: { overline: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="uppercase mb-3" style={{ color: FAINT, fontSize: 11, letterSpacing: '0.34em' }}>
        {overline}
      </p>
      <h2 className="uppercase" style={{ ...ANTON, fontSize: 'clamp(34px, 5.5vw, 68px)', lineHeight: 1 }}>
        {title}
      </h2>
      <div className="mt-6" style={{ borderTop: HAIRLINE }} />
    </div>
  );
}

function CourseCard({
  figure,
  index,
  cta,
  waText,
}: {
  figure: (typeof FIGURES)[number];
  index: number;
  cta: string;
  waText: string;
}) {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ backgroundColor: '#101318', border: HAIRLINE, borderRadius: 14 }}
    >
      <div className="relative flex items-end justify-center" style={{ height: 235, overflow: 'hidden' }}>
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 75% 60% at 50% 100%, ${figure.bg}30 0%, transparent 70%)` }}
        />
        <div
          className="absolute inset-x-0 top-0 flex justify-end px-5 pt-4"
          style={{ ...ANTON, fontSize: 15, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <img
          src={figure.src}
          alt={figure.discipline}
          loading="lazy"
          draggable={false}
          className="relative"
          style={{ height: '86%', objectFit: 'contain', filter: 'drop-shadow(0 22px 28px rgba(0,0,0,0.5))' }}
        />
      </div>
      <div className="px-6 pt-5 pb-6 flex flex-col grow" style={{ borderTop: HAIRLINE }}>
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block rounded-full" style={{ width: 6, height: 6, backgroundColor: figure.bg }} />
          <h3 className="uppercase" style={{ ...ANTON, fontSize: 21, lineHeight: 1, letterSpacing: '0.03em' }}>
            {figure.discipline}
          </h3>
        </div>
        <p className="text-sm mb-6 grow" style={{ color: MUTED, lineHeight: 1.65 }}>
          {figure.description}
        </p>
        <GhostButton href={whatsappLink(waText)}>
          <span style={{ color: '#25D366', display: 'inline-flex' }}>
            <WhatsAppGlyph />
          </span>
          {cta}
        </GhostButton>
      </div>
    </div>
  );
}

/* Lightbox a schermo intero con slider touch (swipe), frecce e tastiera */
function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const n = photos.length;
  const prev = useCallback(() => onIndex((index - 1 + n) % n), [index, n, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % n), [index, n, onIndex]);

  // swipe / drag
  const [drag, setDrag] = useState(0);
  const startX = useRef<number | null>(null);
  const width = useRef(1);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    },
    [onClose, prev, next]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onKey]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    width.current = e.currentTarget.clientWidth || 1;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    setDrag(e.clientX - startX.current);
  };
  const endDrag = () => {
    if (startX.current === null) return;
    const threshold = Math.min(90, width.current * 0.18);
    if (drag <= -threshold) next();
    else if (drag >= threshold) prev();
    startX.current = null;
    setDrag(0);
  };

  return createPortal(
    <div
      className="fixed inset-0 flex flex-col"
      style={{ zIndex: 200, backgroundColor: 'rgba(5,6,8,0.96)', backdropFilter: 'blur(6px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Galleria foto del centro"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 sm:px-8 py-4" style={{ color: '#fff' }}>
        <span className="text-xs sm:text-sm tabular-nums" style={{ color: MUTED, letterSpacing: '0.1em' }}>
          {index + 1} / {n}
        </span>
        <button
          type="button"
          aria-label="Chiudi galleria"
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          style={{ border: HAIRLINE, color: '#fff', background: 'rgba(255,255,255,0.04)' }}
        >
          <X size={20} strokeWidth={1.75} />
        </button>
      </div>

      {/* Slider */}
      <div
        className="relative flex-1 overflow-hidden select-none"
        style={{ touchAction: 'pan-y', cursor: 'grab' }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(calc(${-index * 100}% + ${drag}px))`,
            transition: startX.current === null ? 'transform 320ms cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        >
          {photos.map((p, i) => (
            <div key={p.src} className="shrink-0 w-full h-full flex items-center justify-center px-4 sm:px-16">
              <img
                src={p.src}
                alt={p.alt}
                draggable={false}
                loading={Math.abs(i - index) <= 1 ? 'eager' : 'lazy'}
                className="max-w-full"
                style={{ maxHeight: '82vh', objectFit: 'contain', borderRadius: 10 }}
              />
            </div>
          ))}
        </div>

        {/* Arrows (desktop) */}
        <button
          type="button"
          aria-label="Foto precedente"
          onClick={prev}
          className="hidden sm:flex absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center cursor-pointer"
          style={{ border: HAIRLINE, color: '#fff', background: 'rgba(0,0,0,0.35)' }}
        >
          <ChevronLeft size={24} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Foto successiva"
          onClick={next}
          className="hidden sm:flex absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center cursor-pointer"
          style={{ border: HAIRLINE, color: '#fff', background: 'rgba(0,0,0,0.35)' }}
        >
          <ChevronRight size={24} strokeWidth={1.75} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap px-5 py-5" onClick={(e) => e.stopPropagation()}>
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            aria-label={`Vai alla foto ${i + 1}`}
            onClick={() => onIndex(i)}
            className="rounded-full cursor-pointer"
            style={{
              width: i === index ? 20 : 7,
              height: 7,
              backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.3)',
              transition: 'width 200ms, background-color 200ms',
            }}
          />
        ))}
      </div>
    </div>,
    document.body
  );
}

export default function Corsi({
  open,
  onClose,
  onNavigate,
  scrollTarget,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate?: (key: NavKey) => void;
  scrollTarget?: ScrollTarget;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Scroll alla sezione richiesta dall'hamburger menu (dopo l'apertura dell'overlay).
  useEffect(() => {
    if (!open || !scrollTarget) return;
    const id = window.setTimeout(() => {
      document
        .getElementById(`sec-${scrollTarget.sec}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => window.clearTimeout(id);
  }, [open, scrollTarget]);

  useEffect(() => {
    if (!open) {
      // il focus non deve restare dentro la pagina resa inert
      if (rootRef.current?.contains(document.activeElement)) {
        (document.activeElement as HTMLElement | null)?.blur();
      }
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      // con il lightbox aperto, Esc chiude solo la galleria (gestita nel Lightbox)
      if (e.key === 'Escape' && lightbox === null) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, lightbox]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 overflow-y-auto"
      style={{
        zIndex: 100,
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
        <div className="flex items-center gap-2.5">
          <a
            href="tel:+390817333174"
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold"
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
          {onNavigate && <NavMenu onNavigate={onNavigate} />}
        </div>
      </div>

      <div className="px-5 sm:px-12 pb-20 max-w-6xl mx-auto">
        {/* Intro */}
        <div id="sec-corsi" className="mt-14 mb-16" style={{ scrollMarginTop: 90 }}>
          <p className="uppercase mb-4" style={{ color: FAINT, fontSize: 11, letterSpacing: '0.34em' }}>
            Igea Club · Napoli · Dal 1978
          </p>
          <h2 className="uppercase mb-6" style={{ ...ANTON, fontSize: 'clamp(44px, 8vw, 96px)', lineHeight: 0.98 }}>
            I nostri corsi
          </h2>
          <p className="text-sm sm:text-base" style={{ color: MUTED, maxWidth: 560, lineHeight: 1.7 }}>
            Quarant&apos;anni di professionalità, un&apos;assistenza a 360°. Scegli la tua
            disciplina e parla direttamente con il nostro staff: orari, programmi
            e una prova in struttura.
          </p>
        </div>

        {/* Corsi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORSI.map((figure, i) => (
            <CourseCard
              key={figure.src}
              figure={figure}
              index={i}
              cta="Richiedi info"
              waText={`Ciao! Vorrei informazioni sul corso di ${figure.discipline}. Grazie!`}
            />
          ))}
        </div>

        {/* Spazi */}
        <div id="sec-spazi" className="mt-24" style={{ scrollMarginTop: 90 }}>
          <SectionHeading overline="Prenotazioni" title="Gli spazi" />
          <p className="text-sm sm:text-base -mt-4 mb-8" style={{ color: MUTED, maxWidth: 560, lineHeight: 1.7 }}>
            Piscina con giardino, padel e campi all&apos;aperto, riservabili da utenti e
            famiglie.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPAZI.map((figure, i) => (
              <CourseCard
                key={figure.src}
                figure={figure}
                index={i}
                cta="Prenota"
                waText={`Ciao! Vorrei informazioni per prenotare ${figure.prenotaLabel}. Grazie!`}
              />
            ))}
          </div>
        </div>

        {/* Il centro */}
        <div id="sec-centro" className="mt-24" style={{ scrollMarginTop: 90 }}>
          <SectionHeading overline="La struttura" title="Il centro" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {CENTRO_PHOTOS.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Apri ${photo.alt}`}
                className="group relative overflow-hidden cursor-pointer p-0"
                style={{ aspectRatio: '4 / 3', borderRadius: 10, border: HAIRLINE, background: 'none' }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 400ms cubic-bezier(0.4,0,0.2,1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Dove siamo */}
        <div id="sec-dove" className="mt-24" style={{ scrollMarginTop: 90 }}>
          <SectionHeading overline="La struttura" title="Dove siamo" />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 -mt-4">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="lg:col-span-3 relative block overflow-hidden group"
              style={{ borderRadius: 14, border: HAIRLINE }}
              aria-label="Apri la mappa di Igea Club su Google Maps"
            >
              <img
                src="/mappa-igea.webp"
                alt="Mappa — Igea Club, Viale delle Rose 3, Cercola (NA)"
                loading="lazy"
                className="w-full object-cover"
                style={{ height: 380, display: 'block', transition: 'transform 400ms' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <span
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase"
                style={{ backgroundColor: '#0B0D10', color: '#fff', letterSpacing: '0.14em' }}
              >
                <MapPin size={15} strokeWidth={1.75} />
                Apri in Google Maps
              </span>
              <span className="absolute bottom-1.5 right-2" style={{ color: 'rgba(0,0,0,0.55)', fontSize: 10 }}>
                © OpenStreetMap contributors
              </span>
            </a>
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="p-6 grow" style={{ backgroundColor: '#101318', border: HAIRLINE, borderRadius: 14 }}>
                <p className="uppercase mb-3" style={{ color: FAINT, fontSize: 10, letterSpacing: '0.28em' }}>
                  Indirizzo
                </p>
                <p className="mb-5" style={{ ...ANTON, fontSize: 21, lineHeight: 1.25 }}>
                  VIALE DELLE ROSE 3<br />80040 CERCOLA (NA)
                </p>
                <p className="text-sm mb-6" style={{ color: MUTED, lineHeight: 1.65 }}>
                  A pochi minuti da Napoli, con parcheggio e spazi all&apos;aperto:
                  piscina con giardino, due campi esterni, sale interne e area
                  ristoro.
                </p>
                <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
                  <Clock size={15} strokeWidth={1.75} />
                  Orari su richiesta: chiamaci o scrivici su WhatsApp
                </div>
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="p-6"
                style={{
                  backgroundColor: '#101318',
                  border: HAIRLINE,
                  borderRadius: 14,
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'border-color 200ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  {[1, 2, 3, 4].map((n) => (
                    <Star key={n} size={15} fill={GOLD} color={GOLD} />
                  ))}
                  <Star size={15} fill={GOLD} color={GOLD} style={{ clipPath: 'inset(0 55% 0 0)' }} />
                  <span className="ml-2" style={{ ...ANTON, fontSize: 17, letterSpacing: '0.04em' }}>
                    4,4 SU GOOGLE
                  </span>
                </div>
                <p className="text-sm" style={{ color: MUTED, lineHeight: 1.6 }}>
                  Oltre 200 recensioni dei nostri iscritti — leggile su Google Maps
                  e raggiungici con le indicazioni stradali.
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Seguici sui social */}
        <section id="sec-social" className="mt-24" style={{ scrollMarginTop: 90 }}>
          <SectionHeading overline="Social · @igeaclub" title="Seguici sui social" />
          <p className="text-sm sm:text-base -mt-4 mb-8" style={{ color: MUTED, maxWidth: 560, lineHeight: 1.7 }}>
            Gli ultimi contenuti ufficiali di Igea Club: allenamenti, eventi e vita
            del centro, direttamente dai nostri canali Instagram e Facebook.
          </p>

          {/* Instagram */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {IG_POSTS.map((post) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="relative block overflow-hidden group"
                style={{ borderRadius: 14, border: HAIRLINE, aspectRatio: '1 / 1' }}
                aria-label="Apri il post di @igeaclub su Instagram"
              >
                <img
                  src={post.img}
                  alt="Post Instagram di @igeaclub"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ display: 'block', transition: 'transform 400ms' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(11,13,16,0.75)', color: '#fff', backdropFilter: 'blur(4px)' }}
                >
                  <InstagramIcon size={16} />
                </span>
                <span
                  className="absolute inset-x-0 bottom-0 px-4 py-3 text-xs uppercase"
                  style={{
                    color: '#fff',
                    letterSpacing: '0.12em',
                    background: 'linear-gradient(transparent, rgba(11,13,16,0.85))',
                    paddingTop: 28,
                  }}
                >
                  @igeaclub
                </span>
              </a>
            ))}
          </div>

          {/* Facebook */}
          <div className="mt-16 mb-6 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              <FacebookIcon size={16} />
            </span>
            <h3 className="uppercase" style={{ ...ANTON, fontSize: 24, letterSpacing: '0.03em' }}>
              Facebook
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between p-8" style={{ backgroundColor: '#101318', border: HAIRLINE, borderRadius: 14 }}>
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
            <a
              href={FB_PAGE}
              target="_blank"
              rel="noreferrer"
              className="relative block overflow-hidden"
              style={{ borderRadius: 14, border: HAIRLINE, minHeight: 300 }}
              aria-label="Apri la Pagina Facebook di Igea Club"
            >
              <img
                src="/centro/igea-1.webp"
                alt="La community di Igea Club in sala cardio"
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ display: 'block', transition: 'transform 400ms' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <span
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase"
                style={{ backgroundColor: '#0B0D10', color: '#fff', letterSpacing: '0.14em' }}
              >
                <FacebookIcon size={14} />
                @igea.club
              </span>
            </a>
          </div>
        </section>

        {/* Contattaci */}
        <div id="sec-contatti" className="mt-24" style={{ scrollMarginTop: 90 }}>
          <SectionHeading overline="Parla con noi" title="Contattaci" />
          <p className="text-sm sm:text-base -mt-4 mb-8" style={{ color: MUTED, maxWidth: 560, lineHeight: 1.7 }}>
            Siamo a Cercola, alle porte di Napoli, dal 1978. Chiamaci, scrivici o
            vieni a trovarci: il nostro staff è a disposizione per orari,
            programmi e visite alla struttura.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_CARDS.map((card) => (
              <a
                key={card.label}
                href={card.href}
                {...(card.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="flex flex-col p-6"
                style={{
                  backgroundColor: '#101318',
                  border: HAIRLINE,
                  borderRadius: 14,
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'border-color 200ms, background-color 200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.backgroundColor = '#151922';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.backgroundColor = '#101318';
                }}
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                  {card.icon}
                </div>
                <p className="uppercase mb-2" style={{ color: FAINT, fontSize: 10, letterSpacing: '0.28em' }}>
                  {card.label}
                </p>
                <p className="mb-1" style={{ ...ANTON, fontSize: 19, letterSpacing: '0.02em' }}>
                  {card.value}
                </p>
                <p className="text-xs" style={{ color: MUTED }}>
                  {card.note}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8" style={{ borderTop: HAIRLINE }}>
          <p className="uppercase" style={{ color: FAINT, fontSize: 11, letterSpacing: '0.28em' }}>
            Igea Club · Enjoy your wellness · Napoli, dal 1978
          </p>
          <div className="flex items-center gap-3">
            {[
              { href: FB_PAGE, label: 'Facebook Igea Club', icon: <FacebookIcon /> },
              { href: IG_PROFILE, label: 'Instagram Igea Club', icon: <InstagramIcon /> },
              { href: MAPS_URL, label: 'Igea Club su Google Maps', icon: <MapPin size={18} strokeWidth={1.75} /> },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff',
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
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          photos={CENTRO_PHOTOS}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndex={setLightbox}
        />
      )}
    </div>
  );
}
