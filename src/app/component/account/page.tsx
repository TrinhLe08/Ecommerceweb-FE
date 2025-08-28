"use client";
import React from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { AtomSidebaCheckUnderline } from "@/app/recoil/sidebar-check-provider";

interface accountPlayoutProps {
    Component: React.ComponentType<any>;
}

const AccountComponent: React.FC<accountPlayoutProps> = ({ Component }) => {
    const [_, setCheckSidebar] = useRecoilState(AtomSidebaCheckUnderline);

    return (
        <div className="h-screen grid justify-center items-center bg-cover bg-center bg-no-repeat mt-[-20px]">
            <div className="border-amber-700 border-b-2">
                <Link href="/" onClick={() => setCheckSidebar(0)}>
                    <div className="grid justify-center my-">
                        <img
                            src="https://www.leifshop.com/cdn/shop/t/49/assets/logo_leif.png?v=22488871944701774831698078109"
                            alt=""
                            className="w-[250px] p-5 elect-none pointer-events-none"
                        />
                    </div>
                </Link>

            </div>
            <div className="flex justify-center items-center gap-10">
                <div>
                    <img src="https://media.istockphoto.com/id/486220002/vi/vec-to/t%E1%BA%A7m-nh%C3%ACn-ra-khu-ph%E1%BB%91-c%E1%BB%95-v%C3%A0-qu%C3%A1n-c%C3%A0-ph%C3%AA-%C4%91%C6%B0%E1%BB%9Dng-ph%E1%BB%91.jpg?s=612x612&w=0&k=20&c=H-ViMy4iHWu1wocdde17X5KFiGZ5nFvDwVQi1UCHupw="
                        alt=""
                        className="elect-none pointer-events-none" />
                </div>
                <div
                    className="font-serif italic h-full grid justify-center bg-cover bg-center bg-no-repeat border-amber-800 border-l-2"
                >
                    <Component />
                </div>
            </div>
        </div >
    );
};

export default React.memo(AccountComponent);
