export const siteConfig = {
  name: "مكوجي",
  nameLatin: "Mokoji",
  tagline: "المعرض كله في إيدك",
  description: "اكتشف أجهزة البخار والمكاوي والمنتجات المتاحة، واستخدم تطبيق مكوجي للطلب بسهولة.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "ar-EG",
};

export const appDownload = {
  apkUrl: process.env.NEXT_PUBLIC_APK_URL || null,
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL || null,
  version: process.env.NEXT_PUBLIC_APP_VERSION || null,
  releaseDate: process.env.NEXT_PUBLIC_APP_RELEASE_DATE || null,
  get isReady() {
    return Boolean(this.apkUrl || this.playStoreUrl);
  },
};

/** Only real, verified contact info goes here — see spec §34/35. Fill in before launch. */
export const contact = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || null,
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || null,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || null,
  facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || null,
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || null,
};
