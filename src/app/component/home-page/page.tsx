"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { AtomReturnInformationWhenLogin } from "@/app/recoil/information-user-provider";
import { openNotification } from "@/app/global/notification/noitification";

const HomePage = () => {
  const router = useRouter();
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
      openNotification("Welcome to Leif .", 2, "success");
    }
  }, []);

  return (
    <div className="home-page font-serif grid gap-5 h-fit w-[80%] border-t border-gray-300 p-4">
      <div className="w-full h-full first-menu lg:grid grid gap-5 justify-around">
        <img
          className="w-screen"
          src={urlTopicPhoto}
          alt=""
        />
        <p className="text-center font-bold text-2xl">
          At Leif, we embrace a philosophy of warm minimalism—a modern aesthetic that exudes comfort and soul.
          This is brought to life through our championing of natural materials, a soft neutral palette, and accents of geometric and organic patterns.
        </p>
      </div>
      <div className="second-menu lg:grid grid justify-around  border-t-2 border-slate-200 p-5 gap-7">
        <p className="text-center font-bold text-lg leading-relaxed">
          Our products are meticulously curated to offer a truly distinct experience.
          Rather than commonplace items, you will discover unique art pieces, exquisite handcrafted ceramics, sculptural vases that are artworks in their own right, elegant stationery, and refined gifts for every occasion.
          Each item holds its own narrative and bears the unique imprint of its creator.
        </p>
        <div className="flex gap-5">
          <img className="w-[30%]" src={urlArtwork} alt="" />
          <div className="w-full h-full flex justify-center items-center text-center text-lg leading-relaxed">
            <p>
              In our space, every piece is a testament to pure creativity.
              We are not merely a store, but a curated gallery—where we are passionately committed to serving as a steadfast and inspiring bridge,
              connecting the hearts of art enthusiasts with the hands and minds of talented independent artists and designers.
              <span className="underline decoration-2 underline-offset-3 text-red-500 hover:text-red-700 hover:decoration-red-700 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  router.push('?product-page=artwork');
                  setCheckSidebar(2);
                }}> We invite you to visit and experience this unique connection for yourself.</span>
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-full h-full flex justify-center items-center text-center text-lg leading-relaxed">
            <p>
              Our edit of home essentials redefines the ordinary, presenting singular artistic statements chosen to endow your space with narrative and emotion.
              These are not just decorations but the very details that compose a dwelling of profound comfort and individual expression.
              <span
                className="underline decoration-2 underline-offset-3 text-red-500 hover:text-red-700 hover:decoration-red-700 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  router.push('?product-page=home-decord');
                  setCheckSidebar(1);
                }}
              >
                Visit us to find the pieces that will complete your story.
              </span>
            </p>
          </div>
          <img className="w-[40%]" src={urlHomeDecor} alt="" />
        </div>
        <div className="flex gap-5 p-4">
          <img className="w-[30%] " src={urlKitchen} alt="Kitchenware" />
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-center text-lg leading-relaxed">
              <span className="underline decoration-2 underline-offset-3 text-red-500 hover:text-red-700 hover:decoration-red-700 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  router.push('?product-page=kitchen');
                  setCheckSidebar(3)
                }}
              >Discover our kitchenware collection</span>
              —where exquisite craftsmanship meets flawless utility.
              Each piece is not just a reliable kitchen aid but also a decorative work of art,
              elevating your cooking space to new heights of sophistication and inspired elegance.
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-full h-full flex justify-center items-center text-center text-lg leading-relaxed">
            <p>
              <span className="underline decoration-2 underline-offset-3 text-red-500 hover:text-red-700 hover:decoration-red-700 cursor-pointer transition-colors duration-200"
                onClick={() => {
                  router.push('?product-page=holiday');
                  setCheckSidebar(4)
                }}> Step into a world of celebration </span>
              with a collection designed to turn life's highlights into lasting impressions.
              Discover heartfelt gifts chosen to convey deep emotion and enchanting decorations that capture the season's spirit,
              transforming your home into a canvas of joy and vibrant color.
            </p>
          </div>
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
    </div >
  );
};

export default React.memo(HomePage);
