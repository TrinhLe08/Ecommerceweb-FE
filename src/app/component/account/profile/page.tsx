"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { Sparkles } from "lucide-react";
import { PencilLine } from "lucide-react";
import { X } from "lucide-react";
import { LogOut } from "lucide-react";
import { notification } from "antd";
import {
  AtomInformationUser,
  AtomReturnInformationWhenLogin,
} from "@/app/recoil/information-user-provider";
import { userApis } from "@/app/apis/user-apis";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";
import { orderApis } from "@/app/apis/order-apis";
import {
  ShoppingListType,
} from "@/app/util/shopping-list.type";

const ProfilePage = () => {
  const router = useRouter();
  const [_, setValueReturnLogin] = useRecoilState(
    AtomReturnInformationWhenLogin
  );
  const dataUser = useRecoilValue(AtomInformationUser);
  const [__, setDataUserUpdate] = useRecoilState(AtomInformationUser);
  const [___, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);
  const [changeInfor, setChangeInfor] = useState(false);
  const [changeDone, setChangeDone] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [checkUploadFile, setCheckUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputName, setInputName] = useState(dataUser?.name);
  const [inputPhoneNumber, setInputPhoneNumber] = useState(
    dataUser?.phoneNumber
  );
  const [inputCountry, setInputCountry] = useState(dataUser?.country);
  const [dataAllOrder, setDataAllOrder] = useState([]);
  const [inputCity, setInputCity] = useState(dataUser?.city);
  const [inputAddress, setInputAddress] = useState(dataUser?.address);
  setCheckSidebar(0);

  useEffect(() => {
    const fecthDataAllOrder = async () => {
      try {
        const dataAllOrder = await orderApis.getAllUserOrder(dataUser?.email);
        setDataAllOrder(dataAllOrder.data);
        return;
      } catch (err) {
        console.log(err);
        return;
      }
    };
    fecthDataAllOrder();
  }, []);

  const openNotificationWait = () => {
    notification.open({
      message: "Please wait a second .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const openNotificationSuccess = () => {
    notification.open({
      message: "The information update is complete .",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const openNotificationError = () => {
    notification.open({
      message: "Something went wrong, please try again !",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: any) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setCheckUpload(true);
    }
  };
  const handleInputChangeName = (e: any) => {
    setInputName(e.target.value);
  };
  const handleInputChangePhoneNumber = (e: any) => {
    setInputPhoneNumber(e.target.value);
  };
  const handleInputChangeCountry = (e: any) => {
    setInputCountry(e.target.value);
  };
  const handleInputChangeAddress = (e: any) => {
    setInputAddress(e.target.value);
  };
  const handleInputChangeCity = (e: any) => {
    setInputCity(e.target.value);
  };
  const ChangeInformationUser = async () => {
    try {
      setChangeInfor(!changeInfor);
      if (changeDone) {
        setChangeDone(false);
        return;
      }
      const dataToUpdate = {
        id: dataUser.id,
        urlAvatar: selectedFile,
        name: inputName ? inputName : "",
        phoneNumber: inputPhoneNumber ? inputPhoneNumber : "",
        country: inputCountry ? inputCountry : "",
        address: inputAddress ? inputAddress : "",
        city: inputCity ? inputCity : "",
      };
      openNotificationWait();
      const update = await userApis.updateUser(dataToUpdate);
      if (update.data) {
        setDataUserUpdate(update.data);
        setValueReturnLogin({
          id: update.data.id,
          urlAvatar: update.data.urlAvatar,
          email: update.data.email,
          bought: update.data.bought,
        });
        setChangeDone(true);
        setCheckUpload(false);
        openNotificationSuccess();
      }
    } catch (err) {
      openNotificationError();
      return;
    }
  };
  const LogOutUser = () => {
    localStorage.clear();
    setValueReturnLogin({});
    router.push("/");
    return;
  };

  return (
    <div className="grid lg:text-left text-center italic font-serif w-[50%] border-t border-gray-300 p-4">
      <div className="grid sm:flex items-center gap-3  text-xl">
        <div className="grid xl:justify-start justify-center border-r-2 border-red-300 p-2 ">
          <img
            src={
              dataUser?.urlAvatar !== ""
                ? dataUser?.urlAvatar
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixWENwTZdvqJbo7WMo7JJX4yBrk5Mif_bxg&s"
            }
            alt=""
            className="w-20 rounded-full"
          />
          {changeInfor ? (
            <div className="flex items-center justify-center">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <label
                className="cursor-pointer grid text-center"
                onClick={handlePencilClick}
              >
                <span role="img" aria-label="pencil icon" className="">
                  <PencilLine />
                </span>
                {checkUploadFile ? (
                  <span className="text-red-500 text-xs">Updated files</span>
                ) : null}
              </label>
            </div>
          ) : null}
        </div>

        <p className="border-r-2 border-red-300 p-2">
          Amount spent: {(dataUser?.spent / 100).toFixed(2)}$
        </p>
        <p className="flex  sm:justify-start justify-center border-r-2 border-red-300 p-2">
          Accumulated points: {dataUser?.point}{" "}
          <Sparkles strokeWidth={1} color="red" />
        </p>
        <div className="flex justify-center">
          <button
            className="flex border-red-600 border-b-2"
            onClick={() => LogOutUser()}
          >
            Log Out <LogOut />
          </button>
        </div>
      </div>
      <div className="grid gap-4 mt-4 ">
        {changeInfor ? (
          <div className="flex">
            <label htmlFor="">Name : </label>
            <input
              type="text"
              value={inputName}
              onChange={handleInputChangeName}
              className="focus:outline-none border-red-400 border-b-2 min-w-24 bg-transparent dark:bg-gray-900"
            />
          </div>
        ) : (
          <p>Name : {inputName}.</p>
        )}

        <p>Email : {dataUser?.email}.</p>
        {changeInfor ? (
          <div className="flex">
            <label htmlFor="">Phone Number : </label>
            <input
              type="text"
              value={inputPhoneNumber}
              onChange={handleInputChangePhoneNumber}
              className="focus:outline-none border-red-400 border-b-2 min-w-24 bg-transparent dark:bg-gray-900"
            />
          </div>
        ) : (
          <p>Phone Number : {inputPhoneNumber}.</p>
        )}
        {changeInfor ? (
          <div className="flex">
            <label htmlFor="country">Country : </label>
            <select
              id="country"
              name="country"
              className="focus:outline-none border-[1px] border-red-100 rounded-lg p-1 bg-transparent dark:bg-gray-900"
              onChange={handleInputChangeCountry}
              value={!inputCountry ? inputCountry === "America" : inputCountry}
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
        ) : (
          <p>Country : {inputCountry}.</p>
        )}
        {changeInfor ? (
          <div className="flex">
            <label htmlFor="city">City : </label>
            <input
              type="text"
              value={inputCity}
              onChange={handleInputChangeCity}
              className="focus:outline-none border-red-400 border-b-2 min-w-24 bg-transparent dark:bg-gray-900"
            />
          </div>
        ) : (
          <p>City : {inputCity}.</p>
        )}
        {changeInfor ? (
          <div className="flex">
            <label htmlFor="">Address : </label>
            <input
              type="text"
              value={inputAddress}
              onChange={handleInputChangeAddress}
              className="focus:outline-none border-red-400 border-b-2 min-w-24 bg-transparent dark:bg-gray-900"
            />
          </div>
        ) : (
          <p>Address : {inputAddress}.</p>
        )}

        <p>Role : {"client"}.</p>
      </div>
      <div className="grid gap-4 justify-end mb-2 w-full font-bold lg:pr-[200px] pr-0 border-b border-red-500 pb-2">
        <div className="flex gap-4">
          {changeInfor ? (
            <button
              className="flex bg-red-600 text-white w-fit p-4"
              onClick={() => {
                setChangeInfor(false);
                setCheckUpload(false);
              }}
            >
              Cancel <X />
            </button>
          ) : null}

          <button
            className={
              !changeInfor
                ? "flex bg-red-600 text-white w-fit p-4"
                : "flex bg-blue-600 text-white w-fit p-4"
            }
            onClick={ChangeInformationUser}
          >
            {!changeInfor ? "Update information" : "Done"}
            <PencilLine />
          </button>
        </div>
      </div>

      <div>
        <h1 className="font-bold mb-5 text-xl">Purchase history : </h1>
        <div className="max-w-[1000px]">
          {dataAllOrder.map((item: ShoppingListType, index) => (
            <div
              key={index}
              className="md:flex grid justify-center gap-5 mb-4 border p-4"
            >
              <p className="flex font-semibold w-1/5">
                Quantity: <span className="font-thin">{item.quantity}</span>
              </p>
              <p className="flex font-semibold w-1/5">
                Total:{" "}
                <span className="font-thin">
                  {item.price
                    ? `${(item.price / 0.7 / 100).toFixed(2)} $`
                    : null}
                </span>
              </p>
              <p className="flex font-semibold w-1/5">
                Points Used: <span className="font-thin">{item.point}</span>
              </p>
              <p className="flex font-semibold w-1/5">
                Date: <span className="font-thin">{item.purchasDate}</span>
              </p>
              <p className="flex font-semibold w-1/5">Order Details: </p>
              <p className="grid gap-1 w-[200px] h-auto">
                {item.detailOrder?.map((order, orderIndex) => (
                  <span
                    key={orderIndex}
                    className="flex border-b border-red-600"
                  >
                    {order.nameOrder} x {order.quantity}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfilePage);
