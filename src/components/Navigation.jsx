const mapLinks = [
  { label: '네이버 지도', href: 'https://map.naver.com/p/search/서울대학교%20교수회관' },
  { label: '카카오 맵', href: 'https://map.kakao.com/?q=서울대학교%20교수회관' },
  { label: '티맵', href: 'https://www.tmap.co.kr' },
];

export default function Navigation() {
  return (
    <section className="px-8 py-16 text-center text-stone-700">
      <p className="font-serif text-2xl tracking-[0.2em] text-stone-800">오시는 길</p>

      <div className="mt-8 space-y-2">
        <h2 className="font-serif text-xl text-stone-800">서울대학교 교수회관</h2>
        <p className="text-sm leading-7 text-stone-500">서울특별시 관악구 관악로 1 서울대학교 내</p>
      </div>

      <div className="mt-8 flex h-56 flex-col items-center justify-center rounded-sm border border-stone-200 bg-stone-200/70 text-stone-400 shadow-inner">
        <span className="text-[11px] uppercase tracking-[0.34em]">Map Placeholder</span>
        <span className="mt-3 text-sm">지도 API 영역</span>
      </div>

      <div className="mt-7 grid grid-cols-3 gap-2">
        {mapLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-stone-300/80 bg-white/40 px-3 py-3 text-xs text-stone-600 transition hover:border-stone-500 hover:bg-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
