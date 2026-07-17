import { useEffect, useRef } from 'react';
import { MapPin, Star, Phone, Mail, Clock } from 'lucide-react';
import { FacebookIcon, InstagramIcon, WhatsAppGlyph } from './Corsi';

const WHATSAPP_NUMBER = '393200378643';
const MAPS_URL =
  'https://www.google.com/maps/place/Igea+Club/@40.8527988,14.3508411,19z/data=!4m14!1m7!3m6!1s0x133ba622ea0f5471:0xde95141c824f7bb!2sIgea+Club!8m2!3d40.8501835!4d14.3534236!16s%2Fg%2F1hc77cq2t!3m5!1s0x133ba622ea0f5471:0xde95141c824f7bb!8m2!3d40.8501835!4d14.3534236!16s%2Fg%2F1hc77cq2t?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D';
const MAPS_EMBED =
  'https://maps.google.com/maps?q=Igea%20Club%2C%20Viale%20delle%20Rose%203%2C%20Cercola&t=&z=15&ie=UTF8&iwloc=&output=embed';

const ANTON = { fontFamily: "'Anton', sans-serif" } as const;
const HAIRLINE = '1px solid rgba(255,255,255,0.08)';
const MUTED = 'rgba(255,255,255,0.62)';
const FAINT = 'rgba(255,255,255,0.38)';
const GOLD = '#D9B36A';

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
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Ciao! Vorrei informazioni su Igea Club. Grazie!')}`,
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

export default function Contatti({
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

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 overflow-y-auto"
      style={{
        zIndex: 110,
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

      <div className="px-5 sm:px-12 pb-20 max-w-6xl mx-auto">
        {/* Intro */}
        <div className="mt-14 mb-12">
          <p className="uppercase mb-4" style={{ color: FAINT, fontSize: 11, letterSpacing: '0.34em' }}>
            Parla con noi
          </p>
          <h2 className="uppercase mb-6" style={{ ...ANTON, fontSize: 'clamp(44px, 8vw, 96px)', lineHeight: 0.98 }}>
            Contatti
          </h2>
          <p className="text-sm sm:text-base" style={{ color: MUTED, maxWidth: 560, lineHeight: 1.7 }}>
            Siamo a Cercola, alle porte di Napoli, dal 1978. Chiamaci, scrivici o
            vieni a trovarci: il nostro staff è a disposizione per orari,
            programmi e visite alla struttura.
          </p>
        </div>

        {/* Schede contatto */}
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
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              >
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

        {/* Dove siamo: mappa + info */}
        <div className="mt-20">
          <div className="mb-10">
            <p className="uppercase mb-3" style={{ color: FAINT, fontSize: 11, letterSpacing: '0.34em' }}>
              La struttura
            </p>
            <h2 className="uppercase" style={{ ...ANTON, fontSize: 'clamp(34px, 5.5vw, 68px)', lineHeight: 1 }}>
              Dove siamo
            </h2>
            <div className="mt-6" style={{ borderTop: HAIRLINE }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <iframe
                title="Mappa Igea Club — Viale delle Rose 3, Cercola (NA)"
                src={MAPS_EMBED}
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: 14, display: 'block' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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

        {/* Social */}
        <div
          className="mt-14 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          style={{ borderTop: HAIRLINE }}
        >
          <p className="uppercase" style={{ color: FAINT, fontSize: 11, letterSpacing: '0.28em' }}>
            Seguici · Igea Club · Enjoy your wellness
          </p>
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

        {/* Trasparenza aiuti di Stato (art. 52 L. 234/2012) */}
        <p className="mt-12 text-xs" style={{ color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
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
