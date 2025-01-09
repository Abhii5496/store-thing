import { Button } from "@/components/ui/button";
import Image from "next/image";
import Categories from "../components/homepage/categories";
import Content from "../components/homepage/content";
import Hero from "../components/homepage/hero";

export default async function Home() {
  const slide = await fetch(
    process.env.NEXT_PUBLIC_STORE_URL +
      "products/category/women's clothing?limit=3"
  );
  const hero = await slide.json();

  const newA = await fetch(
    process.env.NEXT_PUBLIC_STORE_URL + "products?limit=5"
  );
  const content = await newA.json();

  const data = await fetch(
    process.env.NEXT_PUBLIC_STORE_URL + "products/categories"
  );
  const categories = await data.json();

  return (
    <div className="">
      <Hero data={hero} />
      <Categories categories={categories} />
      <Content newArrivals={content} />
    </div>
  );
}
