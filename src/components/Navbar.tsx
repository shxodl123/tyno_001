import React from 'react';
import { Cloud, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onEnterAdmin: () => void;
  onOpenAbout?: () => void;
  isAdmin: boolean;
  onExitAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onEnterAdmin,
  isAdmin,
  onExitAdmin,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 h-14 bg-white/80 backdrop-blur-md border-b border-amber-950/10 px-4 md:px-6 flex items-center justify-between">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2 pl-9 md:pl-0">
        <Cloud className="w-5 h-5 text-amber-500" />
        <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
          제목구름과 이미지하늘
        </span>
      </div>

      {/* Zone 2: Clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
        <span className="text-slate-500">
          하나의 이미지에 피어나는 여러 개의 시선
        </span>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2">
        {isAdmin ? (
          <button
            type="button"
            onClick={onExitAdmin}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-colors shadow-2xs whitespace-nowrap"
          >
            사용자 하늘로 돌아가기
          </button>
        ) : (
          <button
            type="button"
            onClick={onEnterAdmin}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="관리자 페이지"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>관리자 모드</span>
          </button>
        )}
      </div>
    </header>
  );
};
