"use client";
import React, { useEffect, useState } from "react";
import ShareComponent from "@/components/share-link";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartIcon, MinusIcon, MoveLeft, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useWishlist } from "@/hooks/wishlist-hook";
import { useCart } from "@/hooks/cart-hook";
import Loading from "@/components/ui/loading";

export default function ProductDetail({ id }) {
  const [qty, setqty] = useState(0);
  const [data, setData] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isIncart, setisIncart] = useState(false);

  // console.log(id);
  const getData = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_STORE_URL + "products/" + id
      );
      const data = await res.json();
      setData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const { status, data: user } = useSession();

  const { wishlist, loading, addToWishlist, removeFromWishlist } =
    useWishlist();

  const { addToCart, updateCart, cartList, removeFromCart } = useCart();

  useEffect(() => {
    if (data && wishlist) {
      const isWish =
        wishlist &&
        data &&
        wishlist.length > 0 &&
        wishlist.some((item) => Number(item.productId) === data.id);
      setIsInWishlist(isWish);
    }
  }, [data, wishlist]);

  useEffect(() => {
    if (data && cartList) {
      const inCart =
        cartList &&
        data &&
        cartList.length > 0 &&
        cartList.some((item) => Number(item.productId) === data.id);
      setisIncart(inCart);
    }
  }, [data, cartList]);

  // console.log(isInCart, cartList, qty);

  useEffect(() => {
    if (cartList && cartList.length > 0 && isInCart) {
      const item = cartList.find((x) => Number(x.productId) === data.id);
      // console.log(item);
      setqty(item.quantity);
    }
  }, [cartList]);

  // handle product for wishlistt
  const handleWishlistToggle = async () => {
    try {
      if (!isInWishlist) {
        await addToWishlist(data);
      } else {
        await removeFromWishlist(data.id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // handle product for carrt
  const handleAddToCart = async () => {
    try {
      if (!isInCart) {
        await addToCart({ ...data, quantity: 1 });
      } else {
        await removeFromCart(data.id);
        setqty(0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (!data) {
    return (
      <div className="min-h-[400px] min-w-full justify-center flex items-center">
        <Loading />
      </div>
    );
  }
  console.log(!data);

  return (
    <div className="container mx-auto">
      <div className="px-4 sm:px-10 pt-10 flex justify-between items-center">
        <BackButton />
        <div className="flex gap-5">
          <Button
            variant={isInWishlist ? "" : "secondary"}
            onClick={handleWishlistToggle}
          >
            <HeartIcon
              className={`${
                isInWishlist
                  ? "fill-red-500 outline-none stroke-none w-8 h-8"
                  : ""
              }`}
            />
          </Button>

          <ShareComponent title={data?.title} />
        </div>
      </div>
      <div className="flex sm:flex-row flex-col p-5 sm:p-20 sm:pt-10 gap-20">
        <div className="w-full sm:w-1/3 sm:justify-end flex ">
          <Card className="relative h-[300px] w-full lg:w-[300px] aspect-square ">
            <Image
              className="absolute object-contain p-4"
              fill
              alt={data?.title}
              src={data?.image}
            />
          </Card>
        </div>
        <div className="w-full sm:w-2/3">
          <h1 className="text-2xl sm:text-3xl font-semibold">{data?.title}</h1>
          <h3 className="text-xl font-medium py-3">
            ${data?.price?.toFixed(2)}
          </h3>
          <div className="flex gap-10 py-5 ">
            <Button onClick={handleAddToCart} className="border border-primary">
              {isInCart
                ? `Delete - ${(qty * data?.price)?.toFixed(3)}$`
                : `Add to cart - ${data?.price?.toFixed(2)}$`}
            </Button>

            {isInCart && (
              <div className="flex border w-fit border-black justify-center items-center">
                <Button
                  variant="secondary"
                  className="hover:bg-primary w-6"
                  onClick={() => {
                    qty > 1
                      ? updateCart(data.id, qty - 1)
                      : removeFromCart(data.id);
                  }}
                >
                  <MinusIcon />
                </Button>
                <p className="w-6 text-center">{qty}</p>
                <Button
                  variant="secondary"
                  className="hover:bg-primary w-6"
                  onClick={() => updateCart(data.id, qty + 1)}
                >
                  <PlusIcon />
                </Button>
              </div>
            )}
          </div>
          <p className="text-sm  ">{data?.description}</p>
        </div>
      </div>
    </div>
  );
}
