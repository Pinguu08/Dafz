import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Zap, Wind, Gauge } from 'lucide-react';
import img1 from 'figma:asset/85c40bb79e45924e8ed0f5605eee52ac4e5ca5ca.png';
import img2 from 'figma:asset/b0aaa6f340a96d16a62b2257962be3224b81eb2f.png';
import img3 from 'figma:asset/896636be04ccf38c658fa902124e1f9c03367a66.png';
import img4 from 'figma:asset/97cd5f5c514dbfcebb3f52935d2697a10b9a6246.png';

const contentImages = [
  {
    url: img1,
    span: 'col-span-2',
  },
  {
    url: img2,
    span: 'col-span-1',
  },
  {
    url: img3,
    span: 'col-span-1',
  },
  {
    url: img4,
    span: 'col-span-2',
  },
];

const highlights = [
  {
    icon: Zap,
    title: 'Pure Adrenaline',
    description: 'Every ride is an experience',
  },
  {
    icon: Wind,
    title: 'Freedom',
    description: 'Two wheels, endless possibilities',
  },
  {
    icon: Gauge,
    title: 'Performance',
    description: 'Built for the thrill',
  },
];

export function ContentSection() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="lifestyle" className="relative min-h-screen bg-black px-4 py-24 md:px-8" ref={sectionRef}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
          style={{ perspective: 1000 }}
        >
          <motion.h2 
            className="mb-4 text-5xl font-bold text-white md:text-6xl"
            initial={{ rotateX: 20 }}
            animate={isInView ? { rotateX: 0 } : { rotateX: 20 }}
            transition={{ duration: 1 }}
          >
            The Lifestyle
          </motion.h2>
          <p className="text-xl text-gray-400">Passion. Speed. Style.</p>
        </motion.div>

        {/* Highlights with 3D flip effect */}
        <div className="mb-16 grid gap-8 md:grid-cols-3" style={{ perspective: 2000 }}>
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, rotateY: -90 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 30, rotateY: -90 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative overflow-hidden rounded-lg bg-zinc-900 p-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{
                  rotateX: hoveredCard === index ? 10 : 0,
                  z: hoveredCard === index ? 50 : 0,
                }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  animate={{
                    rotateY: hoveredCard === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="mb-4 h-12 w-12 text-red-600" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
              
              {/* 3D glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"
                animate={{
                  opacity: hoveredCard === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Visual Grid with Parallax */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
          style={{ y }}
        >
          {contentImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, rotateX: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.95, rotateX: -20 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50
              }}
              className={`group relative aspect-[4/3] overflow-hidden rounded-lg ${image.span}`}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <img
                src={image.url}
                alt={`Content ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote with 3D text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
          style={{ perspective: 1000 }}
        >
          <motion.blockquote 
            className="text-3xl font-bold italic text-gray-300 md:text-4xl"
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              textShadow: "0 0 20px rgba(220, 38, 38, 0.5)",
            }}
            transition={{ duration: 0.3 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            "Life is short. Ride fast."
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
}