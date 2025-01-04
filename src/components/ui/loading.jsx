import React from "react";

export default function Loading() {
  return (
    <div class="grid grid-cols-3 gap-1 w-[70px] h-[70px]">
      <span class="w-full h-full bg-[#a5a5b0] animate-blink delay-0"></span>
      <span class="w-full h-full bg-[#a5a5b0] animate-blink delay-200"></span>
      <span class="w-full h-full bg-[#a5a5b0] animate-blink delay-300"></span>
      <span class="w-full h-full bg-[#a5a5b0] animate-blink delay-400"></span>
      <span class="w-full h-full bg-[#a5a5b0] animate-blink delay-500"></span>
      <span class="w-full h-full bg-[#a5a5b0] animate-blink delay-600"></span>
    </div>
  );
}
