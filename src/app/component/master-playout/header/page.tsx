"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { notification } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { AtomShoppingCart } from "@/app/recoil/shopping-cart-provider";
import { productApis } from "@/app/apis/product-apis";
import { ProductType } from "@/app/util/product.type";
import {
  AtomInformationUser,
  AtomReturnInformationWhenLogin,
} from "@/app/recoil/information-user-provider";
import { userApis } from "@/app/apis/user-apis";

const Header = () => {
  const router = useRouter();
  const [valueSearch, setValueSearch] = useState([]);
  const [allProduct, setValueAllProdcut] = useState([]);
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [__, setValueReturnLogin] = useRecoilState(
    AtomReturnInformationWhenLogin
  );
  const [___, setInfor] = useRecoilState(AtomInformationUser);

  const informationUserWhenLogin = useRecoilValue(
    AtomReturnInformationWhenLogin
  );
  const shoppingCartValue = useRecoilValue(AtomShoppingCart);
  const openNotificationAutomaticLogout = () => {
    notification.open({
      message: "Login session expired, please log in again .",
      description: "Your order is being processed .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
      duration: null,
    });
  };
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const allProduct = await productApis.getAllProduct();
        setValueAllProdcut(allProduct.data);
        return;
      } catch (err) {
        localStorage.clear();
        router.push("/?login-page=true");
        return;
      }
    };
    getAllProduct();
  }, []);
  useEffect(() => {
    const automaticLogout = () => {
      localStorage.clear();
      setValueReturnLogin({});
      openNotificationAutomaticLogout();
      router.push("/?login-page=true");
    };

    const timeout = setTimeout(automaticLogout, 24 * 60 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, []);
  const SearchProduct = (value: string) => {
    const convertValueInput = value.toUpperCase();
    const searchValue: any = allProduct.filter((v: any) =>
      v.name.toUpperCase().includes(convertValueInput)
    );
    setValueSearch(searchValue);
  };
  window.addEventListener("scroll", function () {
    setValueSearch([]);
  });
  const profileUser = async () => {
    try {
      const dataUser = await userApis.getDetailUser(
        informationUserWhenLogin.id
      );
      setInfor(dataUser.data);
      router.push("/?profile-page=my-profile-page");
      return;
    } catch (err) {
      localStorage.clear();
      router.push("/?login-page=true");
      return;
    }
  };

  return (
    <div className="header grid gap-2 border-b-2 border-black-500 pb-10 w-full">
      <div className="bg-orange-100 w-full h-fit lg:flex grid text-center justify-center items-center gap-1">
        WELCOME TO
        <span className="font-semibold text-center">LEIF SHOP</span>
      </div>
      <div className="w-full sm:flex grid justify-between text-center items-center px-5">
        <div>
          <div className="flex gap-2 h-fit lg:w-fit w-[80px]">
            <Search strokeWidth={1} />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => SearchProduct(e.target.value)}
              onBlur={() => setTimeout(() => setValueSearch([]), 500)}
              className="italic focus:outline-none font-serif font-thin w-[200px]"
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
        <Link
          href="/"
          onClick={() => setCheckSidebar(0)}
          className="flex justify-center"
        >
          <img
            src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
            alt=""
            className="w-[80%]"
          />
        </Link>

        <div className="grid justify-center gap-2 font-serif font-thin">
          <div className="text-yellow-600 border-b border-black-600 p-3">
            {informationUserWhenLogin.hasOwnProperty("email") &&
            informationUserWhenLogin.hasOwnProperty("urlAvatar") ? (
              <button className="grid text-center" onClick={profileUser}>
                <div className="flex justify-center">
                  <img
                    src={
                      informationUserWhenLogin.urlAvatar !== ""
                        ? informationUserWhenLogin.urlAvatar
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixWENwTZdvqJbo7WMo7JJX4yBrk5Mif_bxg&s"
                    }
                    alt=""
                    className="w-14 rounded-full"
                  />
                </div>
                <p>
                  {informationUserWhenLogin.email.length > 20
                    ? informationUserWhenLogin.email.substring(0, 20) + "..."
                    : informationUserWhenLogin.email}
                </p>
              </button>
            ) : (
              <div>
                <Link href="/?register-page=true" className="underline ">
                  Register
                </Link>{" "}
                /{" "}
                <Link href="/?login-page=true" className="underline ">
                  Login
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/?shopping-cart=my-shopping-list"
            className="sm:flex grid justify-center gap-2 text-center"
            onClick={() => setCheckSidebar(0)}
          >
            <span className="text-gray-500 italic font-serif font-thin">
              Shopping cart
            </span>
            <span className="flex justify-center">
              <ShoppingCart strokeWidth={1} />
            </span>
            <span className="text-gray-500 italic font-serif font-thin  text-center">
              ({shoppingCartValue.length})
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
