"use client";
import React, { useState } from "react";
import { Pagination } from "antd";
import { List } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomAllOrder } from "@/app/recoil/admin-request-all-order-provider";
import { AtomShoppingListDetail } from "@/app/recoil/admin-request-shopping-list-detail";
import Link from "next/link";
import {
  OrderDetailType,
  ShoppingListType,
} from "@/app/utils/shopping-list.type";
import { orderApis } from "@/app/apis/order-apis";

const ProductListAdmin = () => {
  const allOrder = useRecoilValue(AtomAllOrder);
  const [x, setAllOrder] = useRecoilState(AtomAllOrder);
  const [y, setShoppingCartAdmin] = useRecoilState(AtomShoppingListDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalItems = allOrder.length;
  const startItemIndex = (currentPage - 1) * pageSize;
  const endItemIndex = startItemIndex + pageSize;
  const currentItems = allOrder.slice(startItemIndex, endItemIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const DeleteOrder = async (idOrder: number | null) => {
    if (idOrder) {
      const deleteOrder = await orderApis.getDeleteOrder(idOrder);
      setAllOrder(deleteOrder.data);
    }
  };

  const UpdateOrder = async (
    idOrder: number | null,
    dataToUpdate: ShoppingListType
  ) => {
    try {
      if (dataToUpdate.status && idOrder) {
        const newOrder: ShoppingListType = {
          ...dataToUpdate,
          status: false,
        };
        const updateOrder = await orderApis.updateOrder(idOrder, newOrder);
        setAllOrder(updateOrder.data);
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <div>
      <div className="w-full flex mb-2 border-b-[1px] border-red-100 pb-1 font-semibold">
        <div className="w-[150px]">Name</div>
        <div className="w-[250px]">Email</div>
        <div className="w-[150px]">Phone Number</div>
        <div className="w-[150px]">Country</div>
        <div className="w-[150px]">Quantity</div>
        <div className="w-[150px]">Total order</div>
        <div className="w-[80px]">Status</div>
        <div className="w-[50px]">Points</div>
      </div>
      <List
        itemLayout="vertical"
        dataSource={currentItems}
        renderItem={(value: ShoppingListType) => (
          <div className="flex">
            <Link
              href="/?page-admin=shopping-cart"
              className="w-full flex mb-2 border-b-[1px] border-red-100 pb-1 hover:bg-red-100"
              onClick={() => setShoppingCartAdmin(value)}
            >
              <div className="w-[150px]">{value.buyerName}</div>
              <div className="w-[250px]">{value.email}</div>
              <div className="w-[150px]">{value.phoneNumber}</div>
              <div className="w-[150px]">{value.country}</div>
              <div className="w-[150px]">{value.quantity}</div>
              <div className="w-[150px]">
                {value.price ? (value.price / 100).toFixed(2) : "N/A"} $
              </div>
              <div className="w-[80px]">
                {value.status ? "slacking" : "done"}
              </div>
              <div className="w-[50px]">{value.point}</div>
            </Link>
            <div className="flex gap-5 px-1 mb-5">
              <button
                className="bg-red-500 p-1 text-white rounded"
                onClick={() => value.id && DeleteOrder(value.id)}
              >
                Delete
              </button>
              <button
                className="font-light underline"
                onClick={() =>
                  value.id !== undefined && UpdateOrder(value.id, value)
                }
              >
                Solve
              </button>
            </div>
          </div>
        )}
      />
      <Pagination
        style={{ marginTop: "10px", display: "flex" }}
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default React.memo(ProductListAdmin);
