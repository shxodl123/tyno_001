import React from 'react';
import { ImageSky, TitleCloud } from '../../types';
import { CloudItem } from '../CloudItem';
import { Home } from 'lucide-react';

interface PastureSkyProps {
  sky: ImageSky;
  onSelectCloud: (cloud: TitleCloud) => void;
  onLikeCloud: (cloudId: string) => void;
  recentlyAddedId?: string | null;
}

export const PastureSky: React.FC<PastureSkyProps> = ({
  sky,
  onSelectCloud,
  onLikeCloud,
  recentlyAddedId,
}) => {
  const hopDuration = sky.animSpeed === 'slow' ? 6 : sky.animSpeed === 'fast' ? 3 : 4.5;

  return (
    <div
      className="relative w-full h-full min-h-[580px] overflow-hidden flex flex-col justify-between select-none"
      style={{
        background: 'linear-gradient(180deg, #fef9c3 0%, #dcfce7 35%, #bbf7d0 65%, #86efac 100%)',
      }}
    >
      {/* Upper Warm Sky with Sunbeam Shimmer */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-amber-100/60 to-transparent pointer-events-none" />

      {/* Barn / Ranch Building Image (목장 건물처럼 이미지가 존재) */}
      <div className="relative pt-6 z-10 flex flex-col items-center">
        {/* Barn House Architectural Frame */}
        <div className="relative flex flex-col items-center group">
          {/* Barn Gabled Roof Peak Accent */}
          <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[20px] border-b-amber-700/80 -mb-1 z-10 drop-shadow-sm" />

          {/* Barn Framed Image */}
          <div className="relative w-48 h-36 md:w-56 md:h-40 rounded-2xl p-2 bg-gradient-to-b from-amber-700/85 via-amber-800/80 to-amber-900/90 shadow-xl border border-amber-600/40 flex items-center justify-center">
            <div className="w-full h-full rounded-xl overflow-hidden relative shadow-inner">
              <img
                src={sky.imageUrl}
                alt={sky.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Warm sunset barn window glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-amber-200/20 pointer-events-none" />
            </div>

            {/* Little Barn Sign / Weather Vane */}
            <div className="absolute -top-3.5 right-4 bg-amber-100 border border-amber-300 text-amber-900 px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-xs">
              <Home className="w-2.5 h-2.5" />
              <span>목장 하우스</span>
            </div>
          </div>
        </div>

        {/* Theme Title Pill */}
        <div className="mt-2.5 px-3 py-1 rounded-full bg-white/80 border border-emerald-300/60 shadow-xs backdrop-blur-sm text-xs text-emerald-900 font-medium tracking-tight">
          {sky.title}
        </div>
      </div>

      {/* Rolling Hills & Sheep Meadow Area */}
      <div className="relative w-full h-[62%] min-h-[340px] mt-auto">
        {/* Back Hill */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-emerald-200/90 to-emerald-100/80 rounded-t-[140px] -mx-8" />

        {/* Foreground Meadow Hill */}
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-emerald-300 to-emerald-200/90 rounded-t-[180px] -mx-4 shadow-sm pb-16">
          {/* Wildflowers / Daisies scattered */}
          <div className="absolute inset-0 pointer-events-none opacity-60">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="absolute flex items-center justify-center"
                style={{
                  top: `${20 + ((i * 17) % 65)}%`,
                  left: `${5 + ((i * 23) % 90)}%`,
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                <div className="absolute w-1 h-1 rounded-full bg-amber-300" />
              </div>
            ))}
          </div>

          {/* Sheep Title Clouds wandering and grazing on the hill */}
          <div className="relative w-full h-full">
            {sky.clouds.map((cloud, index) => {
              // Distribute sheep in pleasant, organic meadow positions
              const defaultX = 14 + ((index * 26) % 76);
              const defaultY = 18 + ((index * 29) % 62);
              const posX = cloud.meadowX !== undefined ? cloud.meadowX : defaultX;
              const posY = cloud.meadowY !== undefined ? cloud.meadowY : defaultY;

              return (
                <div
                  key={cloud.id}
                  className="absolute animate-pastoral-hop"
                  style={
                    {
                      left: `${posX}%`,
                      top: `${posY}%`,
                      transform: 'translate(-50%, -50%)',
                      '--hop-duration': `${hopDuration + (index % 3) * 0.8}s`,
                      animationDelay: `${(index * 0.6) % 3}s`,
                    } as React.CSSProperties
                  }
                >
                  <CloudItem
                    cloud={cloud}
                    themeType="pasture"
                    cloudStyle="sheep"
                    onSelect={onSelectCloud}
                    onLike={onLikeCloud}
                    isAscending={cloud.id === recentlyAddedId}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {sky.clouds.length === 0 && (
        <div className="absolute bottom-28 inset-x-0 text-center text-emerald-800/60 text-xs font-light pointer-events-none">
          초록 언덕에 아직 뛰노는 양 구름이 없습니다. 하단에서 아기양 제목구름을 띄워보세요.
        </div>
      )}
    </div>
  );
};
