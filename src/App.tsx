import { useState } from 'react';
import IgeaHero from './IgeaHero';
import Corsi from './Corsi';
import Contatti from './Contatti';
import SocialFeed from './SocialFeed';

export default function App() {
  const [showCorsi, setShowCorsi] = useState(false);
  const [showContatti, setShowContatti] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  return (
    <>
      <IgeaHero
        frozen={showCorsi || showContatti || showSocial}
        onDiscover={() => setShowCorsi(true)}
        onContacts={() => setShowContatti(true)}
        onSocial={() => setShowSocial(true)}
      />
      <Corsi
        open={showCorsi}
        onClose={() => setShowCorsi(false)}
        onContacts={() => setShowContatti(true)}
      />
      <Contatti open={showContatti} onClose={() => setShowContatti(false)} />
      <SocialFeed open={showSocial} onClose={() => setShowSocial(false)} />
    </>
  );
}
