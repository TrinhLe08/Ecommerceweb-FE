"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { MoveLeft, Send } from "lucide-react";
import { userApis } from "@/app/apis/user-apis";
import { AtomSaveMail } from "@/app/recoil/save-mail-provider";
import { openNotification } from "@/app/global/notification/noitification";

const CorfirmEmail = () => {
  const router = useRouter();
  const emailValue = useRef<HTMLInputElement>(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [__, setSavaMail] = useRecoilState(AtomSaveMail);
  const [rightnessOfInforMation, setRightness] = useState(true);

  const SendCode = async () => {
    try {
      if (emailValue.current != null) {
        if (
          emailValue.current.value === "" ||
          !emailRegex.test(emailValue.current.value)
        ) {
          setRightness(false);
          return;
        }
        setRightness(true);
        const email = emailValue.current.value;
        openNotification("We are checking and sending you a confirmation code ! Please wait a minute .", 4, "success");
        const confirm = await userApis.confirmMail(email);
        if (confirm.data) {
          openNotification("The confirmation code has been sent to your email .", 3, "success");
          setSavaMail(email);
          router.push("/?confirm-code-page=true");
          return;
        }
        openNotification("Email not valid !", 3, "error");
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
      SendCode();
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
                  CONFIRM EMAIL
                </div>

                <div className="grid  mb-4">
                  <label
                    className="form-label font-bold"
                    htmlFor="form3Example3"
                  >
                    Email :
                  </label>
                  <input
                    ref={emailValue}
                    type="email"
                    className=" w-[250px] focus:outline-none bg-orange-100 p-2"
                    placeholder="Enter a valid email address"
                    onKeyPress={handleKeyPress}
                  />
                  {rightnessOfInforMation ? null : (
                    <p className="text-red-700 text-sm">
                      Email is incorrect
                    </p>
                  )}
                </div>

                <div className="text-center text-lg-start mt-4 pt-2 underline">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={SendCode}
                  >
                    Send confirmation code
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

export default React.memo(CorfirmEmail);
