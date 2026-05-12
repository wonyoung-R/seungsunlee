-- ============================================================
-- Migration v4: Soft Delete (deleted_at timestamptz)
-- Supabase Dashboard > SQL Editor 에서 실행하세요
-- ============================================================

-- 1. deleted_at 컬럼 추가 (NULL = 활성, timestamp = 삭제됨)
ALTER TABLE works ADD COLUMN IF NOT EXISTS deleted_at timestamptz DEFAULT NULL;

-- 2. 활성 행 조회 성능을 위한 부분 인덱스
CREATE INDEX IF NOT EXISTS works_active_idx
  ON works (category, sort_order)
  WHERE deleted_at IS NULL;

-- 3. 확인 쿼리
SELECT
  column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'works' AND column_name = 'deleted_at';

SELECT
  count(*) FILTER (WHERE deleted_at IS NULL) AS active,
  count(*) FILTER (WHERE deleted_at IS NOT NULL) AS deleted
FROM works;
