"use client";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { AtomReturnInformationWhenLogin } from "@/app/recoil/information-user-provider";
import { openNotification } from "@/app/global/notification/noitification";

const HomePage = () => {
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [__, setReturnInformation] = useRecoilState(
    AtomReturnInformationWhenLogin
  );
  const urlTopicPhoto = "https://media.architecturaldigest.com/photos/5e6a42b25c94700009daa7d7/master/w_1920%2Cc_limit/AD0420_DIRAND_7.jpg"
  const urlArtwork = "https://image.invaluable.com/housePhotos/Izsolu/44/596844/H20345-L105490608.jpg"
  const urlHomeDecor = "https://media.designcafe.com/wp-content/uploads/2020/08/11193522/living-room-decor-ideas.jpg"
  const urlKitchen = "https://www.leifshop.com/cdn/shop/files/shop.jpg?v=1718894153&width=1500"
  const urlHoliday = "https://buchanansplants.com/wp-content/uploads/2021/11/E6r40w0w-scaled.jpeg"

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dataString = urlParams.get('token');

    if (dataString) {
      const responseData = JSON.parse(decodeURIComponent(dataString));
      localStorage.setItem("accessToken", responseData.token);
      setReturnInformation(responseData);
      window.history.replaceState({}, '', '/');
      openNotification("Welcome back .", 2, "success");
    }
  }, []);



  return (
    <div className="home-page  font-serif  grid gap-5 h-fit w-[80%] border-t border-gray-300 p-4">
      <div className="w-full h-full first-menu lg:grid grid gap-5 justify-around">
        <img
          className="w-[100%]"
          src={urlTopicPhoto}
          alt=""
        />
        <p className="text-center font-bold text-2xl">
          Leif's aesthetic is modern and minimalist, yet exudes warmth and a distinct spirit.
          We champion natural materials (wood, stone, ceramic, glass, ...),
          employ a gentle neutral color palette, and accent with geometric or nature-inspired patterns.
        </p>
      </div>
      <div className="second-menu lg:grid grid justify-around  border-t-2 border-slate-200 p-5 gap-7">
        <p className="text-center font-bold">
          Our products are meticulously curated to offer a truly distinct experience.
          Rather than commonplace items, you will discover unique art pieces, exquisite handcrafted ceramics, sculptural vases that are artworks in their own right, elegant stationery, and refined gifts for every occasion.
          Each item holds its own narrative and bears the unique imprint of its creator.
        </p>
        <div className="flex gap-5">
          <img className="w-[30%]" src={urlArtwork} alt="" />
          <p className="w-full h-full flex justify-center items-center text-center">
            In our space, every piece is a testament to pure creativity.
            We are not merely a store, but a curated gallery—where we are passionately committed to serving as a steadfast and inspiring bridge,
            connecting the hearts of art enthusiasts with the hands and minds of talented independent artists and designers.
          </p>
        </div>
        <div className="flex gap-5">
          <p className="w-full h-full flex justify-center items-center text-center">
            Going beyond ordinary items, our collection of home decor features unique artistic pieces, carefully selected to breathe soul into your space.
            Each item is not merely a decoration, but a refined accent that helps craft an ideal home—a sanctuary brimming with warmth and personal style.
          </p>
          <img className="w-[40%]" src={urlHomeDecor} alt="" />
        </div>
        <div className="flex gap-5">
          <img className="w-[30%]" src={urlKitchen} alt="Kitchenware" />
          <p className="w-full h-full flex justify-center items-center text-center">
            Discover our kitchenware collection—where exquisite craftsmanship meets flawless utility.
            Each piece is not just a reliable kitchen aid but also a decorative work of art,
            elevating your cooking space to new heights of sophistication and inspired elegance.
          </p>
        </div>
        <div className="flex gap-5">
          <p className="w-full h-full flex justify-center items-center text-center">
            Transform every special moment into a sparkling memory with our festive decoration collection.
            From meaningful, hand-picked gifts that touch the recipient's heart to decorative items that fill your living space with the vibrant colors and
            joy of the season.
          </p>
          <img className="w-[35%]" src={urlHoliday} alt="" />
        </div>
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
