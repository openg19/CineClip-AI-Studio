import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  Sparkles,
  Download,
  RefreshCw,
  Copy,
  Check,
  Image as ImageIcon,
  Layers,
  MapPin,
  Sliders,
  Play,
  Pause,
  X,
  Plus,
  Trash2,
  Eye,
  Palette,
  Compass,
  Grid,
  Sun,
  CloudRain,
  Coffee,
  Maximize2,
  FileJson,
  UploadCloud,
  Wand2
} from 'lucide-react';

// ============================================================================
// PRESETS & KONSEP TEMPAT BERBEDA DALAM SATU UNIVERSE VISUAL
// ============================================================================

const CONCEPT_UNIVERSES = [
  {
    id: 'cozy-rain-cafe',
    name: '🌧️ Suasana Hujan, Kafe Hangat & Lo-Fi Cozy (Satu Konsep - Beda Tempat)',
    noCharacterDefault: true,
    coreAtmosphere: 'Cozy warm indoor-outdoor contrast, soft raindrops on glass, warm tungsten amber lighting against cool rainy blue twilight, cinematic 35mm film grain, shallow depth of field, tranquil atmosphere',
    places: [
      'Sudut meja kayu dekat jendela kaca berembun dengan rintik hujan dan uap cangkir kopi hangat',
      'Sudut sofa kulit klasik di depan perapian yang menyala hangat di dalam ruangan kafe',
      'Meja bar kayu barista dengan deretan lampu gantung Edison kuning hangat dan mesin espresso klasik',
      'Sudut rak buku kayu tinggi dengan lampu baca meja antik dan jendela besar menghadap hujan di luar',
      'Teras kayu kanopi luar kafe dengan kursi rotan basah dan pantulan lampu jalan di genangan air hujan',
      'Pandangan dari trotoar batu basah di luar menatap ke dalam jendela kaca kafe yang bercahaya hangat',
      'Tangga kayu spiral menuju lantai mezzanine kafe dengan tanaman gantung dan cahaya senja',
      'Lorong kecil samping kafe dengan lampu neon hangat, payung bersandar, dan rintik hujan malam',
      'Meja bundar di dekat piano akustik tua di sudut ruangan dengan lilin menyala di atas meja',
      'Balkon lantai dua beratap kaca dengan pemandangan atap-atap kota tua yang diguyur hujan rintik'
    ],
    objects: [
      'Cangkir keramik kopi mengepulkan uap tipis di atas permukaan kayu bertekstur',
      'Buku catatan terbuka dengan pena klasik dan kacamata di samping lentera meja kecil',
      'Piringan hitam vinyl berputar lembut di bawah cahaya lampu meja kuning hangat',
      'Lentera kaca antik dengan nyala lilin hangat dan pantulan tetesan air hujan di kaca',
      'Teko teh kaca bening berisi teh herbal hangat dengan uap lembut dan dedaunan kering',
      'Tanaman monstera dalam pot terakota di sudut jendela yang basah oleh embun hujan'
    ]
  },
  {
    id: 'rural-rain-nature',
    name: '🏡 Pedesaan Hujan, Alam Tenang & Kabut Pagi (Satu Konsep - Beda Tempat)',
    noCharacterDefault: true,
    coreAtmosphere: 'Serene rainy countryside atmosphere, misty green hills, wet natural wood and stone textures, soft diffused overcast lighting with warm cabin lantern glow, peaceful cinematic nature footage',
    places: [
      'Beranda rumah kayu pedesaan dengan kursi goyang menghadap hamparan sawah hijau yang diguyur hujan',
      'Jalan setapak batu basah di tengah desa tenang dengan pepohonan rindang dan kabut tipis',
      'Jembatan kayu kecil di atas aliran sungai jernih pedesaan dengan rintik hujan jatuh di permukaan air',
      'Dapur tradisional rumah kayu dengan jendela terbuka menghadap kebun basah dan teko hangat di tungku',
      'Gazebo bambu di tepi danau tenang yang berkabut dengan riak air hujan lembut',
      'Halaman rumah desa dengan lentera gantung menyala teduh di kala senja sehabis hujan',
      'Lembah bukit teh hijau berkabut dengan pondok kayu kecil yang memancarkan cahaya lampu kuning hangat',
      'Sudut jendela kamar loteng kayu menghadap rintik hujan yang membasahi atap genteng desa',
      'Tepi hutan pinus basah dengan bangku kayu tua dan kabut putih yang menyelimuti pepohonan',
      'Dermaga kayu kecil di pinggir danau desa saat fajar berkabut dengan pantulan langit biru keperakan'
    ],
    objects: [
      'Lentera minyak klasik menyala hangat di atas pagar kayu yang basah oleh air hujan',
      'Cangkir teh tanah liat mengepul di atas meja bambu dengan latar rintik hujan desa',
      'Dedaunan hijau segar dengan butiran air hujan makro yang berkilau lembut',
      'Sepeda tua bersandar di dinding kayu gudang pedesaan dengan keranjang rotan basah',
      'Tumpukan kayu bakar kering di bawah atap teras dengan latar kabut pegunungan'
    ]
  },
  {
    id: 'urban-night-neon',
    name: '🌃 Kota Malam, Cyberpunk & Refleksi Jalanan Basah (Satu Konsep - Beda Tempat)',
    noCharacterDefault: false,
    coreAtmosphere: 'Moody cinematic night city atmosphere, wet asphalt reflections, neon cyan and warm magenta streetlights, atmospheric mist, anamorphic lens flare, high contrast nocturnal aesthetic',
    places: [
      'Simpang jalan kota malam dengan aspal basah yang memantulkan cahaya papan reklame neon warna-warni',
      'Halte bus kaca di tengah hujan malam dengan pendaran lampu kendaraan yang lewat (bokeh)',
      'Atap gedung tinggi (rooftop) dengan pagar kawat menghadap cakrawala gedung pencakar langit bercahaya',
      'Gang sempit estetik dengan deretan lentera merah-biru dan uap putih dari ventilasi jalanan',
      'Jembatan penyeberangan kota di atas jalan raya malam dengan jejak cahaya lampu mobil',
      'Interior kereta bawah tanah malam dengan cahaya lampu neon redup dan jendela berembun',
      'Kedai ramen malam sudut jalan dengan tirai kain dan uap hangat di tengah udara malam dingin',
      'Balkon apartemen modern lantai tinggi menghadap gemerlap lampu kota saat gerimis malam',
      'Stasiun kereta terbuka saat malam dengan bangku kosong dan cahaya lampu peron yang sinematik',
      'Pelabuhan kota malam dengan pantulan lampu gedung di permukaan air laut yang tenang'
    ],
    objects: [
      'Genangan air hujan di aspal yang memantulkan cahaya neon biru dan oranye secara tajam',
      'Payung transparan dengan butiran air hujan yang berkilau terkena lampu jalan kota',
      'Mesin penjual otomatis (vending machine) bercahaya terang di sudut jalanan malam yang sepi',
      'Kamera analog klasik di atas pagar beton rooftop menghadap lampu kota malam',
      'Lampu lalu lintas malam yang basah oleh hujan dengan latar gedung tinggi berkabut'
    ]
  },
  {
    id: 'fantasy-surreal-world',
    name: '🌌 Dunia Fantasi, Surreal & Magical Environment (Satu Konsep - Beda Tempat)',
    noCharacterDefault: true,
    coreAtmosphere: 'Ethereal fantasy world aesthetic, bioluminescent magical glow, surreal floating architecture, volumetric god rays, mystical atmosphere, ultra-detailed concept art cinematography',
    places: [
      'Hutan bercahaya bioluminesensi dengan pohon kristal raksasa dan sungai bercahaya biru keemasan',
      'Perpustakaan kuno magis dengan tangga melayang dan lentera bercahaya yang melayang di udara',
      'Tebing pulau melayang di atas lautan awan senja dengan air terjun yang jatuh ke langit',
      'Kuil batu kuno di tengah danau cermin kristal dengan cahaya aurora ungu dan emas di langit',
      'Rumah kaca botani magis di puncak menara dengan tanaman bercahaya dan kupu-kupu cahaya',
      'Jembatan batu lengkung kuno yang menghubungkan dua puncak gunung berkabut cahaya bintang',
      'Gua kristal bawah tanah dengan danau tenang yang memantulkan formasi permata bercahaya',
      'Taman observatorium langit kuno dengan instrumen astronomi emas raksasa di bawah galaksi terang'
    ],
    objects: [
      'Lentera kaca kuno berisi cahaya bintang bercahaya di atas batu berlumut magis',
      'Buku mantra tua terbuka dengan partikel cahaya emas yang melayang halus di udara',
      'Bunga kristal bercahaya biru lembut di tepi air jernih dengan pantulan cahaya magis',
      'Jam pasir kaca berukir emas dengan pasir bercahaya galaksi di atas meja batu kuno'
    ]
  },
  {
    id: 'solid-studio-aesthetic',
    name: '🎨 Studio Polos Berwarna & Editorial Minimalis (Satu Konsep - Beda Tempat/Set)',
    noCharacterDefault: false,
    coreAtmosphere: 'Clean minimalist architectural studio aesthetic, smooth solid color cyclorama backdrop, dramatic sculptural key light and rim lighting, sharp editorial photography, consistent color grading',
    places: [
      'Set studio cyclorama polos berwarna hangat dengan sorotan cahaya bundar (spotlight) dramatis',
      'Ruang galeri minimalis dengan dinding warna senada dan tangga geometris bersih dengan bayangan tegas',
      'Set podium silinder minimalis di tengah ruangan polos berwarna pastel/hangat dengan cahaya jendela gobo',
      'Koridor lengkung arsitektur minimalis monokromatik dengan permainan garis cahaya matahari sore',
      'Set ruang duduk editorial minimalis dengan satu kursi desain ikonik dan latar warna polos bertekstur halus',
      'Ruang instalasi cermin dan kaca minimalis dengan gradasi warna lampu studio yang lembut'
    ],
    objects: [
      'Vas keramik pahatan minimalis di atas podium batu dengan bayangan cahaya matahari artistik',
      'Kursi desainer modern di tengah latar studio polos dengan pencahayaan kontras tinggi',
      'Instalasi bola kaca dan silinder geometris dengan bias cahaya warna studio yang bersih'
    ]
  }
];

