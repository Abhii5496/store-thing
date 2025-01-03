"use client";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Circle } from "lucide-react";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export function LoginForm({ className, ...props }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = form;

  const onSubmit = async (data) => {
    const { email, password } = data;
    setError("");
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
        console.log(error);
        toast.error("Login Failed", { description: res.error });
      }
      if (res?.ok) {
        toast.success("Login successful", {
          description: "Redirecting to homepage.",
        });
        return router.push("/");
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="cpassword"> Password</Label>
                  <span
                    onClick={() => setShow(!show)}
                    className="ml-auto inline-block text-sm  hover:bg-muted hover:cursor-pointer"
                  >
                    {show ? "Hide" : "Show"}
                  </span>
                </div>
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-[12px] text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {error && <p className="text-[14px] text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Circle /> Please wait..
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/sign-up" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
