"use client";
import dynamic from "next/dynamic";
import dotenv from "dotenv";
import react, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";
import { AtomProductListContext } from "./recoil/product-list-recoil-provider";
import FecthDataParams from "./global/fecth-data-param-request";
import MasterPlayOut from "./component/master-playout/page";
import HomePage from "./component/home-page/page";
dotenv.config();

const ProductList = dynamic(() => import("./component/product-list/page"), {
  ssr: false,
});
const DetailProduct = dynamic(() => import("./component/detail-product/page"), {
  ssr: false,
});

export default function App() {
  const searchParams = useSearchParams();
  const [_, setValueProductList] = useRecoilState(AtomProductListContext);

  useEffect(() => {
    const FecthData = async () => {
      const valueParams: string | null = searchParams.get("product-page");
      if (valueParams) {
        const productData = await FecthDataParams(valueParams);
        setValueProductList(productData);
      } else {
        return;
      }
    };
    FecthData();
  }, [searchParams]);
  return (
    <>
      {searchParams.has("product-page") ? (
        <MasterPlayOut Component={ProductList} />
      ) : searchParams.has("product-detail") ? (
        <MasterPlayOut Component={DetailProduct} />
      ) : searchParams.has("shopping-cart") ? (
        <div>124</div>
      ) : (
        <MasterPlayOut Component={HomePage} />
      )}
    </>
  );
}
