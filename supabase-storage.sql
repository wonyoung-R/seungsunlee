-- ============================================================
-- Supabase Storage 설정 — work-images 버킷
-- Supabase Dashboard > SQL Editor 에 붙여넣고 Run 하세요
-- ============================================================

-- 1. 퍼블릭 버킷 생성
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'work-images',
  'work-images',
  true,
  10485760,  -- 10MB
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- 2. 인증된 사용자 업로드 허용
CREATE POLICY "auth_upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'work-images');

-- 3. 인증된 사용자 수정 허용
CREATE POLICY "auth_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'work-images');

-- 4. 인증된 사용자 삭제 허용
CREATE POLICY "auth_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'work-images');

-- 5. 퍼블릭 읽기 허용 (포트폴리오 공개)
CREATE POLICY "public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'work-images');
