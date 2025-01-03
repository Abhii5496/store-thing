"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const registerUser = async (values) => {
  const { email, password, name } = values;

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    console.log(userFound, ":user");
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
  } catch (e) {
    console.log(e);
  }
};
