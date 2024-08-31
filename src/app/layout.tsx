"use client";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import "./globals.css";
import "./style.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>LEIF SHOP</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <RecoilRoot>
        <body className={inter.className}>{children}</body>
      </RecoilRoot>
    </html>
  );
}
