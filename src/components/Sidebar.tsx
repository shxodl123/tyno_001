import React, { useState } from 'react';
import { ImageSky } from '../types';
import {
  Sparkles,
  Compass,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CircleDot,
  Waves,
  Trees,
  SunMedium,
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface SidebarProps {
  skies: ImageSky[];
  activeSkyId: string;
  onSelectSky: (skyId: string) => void;
  onEnterAdmin: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  skies,
  activeSkyId,
  onSelectSky,
  onEnterAdmin,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    const isPlaying = soundEngine.toggleAmbient();
    setIsMuted(!isPlaying);
  };

  const getThemeIcon = (type: string) => {
    switch (type) {
      case 'space':
        return <CircleDot className="w-3.5 h-3.5 text-amber-500" />;
      case 'ocean':
        return <Waves className="w-3.5 h-3.5 text-sky-500" />;
      case 'pasture':
        return <Trees className="w-3.5 h-3.5 text-emerald-500" />;
      case 'sunset':
        return <SunMedium className="w-3.5 h-3.5 text-rose-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  const getThemeBadgeLabel = (type: string) => {
    switch (type) {
      case 'space':
        return '우주 테마';
      case 'ocean':
        return '바다 테마';
      case 'pasture':
        return '목장 테마';
      case 'sunset':
        return '노을숲 테마';
      default:
        return '일반 테마';
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-16 left-3 z-40 p-2 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-900/10 shadow-md text-slate-700 hover:text-amber-800 transition-transform active:scale-95"
        title={isOpen ? '사이드바 접기' : '이미지하늘 목록 열기'}
        aria-label="사이드바 토글"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-30 w-72 md:w-80 bg-white/92 backdrop-blur-xl border-r border-amber-950/10 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 pt-16 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
              이미지하늘 탐색
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleSound}
            className={`p-1.5 rounded-xl border text-xs flex items-center gap-1 transition-colors ${
              !isMuted
                ? 'bg-amber-100/70 border-amber-300 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
            title={isMuted ? '배경 음악 켜기' : '배경 음악 끄기'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="text-[11px] font-medium">{isMuted ? '소리 끔' : '음악 재생 중'}</span>
          </button>
        </div>

        {/* Skies List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          <div className="px-2 pt-1 text-[11px] font-medium text-slate-400">
            주제별 이미지하늘 ({skies.length})
          </div>

          {skies.map((sky) => {
            const isActive = sky.id === activeSkyId;
            return (
              <button
                key={sky.id}
                type="button"
                onClick={() => {
                  soundEngine.playSoftPop();
                  onSelectSky(sky.id);
                }}
                className={`w-full text-left p-2.5 rounded-2xl transition-all duration-200 border flex items-center gap-3 group ${
                  isActive
                    ? 'bg-amber-50/90 border-amber-300/80 shadow-xs'
                    : 'bg-white/60 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-black/5 shadow-2xs">
                  <img
                    src={sky.imageUrl}
                    alt={sky.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-amber-500 rounded-xl" />
                  )}
                </div>

                {/* Sky Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {getThemeIcon(sky.themeType)}
                    <span className="text-[11px] text-slate-500 font-medium">
                      {getThemeBadgeLabel(sky.themeType)}
                    </span>
                    <span className="text-slate-300 text-xs">·</span>
                    <span className="text-[11px] text-amber-700 font-medium">
                      구름 {sky.clouds.length}개
                    </span>
                  </div>
                  <h3
                    className={`text-xs font-semibold truncate ${
                      isActive ? 'text-amber-900' : 'text-slate-800'
                    }`}
                  >
                    {sky.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-light">
                    {sky.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer with Admin direct access */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60 flex flex-col gap-2">
          <button
            type="button"
            onClick={onEnterAdmin}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>관리자 페이지 전환</span>
          </button>
          <p className="text-[10px] text-slate-400 text-center">
            하단 입력창에 <span className="font-semibold text-amber-800">admin</span>을 입력해도 진입할 수 있습니다.
          </p>
        </div>
      </aside>
    </>
  );
};
