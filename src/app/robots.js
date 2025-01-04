export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://store-thing.vercel.app/sitemap.xml",
  };
}
