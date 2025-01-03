"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function Header() {
  const { data, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  // console.log(data);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl text-primary font-semibold">
              StoreThing
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/categories/women's clothing"
              className="text-sm hover:text-primary"
            >
              Women
            </Link>
            <Link
              href="/categories/men's clothing"
              className="text-sm hover:text-primary"
            >
              Men
            </Link>
            <Link
              href="/categories/jewelery"
              className="text-sm hover:text-primary"
            >
              Accessories
            </Link>
            <Link
              href="/categories/electronics"
              className="text-sm hover:text-primary"
            >
              Electronics
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {data?.user?.email ? (
              <Popover>
                <PopoverTrigger>
                  <Button size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <div className="flex gap-2">
                    <Avatar className="bg-muted flex justify-center items-center">
                      <User />
                    </Avatar>
                    <div>
                      <p> {data?.user?.name}</p>
                      <p className="text-gray-500 text-[12px]">
                        {" "}
                        {data?.user?.email}
                      </p>
                      <Button
                        variant="destructive"
                        className="mt-2"
                        onClick={signOut}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link href="/login">
                <Button variant="ghost" href="whist" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

            <Link href="/wishlist">
              <Button href="whist" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
