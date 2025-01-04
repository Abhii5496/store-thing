import { NextResponse } from "next/server";
import db from "../../../../db/database";
import cat from "../../../../db/categories";

export async function GET(request, { params }) {
  const { slug } = await params;
  const url = new URL(request.url);

  const limit = parseInt(url.searchParams.get("limit")) || db.length;

  const sort = url.searchParams.get("sort") || "asc";

  if (sort !== "asc" && sort !== "desc") {
    return NextResponse.json(
      { error: "Invalid sort parameter. Use 'asc' or 'desc'." },
      { status: 400 }
    );
  }

  // console.log(slug);
  // console.log(db.length);
  // console.log(cat);

  if (!slug) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  switch (slug[0]) {
    case "products": {
      try {
        if (slug.length === 1) {
          // /api/store/products
          const sortedProducts = [...db];

          // sorting based on id
          sortedProducts.sort((a, b) => {
            if (sort === "asc") {
              return a.id - b.id;
            } else {
              return b.id - a.id;
            }
          });

          const limitedProducts = sortedProducts.slice(0, limit);
          return NextResponse.json(limitedProducts);
        }

        if (slug[1] === "categories") {
          // /api/store/products/categories
          return NextResponse.json(cat);
        }

        if (slug[1] === "category" && slug[2]) {
          // /api/store/products/category/:categoryName
          const res = db.filter((x) => x.category == slug[2]);

          res.sort((a, b) => {
            if (sort === "asc") {
              return a.id - b.id;
            } else {
              return b.id - a.id;
            }
          });

          const limitedRes = res.slice(0, limit);
          return NextResponse.json(limitedRes);
        }

        if (slug[1] && !isNaN(slug[1])) {
          // /api/products/:id
          const res = db.find((x) => x.id === Number(slug[1]));
          return NextResponse.json(res);
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      break;
    }

    default:
      return NextResponse.json({ error: "Invalid endpoint" }, { status: 404 });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

export const dynamic = "force-dynamic";
