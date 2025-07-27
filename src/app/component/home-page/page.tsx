"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { AtomReturnInformationWhenLogin } from "@/app/recoil/information-user-provider";

const HomePage = () => {
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [__, setReturnInformation] = useRecoilState(
    AtomReturnInformationWhenLogin
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataString = urlParams.get('token');

    if (dataString) {
      const responseData = JSON.parse(decodeURIComponent(dataString));

      setReturnInformation(responseData);
      localStorage.setItem("accessToken", responseData.token);

      window.history.replaceState({}, '', '/');
    }
  }, []);

  const firstMenu = [
    {
      url1: "https://images.saatchiart.com/saatchi/425969/art/8694258/7757825-WUECRQDY-7.jpg",
      url2: "https://images.saatchiart.com/saatchi/307665/art/2901357/1971250-HSC00001-7.jpg",
      title: "SHOP ORIGIN ARWORK",
      link: "/?product-page=artwork",
      checkSidebar: 2,
    },
    {
      url1: "https://www.leifshop.com/cdn/shop/files/naninincense.jpg?v=1738726139&width=823",
      url2: "https://www.leifshop.com/cdn/shop/products/tickingstripeframecopy.jpg?v=1679944880&width=823",
      title: "SHOP HOME DECORD",
      link: "/?product-page=home-decord",
      checkSidebar: 1,
    },
  ];

  const secondMenu = [
    {
      url1: "https://www.tillyliving.com/cdn/shop/products/2_686e478c-e9d1-4fa0-a10c-fa208df2a077.jpg?v=1655774105",
      url2: "https://www.leifshop.com/cdn/shop/collections/serveware_480x480.jpg?v=1686689639",
      title: "KITCHEN TOOLS",
      link: "/?product-page=kitchen",
      checkSidebar: 3,
    },
    {
      url1: "https://static.vinwonders.com/production/Christmas-Gifts-4.jpg",
      url2: "https://www.leifshop.com/cdn/shop/products/grilledcheeseornament_1000X1000.jpg?v=1664937165",
      title: "HOLIDAY GIFTS",
      link: "/?product-page=holiday",
      checkSidebar: 4,
    },
    {
      url1: "https://www.leifshop.com/cdn/shop/products/redcherriescard.jpg?v=1651006516&width=360",
      url2: "https://www.leifshop.com/cdn/shop/files/jewelry_hp_1000x.jpg?v=1693169060",
      title: "ITEMS IS ON SALE",
      link: "/?product-page=sale",
      checkSidebar: 5,
    },
  ];
  return (
    <div className="home-page grid gap-5 h-fit w-[70%] border-t border-gray-300 p-4">
      <div className="w-full h-full first-menu lg:flex grid gap-5 justify-around">
        {
          firstMenu.map((menu) => (
            <div
              key={menu.title}
              className="grid relative group"
            >
              <div className=" xl:w-[500px] xl:h-[700px] lg:w-[500px] lg:h-[700px] md:w-[500px] md:h-[600px] w-[300px] h-[400px]">
                <img
                  src={menu.url1}
                  alt=""
                  className="xl:ml-0 xl:w-[500px] xl:h-[700px] lg:ml-0 lg:w-[500px] lg:h-[700px] md:ml-0 md:w-[500px] md:h-[600px] ml-[-50px] w-[300px] h-[400px] absolute top-0 left-0 transition-opacity duration-500 group-hover:opacity-0"
                />
                <img
                  src={menu.url2}
                  alt=""
                  className="xl:ml-0 xl:w-[500px] xl:h-[700px] lg:ml-0 lg:w-[500px] lg:h-[700px] md:ml-0 md:w-[500px] md:h-[600px] ml-[-50px] w-[300px] h-[400px] absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              </div>
              <Link
                href={menu.link}
                onClick={() => setCheckSidebar(menu.checkSidebar)}
                className="flex w-full text-xl justify-center mt-1 underline"
              >
                {menu.title}
              </Link>
            </div>
          ))
        }
      </div>
      <div className="second-menu lg:flex grid justify-around">
        {
          secondMenu.map((menu) => (
            <div
              key={menu.title}
              className="grid relative group"
            >
              <div className="w-[330px] h-[450px]">
                <img
                  src={menu.url1}
                  alt={`Hình ảnh ${menu.title}`}
                  className="w-[330px] h-[450px] absolute top-0 left-0 transition-opacity duration-500 group-hover:opacity-0"
                />
                <img
                  src={menu.url2}
                  alt={`Hình ảnh hover ${menu.title}`}
                  className="w-[330px] h-[450px] absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              </div>
              <Link
                href={menu.link}
                onClick={() => setCheckSidebar(menu.checkSidebar)}
                className="flex w-full text-xl justify-center mt-1 underline z-10 relative" // Thêm z-10 và relative để tránh bị đè lên
              >
                {menu.title}
              </Link>
            </div>
          ))
        }
      </div>
      <div className="w-full grid justify-center">
        <div className="h-fit grid gap-5 italic font-serif lg:w-[800px] w[30%] text-center my-10">
          <div className="text-xl font-semibold">THE LEIF LIFESTYLE.</div>
          <p>
            LEIF is a Brooklyn-based, women-owned and operated lifestyle shop full
            of beautiful things for everyday living — we carry an edited
            assortment of home goods, artwork, apothecary, stationery and more,
            all with the intention of bringing beauty to the everyday. We think
            that's what it's all about, and we're so happy you're here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HomePage);
