"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import { useEffect, useState } from "react";
import Header from "@/components/navbar";
import Footer from "@/components/footer";

import PreLoader from "@/components/common/pre-loader";
import ScrollToTop from "@/components/common/scroll-to-top";
import ToasterContext from "./api/toast/ToastContext";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <SessionProvider>
            <NextUIProvider>
              <ThemeProvider
                attribute="class"
                enableSystem={true}
                defaultTheme="light"
              >
                <ToasterContext />
                <Header />
                {children}
                <Footer />
                <ScrollToTop />
              </ThemeProvider>
            </NextUIProvider>

          </SessionProvider>
        )}
      </body>
    </html>
  );
}
