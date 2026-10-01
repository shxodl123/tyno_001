import React, { useState } from 'react';
import { Cloud, Send, ShieldCheck, User } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BottomInputBarProps {
  onAddCloud: (text: string, author: string) => void;
  onEnterAdmin: () => void;
  themeAccent?: string;
  skyTitle?: string;
}

export const BottomInputBar: React.FC<BottomInputBarProps> = ({
  onAddCloud,
  onEnterAdmin,
  skyTitle,
}) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    // Check for admin trigger command as requested:
    // "아무 이미지하늘의 입력창에 admin이라는 글자를 입력하면 관리자 페이지에 진입한다."
    if (trimmedText.toLowerCase() === 'admin' || trimmedText === '관리자') {
      soundEngine.playInspectChime();
      setText('');
      onEnterAdmin();
      return;
    }

    setIsSubmitting(true);
    soundEngine.playAscendChime();

    const finalAuthor = author.trim() || '익명의 구름';
    onAddCloud(trimmedText, finalAuthor);

    setText('');
    setTimeout(() => {
      setIsSubmitting(false);
    }, 600);
  };

  const isAdminKeyword = text.trim().toLowerCase() === 'admin' || text.trim() === '관리자';

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 p-3 md:p-5 pointer-events-none flex justify-center">
      <div className="w-full max-w-2xl pointer-events-auto">
        <form
          onSubmit={handleSubmit}
          className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-2 md:p-3 border border-amber-900/10 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_16px_45px_-6px_rgba(0,0,0,0.16)]"
        >
          {/* Admin Detection Prompt Badge */}
          {isAdminKeyword && (
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 text-amber-200 text-xs font-medium flex items-center gap-1.5 shadow-md animate-bounce">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Enter를 누르면 관리자 페이지로 이동합니다</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* Author / Nickname Input */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-50/50 rounded-2xl w-full sm:w-44 border border-amber-100/60 focus-within:border-amber-300 transition-colors">
              <User className="w-3.5 h-3.5 text-amber-600/60 shrink-0" />
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="내 닉네임 (선택)"
                maxLength={12}
                className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
              />
            </div>

            {/* Cloud Title Input */}
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50/70 rounded-2xl w-full border border-slate-100 focus-within:border-amber-300/80 transition-colors">
              <Cloud className="w-4 h-4 text-amber-500/70 shrink-0" />
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  skyTitle
                    ? `[${skyTitle}] 에 어울리는 제목을 지어주세요... ('admin' 입력 시 관리자)`
                    : "이미지에 어울리는 제목을 지어주세요... ('admin' 입력 시 관리자)"
                }
                maxLength={40}
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden font-medium"
                autoFocus
              />
            </div>

            {/* Submit / Launch Button */}
            <button
              type="submit"
              disabled={!text.trim() || isSubmitting}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0 ${
                isAdminKeyword
                  ? 'bg-slate-900 text-amber-300 hover:bg-slate-800 shadow-md'
                  : text.trim()
                  ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm active:scale-95'
                  : 'bg-slate-200/80 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isAdminKeyword ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>관리자 진입</span>
                </>
              ) : (
                <>
                  <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'translate-y-[-2px]' : ''}`} />
                  <span>구름 띄우기</span>
                </>
              )}
            </button>
          </div>

          {/* Quiet bottom hint */}
          <div className="hidden md:flex items-center justify-between px-3 pt-1.5 text-[11px] text-slate-400">
            <span>마우스를 제목구름에 올리면 작성자와 작성일을 확인할 수 있습니다.</span>
            <span className="text-slate-400/80">
              관리자 페이지: <code className="text-amber-800/80 bg-amber-50 px-1 rounded">admin</code> 입력 후 엔터
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
