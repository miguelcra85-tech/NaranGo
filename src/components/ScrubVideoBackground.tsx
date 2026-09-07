import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ScrubVideoBackgroundProps {
  videoSrc?: string;
}

const CLOUDINARY_VIDEO_URL =
  'https://res.cloudinary.com/hw31kdln/video/upload/v1788758454/portada-huerto_namsyo.mp4';
const TOTAL_FRAMES = 24;

export const ScrubVideoBackground: React.FC<ScrubVideoBackgroundProps> = ({
  videoSrc = CLOUDINARY_VIDEO_URL,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [videoReady, setVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [canvasDrawn, setCanvasDrawn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const frameImagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  // 1. Preload keyframes cache for canvas fallback
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, '0');
      img.src = `${import.meta.env.BASE_URL}frames/frame_${num}.jpg`;
      images.push(img);
    }
    frameImagesRef.current = images;

    if (images[0]) {
      images[0].onload = () => {
        renderCanvasFrame(0);
      };
    }
  }, []);

  // 2. High-performance Canvas rendering (object-fit: cover)
  const renderCanvasFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images = frameImagesRef.current;
    let img = images[frameIdx];

    if (!img || !img.complete || img.naturalWidth === 0) {
      img = images[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let renderWidth = cw;
    let renderHeight = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = cw / imgRatio;
      offsetY = (ch - renderHeight) / 2;
    } else {
      renderWidth = ch * imgRatio;
      offsetX = (cw - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    lastDrawnFrameRef.current = frameIdx;
    setCanvasDrawn(true);
  }, []);

  // 3. Resize canvas to match device pixel ratio
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const frameIdx = lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0;
    renderCanvasFrame(frameIdx);
  }, [renderCanvasFrame]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // 4. Handle video metadata and readiness
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    if (video.duration && !isNaN(video.duration)) {
      video.currentTime = progress * video.duration;
    }
    setVideoReady(true);
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setVideoReady(true);
  };

  // 5. Scroll-driven synchronization with requestAnimationFrame
  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      targetProgressRef.current = progress;
    };

    const loop = () => {
      // Smooth interpolation for fluid real-time scrubbing
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.35;
      } else {
        currentProgressRef.current = target;
      }

      const activeProgress = currentProgressRef.current;
      setScrollProgress(activeProgress);

      // A. Synchronize native video currentTime: scrollPercentage * duration
      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        const targetTime = activeProgress * video.duration;
        const clampedTime = Math.min(video.duration - 0.001, Math.max(0, targetTime));
        if (Math.abs(video.currentTime - clampedTime) > 0.005) {
          video.currentTime = clampedTime;
        }
      }

      // B. Synchronize canvas fallback
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(activeProgress * (TOTAL_FRAMES - 1)))
      );
      renderCanvasFrame(frameIdx);

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    currentProgressRef.current = targetProgressRef.current;
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [renderCanvasFrame]);

  return (
    <div
      id="video-scrub-container"
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      {/* 1. Static Poster backup (Lowest layer, z-index -3) */}
      {!canvasDrawn && (
        <img
          src={`${import.meta.env.BASE_URL}vimeo-poster.jpg`}
          alt="Huerto Naran Go"
          className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -3,
          }}
        />
      )}

      {/* 2. Keyframe Canvas Fallback (Active while video loads or as fallback, z-index -2) */}
      <canvas
        ref={canvasRef}
        id="scroll-fallback-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -2,
        }}
      />

      {/* 3. Native HTML5 Video Element with position: fixed; inset: 0; z-index: -1; object-fit: cover */}
      <video
        ref={videoRef}
        id="native-scroll-scrub-video"
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onError={() => setHasVideoError(true)}
        className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
          videoReady && !hasVideoError ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* Subtle Scroll Scrubbing Indicator in the bottom right corner */}
      <div className="fixed bottom-4 right-4 z-10 opacity-40 hover:opacity-90 transition-opacity hidden sm:flex items-center gap-2 text-[10px] text-white/80 font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
        <span>Scrub: {Math.round(scrollProgress * 100)}%</span>
      </div>
    </div>
  );
};
