import { useEffect } from 'react';
import { X, MapPin, Star, Phone, Mail } from 'lucide-react';
import { FIGURES } from './IgeaHero';

const WHATSAPP_NUMBER = '393200378643';
const MAPS_URL =
  'https://www.google.com/maps/place/Igea+Club/@40.8527988,14.3508411,19z/data=!4m14!1m7!3m6!1s0x133ba622ea0f5471:0xde95141c824f7bb!2sIgea+Club!8m2!3d40.8501835!4d14.3534236!16s%2Fg%2F1hc77cq2t!3m5!1s0x133ba622ea0f5471:0xde95141c824f7bb!8m2!3d40.8501835!4d14.3534236!16s%2Fg%2F1hc77cq2t?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D';

const CENTRO_PHOTOS = [
  { src: '/centro/foto-1.jpg', alt: 'Sala cardio Igea Club' },
  { src: '/centro/foto-3.jpg', alt: 'Sala attrezzi Igea Club' },
  { src: '/centro/foto-2.jpg', alt: 'Piscina all’aperto Igea Club' },
  { src: '/centro/foto-5.jpg', alt: 'Palazzetto Igea Club' },
];

const ANTON = { fontFamily: "'Anton', sans-serif" } as const;
const HAIRLINE = '1px solid rgba(255,255,255,0.08)';
const MUTED = 'rgba(255,255,255,0.62)';
const FAINT = 'rgba(255,255,255,0.38)';
const GOLD = '#D9B36A';

function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

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

export default function Corsi({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <div
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
      aria-hidden={!open}
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
        <img
          src="/igea-logo.png"
          alt="Igea Club"
          className="w-24 sm:w-28 select-none"
          style={{ filter: 'brightness(0) invert(1)' }}
          draggable={false}
        />
        <button
          type="button"
          aria-label="Chiudi"
          onClick={onClose}
          className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            backgroundColor: 'transparent',
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
          <X size={20} strokeWidth={1.75} />
        </button>
      </div>

      <div className="px-5 sm:px-12 pb-20 max-w-6xl mx-auto">
        {/* Intro */}
        <div className="mt-14 mb-16">
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
        <div className="mt-24">
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
        <div className="mt-24">
          <SectionHeading overline="La struttura" title="Il centro" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {CENTRO_PHOTOS.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full object-cover"
                style={{ aspectRatio: '4 / 3', borderRadius: 10, border: HAIRLINE }}
              />
            ))}
          </div>
        </div>

        {/* Recensioni */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8"
          style={{ border: HAIRLINE, borderRadius: 14, textDecoration: 'none', color: '#fff', backgroundColor: '#101318' }}
        >
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              {[1, 2, 3, 4].map((n) => (
                <Star key={n} size={16} fill={GOLD} color={GOLD} />
              ))}
              <Star size={16} fill={GOLD} color={GOLD} style={{ clipPath: 'inset(0 55% 0 0)' }} />
              <span className="ml-3 text-lg" style={{ ...ANTON, letterSpacing: '0.04em' }}>
                4,4 SU GOOGLE
              </span>
            </div>
            <p className="text-sm" style={{ color: MUTED, lineHeight: 1.6 }}>
              Oltre 200 recensioni dei nostri iscritti. Leggile tutte e scopri dove siamo.
            </p>
          </div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.28)', letterSpacing: '0.14em' }}
          >
            <MapPin size={15} strokeWidth={1.75} />
            Recensioni e mappa
          </span>
        </a>

        {/* Contatti + social */}
        <div className="mt-14 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8" style={{ borderTop: HAIRLINE }}>
          <div className="flex flex-col gap-2.5 text-sm" style={{ color: MUTED }}>
            <a href="tel:+390817333174" className="inline-flex items-center gap-3" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Phone size={15} strokeWidth={1.75} /> +39 081 733 3174
            </a>
            <a href="mailto:info@igeaclub.it" className="inline-flex items-center gap-3" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Mail size={15} strokeWidth={1.75} /> info@igeaclub.it
            </a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3" style={{ color: 'inherit', textDecoration: 'none' }}>
              <MapPin size={15} strokeWidth={1.75} /> Viale delle Rose 3, Cercola (NA), 80040
            </a>
          </div>
          <div className="flex items-center gap-3">
            {[
              { href: 'https://www.facebook.com/igea.club/', label: 'Facebook Igea Club', icon: <FacebookIcon /> },
              { href: 'https://www.instagram.com/igeaclub/', label: 'Instagram Igea Club', icon: <InstagramIcon /> },
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

        <p className="mt-12 text-xs uppercase" style={{ color: FAINT, letterSpacing: '0.28em' }}>
          Igea Club · Enjoy your wellness · Napoli, dal 1978
        </p>

        {/* Trasparenza aiuti di Stato (art. 52 L. 234/2012) */}
        <p className="mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
          LA SOCIETA&apos; HA RICEVUTO BENEFICI RIENTRANTI NEL REGIME DEGLI AIUTI DI
          STATO E NEL REGIME DEI MINIMIS PER I QUALI SUSSISTE L&apos;OBBLIGO DI
          PUBBLICAZIONE NEL{' '}
          <a
            href="https://www.rna.gov.it/RegistroNazionaleTrasparenza/faces/pages/TrasparenzaAiuto.jspx"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}
          >
            REGISTRO NAZIONALE DEGLI AIUTI DI STATO
          </a>{' '}
          DI CUI ALL&apos;ARTICOLO 52 LEGGE 234/2012.
        </p>
      </div>
    </div>
  );
}
