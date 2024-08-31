"use client";
import React from "react";
import { AiFillPinterest } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
interface CustomNotificationProps {
  title: string;
  description: string;
}

const Footer = () => {
  return (
    <div className="hidden md:grid footer font-serif w-screen  gap-5 text-center justify-center border-t-2 border-slate-200 p-5">
      <div className="grid w-[900px] gap-9 justify-center">
        <div>
          <h1 className="font-sans font-semibold">#LEIFLIFESTYLE</h1>
          <p className="text-xl italic">goods for living</p>
        </div>

        <div className="flex justify-center gap-9 ">
          <div className="grid border-r-2 border-slate-200 p-5">
            <p>WILLIAMSBURG, BROOKLYN</p>
            <p>99 GRAND STREET</p>
            <p>BROOKLYN, NY 11249</p>
          </div>

          <img
            className="w-[20%]"
            src="https://www.leifshop.com/cdn/shop/t/49/assets/leif_stamp2.svg?v=119490858498548638031643027686"
            alt=""
          />

          <div className="grid border-l-2 border-slate-200 p-5">
            <h1>SAY HI :</h1>
            <p>FOLLOW US @LEIFSHOP</p>
            <p>HELLO@LEIFSHOP.COM</p>
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-center">
        <div>© 2024 LEIF, ALL RIGHTS RESERVED</div>
        <div className="flex gap-2 italic">
          follow us
          <a href="http://pinterest.com/leifshop/">
            <AiFillPinterest size={30} style={{ color: "lightcoral" }} />
          </a>
          <a href="http://www.instagram.com/leifshop">
            <FaInstagramSquare size={30} style={{ color: "lightcoral" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
