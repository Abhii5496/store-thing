"use client";

import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ProductCard = ({ id, image, title, price }) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/products/${id}`)}
      className="border-none bg-accent hover:bg-muted/50 hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
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
