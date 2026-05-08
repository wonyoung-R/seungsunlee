-- ============================================================
-- seungsunlee.kr — Supabase 초기 세팅
-- Supabase Dashboard > SQL Editor 에 붙여넣고 Run 하세요
-- ============================================================


-- 1. 테이블 생성
-- ============================================================
CREATE TABLE IF NOT EXISTS works (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text        NOT NULL,
  subtitle    text,
  category    text        NOT NULL CHECK (category IN ('curation', 'docent', 'talk')),
  year        int,
  description text,
  image_path  text,
  link        text,
  sort_order  int         DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);


-- 2. 보안 (RLS)
-- ============================================================
ALTER TABLE works ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 (포트폴리오 공개)
CREATE POLICY "public_read" ON works
  FOR SELECT USING (true);

-- 로그인한 사용자만 쓰기 가능 (Admin 전용)
CREATE POLICY "auth_write" ON works
  FOR ALL USING (auth.role() = 'authenticated');


-- 3. 초기 데이터 입력
-- ============================================================

-- Curation / Project (2건)
INSERT INTO works (title, subtitle, category, year, description, image_path, link, sort_order) VALUES

  ('Sisley Paris Curation',
   'The Trois Cinq Friendland',
   'curation', 2025,
   'The Sisley Young Artist Award · Seoul',
   'assets/img/sisley.webp',
   'https://www.instagram.com/sdngazer/',
   1),

  ('JungKwang Curation',
   'Jung Gwang : The Origin of Art',
   'curation', NULL,
   '20th Anniversary Memorial Exhibition with the Five Gwanghwa Artists',
   'assets/img/jungkwang.webp',
   'https://www.instagram.com/sdngazer/',
   2);


-- Docent (9건)
INSERT INTO works (title, subtitle, category, year, description, image_path, link, sort_order) VALUES

  ('SFMOMA',
   'Art Tour Director & Docent',
   'docent', 2025, NULL,
   'assets/img/docent-01-sfmoma.webp',
   'https://www.instagram.com/p/DMzLwUYJC9-/',
   1),

  ('NYC MoMA',
   'feat. artist Minjeong An',
   'docent', 2025, NULL,
   'assets/img/docent-02-moma.webp',
   'https://www.instagram.com/p/DPaaRTtjHdu/',
   2),

  ('Salvador Dalí Etching',
   'The Argillet Collection',
   'docent', 2025, NULL,
   'assets/img/docent-03-dali.webp',
   'https://www.instagram.com/p/DT2xQYDk7v4/',
   3),

  ('National Museum of Korea',
   'Docent',
   'docent', NULL, NULL,
   'assets/img/docent-04-natkorea.webp',
   'https://www.instagram.com/p/DOX858Pk8zM/',
   4),

  ('Sotheby''s',
   'Henry Moore · Docent',
   'docent', NULL, NULL,
   'assets/img/docent-05-sothebys.webp',
   'https://www.instagram.com/p/DOUou7Sk3CO/',
   5),

  ('BVLGARI',
   'VIP Docent · CCO',
   'docent', 2025, NULL,
   'assets/img/docent-06-bvulgari.webp',
   'https://www.instagram.com/p/DHujcWyyFii/',
   6),

  ('Salon Hannam',
   'VIP · Sotheby''s, Lisson Gallery, Petzel',
   'docent', 2024, NULL,
   'assets/img/docent-07-salonhannam.webp',
   'https://www.instagram.com/p/C_5YyypSwVo/',
   7),

  ('Pablo Picasso',
   '25 Years of Edition Ceramics · LGE',
   'docent', NULL, NULL,
   'assets/img/docent-08-picasso.webp',
   'https://www.instagram.com/p/C_VHxIgSS9Z/',
   8),

  ('Dreams in Form',
   'Prints of Four Masters · Chagall · Miró · Dalí · Fontana',
   'docent', NULL, NULL,
   'assets/img/docent-09-dreams.webp',
   'https://www.instagram.com/p/DEPNmj5JldK/',
   9);


-- Talk (3건)
INSERT INTO works (title, subtitle, category, year, description, image_path, link, sort_order) VALUES

  ('LG',
   'Where Art Connects to Me',
   'talk', NULL,
   'Corporate Lecture',
   'assets/img/lecture-01-lg.webp',
   'https://www.instagram.com/p/DLH9G_GpuvF/',
   1),

  ('HANA BANK',
   'VIP Lecture · NYC BIG3 MUSEUM',
   'talk', NULL,
   'Corporate Lecture',
   'assets/img/lecture-02-hana.webp',
   'https://www.instagram.com/p/DRjnjhnEwuj/',
   2),

  ('LOTTE',
   'Where Art Connects to Me',
   'talk', NULL,
   'Corporate Lecture',
   'assets/img/lecture-03-lotte.webp',
   'https://www.instagram.com/p/DIvzTrjJ5ND/',
   3);


-- 4. 확인 쿼리 (실행 후 데이터 보기)
-- ============================================================
SELECT category, count(*) FROM works GROUP BY category ORDER BY category;
