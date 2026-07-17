import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type Figure = {
  src: string;
  discipline: string;
  description: string;
  bg: string;
  /** Zona prenotabile del centro (non un corso) + etichetta per il messaggio WhatsApp */
  spazio?: boolean;
  prenotaLabel?: string;
};

// Le attività del centro (www.igeaclub.it), una figura ciascuna.
export const FIGURES: Figure[] = [
  {
    src: '/figures/01-igea-body-building.png',
    discipline: 'BODY BUILDING',
    description:
      'Allenamento personalizzato con sovraccarichi per aumentare massa e tono muscolare e modellare il corpo secondo le tue esigenze.',
    bg: '#64809C',
  },
  {
    src: '/figures/02-igea-total-body.png',
    discipline: 'TOTAL BODY',
    description:
      'Allenamento completo mirato al dimagrimento e alla tonificazione: mix di esercizi a corpo libero, con piccoli pesi e attrezzi.',
    bg: '#CF9146',
  },
  {
    src: '/figures/03-igea-hiit.png',
    discipline: 'HIT',
    description:
      'Cardio fitness che alterna esercizi ad alta e bassa intensità, con un consumo calorico maggiore rispetto ad altri allenamenti.',
    bg: '#F4845F',
  },
  {
    src: '/figures/04-igea-pilates.png',
    discipline: 'PILATES',
    description:
      'Allenamento a scarico delle articolazioni con piccoli attrezzi: fluidità dei movimenti e forza in tutto il corpo, senza eccesso di massa muscolare.',
    bg: '#6FA895',
  },
  {
    src: '/figures/05-igea-aerobica.png',
    discipline: 'AEROBICA',
    description:
      'Attività musicale e coreografica che combina cardio e tonificazione. Migliora resistenza e coordinazione, tonifica soprattutto gambe e glutei.',
    bg: '#9C82C9',
  },
  {
    src: '/figures/06-igea-circuit-training.png',
    discipline: 'CIRCUIT TRAINING',
    description:
      'Circuiti ad alta intensità mirati al rafforzamento fisico: allenamento di forza, mobilità e lavoro articolare.',
    bg: '#BF6A54',
  },
  {
    src: '/figures/07-igea-fit-boxe.png',
    discipline: 'FIT BOXE',
    description:
      'Calci, ganci, parate, gomitate e pugni al sacco tipico della boxe, ma a ritmo di musica e coinvolgendo tutte le fasce muscolari.',
    bg: '#C4637E',
  },
  {
    src: '/figures/08-igea-difesa-personale.png',
    discipline: 'DIFESA PERSONALE',
    description: "Mix di tecniche di arti marziali volte all'autodifesa.",
    bg: '#829B6A',
  },
  {
    src: '/figures/09-igea-personal-trainer.png',
    discipline: 'PERSONAL TRAINER',
    description:
      'La figura professionale che si occupa del tuo allenamento personalizzato, per supportarti nel raggiungimento degli obiettivi prefissati.',
    bg: '#5C8FBF',
  },
  {
    src: '/figures/10-igea-kick-boxing.png',
    discipline: 'KICK BOXING',
    description:
      'Sport da combattimento che combina i calci delle arti marziali orientali ai colpi di pugno propri del pugilato.',
    bg: '#B5524E',
  },
  {
    src: '/figures/11-igea-indoor-cycling.png',
    discipline: 'INDOOR CYCLING',
    description:
      'Allenamento su bicicletta stazionaria ad alta intensità e consumo calorico, per migliorare lo sviluppo di forza e resistenza.',
    bg: '#4FA3A8',
  },
  {
    src: '/figures/12-igea-ginnastica-artistica.png',
    discipline: 'GINNASTICA ARTISTICA',
    description:
      'Elasticità, forza muscolare e coordinazione: esercizi a corpo libero e con attrezzi come trave e parallele.',
    bg: '#D98BB4',
  },
  {
    src: '/figures/13-igea-calcio.png',
    discipline: 'CALCIO',
    description:
      'Gioco di squadra per sviluppare e perfezionare gli schemi motori di base e posturali e la coordinazione.',
    bg: '#67A867',
  },
  {
    src: '/figures/14-igea-karate.png',
    discipline: 'KARATE',
    description:
      'Tecniche di pugno e di calcio in successioni di movimenti (kumite) ed esercizi prestabiliti (kata). Minimo contatto con l’avversario.',
    bg: '#7D8A99',
  },
  {
    src: '/figures/15-igea-judo.png',
    discipline: 'JUDO',
    description:
      'Si studiano i punti di squilibrio dell’avversario per farlo cadere al suolo: prese, lanci, ribaltamenti e immobilizzazioni.',
    bg: '#6D7BC4',
  },
  {
    src: '/figures/16-igea-psicomotricita.png',
    discipline: 'PSICOMOTRICITÀ',
    description:
      'Disciplina che mira all’armonia tra la componente psicologica e motoria.',
    bg: '#E0937C',
  },
  {
    src: '/figures/17-igea-padel.png',
    discipline: 'PADEL',
    description:
      'Campo da padel prenotabile per partite in coppia o in quattro, a tutti i livelli.',
    bg: '#8FAE5D',
    spazio: true,
    prenotaLabel: 'il campo da padel',
  },
  {
    src: '/figures/18-igea-piscina-nuoto.png',
    discipline: 'PISCINA & NUOTO',
    description:
      'Ampia piscina con giardino, aperta a utenti e famiglie: nuoto libero, relax e divertimento per tutte le età.',
    bg: '#56A4D9',
    spazio: true,
    prenotaLabel: 'la piscina',
  },
  {
    src: '/figures/19-igea-calcetto.png',
    discipline: 'CALCETTO',
    description:
      'Campi all’aperto per partite tra amici e tornei: prenota il tuo campo e scendi in campo con la tua squadra.',
    bg: '#5F9E80',
    spazio: true,
    prenotaLabel: 'il campo da calcetto',
  },
];

