# PLURA 홈페이지 v7.0

**AI 기반 사이버보안 플랫폼 PLURA-XDR + AI 보안관제 중심의 메이저 개편본**

제작일: 2026-09-14

## 시작하기

압축을 모두 해제한 뒤 `index.html` 또는 `ko/index.html`을 브라우저로 열어주세요. HTML·CSS·JavaScript·이미지가 함께 들어 있습니다. 별도 빌드 도구, npm, CDN, 외부 폰트, jQuery, 서버 측 include 또는 fetch 기반 메뉴가 필요하지 않습니다.

함께 제공되는 `PLURA-v7-preview.html`은 29개 콘텐츠 페이지를 한 파일에서 열어보는 별도의 오프라인 검토용 파일입니다. 실제 배포 파일은 이 ZIP의 `ko/` 및 `res/v7/`입니다.

## 구성

- 핵심 콘텐츠 19개 페이지
- 기능·기술 상세 10개 페이지
- 이전 URL 연결용 HTML 4개
- 로컬 시작용 `index.html` 1개
- 공통 CSS·JavaScript와 기존 PLURA 로고·공개 이미지
- 실제 내용이 포함된 마크다운 다운로드 자료 3개
- 페이지 목록과 출시 검토 문서

`v7.0`은 **홈페이지 개편 버전**입니다. 제품 콘솔 버전을 v7으로 변경하거나 새로운 콘솔 기능을 구현한 것이 아닙니다. 서비스 로그인은 기존 공식 XDR 로그인으로 연결합니다.

## 핵심 페이지

| 메뉴 | 파일 |
|---|---|
| 홈 | `ko/index.html` |
| PLURA-XDR 플랫폼 개요 | `ko/platform_xdr.html` |
| AI 분석·대응 | `ko/ai.html` |
| 통합 보안 기능 | `ko/platform.html` |
| PLURA-XDR + SOC | `ko/platform_soc.html` |
| 관제 운영 방식 | `ko/soc-operation.html` |
| 위협 대응 개요 | `ko/threats.html` |
| 웹 해킹·웹셸 | `ko/web-attack.html` |
| 계정 탈취 | `ko/underattack.html` |
| 데이터 유출 | `ko/data-exfiltration.html` |
| 랜섬웨어 | `ko/ransomware.html` |
| 제로데이·우회 공격 | `ko/zero-day.html` |
| 고객 사례 | `ko/customer.html` |
| 기술 검증·시연 | `ko/validation.html` |
| 영상·자료실 | `ko/video.html` |
| 기술·신뢰 | `ko/trust.html` |
| 운영 방식·도입 절차 | `ko/adoption.html` |
| 배포·데이터 보호 | `ko/deployment.html` |
| 통합 도입 상담 | `ko/contact.html` |

기능 상세: `platform_waf.html`, `platform_edr.html`, `platform_siem.html`, `platform_soar.html`, `platform_forensic.html`, `platform_vas.html`, `platform_sysmon.html`, `platform_backup.html`

기술 상세: `mitreattack.html`, `zta.html`

이전 URL 연결: `casestudy.html → validation.html`, `pricing.html → adoption.html`, `old-pricing.html → adoption.html`, `platform_secureos.html → platform_edr.html`

전체 목록: `page-manifest.json`

## 구현한 동작

PC 하위 메뉴와 모바일 전체 메뉴, 키보드 조작과 Escape 닫기, 모바일 배경 콘텐츠의 inert 처리, 메인 증거 탭·위협 시나리오 탭, 자료실 유형 필터·검색·결과 없음 표시, FAQ 펼침, 실제 제품 이미지 확대, 상단 이동, 마크다운 자료 다운로드를 포함합니다.

자료실의 영상·공식 문서·로그인·개인정보 처리방침·온라인 상담은 기존 외부 서비스로 연결되며 인터넷이 필요합니다. 외부 탭 연결은 `noopener noreferrer`를 적용했습니다.

## 상담 기능의 실제 범위

`contact.html`에는 두 경로가 있습니다.

