// Photo Management Utility
// Diese Datei macht es einfach, Foto-Pfade zu verwalten

// Alle 6 hochgeladenen Fotos
import img1 from 'figma:asset/b3661d6ffddae2ed18c5c1ed6b3e5df595e4c882.png';
import img2 from 'figma:asset/b0aaa6f340a96d16a62b2257962be3224b81eb2f.png';
import img3 from 'figma:asset/5509b3fee92f29d4d0e8e39d91ebb5517bc39eaf.png';
import img4 from 'figma:asset/85c40bb79e45924e8ed0f5605eee52ac4e5ca5ca.png';
import img5 from 'figma:asset/896636be04ccf38c658fa902124e1f9c03367a66.png';
import img6 from 'figma:asset/97cd5f5c514dbfcebb3f52935d2697a10b9a6246.png';

export const photos = {
  // Hero Section - Sonnenuntergang Shot
  hero: img5,

  // Bike Section (3 Bilder)
  bike: [img6, img1, img3],

  // Gallery (alle 6 Bilder)
  gallery: [img1, img2, img3, img4, img5, img6],

  // Lifestyle/Content Section (4 Bilder)
  lifestyle: [img4, img2, img5, img6],

  // Instagram Preview (3 Bilder)
  instagram: [img3, img4, img6],
};

// Foto-Titel für Bike Section
export const bikeTitles = [
  'Night Rider',
  'Shadow Mode', 
  'Side Profile',
];

// Beschreibungen der Fotos
export const photoDescriptions = {
  img1: 'Black R7 - Dark aesthetic',
  img2: 'Mountain view with R7',
  img3: 'Side profile shot',
  img4: 'Night duo - Black & Red/Yellow bikes',
  img5: 'R7 at sunset - Epic sky',
  img6: 'Night rider - Urban setting',
};