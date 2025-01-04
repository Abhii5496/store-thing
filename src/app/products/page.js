import React, { Suspense } from "react";
import ProductListing from "./product-listing";

export default function page() {
  return (
    <Suspense>
      <div className="container mx-auto p-8">
        <ProductListing />
      </div>
    </Suspense>
  );
}
