import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./index.scss";
import "./home.scss";
import "./auth.scss";
import "./components.scss";
import "./profile.scss";
import "./withdrawl-details.scss";
import "./withdrawl.scss";
import "./horizontal-carousel.scss";

import DataProvider from "@/context/DataContext";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "One Novel",
  description:
    "One Novel, where every page tells a story, is a platform for writers to write and readers to read.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#f5f4f0"></meta>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href="/logo.png" rel="icon" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <DataProvider>
        <body className={inter.className}>
          <NextTopLoader color="#efd697" showSpinner={false} />
          {children}
          <div id="overlay" className="hidden"></div>
        </body>
      </DataProvider>
    </html>
  );
}
