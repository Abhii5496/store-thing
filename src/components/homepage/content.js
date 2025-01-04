import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Watch,
  Shirt,
  FootprintsIcon as Shoe,
  Package,
  Gift,
} from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";

export default async function Content() {
  const data = await fetch(
    process.env.NEXT_PUBLIC_STORE_URL + "products?limit=5"
  );
  const newArrivals = await data.json();
  //   console.log(newArrivals);
  return (
    <div>
      {/* New Arrivals */}
      <section className="py-12 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">New Arrivals</h2>
            <Link
              href="/products"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              See All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                id={product.id}
                image={product.image}
                price={product.price}
                title={product.title}
                key={product.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional  */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-primary text-white ">
            <CardContent className="p-8 relative h-full">
              <h2 className="text-xl sm:text-4xl font-bold ">
                Your Style,
                <br />
                Delivered.
                <br />
                Exclusively
                <br />
                Online.
              </h2>
              <Link href="/categories/electronics">
                <Button variant="secondary" className="mt-4 relative z-10">
                  Shop Now
                </Button>
              </Link>
              <div className="absolute bottom-0 right-10 h-full w-32 sm:w-60 lg:w-80 ">
                <Image
                  src="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
                  fill
                  alt="Image"
                  className="absolute object-contain mix-blend-multiply sm:bottom-0 sm:right-10 z-0"
                />
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-8">
            <Card className="border-none bg-accent">
              <CardContent className="p-8 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Fashion elegance
                  </p>
                  <h3 className="text-2xl font-semibold mt-2">
                    Discover our
                    <br />
                    accessories collection
                  </h3>
                  <Link href="/products">
                    <Button variant="link" className="pl-0 mt-2">
                      Shop Now
                    </Button>
                  </Link>
                </div>
                <div className="relative w-32 h-32">
                  <Image
                    src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
                    alt="Smart Watch"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="border-none bg-accent">
              <CardContent className="p-8  grid grid-cols-2 items-center">
                <div className="relative w-32 h-32">
                  <Image
                    src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
                    alt="Sneakers"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Find your perfecr pair
                  </p>
                  <h3 className="text-2xl font-semibold">
                    Explore our shoes
                    <br />
                    collection
                  </h3>
                  <Link href="/products">
                    <Button variant="link" className="pl-0 mt-2">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured  */}
      <section className="py-12 bg-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">Featured Deals</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none bg-accent">
              <CardContent className="p-8 grid grid-cols-2">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Indulge in
                    <br />
                    exclusive deals
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Shop now and enjoy
                    <br />
                    our latest fashion finds
                  </p>
                  <Link href="/products">
                    <Button className="bg-primary">Shop Now</Button>
                  </Link>
                </div>
                <div className="relative">
                  <Image
                    src="https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
                    alt="Fetaure"
                    fill
                    className="object-contain absolute mix-blend-multiply"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary text-white">
              <CardContent className="p-8">
                <Gift className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-medium mb-2">
                  Welcome offer just
                  <br />
                  for you
                </h3>
                <p className="text-sm mb-4">
                  Enjoy 20% discount on your first
                  <br />
                  purchase
                </p>
                <Link href="/products">
                  <Button variant="secondary">Get discount</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

const brands = [
  { name: "Nike", slug: "nike", logo: "/placeholder.svg" },
  { name: "Adidas", slug: "adidas", logo: "/placeholder.svg" },
  { name: "Puma", slug: "puma", logo: "/placeholder.svg" },
  { name: "New Balance", slug: "new-balance", logo: "/placeholder.svg" },
  { name: "Hermes", slug: "hermes", logo: "/placeholder.svg" },
  { name: "Zara", slug: "zara", logo: "/placeholder.svg" },
];
