import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rova AI Academy",
  description: "Learn AI Automation in Bangla",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        {/* Fonts: Poppins (heading), Inter (body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-100 text-neutral-900" style={{fontFamily:"Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"}}>
        <header className="font-[Poppins]">
          {/* Header already renders inside; font applied via global */}
        </header>
        {children}
      </body>
    </html>
  );
}
