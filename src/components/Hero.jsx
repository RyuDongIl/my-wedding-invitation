const heroImage = '/images/07-IMG_1249-.webp';

export default function Hero() {
  return (
    <section className="px-7 pb-14 pt-12 text-center">
      <p className="mb-10 text-[10px] font-medium uppercase tracking-[0.46em] text-stone-500">
        The Wedding Invitation
      </p>

      <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-sm bg-stone-100 shadow-[0_18px_45px_rgba(120,113,108,0.18)]">
        <img
          src={heroImage}
          alt="서로 기대어 다정하게 포즈를 취한 동일과 유미"
          className="h-[430px] w-full object-cover object-[50%_45%]"
        />
      </div>

      <div className="mt-11 font-serif text-stone-800">
        <p className="text-[15px] tracking-[0.34em] text-stone-500">DONGIL · YUMI</p>
        <h1 className="mt-4 text-4xl font-normal tracking-[0.18em]">
          동일 <span className="text-2xl text-stone-400">그리고</span> 유미
        </h1>
        <div className="mt-7 space-y-2 text-[15px] leading-7 text-stone-600">
          <p>2026년 11월 7일 토요일 오전 11시</p>
          <p>서울대학교 교수회관 2층 예식장</p>
        </div>
      </div>
    </section>
  );
}
