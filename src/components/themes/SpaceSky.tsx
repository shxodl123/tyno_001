import React, { useState } from 'react';
import { ImageSky, TitleCloud } from '../../types';
import { CloudItem } from '../CloudItem';
import { Sparkles } from 'lucide-react';

interface SpaceSkyProps {
  sky: ImageSky;
  onSelectCloud: (cloud: TitleCloud) => void;
  onLikeCloud: (cloudId: string) => void;
  recentlyAddedId?: string | null;
}

export const SpaceSky: React.FC<SpaceSkyProps> = ({
  sky,
  onSelectCloud,
  onLikeCloud,
  recentlyAddedId,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Speed multiplier
  const speedSec = sky.animSpeed === 'slow' ? 75 : sky.animSpeed === 'fast' ? 28 : 45;

  // Group clouds into orbital tracks (radii: 175px, 250px, 325px, 400px)
  const orbitalRadii = [170, 245, 320, 395];

  return (
    <div
      className="relative w-full h-full min-h-[580px] overflow-hidden flex items-center justify-center select-none"
      style={{
        background: 'radial-gradient(ellipse at center, #27223b 0%, #161224 55%, #0e0c18 100%)',
      }}
      onMouseEnter={() => setIsPaused(false)}
    >
      {/* Background Soft Stars & Cosmic Stardust */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-100/70 animate-pulse"
            style={{
              top: `${(i * 19) % 96}%`,
              left: `${(i * 31) % 96}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${(i % 5) * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Concentric Orbital Rings */}
      {orbitalRadii.map((radius, idx) => (
        <div
          key={idx}
          className="absolute rounded-full border border-amber-200/10 pointer-events-none"
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            boxShadow: 'inset 0 0 30px rgba(251, 191, 36, 0.02)',
          }}
        />
      ))}

      {/* Orbiting Title Clouds */}
      {sky.clouds.map((cloud, index) => {
        const ringIdx = index % orbitalRadii.length;
        const radius = cloud.orbitDistance || orbitalRadii[ringIdx];
        const initialAngle = cloud.orbitAngle !== undefined ? cloud.orbitAngle : (index * 60) % 360;
        const ringDuration = speedSec * (1 + ringIdx * 0.25);

        return (
          <div
            key={cloud.id}
            className="absolute pointer-events-none"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {/* Orbital rotation container */}
            <div
              className="w-full h-full animate-spin-slow pointer-events-none"
              style={
                {
                  '--orbit-duration': `${ringDuration}s`,
                  transform: `rotate(${initialAngle}deg)`,
                  animationPlayState: isPaused ? 'paused' : 'running',
                } as React.CSSProperties
              }
            >
              {/* Cloud positioned on the orbit ring perimeter */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Counter-rotation to keep the text cloud perfectly upright and readable! */}
                <div
                  className="animate-counter-spin"
                  style={
                    {
                      '--orbit-duration': `${ringDuration}s`,
                      transform: `rotate(-${initialAngle}deg)`,
                      animationPlayState: isPaused ? 'paused' : 'running',
                    } as React.CSSProperties
                  }
                >
                  <CloudItem
                    cloud={cloud}
                    themeType="space"
                    cloudStyle={sky.cloudStyle}
                    onSelect={onSelectCloud}
                    onLike={onLikeCloud}
                    isAscending={cloud.id === recentlyAddedId}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Central Solar/Celestial Image (태양처럼 중심에 동그랗게 위치) */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Soft Coronal Pulsing Glow */}
        <div className="absolute w-52 h-52 rounded-full animate-halo-shimmer pointer-events-none" />

        {/* Central Round Image Frame */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-2 bg-gradient-to-tr from-amber-400/40 via-rose-300/30 to-amber-100/50 shadow-2xl backdrop-blur-xs flex items-center justify-center group">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-amber-200/60 shadow-inner relative">
            <img
              src={sky.imageUrl}
              alt={sky.title}
              className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Warm soft lighting scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-amber-200/20 pointer-events-none" />
          </div>

          {/* Golden Solar Coronet Sparkles */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-amber-200 opacity-80 pointer-events-none">
            <Sparkles className="w-4 h-4 animate-spin-slow" style={{ animationDuration: '12s' }} />
          </div>
        </div>

        {/* Quiet Subtitle Banner beneath Sun */}
        <div className="mt-3 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-400/20 backdrop-blur-md text-[11px] text-amber-200/90 font-medium tracking-wide">
          {sky.title}
        </div>
      </div>

      {/* Empty State when no clouds */}
      {sky.clouds.length === 0 && (
        <div className="absolute bottom-28 text-center text-amber-200/50 text-xs font-light pointer-events-none">
          아직 띄워진 구름이 없습니다. 하단에서 첫 번째 제목구름을 띄워보세요.
        </div>
      )}
    </div>
  );
};
