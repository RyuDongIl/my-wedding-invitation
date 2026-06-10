import { useState } from 'react';

const accountGroups = [
  {
    title: '신랑측 계좌번호',
    accounts: [
      { name: '신랑 동일', bank: '국민은행', number: '123456-78-901234' },
      { name: '혼주 김민수', bank: '신한은행', number: '110-123-456789' },
    ],
  },
  {
    title: '신부측 계좌번호',
    accounts: [
      { name: '신부 유미', bank: '하나은행', number: '987-654321-01234' },
      { name: '혼주 이상호', bank: '우리은행', number: '1002-345-678901' },
    ],
  },
];

export default function Account() {
  const [openIndex, setOpenIndex] = useState(null);

  const copyAccount = async (accountNumber) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(accountNumber);
    }
  };

  return (
    <section className="border-t border-stone-200/80 px-8 py-16 text-center text-stone-700">
      <p className="font-serif text-2xl tracking-[0.2em] text-stone-800">마음 전하실 곳</p>
      <p className="mt-5 text-sm leading-7 text-stone-500">
        참석이 어려우신 분들을 위해
        <br />
        조심스러운 마음으로 계좌를 안내드립니다.
      </p>

      <div className="mt-10 space-y-3 text-left">
        {accountGroups.map((group, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={group.title} className="overflow-hidden rounded-sm border border-stone-200 bg-white/35">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-5 py-4 text-sm text-stone-700"
              >
                <span>{group.title}</span>
                <span className={`text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  ⌄
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-3 border-t border-stone-200 px-5 py-5">
                    {group.accounts.map((account) => (
                      <div
                        key={`${account.bank}-${account.number}`}
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <div className="leading-7">
                          <p className="font-medium text-stone-800">{account.name}</p>
                          <p className="text-stone-500">
                            {account.bank} {account.number}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyAccount(account.number)}
                          className="shrink-0 rounded-full border border-stone-300 px-3 py-1.5 text-xs text-stone-500 transition hover:border-stone-500 hover:text-stone-700"
                        >
                          복사
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
