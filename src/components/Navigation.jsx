import { useEffect, useRef, useState } from 'react';

const KAKAO_MAP_APP_KEY = import.meta.env.VITE_KAKAO_MAP_APP_KEY || 'a536ccaa47cdf0b8e4ef6f5eb234cc7b';
const KAKAO_MAP_SDK_ID = 'kakao-map-sdk';
const VENUE_NAME = '서울대학교 교수회관 실내 예식';
const VENUE_ADDRESS = '서울 관악구 관악로 1 65동';
const KAKAO_MAP_URL = 'https://place.map.kakao.com/11477726?t_src=kakaotalk&referrer=kakaotalkbrowser';

const transitRoutes = [
  {
    station: '2호선 낙성대역 (4번 출구)',
    steps: [
      'GS주유소 끼고 좌회전 후 우회전',
      '제과점 앞 정류장에서 마을버스 2-1번 탑승',
      '‘공동기기원’ 정류장 하차',
    ],
  },
  {
    station: '2호선 서울대입구역 (3번 출구)',
    steps: ['5511번 버스 탑승', '‘공동기기원’ 정류장 하차'],
  },
  {
    station: '신림선 관악산역 (1번 출구)',
    steps: ['5511번 또는 5516번 버스 탑승', '‘공동기기원’ 정류장 하차'],
  },
];

function loadKakaoMapSdk() {
  if (window.kakao?.maps) {
    return Promise.resolve(window.kakao);
  }

  const existingScript = document.getElementById(KAKAO_MAP_SDK_ID);

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener('load', () => resolve(window.kakao), { once: true });
      existingScript.addEventListener('error', reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = KAKAO_MAP_SDK_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.addEventListener('load', () => resolve(window.kakao), { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });
}

export default function Navigation() {
  const mapRef = useRef(null);
  const [isMapUnavailable, setIsMapUnavailable] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadKakaoMapSdk()
      .then((kakao) => {
        kakao.maps.load(() => {
          if (!isMounted || !mapRef.current) {
            return;
          }

          const renderMap = (latitude, longitude) => {
            const position = new kakao.maps.LatLng(latitude, longitude);
            const map = new kakao.maps.Map(mapRef.current, {
              center: position,
              level: 3,
            });

            new kakao.maps.Marker({
              map,
              position,
              title: VENUE_NAME,
            });
          };

          const showUnavailableMap = () => {
            if (isMounted) {
              setIsMapUnavailable(true);
            }
          };

          const places = new kakao.maps.services.Places();

          places.keywordSearch(VENUE_ADDRESS, (placeResult, placeStatus) => {
            if (!isMounted || !mapRef.current) {
              return;
            }

            if (placeStatus === kakao.maps.services.Status.OK && placeResult.length > 0) {
              renderMap(placeResult[0].y, placeResult[0].x);
              return;
            }

            const geocoder = new kakao.maps.services.Geocoder();

            geocoder.addressSearch(VENUE_ADDRESS, (addressResult, addressStatus) => {
              if (!isMounted || !mapRef.current) {
                return;
              }

              if (addressStatus !== kakao.maps.services.Status.OK || addressResult.length === 0) {
                showUnavailableMap();
                return;
              }

              renderMap(addressResult[0].y, addressResult[0].x);
            });
          });
        });
      })
      .catch(() => {
        if (isMounted) {
          setIsMapUnavailable(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-[#FAF9F5] px-6 py-16 text-center text-[#333130]">
      <p className="font-serif text-2xl tracking-[0.22em] text-[#333130]">오시는 길</p>

      <div className="mt-10 border-y border-[#EFECE7] py-6">
        <p className="font-serif text-lg leading-8 text-[#333130]">{VENUE_NAME}</p>
        <div className="mt-4 space-y-1 text-sm leading-6 text-[#8A8580]">
          <p>{VENUE_ADDRESS}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-sm border border-[#EFECE7] bg-white/60 shadow-sm">
        <div ref={mapRef} className="h-56 bg-[#EFECE7]/60">
          {isMapUnavailable && (
            <div className="flex h-full flex-col items-center justify-center px-6 text-[#8A8580]">
              <span className="text-[11px] uppercase tracking-[0.34em]">Map Preview</span>
              <span className="mt-3 text-sm leading-6">지도를 불러오지 못했습니다.</span>
            </div>
          )}
        </div>
        <a
          href={KAKAO_MAP_URL}
          target="_blank"
          rel="noreferrer"
          className="block bg-[#333130] px-5 py-4 text-sm font-semibold tracking-[0.08em] text-white transition hover:bg-[#242221]"
        >
          카카오 길찾기 &gt;
        </a>
      </div>

      <div className="mt-10 space-y-10 text-left">
        <article className="border-b border-[#EFECE7] pb-9">
          <h3 className="font-serif text-xl tracking-[0.16em] text-[#333130]">자가용</h3>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-[#333130]">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#333130]" />
              <span>서울대입구역, 낙성대역에서 택시로 5~10분 소요</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#333130]" />
              <span>네비게이션 검색어: ‘서울대학교 교수회관’ 또는 ‘서울대학교 학군단’</span>
            </li>
          </ul>
        </article>

        <article>
          <h3 className="font-serif text-xl tracking-[0.16em] text-[#333130]">대중교통</h3>
          <div className="mt-5 divide-y divide-[#EFECE7] border-y border-[#EFECE7]">
            {transitRoutes.map((route) => (
              <div key={route.station} className="py-5">
                <p className="text-sm font-semibold leading-6 text-[#333130]">{route.station}</p>
                <p className="mt-2 text-sm leading-7 text-[#8A8580]">{route.steps.join(' ➔ ')}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