const N = FIGURES.length;
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DURATION = 650;

const GRAIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.08"/></svg>`;
const GRAIN_URI = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

export default function IgeaHero({
  frozen = false,
  onDiscover,
  onContacts,
}: {
  frozen?: boolean;
  onDiscover?: () => void;
  onContacts?: () => void;
}) {
  // si parte dal karate
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, FIGURES.findIndex((f) => f.discipline === 'KARATE')),
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    FIGURES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        direction === 'next' ? (prev + 1) % N : (prev + N - 1) % N,
      );
      window.setTimeout(() => setIsAnimating(false), DURATION);
    },
    [isAnimating],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (frozen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigate('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigate('prev');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate, frozen]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 10) return;
      navigate(delta > 0 ? 'next' : 'prev');
    },
    [navigate],
  );

  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current = null;
      const delta = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
      if (Math.abs(delta) < 50) return;
      // swipe verso sinistra/alto = avanti, verso destra/basso = indietro
      navigate(delta < 0 ? 'next' : 'prev');
    },
    [navigate],
  );

  // Anello completo: tutte le N figure sono visibili, distribuite sullo
  // schermo come un carosello 3D. Lo "slot" 0 è la figura in evidenza; gli
  // altri slot girano intorno (sin = posizione orizzontale, cos = profondità).
  const slotStyle = (index: number): React.CSSProperties => {
    const slot = (index - activeIndex + N) % N;

    if (slot === 0) {
      return {
        transform: `translateX(-50%) scale(${isMobile ? 1 : 0.84})`,
        filter: 'none',
        opacity: 1,
        zIndex: 30,
        left: '50%',
        height: isMobile ? '68%' : '92%',
        bottom: isMobile ? '14%' : '9%',
      };
    }

    const theta = (slot / N) * Math.PI * 2;
    const depth = (Math.cos(theta) + 1) / 2; // 1 = vicino al fronte, 0 = fondo
    // scatter deterministico per slot, per non far combaciare le figure sul fondo
    const jitterX = (((slot * 53) % 11) - 5) * 0.9;
    const jitterY = (((slot * 97) % 7) - 3) * 1.4;

    const left = 50 + 44 * Math.sin(theta) + jitterX;
    const height = isMobile ? 8 + 10 * depth : 12 + 17 * depth;
    const bottom = (isMobile ? 32 + 16 * (1 - depth) : 12 + 22 * (1 - depth)) + jitterY;
    const blur = 2 + 4 * (1 - depth);
    const opacity = 0.45 + 0.4 * depth;

    return {
      transform: 'translateX(-50%) scale(1)',
      filter: `blur(${blur.toFixed(1)}px)`,
      opacity,
      zIndex: 1 + Math.round(depth * 20),
      left: `${left.toFixed(1)}%`,
      height: `${height.toFixed(1)}%`,
      bottom: `${bottom.toFixed(1)}%`,
      pointerEvents: 'none',
    };
  };

  const arrowButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: '2px solid #ffffff',
    color: '#ffffff',
    transition: `transform 150ms ${EASE}, background-color 150ms ${EASE}`,
  };

  const handleButtonEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(1.08)';
    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
  };
  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: FIGURES[activeIndex].bg,
        transition: `background-color ${DURATION}ms ${EASE}`,
        fontFamily: "'Inter', sans-serif",
        touchAction: 'none',
      }}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="relative w-full hero-viewport" style={{ overflow: 'hidden' }}>
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: GRAIN_URI,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Giant ghost text — crossfades with the active figure */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: '18%' }}
        >
          {FIGURES.map((figure, index) => (
            <span
              key={figure.src}
              style={{
                position: index === 0 ? 'relative' : 'absolute',
                fontFamily: "'Anton', sans-serif",
                // dimensione adattata alla lunghezza del titolo, così i nomi
                // lunghi (es. GINNASTICA ARTISTICA) restano dentro lo schermo
                fontSize: `min(clamp(48px, ${Math.min(28, 190 / figure.discipline.length).toFixed(1)}vw, 380px), 34vh)`,
                fontWeight: 900,
                color: '#ffffff',
                opacity: index === activeIndex ? 1 : 0,
                transition: `opacity ${DURATION}ms ${EASE}`,
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              {figure.discipline}
            </span>
          ))}
        </div>

        {/* Logo */}
        <img
          src="/igea-logo.png"
          alt="Igea Club — Enjoy Your Wellness"
          draggable={false}
          className="absolute top-6 left-4 sm:left-8 w-28 sm:w-40 select-none"
          style={{ zIndex: 60, filter: 'brightness(0) invert(1)', opacity: 0.95 }}
        />

        {/* Contatti in alto a destra — la prima cosa */}
        <div
          className="absolute top-6 right-4 sm:right-8 flex flex-col items-end gap-2.5"
          style={{ zIndex: 60 }}
        >
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
                e.currentTarget.style.color = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              081 733 3174
            </a>
            <button
              type="button"
              onClick={() => onContacts?.()}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase cursor-pointer"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ffffff',
                color: '#1a1a1a',
                letterSpacing: '0.16em',
                transition: 'background-color 200ms, color 200ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#1a1a1a';
              }}
            >
              Contatti<span className="hidden sm:inline">&nbsp;&amp; Dove siamo</span>
            </button>
          </div>
          <a
            href="https://www.rna.gov.it/RegistroNazionaleTrasparenza/faces/pages/TrasparenzaAiuto.jspx"
            target="_blank"
            rel="noreferrer"
            className="uppercase"
            style={{ color: 'rgba(255,255,255,0.65)', fontSize: 9.5, letterSpacing: '0.08em', textDecoration: 'underline' }}
          >
            Trasparenza · Aiuti di Stato · art. 52 L. 234/2012
          </a>
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {FIGURES.map((figure, index) => {
            const style = slotStyle(index);
            return (
              <div
                key={figure.src}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  transformOrigin: 'bottom center',
                  transition: `transform ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, left ${DURATION}ms ${EASE}, bottom ${DURATION}ms ${EASE}, height ${DURATION}ms ${EASE}`,
                  willChange: 'transform, filter, opacity',
                  ...style,
                }}
              >
                <img
                  src={figure.src}
                  alt=""
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom-left text + nav */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 380 }}
        >
          <p
            className="hidden sm:block text-sm sm:text-lg mb-4 sm:mb-5"
            style={{ color: '#ffffff', opacity: 0.9, lineHeight: 1.55 }}
          >
            {FIGURES[activeIndex].description}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Precedente"
              onClick={() => navigate('prev')}
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer"
              style={arrowButtonStyle}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Successivo"
              onClick={() => navigate('next')}
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer"
              style={arrowButtonStyle}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Bottom-right link */}
        <a
          href="#corsi"
          onClick={(e) => {
            e.preventDefault();
            onDiscover?.();
          }}
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            color: '#ffffff',
            opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'opacity 200ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.95')}
        >
          SCOPRI I CORSI
          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}