const CAMERA_ANGLES = [
  { id: 'establishing-wide', name: 'Wide Establishing Shot (Pemandangan Luas Tempat)', prompt: 'wide angle establishing shot showing the full environment and spatial depth, 24mm cinema lens' },
  { id: 'medium-atmosphere', name: 'Medium Atmospheric Shot (Fokus Area & Suasana)', prompt: 'medium cinematic framing focusing on the core area and surrounding ambiance, 35mm lens' },
  { id: 'macro-detail', name: 'Macro Close-Up Detail (Fokus Tekstur / Uap / Air Hujan)', prompt: 'extreme close-up macro shot capturing fine textures, water droplets, steam, and lighting reflections, 85mm macro lens, shallow depth of field bokeh' },
  { id: 'window-framing', name: 'Over-the-Window / Through Glass Shot (Dari Balik Kaca)', prompt: 'cinematic shot framed through a rain-streaked glass window with warm indoor-outdoor reflections, layered depth' },
  { id: 'low-angle-depth', name: 'Low Angle Perspective (Sudut Rendah Sinematik)', prompt: 'low angle surface-level shot looking across the foreground texture toward the glowing background, dramatic depth' },
  { id: 'high-corner-view', name: 'High Angle Corner View (Sudut Atas Ruangan/Lokasi)', prompt: 'high angle elevated perspective looking down at the cozy corner and spatial arrangement, 28mm lens' },
  { id: 'foreground-bokeh', name: 'Foreground Blur Framing (Siluet Depan Blur)', prompt: 'cinematic framing with soft out-of-focus foreground elements creating natural depth around the main subject area, f/1.4 aperture' },
  { id: 'symmetrical-center', name: 'Symmetrical Center Composition (Simetris Tengah)', prompt: 'perfectly balanced Wes Anderson / cinematic symmetrical center composition with leading lines' }
];

