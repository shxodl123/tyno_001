import { ImageSky } from '../types';

export const INITIAL_SKIES: ImageSky[] = [
  {
    id: 'sky-space',
    title: '별들이 맴도는 우주의 심장',
    subtitle: '중심의 태양을 둥글게 둘러싸고 끝없이 공전하는 제목구름들',
    themeType: 'space',
    cloudStyle: 'celestial',
    animSpeed: 'normal',
    imageUrl: '/src/assets/images/cosmic_sun_celestial_1790831412272.jpg',
    accentColor: '#f6ad55',
    createdAt: '2026-09-28',
    clouds: [
      {
        id: 'c-space-1',
        text: '마음속 가장 따뜻한 별',
        author: '지우',
        createdAt: '2026-09-28 14:20',
        likes: 12,
        hueShift: 2,
        orbitDistance: 190,
        orbitAngle: 30,
        orbitSpeed: 1.0,
      },
      {
        id: 'c-space-2',
        text: '안녕, 나의 꼬마 은하계',
        author: '어린왕자',
        createdAt: '2026-09-29 09:15',
        likes: 19,
        hueShift: -4,
        orbitDistance: 270,
        orbitAngle: 120,
        orbitSpeed: 0.8,
      },
      {
        id: 'c-space-3',
        text: '길 잃은 유성우의 영원한 쉼터',
        author: '별밤지기',
        createdAt: '2026-09-29 21:40',
        likes: 8,
        hueShift: 6,
        orbitDistance: 350,
        orbitAngle: 210,
        orbitSpeed: 0.65,
      },
      {
        id: 'c-space-4',
        text: '빛의 온기를 기억하는 궤도',
        author: '루카',
        createdAt: '2026-09-30 11:05',
        likes: 15,
        hueShift: -2,
        orbitDistance: 220,
        orbitAngle: 300,
        orbitSpeed: 0.9,
      },
      {
        id: 'c-space-5',
        text: '순수한 동경의 중력',
        author: '스카이',
        createdAt: '2026-09-30 17:33',
        likes: 7,
        hueShift: 4,
        orbitDistance: 305,
        orbitAngle: 75,
        orbitSpeed: 0.75,
      },
      {
        id: 'c-space-6',
        text: '달콤한 살구빛 행성의 자장가',
        author: '라온',
        createdAt: '2026-10-01 02:18',
        likes: 22,
        hueShift: 8,
        orbitDistance: 380,
        orbitAngle: 165,
        orbitSpeed: 0.55,
      },
    ],
  },
  {
    id: 'sky-ocean',
    title: '새벽빛 잔물결 위의 배',
    subtitle: '하늘에 뜬 따스한 태양과 물결 위를 한가로이 떠다니는 종이배 구름',
    themeType: 'ocean',
    cloudStyle: 'boat',
    animSpeed: 'normal',
    imageUrl: '/src/assets/images/ocean_horizon_sun_1790831423729.jpg',
    accentColor: '#4fd1c5',
    createdAt: '2026-09-29',
    clouds: [
      {
        id: 'c-ocean-1',
        text: '파도를 품은 소금꽃 항해',
        author: '마린',
        createdAt: '2026-09-29 10:12',
        likes: 14,
        hueShift: 2,
        waveOffset: 16,
        waveDepth: 1,
      },
      {
        id: 'c-ocean-2',
        text: '물거품 위에 적어둔 한 줄의 약속',
        author: '등대지기',
        createdAt: '2026-09-29 15:45',
        likes: 21,
        hueShift: -4,
        waveOffset: 48,
        waveDepth: 2,
      },
      {
        id: 'c-ocean-3',
        text: '새벽빛을 향해 띄우는 작은 돛단배',
        author: '바다아이',
        createdAt: '2026-09-30 08:30',
        likes: 9,
        hueShift: 5,
        waveOffset: 78,
        waveDepth: 1,
      },
      {
        id: 'c-ocean-4',
        text: '바람의 행로를 따라가는 고요함',
        author: '푸른섬',
        createdAt: '2026-09-30 19:10',
        likes: 17,
        hueShift: -2,
        waveOffset: 32,
        waveDepth: 3,
      },
      {
        id: 'c-ocean-5',
        text: '아침 햇살이 건네는 다정한 윤슬',
        author: '해파리',
        createdAt: '2026-10-01 07:05',
        likes: 11,
        hueShift: 6,
        waveOffset: 65,
        waveDepth: 2,
      },
    ],
  },
  {
    id: 'sky-pasture',
    title: '초록 언덕 위의 오두막과 양떼',
    subtitle: '따스한 목장 건물과 언덕을 포근하게 뛰노는 아기 양 구름들',
    themeType: 'pasture',
    cloudStyle: 'sheep',
    animSpeed: 'normal',
    imageUrl: '/src/assets/images/pasture_ranch_barn_1790831437223.jpg',
    accentColor: '#68d391',
    createdAt: '2026-09-30',
    clouds: [
      {
        id: 'c-pasture-1',
        text: '민들레 홀씨를 쫓아가는 포근한 털뭉치',
        author: '클로버',
        createdAt: '2026-09-30 11:20',
        likes: 25,
        hueShift: 3,
        meadowX: 20,
        meadowY: 68,
      },
      {
        id: 'c-pasture-2',
        text: '바람결에 실려온 풀잎의 달콤함',
        author: '목동',
        createdAt: '2026-09-30 14:15',
        likes: 18,
        hueShift: -5,
        meadowX: 74,
        meadowY: 62,
      },
      {
        id: 'c-pasture-3',
        text: '낮잠에 빠진 작은 언덕의 꿈',
        author: '소풍',
        createdAt: '2026-09-30 16:40',
        likes: 13,
        hueShift: 7,
        meadowX: 38,
        meadowY: 82,
      },
      {
        id: 'c-pasture-4',
        text: '따뜻한 우유 한 잔의 위로',
        author: '봄날',
        createdAt: '2026-10-01 09:22',
        likes: 31,
        hueShift: -2,
        meadowX: 84,
        meadowY: 78,
      },
      {
        id: 'c-pasture-5',
        text: '토닥토닥 풀밭을 밟는 발걸음',
        author: '도토리',
        createdAt: '2026-10-01 10:50',
        likes: 15,
        hueShift: 4,
        meadowX: 52,
        meadowY: 72,
      },
    ],
  },
  {
    id: 'sky-sunset',
    title: '노을빛 산마루와 떠오르는 풍등',
    subtitle: '보랏빛 숲속 오두막 위로 서서히 솟아오르는 저녁노을 구름',
    themeType: 'sunset',
    cloudStyle: 'lantern',
    animSpeed: 'slow',
    imageUrl: '/src/assets/images/sunset_forest_cottage_1790831451646.jpg',
    accentColor: '#f687b3',
    createdAt: '2026-10-01',
    clouds: [
      {
        id: 'c-sunset-1',
        text: '어스름이 내리는 고요한 피난처',
        author: '라벤더',
        createdAt: '2026-10-01 08:10',
        likes: 16,
        hueShift: 3,
        meadowX: 25,
        meadowY: 35,
      },
      {
        id: 'c-sunset-2',
        text: '숲의 정령이 밝힌 저녁 등불',
        author: '솔방울',
        createdAt: '2026-10-01 09:40',
        likes: 24,
        hueShift: -3,
        meadowX: 68,
        meadowY: 42,
      },
      {
        id: 'c-sunset-3',
        text: '하루를 다독이는 살구빛 온기',
        author: '노을아이',
        createdAt: '2026-10-01 11:15',
        likes: 19,
        hueShift: 5,
        meadowX: 42,
        meadowY: 55,
      },
      {
        id: 'c-sunset-4',
        text: '모닥불 향기가 스며든 시간',
        author: '가을밤',
        createdAt: '2026-10-01 13:00',
        likes: 12,
        hueShift: -6,
        meadowX: 80,
        meadowY: 28,
      },
    ],
  },
];

export const STORAGE_KEY_SKIES = 'title_clouds_image_skies_v1';

export function loadStoredSkies(): ImageSky[] {
  if (typeof window === 'undefined') return INITIAL_SKIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SKIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SKIES, JSON.stringify(INITIAL_SKIES));
      return INITIAL_SKIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse stored skies', e);
  }
  return INITIAL_SKIES;
}

export function saveStoredSkies(skies: ImageSky[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SKIES, JSON.stringify(skies));
  } catch (e) {
    console.error('Failed to save skies', e);
  }
}
