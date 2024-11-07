"use client";
import React, { useState } from "react";
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
  return (
    <div className="w-full flex justify-between text-2xl px-10 mb-10 mt-5">
      <button
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
    </div>
  );
};

export default React.memo(FilterBar);
