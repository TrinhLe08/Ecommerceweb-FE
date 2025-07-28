"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
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

  const FacabookLogin = async () => {
    window.open('http://localhost:10000/api/v1/auth/facebook', '_system');
    return
  }

  const GoogleLogin = async () => {
    window.open('http://localhost:10000/api/v1/auth/google', '_system');
    return
  }

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      GetInformation();
    }
  };
  return (
    <div className="container-fluid h-custom pl-10">
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
                className="focus:outline-none w-[300px] h-[40px] border-red-400 border-b-2 min-w-24 bg-transparent pl-2"
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
                className="focus:outline-none w-[300px] h-[40px] border-red-400 border-b-2 min-w-24 bg-transparent pl-2"
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
              <div className="flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
                <span className="px-3 text-gray-500">Or login with</span>
              </div>
              <div className="flex justify-center gap-4 w-full py-4">
                <a className="p-3 bg-blue-500 rounded-full" onClick={FacabookLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a className="p-3 bg-white border border-gray-300 rounded-full" onClick={GoogleLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                  </svg>
                </a>
              </div>
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
  );
};

export default React.memo(LoginComponent);
