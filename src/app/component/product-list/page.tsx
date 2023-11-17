"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "rc-pagination";
import { useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { AtomProductListContext } from "@/app/recoil/product-list-recoil-provider";
import { AtomDetailProduct } from "@/app/recoil/detail-product-provider";
import { ProductType } from "@/app/utils/product.type";
import FecthDataDetailProduct from "@/app/global/fecth-data-param-detail-product-request";

const ProductList = () => {
  const valueProductList = useRecoilValue(AtomProductListContext);
  const [_, setDetailProductValue] = useRecoilState(AtomDetailProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const pageSize = 9;
  const totalItems = valueProductList.length;
  const startItemIndex = (currentPage - 1) * pageSize;
  const endItemIndex = startItemIndex + pageSize;
  const currentItems = valueProductList.slice(startItemIndex, endItemIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const ToDetailProduct = async () => {
      try {
        const idProduct: number | null = parseInt(
          searchParams.get("product-detail") || "0",
          10
        );
        console.log(searchParams.get("product-detail"));
        if (idProduct) {
          const dataDetailProduct: ProductType = await FecthDataDetailProduct(
            idProduct
          );
          console.log(dataDetailProduct);
          setDetailProductValue(dataDetailProduct);
        } else {
          console.log("Không thể lấy id sản phẩm từ params");
          return;
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chi tiết sản phẩm:", error);
      }
    };
    ToDetailProduct();
  }, [searchParams]);

  return (
    <div className="product-list h-fit">
      <div className="w-full flex justify-center">
        <div className="flex items-center my-2 gap-3">
          <p className="mr-2">PAGE</p>
          <button
            className="flex item-center"
            onClick={() => {
              if (currentPage <= 1) return;
              setCurrentPage(currentPage - 1);
            }}
          >
            <ChevronLeft strokeWidth={1} />
          </button>
          <Pagination
            simple
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
          <button
            className="flex item-center"
            onClick={() => {
              if (currentPage === totalItems) return;
              setCurrentPage(currentPage + 1);
            }}
          >
            <ChevronRight strokeWidth={1} />
          </button>
        </div>
      </div>
      <div className="h-fit italic font-serif text-center border-b-2 border-red">
        <div className="h-[1500px] grid lg:grid-cols-3 md:grid-cols-2 gap-4  h-fit">
          {currentItems.map((product: ProductType) => (
            <Link href={`/?product-detail=${product.id}`} key={product.name}>
              <div>
                <img src={product.urlProduct} alt="" className="w-full" />
                <p className="font-semibold">{product.name}</p>
                <p>{(product.price / 100).toFixed(2)} $</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center my-2 gap-3">
        <p className="mr-2">PAGE</p>
        <button
          className="flex item-center"
          onClick={() => {
            if (currentPage <= 1) return;
            setCurrentPage(currentPage - 1);
          }}
        >
          <ChevronLeft strokeWidth={1} />
        </button>
        <Pagination
          simple
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
        <button
          className="flex item-center"
          onClick={() => {
            if (currentPage === totalItems) return;
            setCurrentPage(currentPage + 1);
          }}
        >
          <ChevronRight strokeWidth={1} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductList);
