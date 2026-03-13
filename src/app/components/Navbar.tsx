import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const sections = [
  { label: 'Home', id: 'hero' },
  { label: 'The Bike', id: 'bike' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Lifestyle', id: 'lifestyle' },
  { label: 'Connect', id: 'connect' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
          <button
            onClick={() => scrollTo('hero')}
            className="text-2xl font-bold tracking-tighter text-white md:text-3xl"
          >
            dafz_r7
          </button>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-8 md:flex">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollTo(section.id)}
                  className="relative text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  {section.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-y-0 right-0 z-50 w-72 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-6 px-10">
              {sections.map((section, idx) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <button
                    onClick={() => scrollTo(section.id)}
                    className="text-2xl font-medium text-gray-200 transition-colors hover:text-white"
                  >
                    {section.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
