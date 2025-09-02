import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers"; // 👈 নতুন লাইন

export const metadata: Metadata = {
  title: "Rova AI Academy",
  description: "Learn AI Automation in Bangla",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-100 text-neutral-900">
        <Header />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <Footer />
        <Providers />
      </body>
    </html>
  );
}
