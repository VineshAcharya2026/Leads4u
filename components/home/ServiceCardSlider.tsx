import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ServiceCardSlider({ images, alt }: { images: string[]; alt: string }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative h-[13.5rem] overflow-hidden md:h-[14rem]">
      <div className="absolute inset-0 z-[1] bg-linear-to-t from-black/55 via-transparent to-black/30" aria-hidden />
      <img
        src={images[activeImage]}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-white/25 bg-white/90 p-1.5 text-[#1a3c6e] shadow-md backdrop-blur-sm transition hover:bg-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
            className="absolute right-3 top-1/2 z-[2] -translate-y-1/2 rounded-full border border-white/25 bg-white/90 p-1.5 text-[#1a3c6e] shadow-md backdrop-blur-sm transition hover:bg-white"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
      <div className="absolute bottom-3 left-1/2 z-[2] flex -translate-x-1/2 gap-1">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveImage(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === activeImage ? 'w-7 bg-white shadow-sm' : 'w-2 bg-white/55 hover:bg-white/75'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
