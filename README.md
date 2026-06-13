# 11월 모바일 청첩장

React + Vite + Tailwind CSS 기반으로 제작하는 11월 모바일 청첩장 프로젝트입니다.
GitHub에 푸시하면 Vercel에서 바로 감지해 빌드 및 배포할 수 있도록 기본 환경을 구성했습니다.

## 카카오톡 공유 설정

카카오톡 공유는 Kakao JavaScript SDK로 동작하므로, 배포 도메인과 JavaScript 키가 정확히 맞아야 합니다.

1. Kakao Developers에서 애플리케이션을 만들고 **앱 키 > JavaScript 키**를 확인합니다.
2. **앱 설정 > 플랫폼 > Web**에 실제 배포 도메인을 등록합니다.
   - 예: `https://yumi-dongil-wedding-invitation.vercel.app`
   - 로컬에서 테스트하려면 `http://localhost:5173`도 추가합니다.
3. Vercel 프로젝트의 Environment Variables에 `VITE_KAKAO_JAVASCRIPT_KEY`를 등록합니다.
4. 로컬 테스트가 필요하면 `.env.example`을 `.env.local`로 복사한 뒤 실제 키를 입력합니다.
5. 환경 변수를 바꾼 뒤에는 앱을 다시 빌드/배포합니다.
