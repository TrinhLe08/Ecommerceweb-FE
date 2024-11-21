"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { FaGoogle } from "react-icons/fa";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { notification } from "antd";
import { Popover, Space } from "antd";
import { MoveLeft } from "lucide-react";
import { userApis } from "@/app/apis/user-apis";
import { UserType } from "@/app/util/user.type";

const RegisterComponent = () => {
  const router = useRouter();
  const nameValue = useRef<HTMLInputElement>(null);
  const passwordValue = useRef<HTMLInputElement>(null);
  const confirmPasswordValue = useRef<HTMLInputElement>(null);
  const checkBoxValue = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
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

  const openNotificationWaiting = () => {
    notification.open({
      message: "Please wait a second moment.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const content = (
    <div>
      <p>
        Please use your correct email address as we will send important
        notifications to this address .
      </p>
    </div>
  );

  const GetInformation = async () => {
    openNotificationWaiting();
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
      return;
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      GetInformation();
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

      <button className="my-3 ml-10" onClick={() => window.history.back()}>
        <MoveLeft />
      </button>

      <div
        className="w-[400px] h-[500px] grid justify-center items-center drop-shadow-2xl"
        style={{
          backgroundImage:
            'url("https://global.discourse-cdn.com/elastic/original/3X/9/0/90df22ab443662d632838fd82f6ea38b2cba025a.png")',
        }}
      >
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="grid justify-center text-2xl font-bold mb-5 text-red-400">
                  CREATE YOUR ACCOUT
                </div>

                <div className="grid mb-4">
                  <label
                    className="form-label font-bold"
                    htmlFor="form3Example3"
                  >
                    Email :
                  </label>
                  <div className="grid justify-center">
                    <Space wrap>
                      <Popover
                        content={content}
                        title="Noted : "
                        trigger="hover"
                      >
                        <input
                          ref={nameValue}
                          type="email"
                          className=" w-[250px] focus:outline-none bg-orange-100 p-2"
                          placeholder="Enter a valid email address"
                          onKeyPress={handleKeyPress}
                        />
                      </Popover>
                    </Space>
                  </div>
                  {rightnessOfInforMation ? null : (
                    <p className="text-red-700 text-sm">
                      Wrong format or email already exists
                    </p>
                  )}
                </div>

                <div className="grid  mb-3">
                  <label
                    className="form-label font-bold"
                    htmlFor="form3Example4"
                  >
                    Password :
                  </label>
                  <div className="grid justify-center">
                    <input
                      ref={passwordValue}
                      type={showPassword ? "text" : "password"}
                      className=" w-[250px] focus:outline-none bg-orange-100 p-2"
                      placeholder="Enter password"
                      onKeyPress={handleKeyPress}
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
                  <label
                    className="form-label font-bold"
                    htmlFor="form3Example4"
                  >
                    Confirm password :
                  </label>
                  <div className="grid justify-center">
                    <input
                      ref={confirmPasswordValue}
                      type={showPassword ? "text" : "password"}
                      className=" w-[250px] focus:outline-none bg-orange-100 p-2"
                      placeholder="Enter confirm password"
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  {rightnessOfInforMation ? null : (
                    <p className="text-red-700 text-sm">
                      Missing or incorrect password information (7-10 digits
                      required)
                    </p>
                  )}
                </div>

                <div className="form-check mb-0">
                  <input
                    ref={checkBoxValue}
                    className="form-check-input me-2 "
                    type="checkbox"
                    value=""
                    id="form2Example3"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Show password
                  </label>
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
