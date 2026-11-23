import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export const HLSVideo: React.FC<HLSVideoProps> = ({
  src,
  poster,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Apple HLS fallback (Safari, iOS)
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  );
};
