import { ThemeType } from '../types';

/**
 * Returns a soft, warm pastel background, border, and text color
 * based on the theme and an individual hueShift (-20 to +20).
 * Avoids jarring jumps (e.g. blue to red) and keeps colors in harmonious warm pastel tones.
 */
export function getPastelCloudColors(themeType: ThemeType, hueShift: number = 0, customColor?: string) {
  if (customColor) {
    return {
      background: customColor,
      border: 'rgba(0, 0, 0, 0.08)',
      text: '#2d3748',
      glow: 'rgba(255, 255, 255, 0.8)',
    };
  }

  // Base hue and constraints per theme family:
  let baseHue = 38; // warm cream
  let saturation = 70;
  let lightness = 93;

  switch (themeType) {
    case 'space':
      // Golden apricot & soft stellar champagne tones (hue ~34-48)
      baseHue = 38 + (hueShift % 16);
      saturation = 68 + ((hueShift * 3) % 15);
      lightness = 92 + (Math.abs(hueShift) % 5);
      break;

    case 'ocean':
      // Serene aqua mist & seafoam sky tones (hue ~186-202)
      baseHue = 194 + (hueShift % 16);
      saturation = 55 + ((hueShift * 2) % 15);
      lightness = 93 + (Math.abs(hueShift) % 4);
      break;

    case 'pasture':
      // Gentle meadow green-cream & warm daisy tones (hue ~82-104)
      baseHue = 88 + (hueShift % 20);
      saturation = 50 + ((hueShift * 2) % 15);
      lightness = 94 + (Math.abs(hueShift) % 4);
      break;

    case 'sunset':
      // Soft peach & lavender dusk tones (hue ~335-355 or 15-28)
      baseHue = 345 + (hueShift % 22);
      saturation = 62 + ((hueShift * 2) % 12);
      lightness = 93 + (Math.abs(hueShift) % 4);
      break;
  }

  const bg = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
  const border = `hsl(${baseHue}, ${saturation - 15}%, ${lightness - 12}%)`;
  const text = `hsl(${baseHue}, 35%, 26%)`;
  const glow = `hsla(${baseHue}, ${saturation}%, 90%, 0.7)`;

  return {
    background: bg,
    border,
    text,
    glow,
    baseHue,
  };
}

export const PASTEL_PALETTE_PRESETS = [
  { name: '살구빛 크림', value: 'hsl(38, 75%, 93%)' },
  { name: '새벽 바다빛', value: 'hsl(194, 60%, 93%)' },
  { name: '포근한 풀잎', value: 'hsl(92, 55%, 94%)' },
  { name: '저녁 노을빛', value: 'hsl(348, 65%, 93%)' },
  { name: '라벤더 꿈', value: 'hsl(270, 50%, 94%)' },
  { name: '밀크 캐러멜', value: 'hsl(32, 60%, 92%)' },
];
