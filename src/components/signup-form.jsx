"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { registerUser } from "@/actions/register";
import { useRouter } from "next/navigation";

// Define Zod schema
const FormSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    cpassword: z.string().min(8, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords do not match",
    path: ["cpassword"],
  });

export function SignupForm({ className, ...props }) {
  const [show, setShow] = useState(false);
  const [error, seterror] = useState("");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const router = useRouter();

  const onSubmit = async (data) => {
    seterror("");
    const { email, password, name } = data;
    console.log(email, password, name);
    try {
      const r = await registerUser({
        email: email,
        password: password,
        name: name,
      });
      reset();
      if (r?.error) {
        seterror(r.error);
        console.log(r.error);
        return;
      } else {
        toast.success("Registration Successful", {
          description: "Redirecting to homepage ...",
        });
        return router.push("/login");
      }
    } catch (error) {
      console.error("Registration Failed:", error);
      toast.error("Registration Failed", { description: error.message });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create new account
          </CardTitle>
          <CardDescription>
            Enter email and password to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="E.g. Abhii"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-[12px] text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-[12px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-[12px] text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="cpassword">Confirm Password</Label>
                  <span
                    onClick={() => setShow(!show)}
                    className="ml-auto inline-block text-sm  hover:bg-muted hover:cursor-pointer"
                  >
                    {show ? "Hide" : "Show"}
                  </span>
                </div>
                <Input
                  id="cpassword"
                  type={show ? "text" : "password"}
                  {...register("cpassword")}
                  className={errors.cpassword ? "border-red-500" : ""}
                />
                {errors.cpassword && (
                  <p className="text-[12px] text-red-500">
                    {errors.cpassword.message}
                  </p>
                )}
              </div>
              {error && <p className="text-[14px] text-red-500">{error}</p>}
              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Circle /> Please wait..
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
