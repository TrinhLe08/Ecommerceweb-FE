"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { ShoppingCart } from "lucide-react";
import { Facebook } from "lucide-react";
import { Mail } from "lucide-react";
import { AtomDetailProduct } from "@/app/recoil/detail-product-provider";
import { AtomShoppingCart } from "@/app/recoil/shopping-cart-provider";
import { ProductType } from "@/app/util/product.type";
import { OrderDetailType } from "@/app/util/shopping-list.type";
import StarRatings from "react-star-ratings";
import { notification } from "antd";
import FecthDataDetailProduct from "@/app/global/fecth-data-param-detail-product-request";
import { AtomReturnInformationWhenLogin } from "@/app/recoil/information-user-provider";
import { productApis } from "@/app/apis/product-apis";

const DetailProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shoppingCart, setShoppingCart] = useRecoilState(AtomShoppingCart);
  const [_, setDetailProductValue] = useRecoilState(AtomDetailProduct);
  const detailProductValue: ProductType = useRecoilValue(AtomDetailProduct);
  const informationUser = useRecoilValue(AtomReturnInformationWhenLogin);
  const [content, setContent] = useState("");
  const [ratting, setRating] = useState(0);
  const [checkRatting, setCheckRatting] = useState(false);

  useEffect(() => {
    const FecthData = async () => {
      const idProduct: number | null = parseInt(
        searchParams.get("product-detail") || "0",
        10
      );
      try {
        if (idProduct) {
          const dataDetailProduct = await FecthDataDetailProduct(idProduct);
          setDetailProductValue(dataDetailProduct);
          return;
        }
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    };
    FecthData();
  }, [searchParams]);

  const handleInput = (e: any) => {
    setContent(e.target.value);
  };
  const changeRating = (newRating: number) => {
    setRating(newRating);
  };
  const openNotification = () => {
    notification.open({
      message: "Added to cart .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const handleAddToCart = () => {
    const updatedCart = [
      ...shoppingCart,
      {
        idOrder: detailProductValue.id,
        quantity: 1,
        nameOrder: detailProductValue.name,
        urlOrder: detailProductValue.urlProduct,
        priceOrder: detailProductValue.price,
      },
    ];

    const mergedItems = updatedCart.reduce((cart, curr) => {
      const found = cart.find(
        (item: OrderDetailType) => item.idOrder === curr.idOrder
      );
      if (found) {
        found.quantity += curr.quantity;
      } else {
        cart.push({ ...curr });
      }
      return cart;
    }, []);
    setShoppingCart(mergedItems);
    openNotification();
  };
  const commentProduct = async () => {
    try {
      if (content == "") {
        return;
      } else if (ratting == 0 && content != "") {
        setCheckRatting(true);
        return;
      }
      setCheckRatting(false);
      const dataComment = {
        idProduct: detailProductValue.id,
        data: {
          urlAvatarUser: informationUser.urlAvatar,
          email: informationUser.email,
          ratting,
          content,
        },
      };
      const commentProduct = await productApis.commentProduct(dataComment);
      if (commentProduct) {
        setDetailProductValue(commentProduct.data);
        setRating(0);
        setContent(" ");
      }
      return;
    } catch (err) {
      localStorage.clear();
      router.push("/?login-page=true");
      return;
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commentProduct();
    }
  };
  return (
    <div className="grid italic font-serif">
      <div className="detail-product sm:flex sm:text-left grid text-center gap-5 w-full italic font-serif">
        <div>
          <img
            src={detailProductValue.urlProduct}
            alt=""
            className="w-[600px] h-auto"
          />
        </div>
        <div>
          <div className="grid gap-3 border-b-2 border-red pb-10">
            <h1 className="text-2xl font-semibold font-serif italic">
              {detailProductValue.name}
            </h1>
            <StarRatings
              rating={detailProductValue.ratting}
              starRatedColor="yellow"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="3px"
            />
            {detailProductValue.price ? (
              <div className="flex gap-3">
                {(detailProductValue.price / 100).toFixed(2)} ${" "}
                <p className="line-through">
                  {!detailProductValue.status
                    ? `${(detailProductValue.price / 0.7 / 100).toFixed(2)} $`
                    : null}
                </p>
              </div>
            ) : null}

            <button
              className="flex sm:justify-start justify-center font-serif italic hover:underline text-xl text-amber-900 "
              onClick={() => handleAddToCart()}
            >
              <ShoppingCart />
              add to cart
            </button>
          </div>
          <div className="grid gap-3 mt-5 border-b-2 border-red pb-10">
            <p>
              <span className="font-semibold">Size</span> :
              {detailProductValue.size}
            </p>
            <p>
              <span className="font-semibold">Material</span> :
              {detailProductValue.material}
            </p>
            <p>
              <span className="font-semibold">Detail</span> :
              {detailProductValue.detail}
            </p>
            <p>
              <span className="font-semibold">Origin</span> :
              {detailProductValue.origin}
            </p>
          </div>
          <div className="text-center italic font-serif mt-10">
            <h1 className="font-semibold ">
              $12.95 Flat Rate Shipping in the USA
            </h1>
            <p>share with friends:</p>
            <div className="flex justify-center">
              <a href="https://www.facebook.com/sharer.php?u=https://www.leifshop.com/products/melon-tiles-no-2-painting">
                <Facebook color="#00FF00" />
              </a>
              <a href="mailto:?subject=Check out this product from LEIF!&amp;body=https://www.leifshop.com/products/melon-tiles-no-2-painting">
                <Mail color="#00FF00" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:ml-0 ml-10 mt-5 h-fit">
        <h1 className="text-lg font-semibold">Evaluate :</h1>
        {localStorage.getItem("accessToken") &&
        informationUser.bought.includes(detailProductValue.id) ? (
          <div>
            <div>
              <StarRatings
                rating={ratting}
                starRatedColor="yellow"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="3px"
              />
              {checkRatting ? (
                <span className="text-red-700">( Please rate )</span>
              ) : null}
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  onChange={handleInput}
                  className="focus:outline-none border-red-400 border-b-2 md:w-[500px] w-[300px] "
                  placeholder="Write a comment..."
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="flex bg-red-600 text-white w-fit p-4 h-9 items-center"
                  onClick={commentProduct}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        ) : localStorage.getItem("accessToken") ? (
          <div className="order-red-400 border-b-2 text-red-700">
            Buy this product to comment .
          </div>
        ) : (
          <Link
            href="/?login-page=true"
            className="flex underline h-[40px] text-red-700 border-b-2 border-red mb-3"
          >
            Login and shop to get comments .
          </Link>
        )}
        <div>
          {detailProductValue.comment &&
          detailProductValue.comment.length > 0 ? (
            detailProductValue.comment.map((comment, index) => (
              <div className="w-[80%] border-b-2 border-red" key={index}>
                <div className="flex items-center gap-2">
                  <img
                    src={
                      comment.urlAvatarUser !== ""
                        ? comment.urlAvatarUser
                        : "https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-50-hinh-anh-dai-dien-facebook-mac-dinh-dep-doc-la_2.jpg"
                    }
                    alt=""
                    className="w-10 h-10 r rounded-full"
                  />
                  <p className="text-red-400">{comment.email}</p>
                  <StarRatings
                    rating={comment.ratting}
                    starRatedColor="yellow"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="3px"
                  />
                </div>
                <h1 className="ml-3">{comment.content}</h1>
              </div>
            ))
          ) : (
            <div className=" text-sm text-center my-5">
              There are no comments here .
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DetailProduct);
