import LoadingFallback from "@/app/loading";
import ErrorFallback from "@/components/ErrorFallback";
import BackButton from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/ui/product-card";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export default async function page({ params }) {
  const slug = (await params).slug;
  console.log(slug);

  const res = await fetch(
    process.env.NEXT_PUBLIC_STORE_URL + "products/category/" + slug
  );
  const data = await res.json();
  // console.log(data);

  if (!data) {
    return <ErrorFallback data={data} />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="container px-4 mx-auto">
        <div className="pt-10 pl-2 sm:pl-0 pb-4 ">
          <BackButton />
        </div>
        <div className="px-2 ">
          <h1 className="py-5 text-2xl font-li capitalize">
            Category -{decodeURIComponent(slug)}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-10 sm:pb-20">
            {data.map((item, i) => (
              <ProductCard
                key={i}
                image={item.image}
                id={item.id}
                price={item.price}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
