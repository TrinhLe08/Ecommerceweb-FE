"use client";
import { Inter } from "next/font/google";
import Head from "next/head";
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
    <RecoilRoot>
      <html lang="en">
        <Head>
          <link rel="shortcut icon" href="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109" />
        </Head>
        <body className={inter.className}>{children}</body>
      </html>
    </RecoilRoot>
  );
}
