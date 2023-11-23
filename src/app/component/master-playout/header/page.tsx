"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { AtomShoppingCart } from "@/app/recoil/shopping-cart-provider";
import { productApis } from "@/app/apis/product-apis";
import { ProductType } from "@/app/utils/product.type";

const Header = () => {
  const [valueSearch, setValueSearch] = useState([]);
  const [allProduct, setValueAllProdcut] = useState([]);
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const shoppingCartValue = useRecoilValue(AtomShoppingCart);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const allProduct = await productApis.getAllProduct();
        setValueAllProdcut(allProduct.data);
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    };
    getAllProduct();
  }, []);
  const SearchProduct = (value: string) => {
    const convertValueInput = value.toUpperCase();
    const searchValue = allProduct.filter((v: ProductType) =>
      v.name.toUpperCase().includes(convertValueInput)
    );
    setValueSearch(searchValue);
  };
  window.addEventListener("scroll", function () {
    setValueSearch([]);
  });

  return (
    <div className="header grid gap-2 border-b-2 border-black-500 pb-10 w-full">
      <div className="bg-orange-100 w-full h-fit lg:flex grid text-center justify-center items-center gap-1">
        FREE SHIPPING ON ORDERS $135 OR MORE — USE CODE:
        <span className="font-semibold text-center">FREESHIP23</span>
      </div>
      <div className="w-full flex justify-between items-center px-5">
        <div>
          <div className="flex gap-2 h-fit lg:w-fit w-[80px]">
            <Search strokeWidth={1} />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => SearchProduct(e.target.value)}
              onBlur={() => setTimeout(() => setValueSearch([]), 500)}
              className="italic focus:outline-none font-serif font-thin lg:w-full w-[80px]"
            />
          </div>

          {valueSearch.length > 0 ? (
            <div className="fixed h-fit bg-white z-10 ml-5 p-5 grid gap-3 font-serif font-thin italic border-l-4 border-red-700">
              {valueSearch.map((value: ProductType) => (
                <Link
                  href={`/?product-detail=${value.id}`}
                  key={value.id}
                  className="hover:underline"
                >
                  {value.name}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <Link href="/" onClick={() => setCheckSidebar(0)}>
          <img
            src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
            alt=""
            className="w-36"
          />
        </Link>
        <Link
          href="/?shopping-cart=my-shopping-list"
          className="sm:flex grid justify-center gap-2"
          onClick={() => setCheckSidebar(0)}
        >
          <span className="text-gray-500 italic font-serif font-thin">
            Shopping cart
          </span>
          <span className="flex justify-center">
            <ShoppingCart strokeWidth={1} />
          </span>
          <span className="text-gray-500 italic font-serif font-thin">
            ({shoppingCartValue.length})
          </span>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Header);
