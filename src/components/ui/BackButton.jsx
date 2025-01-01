"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";
import { MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackButton({ className }) {
  const router = useRouter();
  return (
    <Button className={cn(className)} onClick={() => router.back()}>
      <MoveLeft size={20} />
    </Button>
  );
}
