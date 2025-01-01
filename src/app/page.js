import { Button } from "@/components/ui/button";
import Image from "next/image";
import Categories from "../components/homepage/categories";
import Content from "../components/homepage/content";
import Hero from "../components/homepage/hero";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Categories />
      <Content />
    </div>
  );
}
