"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { InputNumber } from "antd";
import { AtomShoppingCart } from "@/app/recoil/shopping-cart-provider";
import { OrderDetailType } from "@/app/utils/shopping-list.type";
const ShoppingCart = () => {
  const shoppingCartValue = useRecoilValue(AtomShoppingCart);
  const [_, setShoppingCartValue] = useRecoilState(AtomShoppingCart);
  const [numberInput, setNumberInput] = useState(1);

  const subtotal = shoppingCartValue.reduce(
    (total: number, cart: OrderDetailType) =>
      total + cart.priceOrder * cart.quantity,
    0
  );
  const handleInputChange = (id: number, value: number | null) => {
    if (value !== null) {
      const updatedCartValue = shoppingCartValue.map(
        (cart: OrderDetailType) => {
          if (cart.idOrder === id) {
            return { ...cart, quantity: value };
          }
          return cart;
        }
      );
      setShoppingCartValue(updatedCartValue);
    }
  };
  const RemoveCart = (idCart: number) => {
    const newCartValue = shoppingCartValue.filter(
      (cart: OrderDetailType) => cart.idOrder !== idCart
    );
    setShoppingCartValue(newCartValue);
  };
  return (
    <div className="shopping-cart w-full ">
      <div className="w-full text-center font-semibold mb-5">SHOPPING CART</div>
      <div className="grid gap-5">
        <div className="grid gap-5">
          <div className="w-full flex justify-between border-b-2 border-red mb-4 px-5 font-semibold">
            <p className="xl:w-80 lg:w-60 w-40">ITEM</p>
            <p className="xl:w-40 lg:w-30 lg:w-30 w-20">PRICE</p>
            <p className="xl:w-40 lg:w-30 w-20">QUANTITY</p>
            <p className="xl:w-40 lg:w-30 w-20">TOTAL</p>
          </div>
          {shoppingCartValue
            ? shoppingCartValue.map((cart: OrderDetailType, index: number) => (
                <div
                  className="flex items-center justify-between italic font-serif font-thin"
                  key={index}
                >
                  <Link
                    href={`/?product-detail=${cart.idOrder}`}
                    className="flex items-center gap-5 xl:w-80 w-40"
                  >
                    <img
                      src={cart.urlOrder}
                      alt=""
                      className="w-[150px] h-[210px]"
                    />
                    <div className="w-[100px]">{cart.nameOrder}</div>
                  </Link>
                  <div className="xl:w-40 lg:w-30 w-20">
                    {(cart.priceOrder / 100).toFixed(2)} $
                  </div>
                  <div className="xl:w-40 lg:w-30 w-20">
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={cart.quantity}
                      className="h-fit"
                      onChange={(value: number | null) =>
                        handleInputChange(cart.idOrder, value)
                      }
                    />
                  </div>
                  <div className=" flex gap-5 xl:w-40 lg:w-30 w-20">
                    {((cart.priceOrder * cart.quantity) / 100).toFixed(2)} $
                    <button
                      onClick={() => RemoveCart(cart.idOrder)}
                      className="underline italic font-serif font-thin"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="w-full text-right pr-20 border-t-2 border-red-100 mt-10 pt-10 italic font-serif font-thin font-semibold text-xl">
          Subtotal: {(subtotal / 100).toFixed(2)} $
        </div>
        <div className="text-right mb-10">
          <Link
            href={shoppingCartValue.length > 0 ? "/?payment-page=true" : "/"}
            className="bg-red-200 w-fit p-2 mr-10 hover:text-white hover:bg-red-500"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
};
export default React.memo(ShoppingCart);
