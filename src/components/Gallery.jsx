const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85',
    alt: '부드러운 햇살 아래 웨딩 부케를 든 모습',
  },
  {
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=85',
    alt: '서로 손을 잡은 신랑 신부',
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85',
    alt: '따뜻한 야외 웨딩 분위기',
  },
];

export default function Gallery() {
  return (
    <section className="border-y border-stone-200/80 px-7 py-16 text-center">
      <p className="font-serif text-2xl tracking-[0.2em] text-stone-800">Gallery</p>
      <p className="mt-4 text-sm leading-7 text-stone-500">우리의 첫 편지에 담아두고 싶은 장면들</p>

      <div className="mt-10 space-y-8">
        {galleryImages.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="h-[420px] w-full rounded-sm object-cover shadow-[0_14px_35px_rgba(120,113,108,0.16)]"
          />
        ))}
      </div>
    </section>
  );
}
