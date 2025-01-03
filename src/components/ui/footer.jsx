import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
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
            <p className="text-sm text-muted-foreground">
              We're always here to help
            </p>
            <div className="flex space-x-4">
              <Link href="#app-store">
                <Button className="flex gap-1 px-2 py-6 justify-center items-center bg-black">
                  <Image
                    src="/apple-logo.svg"
                    alt="App Store"
                    width={25}
                    height={25}
                    className=" invert"
                  />
                  <p className="flex flex-col justify-center">
                    <span className="text-start text-[10px] leading-[.95]">
                      Get it on
                    </span>
                    <span className="text-md font-medium">Apple store</span>
                  </p>
                </Button>
              </Link>
              <Link href="#play-store">
                <Button className="flex gap-1 px-2 py-6 justify-center items-center bg-black">
                  <Image
                    src="/playstore-logo.svg"
                    alt="App Store"
                    width={25}
                    height={25}
                    className=""
                  />
                  <p className="flex flex-col justify-center">
                    <span className="text-start text-[10px] leading-[.95]">
                      Download on
                    </span>
                    <span className="text-md font-medium">Playstore</span>
                  </p>
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 StoreThing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
