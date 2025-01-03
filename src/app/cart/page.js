"use client";

import ShoppingCart from "@/components/cart/cart";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback="loading">
      <div className="container mx-auto">
        <ShoppingCart />
      </div>
    </Suspense>
  );
}
