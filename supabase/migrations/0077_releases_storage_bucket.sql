-- ============================================================================
-- 0077_releases_storage_bucket.sql
--
-- Purpose: a public storage bucket to host the MOKOJI Android APK for the
-- website's download button/QR code, since the file (60-100MB+) is too large
-- to ship as a static asset in the website's own deployment (Cloudflare
-- Workers rejects any single asset over 25MB).
--
-- Mirrors the exact pattern already used for the `products` bucket in
-- supabase/migrations/0012_storage_buckets_policies.sql in the app repo:
-- public read for everyone, admin-only write. Purely additive.
-- ============================================================================

insert into storage.buckets (id, name, public) values
  ('releases', 'releases', true)
on conflict (id) do nothing;

create policy "releases_public_read" on storage.objects for select
  using (bucket_id = 'releases');

create policy "releases_admin_write" on storage.objects for insert to authenticated
  with check (bucket_id = 'releases' and public.is_admin());

create policy "releases_admin_update" on storage.objects for update to authenticated
  using (bucket_id = 'releases' and public.is_admin());

create policy "releases_admin_delete" on storage.objects for delete to authenticated
  using (bucket_id = 'releases' and public.is_admin());
