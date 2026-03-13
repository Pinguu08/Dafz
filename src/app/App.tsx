import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BikeSection } from './components/BikeSection';
import { Gallery } from './components/Gallery';
import { ContentSection } from './components/ContentSection';
import { InstagramSection } from './components/InstagramSection';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Secret shortcut: Ctrl + Shift + A
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <BikeSection />
      <Gallery />
      <ContentSection />
      <InstagramSection />

      {/* Secret Admin Panel */}
      <AnimatePresence>
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
      </AnimatePresence>
    </div>
  );
}