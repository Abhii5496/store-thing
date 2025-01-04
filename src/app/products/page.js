import React, { Suspense } from "react";
import ProductListing from "./product-listing";
import LoadingFallback from "../loading";

export default function page() {
  return (
    <div className="container mx-auto p-8">
      <Suspense fallback={<LoadingFallback />}>
        <ProductListing />
      </Suspense>
    </div>
  );
}
