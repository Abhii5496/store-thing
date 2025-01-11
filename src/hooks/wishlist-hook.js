// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { useSession } from "next-auth/react";
// import useLocalData from "@/lib/local-store";
// import { connectDB } from "@/lib/mongodb";

// export const useWishlist = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { status, data: user } = useSession();

//   const { wishlist: wish, addLocalWish, removeLocalWish } = useLocalData();

//   useEffect(() => {
//     if (status === "authenticated") {
//       fetchWishlist();
//     }
//   }, [status]);

//   // useEffect(() => {
//   //   if (status === "unauthenticated") {
//   //     setWishlist(wish);
//   //   }
//   // }, [status, wish]);

//   // console.log("wishlist-hook", wishlist);

//   const fetchWishlist = async () => {
//     if (status === "unauthenticated") {
//       return;
//     }
//     await connectDB();
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/wishlist/get");
//       setWishlist(data.data);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addToWishlist = async (product) => {
//     if (status === "unauthenticated") {
//       return;
//     }

//     if (!loading) {
//       await connectDB();

//       setLoading(true);
//       try {
//         if (status === "authenticated") {
//           const { data } = await axios.post("/api/wishlist/add", product);
//           setWishlist(data.data);
//         }
//         // else {
//         //   addLocalWish({ ...product, productId: product.id });
//         // }
//         toast.success("Added to wishlist");
//       } catch (error) {
//         console.error("Error adding to wishlist:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const removeFromWishlist = async (productId) => {
//     if (status === "unauthenticated") {
//       return;
//     }
//     if (!loading) {
//       await connectDB();

//       setLoading(true);

//       try {
//         if (status === "authenticated") {
//           const { data } = await axios.post("/api/wishlist/remove", {
//             productId,
//           });
//           setWishlist(data.data);
//           // console.log("hookRem", data);
//         }

//         // else {
//         //   removeLocalWish(productId);
//         // }
//         toast.success("Removed from wishlist");
//       } catch (error) {
//         console.error("Error removing from wishlist:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return {
//     wishlist,
//     loading,
//     addToWishlist,
//     removeFromWishlist,
//     fetchWishlist,
//   };
// };
