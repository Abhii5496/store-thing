import React, { Suspense } from "react";
import ProductDetail from "./product-detail";

export default async function page({ params }) {
  const id = (await params).id;
  // console.log(id);

  const res = await fetch(process.env.NEXT_PUBLIC_STORE_URL + "products/" + id);
  const data = await res.json();
  // console.log(data);

  if (!data) {
    return (
      <Suspense fallback="loading">
        <div className="container mx-auto">
          <div>
            <h1>Something went wrong</h1>
          </div>
        </div>
      </Suspense>
    );
  }
  return (
    <Suspense fallback="loading">
      <div>
        <ProductDetail data={data} />
      </div>
    </Suspense>
  );
}
