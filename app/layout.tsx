import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";
import { Inter, Poppins } from "next/font/google"; // ✅ Google Fonts

// Fonts config
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "Rova AI Academy",
  description: "Learn AI Automation in Bangla",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={`${inter.className} ${poppins.className} bg-neutral-100 text-neutral-900`}>
        <Header />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <Footer />
        <Providers />
      </body>
    </html>
  );
}
