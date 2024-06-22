"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { Facebook } from "lucide-react";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { notification } from "antd";
import { MoveLeft } from "lucide-react";
import { userApis } from "@/app/apis/user-apis";
import { UserType } from "@/app/utils/user.type";

const RegisterComponent = () => {
  const router = useRouter();
  const nameValue = useRef<HTMLInputElement>(null);
  const passwordValue = useRef<HTMLInputElement>(null);
  const confirmPasswordValue = useRef<HTMLInputElement>(null);
  const [rightnessOfInforMation, setRightness] = useState(true);
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const openNotificationSuccess = () => {
    notification.open({
      message: "Registered successfully .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const openNotificationFail = () => {
    notification.open({
      message: "Your email already exists .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const GetInformation = async () => {
    try {
      if (
        nameValue.current !== null &&
        passwordValue.current !== null &&
        confirmPasswordValue.current !== null
      ) {
        if (
          nameValue.current.value == "" ||
          passwordValue.current.value == "" ||
          confirmPasswordValue.current.value == "" ||
          passwordValue.current.value.length < 7 ||
          confirmPasswordValue.current.value !== passwordValue.current.value ||
          !emailRegex.test(nameValue.current.value)
        ) {
          setRightness(false);
          return;
        }
        setRightness(true);
        const value: UserType = {
          email: nameValue.current.value,
          password: passwordValue.current.value,
          urlAvatar: "",
          name: "",
          phoneNumber: "",
          country: "",
          city: "",
          address: "",
          spent: 0,
          point: 0,
          bought: [],
          role: "user",
        };
        const createUser: any = await userApis.registerUser(value);
        console.log(createUser.statusCode);
        if (createUser.statusCode === 200) {
          openNotificationSuccess();
          setTimeout(() => {
            router.push("/?login-page=true");
          }, 500);
        } else {
          openNotificationFail();
          return;
        }
      } else {
        return 0;
      }
    } catch (error) {
      console.error(error, "from create user");
      return;
    }
  };
  return (
    <div className="font-serif italic grid justify-center">
      <Link href="/" onClick={() => setCheckSidebar(0)}>
        <div className="grid justify-center my-8">
          <img
            src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
            alt=""
            className="w-[180px]"
          />
        </div>
      </Link>

      <button onClick={() => window.history.back()}>
        <MoveLeft />
      </button>

      <div className="w-[500px] grid justify-center">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="grid justify-center ">
                  <p className="w-fit">Register with</p>
                  <div className="grid justify-center">
                    <button
                      type="button"
                      className="w-fit rounded-full bg-blue-500 p-2 center"
                    >
                      <Facebook style={{ color: "white" }} />
                    </button>
                  </div>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                <div className="grid  mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Email :
                  </label>
                  <div className="grid justify-center">
                    <input
                      ref={nameValue}
                      type="email"
                      className=" w-[250px] focus:outline-none bg-orange-100 p-2"
                      placeholder="Enter a valid email address"
                    />
                  </div>
                  {rightnessOfInforMation ? null : (
                    <p className="text-red-700 text-sm">
                      Wrong format or missing information
                    </p>
                  )}
                </div>

                <div className="grid  mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Password :
                  </label>
                  <div className="grid justify-center">
                    <input
                      ref={passwordValue}
                      type="password"
                      className=" w-[250px] focus:outline-none bg-orange-100 p-2"
                      placeholder="Enter password"
                    />
                  </div>
                  {rightnessOfInforMation ? null : (
                    <p className="text-red-700 text-sm">
                      Missing or incorrect password information (7-10 digits
                      required)
                    </p>
                  )}
                </div>

                <div className="grid mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Confirm password :
                  </label>
                  <div className="grid justify-center">
                    <input
                      ref={confirmPasswordValue}
                      type="password"
                      className=" w-[250px] focus:outline-none bg-orange-100 p-2"
                      placeholder="Enter confirm password"
                    />
                  </div>
                  {rightnessOfInforMation ? null : (
                    <p className="text-red-700 text-sm">
                      Missing or incorrect password information (7-10 digits
                      required)
                    </p>
                  )}
                </div>

                <div className="text-center text-lg-start mt-4 pt-2 underline">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={GetInformation}
                  >
                    Complete registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RegisterComponent);
