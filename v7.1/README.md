# PLURA 홈페이지 v7.1

**확정 디자인: A안 · Enterprise Blue / 화이트·블루**  
**홈페이지 빌드: 7.1.0-20260914**  
이 버전은 PLURA 홈페이지의 버전입니다. 보안 제품 콘솔의 버전이나 기능을 변경한 것이 아닙니다.

## 먼저 열어볼 파일

ZIP을 **새 폴더에 모두 압축 해제**한 뒤 최상단 `index.html`을 열면 `ko/index.html`로 이동합니다. 실제 메인 파일인 `ko/index.html`을 바로 열어도 됩니다.

전체 페이지를 한 번에 확인할 때는 **`site-map.html`**을 여세요. 핵심 19개와 기능·기술 상세 10개, 총 29개 콘텐츠 페이지로 연결됩니다. `site-map.html`은 로컬 검토용이며 운영 사이트에 올릴 필요가 없습니다.

기존에 내려받은 `PLURA-v7.1-A-enterprise.html`은 과거 단일 페이지 시안입니다. 이번 전체 사이트를 확인하려면 **새 ZIP 폴더 안의 파일**을 열어야 합니다. HTML만 다른 폴더로 꺼내면 공통 CSS·JavaScript·이미지가 연결되지 않습니다.

## 이번 버전에서 유지한 것과 확장한 것

선택한 A안의 메인 구조, 화이트·블루 색상, 좌우 분할 첫 화면, 공격 분석 구성 예시, 통합 기능 카드, 위협별 탭, SOC 소개와 도입 상담 흐름을 유지했습니다. A안의 기존 4개 메인 위협 탭은 웹 해킹·웹셸 / 계정 탈취 / 데이터 유출 / 제로데이·우회 공격입니다. 랜섬웨어는 별도 상세 페이지와 전체 위협 대응 메뉴에서 제공합니다.

시안의 본문 앵커 메뉴는 전체 사이트의 실제 하위 페이지 메뉴로 확장했습니다. 모든 콘텐츠 페이지에 동일한 메뉴·로고·푸터·글꼴 체계를 적용하고, 하위 페이지의 첫 화면·카드·표·보고서 예시·상담 양식도 A안에 맞춰 통일했습니다. 선택 전의 B·C 디자인과 v7.0 다크 메인 디자인은 포함하지 않습니다.

하단의 `CONCEPT A` 표시와 시안 설명 팝업은 제거했습니다. 홈페이지 버전은 푸터에 `PLURA WEBSITE / V7.1`로 표시합니다. 실제 제품 화면과 다른 설명용 분석 화면의 **구성 예시 표시는 유지**했습니다.

## 파일 구성

```text
PLURA-Website-v7.1/
  index.html                 로컬 시작 파일 → ko/index.html
  site-map.html              전체 29개 페이지 목록, 로컬 검토용
  ko/                        콘텐츠 29개 + 이전 URL 연결 4개
  res/v7.1/
    css/site.css             A안 메인·공통 메뉴·푸터·폰트 우선순위
    css/pages.css            하위 페이지 공통 디자인
    js/site.js               메뉴·탭·검색·상담 초안 동작
    images/                  기존 공개 로고·고객 로고·제품 화면
    downloads/               실제 내용이 있는 Markdown 자료 3개
  previews/                  PC·모바일 렌더링 이미지
  qa/                        점검 결과 JSON
  tools/preview.py           선택 사항: 로컬 HTTP 미리보기
  page-manifest.json         전체 콘텐츠 페이지 목록
  sitemap-v7.1.xml           한국어 페이지용 사이트맵 후보
  README.md
  CHANGELOG.md
  CONTENT-SOURCES.md
  RELEASE-CHECKLIST.md
  QA-REPORT.md
  SHA256SUMS.txt
```

## 전체 페이지

