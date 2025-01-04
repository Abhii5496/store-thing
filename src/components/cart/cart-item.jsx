"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartItem({ item, removeFromCart, updateCart }) {
  const router = useRouter();
  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <div className="flex items-center sm:items-start sm:flex-row flex-col gap-4 p-4 w-full">
          <div
            className="h-24 w-24 flex-shrink-0 bg-gray-100 relative"
            onClick={() => router.push(`/products/${item.productId}`)}
          >
            <Image
              fill
              src={item.image}
              alt={item.title}
              className="absolute object-contain"
            />
          </div>
          <div className="flex flex-col w-full">
            <div onClick={() => router.push(`/products/${item.productId}`)}>
              <h3 className="font-medium">{item.title}</h3>
            </div>
            <div className="flex justify-between w-full ">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Size: L</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-muted-foreground">by Vendor Name</p>
              </div>
              <div className=" text-right self-end space-y-1.5">
                <p className="font-medium">
                  {(item.quantity * item.price).toFixed(3)}$
                </p>

                <div className="flex border w-fit border-gray-300 justify-center items-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="hover:bg-primary w-6"
                    onClick={() => {
                      item.quantity > 1
                        ? updateCart(item.productId, item.quantity - 1)
                        : removeFromCart(item.productId);
                    }}
                  >
                    <MinusIcon />
                  </Button>
                  <p className="w-6 text-center">{item.quantity}</p>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="hover:bg-primary w-6"
                    onClick={() =>
                      updateCart(item.productId, item.quantity + 1)
                    }
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
