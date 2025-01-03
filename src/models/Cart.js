import mongoose, { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: String,
        title: String,
        price: Number,
        category: String,
        image: String,
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models?.Cart || model("Cart", CartSchema);
export default Cart;
