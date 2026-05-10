-- ============================================================
-- seungsunlee.kr — v2 마이그레이션
-- Supabase Dashboard > SQL Editor 에서 실행하세요
-- ============================================================

-- 1. lecture 카테고리 추가 (CHECK 제약 재설정)
-- ============================================================
ALTER TABLE works DROP CONSTRAINT IF EXISTS works_category_check;
ALTER TABLE works ADD CONSTRAINT works_category_check
  CHECK (category IN ('curation', 'docent', 'lecture', 'talk'));


-- 2. 다중 이미지 컬럼 추가
--    [{url: string, caption: string}] 형태의 JSON 배열
-- ============================================================
ALTER TABLE works ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]';


-- 3. Storage 버킷 파일 크기 제한 해제
-- ============================================================
UPDATE storage.buckets
  SET file_size_limit = NULL
WHERE id = 'work-images';


-- 4. 확인 쿼리
-- ============================================================
SELECT
  column_name, data_type
FROM information_schema.columns
WHERE table_name = 'works'
ORDER BY ordinal_position;

SELECT id, name, file_size_limit FROM storage.buckets WHERE id = 'work-images';
