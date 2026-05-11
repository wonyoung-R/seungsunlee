-- Migration v3: signature_lecture 카테고리 추가
-- Supabase SQL Editor에서 실행

-- 1. CHECK 제약 갱신 (signature_lecture 추가)
ALTER TABLE works DROP CONSTRAINT IF EXISTS works_category_check;
ALTER TABLE works ADD CONSTRAINT works_category_check
  CHECK (category IN ('curation', 'docent', 'lecture', 'signature_lecture', 'talk'));

-- 2. (선택) 기존 lecture 데이터를 signature_lecture로 이관할 경우:
-- UPDATE works SET category = 'signature_lecture' WHERE category = 'lecture';
