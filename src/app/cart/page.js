import ShoppingCart from "@/components/cart/cart";
import React, { Suspense } from "react";

export const metadata = {
  title: "Cart | StoreThing",
};

export default function page() {
  return (
    <Suspense fallback="loading">
      <div className="container mx-auto">
        <ShoppingCart />
      </div>
    </Suspense>
  );
}
