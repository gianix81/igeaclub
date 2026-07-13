import { useState } from 'react';
import IgeaHero from './IgeaHero';
import Corsi from './Corsi';

export default function App() {
  const [showCorsi, setShowCorsi] = useState(false);

  return (
    <>
      <IgeaHero frozen={showCorsi} onDiscover={() => setShowCorsi(true)} />
      <Corsi open={showCorsi} onClose={() => setShowCorsi(false)} />
    </>
  );
}
