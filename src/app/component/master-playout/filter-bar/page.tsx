"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { X } from "lucide-react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { AtomProductListContext } from "@/app/recoil/product-list-provider";
import { ProductType } from "@/app/util/product.type";
import { AtomMenuBar } from "@/app/recoil/menu-bar-provider";
import { AtomResetLimitProductListPage } from "@/app/recoil/reset-limit-product-list-page-provider";

const FilterBar = () => {
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [__, setProductList] = useRecoilState(AtomProductListContext);
  const [___, setMenuBar] = useRecoilState(AtomMenuBar);
  const [____, setResetLimitProductListPage] = useRecoilState(
    AtomResetLimitProductListPage
  );
  const checkSidebar = useRecoilValue(AtomSidebaCheckUnderline);
  const productList = useRecoilValue(AtomProductListContext);
  const [checkPropdown, setCheckPropdown] = useState(false);
  const checkMenuBar: boolean = useRecoilValue(AtomMenuBar);
  const [isAtTop, setIsAtTop] = useState(false);
  const targetRef = useRef(null);

  const items: MenuProps["items"] = [
    {
      label: (
        <button
          onClick={() => {
            const newList: ProductType[] = [...productList];
            newList.sort((a, b) => {
              if (a.price && b.price) {
                return b.price - a.price;
              }
              return 0;
            });
            setProductList(newList);
          }}
        >
          Expensive
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button
          onClick={() => {
            const newList: ProductType[] = [...productList];
            newList.sort(
              (a: ProductType, b: ProductType) =>
                (a.price || 0) - (b.price || 0)
            );
            setProductList(newList);
          }}
        >
          Low price
        </button>
      ),
      key: "1",
    },
  ];


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Khi component chạm vào đầu viewport
        setIsAtTop(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 1.0, // Kích hoạt khi 100% component visible
        rootMargin: '210px',
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    // <div className="fixed inset-x-0 top-0 z-50 w-full flex justify-between items-center text-2xl px-10 py-5 bg-white dark:bg-gray-900 dark:text-white shadow-md">
    <>
      <div ref={targetRef} className="absolute top-0 h-px w-full" />
      <div className={`
        w-full flex justify-between text-2xl px-10 py-5
        ${!isAtTop ?
          'fixed top-0 z-50 bg-white dark:bg-gray-900 shadow-lg transition-all' :
          'relative'
        }
      `}>
        < button
          className="lg:hidden flex transition-all duration-500 ease-in-out"
          onClick={() => setMenuBar(!checkMenuBar)}
        >
          {checkMenuBar ? <AlignJustify /> : <X />}
        </button>
        <Link
          href="/?product-page=all-product"
          onClick={() => {
            setCheckSidebar(6);
            setResetLimitProductListPage(1);
          }}
          className={
            checkSidebar === 6
              ? "text-gray-500 italic font-serif font-thin underline"
              : "text-gray-500 italic font-serif font-thin "
          }
        >
          All product
        </Link>

        <Link
          href="/?product-page=home-decord"
          className={
            checkSidebar === 1
              ? "lg:flex hidden italic underline w-fit font-serif font-normal text-lg"
              : "lg:flex hidden italic w-fit font-serif font-normal text-lg"
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
              ? "lg:flex hidden italic underline w-fit font-serif font-normal text-lg"
              : "lg:flex hidden italic w-fit font-serif font-normal text-lg"
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
              ? "lg:flex hiddenitalic underline w-fit font-serif font-normal text-lg"
              : "lg:flex hidden italic w-fit font-serif font-normal text-lg"
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
              ? "lg:flex hiddenitalic underline w-fit font-serif font-normal text-lg"
              : "lg:flex hidden italic w-fit font-serif font-normal text-lg"
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
              ? "lg:flex hiddenitalic underline w-fit font-serif font-normal text-lg"
              : "lg:flex hidden italic w-fit font-serif font-normal text-lg"
          }
          onClick={() => {
            setCheckSidebar(5);
            setResetLimitProductListPage(1);
          }}
        >
          SALE
        </Link>


        <Dropdown menu={{ items }} trigger={["click"]}>
          <a
            onClick={(e) => {
              setCheckPropdown(!checkPropdown);
              e.preventDefault();
            }}
          >
            <Space>
              <button className="flex gap-1 items-center text-base">
                SORT BY{" "}
                {checkPropdown ? (
                  <ChevronUp size={19} />
                ) : (
                  <ChevronDown size={19} />
                )}
              </button>
            </Space>
          </a>
        </Dropdown>
      </div >
    </>
  );
};

export default React.memo(FilterBar);
