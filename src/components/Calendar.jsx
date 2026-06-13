const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
const days = Array.from({ length: 30 }, (_, index) => index + 1);

function getDDayText() {
  const weddingDate = new Date('2026-11-07T11:00:00+09:00');
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const weddingStart = new Date(
    weddingDate.getFullYear(),
    weddingDate.getMonth(),
    weddingDate.getDate(),
  );
  const diffDays = Math.ceil((weddingStart - todayStart) / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `동일과 유미의 결혼식이 ${diffDays}일 남았습니다.`;
  if (diffDays === 0) return '오늘, 동일과 유미가 결혼합니다.';
  return `동일과 유미가 결혼한 지 ${Math.abs(diffDays)}일째입니다.`;
}

export default function Calendar() {
  return (
    <section className="px-8 py-16 text-center text-stone-700">
      <p className="text-[11px] uppercase tracking-[0.42em] text-stone-400">Wedding Day</p>
      <h2 className="mt-3 font-serif text-3xl font-normal tracking-[0.12em] text-stone-800">
        2026. 11
      </h2>

      <div className="mx-auto mt-10 max-w-[320px] rounded-sm border border-stone-200/80 bg-white/35 p-5 shadow-sm shadow-stone-200/60">
        <div className="grid grid-cols-7 gap-y-4 text-xs text-stone-400">
          {weekdays.map((weekday, index) => (
            <span key={weekday} className={index === 0 ? 'text-rose-400' : ''}>
              {weekday}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-7 gap-y-3 text-sm text-stone-600">
          {days.map((day) => {
            const isSunday = day % 7 === 1;
            const isWeddingDay = day === 7;

            return (
              <div key={day} className="flex h-9 items-center justify-center">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    isWeddingDay
                      ? 'bg-[#D8B8A8] font-semibold text-white shadow-[0_8px_18px_rgba(216,184,168,0.45)]'
                      : isSunday
                        ? 'text-rose-400'
                        : 'text-stone-600'
                  }`}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-8 text-sm leading-7 text-stone-500">{getDDayText()}</p>
    </section>
  );
}
