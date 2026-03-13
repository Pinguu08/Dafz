import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Lightbox } from './Lightbox';
import img1 from 'figma:asset/b3661d6ffddae2ed18c5c1ed6b3e5df595e4c882.png';
import img2 from 'figma:asset/b0aaa6f340a96d16a62b2257962be3224b81eb2f.png';
import img3 from 'figma:asset/5509b3fee92f29d4d0e8e39d91ebb5517bc39eaf.png';
import img4 from 'figma:asset/85c40bb79e45924e8ed0f5605eee52ac4e5ca5ca.png';
import img5 from 'figma:asset/896636be04ccf38c658fa902124e1f9c03367a66.png';
import img6 from 'figma:asset/97cd5f5c514dbfcebb3f52935d2697a10b9a6246.png';

const galleryImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
];

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="min-h-screen bg-zinc-950 px-4 py-24 md:px-8">
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
            initial={{ rotateY: -20 }}
            animate={isInView ? { rotateY: 0 } : { rotateY: -20 }}
            transition={{ duration: 1 }}
          >
            Gallery
          </motion.h2>
          <p className="text-xl text-gray-400">Moments Captured</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 2000 }}>
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.9, rotateY: -20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{
                  rotateX: hoveredIndex === index ? 10 : 0,
                  rotateY: hoveredIndex === index ? 10 : 0,
                  scale: hoveredIndex === index ? 1.05 : 1,
                  z: hoveredIndex === index ? 50 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="h-16 w-16 rounded-full border-4 border-white"
                    animate={{
                      scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                      z: 100,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: hoveredIndex === index ? Infinity : 0,
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={() => setSelectedImage((selectedImage + 1) % galleryImages.length)}
          onPrev={() => setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length)}
        />
      )}
    </section>
  );
}