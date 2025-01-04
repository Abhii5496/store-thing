import { SignupForm } from "@/components/signup-form";
import { Suspense } from "react";
import LoadingFallback from "../loading";

export const metadata = {
  title: "Sign Up | StoreThing",
};
export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    </Suspense>
  );
}
