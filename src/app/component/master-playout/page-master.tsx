"use client";
import dynamic from "next/dynamic";
import dotenv from "dotenv";
import Footer from "./footer/page";
import React, { useEffect } from "react";
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

interface MasterPlayOutProps {
  Component: React.ComponentType<any>;
  value: boolean;
}

const MasterLayOut: React.FC<MasterPlayOutProps & { value: boolean }> = ({
  Component,
  value,
}) => {
  const [_, setCheckMenuBar] = useRecoilState(AtomMenuBar);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000 && value === false) {
        setCheckMenuBar(true);
      } else if (window.innerWidth > 1000 && value === true) {
        setCheckMenuBar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [value, setCheckMenuBar]);

  return (
<div className="master-playout relative grid justify-between w-full h-full bg-white dark:bg-gray-900 dark:text-white">
  <Header />
  <FilterBar />
  <div className="flex justify-center bg-white dark:bg-gray-900">
    <SideBar />
    <Component />
  </div>
  <Footer />
</div>
  );
};

export default MasterLayOut;