| 메뉴 | 파일 | 역할 |
|---|---|---|
| 홈 | `ko/index.html` | 통합 플랫폼과 SOC 대표 소개 |
| PLURA-XDR | `ko/platform_xdr.html` | 플랫폼 개요 |
| PLURA-XDR | `ko/ai.html` | AI 분석·대응 |
| PLURA-XDR | `ko/platform.html` | 통합 보안 기능 |
| AI 보안관제 | `ko/platform_soc.html` | PLURA-XDR + SOC |
| AI 보안관제 | `ko/soc-operation.html` | 관제 운영 방식 |
| 위협 대응 | `ko/threats.html` | 대응 개요 |
| 위협 대응 | `ko/web-attack.html` | 웹 해킹·웹셸 |
| 위협 대응 | `ko/underattack.html` | 계정 탈취 |
| 위협 대응 | `ko/data-exfiltration.html` | 데이터 유출 |
| 위협 대응 | `ko/ransomware.html` | 랜섬웨어 |
| 위협 대응 | `ko/zero-day.html` | 제로데이·우회 공격 |
| 고객·자료 | `ko/customer.html` | 고객 사례 |
| 고객·자료 | `ko/validation.html` | 기술 검증·시연 |
| 고객·자료 | `ko/video.html` | 영상·자료실 |
| 고객·자료 | `ko/trust.html` | 기술·신뢰 |
| 도입 안내 | `ko/adoption.html` | 운영 방식·도입 절차 |
| 도입 안내 | `ko/deployment.html` | 배포·데이터 보호 |
| 도입 안내 | `ko/contact.html` | 통합 도입 상담 |
| 기능 상세 | `ko/platform_waf.html` | 웹 보호 |
| 기능 상세 | `ko/platform_edr.html` | 서버·PC 행위 분석 |
| 기능 상세 | `ko/platform_siem.html` | 사건 상관분석 |
| 기능 상세 | `ko/platform_soar.html` | 대응 실행 |
| 기능 상세 | `ko/platform_forensic.html` | 포렌식 증거 확인 |
| 기능 상세 | `ko/platform_vas.html` | 보안 설정 점검 |
| 기능 상세 | `ko/platform_sysmon.html` | 운영 상태 가시성 |
| 기능 상세 | `ko/platform_backup.html` | 로그 보관·관리 |
| 기술 상세 | `ko/mitreattack.html` | MITRE ATT&CK |
| 기술 상세 | `ko/zta.html` | 제로 트러스트 |

이전 주소 연결: `casestudy.html → validation.html`, `pricing.html → adoption.html`, `old-pricing.html → adoption.html`, `platform_secureos.html → platform_edr.html`.

## 글꼴과 로컬 환경

공통 기본 글꼴은 다음 순서입니다.

```css
--font: "Noto Sans KR", "Noto Sans CJK KR", "Apple SD Gothic Neo",
        "Malgun Gothic", Arial, sans-serif;
```

`Noto Sans KR`의 300·400·500·600·700 굵기는 각 HTML의 **Google Fonts 외부 스타일시트 연결**로 요청합니다. 글꼴 파일을 ZIP에 복제하거나 HTML에 내장하지 않았습니다. 사이트 본문·레이아웃·메뉴·이미지·JavaScript는 모두 로컬 파일이지만, 이 웹폰트 요청에는 인터넷 연결이 필요합니다.

인터넷이 끊기거나 회사망에서 해당 외부 폰트를 차단하면 설치된 한글 글꼴로 표시됩니다. 따라서 다른 PC나 오프라인 환경에서 글자 모양과 줄바꿈은 조금 달라질 수 있습니다. 이번 결과가 사용자 PC에서 실제 어떤 글꼴로 표시되는지 원격으로 측정한 것은 아닙니다.

운영 환경에서 기존 PLURA 자체 호스팅 폰트를 사용하려면 각 HTML의 Google Fonts 연결 3줄(preconnect 2개 + stylesheet 1개)을 운영 폰트 CSS 연결로 교체하고, `Noto Sans KR` 이름과 필요한 굵기를 유지하세요. 기존 사이트 CSS 전체를 함께 넣지 말고 **폰트 정의만 연결**해야 v6 레이아웃과 충돌하지 않습니다. Google Fonts 이용 시에는 해당 외부 요청에 대한 조직의 외부 리소스·개인정보 정책도 확인하세요.

