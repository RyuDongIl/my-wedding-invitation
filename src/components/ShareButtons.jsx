import { useEffect } from 'react';

const KAKAO_JAVASCRIPT_KEY = '[지난번발급받은JavaScript키]';
const INVITATION_URL = 'https://yumi-dongil-wedding-invitation.vercel.app';
const SHARE_IMAGE_URL = `${INVITATION_URL}/images/07-IMG_1249-.webp`;

export default function ShareButtons() {
  useEffect(() => {
    if (!window.Kakao) return;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  const copyInvitationLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    window.alert('청첩장 링크가 복사되었습니다.');
  };

  const shareToKakao = () => {
    if (!window.Kakao?.Share) {
      window.alert('카카오톡 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '동일 & 유미 결혼식에 초대합니다',
        description: '2026년 11월 21일 토요일 오후 12시\n서울대학교 교수회관',
        imageUrl: SHARE_IMAGE_URL,
        link: {
          mobileWebUrl: INVITATION_URL,
          webUrl: INVITATION_URL,
        },
      },
      buttons: [
        {
          title: '모바일 청첩장 보기',
          link: {
            mobileWebUrl: INVITATION_URL,
            webUrl: INVITATION_URL,
          },
        },
      ],
    });
  };

  return (
    <section className="px-8 pb-16 text-center">
      <div className="mx-auto grid max-w-[340px] grid-cols-2 gap-3">
        <button
          type="button"
          onClick={copyInvitationLink}
          className="rounded-sm border border-[#E2DFD9] bg-white py-3 text-xs tracking-wide text-[#5C5752] transition hover:bg-[#F7F5F1]"
        >
          링크 복사
        </button>
        <button
          type="button"
          onClick={shareToKakao}
          className="rounded-sm bg-[#FEE500] py-3 text-xs font-medium tracking-wide text-[#3A1D1D] transition hover:bg-[#F6DD00]"
        >
          카카오톡 공유
        </button>
      </div>
    </section>
  );
}
