import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getProductImages, getRelatedProducts } from "@/lib/data/products";
import { productDeepLink } from "@/lib/deep-link";
import { siteConfig } from "@/lib/config/site";
import { ProductGallery } from "@/components/product-gallery";
import { SpecsTable } from "@/components/specs-table";
import { Price, AvailabilityBadgeOnDark } from "@/components/price";
import { ProductGrid } from "@/components/product-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DownloadIcon } from "@/components/icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "المنتج غير موجود" };

  const description =
    product.description?.slice(0, 155) || `${product.name} — تفاصيل ومواصفات وسعر متاح الآن في معرض مكوجي.`;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: product.name,
      description,
      images: product.primaryImageUrl ? [product.primaryImageUrl] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [images, related] = await Promise.all([getProductImages(product.id), getRelatedProducts(product)]);
  const deepLink = productDeepLink(product.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    sku: product.sku,
    image: product.primaryImageUrl ?? undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: product.sellingPrice,
      availability: product.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteConfig.url}/products/${slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={images} fallback={product.primaryImageUrl} name={product.name} />

        <div>
          <h1 className="text-2xl font-bold text-on-dark sm:text-3xl">{product.name}</h1>
          <p className="mt-1 font-tech text-xs text-on-dark-muted">SKU: {product.sku}</p>

          <div className="mt-4 flex items-center gap-3">
            <Price value={product.sellingPrice} className="text-3xl text-gold" />
            <AvailabilityBadgeOnDark available={product.isAvailable} />
          </div>

          {product.description && (
            <p className="mt-5 leading-relaxed text-on-dark-muted">{product.description}</p>
          )}

          <div className="mt-6">
            <Link
              href={deepLink ?? `/app?product=${product.id}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-gold-600 sm:w-auto"
            >
              <DownloadIcon className="h-4 w-4" />
              اطلب من تطبيق مكوجي
            </Link>
            <p className="mt-2 text-xs text-on-dark-muted">
              الطلب والدفع ومتابعة الشحن كله بيتم من داخل تطبيق مكوجي.
            </p>
          </div>

          {Object.keys(product.specs).length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-on-dark">المواصفات</h2>
              <SpecsTable specs={product.specs} />
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-on-dark">منتجات ذات صلة</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
