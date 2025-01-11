import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/components/Provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://store-thing.vercel.app";
const TAGLINE = "Your One-Stop Shop for Everything You Love!";

export const metadata = {
  title: "StoreThing | E-Commerce: Quality and Quantity",
  description: TAGLINE,
  keywords: "StoreThing, storething, e-commerce, goods",
  openGraph: {
    title: "StoreThing",
    description: TAGLINE,
    url: siteUrl,
    siteName: "StoreThing",
    images: [
      {
        url: "https://store-thing.vercel.app/api/og", // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StoreThing",
    description: TAGLINE,
    creator: "@storething",
    images: [
      {
        url: "https://store-thing.vercel.app/api/og", // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} ${poppins.className} antialiased`}>
        <NextTopLoader showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Provider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
