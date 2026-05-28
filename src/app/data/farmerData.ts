export interface Farmer {
  id: string;
  name: string;
  age: number;
  location: string;
  coffeeType: 'Lintong' | 'Sidikalang';
  experience: string;
  farmSize: string;
  quote: string;
  process: string[];
  emoji: string;
}

export const farmers: Farmer[] = [
  {
    id: 'F001',
    name: 'Bapak Marihot Sirait',
    age: 54,
    location: 'Desa Lintong Nihuta, Tapanuli Utara',
    coffeeType: 'Lintong',
    experience: '30 tahun',
    farmSize: '2 hektar',
    quote:
      '"Kopi ini bukan sekadar tanaman — ini warisan nenek moyang kami yang kami jaga dengan sepenuh hati untuk generasi mendatang."',
    process: [
      'Pemetikan buah ceri merah secara manual (hand-picking)',
      'Fermentasi selama 12–24 jam',
      'Pengelupasan kulit menggunakan pulper tradisional',
      'Penjemuran di bawah sinar matahari selama 1–2 minggu',
      'Wet-hulled (Giling Basah) untuk mengurangi kadar air',
    ],
    emoji: '👨‍🌾',
  },
  {
    id: 'F002',
    name: 'Ibu Rosmida Bakkara',
    age: 48,
    location: 'Desa Silima Kuta, Dairi',
    coffeeType: 'Sidikalang',
    experience: '22 tahun',
    farmSize: '1.5 hektar',
    quote:
      '"Setiap biji kopi yang kami hasilkan membawa cerita — tanah, hujan, dan kerja keras keluarga kami selama bertahun-tahun."',
    process: [
      'Seleksi buah ceri matang secara teliti',
      'Proses natural — penjemuran langsung dengan kulit',
      'Pemantauan harian selama 3–5 minggu penjemuran',
      'Pengupasan kulit kering setelah kadar air optimal',
      'Sortasi biji untuk kualitas ekspor',
    ],
    emoji: '👩‍🌾',
  },
  {
    id: 'F003',
    name: 'Bapak Jonson Lumban Tobing',
    age: 61,
    location: 'Desa Pearung, Tapanuli Utara',
    coffeeType: 'Lintong',
    experience: '38 tahun',
    farmSize: '3 hektar',
    quote:
      '"Kopi Lintong sudah terkenal sejak zaman Belanda. Kami bangga menjaga tradisi ini sambil terus berinovasi untuk kualitas terbaik."',
    process: [
      'Pembibitan dari varietas Typica dan Bourbon lokal',
      'Pemupukan organik dari kompos buah kopi',
      'Panen selektif hanya buah yang sempurna',
      'Pengolahan dengan metode semi-washed',
      'Pengeringan bertahap untuk menjaga kompleksitas rasa',
    ],
    emoji: '👨‍🌾',
  },
];
