"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { calculateTotalPrice } from "@/lib/utils";
import useLocalData from "@/lib/local-store";
import { connectDB } from "@/lib/mongodb";

export const useCart = () => {
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const { status, data: user } = useSession();
  const {
    addLocalCart,
    cart,
    clearLocalCart,
    removeLocalCart,
    updateLocalCart,
  } = useLocalData();

  // console.log("Cart-hook:", cartList);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCartList();
    }
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      setCartList(cart);
      const total = calculateTotalPrice(cart);
      setTotalAmount(total);
    }
  }, [status, cart]);

  const fetchCartList = async () => {
    if (status === "unauthenticated") {
      return;
    }

    setLoading(true);
    await connectDB();
    try {
      const { data } = await axios.get("/api/cart/get");
      // console.log(data);
      setCartList(data.data);
      setTotalAmount(data.totalPrice);
    } catch (error) {
      console.error("Error fetching cartList:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (status === "unauthenticated") {
      return;
    }
    const { id, quantity, image, title, price } = product;
    if (!loading) {
      setLoading(true);
      await connectDB();

      try {
        if (status === "authenticated") {
          const { data } = await axios.post("/api/cart/add", {
            id,
            quantity,
            image,
            title,
            price,
          });
          // console.log("cartdata:", data);
          setCartList(data.data);
          setTotalAmount(data.totalPrice);
        } else {
          addLocalCart({ productId: id, quantity, image, title, price });
        }
        toast.success("Added to cart.");
      } catch (error) {
        console.error("Error adding to cartList:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const updateCart = async (productId, quantity) => {
    if (!loading) {
      setLoading(true);
      await connectDB();

      try {
        if (status === "authenticated") {
          const { data } = await axios.post("/api/cart/update", {
            productId,
            quantity,
          });
          // console.log("cartdata:", data);
          setCartList(data.data);
          setTotalAmount(data.totalPrice);
        } else {
        }
        await updateLocalCart(productId, quantity);
        toast.success("Cart updated.");
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const removeFromCart = async (productId) => {
    if (!loading) {
      setLoading(true);
      await connectDB();

      try {
        if (status === "authenticated") {
          const { data } = await axios.post("/api/cart/remove", {
            productId,
          });
          setCartList(data.data);
          setTotalAmount(data.totalPrice);
          // console.log("hookRem", data);
        } else {
          removeLocalCart(productId);
        }
        toast.success("Removed from cart.");
      } catch (error) {
        console.error("Error removing from cart.:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const emptyCart = async () => {
    if (!loading) {
      setLoading(true);
      await connectDB();

      try {
        if (status === "authenticated") {
          const { data } = await axios.get("/api/cart/empty");
          setCartList(data.data);
          setTotalAmount(data.totalPrice);
          // console.log("hookRem", data);
        } else {
          clearLocalCart();
        }
        toast.success("Cart empty.");
      } catch (error) {
        console.error("Error removing from cart.:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    cartList,
    loading,
    addToCart,
    updateCart,
    removeFromCart,
    fetchCartList,
    totalAmount,
    emptyCart,
  };
};
