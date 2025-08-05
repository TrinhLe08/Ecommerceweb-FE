"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { ShoppingCart } from "lucide-react";
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
import { openNotification } from "@/app/global/notification/noitification";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      enableDarkMode();
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  };

  const enableDarkMode = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setIsDark(true);
  };

  const disableDarkMode = () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    setIsDark(false);
  };

  return (
    <button
      type="button"
      className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none ${isDark ? 'bg-gray-700' : 'bg-gray-300'
        }`}
      onClick={toggleDarkMode}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
        <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDark ? 'translate-x-8' : 'translate-x-0'
          }`}
      />
    </button>
  );
};

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
      openNotification('Login session expired, please log in again .', 4);
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

  useEffect(() => {
    const handleScroll = () => {
      setValueSearch([]);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <div className="bg-orange-100 w-full h-fit lg:flex grid text-center justify-center items-center gap-1 dark:text-black dark:bg-sky-500/50">
        WELCOME TO
        <span className="font-semibold text-center">LEIF SHOP</span>
      </div>
      <div className="w-full sm:flex grid justify-between text-center items-center px-5">
        <div>
          <div className="grid gap-4">
            <div className="flex justify-start">
              <DarkModeToggle />
            </div>

            <div className="flex gap-2 h-fit lg:w-fit w-[80px] ">
              <Search strokeWidth={1} />
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => SearchProduct(e.target.value)}
                onBlur={() => setTimeout(() => setValueSearch([]), 500)}
                className="  italic focus:outline-none font-serif font-thin 
                             w-[200px] 
                             border-b border-black dark:border-white
                             bg-transparent
                             dark:bg-gray-900
                             text-black dark:text-white
                             placeholder-gray-500 dark:placeholder-gray-400
                             transition-colors duration-20"/>
            </div>
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
            alt="Leifshop Logo"
            className="w-[80%] dark:hidden filter brightness-0"
          />
          <img
            src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
            alt="Leifshop Logo"
            className="w-[80%] hidden dark:block filter invert"
          />
        </Link>

        <div className="grid justify-center gap-2 font-serif font-thin">
          <div className="text-yellow-600 grid justify-center border-b border-black-600 p-3">
            {informationUserWhenLogin?.hasOwnProperty("email") &&
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
                  {informationUserWhenLogin.name
                    ? (informationUserWhenLogin.name.length > 20
                      ? informationUserWhenLogin.name.substring(0, 20) + "..."
                      : informationUserWhenLogin.name)
                    : (informationUserWhenLogin.email.length > 20
                      ? informationUserWhenLogin.email.substring(0, 20) + "..."
                      : informationUserWhenLogin.email)
                  }
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
            <span className="text-gray-500 italic font-serif font-thin dark:text-white">
              Shopping cart
            </span>
            <span className="flex justify-center">
              <ShoppingCart strokeWidth={1} />
            </span>
            <span className="text-gray-500 italic font-serif font-thin text-center dark:text-white">
              ({shoppingCartValue.length})
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
