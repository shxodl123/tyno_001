import { useState, useEffect } from 'react';
import { ImageSky, TitleCloud } from './types';
import { INITIAL_SKIES, loadStoredSkies, saveStoredSkies } from './data/initialSkies';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BottomInputBar } from './components/BottomInputBar';
import { SpaceSky } from './components/themes/SpaceSky';
import { OceanSky } from './components/themes/OceanSky';
import { PastureSky } from './components/themes/PastureSky';
import { SunsetSky } from './components/themes/SunsetSky';
import { AdminPage } from './components/AdminPage';
import { CloudDetailModal } from './components/CloudDetailModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [skies, setSkies] = useState<ImageSky[]>(() => loadStoredSkies());
  const [activeSkyId, setActiveSkyId] = useState<string>(() => {
    const loaded = loadStoredSkies();
    return loaded[0]?.id || 'sky-space';
  });
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [selectedCloud, setSelectedCloud] = useState<TitleCloud | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [adminToast, setAdminToast] = useState<string | null>(null);

  // Save to localStorage on updates
  useEffect(() => {
    saveStoredSkies(skies);
  }, [skies]);

  const currentSky = skies.find((s) => s.id === activeSkyId) || skies[0];

  // Cloud creation by user from bottom input bar
  const handleAddCloud = (text: string, author: string) => {
    const newId = `c-user-${Date.now()}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    // Calculate pleasant coordinates depending on theme
    const cloudCount = currentSky.clouds.length;
    const newCloud: TitleCloud = {
      id: newId,
      text,
      author,
      createdAt: formattedDate,
      likes: 0,
      hueShift: Math.floor(Math.random() * 20) - 10,
      orbitDistance: 190 + ((cloudCount * 45) % 200),
      orbitAngle: (cloudCount * 65) % 360,
      orbitSpeed: 0.8 + ((cloudCount % 3) * 0.2),
      waveOffset: 15 + ((cloudCount * 22) % 68),
      meadowX: 18 + ((cloudCount * 25) % 68),
      meadowY: 25 + ((cloudCount * 23) % 55),
    };

    const updatedSkies = skies.map((sky) => {
      if (sky.id === currentSky.id) {
        return {
          ...sky,
          clouds: [newCloud, ...sky.clouds],
        };
      }
      return sky;
    });

    setSkies(updatedSkies);
    setRecentlyAddedId(newId);

    // Clear recent animation flag after 1.5s
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);
  };

  // Heart like handler
  const handleLikeCloud = (cloudId: string) => {
    const updatedSkies = skies.map((sky) => {
      if (sky.id === currentSky.id) {
        return {
          ...sky,
          clouds: sky.clouds.map((c) => (c.id === cloudId ? { ...c, likes: c.likes + 1 } : c)),
        };
      }
      return sky;
    });
    setSkies(updatedSkies);

    if (selectedCloud && selectedCloud.id === cloudId) {
      setSelectedCloud({
        ...selectedCloud,
        likes: selectedCloud.likes + 1,
      });
    }
  };

  // Admin triggers
  const handleEnterAdmin = () => {
    setIsAdminMode(true);
    setAdminToast('관리자 모드로 전환되었습니다.');
    setTimeout(() => setAdminToast(null), 3500);
  };

  const handleExitAdmin = () => {
    setIsAdminMode(false);
  };

  const handleUpdateSky = (updatedSky: ImageSky) => {
    setSkies((prev) => prev.map((s) => (s.id === updatedSky.id ? updatedSky : s)));
  };

  const handleAddSky = (newSky: ImageSky) => {
    setSkies((prev) => [...prev, newSky]);
    setActiveSkyId(newSky.id);
  };

  const handleDeleteSky = (skyId: string) => {
    const filtered = skies.filter((s) => s.id !== skyId);
    setSkies(filtered);
    if (activeSkyId === skyId && filtered.length > 0) {
      setActiveSkyId(filtered[0].id);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('모든 이미지하늘과 제목구름을 기본 초기 상태로 복원하시겠습니까?')) {
      setSkies(INITIAL_SKIES);
      setActiveSkyId(INITIAL_SKIES[0].id);
      saveStoredSkies(INITIAL_SKIES);
    }
  };

  // Render Theme Sky
  const renderSkyContent = () => {
    switch (currentSky.themeType) {
      case 'space':
        return (
          <SpaceSky
            sky={currentSky}
            onSelectCloud={setSelectedCloud}
            onLikeCloud={handleLikeCloud}
            recentlyAddedId={recentlyAddedId}
          />
        );
      case 'ocean':
        return (
          <OceanSky
            sky={currentSky}
            onSelectCloud={setSelectedCloud}
            onLikeCloud={handleLikeCloud}
            recentlyAddedId={recentlyAddedId}
          />
        );
      case 'pasture':
        return (
          <PastureSky
            sky={currentSky}
            onSelectCloud={setSelectedCloud}
            onLikeCloud={handleLikeCloud}
            recentlyAddedId={recentlyAddedId}
          />
        );
      case 'sunset':
        return (
          <SunsetSky
            sky={currentSky}
            onSelectCloud={setSelectedCloud}
            onLikeCloud={handleLikeCloud}
            recentlyAddedId={recentlyAddedId}
          />
        );
      default:
        return (
          <SpaceSky
            sky={currentSky}
            onSelectCloud={setSelectedCloud}
            onLikeCloud={handleLikeCloud}
            recentlyAddedId={recentlyAddedId}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fbf9f5] overflow-x-hidden flex flex-col font-['Gowun_Dodum',_sans-serif]">
      {/* Top Bar Contract (Wordmark, Nav links, Action) */}
      <Navbar
        isAdmin={isAdminMode}
        onEnterAdmin={handleEnterAdmin}
        onExitAdmin={handleExitAdmin}
      />

      {/* Admin Mode Switch Toast */}
      {adminToast && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-amber-200 px-4 py-2 rounded-2xl shadow-xl border border-amber-300/30 flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{adminToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      {isAdminMode ? (
        <AdminPage
          skies={skies}
          activeSkyId={currentSky.id}
          onUpdateSky={handleUpdateSky}
          onAddSky={handleAddSky}
          onDeleteSky={handleDeleteSky}
          onResetToDefault={handleResetToDefault}
          onExitAdmin={handleExitAdmin}
          onSelectSky={setActiveSkyId}
        />
      ) : (
        <main className="relative flex-1 w-full h-[calc(100vh-3.5rem)] mt-14 flex overflow-hidden">
          {/* Left Sidebar to switch Image Skies */}
          <Sidebar
            skies={skies}
            activeSkyId={currentSky.id}
            onSelectSky={setActiveSkyId}
            onEnterAdmin={handleEnterAdmin}
          />

          {/* Central Thematic Sky Canvas */}
          <div className="relative flex-1 h-full w-full overflow-hidden">
            {renderSkyContent()}
          </div>

          {/* Bottom Floating Input Bar */}
          <BottomInputBar
            onAddCloud={handleAddCloud}
            onEnterAdmin={handleEnterAdmin}
            themeAccent={currentSky.accentColor}
            skyTitle={currentSky.title}
          />

          {/* Cloud Detail Modal */}
          <CloudDetailModal
            cloud={selectedCloud}
            themeType={currentSky.themeType}
            onClose={() => setSelectedCloud(null)}
            onLike={handleLikeCloud}
          />
        </main>
      )}
    </div>
  );
}
