# Database change required for this website

This website reads the product catalogue from the same Supabase project as
the MOKOJI app (`jtvformbjielhhjtnsgh`). Today every catalogue table/view in
that project grants access to the `authenticated` role only — a public
website has no way to sign a visitor in, so without a change it cannot read
any product data.

`migrations/0076_public_website_catalog_access.sql` adds four read-only
`SECURITY DEFINER` functions (browse/search, get-one, list-categories,
get-images) and grants `EXECUTE` on them to `anon`. It does **not** modify
any existing policy, grant, or view, and does not touch table structure or
data. Full reasoning is in the comment header of the file itself.

**I did not run this against your database** — I have no credentials for
your Supabase project. To apply it:

1. Read the file: [`migrations/0076_public_website_catalog_access.sql`](migrations/0076_public_website_catalog_access.sql).
2. Either:
   - Paste it into the Supabase Dashboard → SQL Editor for the
     `jtvformbjielhhjtnsgh` project and run it, or
   - Copy it into the **app repo's** own `supabase/migrations/` folder
     (keeping it as the next-numbered file after `0075_...`) and run
     `supabase db push` from there, so it stays tracked alongside the app's
     migration history.
3. Until this runs, the website falls back to a small local mock catalogue
   (see `src/lib/data/`) so the design/search UI can still be reviewed —
   but that data is clearly marked as mock and must not be mistaken for the
   real catalogue.

## APK hosting (`0077_releases_storage_bucket.sql`)

The website deploys to Cloudflare Workers, which rejects any single static
asset over 25MB — the APK (~68MB) can't ship inside the website's own build.
`migrations/0077_releases_storage_bucket.sql` adds a public `releases`
storage bucket (same public-read/admin-write pattern as the existing
`products` bucket in `0012_storage_buckets_policies.sql`).

To finish wiring the download button:

1. Run `migrations/0077_releases_storage_bucket.sql` the same way as `0076_*`.
2. In the Supabase Dashboard → Storage → `releases` bucket, upload the APK
   file **named exactly `mokoji.apk`** (or update `NEXT_PUBLIC_APK_URL`
   below to match whatever path you actually use).
3. Confirm it's reachable at:
   `https://jtvformbjielhhjtnsgh.supabase.co/storage/v1/object/public/releases/mokoji.apk`
4. That URL is already set as `NEXT_PUBLIC_APK_URL` in `.env.local` — no
   further change needed once the file is uploaded.

When you release a new version, upload the new file under a new name (e.g.
`mokoji-1.1.0.apk`) and update `NEXT_PUBLIC_APK_URL` — don't overwrite the
old file while it might still be mid-download for someone.

## Env vars this website needs

```
NEXT_PUBLIC_SUPABASE_URL=https://jtvformbjielhhjtnsgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<the publishable/anon key from the app's lib/core/config/env.dart>
```

Both are meant to be public (same key already ships inside the compiled
Android/iOS app binary) — see `.env.example` in the project root.
