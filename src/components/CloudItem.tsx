import React, { useState } from 'react';
import { TitleCloud, ThemeType, CloudStyle } from '../types';
import { getPastelCloudColors } from '../utils/colors';
import { soundEngine } from '../utils/audio';
import { Heart, Sparkles, User, Calendar } from 'lucide-react';

interface CloudItemProps {
  cloud: TitleCloud;
  themeType: ThemeType;
  cloudStyle?: CloudStyle;
  onSelect?: (cloud: TitleCloud) => void;
  onLike?: (cloudId: string) => void;
  isAscending?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CloudItem: React.FC<CloudItemProps> = ({
  cloud,
  themeType,
  cloudStyle = 'fluffy',
  onSelect,
  onLike,
  isAscending = false,
  className = '',
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const colors = getPastelCloudColors(themeType, cloud.hueShift, cloud.customColor);
  const scale = cloud.customScale || 1.0;

  // Text length dynamic sizing
  const textLength = cloud.text.length;
  const paddingX = Math.min(Math.max(textLength * 1.5 + 14, 18), 38);
  const fontSize = textLength > 18 ? 'text-xs' : textLength > 10 ? 'text-sm' : 'text-base';

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playSoftPop();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playInspectChime();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 260);
    if (onSelect) {
      onSelect(cloud);
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSoftPop();
    setHasLiked(!hasLiked);
    if (onLike) {
      onLike(cloud.id);
    }
  };

  // Render thematic shape decorations based on cloudStyle or themeType
  const effectiveStyle = cloudStyle || (
    themeType === 'space' ? 'celestial' :
    themeType === 'ocean' ? 'boat' :
    themeType === 'pasture' ? 'sheep' : 'fluffy'
  );

  return (
    <div
      className={`relative inline-block select-none group cursor-pointer transition-all duration-300 ease-out ${className} ${
        isAscending ? 'animate-[ascendSky_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]' : ''
      }`}
      style={{
        ...style,
        transform: `${style.transform || ''} scale(${
          (isHovered ? scale * 1.08 : scale) * (isPressed ? 0.94 : 1.0)
        })`,
        zIndex: isHovered ? 40 : 10,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${cloud.text} - ${cloud.author}`}
    >
      {/* Soft Ambient Cloud Aura Glow */}
      <div
        className="absolute inset-0 rounded-full blur-md transition-opacity duration-300 pointer-events-none"
        style={{
          background: colors.glow,
          opacity: isHovered ? 0.9 : 0.45,
          transform: 'scale(1.15)',
        }}
      />

      {/* Main Cloud Body with Pastel Colors */}
      <div
        className="relative flex items-center justify-center rounded-3xl transition-all duration-300 backdrop-blur-xs shadow-sm hover:shadow-md"
        style={{
          backgroundColor: colors.background,
          border: `1.5px solid ${colors.border}`,
          padding: `8px ${paddingX}px`,
          boxShadow: isHovered
            ? `0 10px 25px -4px ${colors.glow}, 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
            : '0 4px 14px -2px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Style-specific whimsical accents */}
        {effectiveStyle === 'boat' && (
          <>
            {/* Origami sail tip */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[10px] opacity-75"
              style={{ borderBottomColor: colors.border }}
            />
            {/* Boat hull curve highlight */}
            <div
              className="absolute -bottom-1 inset-x-3 h-[3px] rounded-full opacity-60"
              style={{ backgroundColor: colors.border }}
            />
          </>
        )}

        {effectiveStyle === 'sheep' && (
          <>
            {/* Cute sheep ears */}
            <div
              className="absolute -top-1.5 left-2 w-2.5 h-2 rounded-full transform -rotate-25 opacity-70"
              style={{ backgroundColor: colors.border }}
            />
            <div
              className="absolute -top-1.5 right-2 w-2.5 h-2 rounded-full transform rotate-25 opacity-70"
              style={{ backgroundColor: colors.border }}
            />
            {/* Wool puff bump top */}
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-2.5 rounded-full opacity-80"
              style={{ backgroundColor: colors.background, borderTop: `1px solid ${colors.border}` }}
            />
          </>
        )}

        {effectiveStyle === 'celestial' && (
          <>
            {/* Little star twinkle */}
            <Sparkles
              className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 text-amber-400 opacity-80 animate-pulse"
            />
            {/* Faint planetary orbit arc */}
            <div
              className="absolute -inset-1 rounded-full border border-dashed opacity-40 pointer-events-none"
              style={{ borderColor: colors.border }}
            />
          </>
        )}

        {effectiveStyle === 'fluffy' && (
          <>
            {/* Scalloped cloud bumps */}
            <div
              className="absolute -top-2 left-1/4 w-6 h-3 rounded-full opacity-85"
              style={{ backgroundColor: colors.background, borderTop: `1px solid ${colors.border}` }}
            />
            <div
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full opacity-90"
              style={{ backgroundColor: colors.background, borderTop: `1.5px solid ${colors.border}` }}
            />
          </>
        )}

        {/* Cloud Title Text */}
        <span
          className={`relative z-10 font-medium tracking-tight whitespace-nowrap ${fontSize}`}
          style={{ color: colors.text }}
        >
          {cloud.text}
        </span>
      </div>

      {/* Floating Tooltip Hover Card: Author, Date & Reactions */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2.5 transition-all duration-200 pointer-events-auto ${
          isHovered
            ? 'opacity-100 translate-y-0 visible z-50'
            : 'opacity-0 translate-y-1 invisible z-0'
        }`}
      >
        <div
          className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-amber-900/10 shadow-lg min-w-[200px] text-left transition-transform"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <span className="text-xs font-semibold text-slate-800 line-clamp-1">
              {cloud.text}
            </span>
            <button
              type="button"
              onClick={handleHeartClick}
              className={`flex items-center gap-1 text-[11px] font-medium transition-colors px-1.5 py-0.5 rounded-full ${
                hasLiked
                  ? 'text-rose-500 bg-rose-50'
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
              }`}
              title="따뜻한 공감 보내기"
            >
              <Heart
                className={`w-3 h-3 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`}
              />
              <span>{cloud.likes + (hasLiked ? 1 : 0)}</span>
            </button>
          </div>

          <div className="flex flex-col gap-1 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="text-slate-700 font-medium">작성자:</span>
              <span>{cloud.author || '익명의 구름'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="text-slate-700 font-medium">작성일:</span>
              <span>{cloud.createdAt}</span>
            </div>
          </div>

          <div className="mt-2 pt-1.5 border-t border-slate-50 text-[10px] text-amber-800/60 text-center font-medium">
            클릭하여 자세히 보기
          </div>
        </div>
      </div>
    </div>
  );
};
