import { useEffect, useRef, useState } from 'react';
import IgeaHero from './IgeaHero';
import Corsi from './Corsi';
import type { NavKey } from './NavMenu';

export type PageTarget = {
  sec: 'corsi' | 'spazi' | 'centro' | 'dove' | 'social' | 'contatti';
  n: number;
};

export default function App() {
  // Un'unica pagina interna scrollabile (hero a parte): tutte le sezioni sono lì
  // e l'hamburger menu serve solo come anchor rapido.
  const [showPage, setShowPage] = useState(false);
  const [target, setTarget] = useState<PageTarget | null>(null);

  const pageRef = useRef(showPage);
  pageRef.current = showPage;

  // Ogni apertura aggiunge una voce nella cronologia, così il tasto "indietro"
  // del browser chiude la pagina interna e torna alla home invece di uscire dal sito.
  const openPage = () => {
    window.history.pushState({ igea: 'page' }, '');
    setShowPage(true);
  };
  const goBack = () => window.history.back();

  // Navigazione dall'hamburger menu: apre la pagina (se chiusa) e scrolla alla sezione.
  const navigate = (key: NavKey) => {
    if (key === 'home') {
      setShowPage(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const sec: PageTarget['sec'] = key === 'contattaci' ? 'contatti' : key;
    setTarget((prev) => ({ sec, n: (prev?.n ?? 0) + 1 }));
    if (!pageRef.current) openPage();
  };

  useEffect(() => {
    const onPop = () => {
      if (pageRef.current) setShowPage(false);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <>
      <IgeaHero frozen={showPage} onDiscover={() => navigate('corsi')} onNavigate={navigate} />
      <Corsi open={showPage} onClose={goBack} onNavigate={navigate} scrollTarget={target} />
    </>
  );
}
