"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Filter from "@/components/Filter";
import { ProductCard } from "@/components/ui/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function page() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    sortby: "asc",
    rating: "",
    category: "",
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const PAGE_SIZE = 8;

  // Update filters based on query parameters
  useEffect(() => {
    const paramsObject = Object.fromEntries(searchParams.entries());
    if (paramsObject) {
      setFilters((prev) => ({
        ...prev,
        sortby: paramsObject.sort || prev.sortby,
        rating: paramsObject.rating || prev.rating,
        category: paramsObject.category || prev.category,
        priceRange: [
          Number(paramsObject.price_from) || prev.priceRange[0],
          Number(paramsObject.price_to) || prev.priceRange[1],
        ],
      }));
      setCurrentPage(Number(paramsObject.page) || 1);
    }
  }, [searchParams]);

  // Create query string for filters
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      const newValue = prev[name] === value ? "" : value;
      return { ...prev, [name]: newValue };
    });

    const params = new URLSearchParams(searchParams.toString());

    console.log(value, params.get(name), "params");
    if (value && params.get(name) !== value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
    const queryString = createQueryString("page", value);
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  const getProducts = async () => {
    setloading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STORE_URL}products?sort=${filters.sortby}`
      );
      const products = await res.json();
      setData(products);
      setloading(false);
    } catch (error) {
      seterror(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [filters.sortby]);

  // Filter data

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      let filtered = data.filter(
        (item) =>
          item.price >= filters.priceRange[0] &&
          item.price <= filters.priceRange[1]
      );

      if (filters.rating) {
        filtered = filtered.filter(
          (item) => item.rating.rate >= filters.rating
        );
      }

      if (filters.category) {
        filtered = filtered.filter(
          (item) => item.category === filters.category
        );
      }

      setFilteredData(filtered);
    }
  }, [data, filters]);

  const paginatedData =
    filteredData &&
    filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    if (filteredData) {
      setTotalPages(Math.ceil(filteredData.length / PAGE_SIZE));
    }
  }, [filteredData]);

  //   console.log("original :", data);
  //   console.log("filtered :", filteredData);
  //   console.log("ppaginated :", paginatedData);

  return (
    <Suspense>
      <div className="container mx-auto p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">All Products</h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </header>

        {/* Main Content */}
        <div className="flex space-x-8 gap-10">
          {/* Filters */}
          <Filter
            filters={filters}
            setFilters={setFilters}
            handleFilterChange={handleFilterChange}
          />
          {/* Products */}
          <section className="w-3/4">
            <div className="flex justify-end items-center mb-6">
              <h2 className="text-md ">
                Showing {!!filteredData && filteredData.length} Products
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {!loading &&
                paginatedData &&
                paginatedData.length > 0 &&
                paginatedData.map((product, index) => (
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    price={product.price}
                    title={product.title}
                    key={index}
                  />
                ))}

              {loading &&
                [...Array(8)].map((_, i) => (
                  <Skeleton
                    className="bg-gray-400 h-[300px] rounded-xl"
                    key={i}
                  />
                ))}
            </div>

            {!loading && paginatedData && paginatedData.length == 0 && (
              <div className="flex items-center justify-center h-[200px]">
                <h6 className="text-xl font-medium text-primary">
                  No product found.
                </h6>
              </div>
            )}

            {!loading && error && (
              <div className="h-[200px] justify-center items-center">
                <h1 className="text-xl">
                  Something went wrong, Please try again.
                </h1>
              </div>
            )}

            {!!filteredData && !!totalPages && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem className="cursor-pointer">
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(
                            currentPage > 1 ? currentPage - 1 : 1
                          )
                        }
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((item, i) => (
                      <PaginationItem className="cursor-pointer" key={i}>
                        <PaginationLink
                          onClick={() => handlePageChange(i + 1)}
                          isActive={currentPage == i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem className="cursor-pointer">
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Number(currentPage) == Number(totalPages)
                              ? currentPage
                              : currentPage + 1
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>
        </div>
      </div>
    </Suspense>
  );
}
