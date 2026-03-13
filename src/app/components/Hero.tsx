import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import heroImage from 'figma:asset/896636be04ccf38c658fa902124e1f9c03367a66.png';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={heroImage}
          alt="Yamaha R7"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ perspective: 1000 }}
        >
          <h1 className="mb-4 text-6xl font-bold tracking-tight text-white md:text-8xl">
            dafz_r7
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ perspective: 1000 }}
        >
          <p className="mb-2 text-xl tracking-wider text-gray-300 md:text-2xl">
            Yamaha R7 / Motorcycle Content
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <p className="max-w-2xl text-lg text-gray-400">
            Capturing the thrill of the ride, one frame at a time. <br />
            Follow the journey of a Yamaha R7 through roads less traveled.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollToSection('bike')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
          className="absolute bottom-12 cursor-pointer"
        >
          <ChevronDown className="h-10 w-10 text-white" />
        </motion.button>
      </motion.div>
    </section>
  );
}