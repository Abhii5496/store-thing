"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Share } from "lucide-react";

export default function ShareComponent({ id, title }) {
  const [isMobile, setIsMobile] = useState(false);

  const url = "https://store-thing.vercel.app/products/" + id;

  useEffect(() => {
    // Detect if the device is mobile
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iphone|ipad|iPod/i.test(userAgent));
  }, []);

  const shareContent = async () => {
    if (isMobile && navigator?.share) {
      try {
        await navigator.share({
          title,
          url: "https://store-thing.vercel.app/products/" + id,
        });
        // console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Copy URL for desktop
      try {
        await navigator?.clipboard.writeText(url);
        toast.success("URL copied to clipboard!", {
          className: "bg-primary/20 font-bold",
        });
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  return (
    <Button className="" onClick={shareContent}>
      <Share />
    </Button>
  );
}