const SUBJECT_MODES = [
  { id: 'pure-scenery', name: '🌧️ Murni Suasana & Tempat (Tanpa Karakter / Footage Kosong)' },
  { id: 'object-detail', name: '☕ Fokus Detail Objek & Properti (Cangkir, Lampu, Meja, Hujan)' },
  { id: 'with-character', name: '👤 Dengan Karakter Konsisten (Sesuai Referensi)' }
];

// ============================================================================
// FUNGSI EKSTRAKSI DNA WARNA & PENCAHAYAAN DARI GAMBAR (100% DI BROWSER TANPA API)
// ============================================================================

function analyzeImageVisualDNA(imgElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const sampleSize = 64;
  canvas.width = sampleSize;
  canvas.height = sampleSize;
  ctx.drawImage(imgElement, 0, 0, sampleSize, sampleSize);

  const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize).data;
  let totalR = 0, totalG = 0, totalB = 0;
  let totalLum = 0;
  const colorBuckets = {};

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    totalR += r;
    totalG += g;
    totalB += b;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    totalLum += lum;

    // Kuantisasi warna ke bucket untuk mencari palet dominan
    const qr = Math.round(r / 32) * 32;
    const qg = Math.round(g / 32) * 32;
    const qb = Math.round(b / 32) * 32;
    const key = `${qr},${qg},${qb}`;
    colorBuckets[key] = (colorBuckets[key] || 0) + 1;
  }

  const pixelCount = sampleSize * sampleSize;
  const avgR = Math.round(totalR / pixelCount);
  const avgG = Math.round(totalG / pixelCount);
  const avgB = Math.round(totalB / pixelCount);
  const avgLum = Math.round(totalLum / pixelCount);

  const sortedColors = Object.entries(colorBuckets)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([rgb]) => {
      const [r, g, b] = rgb.split(',').map(Number);
      const clamp = (v) => Math.min(255, Math.max(0, v));
      return (
        '#' +
        [clamp(r), clamp(g), clamp(b)]
          .map((x) => x.toString(16).padStart(2, '0'))
          .join('')
      );
    });

  // Tentukan suhu warna dan suasana pencahayaan otomatis
  const isWarm = avgR > avgB + 15;
  const isCool = avgB > avgR + 15;
  const isDarkMoody = avgLum < 95;
  const isBright = avgLum > 165;

  let lightingMood = 'Balanced natural cinematic lighting';
  let colorToneDesc = 'rich balanced film color palette';
  let recommendedUniverseId = 'cozy-rain-cafe';

  if (isDarkMoody && isWarm) {
    lightingMood = 'Warm cozy low-key tungsten & amber candlelight glow with deep shadows';
    colorToneDesc = 'warm amber brown, roasted coffee tones, soft golden highlights, moody shadows';
    recommendedUniverseId = 'cozy-rain-cafe';
  } else if (isDarkMoody && isCool) {
    lightingMood = 'Moody nocturnal blue & cyan rainy twilight with soft reflections';
    colorToneDesc = 'cool slate blue, rainy glass reflections, deep midnight contrast';
    recommendedUniverseId = 'urban-night-neon';
  } else if (!isDarkMoody && avgG >= avgR && avgG >= avgB) {
    lightingMood = 'Soft diffused misty countryside natural daylight';
    colorToneDesc = 'natural organic greens, earthy wood tones, misty atmospheric gray';
    recommendedUniverseId = 'rural-rain-nature';
  } else if (isBright) {
    lightingMood = 'Soft airy high-key editorial lighting with clean shadows';
    colorToneDesc = 'clean warm neutrals, soft pastel highlights, crisp texture';
    recommendedUniverseId = 'solid-studio-aesthetic';
  }

  return {
    palette: sortedColors.length ? sortedColors : ['#4a3525', '#8c6239', '#1e293b', '#d97706', '#0f172a'],
    lightingMood,
    colorToneDesc,
    avgLum,
    isWarm,
    recommendedUniverseId
  };
}

