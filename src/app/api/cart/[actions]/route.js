import { connectDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  const { actions: action } = await res.params;

  const session = await getServerSession();
  console.log(session, "se");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }

  const email = session.user?.email;
  await connectDB();
  const user = await User.findOne({ email });
  // console.log("user", user);

  if (!user) return NextResponse.json({ error: "Unauthenticated" });

  async function calculateTotalPrice(products) {
    return products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  try {
    switch (action) {
      case "add":
        if (req.method === "POST") {
          const body = await req.json();

          const { id, title, price, image, quantity = 1 } = body;
          console.log(id, title, price, image, quantity);

          const cart = await Cart.findOneAndUpdate(
            { user: user._id },
            {
              $addToSet: {
                products: {
                  productId: String(id),
                  title: title,
                  price: price,
                  image: image,
                  quantity: Number(quantity),
                },
              },
            },
            { upsert: true, new: true }
          );
          cart.totalPrice = await calculateTotalPrice(cart.products);
          await cart.save();

          return NextResponse.json({
            data: cart.products,
            totalPrice: cart.totalPrice,
            status: 200,
          });
        }
        break;

      case "update":
        if (req.method === "POST") {
          const { productId, quantity } = await req.json();

          if (quantity <= 0) {
            return NextResponse.json({
              error: "Quantity must be greater than 0",
              status: 400,
            });
          }

          const cart = await Cart.findOneAndUpdate(
            { user: user._id, "products.productId": productId },
            {
              $set: {
                "products.$.quantity": quantity,
              },
            },
            { new: true }
          );

          // Recalculate total price
          cart.totalPrice = await calculateTotalPrice(cart.products);
          await cart.save();

          return NextResponse.json({
            data: cart.products,
            totalPrice: cart.totalPrice,
            status: 200,
          });
        }
        break;

      case "remove":
        if (req.method === "POST") {
          const { productId } = await req.json();

          console.log(productId);

          const cart = await Cart.findOneAndUpdate(
            { user: user._id },
            { $pull: { products: { productId } } },
            { new: true }
          );
          cart.totalPrice = await calculateTotalPrice(cart.products);
          await cart.save();

          return NextResponse.json({
            data: cart.products,
            totalPrice: cart.totalPrice,
            status: 200,
          });
        }
        break;

      case "get":
        if (req.method === "GET") {
          const cart = await Cart.findOne({ user: user._id });
          cart.totalPrice = await calculateTotalPrice(cart.products);
          await cart.save();

          return NextResponse.json({
            data: cart?.products || [],
            status: 200,
            totalPrice: cart.totalPrice,
          });
        }
        break;

      case "empty":
        if (req.method === "GET") {
          const cart = await Cart.findOneAndUpdate(
            { user: user._id },
            {
              $set: {
                products: [],
                totalPrice: 0,
              },
            },
            { new: true }
          );

          return NextResponse.json({
            data: cart?.products || [],
            status: 200,
            totalPrice: cart.totalPrice,
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
