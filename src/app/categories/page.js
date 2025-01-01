import BackButton from "@/components/ui/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React, { Suspense } from "react";

export default async function page() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STORE_URL + "products/categories"
  );
  const data = await res.json();
  //   console.log(data);
  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto">
        <div className="py-10 pl-2 sm:ml-20">
          <BackButton />
        </div>
        <div className="px-2 sm:ml-20 pb-20">
          <h1 className="py-5 text-4xl font-semibold">Categories</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {data.map((item, i) => (
              <Link href={`categories/${item}`} key={i}>
                <Card className="border-none hover:bg-primary/30 bg-accent rounded-none hover:-translate-y-2 transform transition-all duration-300">
                  <CardContent className="flex justify-start items-center h-full p-6">
                    <h3 className="text-xl font-medium capitalize ">{item}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div></div>
      </div>
    </Suspense>
  );
}

const Loading = () => {
  return (
    <div className="container mx-auto">
      <div className="py-10 pl-2 sm:ml-20">
        <BackButton />
      </div>
      <div className="px-2 sm:ml-20 pb-20">
        <h1 className="py-5 text-4xl font-semibold">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {Array.from({ length: 5 }).map((item, i) => (
            <Skeleton key={i} className="h-[100px] bg-gray-400" />
          ))}
        </div>
      </div>
    </div>
  );
};
