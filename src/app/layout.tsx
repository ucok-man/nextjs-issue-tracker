import Navbar from "@/components/navbar";
import Providers from "@/context/providers";
import { Container } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Tutorial Purpose only :)",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          <Navbar />
          <main className="px-5">
            <Container>{children}</Container>
          </main>
        </Providers>
      </body>
    </html>
  );
}
