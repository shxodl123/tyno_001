import React, { useState } from 'react';
import { ImageSky, TitleCloud, ThemeType, CloudStyle, AnimationSpeed } from '../types';
import { PASTEL_PALETTE_PRESETS } from '../utils/colors';
import {
  ShieldCheck,
  ArrowLeft,
  Trash2,
  Edit3,
  Plus,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Sliders,
  Check,
  Eye,
  Layers,
  Upload,
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface AdminPageProps {
  skies: ImageSky[];
  activeSkyId: string;
  onUpdateSky: (updatedSky: ImageSky) => void;
  onAddSky: (newSky: ImageSky) => void;
  onDeleteSky: (skyId: string) => void;
  onResetToDefault: () => void;
  onExitAdmin: () => void;
  onSelectSky: (skyId: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  skies,
  activeSkyId,
  onUpdateSky,
  onAddSky,
  onDeleteSky,
  onResetToDefault,
  onExitAdmin,
  onSelectSky,
}) => {
  const currentSky = skies.find((s) => s.id === activeSkyId) || skies[0];

  // Editable Sky state
  const [title, setTitle] = useState(currentSky.title);
  const [subtitle, setSubtitle] = useState(currentSky.subtitle);
  const [themeType, setThemeType] = useState<ThemeType>(currentSky.themeType);
  const [cloudStyle, setCloudStyle] = useState<CloudStyle>(currentSky.cloudStyle);
  const [animSpeed, setAnimSpeed] = useState<AnimationSpeed>(currentSky.animSpeed);
  const [imageUrl, setImageUrl] = useState(currentSky.imageUrl);

  // Cloud editing modal / drawer state
  const [editingCloud, setEditingCloud] = useState<TitleCloud | null>(null);
  const [cloudText, setCloudText] = useState('');
  const [cloudAuthor, setCloudAuthor] = useState('');
  const [cloudScale, setCloudScale] = useState(1.0);
  const [cloudColor, setCloudColor] = useState('');

  // New Cloud form state
  const [newCloudText, setNewCloudText] = useState('');
  const [newCloudAuthor, setNewCloudAuthor] = useState('');

  // New Sky modal
  const [isAddingSky, setIsAddingSky] = useState(false);
  const [newSkyTitle, setNewSkyTitle] = useState('');
  const [newSkyTheme, setNewSkyTheme] = useState<ThemeType>('space');

  // Sync state whenever selected sky changes
  const handleSelectSkyTab = (skyId: string) => {
    onSelectSky(skyId);
    const target = skies.find((s) => s.id === skyId);
    if (target) {
      setTitle(target.title);
      setSubtitle(target.subtitle);
      setThemeType(target.themeType);
      setCloudStyle(target.cloudStyle);
      setAnimSpeed(target.animSpeed);
      setImageUrl(target.imageUrl);
      setEditingCloud(null);
    }
  };

  const handleSaveSkySettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ImageSky = {
      ...currentSky,
      title,
      subtitle,
      themeType,
      cloudStyle,
      animSpeed,
      imageUrl,
    };
    onUpdateSky(updated);
    soundEngine.playSoftPop();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCloud = (cloudId: string) => {
    const updatedClouds = currentSky.clouds.filter((c) => c.id !== cloudId);
    onUpdateSky({
      ...currentSky,
      clouds: updatedClouds,
    });
    soundEngine.playSoftPop();
  };

  const handleStartEditCloud = (cloud: TitleCloud) => {
    setEditingCloud(cloud);
    setCloudText(cloud.text);
    setCloudAuthor(cloud.author);
    setCloudScale(cloud.customScale || 1.0);
    setCloudColor(cloud.customColor || '');
  };

  const handleSaveEditedCloud = () => {
    if (!editingCloud) return;
    const updatedClouds = currentSky.clouds.map((c) => {
      if (c.id === editingCloud.id) {
        return {
          ...c,
          text: cloudText.trim() || c.text,
          author: cloudAuthor.trim() || c.author,
          customScale: cloudScale,
          customColor: cloudColor || undefined,
        };
      }
      return c;
    });

    onUpdateSky({
      ...currentSky,
      clouds: updatedClouds,
    });

    setEditingCloud(null);
    soundEngine.playSoftPop();
  };

  const handleCreateCloud = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCloudText.trim()) return;

    const newCloud: TitleCloud = {
      id: `c-admin-${Date.now()}`,
      text: newCloudText.trim(),
      author: newCloudAuthor.trim() || '관리자',
      createdAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      likes: 1,
      hueShift: Math.floor(Math.random() * 16) - 8,
      orbitDistance: 220 + ((currentSky.clouds.length * 40) % 180),
      orbitAngle: (currentSky.clouds.length * 60) % 360,
      waveOffset: 20 + ((currentSky.clouds.length * 20) % 65),
      meadowX: 20 + ((currentSky.clouds.length * 25) % 65),
      meadowY: 30 + ((currentSky.clouds.length * 20) % 55),
    };

    onUpdateSky({
      ...currentSky,
      clouds: [newCloud, ...currentSky.clouds],
    });

    setNewCloudText('');
    setNewCloudAuthor('');
    soundEngine.playAscendChime();
  };

  const handleCreateNewSky = () => {
    if (!newSkyTitle.trim()) return;
    const id = `sky-custom-${Date.now()}`;
    const defaultImg =
      newSkyTheme === 'space'
        ? '/src/assets/images/cosmic_sun_celestial_1790831412272.jpg'
        : newSkyTheme === 'ocean'
        ? '/src/assets/images/ocean_horizon_sun_1790831423729.jpg'
        : newSkyTheme === 'pasture'
        ? '/src/assets/images/pasture_ranch_barn_1790831437223.jpg'
        : '/src/assets/images/sunset_forest_cottage_1790831451646.jpg';

    const newSky: ImageSky = {
      id,
      title: newSkyTitle.trim(),
      subtitle: `${newSkyTitle.trim()}의 고요한 풍경`,
      themeType: newSkyTheme,
      cloudStyle:
        newSkyTheme === 'space'
          ? 'celestial'
          : newSkyTheme === 'ocean'
          ? 'boat'
          : newSkyTheme === 'pasture'
          ? 'sheep'
          : 'lantern',
      animSpeed: 'normal',
      imageUrl: defaultImg,
      accentColor: '#f6ad55',
      createdAt: new Date().toISOString().split('T')[0],
      clouds: [],
    };

    onAddSky(newSky);
    setIsAddingSky(false);
    setNewSkyTitle('');
    soundEngine.playAscendChime();
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-slate-800 pt-16 pb-16 px-4 md:px-8">
      {/* Top Banner & Return Bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-900/10 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>이미지하늘 & 제목구름 관리 센터</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            관리자 대시보드
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            각 이미지하늘의 주제 이미지, 테마 효과, 애니메이션 속도 및 제목구름을 자유롭게 수정하고 배치합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onResetToDefault}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            title="초기 샘플 데이터 복원"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본값 복원</span>
          </button>
          <button
            type="button"
            onClick={onExitAdmin}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>사용자 페이지로 돌아가기</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Sky Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {skies.map((sky) => (
            <button
              key={sky.id}
              type="button"
              onClick={() => handleSelectSkyTab(sky.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 ${
                sky.id === currentSky.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{sky.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  sky.id === currentSky.id ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {sky.clouds.length}
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={() => setIsAddingSky(true)}
            className="px-3 py-2 rounded-2xl text-xs font-medium text-amber-800 bg-amber-100/70 hover:bg-amber-200/80 border border-amber-300/60 transition-colors flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>새 이미지하늘 추가</span>
          </button>
        </div>

        {/* Main Grid: Left is Sky & Theme Settings, Right is Title Clouds Manager */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Sky & Theme Customization (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    이미지하늘 & 테마 설정
                  </h2>
                </div>
                {skies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`'${currentSky.title}' 이미지하늘을 정말 삭제하시겠습니까?`)) {
                        onDeleteSky(currentSky.id);
                      }
                    }}
                    className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>하늘 삭제</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveSkySettings} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    하늘 제목
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-400"
                    required
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    설명 문구
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                {/* Theme Type (우주 / 바다 / 목장 / 노을숲) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    배경 테마 배치
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setThemeType('space');
                        setCloudStyle('celestial');
                      }}
                      className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        themeType === 'space'
                          ? 'border-amber-500 bg-amber-50/70 font-semibold text-amber-900'
                          : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold">🌌 우주 테마</span>
                      <span className="text-[10px] text-slate-400">
                        중심 태양 이미지 & 궤도 공전 구름
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setThemeType('ocean');
                        setCloudStyle('boat');
                      }}
                      className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        themeType === 'ocean'
                          ? 'border-sky-500 bg-sky-50/70 font-semibold text-sky-900'
                          : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold">🌊 바다 테마</span>
                      <span className="text-[10px] text-slate-400">
                        하늘 태양 이미지 & 파도 위 돛단배 구름
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setThemeType('pasture');
                        setCloudStyle('sheep');
                      }}
                      className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        themeType === 'pasture'
                          ? 'border-emerald-500 bg-emerald-50/70 font-semibold text-emerald-900'
                          : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold">🐑 목장 테마</span>
                      <span className="text-[10px] text-slate-400">
                        목장 건물 이미지 & 언덕 위 아기양 구름
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setThemeType('sunset');
                        setCloudStyle('lantern');
                      }}
                      className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                        themeType === 'sunset'
                          ? 'border-purple-500 bg-purple-50/70 font-semibold text-purple-900'
                          : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold">🌄 노을숲 테마</span>
                      <span className="text-[10px] text-slate-400">
                        숲속 오두막 & 떠오르는 풍등 구름
                      </span>
                    </button>
                  </div>
                </div>

                {/* Cloud Shape Style */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    제목구름 모양 테마
                  </label>
                  <select
                    value={cloudStyle}
                    onChange={(e) => setCloudStyle(e.target.value as CloudStyle)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                  >
                    <option value="fluffy">포근한 솜사탕 구름 (Fluffy)</option>
                    <option value="celestial">반짝이는 행성 구름 (Celestial)</option>
                    <option value="boat">물결 위 종이배 구름 (Boat)</option>
                    <option value="sheep">아기양 몽실 구름 (Sheep)</option>
                    <option value="lantern">따스한 풍등 구름 (Lantern)</option>
                  </select>
                </div>

                {/* Animation Speed */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    애니메이션 속도
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {(['slow', 'normal', 'fast'] as AnimationSpeed[]).map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        onClick={() => setAnimSpeed(spd)}
                        className={`py-1.5 rounded-xl border text-center font-medium capitalize transition-colors ${
                          animSpeed === spd
                            ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {spd === 'slow' ? '느림 (0.6x)' : spd === 'normal' ? '보통 (1.0x)' : '빠름 (1.5x)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Image Setup */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    주제 이미지 배치
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-2xs">
                      <img
                        src={imageUrl}
                        alt="미리보기"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-medium text-slate-700 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>내 컴퓨터에서 이미지 업로드</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="또는 이미지 파일 경로 / URL 입력"
                        className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-700 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Sky Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>설정 내용 즉시 적용하기</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Title Clouds Management (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    '{currentSky.title}'의 제목구름 관리 ({currentSky.clouds.length})
                  </h2>
                </div>
              </div>

              {/* Add Cloud form by Admin */}
              <form
                onSubmit={handleCreateCloud}
                className="mb-5 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="text"
                  value={newCloudText}
                  onChange={(e) => setNewCloudText(e.target.value)}
                  placeholder="새 제목구름 입력..."
                  className="flex-1 px-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                  required
                />
                <input
                  type="text"
                  value={newCloudAuthor}
                  onChange={(e) => setNewCloudAuthor(e.target.value)}
                  placeholder="작성자명 (기본: 관리자)"
                  className="w-32 px-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs text-slate-800 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>구름 등록</span>
                </button>
              </form>

              {/* Cloud Edit Drawer/Card if selected */}
              {editingCloud && (
                <div className="mb-5 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950">
                      제목구름 상세 편집
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingCloud(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      취소
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        제목 내용
                      </label>
                      <input
                        type="text"
                        value={cloudText}
                        onChange={(e) => setCloudText(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-amber-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        작성자
                      </label>
                      <input
                        type="text"
                        value={cloudAuthor}
                        onChange={(e) => setCloudAuthor(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-amber-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  {/* Size / Scale Adjustment */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                      <span>구름 크기 배율</span>
                      <span>{cloudScale.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.6"
                      max="1.8"
                      step="0.05"
                      value={cloudScale}
                      onChange={(e) => setCloudScale(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Color Tint Adjustment */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      파스텔 색조 선택 (선택 사항)
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setCloudColor('')}
                        className={`px-2 py-1 rounded-lg text-[10px] border ${
                          !cloudColor ? 'border-amber-500 bg-white font-bold' : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        테마 기본색
                      </button>
                      {PASTEL_PALETTE_PRESETS.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setCloudColor(p.value)}
                          className={`w-6 h-6 rounded-full border shadow-2xs transition-transform ${
                            cloudColor === p.value ? 'scale-125 border-slate-900' : 'border-black/10'
                          }`}
                          style={{ backgroundColor: p.value }}
                          title={p.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingCloud(null)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-600"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEditedCloud}
                      className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                    >
                      변경사항 저장
                    </button>
                  </div>
                </div>
              )}

              {/* List of Clouds */}
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {currentSky.clouds.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    아직 등록된 제목구름이 없습니다.
                  </div>
                ) : (
                  currentSky.clouds.map((cloud) => (
                    <div
                      key={cloud.id}
                      className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-xs text-slate-900 truncate">
                            "{cloud.text}"
                          </span>
                          {cloud.customScale && (
                            <span className="text-[10px] text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded">
                              {cloud.customScale}x
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span>작성자: {cloud.author || '익명'}</span>
                          <span>·</span>
                          <span>{cloud.createdAt}</span>
                          <span>·</span>
                          <span>공감 {cloud.likes}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStartEditCloud(cloud)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                          title="제목/크기/색상 편집"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`"${cloud.text}" 제목구름을 삭제하시겠습니까?`)) {
                              handleDeleteCloud(cloud.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="구름 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Sky Creation Modal */}
      {isAddingSky && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-amber-900/10 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">새 이미지하늘 추가</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                하늘 제목
              </label>
              <input
                type="text"
                value={newSkyTitle}
                onChange={(e) => setNewSkyTitle(e.target.value)}
                placeholder="예: 봄날의 벚꽃 정원"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                기본 테마
              </label>
              <select
                value={newSkyTheme}
                onChange={(e) => setNewSkyTheme(e.target.value as ThemeType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="space">우주 테마 (태양과 궤도)</option>
                <option value="ocean">바다 테마 (태양과 파도 위 돛단배)</option>
                <option value="pasture">목장 테마 (목장과 아기양떼)</option>
                <option value="sunset">노을숲 테마 (오두막과 풍등)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingSky(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleCreateNewSky}
                disabled={!newSkyTitle.trim()}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold disabled:opacity-50"
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
