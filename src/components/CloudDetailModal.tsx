import React from 'react';
import { TitleCloud, ThemeType } from '../types';
import { getPastelCloudColors } from '../utils/colors';
import { Heart, User, Calendar, X, Quote, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface CloudDetailModalProps {
  cloud: TitleCloud | null;
  themeType: ThemeType;
  onClose: () => void;
  onLike: (cloudId: string) => void;
}

export const CloudDetailModal: React.FC<CloudDetailModalProps> = ({
  cloud,
  themeType,
  onClose,
  onLike,
}) => {
  if (!cloud) return null;

  const colors = getPastelCloudColors(themeType, cloud.hueShift, cloud.customColor);

  const handleLike = () => {
    soundEngine.playSoftPop();
    onLike(cloud.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-amber-900/10 text-center select-none"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 20px 50px -10px ${colors.glow}, 0 10px 20px -5px rgba(0,0,0,0.1)`,
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Top Icon */}
        <div className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: colors.background }}>
          <Sparkles className="w-6 h-6" style={{ color: colors.text }} />
        </div>

        {/* Cloud Quote Box */}
        <div
          className="relative p-6 rounded-2xl border mb-6"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
          }}
        >
          <Quote className="w-6 h-6 opacity-30 mx-auto mb-2" style={{ color: colors.text }} />
          <h3
            className="text-xl md:text-2xl font-bold tracking-tight mb-2 leading-relaxed"
            style={{ color: colors.text }}
          >
            "{cloud.text}"
          </h3>
          <p className="text-xs opacity-75 font-medium" style={{ color: colors.text }}>
            이 이미지에 새겨진 마음의 제목
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="flex items-center justify-around py-3 px-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-6">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">작성자:</span>
            <span className="font-semibold text-slate-700">{cloud.author || '익명의 구름'}</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">작성일:</span>
            <span className="font-semibold text-slate-700">{cloud.createdAt}</span>
          </div>
        </div>

        {/* Actions: Heart Like Button */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleLike}
            className="px-5 py-2.5 rounded-2xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100/80 text-rose-600 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-2xs"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>따뜻한 공감 ({cloud.likes})</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            하늘로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
