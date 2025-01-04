"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import CartItem from "./cart-item";
import { useCart } from "@/hooks/cart-hook";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function ShoppingCart() {
  const {
    cartList,
    removeFromCart,
    loading,
    updateCart,
    totalAmount,
    emptyCart,
  } = useCart();

  const { status } = useSession();

  const handleCheckout = async () => {
    if (status === "authenticated") {
      await emptyCart();
    } else {
      toast.info("Please login to checkout");
    }
  };

  return (
    <div className="sm:min-h-[400px] bg-gray-50">
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="pb-6">
          <h1 className="text-2xl font-semibold">Your cart</h1>
          <p className="text-sm text-muted-foreground">
            Not ready to checkout?{" "}
            <Link href="/products" className="underline">
              Continue Shopping
            </Link>
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Cart Items */}
              {loading ? (
                [...Array(2)].map((_, i) => (
                  <Skeleton
                    className="bg-gray-400 h-[200px] sm:h-[140px]  rounded-xl "
                    key={i}
                  />
                ))
              ) : cartList?.length > 0 ? (
                cartList.map((item, i) => (
                  <CartItem
                    key={i}
                    item={item}
                    removeFromCart={removeFromCart}
                    updateCart={updateCart}
                  />
                ))
              ) : (
                <div className="flex justify-start items-start flex-col col-span-4">
                  <h1 className="font-semibold text-2xl py-4">
                    cart is empty..
                  </h1>
                  <Link
                    href="/products"
                    className="underline hover:text-primary"
                  >
                    Continue shopping...
                  </Link>
                </div>
              )}

              {/* Order Information */}
              {cartList && cartList.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Order Information</h2>
                  <Separator />
                  <div>
                    <h3 className="font-medium">Return Policy</h3>
                    <p className="text-sm text-muted-foreground">
                      This is our example return policy which is everything you
                      need to know about our returns.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          {cartList && cartList.length > 0 && (
            <div className="sticky top-10">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                  <div className="mt-4 space-y-4">
                    <Input placeholder="Enter coupon code here" />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${totalAmount.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-muted-foreground">0$</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(3)}</span>
                      </div>
                    </div>
                    <Button className="w-full" onClick={handleCheckout}>
                      Continue to checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
