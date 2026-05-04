# 이승선 — Seungsun Lee · Curator │ Docent

도슨트 이승선(@sdngazer)의 개인 사이트. Claude Design 시안(8 패널 그리드 + PPT 트랜지션)을 기반으로 [litt.ly/sdngazer](https://litt.ly/sdngazer)의 실제 콘텐츠를 매핑하여 구현.

## 실행

```bash
# 옵션 A: 더블클릭 (가장 간단)
open index.html

# 옵션 B: 로컬 서버 (이미지 캐싱·디버깅 시)
python3 -m http.server 8765
# → http://localhost:8765/index.html
```

브라우저에서 `index.html`을 열면 끝. 외부 빌드 도구 불필요. (React + Babel 인-브라우저 트랜스폼 사용 — 트래픽 적은 도슨트 포트폴리오에 적합한 트레이드오프)

## 파일 구조

```
seungsunlee/
├── index.html              ← 단일 파일 사이트 (모든 React/JSX 인라인)
├── assets/img/             ← litt.ly에서 가져온 16장 (webp)
│   ├── profile.webp        ← @sdngazer 프로필
│   ├── youtube.webp        ← YouTube 채널 아바타
│   ├── sisley.webp         ← Sisley Paris 큐레이션
│   ├── jungkwang.webp      ← 정광 추모전 큐레이션
│   ├── docent-01..09.webp  ← 도슨트 하이라이트 9건
│   └── lecture-01..03.webp ← 기업 강연 3건 (LG·하나·롯데)
├── _design-source/         ← Claude Design 원본 (참고용, 배포 제외)
├── _litt-data.json         ← litt.ly 추출 원본 데이터 (참고용)
├── _screenshots/           ← 검증용 스크린샷
└── README.md
```

`_` 접두사 폴더/파일은 호스팅 시 제외 가능 (참고 자료).

## 8 패널 구조 (디자인 레퍼런스 그대로)

| # | 패널 | 콘텐츠 |
|---|------|--------|
| 1 | Home (와이드) | 포트레이트 + "Where Art Connects to Me" + From Museum to Brand |
| 2 | About | 이승선 / Seungsun Lee / 이력 / 연락 인덱스 |
| 3 | Work | Curating · Docent · Lecture 3 카테고리 개요 |
| 4 | Curating | Sisley Paris (2025) + JungKwang 추모전 |
| 5 | Docent | 9 하이라이트 (SFMOMA · MoMA · Sotheby's · BVLGARI · 국립현대 · …) |
| 6 | Lecture | LG · HANA BANK · LOTTE 기업 강연 3건 |
| 7 | Channel | YouTube @leeseungsun |
| 8 | Contact (와이드) | Email · Instagram · KakaoTalk · YouTube |

## 인터랙션

- **랜딩**: 첫 진입은 Home만 풀스크린. 어디든 클릭하면 8 패널 그리드로 펼쳐짐
- **PPT 트랜지션**: 그리드 카드를 클릭하면 FLIP 기법으로 풀스크린 확장 (700ms)
- **키보드**: ESC로 닫기, ←/→ 로 슬라이드 이동
- **외부 링크**: Docent/Lecture 카드 클릭 → 해당 Instagram 게시물 새 탭, Contact 항목도 각 채널 새 탭
- **모바일** (≤768px): 그리드는 1열로 스택, Docent는 2열 그리드, Home의 좌측 인덱스(01/02/03) 자동 숨김

## 디자인 토큰

- **색**: 배경 `#EDEAE2` (웜 베이지), 텍스트 `#1A1814` (딥 잉크), 헤어라인 `#D8D2C2`
- **타이포**: Cormorant Garamond + Noto Serif KR (헤드라인) / Inter + Noto Sans KR (본문) / JetBrains Mono (캡션·라벨)
- **모션**: `cubic-bezier(0.22, 0.61, 0.36, 1)` out-cubic, 700–1200ms · `prefers-reduced-motion` 자동 비활성

## 검수 필요 항목

| 항목 | 현재 상태 | 권고 |
|------|----------|------|
| About 본문 (한국어 2단락) | litt.ly 사실 기반 자동 작성 | 도슨트 본인 검수 / 자기 소개로 교체 |
| Sisley · 정광 다운로드 PDF | "Instagram 링크"로 대체 | 도슨트 본인 PDF 받아서 `assets/pdf/`에 추가 |
| 하위 페이지 (Docent 개별 케이스 디테일) | 외부 IG 링크로 처리 | 추가 필요 시 `case/<slug>/` 라우트 분리 가능 |
| 도메인 / 호스팅 | 미정 | Vercel · Netlify · GitHub Pages 어디든 정적 파일 그대로 업로드 가능 |

## 콘텐츠 출처

모든 이미지(16장), 9건의 도슨트 하이라이트, 3건의 기업 강연, 2건의 큐레이션, 연락처 4종은 모두 [litt.ly/sdngazer](https://litt.ly/sdngazer) (도슨트 이승선의 공개 링크 인 바이오)에서 직접 추출.

About 본문은 litt.ly의 태그라인("Where Art Connects to Me — From Museum to Brand")과 추출된 사실(SFMOMA · MoMA · Sotheby's · National Museum of Korea · BVLGARI · LG · 하나은행 · 롯데)을 한국어로 풀어 작성한 **draft**. 도슨트 본인의 자기 소개 텍스트로 교체 권고.

가공된 인용문은 사용하지 않았음. 디자인 시안 단계에서 placeholder로 들어있던 *"A docent is not a translator…"* 인용문은 제거하고 litt.ly 실제 태그라인으로 교체.
