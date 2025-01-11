// "use client";
// import { Button } from "@/components/ui/button";
// import { useWishlist } from "@/hooks/wishlist-hook";
// import React, { Suspense, useState } from "react";
// import WishlistCard from "./wishlist-card";
// import { Skeleton } from "@/components/ui/skeleton";
// import Link from "next/link";
// import LoadingFallback from "../loading";

// export default function page() {
//   const { wishlist, removeFromWishlist, loading } = useWishlist();
//   const [showAll, setShowAll] = useState(false);

//   // console.log(loading);
//   const products = !showAll
//     ? wishlist && wishlist.length > 0 && wishlist.slice(0, 4)
//     : wishlist;

//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <div className="max-w-5xl  mx-auto">
//         <div className="p-10 ">
//           <h1 className="text-center text-3xl font-semibold">Wishlist</h1>
//           {!loading && wishlist?.length > 0 && (
//             <div className="flex justify-end py-10 items-center">
//               <Button
//                 className="justify-self-end"
//                 onClick={() => setShowAll(!showAll)}
//               >
//                 {showAll ? "Show less" : "Show all"}
//               </Button>
//             </div>
//           )}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//             {loading ? (
//               [...Array(4)].map((_, i) => (
//                 <Skeleton
//                   className="bg-gray-400 h-[300px] rounded-xl mt-10"
//                   key={i}
//                 />
//               ))
//             ) : products?.length > 0 ? (
//               products.map((item, i) => (
//                 <WishlistCard
//                   key={i}
//                   item={item}
//                   removeFromWishlist={removeFromWishlist}
//                 />
//               ))
//             ) : (
//               <div className="flex justify-center items-center flex-col col-span-4">
//                 <h1 className="font-semibold text-2xl py-4">
//                   Your wishlist is empty
//                 </h1>
//                 <Link href="/products" className="underline hover:text-primary">
//                   Continue shopping...
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Suspense>
//   );
// }

import React from "react";

export default function page() {
  return <div>page</div>;
}
