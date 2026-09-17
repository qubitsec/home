# v7.1 검증 결과

작성일: 2026-09-14  
빌드: 7.1.0-20260914  
디자인 기준: 사용자 선택 A안 Enterprise Blue

## 결과 요약

| 구분 | 결과 |
|---|---|
| 전체 콘텐츠 | 29개 — 핵심 19개 / 기능·기술 상세 10개 |
| 이전 URL 연결 | 4개 |
| 정적 HTML 점검 | 35개 — 콘텐츠·이전 주소·로컬 시작·목록 포함 |
| 로컬 파일 참조 | 1,561건 점검, 누락 0 |
| 앵커 참조 | 83건 점검, 누락 0 |
| 중복 ID·잘못 연결된 탭·h1 개수 | 정적 점검 오류 0 |
| 원본 리소스 HTTP 제공 | 77개 파일, HTTP 200 / 파일 바이트 일치 |
| 반응형 렌더링 | 29개 × 7개 너비 = 203개 조합 |
| 전체 문서 가로 넘침 | 점검 조합에서 0 |
| 렌더러 내 이미지 로드 실패 | 점검 조합에서 0 |
| JavaScript pageerror | 0 |
| 상호작용 | 14개 묶음 PASS |
| 글꼴 바이너리 포함 | 없음 |

너비: **320 / 390 / 600 / 768 / 1024 / 1440 / 1920px**. 문서가 넘치지 않더라도 좁은 화면의 데이터 표는 해당 표 영역 안에서 가로 스크롤하도록 되어 있습니다.

## 렌더링 방식과 해석

Chromium에서 생성된 HTML을 `page.set_content`로 렌더링했습니다. 이때 패키지의 CSS·JavaScript·이미지를 읽어 렌더링용 사본에 인라인으로 넣었습니다. 실제 배포용 HTML과 리소스 파일은 외부 파일 연결 구조 그대로 유지했습니다. 전체 화면 캡처에서는 아래쪽 이미지도 표시되도록 렌더링용 사본에서 이미지 로딩을 eager로 바꿨습니다.

이 실행 환경은 브라우저의 `file://`와 localhost 직접 탐색을 관리자 정책으로 차단했습니다. 따라서 원본 폴더를 브라우저 주소로 직접 여는 통합 테스트는 하지 못했습니다. 대신 원본 파일의 참조·앵커를 정적으로 점검했고, 별도 로컬 HTTP 요청으로 실제 파일 77개의 응답과 원본 바이트가 일치하는지 확인했습니다. 이 두 결과를 실제 Windows Chrome에서 모든 링크를 직접 클릭한 결과라고 해석해서는 안 됩니다.

외부 네트워크 요청은 렌더러 테스트에서 차단했습니다. 화면 캡처는 이 환경에 설치된 대체 글꼴로 렌더링되었습니다. 배포 HTML에는 `Noto Sans KR` 외부 웹폰트 연결이 있지만 Google Fonts의 실제 네트워크 로딩·사용자 PC의 최종 글꼴·운영 서버의 CORS/CSP는 이번 테스트로 확인하지 않았습니다.

## 상호작용 점검

| 점검 | 결과 |
|---|---|
| desktop menu / current page / exclusive open / Escape | PASS |
| mobile menu / inert / submenu / Escape | PASS |
| mobile to desktop reset | PASS |
| home 4 threat tabs / keyboard arrows / End | PASS |
| inner-page scenario tabs | PASS |
| resource filters / search / empty state / reset | PASS |
| FAQ open and close | PASS |
| product image zoom / Escape close | PASS |
| scroll-to-top button | PASS |
| required inputs / whitespace validation | PASS |
| consultation draft / copy fallback / plan selection | PASS |
| consultation TXT Blob content (download click intercepted) | PASS |
| mobile keyboard focus loop | PASS |
| main CTA and complete footer links | PASS |

메인에는 선택한 A안과 같은 4개의 위협 탭이 있습니다. 각 탭의 상세 링크는 웹 해킹·웹셸 / 계정 탈취 / 데이터 유출 / 제로데이 상세에 연결됩니다. 별도 랜섬웨어 페이지도 전체 메뉴에서 열 수 있습니다.

TXT 저장은 생성되는 Blob의 내용·인코딩 텍스트·파일명을 확인했습니다. 테스트에서는 실제 다운로드 클릭을 가로채 OS 파일 저장 창을 열지 않았습니다. 이메일 앱 실행·외부 상담 제출·CRM 연동·실제 접수는 수행하지 않았습니다. 클립보드는 렌더러의 제한 환경에서 내용 선택 대체 동작을 확인했습니다.

## 화면 확인

메인, 플랫폼, AI 분석, SOC, 기능 상세, 위협 대응, 자료실, 도입 방식, 고객 사례와 상담 페이지를 렌더링하고 주요 PC·모바일 화면을 확인했습니다. `previews/`에는 실제 생성 HTML에서 캡처한 화면이 포함되어 있습니다. 제품 스크린샷은 제공된 기존 공개 자료이며, 메인 분석 패널은 설명용 HTML입니다.

## 포함되지 않은 검증

운영 사이트 배포, 실제 Windows·macOS·Android·iOS별 브라우저 검증, 전체 접근성 인증, 실사용 부하·성능 측정, 외부 링크의 현재 서비스 상태 전수 검증, 실제 고객·인증·SOC 계약 검증, 보안 제품 탐지 성능 검증은 수행하지 않았습니다. 공개 전에는 `RELEASE-CHECKLIST.md`의 운영 조건을 확인하세요.

상세 결과: `qa/static-results.json`, `qa/browser-results.json`, `qa/http-resource-results.json`.
