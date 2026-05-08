# seungsunlee.kr — 개발 계획서

> 수정할 부분 직접 고쳐주세요. 확정되면 구현 시작합니다.

---

## 디자인 방향

- 색상: 화이트 / 그레이 / 블랙 텍스트
- 폰트: (현재) Cormorant Garamond + Inter → 유지 또는 변경?
- 레이아웃: 풀페이지 스크롤 (섹션별 한 화면씩)
- 모바일 대응: 있음

---

## 내비게이션

```
home │ about │ work │ contact
```

---

## 섹션별 내용

### 1. Home

**배경 이미지**: 갤러리 복도 사진 (첨부 이미지 — 파일명 미정)
> ✏️ 이미지 파일을 `assets/img/hero-home.webp` 로 저장해서 넣어주세요

**텍스트:**
```
CURATOR │ DOCENT

Where Art Connects

A curatorial philosophy by SEUNGSUN LEE

From Museum to Narrative
```

**CTA 버튼**
```
View Work  |  Contact
```

---

### 2. About

**사진**: 없음 (글만)

**텍스트:**
```
Seungsun Lee (b.1992- S.Korea)

I connect art with people.

Through curatorial projects and narrative-based exhibitions, I explore ways
of experiencing art beyond traditional formats. Moving between museums and
independent projects, I explain how artworks are encountered, understood,
and shared.

As a docent and curator, I go beyond simply presenting artworks. I create
structures that allow audiences to engage, relate, and develop their own
interpretations.

Thank you.
Seungsun Lee
```

---

### 3. Work

**레이아웃**: 카드 그리드 (이미지 + 카테고리 + 제목 + 연도)

**카테고리 3종:**

| 카테고리 | 설명 |
|---|---|
| Curation / Project | 기획 및 큐레이션 작업 |
| Docent | 도슨트 활동 |
| Talk | 강연 및 토크 |

> ✏️ 카테고리명 수정 가능합니다. "Curation / Project" → 하나의 단어로 쓰고 싶으시면 알려주세요.

**초기 데이터 (Admin에서 추가 예정 — 아래는 예시):**

Curation / Project:
- Sisley Paris Exhibition (2024)
- JungKwang Exhibition (2023)

Docent:
- SFMOMA (2024)
- MoMA (2023)
- Sotheby's (2023)
- Dali Museum (2022)
- National Museum of Korea (2022)
- Salon Hannam (2022)
- Picasso (2021)
- Dreams of the Sea (2020)
- Bvulgari (2020)

Talk:
> ✏️ Talk 항목 내용을 알려주세요 (제목 / 연도 / 간단한 설명)

---

### 4. Contact

**이름**: "Contact" (nav) / 내용은 "Connect"

**배경 이미지**: 첨부 이미지
> ✏️ 이미지 파일을 `assets/img/hero-contact.webp` 로 저장해서 넣어주세요

**텍스트:**
```
Connect

A curatorial gaze between art and people
예술과 사람 사이의 시선을 만듭니다.
```

**연락처:**
> ✏️ 아래 내용 확인/수정해주세요

```
Email:    (이메일 주소)
Instagram: @seungsunlee (또는 실제 계정명)
```

---

## Admin 페이지

**목적**: Work 항목을 직접 추가/수정/삭제

**사용 방법 (심플하게):**
1. admin.html 열기
2. 이메일 + 비밀번호로 로그인
3. 새 이력 추가: 카테고리 선택 → 제목/연도/설명/이미지 입력 → 저장
4. 기존 항목 수정/삭제 가능

**DB (Supabase) 테이블 구조:**

| 컬럼 | 내용 |
|---|---|
| id | 자동 생성 |
| title | 작업 제목 |
| category | curation / docent / talk |
| year | 연도 (예: 2024) |
| description | 한 줄 설명 (선택) |
| image_url | 이미지 링크 (선택) |
| created_at | 등록일 (자동) |

---

## 이미지 체크리스트

- [ ] `assets/img/hero-home.webp` — Home 배경 이미지 (갤러리 복도)
- [ ] `assets/img/hero-contact.webp` — Contact 배경 이미지
- [x] `assets/img/docent-*.webp` — Docent 카드용 (기존 파일 재활용)
- [x] `assets/img/sisley.webp` — Curation 카드용
- [x] `assets/img/jungkwang.webp` — Curation 카드용

---

## Supabase 세팅

> ✏️ 아래 중 해당하는 것을 알려주세요

- [ ] Supabase 프로젝트가 이미 있음 → URL / anon key 알려주세요
- [ ] 새로 만들어야 함 → 가입 및 세팅 방법 같이 안내드릴게요

---

## 진행 순서

1. **이 plan.md 확정** (사장님 수정 완료 후)
2. **이미지 2장 저장** (hero-home, hero-contact)
3. **Phase 1**: index.html 전면 재구성
4. **Phase 2**: admin.html 구축
5. **Phase 3**: Supabase 연결 + Work 섹션 동적 로드

---

_수정 완료 후 "확정" 또는 "시작해줘" 라고 말씀해주시면 구현 시작합니다._
