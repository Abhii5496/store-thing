// "use server";

// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import Wishlist from "@/models/Wishlist";

// export async function addToWishlist(email, product) {
//   console.log(email, product);
//   try {
//     await connectDB();
//     const user = await User.findOne({ email });
//     if (!user) throw new Error("User not found");

//     const result = await Wishlist.findOneAndUpdate(
//       { user: user._id },
//       {
//         $addToSet: {
//           products: {
//             productId: product.id,
//             title: product.title,
//             price: product.price,
//             category: product.category,
//             image: product.image,
//           },
//         },
//       },
//       { upsert: true, new: true }
//     );
//     return { success: true, data: result.products };
//   } catch (error) {
//     console.error("Wishlist add error:", error);
//     throw new Error("Failed to add to wishlist");
//   }
// }

// export const removeFromWishlist = async (email, productId) => {
//   try {
//     await connectDB();

//     const result = await Wishlist.findOneAndUpdate(
//       { email },
//       {
//         $pull: {
//           products: { id: productId },
//         },
//       },
//       { new: true }
//     );

//     return { success: true, data: result };
//   } catch (error) {
//     console.error("Error removing from wishlist:", error);
//     throw new Error("Failed to remove item from wishlist");
//   }
// };

// export const getWishlist = async (email) => {
//   try {
//     await connectDB();

//     const wishlist = await Wishlist.findOne({ email });
//     return wishlist?.products || [];
//   } catch (error) {
//     console.error("Error fetching wishlist:", error);
//     throw new Error("Failed to fetch wishlist");
//   }
// };
