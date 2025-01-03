import mongoose, { Schema, model } from "mongoose";

const WishlistSchema = new Schema(
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
        quantity: Number,
        image: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.models?.Wishlist || model("Wishlist", WishlistSchema);
export default Wishlist;
