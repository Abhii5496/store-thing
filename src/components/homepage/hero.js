"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function Hero() {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState();

  const getData = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_STORE_URL +
        "products/category/women's clothing?limit=3"
    );
    const slideData = await res.json();
    setData(slideData);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  if (!data || data.length == 0) {
    return (
      <div className="w-full container mx-auto p-4">
        <Skeleton className="w-full h-[400px] sm:h-[600px] rounded-xl bg-gray-400" />
      </div>
    );
  }
  // console.log(data);
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full container mx-auto p-4"
      // onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1 h-[400px] sm:h-[600px]">
              <Card className="h-full border-none relative bg-gradient-to-r  from-gray-400 via-gray-500 to-gray-600 ">
                <CardContent className="relative w-full flex items-center justify-center p-6 h-full">
                  <div className="w-full h-full justify-center items-center flex ">
                    <div className="w-full sm:w-1/3 h-full relative">
                      <Image
                        src={item.image}
                        className="absolute inset-0 w-full sm:w-1/4 mix-blend-darken sm:p-10 z-10"
                        fill
                        alt={item.title}
                      />
                    </div>
                  </div>

                  <div className="absolute h-full top-0 left-0 p-10 w-full sm:w-2/4 z-20 sm:z-0 flex justify-center items-center sm:justify-start sm:items-start">
                    <span
                      style={{ lineHeight: 1 }}
                      className="text-4xl text-center sm:text-start sm:text-[70px] font-semibold  text-white line-clamp-4"
                    >
                      {item.title}
                    </span>
                  </div>
                  <div className="absolute h-full bottom-0 right-0 p-10 w-full sm:w-2/4 z-0 hidden sm:flex justify-end items-center ">
                    <span className="uppercase text-lg text-white">
                      designed to &bull;
                      <br /> stand out &bull;{" "}
                    </span>
                  </div>
                  <div className="absolute h-40 bottom-0 left-0 p-10 w-40 sm:w-2/4 z-0 sm:flex justify-start hidden">
                    <span className="uppercase text-lg text-white ">
                      &bull;{item.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
