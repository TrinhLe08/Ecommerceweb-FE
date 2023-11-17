"use client";
import React from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";

const HomePage = () => {
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const firstMenu = [
    {
      url: "https://www.leifshop.com/cdn/shop/files/MelonTilesNo.2Painting_800x800_2_1000x.jpg?v=1696031359",
      tilte: "SHOP ORIGIN ARWORK",
      link: "/?product-page=artwork",
      checkSidebar: 2,
    },
    {
      url: "https://www.leifshop.com/cdn/shop/collections/botanicals_480x480.jpg?v=1696521278",
      tilte: "SHOP HOME DECORD",
      link: "/?product-page=home-decord",
      checkSidebar: 1,
    },
  ];
  const secondMenu = [
    {
      url: "https://www.leifshop.com/cdn/shop/collections/serveware_480x480.jpg?v=1686689639",
      tilte: "KITCHEN TOOLS",
      link: "/?product-page=kitchen",
      checkSidebar: 3,
    },
    {
      url: "https://www.leifshop.com/cdn/shop/products/grilledcheeseornament_1000X1000.jpg?v=1664937165",
      tilte: "HOLIDAY GIFTS",
      link: "/?product-page=holiday",
      checkSidebar: 4,
    },
    {
      url: "https://www.leifshop.com/cdn/shop/files/jewelry_hp_1000x.jpg?v=1693169060",
      tilte: "ITEMS IS ON SALE",
      link: "/?product-page=sale",
      checkSidebar: 5,
    },
  ];
  return (
    <div className="home-page grid gap-5 h-fit">
      <div className="w-full first-menu lg:flex grid gap-5 justify-around">
        {firstMenu.map((menu) => (
          <div key={menu.tilte}>
            <img
              src={menu.url}
              alt=""
              className="xl:w-[800px] xl:h-[700px] lg:w-[800px] lg:h-[700px] md:w-[500px] md:h-[600px] w-[300px] h-[400px]"
            />
            <Link
              href={menu.link}
              onClick={() => setCheckSidebar(menu.checkSidebar)}
              className="flex w-full text-xl justify-center mt-1 underline"
            >
              {menu.tilte}
            </Link>
          </div>
        ))}
      </div>
      <div className="second-menu lg:flex grid justify-around">
        {secondMenu.map((menu) => (
          <div key={menu.tilte}>
            <img src={menu.url} alt="" className="w-[350px] h-[450px]" />
            <Link
              href={menu.link}
              onClick={() => setCheckSidebar(menu.checkSidebar)}
              className="flex w-full text-xl justify-center mt-1 underline"
            >
              {menu.tilte}
            </Link>
          </div>
        ))}
      </div>
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
  );
};

export default HomePage;
