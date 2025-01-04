export const revalidate = 3600;
export default async function sitemap() {
  async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STORE_URL}products`);

    const data = await res.json();
    // console.log(data);
    return data;
  }

  const products = await getProducts();

  const productUrls = products.map((prod) => ({
    url: `https://store-thing.vercel.app/products/${prod.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `https://store-thing.vercel.app/`,
      lastModified: new Date(),
    },
    {
      url: "https://store-thing.vercel.app/category",
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}
