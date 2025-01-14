import Link from "next/link";

export default function Categories({ categories }) {
  // console.log(categories);
  return (
    <section className="py-12 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Shop by Category</h2>
        <Link
          href="/categories"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${category}`}
            className="flex flex-col capitalize justify-start items-start w-full bg-primary/10 p-4 rounded-xl hover:bg-primary/30 transition-colors"
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}
