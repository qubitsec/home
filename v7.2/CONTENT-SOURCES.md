# v7.1 콘텐츠·이미지 출처와 검토 범위

작성일: 2026-09-14

## 사용자 제공 기반 자료

이번 작업은 `PLURA-Website-v7.0.zip`의 전체 콘텐츠·이미지·자료와, 사용자가 최종 선택한 `PLURA-v7.1-A-enterprise.html`의 메인 디자인을 기반으로 합니다. 상위 기획은 `PLURA-XDR_SOC_Website_Strategy_v0.1.md`입니다. 초기 원본은 `home-main.zip`입니다.

현재 공개 홈페이지의 대표 소개는 https://www.plura.io/ko/index.html 에서 확인했습니다. 이번 작업은 제공된 기존 콘텐츠를 새 홈페이지에 이관하는 작업이며, 고객별 계약·제품 성능·인증 유효성·SOC SLA를 새로 조사하거나 검증하는 작업은 아닙니다.

## 자료의 구분

| 자료 | 취급 |
|---|---|
| PLURA 로고·고객사 로고 | 제공된 기존 홈페이지의 공개 이미지 사용 |
| 제품 화면 | 제공된 기존 공개 스크린샷, 새 홈페이지 UI와 구분 |
| 고객 의견 | v7.0에 수록된 기존 공개 의견 유지, 새 추천사 생성 없음 |
| 메인 공격 분석 패널 | 실제 콘솔이 아닌 HTML 설명용 구성 예시 |
| 관제 보고서 예시 | 구성 설명용, 실제 고객 사고 보고서가 아님 |
| Markdown 다운로드 | 도입·증거 확인 체크리스트와 관제 보고서 양식 예시 |
| 외부 영상·문서·상담 | 기존 파일의 공개 연결 유지, 실제 제출·서비스 실행 없음 |
| 글꼴 | `Noto Sans KR` 외부 웹폰트 요청, ZIP에 글꼴 바이너리 없음 |

## 유지한 표현 원칙

PLURA-XDR을 상위 플랫폼으로, WAF·EDR·SIEM·SOAR·Forensic 등을 구성 기능으로 배치합니다. PLURA-XDR + SOC는 플랫폼 위의 전문 관제 운영을 설명합니다. 기능별 우열 비교가 홈페이지의 중심이 되지 않도록 합니다.

정확도·탐지율·시간 단축 수치, 24시간 전문인력 관제, 특정 SLA, 무조건 자동 차단, 모든 공격에 대한 완벽 대응을 새로 확정하지 않았습니다. 설명용 화면을 실제 운영 데이터나 시험 통과 결과처럼 표시하지 않았습니다.

## 공개 전 사업·운영 담당자 확인

실제 AI 기능 범위와 자동화·승인 경계, 관제 운영시간·역할·SLA·보고서, SaaS·구축형 지원 차이, 수집·보관·AI 처리 조건, 고객 로고·의견 공개권한, 인증·지정의 적용 범위와 현재 상태, 전화·주소·외부 양식 등 연락·정책 링크를 최종 확인해야 합니다.

외부 AI 전송 범위, 개인정보 처리, 계약·인증 현황에 대한 법률 검토 또는 제품 성능 검증을 완료했다는 의미는 아닙니다.


## 2026-09-15 · 핵심 기술 콘텐츠 강화의 추가 근거

이번 수정은 사용자가 첨부한 `v7.1.zip`을 기준으로 합니다. 디자인·폰트 크기·기존 CSS·JavaScript·제품 이미지는 그대로 유지하고, 사용자 요청의 세 메시지를 더 직접적으로 설명했습니다.

