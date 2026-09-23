import { NextResponse } from "next/server";
import { browseProducts, getCategories } from "@/lib/data/products";
import { isRateLimited, clientKey } from "@/lib/rate-limit";

export async function GET(request: Request) {
  if (isRateLimited(`search:${clientKey(request)}`, 30, 60_000)) {
    return NextResponse.json({ error: "تم إرسال طلبات كثيرة، حاول بعد قليل." }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").slice(0, 100);
  const categoryId = searchParams.get("category") || undefined;

  try {
    const [products, categories] = await Promise.all([
      browseProducts({ search: q, categoryId, limit: 8 }),
      getCategories(),
    ]);
    const categoryNames = Object.fromEntries(categories.map((c) => [c.id, c.name]));
    return NextResponse.json({
      products: products.map((p) => ({ ...p, categoryName: p.categoryId ? categoryNames[p.categoryId] ?? null : null })),
    });
  } catch {
    return NextResponse.json({ error: "تعذر إتمام البحث حاليًا." }, { status: 500 });
  }
}
