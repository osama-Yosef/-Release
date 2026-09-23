import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="font-tech text-sm text-gold">404</p>
      <h1 className="text-2xl font-bold text-on-dark">الصفحة اللي بتدور عليها مش موجودة</h1>
      <p className="text-on-dark-muted">ممكن يكون الرابط اتغير أو المنتج مبقاش متاح.</p>
      <Link href="/products" className="rounded-sm bg-teal-600 px-5 py-2.5 text-sm font-semibold text-paper hover:bg-teal-700">
        تصفح المنتجات
      </Link>
    </div>
  );
}
