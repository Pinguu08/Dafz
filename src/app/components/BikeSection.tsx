import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import bikeImage1 from 'figma:asset/97cd5f5c514dbfcebb3f52935d2697a10b9a6246.png';
import bikeImage2 from 'figma:asset/b3661d6ffddae2ed18c5c1ed6b3e5df595e4c882.png';
import bikeImage3 from 'figma:asset/5509b3fee92f29d4d0e8e39d91ebb5517bc39eaf.png';

const bikeImages = [
  {
    url: bikeImage1,
    title: 'Night Rider',
  },
  {
    url: bikeImage2,
    title: 'Shadow Mode',
  },
  {
    url: bikeImage3,
    title: 'Side Profile',
  },
];

export function BikeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="bike" className="min-h-screen bg-black px-4 py-24 md:px-8">
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
            initial={{ rotateX: -20 }}
            animate={isInView ? { rotateX: 0 } : { rotateX: -20 }}
            transition={{ duration: 1 }}
          >
            The Machine
          </motion.h2>
          <p className="text-xl text-gray-400">Yamaha R7 - Pure Performance</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bikeImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -15 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative aspect-square overflow-hidden rounded-lg"
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d'
              }}
            >
              <motion.div
                animate={{
                  rotateY: hoveredIndex === index ? 5 : 0,
                  rotateX: hoveredIndex === index ? -5 : 0,
                  scale: hoveredIndex === index ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="h-full w-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.h3
                      className="text-2xl font-bold text-white"
                      animate={{
                        z: hoveredIndex === index ? 50 : 0,
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {image.title}
                    </motion.h3>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bike Specs with 3D Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid gap-8 md:grid-cols-3"
          style={{ perspective: 2000 }}
        >
          {[
            { value: '689cc', label: 'Parallel Twin Engine' },
            { value: '73 HP', label: 'Peak Power' },
            { value: '188 kg', label: 'Lightweight Chassis' }
          ].map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateX: 90 }}
              animate={isInView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              className="border-l-4 border-red-600 bg-zinc-900/50 p-6 backdrop-blur-sm"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="mb-2 text-3xl font-bold text-white">{spec.value}</h3>
              <p className="text-gray-400">{spec.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}