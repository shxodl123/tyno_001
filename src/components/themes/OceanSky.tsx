import React from 'react';
import { ImageSky, TitleCloud } from '../../types';
import { CloudItem } from '../CloudItem';

interface OceanSkyProps {
  sky: ImageSky;
  onSelectCloud: (cloud: TitleCloud) => void;
  onLikeCloud: (cloudId: string) => void;
  recentlyAddedId?: string | null;
}

export const OceanSky: React.FC<OceanSkyProps> = ({
  sky,
  onSelectCloud,
  onLikeCloud,
  recentlyAddedId,
}) => {
  // Speed multiplier
  const bobDuration = sky.animSpeed === 'slow' ? 6 : sky.animSpeed === 'fast' ? 2.5 : 4;

  // Wave depths (layers 1, 2, 3)
  const layer1Clouds = sky.clouds.filter((_, i) => i % 3 === 0);
  const layer2Clouds = sky.clouds.filter((_, i) => i % 3 === 1);
  const layer3Clouds = sky.clouds.filter((_, i) => i % 3 === 2);

  return (
    <div
      className="relative w-full h-full min-h-[580px] overflow-hidden flex flex-col justify-between select-none"
      style={{
        background: 'linear-gradient(180deg, #fef3e2 0%, #e0f2fe 45%, #bae6fd 65%, #7dd3fc 100%)',
      }}
    >
      {/* Sky Top Area: Sun-like Image in the Horizon Sky */}
      <div className="relative pt-8 pb-4 flex flex-col items-center justify-center z-10">
        {/* Soft Sun Halo */}
        <div className="absolute top-6 w-44 h-44 rounded-full bg-amber-200/50 blur-2xl pointer-events-none" />

        {/* The Horizon Sun Image */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-2 bg-gradient-to-b from-amber-300/60 via-amber-200/40 to-white/70 shadow-lg backdrop-blur-xs group">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/80 shadow-md relative">
            <img
              src={sky.imageUrl}
              alt={sky.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Sun reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-amber-100/30 pointer-events-none" />
          </div>
        </div>

        {/* Sky Title Banner */}
        <div className="mt-2.5 px-3 py-1 rounded-full bg-white/70 border border-sky-200/60 shadow-xs backdrop-blur-sm text-xs text-sky-900 font-medium tracking-tight">
          {sky.title}
        </div>
      </div>

      {/* Ocean & Waves Area */}
      <div className="relative w-full h-[52%] min-h-[300px] mt-auto">
        {/* Sun Shimmer reflection trail down the ocean */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full bg-gradient-to-b from-amber-200/40 via-amber-100/20 to-transparent blur-md pointer-events-none" />

        {/* Wave Layer 3 (Deepest / furthest background wave) */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-sky-300/40 to-sky-400/60 rounded-t-[50px] overflow-visible">
          <div className="relative w-full h-full flex items-center justify-around px-8">
            {layer3Clouds.map((cloud, idx) => (
              <div
                key={cloud.id}
                className="animate-wave-bob"
                style={
                  {
                    '--bob-duration': `${bobDuration + 1.2}s`,
                    animationDelay: `${idx * 0.7}s`,
                  } as React.CSSProperties
                }
              >
                <CloudItem
                  cloud={cloud}
                  themeType="ocean"
                  cloudStyle="boat"
                  onSelect={onSelectCloud}
                  onLike={onLikeCloud}
                  isAscending={cloud.id === recentlyAddedId}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Wave Layer 2 (Middle wave) */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-sky-400/50 to-sky-500/70 rounded-t-[60px] overflow-visible">
          <div className="relative w-full h-full flex items-center justify-around px-12">
            {layer2Clouds.map((cloud, idx) => (
              <div
                key={cloud.id}
                className="animate-wave-bob"
                style={
                  {
                    '--bob-duration': `${bobDuration}s`,
                    animationDelay: `${idx * 0.9 + 0.4}s`,
                  } as React.CSSProperties
                }
              >
                <CloudItem
                  cloud={cloud}
                  themeType="ocean"
                  cloudStyle="boat"
                  onSelect={onSelectCloud}
                  onLike={onLikeCloud}
                  isAscending={cloud.id === recentlyAddedId}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Wave Layer 1 (Foreground closest wave) */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-sky-500/60 to-sky-600/80 rounded-t-[70px] overflow-visible pb-12">
          {/* Gentle water foam edge */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-white/40 blur-[1px]" />
          <div className="relative w-full h-full flex items-center justify-around px-6">
            {layer1Clouds.map((cloud, idx) => (
              <div
                key={cloud.id}
                className="animate-wave-bob"
                style={
                  {
                    '--bob-duration': `${bobDuration - 0.5}s`,
                    animationDelay: `${idx * 0.8 + 0.2}s`,
                  } as React.CSSProperties
                }
              >
                <CloudItem
                  cloud={cloud}
                  themeType="ocean"
                  cloudStyle="boat"
                  onSelect={onSelectCloud}
                  onLike={onLikeCloud}
                  isAscending={cloud.id === recentlyAddedId}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {sky.clouds.length === 0 && (
        <div className="absolute bottom-28 inset-x-0 text-center text-sky-800/60 text-xs font-light pointer-events-none">
          잔잔한 파도 위에 아직 배가 없습니다. 하단에서 첫 번째 돛단배 제목구름을 띄워보세요.
        </div>
      )}
    </div>
  );
};
