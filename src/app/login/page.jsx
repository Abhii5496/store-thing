import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";
import LoadingFallback from "../loading";

export const metadata = {
  title: "Login | StoreThing",
};
export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </Suspense>
  );
}
