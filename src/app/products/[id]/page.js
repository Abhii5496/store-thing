import ShareComponent from "@/components/share-link";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MinusIcon, MoveLeft, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default async function ProductDetail({ params }) {
  const id = (await params).id;
  console.log(id);

  const res = await fetch(process.env.NEXT_PUBLIC_STORE_URL + "products/" + id);
  const data = await res.json();
  // console.log(data);

  if (!data) {
    return (
      <div className="container mx-auto">
        <div>
          <h1>Something went wrong</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className="px-10 pt-10 flex justify-between items-center">
        <BackButton />
        <ShareComponent title={data.title} />
      </div>
      <div className="flex sm:flex-row flex-col p-5 sm:p-20 sm:pt-10 gap-20">
        <div className="w-full sm:w-1/3 sm:justify-end flex ">
          <Card className="relative h-[300] w-full lg:w-[300px] ">
            <Image
              priority
              className="absolute object-contain p-4"
              fill
              alt={data.title}
              src={data.image}
            />
          </Card>
        </div>
        <div className="w-full sm:w-2/3">
          <h1 className="text-2xl sm:text-3xl font-semibold">{data.title}</h1>
          <h3 className="text-xl font-medium py-3">${data.price}</h3>
          <p className="text-sm h-[170px] ">{data.description}</p>
          <div className="flex gap-10 ">
            <Button>Add to Cart -{data.price}$ </Button>
            <div className="flex border w-fit border-black justify-center items-center">
              <Button variant="secondary" className="hover:bg-primary">
                <MinusIcon />
              </Button>
              <input
                placeholder="1"
                className="ring-0 border-none outline-none focus-within:outline-none px-3 bg-white focus-visible:ring-0 h-full w-10 flex justify-center items-center "
              />
              <Button variant="secondary" className="hover:bg-primary">
                <PlusIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
