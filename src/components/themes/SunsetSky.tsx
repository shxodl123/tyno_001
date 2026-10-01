import React from 'react';
import { ImageSky, TitleCloud } from '../../types';
import { CloudItem } from '../CloudItem';
import { Mountain } from 'lucide-react';

interface SunsetSkyProps {
  sky: ImageSky;
  onSelectCloud: (cloud: TitleCloud) => void;
  onLikeCloud: (cloudId: string) => void;
  recentlyAddedId?: string | null;
}

export const SunsetSky: React.FC<SunsetSkyProps> = ({
  sky,
  onSelectCloud,
  onLikeCloud,
  recentlyAddedId,
}) => {
  const bobDuration = sky.animSpeed === 'slow' ? 7 : sky.animSpeed === 'fast' ? 3.5 : 5;

  return (
    <div
      className="relative w-full h-full min-h-[580px] overflow-hidden flex flex-col justify-between select-none"
      style={{
        background: 'linear-gradient(180deg, #fbcfe8 0%, #fed7aa 35%, #e9d5ff 70%, #c084fc 100%)',
      }}
    >
      {/* Dusk Sun & Twilight Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-rose-300/40 blur-3xl pointer-events-none" />

      {/* Mountain Cottage Focal Image */}
      <div className="relative pt-8 z-10 flex flex-col items-center">
        <div className="relative flex flex-col items-center group">
          <div className="relative w-44 h-36 md:w-52 md:h-40 rounded-3xl p-2 bg-gradient-to-tr from-purple-400/50 via-rose-300/50 to-amber-200/50 shadow-xl backdrop-blur-xs flex items-center justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner">
              <img
                src={sky.imageUrl}
                alt={sky.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-rose-200/20 pointer-events-none" />
            </div>

            <div className="absolute -top-3.5 right-4 bg-purple-100 border border-purple-300 text-purple-900 px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-xs">
              <Mountain className="w-2.5 h-2.5" />
              <span>숲속 오두막</span>
            </div>
          </div>
        </div>

        <div className="mt-2.5 px-3 py-1 rounded-full bg-white/80 border border-purple-200/70 shadow-xs backdrop-blur-sm text-xs text-purple-900 font-medium tracking-tight">
          {sky.title}
        </div>
      </div>

      {/* Mountain Silhouette & Floating Lantern Clouds */}
      <div className="relative w-full h-[60%] min-h-[320px] mt-auto">
        {/* Distant Mountain Ridge */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-purple-900/40 to-transparent rounded-t-[100px] -mx-10" />

        {/* Floating Clouds Area */}
        <div className="relative w-full h-full pb-14">
          {sky.clouds.map((cloud, index) => {
            const posX = cloud.meadowX !== undefined ? cloud.meadowX : 15 + ((index * 24) % 75);
            const posY = cloud.meadowY !== undefined ? cloud.meadowY : 20 + ((index * 22) % 60);

            return (
              <div
                key={cloud.id}
                className="absolute animate-wave-bob"
                style={
                  {
                    left: `${posX}%`,
                    top: `${posY}%`,
                    transform: 'translate(-50%, -50%)',
                    '--bob-duration': `${bobDuration + (index % 3) * 0.7}s`,
                    animationDelay: `${index * 0.8}s`,
                  } as React.CSSProperties
                }
              >
                <CloudItem
                  cloud={cloud}
                  themeType="sunset"
                  cloudStyle="lantern"
                  onSelect={onSelectCloud}
                  onLike={onLikeCloud}
                  isAscending={cloud.id === recentlyAddedId}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {sky.clouds.length === 0 && (
        <div className="absolute bottom-28 inset-x-0 text-center text-purple-900/60 text-xs font-light pointer-events-none">
          노을빛 하늘에 아직 풍등 구름이 없습니다. 하단에서 저녁노을 제목구름을 띄워보세요.
        </div>
      )}
    </div>
  );
};
