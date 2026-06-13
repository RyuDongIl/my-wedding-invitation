import { useState } from 'react';

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
  const [currentImage, setCurrentImage] = useState(null);

  const openLightbox = (image) => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setCurrentImage(null);
  };

  return (
    <section className="border-y border-stone-200/80 px-7 py-16 text-center">
      <p className="font-serif text-2xl tracking-[0.2em] text-stone-800">Gallery</p>
      <p className="mt-4 text-sm leading-7 text-stone-500">우리의 첫 편지에 담아두고 싶은 장면들</p>

      <div className="mt-10 space-y-8">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            type="button"
            className="block w-full overflow-hidden rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-4 focus:ring-offset-[#FAF9F6]"
            onClick={() => openLightbox(image)}
            aria-label={`웨딩 사진 ${index + 1} 크게 보기`}
          >
            <img
              src={image}
              alt={`웨딩 갤러리 사진 ${index + 1}`}
              className="h-auto w-full rounded-sm object-cover"
              loading={index < 2 ? 'eager' : 'lazy'}
            />
          </button>
        ))}
      </div>

      {isOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 py-12"
          role="dialog"
          aria-modal="true"
          aria-label="웨딩 사진 크게 보기"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-3xl leading-none text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={closeLightbox}
            aria-label="갤러리 팝업 닫기"
          >
            ×
          </button>

          <img
            src={currentImage}
            alt="선택한 웨딩 갤러리 사진"
            className="max-h-full max-w-full rounded-sm object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
