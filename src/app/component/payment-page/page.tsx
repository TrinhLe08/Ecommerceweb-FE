"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { Spin } from "antd";
import { AtomShoppingCart } from "@/app/recoil/shopping-cart-provider";
import {
  OrderDetailType,
  ShoppingListType,
} from "@/app/utils/shopping-list.type";
import { orderApis } from "@/app/apis/order-apis";

const Paymentpage = () => {
  const router = useRouter();
  const shoppingCartValue = useRecoilValue(AtomShoppingCart);
  const [_, setShoppingCartValue] = useRecoilState(AtomShoppingCart);
  const [spin, setSpin] = useState(false);
  const antIcon: JSX.Element = (
    <LoadingOutlined
      style={{
        fontSize: 54,
        color: "black",
      }}
      spin
    />
  );
  useEffect(() => {
    if (shoppingCartValue.length <= 0) {
      router.push("/");
    }
  }, []);
  const openNotification = () => {
    notification.open({
      message: "Thank you for your purchase .",
      description: "Your order is being processed .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const subtotal = shoppingCartValue.reduce(
    (total: number, cart: OrderDetailType) =>
      total + cart.priceOrder * cart.quantity,
    0
  );
  const allQuantity = shoppingCartValue.reduce(
    (total: number, cart: OrderDetailType) => total + cart.quantity,
    0
  );

  const style = {
    input:
      "focus:outline-none border-[1px] border-red-100 p-1 w-[200%] rounded-md",
  };
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      country: "America",
      city: "New York",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(7, "Name Must Be More Than 7 Characters!")
        .max(20, "Name Must Not Exceed 20 Characters!")
        .required("Names are not allowed to be left blank!"),
      email: Yup.string().required("Do not leave the email blank!"),
      phoneNumber: Yup.string().required(
        "Do not leave the phone number blank!"
      ),
    }),
    onSubmit: async (values: any) => {
      setSpin(true);
      const today = new Date();
      const date = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const dataTocreateOrder: ShoppingListType = {
        buyerName: values.fullName,
        price: subtotal,
        quantity: allQuantity,
        phoneNumber: values.phoneNumber,
        city: values.city,
        country: values.country,
        purchasDate: `${date}/${month}/${year}`,
        email: values.email,
        status: true,
        detailOrder: shoppingCartValue,
      };
      try {
        const createOrder = await orderApis.createOrder(dataTocreateOrder);
        if (createOrder.data) {
          setSpin(false);
          openNotification();
          setShoppingCartValue([]);
          router.push("/");
        }
      } catch (err) {
        console.log(err);
        return;
      }
    },
  });
  return (
    <div className="payment-page italic font-serif font-thin">
      {spin ? (
        <div className="w-full h-screen flex justify-center items-center z-999 absolute bg-gray-300 bg-opacity-50 top-0">
          <Spin indicator={antIcon} className="relative" />
        </div>
      ) : null}
      <Link
        href="/"
        className="w-full h-fit flex justify-center my-5 pb-5 border-b-2 border-red-100"
      >
        <img
          src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
          alt=""
          className="w-[150px]"
        />
      </Link>
      <div className="flex w-full">
        <form
          onSubmit={formik.handleSubmit}
          className="w-[50%] grid gap-5 h-fit justify-center border-r-2 border-red-100"
        >
          <div className="grid gap-5">
            <div>
              <h1>Name :</h1>
              <input
                type="name"
                value={formik.values.fullName}
                name="fullName"
                onChange={formik.handleChange}
                className={style.input}
              />
              <p className="w-fit text-red-500 text-xs">
                {formik.errors.fullName && formik.touched.fullName ? (
                  <>{formik.errors.fullName as string}</>
                ) : null}
              </p>
            </div>
            <div>
              <h1>Email :</h1>
              <input
                type="email"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                className={style.input}
              />
              <p className="text-red-500 text-xs">
                {formik.errors.email && formik.touched.email ? (
                  <>{formik.errors.email as string}</>
                ) : null}
              </p>
            </div>
            <div>
              <h1>Phone number :</h1>
              <input
                type="phoneNumber"
                value={formik.values.phoneNumber}
                name="phoneNumber"
                onChange={formik.handleChange}
                className={style.input}
              />
              <p className="text-red-500 text-xs">
                {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                  <>{formik.errors.phoneNumber as string}</>
                ) : null}
              </p>
            </div>
            <div>
              <label htmlFor="country">Country : </label>
              <select
                id="country"
                name="country"
                className="focus:outline-none border-[1px] border-red-100 rounded-lg p-1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              >
                <option value="America">America</option>
                <option value="Russia">Russia</option>
                <option value="Japan">Japan</option>
              </select>
            </div>
            <div>
              <label htmlFor="city">City : </label>
              <select
                id="city"
                name="city"
                className="focus:outline-none w-fit border-[1px] border-red-100 rounded-lg p-1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              >
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Moscow">Moscow</option>
                <option value="St. Petersburg">St. Petersburg</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Osaka">Osaka</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-[50%] bg-red-500 p-1 hover:bg-orange-500 hover:text-white"
            >
              Pay Now
            </button>
          </div>
        </form>
        <div className="ml-10">
          <div className="grid gap-2">
            {shoppingCartValue.map((cart: OrderDetailType, index: number) => (
              <div className="flex w-fit gap-10" key={index}>
                <img
                  src={cart.urlOrder}
                  alt=""
                  className="w-[100px] h-[150px]"
                />
                <p className="w-[200px] font-semibold">{cart.nameOrder}</p>
                <p>
                  $ {(cart.priceOrder / 100).toFixed(2)} x {cart.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full text-right text-xl border-t-2 border-red-100 mt-5 pt-5">
            <div>Subtotal : {(subtotal / 100).toFixed(2)} $</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Paymentpage);
