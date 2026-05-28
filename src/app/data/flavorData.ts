export interface FlavorNote {
  label: string;
  value: number; // 0-100
}

export interface CoffeeFlavorProfile {
  name: string;
  origin: string;
  altitude: string;
  process: string;
  roast: string;
  tagline: string;
  description: string;
  tastingNotes: string[];
  flavorWheel: FlavorNote[];
  color: string;
  accentColor: string;
}

export const flavorProfiles: CoffeeFlavorProfile[] = [
  {
    name: 'Kopi Lintong',
    origin: 'Lintongnihuta, Tapanuli Utara, Sumatera Utara',
    altitude: '1.200 – 1.500 mdpl',
    process: 'Wet-Hulled (Giling Basah)',
    roast: 'Medium to Dark Roast',
    tagline: 'Lembut, Earthy & Kompleks',
    description:
      'Kopi Lintong dikenal dengan profil rasa yang lembut namun penuh kompleksitas. Ditanam di dataran tinggi Tapanuli Utara dengan metode wet-hulled tradisional yang menghasilkan body penuh dan keasaman rendah.',
    tastingNotes: ['Dark Chocolate', 'Cedar', 'Brown Sugar', 'Herbal', 'Tobacco'],
    flavorWheel: [
      { label: 'Keasaman', value: 35 },
      { label: 'Body', value: 85 },
      { label: 'Kemanisan', value: 60 },
      { label: 'Aroma', value: 78 },
      { label: 'Kekuatan', value: 70 },
      { label: 'Aftertaste', value: 80 },
    ],
    color: '#6B3A2A',
    accentColor: '#D4956A',
  },
  {
    name: 'Kopi Sidikalang',
    origin: 'Sidikalang, Dairi, Sumatera Utara',
    altitude: '1.000 – 1.600 mdpl',
    process: 'Wet-Hulled & Natural Process',
    roast: 'Dark Roast',
    tagline: 'Bold, Intense & Berkarakter',
    description:
      'Kopi Sidikalang adalah salah satu kopi terbaik dunia yang berasal dari kabupaten Dairi. Dikenal dengan rasa bold yang kuat, aroma intens, dan body yang sangat penuh — favorit para penikmat kopi sejati.',
    tastingNotes: ['Dark Chocolate', 'Smoky', 'Earthy', 'Black Cherry', 'Molasses'],
    flavorWheel: [
      { label: 'Keasaman', value: 40 },
      { label: 'Body', value: 95 },
      { label: 'Kemanisan', value: 50 },
      { label: 'Aroma', value: 90 },
      { label: 'Kekuatan', value: 92 },
      { label: 'Aftertaste', value: 88 },
    ],
    color: '#3D1F0E',
    accentColor: '#C17535',
  },
];
