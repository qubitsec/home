# PLURA v7.1 · 제로트러스트 / 가독성 변경 QA

- 빌드: `7.1.2-20260915-zerotrust`
- 점검일: 2026-09-15
- 기준: `PLURA-v7.1-content-enhanced-20260915.zip`

## 결과

| 점검 | 결과 |
|---|---|
| 29개 콘텐츠 페이지 / 181개 페이지·화면폭 조합 | 문서 가로 넘침 없음 |
| 제목·카드·요약 띠·추가 콘텐츠 | 점검 대상 가로 넘침 및 overflow:hidden/clip에 의한 수직 클리핑 없음 |
| 실제 src가 있는 보이는 이미지 | 누락 없음 |
| 브라우저 JavaScript 예외 | 0 |
| PC·모바일 메뉴, Escape, inert, 탭 클릭/키보드, 새 앵커 | 17/17 통과 |
| 로컬 파일·앵커 참조 | 1722건, 오류 0 |
| 로컬 HTTP 리소스 | 79/79 HTTP 200, 디스크 파일 바이트와 일치 |
| 공통 메뉴/푸터 제로트러스트 | 29/29 페이지 반영 |
| 기존 요약 문구 4개 | 동일 |
| PC 요약 제목/설명/SVG | 18px / 15px / 30px |
| 모바일 요약 제목/설명/SVG | 16px / 14px / 26px |
| 기존 주요 제목·본문 크기 (1440/390px 표본) | 변경 없음 |
| pages.css, site.js, 기존 리디렉션 | 바이트 단위 동일 |
| site.css 기존 원문 | 접두부 전체 보존, 하단에만 새 스타일 추가 |
| 글꼴 파일 추가 | 없음 |

## 검사 정의

전체 가로 넘침은 documentElement/body scrollWidth와 화면 폭을 비교했습니다. 대상 요소의 scrollWidth/clientWidth를 점검하고, 수직 넘침은 실제 hidden/clip 스타일이 적용된 경우에만 클리핑으로 판정했습니다. Noto 대체 폰트의 글리프가 제목 line box 아래로 보이는 경우처럼 overflow:visible이고 인접 요소와 겹치지 않는 기존 상태는 클리핑으로 계산하지 않았습니다. 닫힌 확대 dialog의 src 없는 자리표시 이미지도 누락으로 계산하지 않았습니다.

## 테스트 환경과 제한

Chromium의 localhost URL 탐색은 환경 정책상 `ERR_BLOCKED_BY_ADMINISTRATOR`였습니다. 따라서 브라우저 검사는 CSS/JS/이미지를 임시 미리보기 문서로 인라인 주입하여 수행했습니다. 제품 배포 파일은 원래 상대 경로 구조를 그대로 유지했습니다. 외부 웹폰트는 요청하지 않았으며 로컬 Noto Sans CJK KR 등 한국어 대체 폰트로 확인했습니다.

HTTP 검사는 별도 Python HTTP 클라이언트로 `127.0.0.1` 미리보기 서버에 수행했습니다. 운영 서버·Nginx·TLS·SELinux·실제 웹폰트·다른 브라우저의 통합 검증이나 배포 완료를 의미하지 않습니다. 제품 기능의 동작·DoD 인증·7개 영역의 전체 구현을 시험한 것도 아닙니다.

## 증거

- `qa/zerotrust-layout.json`
- `qa/zerotrust-static.json`
- `qa/zerotrust-http-local.json`
- `qa/zerotrust-interactions.json`
- `qa/zerotrust-change-manifest.json`
- `previews/zerotrust-20260915/`

이전 콘텐츠 강화 QA 보고서는 `qa/content-20260915-QA-REPORT.md`에 보존했습니다.
