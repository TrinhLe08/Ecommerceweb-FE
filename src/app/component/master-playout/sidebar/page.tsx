"use client";
import Link from "next/link";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";

const SideBar = () => {
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const checkSidebar = useRecoilValue(AtomSidebaCheckUnderline);
  return (
    <div
      className={
        checkSidebar === 0
          ? "sm:grid hidden sidebar md:w-[400px] w-[300px] h-fit text-2xl gap-5 pl-10 mr-14 "
          : "sm:grid hidden sidebar md:w-[400px] w-[300px] h-fit text-2xl gap-5 pl-10 mr-14 sticky top-[100px] botton-[500px]"
      }
    >
      <Link
        href="/?product-page=home-decord"
        className={checkSidebar === 1 ? "italic underline" : "italic"}
        onClick={() => setCheckSidebar(1)}
      >
        HOME DECOR
      </Link>
      <Link
        href="/?product-page=artwork"
        className={checkSidebar === 2 ? "italic underline" : "italic"}
        onClick={() => setCheckSidebar(2)}
      >
        ARTWORK
      </Link>
      <Link
        href="/?product-page=kitchen"
        className={checkSidebar === 3 ? "italic underline" : "italic"}
        onClick={() => setCheckSidebar(3)}
      >
        KITCHEN & DINING
      </Link>
      <Link
        href="/?product-page=holiday"
        className={checkSidebar === 4 ? "italic underline" : "italic"}
        onClick={() => setCheckSidebar(4)}
      >
        HOLIDAY
      </Link>
      <Link
        href="/?product-page=sale"
        className={checkSidebar === 5 ? "italic underline" : "italic"}
        onClick={() => setCheckSidebar(5)}
      >
        SALE
      </Link>
    </div>
  );
};

export default React.memo(SideBar);
