import { useState } from 'react';
import IgeaHero from './IgeaHero';
import Corsi from './Corsi';
import Contatti from './Contatti';

export default function App() {
  const [showCorsi, setShowCorsi] = useState(false);
  const [showContatti, setShowContatti] = useState(false);

  return (
    <>
      <IgeaHero
        frozen={showCorsi || showContatti}
        onDiscover={() => setShowCorsi(true)}
        onContacts={() => setShowContatti(true)}
      />
      <Corsi
        open={showCorsi}
        onClose={() => setShowCorsi(false)}
        onContacts={() => setShowContatti(true)}
      />
      <Contatti open={showContatti} onClose={() => setShowContatti(false)} />
    </>
  );
}
