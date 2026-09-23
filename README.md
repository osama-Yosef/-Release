# موقع مكوجي

موقع تعريفي لمعرض مكوجي (مكاوي بخار وأجهزة بخار وقطع غيار وإكسسوارات)، مبني بـ Next.js
ويقرأ نفس بيانات المنتجات من Supabase التي يستخدمها تطبيق مكوجي. الموقع لا يبيع مباشرة —
كل طلب وعملية دفع تتم من داخل التطبيق؛ الموقع للتعريف بالمنتجات وتحميل التطبيق.

## قبل التشغيل

1. **الداتابيز**: راجع [`supabase/README.md`](supabase/README.md) — لازم تطبّق
   `supabase/migrations/0076_public_website_catalog_access.sql` على مشروع Supabase
   عشان الموقع يقدر يقرأ المنتجات المنشورة فقط، من غير ما يلمس أي صلاحية موجودة.
2. **متغيرات البيئة**: انسخ `.env.example` إلى `.env.local` واملأ القيم (راجع التعليقات
   جوه الملف). `.env.local` الحالي فيه مفاتيح Supabase الحقيقية (العامة/anon) بس شغال
   حاليًا بـ `NEXT_PUBLIC_USE_MOCK_CATALOG=true` — يعني بيعرض بيانات تجريبية واضحة لحد ما
   تطبّق الـ migration، بعدها غيّرها لـ `false`.
3. **روابط التحميل**: `NEXT_PUBLIC_APK_URL` أو `NEXT_PUBLIC_PLAY_STORE_URL` — من غيرهم
   زرار التحميل بيظهر "هيتوفر قريبًا" بدل رابط مكسور. حاليًا فيه ملف APK حقيقي (68MB)
   في `public/downloads/mokoji.apk`، مربوط عليه `NEXT_PUBLIC_APK_URL=/downloads/mokoji.apk`.
   **ملحوظة**: لو هترفعي الكود على git، الملف ده هيتضاف للـ repo بحجمه الكامل ويفضل موجود
   في التاريخ حتى لو استبدلتيه بعدين. لو ده مش مريح، الأفضل ترفعيه على Supabase Storage أو
   أي object storage وتحطي رابطه في `NEXT_PUBLIC_APK_URL` بدل الملف المحلي.
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

- طبّق الـ migration وحوّل `NEXT_PUBLIC_USE_MOCK_CATALOG` لـ `false`
- اضبط `NEXT_PUBLIC_SITE_URL` على الدومين الحقيقي (بيتحكم في sitemap وروابط SEO)
- ارفع رابط APK حقيقي أو رابط المتجر
- املأ بيانات التواصل الحقيقية لو متاحة
