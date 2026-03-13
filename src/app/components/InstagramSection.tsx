import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import img1 from 'figma:asset/5509b3fee92f29d4d0e8e39d91ebb5517bc39eaf.png';
import img2 from 'figma:asset/85c40bb79e45924e8ed0f5605eee52ac4e5ca5ca.png';
import img3 from 'figma:asset/97cd5f5c514dbfcebb3f52935d2697a10b9a6246.png';

export function InstagramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);

  const previewImages = [
    img1,
    img2,
    img3,
  ];

  return (
    <section id="connect" className="min-h-screen bg-zinc-950 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0, rotateZ: -180 }}
            animate={isInView ? { scale: 1, rotateZ: 0 } : { scale: 0, rotateZ: -180 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <Instagram className="mx-auto mb-8 h-20 w-20 text-white" />
          </motion.div>
          
          <motion.h2 
            className="mb-6 text-5xl font-bold text-white md:text-6xl"
            initial={{ rotateY: -30 }}
            animate={isInView ? { rotateY: 0 } : { rotateY: -30 }}
            transition={{ duration: 1 }}
            style={{ perspective: 1000 }}
          >
            Follow The Ride
          </motion.h2>
          <p className="mb-12 text-xl text-gray-400">
            Stay updated with the latest content, rides, and moments on Instagram
          </p>

          <motion.a
            href="https://instagram.com/dafz_r7"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              scale: 1.1,
              rotateZ: 2,
              boxShadow: "0 20px 60px rgba(236, 72, 153, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 px-10 py-5 text-xl font-bold text-white transition-all"
            style={{ transformStyle: 'preserve-3d' }}
          >
            @dafz_r7
            <ExternalLink className="h-6 w-6" />
          </motion.a>

          {/* Decorative elements with 3D effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-4"
            style={{ perspective: 1500 }}
          >
            {previewImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: -90, z: -100 }}
                animate={isInView ? { opacity: 1, rotateY: 0, z: 0 } : { opacity: 0, rotateY: -90, z: -100 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                onHoverStart={() => setHoveredImg(index)}
                onHoverEnd={() => setHoveredImg(null)}
                className="aspect-square overflow-hidden rounded-lg"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.img
                  src={img}
                  alt={`Instagram preview ${index + 1}`}
                  className="h-full w-full object-cover"
                  animate={{
                    scale: hoveredImg === index ? 1.2 : 1,
                    rotateZ: hoveredImg === index ? 5 : 0,
                    z: hoveredImg === index ? 50 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-24 border-t border-gray-800 pt-12 text-center text-gray-500"
      >
        <p>© 2026 dafz_r7 - Yamaha R7 Content Creator</p>
        <p className="mt-2 text-sm">Built for the love of riding</p>
      </motion.footer>
    </section>
  );
}