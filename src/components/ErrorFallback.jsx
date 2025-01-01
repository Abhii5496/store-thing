"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const ErrorFallback = ({ data }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!data) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        redirect("/");
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [data]);

  return (
    <div className="container mx-auto flex justify-center items-center p-10">
      <div className="h-[200px] flex justify-center items-center flex-col">
        <h1>Something went wrong...</h1>
        <p className="text-primary py-4">
          Returning to homepage in {countdown}
        </p>
      </div>
    </div>
  );
};

export default ErrorFallback;
