"use client";
import dynamic from "next/dynamic";
import dotenv from "dotenv";
import Footer from "./footer/page";
import React, { ReactElement } from "react";
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
interface MasterPlayOutProps {
  Component: React.ComponentType<any>;
}

const MasterLayOut: React.FC<MasterPlayOutProps> = ({ Component }) => {
  return (
    <div className="master-playout grid justify-between w-full h-full">
      <Header />
      <FilterBar />
      <div className="flex ">
        <SideBar />
        <Component />
      </div>
      <Footer />
    </div>
  );
};

export default MasterLayOut;
