"use client";
import ErrorFallback from "@/components/ErrorFallback";
import React, { useEffect } from "react";

export default function error({ error }) {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <div>
      <ErrorFallback />
    </div>
  );
}
