export type ThemeType = 'space' | 'ocean' | 'pasture' | 'sunset';

export type CloudStyle = 'fluffy' | 'celestial' | 'boat' | 'sheep' | 'lantern';

export type AnimationSpeed = 'slow' | 'normal' | 'fast';

export interface TitleCloud {
  id: string;
  text: string;
  author: string;
  createdAt: string; // ISO or formatted date
  likes: number;
  hueShift: number; // e.g. -15 to +15 for subtle pastel variations
  customColor?: string;
  customScale?: number;
  // Specific thematic positioning coordinates:
  orbitDistance?: number; // for space (px or ring index)
  orbitAngle?: number; // initial starting angle in degrees
  orbitSpeed?: number; // relative multiplier
  waveOffset?: number; // for ocean (0-100% horizontal)
  waveDepth?: number; // wave layer 1, 2, or 3
  meadowX?: number; // for pasture (10-90%)
  meadowY?: number; // for pasture (30-85%)
  elevation?: number; // floating height
}

export interface ImageSky {
  id: string;
  title: string;
  subtitle: string;
  themeType: ThemeType;
  cloudStyle: CloudStyle;
  animSpeed: AnimationSpeed;
  imageUrl: string;
  accentColor: string;
  clouds: TitleCloud[];
  createdAt: string;
}
