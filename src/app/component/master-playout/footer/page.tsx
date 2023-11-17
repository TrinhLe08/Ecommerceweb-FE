"use client";
import React from "react";
import { useRef } from "react";
import { Button, notification } from "antd";
import footerImg from "@/app/image/footer-image.png";
import { userApis } from "@/app/apis/user-apis";
import { UserType } from "@/app/utils/user.type";
interface CustomNotificationProps {
  title: string;
  description: string;
}

const Footer = () => {
  const userEmail: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const [api, contextHolder] = notification.useNotification();
  const imageUrl: string = footerImg.src.toString();
  const emailPattern: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const CustomNotification: React.FC<CustomNotificationProps> = ({
    title,
    description,
  }) => {
    return (
      <div className="grid gap-5 italic font-serif">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p>{description}</p>
      </div>
    );
  };
  const RegisterUser = async () => {
    if (
      userEmail.current &&
      emailPattern.test(userEmail.current.value) &&
      userEmail.current.value !== ""
    ) {
      const informationUser: UserType = { email: userEmail.current.value };
      try {
        const createUser = await userApis.createUser(informationUser);
        userEmail.current.value = "";
        console.log(createUser.data);
        if (createUser.data === "Email already exists") {
          api.open({
            message: (
              <CustomNotification
                title={"Notification !"}
                description={"This user's email already exists ."}
              />
            ),
            duration: 0,
          });
          return;
        }
        api.open({
          message: (
            <CustomNotification
              title={"Thank you very much !"}
              description={
                "From now on you will receive our latest notifications about our newest products ."
              }
            />
          ),
          duration: 0,
        });
      } catch (error) {
        return;
      }
    }
  };
  return (
    <div className="footer flex">
      <img src={imageUrl} alt="" className="w-[70%] h-full" />
      <div className="w-full grid gap-2  h-fit">
        <div className="flex w-full justify-center">
          <img
            src="https://www.leifshop.com/cdn/shop/t/49/assets/stay-in-touch.png?v=170400074073272105691645745967"
            alt=""
            className="w-[70%] h-full"
          />
        </div>
        <div className="w-full flex justify-center text-center italic font-serif">
          <span className="w-[80%]">
            Let's be friends — sign up to be the first to hear about new
            arrivals, sales & more
          </span>
        </div>
        <div className="grid w-full justify-center gap-2">
          <input
            type="email"
            placeholder="Enter email"
            ref={userEmail}
            className="italic w-full h-fit focus:outline-none font-serif font-thin border-[1px] border-red-200 p-2 text-center"
          />
          <button
            className="w-full h-fit bg-emerald-200 p-2 hover:bg-neutral-300"
            onClick={() => RegisterUser()}
          >
            SUBSCRIBE
          </button>
          {contextHolder}
        </div>
      </div>
    </div>
  );
};

export default Footer;
