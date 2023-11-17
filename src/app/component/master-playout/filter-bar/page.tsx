"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";

const FilterBar = () => {
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const checkSidebar = useRecoilValue(AtomSidebaCheckUnderline);
  const [checkPropdown, setCheckPropdown] = useState(false);
  const items: MenuProps["items"] = [
    {
      label: <button>Expensive</button>,
      key: "0",
    },
    {
      label: <button>Low price</button>,
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
