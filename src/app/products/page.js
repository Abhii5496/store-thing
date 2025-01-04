import React, { Suspense } from "react";
import ProductListing from "./product-listing";
import LoadingFallback from "../loading";

export default function page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="container mx-auto p-8">
        <ProductListing />
      </div>
    </Suspense>
  );
}
