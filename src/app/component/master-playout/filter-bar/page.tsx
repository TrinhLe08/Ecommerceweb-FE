"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { AtomProductListContext } from "@/app/recoil/product-list-provider";
import { ProductType } from "@/app/utils/product.type";

const FilterBar = () => {
  const [x, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const checkSidebar = useRecoilValue(AtomSidebaCheckUnderline);
  const productList = useRecoilValue(AtomProductListContext);
  const [y, setProductList] = useRecoilState(AtomProductListContext);
  const [checkPropdown, setCheckPropdown] = useState(false);
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          onClick={() => {
            const newList: ProductType[] = [...productList];
            newList.sort((a: ProductType, b: ProductType) => b.price - a.price);
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
            newList.sort((a: ProductType, b: ProductType) => a.price - b.price);
            setProductList(newList);
          }}
        >
          Low price
        </button>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
  ];
  return (
    <div className="w-full flex justify-between text-2xl px-10 mb-10 mt-5">
      <Link
        href="/?product-page=all-product"
        onClick={() => setCheckSidebar(6)}
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
