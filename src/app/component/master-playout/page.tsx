"use client";
import dynamic from "next/dynamic";
import dotenv from "dotenv";
import Footer from "./footer/page";
import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";
import { AtomMenuBar } from "@/app/recoil/menu-bar-provider";
dotenv.config();

const Header = dynamic(() => import("./header/page"), {
  ssr: false,
});
const SideBar = dynamic(() => import("./sidebar/page"), {
  ssr: false,
});
const FilterBar = dynamic(() => import("./filter-bar/page"), {
  ssr: false,
});
const ShoppingList = dynamic(() => import("../admin/shopping-list/page"), {
  ssr: false,
});
interface MasterPlayOutProps {
  Component: React.ComponentType<any>;
  value: boolean;
}

const MasterLayOut: React.FC<MasterPlayOutProps & { value: boolean }> = ({
  Component,
  value,
}) => {
  const [checkMenuBar, setCheckMenuBar] = useRecoilState(AtomMenuBar);
  if (window.innerWidth > 1000 && value === false) {
    setCheckMenuBar(true);
  } else if (window.innerWidth > 1000 && value === true) {
    setCheckMenuBar(false);
  }

  return (
    <div className="master-playout relative grid justify-between w-full h-full ">
      <Header />
      <FilterBar />
      <div className="flex">
        <SideBar />
        <Component />
      </div>
      <Footer />
    </div>
  );
};

export default MasterLayOut;
