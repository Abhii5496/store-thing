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

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
