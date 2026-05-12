-- ============================================================
-- Migration v5: Realtime publication 활성화 (works 테이블)
-- 목적: admin 변경 시 공개 사이트 즉시 자동 갱신
-- Supabase Dashboard > SQL Editor 에서 실행하세요
-- ============================================================

-- 1. supabase_realtime publication에 works 추가
ALTER PUBLICATION supabase_realtime ADD TABLE works;

-- 2. 확인 쿼리 — works가 publication에 있는지
SELECT
  pubname, schemaname, tablename
FROM pg_publication_tables
WHERE tablename = 'works';
