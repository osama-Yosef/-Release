# موقع مكوجي

موقع تعريفي لمعرض مكوجي (مكاوي بخار وأجهزة بخار وقطع غيار وإكسسوارات)، مبني بـ Next.js
ويقرأ نفس بيانات المنتجات من Supabase التي يستخدمها تطبيق مكوجي. الموقع لا يبيع مباشرة —
كل طلب وعملية دفع تتم من داخل التطبيق؛ الموقع للتعريف بالمنتجات وتحميل التطبيق.

## قبل التشغيل

1. **الداتابيز**: راجع [`supabase/README.md`](supabase/README.md) — لازم تطبّق
   `supabase/migrations/0076_public_website_catalog_access.sql` على مشروع Supabase
   عشان الموقع يقدر يقرأ المنتجات المنشورة فقط، من غير ما يلمس أي صلاحية موجودة.
   ✅ اتعمل بالفعل.
2. **متغيرات البيئة**: انسخ `.env.example` إلى `.env.local` واملأ القيم (راجع التعليقات
   جوه الملف). شغال دلوقتي بـ `NEXT_PUBLIC_USE_MOCK_CATALOG=false` — يعني بيانات حقيقية
   من Supabase.
3. **روابط التحميل**: ✅ الـ APK متاستضاف كـ GitHub Release asset (مش جوه الموقع نفسه —
   Cloudflare Workers بيرفض أي ملف أكبر من 25MB، وSupabase Storage سقفه 50MB على الخطة
   المجانية). التفاصيل في "APK hosting" في [`supabase/README.md`](supabase/README.md).
4. **بيانات التواصل**: `NEXT_PUBLIC_CONTACT_PHONE` / `_WHATSAPP` / `_EMAIL` — متملية بالبيانات
   اللي بعتيها. لو رقم الواتساب مختلف عن رقم التليفون، عدّلي `NEXT_PUBLIC_CONTACT_WHATSAPP` في
   `.env.local`.

## التشغيل محليًا

```bash
npm install
npm run dev
```

الموقع هيفتح على `http://localhost:3000`.

## البنية

- `src/app/` — الصفحات (Home, Products, Product detail, App/Download, About, Contact, Privacy, Terms)
- `src/lib/data/products.ts` — طبقة الوصول للبيانات؛ بتنده على RPCs في Supabase أو
  على كتالوج تجريبي محلي (`src/lib/mock/`) حسب `NEXT_PUBLIC_USE_MOCK_CATALOG`
- `src/lib/search/normalize-arabic.ts` — نفس منطق تطبيع البحث العربي المستخدم في الداتابيز
- `src/app/api/search/route.ts` — نقطة البحث اللي بيستخدمها الـ autocomplete، فيها rate limiting بسيط
- `supabase/` — الـ migration الجديدة وتوثيقها

## قبل الإطلاق (production)

- ✅ الـ migration اتطبقت، `NEXT_PUBLIC_USE_MOCK_CATALOG=false`
- اضبط `NEXT_PUBLIC_SITE_URL` على الدومين الحقيقي بعد الديبلوي (بيتحكم في sitemap وروابط SEO)
- ✅ الـ APK متاستضاف على GitHub Releases (راجع `supabase/README.md`) — أو حطي رابط Google Play بدله لو التطبيق نزل على المتجر
- ✅ بيانات التواصل متملية
- ✅ الريبو اترفع على GitHub: https://github.com/osama-Yosef/-Release

## النشر على Cloudflare Workers

المشروع مجهز يستخدم [OpenNext](https://opennext.js.org/cloudflare) للنشر على
Cloudflare Workers (مش Pages — القرار إن Workers هو الطريقة الرسمية الموصى بيها
من Cloudflare حاليًا لتطبيقات Next.js الكاملة).

**للنشر اليدوي من جهازك:**

```bash
npm run cf:deploy
```

(محتاجة تعملي `npx wrangler login` مرة واحدة الأول لو لسه معملتيش).

**للنشر التلقائي عند كل push (الموصى بيه):**

1. ارفعي الريبو على GitHub.
2. من Cloudflare Dashboard → Workers & Pages → Create → استوردي من Git واختاري الريبو.
3. Build command: `npm run cf:deploy` (أو حسب ما يقترحه Cloudflare تلقائيًا لمشاريع
   OpenNext/Next.js — راجعي الإعدادات المقترحة وقت الربط).
4. **مهم**: ضيفي في إعدادات الـ Worker (Settings → Variables) كل المتغيرات الموجودة في
   `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `NEXT_PUBLIC_USE_MOCK_CATALOG=false`, `NEXT_PUBLIC_APK_URL`, بيانات التواصل، وبعد
   الديبلوي حدّثي `NEXT_PUBLIC_SITE_URL` بالدومين الفعلي) — الملف `.env.local` نفسه
   متعمدة إنه مش مرفوع على git.
5. بعد أول ديبلوي هيديكي Cloudflare رابط `*.workers.dev` — تقدري بعدين تربطي دومين مخصص
   من نفس لوحة التحكم.
