import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Image
              src="/placeholder.svg"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            /> */}
            <span className="text-xl text-primary font-semibold">
              StoreThing
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/women" className="text-sm hover:text-primary">
              Women
            </Link>
            <Link href="/men" className="text-sm hover:text-primary">
              Men
            </Link>
            <Link href="/kids" className="text-sm hover:text-primary">
              Kids
            </Link>
            <Link href="/accessories" className="text-sm hover:text-primary">
              Accessories
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
