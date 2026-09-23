"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/empty-state";

export default function ProductsError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ErrorState message="تعذر تحميل المنتجات حاليًا." />
      <div className="mt-4 text-center">
        <button onClick={reset} className="rounded-sm bg-teal-600 px-4 py-2 text-sm font-medium text-paper hover:bg-teal-700">
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