리소스 경로를 `res/v7.1/`로 분리했고 CSS·JS 주소에 빌드 쿼리 `?v=7.1.0-20260914`를 붙였습니다. 이전 v7.0 CSS와 혼용하거나 예전 시안 탭을 다시 열지 않도록 새 폴더에서 확인하세요.

## 실제로 구현한 동작

PC 하위 메뉴, 현재 페이지 표시, 모바일 전체 메뉴, Escape 닫기, 모바일 메뉴의 배경 포커스 차단·키보드 순환, 메인·위협 대응 페이지의 탭 전환과 키보드 이동, 자료실 유형 필터·검색·결과 없음 표시, FAQ 펼침, 제품 화면 확대, 상단 이동을 포함합니다.

자료실의 Markdown 3개는 실제 파일로 들어 있습니다. 영상·기술 문서·블로그·로그인·개인정보 처리방침·외부 상담 양식은 기존 외부 서비스로 연결하며 인터넷이 필요합니다. 외부 링크는 새 탭 표시와 `noopener noreferrer`를 사용합니다.

## 상담 양식의 범위

`contact.html`의 **공식 온라인 상담**은 기존 공식 양식을 새 탭에서 엽니다. 외부 양식 자체를 변경하거나 실제 문의를 전송하지 않았습니다.

**상담 내용 작성**은 브라우저에서 이메일 초안을 만드는 기능입니다. 필수 항목·이메일 형식·공백 입력을 검사하고, 선택한 운영 방식과 보호 대상을 초안에 반영합니다. 이메일 앱 열기, 내용 복사, TXT 저장을 제공합니다.

자체 상담 접수 API·CRM 연동·자동 메일 발송·DB 저장은 구현하지 않았습니다. 입력한 내용을 localStorage나 쿠키로 저장하지 않으며, 실제 전송 전에는 ‘접수 완료’라고 표시하지 않습니다. 외부 공식 양식에서 실제 제출하는 행위는 그 서비스의 정책과 동작에 따릅니다.

## 운영 업로드

배포할 파일은 **`ko/`와 `res/v7.1/`**입니다. 둘을 함께 올려야 합니다. 영문·일본어는 이번 작업 범위가 아니며 기존 외부 페이지 연결을 유지했습니다.

**ZIP 최상단 `index.html`은 로컬 시작 파일입니다. 운영 사이트 최상단의 언어·지역 선택용 index.html을 덮어쓰지 마세요.** `site-map.html`, `previews/`, `qa/`, `tools/`, 검토 문서는 공개 배포 대상에서 제외하세요.

현재 콘텐츠 페이지에는 `noindex, follow`가 설정되어 있습니다. 공개 승인이 끝나면 `RELEASE-CHECKLIST.md`에 따라 색인 설정을 변경하고 사이트맵·기존 URL의 서버 301 정책을 적용하세요. 아직 운영 서버에 배포하지 않았습니다.

## 수정 위치

색상·폭·기본 글꼴·메인 디자인·메뉴·푸터는 `res/v7.1/css/site.css`, 하위 페이지 디자인은 `res/v7.1/css/pages.css`, 페이지별 문안은 `ko/각페이지.html`, UI 동작은 `res/v7.1/js/site.js`에 있습니다.

메뉴와 푸터는 서버 include나 JavaScript fetch 없이 표시되도록 각 HTML에 포함되어 있습니다. 공통 메뉴를 변경할 때는 모든 HTML에 같은 변경을 반영하세요.

선택 사항으로 Python 3가 설치된 환경에서는 루트 폴더에서 `python tools/preview.py`를 실행할 수 있습니다. 서버는 127.0.0.1의 임의 사용 가능 포트에만 바인딩되며 별도 설치 패키지가 필요 없습니다. 중지는 Ctrl+C입니다. 이 서버는 검토용이며 운영 서버가 아닙니다.
