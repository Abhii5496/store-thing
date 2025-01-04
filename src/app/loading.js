import Loading from "@/components/ui/loading";
import React from "react";

export default function LoadingFallback() {
  return (
    <div className="min-h-[400px] min-w-full justify-center flex items-center">
      <Loading />
    </div>
  );
}
