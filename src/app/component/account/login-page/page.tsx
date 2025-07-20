"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { notification } from "antd";
import { userApis } from "@/app/apis/user-apis";
import { AtomReturnInformationWhenLogin } from "@/app/recoil/information-user-provider";
import { adminApis } from "@/app/apis/admin-apis";

const LoginComponent = () => {
  const router = useRouter();
  const emailValue = useRef<HTMLInputElement>(null);
  const passwordValue = useRef<HTMLInputElement>(null);
  const checkBoxValue = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rightnessOfInforMation, setRightness] = useState(true);
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [__, setReturnInformation] = useRecoilState(
    AtomReturnInformationWhenLogin
  );
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const openNotificationWelcome = () => {
    notification.open({
      message: "Welcome back .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const GetInformation = async () => {
    try {
      if (emailValue.current !== null && passwordValue.current !== null) {
        if (emailValue.current.value === "admin@gmail.com") {
          const value = {
            email: emailValue.current.value,
            password: passwordValue.current.value,
          };
          const login: any = await adminApis.loginAdmin(value);
          if (login.statusCode === 200) {
            setReturnInformation(login.data);
            localStorage.setItem("accessToken", login.data);
            router.push("/?page-admin=all-user");
          } else {
            setRightness(false);
          }
          return;
        }
        if (
          emailValue.current.value == "" &&
          passwordValue.current.value == "" &&
          emailRegex.test(emailValue.current.value)
        ) {
          setRightness(false);
          return;
        }
        setRightness(true);
        const value = {
          email: emailValue.current.value,
          password: passwordValue.current.value,
        };
        const checkBox = checkBoxValue.current?.checked;
        const login: any = await userApis.loginUser(value);
        if (login.statusCode === 200) {
          setReturnInformation(login.data);
          localStorage.setItem("accessToken", login.data.token);
          router.push("/");
          openNotificationWelcome();
        } else {
          setRightness(false);
        }
      } else {
        return 0;
      }
    } catch (error) {
      console.log(error, "from login user");
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
    <div className="h-screen grid justify-center items-center bg-cover bg-center bg-no-repeat"
    // style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20231227/pngtree-natural-and-untreated-wood-texture-background-image_13841777.png')" }}
    >
      <div className="border-amber-700 border-b-2">
        <Link href="/" onClick={() => setCheckSidebar(0)}>
          <div className="grid justify-center my-">
            <img
              src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
              alt=""
              className="w-[250px] p-5"
            />
          </div>
        </Link>

      </div>
      <div className="flex justify-center items-center gap-10">
        <div>
          <img src="https://media.istockphoto.com/id/486220002/vi/vec-to/t%E1%BA%A7m-nh%C3%ACn-ra-khu-ph%E1%BB%91-c%E1%BB%95-v%C3%A0-qu%C3%A1n-c%C3%A0-ph%C3%AA-%C4%91%C6%B0%E1%BB%9Dng-ph%E1%BB%91.jpg?s=612x612&w=0&k=20&c=H-ViMy4iHWu1wocdde17X5KFiGZ5nFvDwVQi1UCHupw=" alt="" />
        </div>
        <div
          className="font-serif italic h-full grid justify-center bg-cover bg-center bg-no-repeat border-amber-800 border-l-2"
        >
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
                    <div className="grid justify-center text-2xl font-bold mb-5 text-amber-900">
                      LOGIN
                    </div>

                    <div className="grid mb-4">
                      <label
                        className="form-label font-bold"
                        htmlFor="form3Example3"
                      >
                        Email :
                      </label>
                      <input
                        ref={emailValue}
                        type="email"
                        className="focus:outline-none w-[300px] h-[40px] border-red-400 border-b-2 min-w-24 bg-transparent"
                        placeholder="Enter a valid email address"
                        onKeyPress={handleKeyPress}
                      />
                      {rightnessOfInforMation ? null : (
                        <p className="text-red-700 text-sm">
                          Email or password is incorrect
                        </p>
                      )}
                    </div>

                    <div className="grid mb-3">
                      <div>

                      </div>
                      <label
                        className="form-label font-bold"
                        htmlFor="form3Example4"
                      >
                        Password :
                      </label>
                      <input
                        ref={passwordValue}
                        type={showPassword ? "text" : "password"}
                        className="focus:outline-none w-[300px] h-[40px] border-red-400 border-b-2 min-w-24 bg-transparent"
                        placeholder="Enter password"
                        onKeyPress={handleKeyPress}
                      />
                      {rightnessOfInforMation ? null : (
                        <p className="text-red-700 text-sm">
                          Email or password is incorrect
                        </p>
                      )}
                      <div>
                        <Link
                          href="/?confirm-email-page=true"
                          className="underline text-red-700 text-xs"
                        >
                          Forgot password ?
                        </Link>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
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
                    </div>

                    <div className="grid gap-2 text-center text-lg-start mt-4 pt-2">
                      <button
                        type="button"
                        className="w-full bg-amber-900 hover:bg-amber-700 text-white font-bold py-2 px-4"
                        onClick={GetInformation}
                      >
                        Login
                      </button>
                      <div>
                        <Link href="/?register-page=true" className="underline">
                          Don't have an account?
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default React.memo(LoginComponent);
