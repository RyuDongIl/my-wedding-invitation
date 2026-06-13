import { useEffect, useState } from 'react';

const KAKAO_JAVASCRIPT_KEY = '[지난번발급받은JavaScript키]';
const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
const KAKAO_SDK_SCRIPT_ID = 'kakao-javascript-sdk';
const INVITATION_URL = 'https://yumi-dongil-wedding-invitation.vercel.app';
const SHARE_IMAGE_URL = `${INVITATION_URL}/images/07-IMG_1249-.webp`;

let kakaoSdkLoadPromise;

const initializeKakao = () => {
  if (!window.Kakao) {
    throw new Error('Kakao SDK is not available.');
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
  }

  return window.Kakao.isInitialized();
};

const loadKakaoSdk = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Kakao SDK can only be loaded in a browser.'));
  }

  if (window.Kakao) {
    return Promise.resolve(initializeKakao());
  }

  if (kakaoSdkLoadPromise) {
    return kakaoSdkLoadPromise;
  }

  kakaoSdkLoadPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(KAKAO_SDK_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(initializeKakao()), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Kakao SDK.')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.id = KAKAO_SDK_SCRIPT_ID;
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.onload = () => resolve(initializeKakao());
    script.onerror = () => reject(new Error('Failed to load Kakao SDK.'));

    document.head.appendChild(script);
  }).catch((error) => {
    kakaoSdkLoadPromise = undefined;
    throw error;
  });

  return kakaoSdkLoadPromise;
};

export default function ShareButtons() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadKakaoSdk()
      .then((initialized) => {
        if (isMounted) {
          setIsInitialized(initialized);
        }
      })
      .catch((error) => {
        console.error('카카오 SDK 초기화에 실패했습니다.', error);
        if (isMounted) {
          setIsInitialized(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const copyInvitationLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    window.alert('청첩장 링크가 복사되었습니다.');
  };

  const shareToKakao = () => {
    if (!isInitialized || !window.Kakao?.Share) {
      loadKakaoSdk()
        .then((initialized) => {
          setIsInitialized(initialized);
        })
        .catch((error) => {
          console.error('카카오 SDK 재초기화에 실패했습니다.', error);
          window.alert('카카오톡 공유 기능을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
        });
      return;
    }

    try {
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
    } catch (error) {
      console.error('카카오톡 공유에 실패했습니다.', error);
      window.alert('카카오톡 공유 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
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
          disabled={!isInitialized}
          aria-busy={!isInitialized}
          className="rounded-sm bg-[#FEE500] py-3 text-xs font-medium tracking-wide text-[#3A1D1D] transition hover:bg-[#F6DD00] disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-[#FEE500]"
        >
          카카오톡 공유
        </button>
      </div>
    </section>
  );
}
