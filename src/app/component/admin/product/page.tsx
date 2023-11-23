"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Pagination } from "antd";
import { productApis } from "@/app/apis/product-apis";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomProductListContext } from "@/app/recoil/product-list-provider";
import { ProductType } from "@/app/utils/product.type";

const ProductListAdmin = () => {
  const productList = useRecoilValue(AtomProductListContext);
  const [_, setProductPage] = useRecoilState(AtomProductListContext);
  const [underline, setUnderline] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const totalItems = productList.length;
  const startItemIndex = (currentPage - 1) * pageSize;
  const endItemIndex = startItemIndex + pageSize;
  const currentItems = productList.slice(startItemIndex, endItemIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const FecthDataProductList = async (valueToFecthData: string) => {
    try {
      if (valueToFecthData === "home-decord") {
        setUnderline(1);
        const allInterior = await productApis.getAllInterior();
        return setProductPage(allInterior.data);
      } else if (valueToFecthData === "artwork") {
        setUnderline(2);
        const allArtwork = await productApis.getAllArtwork();
        return setProductPage(allArtwork.data);
      } else if (valueToFecthData === "holiday") {
        setUnderline(4);
        const allHoliday = await productApis.getAllHoliday();
        return setProductPage(allHoliday.data);
      } else if (valueToFecthData === "kitchen") {
        setUnderline(3);
        const allKitchen = await productApis.getAllKitchen();
        return setProductPage(allKitchen.data);
      }
    } catch (err) {
      console.log(err);
      return;
    }
    return null;
  };
  const DeleteProduct = async (productId: number) => {
    const deleteProduct = await productApis.getDeleteProduct(productId);
    setUnderline(0);
    return setProductPage(deleteProduct.data);
  };
  return (
    <div>
      <div className="flex justify-between border-b-[1px] border-red-100 pb-2">
        <div className="flex gap-10">
          <button
            onClick={() => FecthDataProductList("home-decord")}
            className={underline === 1 ? "underline" : ""}
          >
            Interior
          </button>
          <button
            onClick={() => FecthDataProductList("artwork")}
            className={underline === 2 ? "underline" : ""}
          >
            Artwork
          </button>
          <button
            onClick={() => FecthDataProductList("kitchen")}
            className={underline === 3 ? "underline" : ""}
          >
            Kitchen
          </button>
          <button
            onClick={() => FecthDataProductList("holiday")}
            className={underline === 4 ? "underline" : ""}
          >
            Holiday
          </button>
        </div>
        <Link
          href="/?page-admin=create-product"
          className="w-fit p-1 bg-blue-500 text-white"
        >
          + Craete Product
        </Link>
      </div>
      <div className="grid gap-8 mt-10">
        <div className="h-[1500px] grid lg:grid-cols-3 md:grid-cols-2 gap-4  h-fit">
          {currentItems.map((product: ProductType) => (
            <div key={product.id}>
              <div className=" grid justify-center text-center">
                <img src={product.urlProduct} alt="" className="w-full" />
                <p className="font-semibold">{product.name}</p>
                <p>{(product.price / 100).toFixed(2)} $</p>
              </div>
              <div className="flex justify-around">
                <Link
                  href={`/?page-admin-detail-product=${product.id}`}
                  key={product.name}
                  className="underline"
                >
                  Update
                </Link>
                <button
                  className="underline"
                  onClick={() => product.id && DeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          simple
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default React.memo(ProductListAdmin);
