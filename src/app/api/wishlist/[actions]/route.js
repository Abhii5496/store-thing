import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Wishlist from "@/models/Wishlist";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  const { actions: action } = await res.params;

  const session = await getServerSession();
  // console.log(session, "se");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  const email = session.user?.email;
  await connectDB();
  const user = await User.findOne({ email });
  // console.log("user", user);

  if (!user) return NextResponse.json({ error: "Unauthenticated" });

  try {
    switch (action) {
      case "add":
        if (req.method === "POST") {
          const body = await req.json();

          const { id, title, price, category, image } = body;
          const result = await Wishlist.findOneAndUpdate(
            { user: user._id },
            {
              $addToSet: {
                products: {
                  productId: id,
                  title: title,
                  price: price,
                  category: category,
                  image: image,
                },
              },
            },
            { upsert: true, new: true }
          );
          return NextResponse.json({
            data: result.products,
            status: 200,
          });
        }
        break;

      case "remove":
        if (req.method === "POST") {
          const { productId } = await req.json();

          // console.log(productId);

          const wishlist = await Wishlist.findOneAndUpdate(
            { user: user._id },
            { $pull: { products: { productId } } },
            { new: true }
          );
          return NextResponse.json({
            data: wishlist.products,
            status: 200,
          });
        }
        break;

      case "get":
        if (req.method === "GET") {
          const wishlist = await Wishlist.findOne({ user: user._id });
          return NextResponse.json({
            data: wishlist?.products || [],
            status: 200,
          });
        }
        break;

      default:
        return NextResponse.json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}

export { handler as GET, handler as POST };
