import { SITE_URL, asset } from "@/utils/basePath";
import type { Metadata } from "next";
import Footer from "./Footer";
import "./globals.css";
import Header from "./Header";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "나에게 맞는 IT 직군은?",
  description: "2025 고려대학교 동아리박람회 @KUCC",
  openGraph: {
    images: ["/banner.png"],
  },
  icons: {
    icon: [{ url: asset("/favicon.ico") }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-dvh w-full flex-col items-center justify-center bg-base-200">
        <Header />
        <div className="flex h-dvh w-full max-w-md flex-col justify-between bg-white shadow-md">
          <main className="h-full shrink overflow-y-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
