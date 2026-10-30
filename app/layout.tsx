import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/store-context";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food City | Fresh Food, Better Life & Inventory Management",
  description:
    "Quality groceries, fresh produce, and everyday essentials with real-time inventory management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f8fafc] text-gray-900 font-sans">
        <StoreProvider>
          <Suspense fallback={<div className="h-20 bg-white" />}>
            <SiteNavbar />
          </Suspense>
          <div className="flex-1 flex flex-col">
            <Suspense fallback={<div className="p-12 text-center text-gray-400">Loading...</div>}>
              {children}
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <SiteFooter />
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
