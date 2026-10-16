import React, { useEffect, useState, useRef } from 'react';
import { Anchor, Waves, Wind, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface Fish {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  tailColor: string;
  direction: 1 | -1;
  depth: number;
  baseY: number;
  phase: number;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
}

export type MaritimeMode = 'both' | 'yacht' | 'fish';

interface MaritimeCanvasProps {
  mode?: MaritimeMode;
  onModeChange?: (mode: MaritimeMode) => void;
}

export const MaritimeCanvas: React.FC<MaritimeCanvasProps> = ({
  mode: controlledMode,
  onModeChange,
}) => {
  const [mode, setMode] = useState<MaritimeMode>(controlledMode || 'both');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [yachtX, setYachtX] = useState<number>(-120);
  const [yachtDirection, setYachtDirection] = useState<1 | -1>(1);
  const [isHornActive, setIsHornActive] = useState<boolean>(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Sync prop changes
  useEffect(() => {
    if (controlledMode && controlledMode !== mode) {
      setMode(controlledMode);
    }
  }, [controlledMode]);

  const handleModeSelect = (newMode: MaritimeMode) => {
    setMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  // Initialize schools of fish
  useEffect(() => {
    const initialFishes: Fish[] = [
      // School 1: Sapphire Blue Tangs
      { id: 1, x: 80, y: 180, speed: 1.2, size: 28, color: '#134C65', tailColor: '#38BDF8', direction: 1, depth: 1, baseY: 180, phase: 0 },
      { id: 2, x: 120, y: 195, speed: 1.25, size: 22, color: '#134C65', tailColor: '#38BDF8', direction: 1, depth: 0.8, baseY: 195, phase: 1.2 },
      { id: 3, x: 50, y: 165, speed: 1.18, size: 24, color: '#102D4F', tailColor: '#487F86', direction: 1, depth: 0.9, baseY: 165, phase: 2.1 },

      // School 2: Champagne Golden Tropicals
      { id: 4, x: 700, y: 380, speed: 0.9, size: 32, color: '#B69A5A', tailColor: '#F59E0B', direction: -1, depth: 1.1, baseY: 380, phase: 0.5 },
      { id: 5, x: 740, y: 395, speed: 0.88, size: 20, color: '#D97706', tailColor: '#B69A5A', direction: -1, depth: 0.7, baseY: 395, phase: 1.8 },
      { id: 6, x: 670, y: 360, speed: 0.95, size: 26, color: '#B69A5A', tailColor: '#FBBF24', direction: -1, depth: 1, baseY: 360, phase: 2.8 },

      // School 3: Seafoam Gliders
      { id: 7, x: 400, y: 560, speed: 1.05, size: 30, color: '#487F86', tailColor: '#99F6E4', direction: 1, depth: 0.95, baseY: 560, phase: 1.0 },
      { id: 8, x: 450, y: 580, speed: 1.1, size: 22, color: '#134C65', tailColor: '#487F86', direction: 1, depth: 0.85, baseY: 580, phase: 3.2 },
      { id: 9, x: 360, y: 540, speed: 1.02, size: 25, color: '#2DD4BF', tailColor: '#134C65', direction: 1, depth: 0.9, baseY: 540, phase: 4.1 },

      // Lone Deep Wanderer
      { id: 10, x: 900, y: 720, speed: 0.7, size: 36, color: '#152740', tailColor: '#B69A5A', direction: -1, depth: 1.2, baseY: 720, phase: 0 }
    ];
    setFishes(initialFishes);
  }, []);

  // Animation Loop for Yacht, Fishes, and Bubbles
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const updateFrame = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

      // 1. Move Yacht
      if (mode === 'both' || mode === 'yacht') {
        setYachtX(prev => {
          const moveDelta = 42 * speedMultiplier * dt * yachtDirection;
          const next = prev + moveDelta;
          if (yachtDirection === 1 && next > screenWidth + 140) {
            setYachtDirection(-1);
            return screenWidth + 130;
          } else if (yachtDirection === -1 && next < -160) {
            setYachtDirection(1);
            return -150;
          }
          return next;
        });
      }

      // 2. Move Fishes
      if (mode === 'both' || mode === 'fish') {
        setFishes(prevFishes =>
          prevFishes.map(fish => {
            const moveDelta = 35 * fish.speed * speedMultiplier * dt * fish.direction;
            let nextX = fish.x + moveDelta;
            let dir = fish.direction;

            if (dir === 1 && nextX > screenWidth + 60) {
              nextX = -50;
            } else if (dir === -1 && nextX < -60) {
              nextX = screenWidth + 50;
            }

            // Sinusoidal vertical glide
            const waveY = fish.baseY + Math.sin(time * 0.002 + fish.phase) * 12;

            return {
              ...fish,
              x: nextX,
              y: waveY,
            };
          })
        );
      }

      // 3. Move Bubbles
      setBubbles(prevBubbles => {
        return prevBubbles
          .map(b => ({
            ...b,
            y: b.y - b.speed * 60 * dt,
            alpha: b.alpha - dt * 0.25,
          }))
          .filter(b => b.y > 0 && b.alpha > 0);
      });

      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [mode, speedMultiplier, yachtDirection]);

  // Click handler to trigger bubbles and scatter fish
  const handleOceanClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Spawn 5-8 bubbles at click
    const newBubbles: Bubble[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: clickX + (Math.random() - 0.5) * 40,
      y: clickY + (Math.random() - 0.5) * 40,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 1.5 + 0.8,
      alpha: 0.8,
    }));
    setBubbles(prev => [...prev.slice(-30), ...newBubbles]);

    // Give yacht a playful chime
    setIsHornActive(true);
    setTimeout(() => setIsHornActive(false), 900);
  };

  const triggerHorn = () => {
    setIsHornActive(true);
    // Add bubbles behind yacht
    const yachtTailX = yachtDirection === 1 ? yachtX - 20 : yachtX + 140;
    const hornBubbles: Bubble[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: yachtTailX + (Math.random() - 0.5) * 30,
      y: 90 + Math.random() * 20,
      size: Math.random() * 9 + 5,
      speed: Math.random() * 2 + 1,
      alpha: 0.9,
    }));
    setBubbles(prev => [...prev.slice(-30), ...hornBubbles]);
    setTimeout(() => setIsHornActive(false), 1200);
  };

  return (
    <>
      {/* Permanent Fullscreen Maritime Animation Layer (pointer-events none except interactive nodes) */}
      <div
        className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
        style={{ minHeight: '100vh' }}
        onClick={handleOceanClick}
      >
        {/* Animated Sailing Yacht */}
        {(mode === 'both' || mode === 'yacht') && (
          <div
            className="absolute top-20 pointer-events-auto cursor-pointer transition-transform duration-300"
            style={{
              transform: `translate3d(${yachtX}px, 0, 0) scaleX(${yachtDirection})`,
              zIndex: 25,
            }}
            onClick={e => {
              e.stopPropagation();
              triggerHorn();
            }}
            title="Marina Valérielle Yacht (คลิกเพื่อบีบแตรเรือและปล่อยฟองคลื่น!)"
          >
            {/* Horn soundwave / sparkle indicator */}
            {isHornActive && (
              <div
                className="absolute -top-7 left-12 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#134C65] text-amber-200 shadow-md animate-bounce pointer-events-none whitespace-nowrap"
                style={{ transform: `scaleX(${yachtDirection})` }}
              >
                ⚓ Chime · Bon Voyage!
              </div>
            )}

            <div className="relative animate-yacht-bob">
              {/* Luxury Motor Yacht SVG */}
              <svg width="130" height="60" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                {/* Yacht Hull */}
                <path
                  d="M10 52 L145 52 C152 48 158 40 160 36 L125 36 L120 28 L95 28 L90 20 L55 20 L45 36 L25 36 L5 48 Z"
                  fill="#152740"
                />
                {/* Sleek Golden Stripe */}
                <path
                  d="M12 51 L150 51 L153 47 L15 47 Z"
                  fill="#B69A5A"
                />
                {/* White Deck Cabins */}
                <path
                  d="M48 36 L118 36 L112 28 L56 28 Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M60 28 L100 28 L94 20 L66 20 Z"
                  fill="#E9F1F6"
                />
                {/* Tinted Panoramic Deck Windows */}
                <path
                  d="M62 33 L110 33 L106 30 L66 30 Z"
                  fill="#134C65"
                  opacity="0.85"
                />
                <path
                  d="M72 26 L92 26 L89 22 L74 22 Z"
                  fill="#134C65"
                  opacity="0.85"
                />
                {/* Radar Mast & Navigation Lights */}
                <line x1="80" y1="20" x2="80" y2="8" stroke="#487F86" strokeWidth="2" />
                <line x1="74" y1="12" x2="86" y2="12" stroke="#487F86" strokeWidth="1.5" />
                <circle cx="80" cy="7" r="2.5" fill="#B69A5A" className="animate-pulse" />
                {/* Rear Ensign Flag */}
                <path d="M12 40 L3 37 L3 45 L12 42 Z" fill="#EF4444" opacity="0.9" />

                {/* Foaming Water Wake Behind */}
                <path
                  d="M5 54 Q -10 55 -25 58"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                <path
                  d="M15 55 Q 0 57 -15 60"
                  stroke="#D8F0F5"
                  strokeWidth="2"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Swimming Schools of Fish */}
        {(mode === 'both' || mode === 'fish') &&
          fishes.map(fish => (
            <div
              key={fish.id}
              className="absolute pointer-events-auto cursor-pointer transition-transform"
              style={{
                transform: `translate3d(${fish.x}px, ${fish.y}px, 0) scaleX(${fish.direction})`,
                opacity: 0.85 * fish.depth,
                zIndex: 12,
              }}
              onClick={e => {
                e.stopPropagation();
                // Spawn ripple bubbles around fish
                const fishBubbles: Bubble[] = Array.from({ length: 4 }).map((_, i) => ({
                  id: Date.now() + i,
                  x: fish.x + (Math.random() - 0.5) * 20,
                  y: fish.y + (Math.random() - 0.5) * 20,
                  size: Math.random() * 6 + 3,
                  speed: Math.random() * 1.8 + 1,
                  alpha: 0.8,
                }));
                setBubbles(prev => [...prev.slice(-30), ...fishBubbles]);
              }}
              title="Tropical Marine Fish (คลิกเพื่อสร้างฟองน้ำรอบตัวปลา!)"
            >
              <div className="animate-fish-swim">
                <svg
                  width={fish.size}
                  height={fish.size * 0.55}
                  viewBox="0 0 60 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-xs"
                >
                  {/* Fish Body */}
                  <path
                    d="M15 17 C 22 7, 45 7, 55 17 C 45 27, 22 27, 15 17 Z"
                    fill={fish.color}
                  />
                  {/* Dorsal Fin */}
                  <path
                    d="M28 10 Q 38 4 44 11 Z"
                    fill={fish.tailColor}
                    opacity="0.9"
                  />
                  {/* Pectoral Fin */}
                  <path
                    d="M32 17 Q 38 22 30 24 Z"
                    fill={fish.tailColor}
                    opacity="0.8"
                  />
                  {/* Tail with realistic oscillation */}
                  <g className="animate-fish-tail">
                    <path
                      d="M15 17 L 3 8 Q 8 17 3 26 Z"
                      fill={fish.tailColor}
                    />
                  </g>
                  {/* Eye */}
                  <circle cx="48" cy="15" r="2" fill="#FFFFFF" />
                  <circle cx="49" cy="15" r="1" fill="#152740" />
                  {/* Decorative stripe */}
                  <path
                    d="M36 10 Q 38 17 36 24"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                </svg>
              </div>
            </div>
          ))}

        {/* Floating Ocean Bubbles */}
        {bubbles.map(b => (
          <div
            key={b.id}
            className="absolute rounded-full border border-sky-300/80 bg-white/40 pointer-events-none backdrop-blur-xs"
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.alpha,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 6px rgba(186, 230, 253, 0.6)',
            }}
          />
        ))}
      </div>

      {/* Interactive Maritime Life Control Widget (Bottom Left floating dock) */}
      <div className="fixed bottom-5 left-5 z-40">
        {!showControls ? (
          <button
            onClick={() => setShowControls(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white/90 hover:bg-white text-[#134C65] rounded-full shadow-lg border border-[#134C65]/15 backdrop-blur-md text-xs font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="ปรับแต่งปลาและเรือยอร์ชที่ขยับได้ (Maritime Element Settings)"
          >
            <Waves className="w-4 h-4 text-[#487F86] animate-pulse" />
            <span className="hidden sm:inline">Element ทะเล & เรือ</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </button>
        ) : (
          <div className="bg-white/95 rounded-2xl shadow-xl border border-[#134C65]/15 backdrop-blur-md p-4 w-72 text-xs text-[#152740] animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-1.5 font-semibold text-[#134C65]">
                <Waves className="w-4 h-4 text-[#487F86]" />
                <span>Maritime Elements · ทะเลมีชีวิต</span>
              </div>
              <button
                onClick={() => setShowControls(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold px-1 rounded-sm"
              >
                ✕
              </button>
            </div>

            {/* Mode Selector */}
            <div className="mb-3">
              <label className="block text-[11px] font-medium text-slate-500 mb-1.5">
                เลือก Element ที่แสดงในทุกหน้า:
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => handleModeSelect('both')}
                  className={`py-1 text-center font-medium rounded-md transition-colors ${
                    mode === 'both' ? 'bg-white text-[#134C65] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  เรือ & ปลา
                </button>
                <button
                  onClick={() => handleModeSelect('yacht')}
                  className={`py-1 text-center font-medium rounded-md transition-colors ${
                    mode === 'yacht' ? 'bg-white text-[#134C65] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  เฉพาะเรือ
                </button>
                <button
                  onClick={() => handleModeSelect('fish')}
                  className={`py-1 text-center font-medium rounded-md transition-colors ${
                    mode === 'fish' ? 'bg-white text-[#134C65] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  เฉพาะปลา
                </button>
              </div>
            </div>

            {/* Speed Adjustment */}
            <div className="mb-3">
              <div className="flex justify-between items-center text-[11px] font-medium text-slate-500 mb-1">
                <span>ความเร็วการว่าย / ล่องเรือ:</span>
                <span className="font-semibold text-[#134C65]">{speedMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.25"
                value={speedMultiplier}
                onChange={e => setSpeedMultiplier(parseFloat(e.target.value))}
                className="w-full accent-[#134C65] cursor-pointer"
              />
            </div>

            {/* Interactive actions */}
            <div className="flex gap-2 pt-1 border-t border-slate-100">
              <button
                onClick={triggerHorn}
                className="flex-1 py-1.5 px-2 bg-[#E9F1F6] hover:bg-[#D8F0F5] text-[#134C65] rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Anchor className="w-3.5 h-3.5 text-[#B69A5A]" />
                บีบแตรเรือ
              </button>
              <button
                onClick={e => {
                  // Spawn bubbles in middle
                  const midX = window.innerWidth / 2;
                  const midY = window.innerHeight / 2;
                  const centerBubbles: Bubble[] = Array.from({ length: 8 }).map((_, i) => ({
                    id: Date.now() + i,
                    x: midX + (Math.random() - 0.5) * 120,
                    y: midY + (Math.random() - 0.5) * 120,
                    size: Math.random() * 10 + 5,
                    speed: Math.random() * 2 + 1,
                    alpha: 0.9,
                  }));
                  setBubbles(prev => [...prev.slice(-30), ...centerBubbles]);
                }}
                className="flex-1 py-1.5 px-2 bg-[#F0ECDA] hover:bg-[#e7e1cb] text-[#152740] rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B69A5A]" />
                ปล่อยฟองน้ำ
              </button>
            </div>
            <p className="mt-2 text-[10px] text-slate-400 text-center">
              💡 คลิกพื้นที่ใดๆ บนหน้าจอเพื่อสร้างฟองน้ำ & ปลุกปลา
            </p>
          </div>
        )}
      </div>
    </>
  );
};
