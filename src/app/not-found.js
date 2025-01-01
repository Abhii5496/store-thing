import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container h-[500px] flex justify-center items-center">
      <Card className="p-20 bg-accent">
        <h2 className="text-5xl font-semibold ">404 -Not Found </h2>
        <div className="w-full flex justify-center items-center">
          <Link href="/" className="">
            <Button className="mt-10">Return Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
