export default function Greeting() {
  return (
    <section className="border-y border-stone-200/80 px-8 py-16 text-center text-stone-700">
      <p className="font-serif text-2xl tracking-[0.22em] text-stone-800">초대합니다</p>

      <div className="mt-9 space-y-5 text-[15px] leading-9 tracking-[-0.01em] text-stone-600">
        <p>
          서로의 계절을 바라보며
          <br />
          천천히 같은 마음으로 걸어온 저희가
          <br />
          이제 하나의 이름으로 새 길을 시작합니다.
        </p>
        <p>
          소중한 분들을 모시고
          <br />
          따뜻한 약속의 순간을 나누고자 합니다.
          <br />
          오셔서 축복으로 함께해 주세요.
        </p>
      </div>

      <div className="mt-12 space-y-4 border-t border-stone-200 pt-9 text-sm leading-7 text-stone-600">
        <div className="flex items-center justify-center gap-3">
          <span className="font-medium text-stone-800">김민수 · 박정희</span>
          <span className="text-stone-400">의 장남</span>
          <span className="font-serif text-lg text-stone-800">동일</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="font-medium text-stone-800">이상호 · 최은영</span>
          <span className="text-stone-400">의 장녀</span>
          <span className="font-serif text-lg text-stone-800">유미</span>
        </div>
      </div>
    </section>
  );
}
