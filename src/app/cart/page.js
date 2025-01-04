import ShoppingCart from "@/components/cart/cart";
import React, { Suspense } from "react";
import LoadingFallback from "../loading";

export const metadata = {
  title: "Cart | StoreThing",
};

export default function page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="container mx-auto">
        <ShoppingCart />
      </div>
    </Suspense>
  );
}
