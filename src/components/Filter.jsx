"use client";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export default function Filters({ filters, handleFilterChange, setFilters }) {
  const router = useRouter();

  const [cat, setCat] = useState();

  const getData = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_STORE_URL + "products/categories"
    );

    const catRes = await res.json();
    setCat(catRes);
  };

  useEffect(() => {
    getData();
  }, []);

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      sortby: "asc",
      rating: "",
      category: "",
    });
    router.push("/products");
  };
  return (
    <aside className="w-1/4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="link"
          className="text-sm text-gray-500"
          onClick={clearFilters}
        >
          Clear filters
        </Button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Categories</h3>
        <div className="space-y-2">
          {!!cat
            ? cat.map((category) => (
                <div className="flex items-center space-x-2" key={category}>
                  <Checkbox
                    id={category}
                    checked={filters.category === category}
                    onCheckedChange={() =>
                      handleFilterChange("category", category)
                    }
                  />
                  <label htmlFor={category} className="text-sm capitalize">
                    {category}
                  </label>
                </div>
              ))
            : [...Array(4)].map((_, i) => (
                <Skeleton
                  className="w-full h-6 bg-gray-400 rounded-lg"
                  key={i}
                />
              ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Rating</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((rate) => (
            <div className="flex items-center space-x-2" key={rate}>
              <Checkbox
                id={rate}
                checked={filters.rating == rate}
                onCheckedChange={() => handleFilterChange("rating", rate + "")}
              />
              <label
                htmlFor={rate}
                className="text-sm capitalize flex gap-1 flex-row"
              >
                {[...Array(rate)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={cn(
                      "text-black fill-accent",
                      filters.rating == rate ? "fill-black" : ""
                    )}
                  />
                ))}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sorting */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Sort By</h3>
        <Select
          value={filters.sortby}
          onValueChange={(e) => handleFilterChange("sortby", e)}
        >
          <SelectTrigger>
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Asc</SelectItem>
            <SelectItem value="desc">Desc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Prices</h3>
        <p className="text-sm mb-2">
          Range: ${filters.priceRange[0].toFixed(2)} - $
          {filters.priceRange[1].toFixed(2)}
        </p>
        <Slider
          defaultValue={filters.priceRange}
          min={0}
          max={1100}
          step={1}
          onValueChange={(e) => {
            handleFilterChange("priceRange", e);
          }}
        />
      </div>
    </aside>
  );
}