**공식 온라인 상담**은 회사 공식 사이트가 연결한 기존 Google Forms를 새 탭으로 엽니다. 해당 양식은 기존 제품 분류를 포함하므로, v7의 통합 도입 전략에 맞춰 양식 항목도 별도 수정하는 것이 좋습니다. 이 작업에서 외부 양식을 수정하거나 실제 상담을 전송하지 않았습니다.

**상담 초안 작성**은 현재 브라우저에서만 처리합니다. 메일 작성은 기본 이메일 앱을 열며, 복사 또는 TXT 저장도 지원합니다. 서버 접수·CRM 연계·자동 메일 발송·DB 저장·로컬 스토리지 저장은 하지 않습니다. 전송하지 않았는데 ‘접수 완료’라고 표시하지 않습니다. 기본 이메일 앱이 없으면 내용 복사 또는 공식 온라인 상담을 사용합니다.

## 배포 시 유지할 구조

```text
운영 사이트 루트/
  ko/
    index.html
    ... 기타 v7 HTML
  res/
    v7/
      css/site.css
      js/site.js
      images/
      downloads/
```

리소스를 `res/v7/`에 분리해 v6 CSS·JavaScript와 충돌하지 않게 했습니다. 한국어 페이지는 `../res/v7/`를 참조합니다. `ko/index.html` 한 개만 올리면 이미지·스타일·하위 페이지가 누락되므로 **ko/와 res/v7/를 함께 배포**해야 합니다.

**ZIP 최상단 `index.html`은 로컬 검토용 시작 파일입니다. 기존 운영 사이트의 언어·지역 선택용 루트 index.html을 덮어쓰지 마세요.** 영문·일본어 페이지는 새로 제작하지 않았고 기존 공식 페이지로 연결했습니다.

## 공개 전 확인

현재 HTML은 검토본이므로 모든 콘텐츠 페이지에 `noindex, follow`를 설정했습니다. 검토가 끝난 뒤 해당 메타 태그를 삭제하거나 운영 정책에 맞게 변경해야 검색 색인이 가능합니다. 이 상태로 공식 서비스에 무심코 덮어쓰지 마세요.

AI 기능·자동화 범위, 관제시간·SLA·보고 항목, SaaS·구축형 지원 범위, 고객 로고 공개 권한과 적용 범위, 인증·지정의 현 상태·증서, 개인정보 처리방침 및 외부 상담 양식의 문안을 담당자가 확인해야 합니다.

설명용 화면과 문서는 실제 고객 데이터나 시험 결과로 표시하지 않았습니다. 공개 제품 이미지에는 기존 자료임을 표시했습니다. 정확도·탐지율·대응 시간·24시간 전문인력 관제 등을 임의로 확정하지 않았습니다.

이전 URL의 HTML 이동 페이지는 로컬에서도 동작하는 호환용입니다. 운영 배포에서는 웹 서버의 HTTP 301 리다이렉트로 정리하는 것이 좋습니다. 기존 공개 URL을 바로 삭제하거나 백업·개발 파일까지 함께 공개하지 마세요.

## 수정 위치

전역 색상·폭·서체·간격: `res/v7/css/site.css`의 `:root` 및 반응형 구간.

공통 UI 동작: `res/v7/js/site.js`.

페이지별 본문: `ko/각페이지.html`.

메뉴·푸터는 파일로 직접 열어도 표시되도록 각 HTML에 포함되어 있습니다. 메뉴를 수정할 때는 모든 페이지의 공통 영역을 함께 수정해야 합니다. 필요하면 실제 배포 환경에 맞춰 빌드 템플릿으로 관리할 수 있습니다.

폰트 파일을 포함하지 않습니다. 운영체제의 한글 시스템 글꼴을 사용하므로 Windows·macOS 등의 줄바꿈과 글꼴 모양은 약간 달라질 수 있습니다.

검증 결과와 출처·검토 사항은 `QA-REPORT.md`, `CONTENT-SOURCES.md`를 참고하세요.
