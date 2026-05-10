import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';
import type { ServiceSliderVideo } from '@/src/content/service-videos';

const IMAGE_INTERVAL_MS = 3000;
const VIDEO_INTERVAL_MS = 6500;

type ServiceCardSliderProps = {
  images: string[];
  alt: string;
  /** When set (and user does not prefer reduced motion), show autoplaying muted video slides. */
  videos?: readonly ServiceSliderVideo[];
  /** Override default height (e.g. hero strip: `h-56 md:h-80`). */
  className?: string;
};

export function ServiceCardSlider({ images, alt, videos, className }: ServiceCardSliderProps) {
  const [active, setActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const useVideos = Boolean(videos?.length) && !reducedMotion;

  const count = useVideos ? videos!.length : images.length;
  const intervalMs = useVideos ? VIDEO_INTERVAL_MS : IMAGE_INTERVAL_MS;

  const go = useCallback(
    (delta: number) => {
      setActive((prev) => (prev + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [count, intervalMs]);

  const transition = reducedMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className={cn('relative h-[13.5rem] overflow-hidden md:h-[14rem]', className)}>
      <div className="absolute inset-0 z-[1] bg-linear-to-t from-black/55 via-transparent to-black/30" aria-hidden />

      {useVideos ? (
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={active}
            className="absolute inset-0 z-0"
            initial={reducedMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.99 }}
            transition={transition}
          >
            <video
              className="h-full w-full object-cover"
              src={videos![active].src}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-label={`${alt}: ${videos![active].label}`}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={active}
            src={images[active]}
            alt={alt}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={transition}
          />
        </AnimatePresence>
      )}

      {useVideos ? (
        <div
          className="pointer-events-none absolute right-3 top-3 z-[2] rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm"
          aria-hidden
        >
          Video
        </div>
      ) : null}

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-white/25 bg-white/90 p-1.5 text-[#1a3c6e] shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95"
            aria-label={useVideos ? 'Previous video' : 'Previous image'}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-white/25 bg-white/90 p-1.5 text-[#1a3c6e] shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95"
            aria-label={useVideos ? 'Next video' : 'Next image'}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      ) : null}

      <div className="absolute bottom-3 left-1/2 z-[2] flex max-w-[calc(100%-2rem)] -translate-x-1/2 flex-wrap justify-center gap-1">
        {Array.from({ length: count }, (_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(idx)}
            className={`h-1.5 shrink-0 rounded-full transition-all duration-300 ease-out ${
              idx === active ? 'w-7 bg-white shadow-sm' : 'w-2 bg-white/55 hover:bg-white/75'
            }`}
            aria-label={
              useVideos && videos![idx]
                ? `${videos![idx].label} — slide ${idx + 1} of ${count}`
                : `Slide ${idx + 1} of ${count}`
            }
          />
        ))}
      </div>
    </div>
  );
}
