"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { notification } from "antd";
import { MoveLeft } from "lucide-react";
import { AtomSaveMail } from "@/app/recoil/save-mail-provider";
import { userApis } from "@/app/apis/user-apis";

const ChangePassword = () => {
  const router = useRouter();
  const passwordValue = useRef<HTMLInputElement>(null);
  const confirmPasswordValue = useRef<HTMLInputElement>(null);
  const checkBoxValue = useRef<HTMLInputElement>(null);
  const emailUser = useRecoilValue(AtomSaveMail);
  const [showPassword, setShowPassword] = useState(false);
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [rightnessOfInforMation, setRightness] = useState(true);

  const openNotificationChangeSuccess = () => {
    notification.open({
      message: "Change password is success .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const Change = async () => {
    try {
      if (
        passwordValue.current != null &&
        confirmPasswordValue.current != null
      ) {
        if (
          passwordValue.current.value === "" ||
          confirmPasswordValue.current.value === "" ||
          passwordValue.current.value !== confirmPasswordValue.current.value
        ) {
          console.log(12);
          setRightness(false);
          return;
        }
        setRightness(true);
        const newPassword = passwordValue.current.value;
        const change = await userApis.changePassword(emailUser, newPassword);
        if (change.data) {
          openNotificationChangeSuccess();
          router.push("/?login-page=true");
          return;
        }
        setRightness(false);
        return;
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      Change();
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

      <button className="my-3" onClick={() => window.history.back()}>
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
                  CREATE NEW PASSWORD
                </div>

                <div className="grid  mb-3">
                  <label
                    className="form-label font-bold"
                    htmlFor="form3Example4"
                  >
                    New password :
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
                    onClick={Change}
                  >
                    Confirm
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

export default React.memo(ChangePassword);
