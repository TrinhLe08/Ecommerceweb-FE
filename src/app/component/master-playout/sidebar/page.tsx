"use client";
import Link from "next/link";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { AtomMenuBar } from "@/app/recoil/menu-bar-provider";
import { AtomResetLimitProductListPage } from "@/app/recoil/reset-limit-product-list-page-provider";
import { AtomProductListContext } from "@/app/recoil/product-list-provider";

const SideBar = () => {
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [__, setResetLimitProductListPage] = useRecoilState(
    AtomResetLimitProductListPage
  );
  const checkMenuBar: boolean = useRecoilValue(AtomMenuBar);
  const checkSidebar = useRecoilValue(AtomSidebaCheckUnderline);
  return (
    <div className="lg:hidden italic font-serif font-normal text-base">
      <div
        className={
          checkMenuBar
            ? "md:grid md:static md:inset-0 md:z-0 md:w-[400px] absolute ml-[-400px] w-[300px] h-[80%] bg-white drop-shadow-r-3xl transition-all duration-300 ease-in-out"
            : "md:grid md:static md:inset-0 md:z-0 md:w-[400px] absolute ml-[0px] w-[300px] h-[80%] bg-white drop-shadow-r-3xl transition-all duration-300 ease-in-out"
        }
      >
        <div
          className={
            checkSidebar === 0
              ? "absolute inset-0 z-10 md:static md:inset-0 md:z-0 w-[300px] h-[700px] grid bg-white inset-0 z-10 ml-[-0] h-fit gap-5 pl-10 mr-14 "
              : "absolute inset-0 z-10 md:static md:inset-0 md:z-0 w-[300px] h-[700px] grid bg-white inset-0 z-10 ml-[-0] h-fit gap-5 pl-10 mr-14 top-[100px] botton-[500px]"
          }
        >
          <Link
            href="/?product-page=home-decord"
            className={
              checkSidebar === 1
                ? "italic underline w-[300px]"
                : "italic w-[300px]"
            }
            onClick={() => {
              setCheckSidebar(1);
              setResetLimitProductListPage(1);
            }}
          >
            HOME DECOR
          </Link>
          <Link
            href="/?product-page=artwork"
            className={
              checkSidebar === 2
                ? "italic underline w-[300px]"
                : "italic w-[300px]"
            }
            onClick={() => {
              setCheckSidebar(2);
              setResetLimitProductListPage(1);
            }}
          >
            ARTWORK
          </Link>
          <Link
            href="/?product-page=kitchen"
            className={
              checkSidebar === 3
                ? "italic underline w-[300px]"
                : "italic w-[300px]"
            }
            onClick={() => {
              setCheckSidebar(3);
              setResetLimitProductListPage(1);
            }}
          >
            KITCHEN & DINING
          </Link>
          <Link
            href="/?product-page=holiday"
            className={
              checkSidebar === 4
                ? "italic underline w-[300px]"
                : "italic w-[300px]"
            }
            onClick={() => {
              setCheckSidebar(4);
              setResetLimitProductListPage(1);
            }}
          >
            HOLIDAY
          </Link>
          <Link
            href="/?product-page=sale"
            className={
              checkSidebar === 5
                ? "italic underline  w-[300px]"
                : "italic w-[300px]"
            }
            onClick={() => {
              setCheckSidebar(5);
              setResetLimitProductListPage(1);
            }}
          >
            SALE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SideBar);
