"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { MoveLeft } from "lucide-react";
import { userApis } from "@/app/apis/user-apis";

const CorfirmCode = () => {
  const router = useRouter();
  const code = useRef<HTMLInputElement>(null);
  const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [rightnessOfInforMation, setRightness] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const savedEndTime = localStorage.getItem('countdownEndTime');
    let endTime;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime);
    } else {
      endTime = Date.now() + 1 * 60 * 60 * 1000; // 1 giờ từ bây giờ
      localStorage.setItem('countdownEndTime', endTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const totalSeconds = Math.max(0, Math.floor((endTime - now) / 1000));

      if (totalSeconds <= 0) {
        clearInterval(interval);
        localStorage.removeItem('countdownEndTime');
        return;
      }

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const Move = async () => {
    try {
      if (code.current != null) {
        if (code.current.value === "") {
          setRightness(false);
          return;
        }
        setRightness(true);
        const verifyCode = code.current.value;
        const confirm = await userApis.confirmCode(verifyCode);
        if (confirm.data) {
          router.push("/?change-password-page=true");
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
      Move();
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
                <div className="grid justify-center item-center text-center text-2xl font-bold mb-5 text-red-400">
                  CONFIRM CODE
                  <p className="text-black text-sm">
                    ( Code will expire after : 0{timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds} )
                  </p>
                </div>

                <div className="grid  mb-4">
                  <label
                    className="form-label font-bold"
                    htmlFor="form3Example3"
                  >
                    Code :
                  </label>
                  <input
                    ref={code}
                    type="email"
                    className=" w-[250px] focus:outline-none bg-orange-100 p-2 text-center"
                    placeholder="Enter your code "
                    onKeyPress={handleKeyPress}
                  />
                  {rightnessOfInforMation ? null : (
                    <p className="text-red-700 text-sm">
                      Verification code is invalid !
                    </p>
                  )}
                </div>

                <div className="text-center text-lg-start mt-4 pt-2 underline">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={Move}
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

export default React.memo(CorfirmCode);
