import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No ISR/revalidate anywhere in this site (every route is either fully
// static or rendered per-request), so no incremental-cache override is
// needed here — the default is fine.
export default defineCloudflareConfig();
