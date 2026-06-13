import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const galleryImages = [
  '/images/01-IMG_0761_첫장-.webp',
  '/images/02-IMG_0723-.webp',
  '/images/03-IMG_0843-.webp',
  '/images/04-IMG_0497-.webp',
  '/images/05-IMG_0955-.webp',
  '/images/06-IMG_1066-.webp',
  '/images/07-IMG_1249-.webp',
  '/images/08-IMG_3316-.webp',
  '/images/09-IMG_3381-.webp',
  '/images/10-IMG_3564-.webp',
  '/images/11-IMG_4037-.webp',
  '/images/12-IMG_4238-.webp',
  '/images/13-IMG_4298-.webp',
  '/images/14-IMG_2188-.webp',
  '/images/15-IMG_2900-.webp',
  '/images/16-IMG_2452-.webp',
  '/images/17-IMG_3054-.webp',
  '/images/18-IMG_2559-.webp',
  '/images/19-IMG_2748-.webp',
  '/images/20-IMG_3927_막장-.webp',
];

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const showPreviousImage = (event) => {
    event.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const showNextImage = (event) => {
    event.stopPropagation();
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const lightbox = isOpen ? (
    <div
      className="fixed inset-0 z-50 flex h-dvh w-screen items-center justify-center bg-black text-white"
      role="dialog"
      aria-modal="true"
      aria-label="웨딩 사진 미리보기"
      onClick={closeLightbox}
    >
      <p className="absolute left-6 top-[max(1.75rem,env(safe-area-inset-top))] z-10 text-lg font-light tracking-wide text-white/70">
        {currentImage + 1} / {galleryImages.length}
      </p>

      <button
        type="button"
        className="absolute right-6 top-[max(1.25rem,env(safe-area-inset-top))] z-10 text-5xl font-extralight leading-none text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
        onClick={closeLightbox}
        aria-label="갤러리 미리보기 닫기"
      >
        ×
      </button>

      <button
        type="button"
        className="absolute left-0 top-1/2 z-10 flex h-16 w-14 -translate-y-1/2 items-center justify-center bg-black/25 text-6xl font-extralight leading-none text-white/80 transition hover:bg-black/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
        onClick={showPreviousImage}
        aria-label="이전 웨딩 사진 보기"
      >
        ‹
      </button>

      <img
        src={galleryImages[currentImage]}
        alt={`선택한 웨딩 갤러리 사진 ${currentImage + 1}`}
        className="max-h-[82dvh] w-full object-contain"
        onClick={(event) => event.stopPropagation()}
      />

      <button
        type="button"
        className="absolute right-0 top-1/2 z-10 flex h-16 w-14 -translate-y-1/2 items-center justify-center bg-black/25 text-6xl font-extralight leading-none text-white/80 transition hover:bg-black/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
        onClick={showNextImage}
        aria-label="다음 웨딩 사진 보기"
      >
        ›
      </button>
    </div>
  ) : null;

  return (
    <section className="border-y border-stone-200/80 px-7 py-16 text-center">
      <p className="font-serif text-2xl uppercase tracking-[0.35em] text-stone-500">Gallery</p>
      <p className="mt-4 text-sm leading-7 text-stone-500">우리의 첫 편지에 담아두고 싶은 장면들</p>

      <div className="mt-10 grid grid-cols-3 gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            type="button"
            className="aspect-square w-full overflow-hidden bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-4 focus:ring-offset-[#FAF9F6]"
            onClick={() => openLightbox(index)}
            aria-label={`웨딩 사진 ${index + 1} 미리보기 열기`}
          >
            <img
              src={image}
              alt={`웨딩 갤러리 사진 ${index + 1}`}
              className="h-full w-full object-cover"
              loading={index < 9 ? 'eager' : 'lazy'}
            />
          </button>
        ))}
      </div>

      {lightbox && createPortal(lightbox, document.body)}
    </section>
  );
}
