"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { AtomShoppingCart } from "@/app/recoil/shopping-cart-provider";
import {
  OrderDetailType,
  ShoppingListType,
} from "@/app/util/shopping-list.type";
import { orderApis } from "@/app/apis/order-apis";
import {
  AtomInformationUser,
  AtomReturnInformationWhenLogin,
} from "@/app/recoil/information-user-provider";

const Paymentpage = () => {
  const router = useRouter();
  const shoppingCartValue = useRecoilValue(AtomShoppingCart);
  const [_, setShoppingCartValue] = useRecoilState(AtomShoppingCart);
  const user: any = useRecoilValue(AtomInformationUser);
  const informationUser = user || {};
  const [point, setPoint] = useState(0);
  const [hiddenInformationPoint, setHiddenInformationPoint] = useState(true);

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
  const openNotificationLoading = () => {
    notification.open({
      message: "Please wait a moment .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const openNotification = () => {
    notification.open({
      message: "Thank you for your purchase .",
      description: "Your order is being processed .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const openNotificationAccumulatedPoint = () => {
    notification.open({
      message: "Used 10 accumulated points .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const openNotificationAddPoint = () => {
    notification.open({
      message: "You have just received 5 cumulative points .",
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
      "focus:outline-none border-[1px] border-red-100 p-1 w-[170%] sm:ml-[100px] ml[0px] rounded-md bg-transparent dark:bg-gray-900",
  };

  const formik = useFormik({
    initialValues: {
      fullName: informationUser.name ? informationUser.name : "",
      email: informationUser.email ? informationUser.email : "",
      phoneNumber: informationUser.phoneNumber
        ? informationUser.phoneNumber
        : "",
      country: informationUser.country ? informationUser.country : "",
      city: informationUser.city ? informationUser.city : "",
      address: informationUser.address ? informationUser.address : "",
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
      openNotificationLoading();
      const today = new Date();
      const date = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const dataTocreateOrder: ShoppingListType = {
        buyerName: values.fullName,
        price: subtotal - point * 100,
        quantity: allQuantity,
        phoneNumber: values.phoneNumber,
        city: values.city,
        country: values.country,
        address: values.address,
        purchasDate: `${date}/${month}/${year}`,
        email: values.email,
        status: true,
        point: point,
        detailOrder: shoppingCartValue,
      };
      try {
        const createOrder = await orderApis.createOrder(dataTocreateOrder);

        if (createOrder.data && localStorage.getItem("accessToken")) {
          openNotification();
          setShoppingCartValue([]);
          router.push("/");
          setTimeout(openNotificationAddPoint, 1000);
          return;
        }
        openNotification();
        setShoppingCartValue([]);
        router.push("/");
        return;
      } catch (err) {
        localStorage.clear();
        router.push("/?login-page=true");
        return;
      }
    },
  });
  return (
    <div className="w-full h-[100%] dark:bg-gray-900 dark:text-white">
      <div className="payment-page italic font-serif font-thin ">
        <Link
          href="/"
          className="w-full h-full flex justify-center my-5 pb-5 border-b-2 border-red-100"
        >
          <img
            src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
            alt="Leifshop Logo"
            className="w-[150px] dark:hidden filter brightness-0"
          />
          <img
            src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
            alt="Leifshop Logo"
            className="w-[150px] hidden dark:block filter invert"
          />
        </Link>
        <div className="lg:flex xl:gap-0 grid justify-center gap-10 w-full">
          <form
            onSubmit={formik.handleSubmit}
            className="lg:order-1 xl:border-r-2 xl:justify-start order-2 w-[50%] grid gap-5 h-fit justify-center border-red-100"
          >
            <div className="sm:ml-[40px] grid gap-5 ml-0">
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
                  className="focus:outline-none border-[1px] border-red-100 rounded-lg p-1 bg-transparent dark:bg-gray-900"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                >
                  <option value="America">America</option>
                  <option value="Russia">Russia</option>
                  <option value="Japan">Japan</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="China">China</option>
                  <option value="South Africa">South Africa</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                  <option value="Viet Nam">Viet Nam</option>
                </select>
              </div>
              <div>
                <h1>City:</h1>
                <input
                  type="city"
                  value={formik.values.city}
                  name="city"
                  onChange={formik.handleChange}
                  className={style.input}
                />
                <p className="text-red-500 text-xs">
                  {formik.errors.city && formik.touched.city ? (
                    <>{formik.errors.city as string}</>
                  ) : null}
                </p>
              </div>
              <div>
                <h1>Address :</h1>
                <input
                  type="name"
                  value={formik.values.address}
                  name="address"
                  onChange={formik.handleChange}
                  className={style.input}
                />
                <p className="w-fit text-red-500 text-xs">
                  {formik.errors.address && formik.touched.address ? (
                    <>{formik.errors.address as string}</>
                  ) : null}
                </p>
              </div>
              <button
                type="submit"
                className="w-[50%] bg-red-500 p-1 hover:bg-orange-500 hover:text-white"
              >
                Pay Now
              </button>
            </div>
          </form>
          <div className="lg:order-2 order-1 ml-10 min-h-[700px]">
            <div className="grid gap-2">
              {shoppingCartValue.map((cart: OrderDetailType, index: number) => (
                <div className="flex w-fit gap-10" key={index}>
                  <img
                    src={cart.urlOrder}
                    alt=""
                    className="w-[100px] h-[150px]"
                  />
                  <p className="w-[200px] font-semibold">{cart.nameOrder}</p>
                  <div className="xl:w-40 lg:w-30 w-20">
                    {!cart.statusProduct ? `${(cart.priceOrder / 100).toFixed(2)} $` : (<span className="line-through mr-1">{(cart.priceOrder / 0.7 / 100).toFixed(2)}</span>)}
                    {cart.statusProduct ? <span className="text-red-700">(-30%)</span> : null}
                    {cart.statusProduct ? <p>{(cart.priceOrder / 100).toFixed(2)}</p> : null}
                  </div>
                </div>
              ))}
            </div>
            <div className=" w-full text-right text-xl border-t-2 border-red-100 mt-5 pt-5">
              {hiddenInformationPoint && informationUser.point > 9 ? (
                <div className="text-sm">
                  You have{" "}
                  <span className="text-red-700 font-bold">
                    {informationUser.point}
                  </span>{" "}
                  accumulated points.
                  <button
                    className="text-red-700 font-bold underline"
                    onClick={() => {
                      setPoint(10);
                      setHiddenInformationPoint(false);
                      openNotificationAccumulatedPoint();
                    }}
                  >
                    {" "}
                    Click to use 10 points.
                  </button>
                </div>
              ) : null}

              <div className="sm:mr-0 mr-[100px]">
                Subtotal : {(subtotal / 100 - point).toFixed(2)} $
                {!hiddenInformationPoint ? (
                  <span className="text-red-700 text-sm">
                    (Accumulated points applied)
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Paymentpage);
