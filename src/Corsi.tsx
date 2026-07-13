import { useEffect } from 'react';
import { X, MessageCircle, MapPin, Star, Phone, Mail } from 'lucide-react';
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

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const CORSI = FIGURES.filter((f) => !f.spazio);
const SPAZI = FIGURES.filter((f) => f.spazio);

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
        backgroundColor: '#14171C',
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
      <div className="sticky top-0 flex items-center justify-between px-4 sm:px-10 py-4"
        style={{ backgroundColor: 'rgba(20,23,28,0.92)', backdropFilter: 'blur(8px)', zIndex: 10 }}
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
          style={{ border: '2px solid rgba(255,255,255,0.7)', color: '#fff', backgroundColor: 'transparent' }}
        >
          <X size={22} strokeWidth={2.25} />
        </button>
      </div>

      <div className="px-4 sm:px-10 pb-16 max-w-6xl mx-auto">
        <h2
          className="uppercase mt-6 mb-2"
          style={{ ...ANTON, fontSize: 'clamp(40px, 7vw, 88px)', lineHeight: 1 }}
        >
          I nostri corsi
        </h2>
        <p className="mb-10 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 640 }}>
          Dal 1978 Igea Club è la casa dello sport a Napoli. Scegli il tuo corso e
          scrivici su WhatsApp: ti rispondiamo con orari, prezzi e prova gratuita.
        </p>

        {/* Corsi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CORSI.map((figure) => (
            <div
              key={figure.src}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: '#1C2129' }}
            >
              <div
                className="flex items-end justify-center"
                style={{ backgroundColor: figure.bg, height: 210 }}
              >
                <img
                  src={figure.src}
                  alt={figure.discipline}
                  loading="lazy"
                  draggable={false}
                  style={{ height: '92%', objectFit: 'contain' }}
                />
              </div>
              <div className="p-5 flex flex-col grow">
                <h3 className="uppercase mb-2" style={{ ...ANTON, fontSize: 26, lineHeight: 1 }}>
                  {figure.discipline}
                </h3>
                <p className="text-sm mb-4 grow" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>
                  {figure.description}
                </p>
                <a
                  href={whatsappLink(`Ciao! Vorrei informazioni sul corso di ${figure.discipline}. Grazie!`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
                  style={{ backgroundColor: '#25D366', color: '#0B1B10', textDecoration: 'none' }}
                >
                  <MessageCircle size={18} strokeWidth={2.25} />
                  Info su WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Gli spazi prenotabili */}
        <h2
          className="uppercase mt-16 mb-2"
          style={{ ...ANTON, fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1 }}
        >
          Gli spazi
        </h2>
        <p className="mb-6 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 640 }}>
          Non solo corsi: piscina, padel e calcetto sono aperti a utenti e famiglie.
          Scrivici per disponibilità e prenotazioni.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPAZI.map((figure) => (
            <div
              key={figure.src}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: '#1C2129' }}
            >
              <div
                className="flex items-end justify-center"
                style={{ backgroundColor: figure.bg, height: 210 }}
              >
                <img
                  src={figure.src}
                  alt={figure.discipline}
                  loading="lazy"
                  draggable={false}
                  style={{ height: '92%', objectFit: 'contain' }}
                />
              </div>
              <div className="p-5 flex flex-col grow">
                <h3 className="uppercase mb-2" style={{ ...ANTON, fontSize: 26, lineHeight: 1 }}>
                  {figure.discipline}
                </h3>
                <p className="text-sm mb-4 grow" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>
                  {figure.description}
                </p>
                <a
                  href={whatsappLink(`Ciao! Vorrei informazioni per prenotare ${figure.prenotaLabel}. Grazie!`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
                  style={{ backgroundColor: '#25D366', color: '#0B1B10', textDecoration: 'none' }}
                >
                  <MessageCircle size={18} strokeWidth={2.25} />
                  Prenota su WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Il centro — foto originali */}
        <h2
          className="uppercase mt-16 mb-2"
          style={{ ...ANTON, fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1 }}
        >
          Il centro
        </h2>
        <p className="mb-6 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Spazi aperti, piscina con giardino, sale attrezzi e palazzetto: un&apos;assistenza a 360°.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CENTRO_PHOTOS.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="rounded-xl w-full object-cover"
              style={{ aspectRatio: '4 / 3' }}
            />
          ))}
        </div>

        {/* Recensioni + mappa */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl p-6"
          style={{ backgroundColor: '#1C2129', textDecoration: 'none', color: '#fff' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              {[1, 2, 3, 4].map((n) => (
                <Star key={n} size={20} fill="#FBBF24" color="#FBBF24" />
              ))}
              <Star size={20} fill="#FBBF24" color="#FBBF24" style={{ clipPath: 'inset(0 55% 0 0)' }} />
              <span className="font-bold text-lg ml-1">4,4 su Google</span>
            </div>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Oltre 200 recensioni dei nostri iscritti. Leggile tutte e scopri dove siamo.
            </p>
          </div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shrink-0"
            style={{ backgroundColor: '#5C8FBF', color: '#fff' }}
          >
            <MapPin size={18} strokeWidth={2.25} />
            Recensioni e mappa
          </span>
        </a>

        {/* Contatti + social */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
            <a href="tel:+390817333174" className="inline-flex items-center gap-2" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Phone size={16} /> +39 081 733 3174
            </a>
            <a href="mailto:info@igeaclub.it" className="inline-flex items-center gap-2" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Mail size={16} /> info@igeaclub.it
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <MapPin size={16} /> Viale delle Rose 3, Cercola (NA), 80040
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/igea.club/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Igea Club"
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ border: '2px solid rgba(255,255,255,0.7)', color: '#fff' }}
            >
              <FacebookIcon size={20} />
            </a>
            <a
              href="https://www.instagram.com/igeaclub/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Igea Club"
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ border: '2px solid rgba(255,255,255,0.7)', color: '#fff' }}
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Igea Club su Google Maps"
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ border: '2px solid rgba(255,255,255,0.7)', color: '#fff' }}
            >
              <MapPin size={20} strokeWidth={2} />
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs uppercase" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em' }}>
          Igea Club · Enjoy your wellness · Napoli, dal 1978
        </p>
      </div>
    </div>
  );
}
