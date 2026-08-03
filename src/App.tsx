import { useEffect, useRef, useState } from 'react';
import IgeaHero from './IgeaHero';
import Corsi from './Corsi';
import Contatti from './Contatti';

export default function App() {
  const [showCorsi, setShowCorsi] = useState(false);
  const [showContatti, setShowContatti] = useState(false);

  // Riferimenti sempre aggiornati per leggere lo stato dentro il listener popstate
  const corsiRef = useRef(showCorsi);
  const contattiRef = useRef(showContatti);
  corsiRef.current = showCorsi;
  contattiRef.current = showContatti;

  // Ogni apertura aggiunge una voce nella cronologia, così il tasto "indietro"
  // del browser (soprattutto su mobile) chiude la pagina interna e torna alla
  // home invece di uscire dal sito.
  const openCorsi = () => {
    window.history.pushState({ igea: 'corsi' }, '');
    setShowCorsi(true);
  };
  const openContatti = () => {
    window.history.pushState({ igea: 'contatti' }, '');
    setShowContatti(true);
  };
  // La X e la pressione di "indietro" seguono lo stesso percorso: torniamo
  // indietro nella cronologia e il listener qui sotto chiude l'overlay in cima.
  const goBack = () => window.history.back();

  useEffect(() => {
    const onPop = () => {
      if (contattiRef.current) setShowContatti(false);
      else if (corsiRef.current) setShowCorsi(false);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <>
      <IgeaHero
        frozen={showCorsi || showContatti}
        onDiscover={openCorsi}
        onContacts={openContatti}
      />
      <Corsi open={showCorsi} onClose={goBack} onContacts={openContatti} />
      <Contatti open={showContatti} onClose={goBack} />
    </>
  );
}
