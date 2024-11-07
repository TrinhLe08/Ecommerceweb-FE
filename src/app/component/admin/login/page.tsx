"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { adminApis } from "@/app/apis/admin-apis";
import { AdminType } from "@/app/util/admin.type";
const LoginAdmin = () => {
  const name = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const style = {
    input: "focus:outline-none border-2 border-red-200 p-1",
  };

  const Login = async () => {
    if (
      name.current &&
      password.current &&
      password.current.value !== "" &&
      name.current.value !== ""
    ) {
      const informationAdmin: AdminType = {
        email: name.current.value,
        password: password.current.value,
      };
      try {
        const tokenAdmin = await adminApis.loginAdmin(informationAdmin);
        if (tokenAdmin) {
          localStorage.setItem("accessToken", tokenAdmin.data);
          router.push("/?page-admin=all-user");
        } else {
          window.location.href = "about:blank";
        }
      } catch (e) {
        localStorage.clear();
        router.push("/?login-page=true");
        return;
      }
    }
  };

  return (
    <div className="admin-login grid justify-center items-center h-[500px]">
      <div className="grid w-[500px] justify-center gap-2">
        <p>Name : </p>
        <input type="text" ref={name} className={style.input} />
        <p>Password : </p>
        <input type="password" ref={password} className={style.input} />
        <button onClick={Login} className="underline">
          Submit
        </button>
      </div>
    </div>
  );
};

export default React.memo(LoginAdmin);
