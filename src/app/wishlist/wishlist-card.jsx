"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const WishlistCard = ({ item, removeFromWishlist }) => {
  const { productId, image, title, price } = item;
  // console.log({ productId, image, title, price });

  const router = useRouter();
  return (
    <Card className="border-none bg-accent hover:bg-muted/50 hover:scale-105 transition-all duration-300 ">
      <CardContent className="p-0 relative">
        <span
          className="absolute top-2.5 right-2.5 rounded-full bg-gray-200 p-1.5 hover:bg-primary/30 z-50 cursor-pointer"
          onClick={async (e) => {
            e.stopPropagation();
            await removeFromWishlist(productId);
          }}
        >
          <Heart className="fill-red-500 outline-none stroke-none " size={20} />
        </span>

        <div
          className="relative aspect-square cursor-pointer"
          onClick={() => router.push(`/products/${productId}`)}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-t-lg p-10 mix-blend-multiply"
          />
        </div>

        <div className="p-4">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <p className="text-primary mt-1">${price}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistCard;
