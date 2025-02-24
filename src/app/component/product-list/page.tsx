"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "rc-pagination";
import { useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { AtomProductListContext } from "@/app/recoil/product-list-provider";
import { ProductType } from "@/app/util/product.type";
import { AtomResetLimitProductListPage } from "@/app/recoil/reset-limit-product-list-page-provider";
import FecthDataParams from "@/app/global/fecth-data-param-product-list-request";
import StarRatings from "react-star-ratings";

const ProductList = () => {
  const searchParams = useSearchParams();
  const [_, setValueProductList] = useRecoilState(AtomProductListContext);
  const valueProductList = useRecoilValue(AtomProductListContext);
  const [currentPage, setCurrentPage] = useRecoilState(
    AtomResetLimitProductListPage
  );
  const pageSize: number = 8;
  const totalItems: number = valueProductList.length;
  const limitPage: number = Math.ceil(totalItems / pageSize);
  const startItemIndex = (currentPage - 1) * pageSize;
  const endItemIndex = startItemIndex + pageSize;
  const currentItems = valueProductList.slice(startItemIndex, endItemIndex);
  const [__, setRating] = useState(0);
  const valueParams: string | null = searchParams.get("product-page");

  useEffect(() => {
    const FecthData = async () => {
      // const valueParams: string | null = searchParams.get("product-page");
      try {
        if (valueParams) {
          const productData = await FecthDataParams(valueParams);
          setValueProductList(productData);
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }
    };
    FecthData();
  }, [searchParams]);

  const changeRating = (newRating: number) => {
    setRating(newRating);
  };
  const handlePageChange = (page: number) => {1212
    setCurrentPage(page);
  };

  return (
    <div className="w-[80%] border-t border-gray-300 p-4">
      <h1 className="italic font-serif font-thin text-2xl text-center">{valueParams == 'home-decord' ? "HOME DECOR" :
       valueParams == 'artwork' ? "ARTWORK": 
       valueParams == 'kitchen' ? "KITCHEN": 
       valueParams == 'holiday' ? "HOLIDAY": 
       valueParams == 'sale' ? "SALE": "" }</h1>
    <div className="product-list w-fit h-fit">
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
              if (limitPage <= currentPage) return;
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
                <StarRatings
                  rating={product.ratting}
                  starRatedColor="yellow"
                  changeRating={changeRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="3px"
                />
                <p className="font-semibold">{product.name}</p>
                <div>
                  {product.price ? (
                    <div>
                      <p className="line-through">
                        {!product.status
                          ? `${(product.price / 0.7 / 100).toFixed(2)} $`
                          : null}
                      </p>
                      <p>
                        {product.price
                          ? (product.price / 100).toFixed(2)
                          : null}{" "}
                        ${!product.status ? "(-30%)" : null}
                      </p>
                    </div>
                  ) : null}
                </div>
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
            if (limitPage <= currentPage) return;
            setCurrentPage(currentPage + 1);
          }}
        >
          <ChevronRight strokeWidth={1} />
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProductList;