| 확인한 원문 | 적용한 내용 |
|---|---|
| [PLURA 마이터 어택 기술 문서](https://docs.plura.io/ko/v6/fn/comm/mitre) | ATT&CK 기반 탐지 매트릭스, TID별 탐지·원문 조회, AI 분석·포렌식 연동 |
| [PLURA-EDR 공식 소개](https://www.plura.io/ko/platform_edr.html) | 프로세스·파일·계정의 행위 탐지, 웹셸 후속 실행, 웹·호스트 증거 연결 |
| [PLURA 크리덴셜 스터핑 필터 문서](https://docs.plura.io/ko/v6/fn/comm/filter/security/threshold) | 요청 헤더·본문 ID, 응답 상태·크기, 시도 횟수·ID 수, 세션행위, 탐지/차단 모드 |
| [PLURA 크리덴셜 스터핑 대응 기술](https://blog.plura.io/ko/respond/credential-stuffing-countermeasures/) | 로그인 흐름과 계정·IP·성공/실패 패턴의 분석 관점 |
| [PLURA-WAF 공식 소개](https://www.plura.io/ko/platform_waf.html) | 웹 본문 분석, 계정 공격 탐지·차단, XDR 상관분석 |
| [PLURA AI 기반 제로데이 대응](https://www.plura.io/ko/zero-day.html) | AI의 웹·호스트·계정 분석과 정책 기반 대응 연결 |
| [MITRE T1190](https://attack.mitre.org/techniques/T1190/) | 공개 서비스 취약점 악용의 공식 기법 정의 |
| [MITRE T1505.003](https://attack.mitre.org/techniques/T1505/003/) | Web Shell의 공식 기법 정의 |
| [MITRE T1110.004](https://attack.mitre.org/techniques/T1110/004/) | Credential Stuffing의 공식 기법 정의 |

확인일: 2026-09-15. 기술 이름·기법 ID는 MITRE 공식 원문을 우선했습니다. 일부 공개 제품 문서에 있는 공격 비율·우월성 비교·특허 관련 표현은 이번에 추가하지 않았습니다.

`AI 공격을 AI가 방어합니다`는 사용자가 요청한 대표 메시지입니다. 실제 작동 설명은 AI 분석, 기존 탐지 필터, 정책 기반 차단·격리, 전문 관제의 연결로 구체화했습니다. 완전 자율 공격 검증·모든 공격 차단·MITRE 인증·특정 성능 수치는 새로 약속하지 않았습니다. AI 사용 여부를 모든 공격에서 식별한다거나 AI 공격과 제로데이가 같은 뜻이라는 주장도 하지 않았습니다.


## 2026-09-15 · 제로트러스트 지원 기능 매핑

7개 영역의 기준은 [DoD Zero Trust Strategy의 Figure 3](https://dodcio.defense.gov/Portals/0/Documents/Library/DoD-ZTStrategy.pdf#page=18)입니다. 해당 도식의 원문과 화면을 확인했습니다. NIST의 7개 원칙이나 CISA의 5개 필러와 혼용하지 않았습니다.

PLURA-XDR의 기능은 사용자 제공 최신 사이트 및 [PLURA 제로트러스트](https://www.plura.io/ko/zta.html), [PLURA-SIEM](https://www.plura.io/ko/platform_siem.html), [PLURA-EDR](https://www.plura.io/ko/platform_edr.html), [PLURA Q25](https://blog.plura.io/ko/qna/q25-zta/)의 공식 설명을 참고했습니다. 네트워크·환경/기기·호스트/가시성·분석/자동화·오케스트레이션 4개는 홈페이지용 대표 기능 매핑입니다.

SIEM은 가시성·분석으로, SOAR는 자동화·오케스트레이션으로 구분했습니다. 네트워크 영역의 가시성·웹 방어를 전사 네트워크 세분화나 모든 통신의 제어로 확대하지 않았습니다. 7개 중 4개 표시를 인증·전체 영역 구현·57% 성숙도·모든 세부 요건 통과로 해석하지 않도록 범위를 표시했습니다.

확인일: 2026-09-15. 이전의 핵심 기술 콘텐츠는 유지했습니다.
