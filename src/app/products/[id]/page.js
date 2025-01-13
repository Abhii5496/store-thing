import React, { Suspense } from "react";
import ProductDetail from "./product-detail";
import LoadingFallback from "@/app/loading";

// export async function generateMetadata({ params, searchParams }, parent) {
//   const id = (await params).id;
//   const res = await fetch(process.env.NEXT_PUBLIC_STORE_URL + "products/" + id);
//   const data = await res.json();
//   const previousImages = (await parent).openGraph?.images || [];
//   const siteUrl = "https://futurediary.vercel.app/";

//   return {
//     title: `${data?.title || "Not Found"} | StoreThing `,
//     description: data?.description,
//     generator: "StoreThing",
//     applicationName: "StoreThing",
//     keywords: data.keywords ?? "",
//     creator: "StoreThing",
//     publisher: "StoreThing",
//     metadataBase: new URL(siteUrl),
//     alternates: {
//       canonical: `${siteUrl + id}`,
//       languages: {
//         "en-US": "/en-US",
//         "de-DE": "/de-DE",
//       },
//     },
//     openGraph: {
//       title: data?.title,
//       description: data?.description,
//       url: `${siteUrl + id}`,
//       siteName: "StoreThing",
//       images: [data?.image],
//       locale: "en-US",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: data?.title,
//       description: data?.description,
//       creator: "@storething",
//       images: [
//         {
//           url: data?.image, // Must be an absolute URL
//           width: 1200,
//           height: 630,
//         },
//         ...previousImages,
//       ],
//     },
//     robots: {
//       index: true,
//       follow: true,
//       nocache: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         noimageindex: false,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//     icons: {
//       icon: "/favicon.ico",
//       shortcut: "/favicon.ico",
//       apple: "/favicon.ico",
//       other: {
//         rel: "/favicon.ico",
//         url: "/favicon.ico",
//       },
//     },
//   };
// }

export default async function page({ params }) {
  const id = (await params).id;
  // console.log(id)

  // const res = await fetch(process.env.NEXT_PUBLIC_STORE_URL + "products/" + id);

  // if (!res.ok) {
  //   return null;
  // }
  // const data = await res.json();

  // console.log(data);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div>
        {/* <ProductDetail data={data} id={id} /> */}
        Product {id}
      </div>
    </Suspense>
  );
}