// ============================================================================
// GENERATOR URL GAMBAR KEYLESS (100% TANPA API KEY - SIAP SHARE VERCEL)
// ============================================================================

function buildKeylessImageUrl(promptText, aspectRatio, seedNumber) {
  const width = aspectRatio === '16:9' ? 1280 : aspectRatio === '9:16' ? 720 : 1024;
  const height = aspectRatio === '16:9' ? 720 : aspectRatio === '9:16' ? 1280 : 1024;
  const cleanPrompt = encodeURIComponent(promptText.trim());
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seedNumber}&model=flux&nologo=true&enhance=true`;
}

export default function App() {
  // State Gambar Referensi (Bisa lebih dari 1 gambar)
  const [referenceImages, setReferenceImages] = useState([]);
  const [visualDNA, setVisualDNA] = useState({
    palette: ['#3b281e', '#7c5338', '#1e293b', '#d97706', '#0f172a'],
    lightingMood: 'Warm cozy low-key tungsten & amber glow with rainy window contrast',
    colorToneDesc: 'warm amber wood tones, soft golden highlights, moody rainy shadows',
    recommendedUniverseId: 'cozy-rain-cafe'
  });

  // State Pengaturan Konsep & Tempat
  const [selectedUniverseId, setSelectedUniverseId] = useState('cozy-rain-cafe');
  const [subjectMode, setSubjectMode] = useState('pure-scenery'); // 'pure-scenery' | 'object-detail' | 'with-character'
  const [backgroundStyleMode, setBackgroundStyleMode] = useState('match-reference'); // 'match-reference' | 'solid-color' | 'fantasy-world'
  const [solidColorValue, setSolidColorValue] = useState('Warm Terracotta & Cream Studio Backdrop');
  const [conceptDNAInput, setConceptDNAInput] = useState(
    'Cozy warm cafe atmosphere during gentle rain, rustic wooden textures, warm amber lighting contrasting with cool raindrops on window glass, cinematic 35mm lo-fi mood'
  );
  const [characterDNAInput, setCharacterDNAInput] = useState('');
  const [customPlacesText, setCustomPlacesText] = useState('');
  const [sceneCount, setSceneCount] = useState(12);
  const [aspectRatio, setAspectRatio] = useState('16:9');

  // State Daftar Scene
  const [scenes, setScenes] = useState([]);
  const [isGeneratingBatch, setIsGeneratingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  const [copiedId, setCopiedId] = useState(null);
  const [activePreviewScene, setActivePreviewScene] = useState(null);
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);

  const fileInputRef = useRef(null);
  const projectInputRef = useRef(null);

  const currentUniverse =
    CONCEPT_UNIVERSES.find((u) => u.id === selectedUniverseId) || CONCEPT_UNIVERSES[0];

  // Slideshow timer
  useEffect(() => {
    if (!slideshowOpen || !isPlayingSlideshow || scenes.length === 0) return;
    const timer = setInterval(() => {
      setSlideshowIndex((prev) => (prev + 1) % scenes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slideshowOpen, isPlayingSlideshow, scenes.length]);

  // Handler Unggah Multi-Gambar Referensi
  const handleUploadReferenceImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.slice(0, 6).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const img = new Image();
        img.onload = () => {
          const dna = analyzeImageVisualDNA(img);
          setReferenceImages((prev) => {
            const updated = [
              ...prev,
              {
                id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
                name: file.name,
                dataUrl,
                dna
              }
            ].slice(0, 6);
            return updated;
          });
          // Gunakan DNA gambar pertama atau gabungkan palet
          setVisualDNA(dna);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleRemoveReferenceImage = (id) => {
    setReferenceImages((prev) => prev.filter((item) => item.id !== id));
  };

  // Ganti Universe Preset
  const handleSelectUniverse = (universeId) => {
    setSelectedUniverseId(universeId);
    const found = CONCEPT_UNIVERSES.find((u) => u.id === universeId);
    if (found) {
      setConceptDNAInput(found.coreAtmosphere);
      if (found.noCharacterDefault && subjectMode === 'with-character') {
        setSubjectMode('pure-scenery');
      }
    }
  };

  // Menyusun Prompt Visual Konsisten untuk 1 Kartu Scene
  const buildConsistentScenePrompt = ({
    placeText,
    objectText,
    angleObj,
    subjMode,
    bgMode,
    dna,
    coreConcept,
    characterDesc
  }) => {
    const noPeopleRule =
      subjMode !== 'with-character'
        ? 'STRICTLY NO HUMANS, NO PEOPLE, NO CHARACTERS, empty tranquil environment footage.'
        : `Consistent character present: ${characterDesc || 'young person matching reference style, natural candid pose in the environment'}.`;

    let backgroundRule = '';
    if (bgMode === 'solid-color') {
      backgroundRule = `Set against a clean minimalist ${solidColorValue}, sculptural studio lighting, consistent color harmony.`;
    } else if (bgMode === 'fantasy-world') {
      backgroundRule = `Set inside an ethereal magical fantasy world version of this place with glowing bioluminescent accents and surreal atmospheric depth.`;
    } else {
      backgroundRule = `Strictly preserving the exact visual concept, weather, lighting mood (${dna.lightingMood}), and color palette (${dna.colorToneDesc}, hex tones ${dna.palette.join(', ')}) from the reference concept.`;
    }

    const focusSentence =
      subjMode === 'object-detail'
        ? `Primary visual focus on ${objectText} placed naturally within ${placeText}.`
        : `Primary location setting: ${placeText}, featuring subtle details like ${objectText}.`;

    return `Cinematic photorealistic masterpiece, 8k resolution, highly detailed visual clip frame. ${focusSentence} Camera Angle: ${angleObj.prompt}. Core Concept & Atmosphere: ${coreConcept}. ${backgroundRule} ${noPeopleRule} Shot on ARRI Alexa 35mm cinema lens, rich natural textures, volumetric lighting, realistic reflections.`;
  };

  // Buat Rencana Scene & Langsung Generate Gambar (Tanpa API Key)
  const handleGenerateScenes = async () => {
    setIsGeneratingBatch(true);

    // Kumpulkan daftar tempat dari input kustom + preset universe
    const customPlaceLines = customPlacesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const placePool =
      customPlaceLines.length > 0
        ? [...customPlaceLines, ...currentUniverse.places]
        : currentUniverse.places;

    const objectPool = currentUniverse.objects;
    const total = Number(sceneCount) || 12;

    const newScenes = Array.from({ length: total }, (_, index) => {
      const place = placePool[index % placePool.length];
      const objectItem = objectPool[index % objectPool.length];
      const angle = CAMERA_ANGLES[index % CAMERA_ANGLES.length];

      // Variasikan fokus antara pemandangan tempat & detail objek jika bukan mode karakter
      const effectiveSubjMode =
        subjectMode === 'with-character'
          ? 'with-character'
          : index % 3 === 2
          ? 'object-detail'
          : subjectMode;

      const seed = Math.floor(100000 + index * 7919 + (Date.now() % 10000));
      const fullPrompt = buildConsistentScenePrompt({
        placeText: place,
        objectText: objectItem,
        angleObj: angle,
        subjMode: effectiveSubjMode,
        bgMode: backgroundStyleMode,
        dna: visualDNA,
        coreConcept: conceptDNAInput,
        characterDesc: characterDNAInput
      });

      const imageUrl = buildKeylessImageUrl(fullPrompt, aspectRatio, seed);

      return {
        id: `scene-${Date.now()}-${index + 1}`,
        sceneNumber: index + 1,
        place,
        objectItem,
        angleId: angle.id,
        angleName: angle.name,
        subjectMode: effectiveSubjMode,
        prompt: fullPrompt,
        seed,
        imageUrl,
        isLoading: true
      };
    });

    setScenes(newScenes);
    setBatchProgress({ current: 0, total });

    // Preload secara bertahap agar semua kartu tampil mulus
    for (let i = 0; i < newScenes.length; i++) {
      const target = newScenes[i];
      await new Promise((resolve) => {
        const img = new Image();
        const timeout = setTimeout(resolve, 4500);
        img.onload = () => {
          clearTimeout(timeout);
          resolve();
        };
        img.onerror = () => {
          clearTimeout(timeout);
          resolve();
        };
        img.src = target.imageUrl;
      });

      setScenes((prev) =>
        prev.map((s) => (s.id === target.id ? { ...s, isLoading: false } : s))
      );
      setBatchProgress({ current: i + 1, total });
    }

    setIsGeneratingBatch(false);
  };

  // Update & Regenerate 1 Kartu Scene Spesifik
  const handleUpdateSingleScene = (sceneId, updates) => {
    setScenes((prev) =>
      prev.map((scene) => {
        if (scene.id !== sceneId) return scene;
        const updated = { ...scene, ...updates };
        const angleObj =
          CAMERA_ANGLES.find((a) => a.id === updated.angleId) || CAMERA_ANGLES[0];
        const newSeed = updates.regenerateSeed
          ? Math.floor(Math.random() * 899999 + 100000)
          : updated.seed;

        const rebuiltPrompt =
          updates.customPrompt !== undefined
            ? updates.customPrompt
            : buildConsistentScenePrompt({
                placeText: updated.place,
                objectText: updated.objectItem,
                angleObj,
                subjMode: updated.subjectMode,
                bgMode: backgroundStyleMode,
                dna: visualDNA,
                coreConcept: conceptDNAInput,
                characterDesc: characterDNAInput
              });

        return {
          ...updated,
          angleName: angleObj.name,
          seed: newSeed,
          prompt: rebuiltPrompt,
          imageUrl: buildKeylessImageUrl(rebuiltPrompt, aspectRatio, newSeed),
          isLoading: false
        };
      })
    );
  };

  // Salin Prompt
  const handleCopyPrompt = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Unduh 1 Gambar
  const handleDownloadSingleImage = async (scene) => {
    try {
      const response = await fetch(scene.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CineClip_Scene_${String(scene.sceneNumber).padStart(2, '0')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(scene.imageUrl, '_blank');
    }
  };

  // Simpan & Muat Proyek (.JSON)
  const handleExportProjectJSON = () => {
    const payload = {
      version: '2.0-keyless',
      exportedAt: new Date().toISOString(),
      selectedUniverseId,
      subjectMode,
      backgroundStyleMode,
      solidColorValue,
      conceptDNAInput,
      characterDNAInput,
      customPlacesText,
      sceneCount,
      aspectRatio,
      visualDNA,
      scenes
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cineclip-visual-project-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportProjectJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.selectedUniverseId) setSelectedUniverseId(data.selectedUniverseId);
        if (data.subjectMode) setSubjectMode(data.subjectMode);
        if (data.backgroundStyleMode) setBackgroundStyleMode(data.backgroundStyleMode);
        if (data.conceptDNAInput) setConceptDNAInput(data.conceptDNAInput);
        if (data.characterDNAInput !== undefined) setCharacterDNAInput(data.characterDNAInput);
        if (data.customPlacesText !== undefined) setCustomPlacesText(data.customPlacesText);
        if (data.sceneCount) setSceneCount(data.sceneCount);
        if (data.aspectRatio) setAspectRatio(data.aspectRatio);
        if (data.visualDNA) setVisualDNA(data.visualDNA);
        if (Array.isArray(data.scenes)) setScenes(data.scenes);
      } catch (err) {
        alert('File proyek JSON tidak valid.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* HEADER STUDIO */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  CineClip AI Studio
                </h1>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  100% Tanpa API Key • Siap Share
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generator Visual Konsep Sama • Tempat Berbeda • Multi-Angle & Footage Suasana (Hingga 30 Scene)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {scenes.length > 0 && (
              <button
                onClick={() => {
                  setSlideshowIndex(0);
                  setSlideshowOpen(true);
                  setIsPlayingSlideshow(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-medium transition"
              >
                <Play className="w-3.5 h-3.5" />
                Presentasi Visual ({scenes.length})
              </button>
            )}

            <button
              onClick={handleExportProjectJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
              title="Simpan Proyek ke File JSON"
            >
              <FileJson className="w-3.5 h-3.5 text-indigo-400" />
              Simpan JSON
            </button>

            <button
              onClick={() => projectInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
              title="Buka File Proyek JSON"
            >
              <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
              Buka JSON
            </button>
            <input
              ref={projectInputRef}
              type="file"
              accept=".json"
              onChange={handleImportProjectJSON}
              className="hidden"
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* PANEL KIRI: KONTROL KONSEP & REFERENSI */}
        <aside className="lg:col-span-4 space-y-5">
          {/* 1. UNGGAH MULTI-GAMBAR REFERENSI */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Upload className="w-4 h-4" />
                1. Gambar Referensi Konsep (Bisa &gt; 1 Gambar)
              </h2>
              <span className="text-[11px] text-slate-400">
                {referenceImages.length}/6 Gambar
              </span>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl p-4 text-center cursor-pointer transition bg-slate-950/50"
            >
              <Upload className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
              <p className="text-xs font-medium text-slate-200">
                Klik untuk Unggah 1 atau Beberapa Gambar Referensi
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Otomatis mengekstrak DNA warna, pencahayaan & mood konsep gambar Anda
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleUploadReferenceImages}
                className="hidden"
              />
            </div>

            {referenceImages.length > 0 && (
              <div className="space-y-2.5">
                <div className="grid grid-cols-3 gap-2">
                  {referenceImages.map((img, idx) => (
                    <div
                      key={img.id}
                      className="relative group rounded-lg overflow-hidden border border-slate-700 aspect-video bg-slate-950"
                    >
                      <img
                        src={img.dataUrl}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-amber-300 font-medium">
                        Ref #{idx + 1}
                      </span>
                      <button
                        onClick={() => handleRemoveReferenceImage(img.id)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600/80 text-white opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Palet Warna DNA yang Diekstrak */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      DNA Palet Warna & Cahaya Terkunci:
                    </span>
                    <div className="flex items-center gap-1">
                      {visualDNA.palette.map((hex, i) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-200/90 leading-snug">
                    {visualDNA.lightingMood}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 2. MODE SUBJEK: TANPA KARAKTER (FOOTAGE) ATAU DENGAN KARAKTER */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Coffee className="w-4 h-4" />
              2. Mode Fokus Visual (Footage Suasana vs Karakter)
            </h2>

            <div className="grid grid-cols-1 gap-2">
              {SUBJECT_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSubjectMode(mode.id)}
                  className={`text-left px-3 py-2.5 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                    subjectMode === mode.id
                      ? 'bg-amber-500/15 border-amber-500 text-amber-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{mode.name}</span>
                  {subjectMode === mode.id && (
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {subjectMode === 'with-character' && (
              <div className="pt-1">
                <label className="block text-[11px] text-slate-400 mb-1">
                  Ciri Karakter Konsisten (Wajah, Rambut, Pakaian):
                </label>
                <input
                  type="text"
                  value={characterDNAInput}
                  onChange={(e) => setCharacterDNAInput(e.target.value)}
                  placeholder="Contoh: Wanita rambut sebahu memakai sweater rajut krem hangat..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}
          </div>

          {/* 3. KONSEP UTAMA & RANTAI TEMPAT BERBEDA (SATU UNIVERSE) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              3. Konsep Sama • Tempat Berbeda (Satu Benang Merah)
            </h2>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Pilih Tema Universe Konsep:
              </label>
              <select
                value={selectedUniverseId}
                onChange={(e) => handleSelectUniverse(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              >
                {CONCEPT_UNIVERSES.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Mode Gaya Background:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'match-reference', label: 'Sesuai Referensi' },
                  { id: 'solid-color', label: 'Polos Berwarna' },
                  { id: 'fantasy-world', label: 'Dunia Fantasi' }
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBackgroundStyleMode(b.id)}
                    className={`px-2 py-1.5 rounded-lg border text-[11px] font-medium transition ${
                      backgroundStyleMode === b.id
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {backgroundStyleMode === 'solid-color' && (
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Warna Background Studio Polos:
                </label>
                <input
                  type="text"
                  value={solidColorValue}
                  onChange={(e) => setSolidColorValue(e.target.value)}
                  placeholder="Contoh: Pastel Sage Green / Terracotta Warm / Deep Navy"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                DNA Suasana, Pencahayaan & Mood yang Dikunci di Semua Tempat:
              </label>
              <textarea
                rows={3}
                value={conceptDNAInput}
                onChange={(e) => setConceptDNAInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Daftar Tempat Berbeda (Opsional — 1 baris 1 tempat baru, kosongkan untuk otomatis sesuai konsep):
              </label>
              <textarea
                rows={3}
                value={customPlacesText}
                onChange={(e) => setCustomPlacesText(e.target.value)}
                placeholder={`Contoh:\nMeja kayu dekat jendela kafe saat hujan\nSudut sofa kulit di depan perapian kafe\nTeras kayu luar kafe dengan lampu gantung hangat`}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* 4. JUMLAH SCENE (HINGGA 30) & RASIO */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                4. Jumlah Scene & Rasio Gambar
              </span>
              <span className="text-xs font-bold text-white bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                {sceneCount} Scene
              </span>
            </div>

            <div className="flex gap-1.5">
              {[6, 10, 15, 20, 25, 30].map((num) => (
                <button
                  key={num}
                  onClick={() => setSceneCount(num)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    sceneCount === num
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { id: '16:9', label: '16:9 (YouTube/TV)' },
                { id: '9:16', label: '9:16 (Reels/Shorts)' },
                { id: '1:1', label: '1:1 (Square)' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setAspectRatio(r.id)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border transition ${
                    aspectRatio === r.id
                      ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerateScenes}
              disabled={isGeneratingBatch}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isGeneratingBatch ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Merender Visual ({batchProgress.current}/{batchProgress.total})...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate {sceneCount} Visual (Konsep Sama • Beda Tempat)
                </>
              )}
            </button>
          </div>
        </aside>

        {/* PANEL KANAN: HASIL STORYBOARD MULTI-TEMPAT */}
        <section className="lg:col-span-8 space-y-4">
          {scenes.length === 0 ? (
            <div className="h-full min-h-[480px] rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Siap Membuat Rangkaian Visual Satu Konsep di Berbagai Tempat
              </h3>
              <p className="text-xs text-slate-400 max-w-lg leading-relaxed mb-6">
                Unggah 1 atau beberapa gambar referensi (misalnya suasana kafe saat hujan, pedesaan berkabut, atau ruangan estetik), pilih jumlah scene hingga 30, lalu klik tombol <strong>Generate</strong>. Aplikasi ini berjalan <strong>100% tanpa API Key</strong> sehingga link Vercel Anda langsung bisa dipakai siapa saja.
              </p>
              <button
                onClick={handleGenerateScenes}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
              >
                <Wand2 className="w-4 h-4" />
                Coba Buat {sceneCount} Scene Sekarang
              </button>
            </div>
          ) : (
            <>
              {/* Bar Ringkasan Hasil */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                    {scenes.length} Scene Visual Aktif
                  </span>
                  <span className="text-xs text-slate-400">
                    Semua scene terkunci pada DNA warna & atmosfer referensi yang sama namun di sudut/tempat berbeda
                  </span>
                </div>
              </div>

              {/* Grid Kartu Scene */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenes.map((scene) => (
                  <div
                    key={scene.id}
                    className="bg-slate-900/95 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col transition"
                  >
                    {/* Gambar Visual */}
                    <div className="relative bg-slate-950 aspect-video overflow-hidden group">
                      <img
                        src={scene.imageUrl}
                        alt={`Scene ${scene.sceneNumber}`}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />

                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-amber-300 font-bold text-xs border border-white/10">
                          Scene #{scene.sceneNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-black/70 text-slate-200 text-[11px] border border-white/10">
                          {scene.angleName.split('(')[0]}
                        </span>
                      </div>

                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-95">
                        <button
                          onClick={() => setActivePreviewScene(scene)}
                          className="p-1.5 rounded-lg bg-black/75 hover:bg-black text-white border border-white/10 transition"
                          title="Perbesar Gambar"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateSingleScene(scene.id, {
                              regenerateSeed: true
                            })
                          }
                          className="p-1.5 rounded-lg bg-black/75 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/10 transition"
                          title="Buat Variasi Baru di Tempat Ini"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDownloadSingleImage(scene)}
                          className="p-1.5 rounded-lg bg-black/75 hover:bg-emerald-500 hover:text-slate-950 text-white border border-white/10 transition"
                          title="Unduh Gambar"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Detail & Editor Cepat Per Scene */}
                    <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1">
                            📍 Lokasi / Sudut Tempat (Masih 1 Konsep):
                          </label>
                          <select
                            value={scene.place}
                            onChange={(e) =>
                              handleUpdateSingleScene(scene.id, {
                                place: e.target.value,
                                regenerateSeed: true
                              })
                            }
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100"
                          >
                            {!currentUniverse.places.includes(scene.place) && (
                              <option value={scene.place}>{scene.place}</option>
                            )}
                            {currentUniverse.places.map((p, i) => (
                              <option key={i} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">
                              🎥 Sudut Kamera:
                            </label>
                            <select
                              value={scene.angleId}
                              onChange={(e) =>
                                handleUpdateSingleScene(scene.id, {
                                  angleId: e.target.value,
                                  regenerateSeed: true
                                })
                              }
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-200"
                            >
                              {CAMERA_ANGLES.map((a) => (
                                <option key={a.id} value={a.id}>
                                  {a.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-400 mb-0.5">
                              🔍 Detail Objek / Elemen:
                            </label>
                            <select
                              value={scene.objectItem}
                              onChange={(e) =>
                                handleUpdateSingleScene(scene.id, {
                                  objectItem: e.target.value,
                                  regenerateSeed: true
                                })
                              }
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-200"
                            >
                              {currentUniverse.objects.map((o, i) => (
                                <option key={i} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Kotak Prompt & Tombol Salin */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <p className="text-[11px] text-slate-400 line-clamp-1 flex-1">
                          {scene.prompt}
                        </p>
                        <button
                          onClick={() => handleCopyPrompt(scene.id, scene.prompt)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium flex items-center gap-1 shrink-0 transition"
                        >
                          {copiedId === scene.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              Tersalin
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Salin Prompt
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      {/* MODAL PREVIEW GAMBAR PENUH */}
      {activePreviewScene && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePreviewScene(null)}
        >
          <div
            className="max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Scene #{activePreviewScene.sceneNumber} — {activePreviewScene.place}
                </h4>
                <p className="text-xs text-slate-400">{activePreviewScene.angleName}</p>
              </div>
              <button
                onClick={() => setActivePreviewScene(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={activePreviewScene.imageUrl}
                alt={activePreviewScene.place}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
            <div className="p-4 flex items-center justify-between gap-3 bg-slate-900">
              <p className="text-xs text-slate-300 line-clamp-2 flex-1">
                {activePreviewScene.prompt}
              </p>
              <button
                onClick={() => handleDownloadSingleImage(activePreviewScene)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-4 h-4" />
                Unduh Resolusi Penuh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SLIDESHOW PRESENTASI */}
      {slideshowOpen && scenes.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6">
          <div className="max-w-5xl w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-xs">
                  Scene {slideshowIndex + 1} / {scenes.length}
                </span>
                <span className="text-sm font-medium text-slate-200">
                  {scenes[slideshowIndex]?.place}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingSlideshow((p) => !p)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white flex items-center gap-1.5"
                >
                  {isPlayingSlideshow ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Jeda
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Putar
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSlideshowOpen(false)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-red-600 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
              <img
                src={scenes[slideshowIndex]?.imageUrl}
                alt={`Slide ${slideshowIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
