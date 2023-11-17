"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";

const Header = () => {
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);

  return (
    <div className="header grid gap-2 border-b-2 border-black-500 pb-10 w-full">
      <div className="bg-orange-100 w-full h-fit lg:flex grid text-center justify-center items-center gap-1">
        FREE SHIPPING ON ORDERS $135 OR MORE — USE CODE:
        <span className="font-semibold text-center">FREESHIP23</span>
      </div>
      <div className="w-full flex justify-between items-center px-5">
        <div className="flex gap-2 h-fit lg:w-fit  w-[30%]">
          <Search strokeWidth={1} />
          <input
            type="text"
            placeholder="Search"
            className="italic focus:outline-none font-serif font-thin"
          />
        </div>
        <Link href="/" onClick={() => setCheckSidebar(0)}>
          <img
            src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
            alt=""
            className="w-36"
          />
        </Link>
        <button className="sm:flex grid justify-center gap-2">
          <span className="text-gray-500 italic font-serif font-thin">
            Shopping cart
          </span>
          <span className="flex justify-center">
            <ShoppingCart strokeWidth={1} />
          </span>
          <span className="text-gray-500 italic font-serif font-thin">(0)</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
