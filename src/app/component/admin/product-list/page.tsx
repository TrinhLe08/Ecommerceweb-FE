"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Pagination } from "antd";
import { productApis } from "@/app/apis/product-apis";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomProductListContext } from "@/app/recoil/product-list-provider";
import { ProductType } from "@/app/util/product.type";

const ProductListAdmin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productList = useRecoilValue(AtomProductListContext);

  const [_, setProductPage] = useRecoilState(AtomProductListContext);
  const [underline, setUnderline] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const totalItems = productList.length;
  const startItemIndex = (currentPage - 1) * pageSize;
  const endItemIndex = startItemIndex + pageSize;
  const currentItems = productList.slice(startItemIndex, endItemIndex);
  const valueParams: string | null = searchParams.get("product-page");
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    // if (valueParams) {
    //   setCurrentPage(1);
    // }
    const FecthDataAllProduct = async () => {
      const valueParams: string | null = searchParams.get("page-admin");
      try {
        if (valueParams === "product-list") {
          const allProdcut = await productApis.getAllProduct();
          setProductPage(allProdcut.data);
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }
    };
    FecthDataAllProduct();
    return;
  }, [searchParams]);
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
      } else if (valueToFecthData === "sale") {
        setUnderline(5);
        const allKitchen = await productApis.getAllSale();
        return setProductPage(allKitchen.data);
      }
    } catch (err) {
      localStorage.clear();
      router.push("/?login-page=true");
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
            onClick={() => {
              FecthDataProductList("home-decord")
              setCurrentPage(1);
            }}
            className={underline === 1 ? "underline" : ""}
          >
            Interior
          </button>
          <button
            onClick={() => {
              FecthDataProductList("artwork")
              setCurrentPage(1);
            }}
            className={underline === 2 ? "underline" : ""}
          >
            Artwork
          </button>
          <button
            onClick={() => {
              FecthDataProductList("kitchen")
              setCurrentPage(1);
            }
            }
            className={underline === 3 ? "underline" : ""}
          >
            Kitchen
          </button>
          <button
            onClick={() => {
              FecthDataProductList("holiday")
              setCurrentPage(1);
            }
            }
            className={underline === 4 ? "underline" : ""}
          >
            Holiday
          </button>
          <button
            onClick={() => {
              FecthDataProductList("sale")
              setCurrentPage(1);
            }
            }
            className={underline === 5 ? "underline" : ""}
          >
            Sale
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
                <img src={product.urlProduct} alt="" className="w-[200px]" />
                <p className="font-semibold">{product.name}</p>
                {product.price ? (
                  <div>
                    <p className="line-through">
                      {product.status
                        ? `${(product.price / 0.7 / 100).toFixed(2)} $`
                        : null}
                    </p>
                    <p>
                      {product.price
                        ? (product.price / 100).toFixed(2)
                        : null}{" "}
                      ${product.status ? "(-30%)" : null}
                    </p>
                  </div>
                ) : null}
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
