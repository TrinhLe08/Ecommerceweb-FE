"use client";
import React, { useState } from "react";
import { Pagination } from "antd";
import { List } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomAllOrder } from "@/app/recoil/admin-request-all-order-provider";
import {
  OrderDetailType,
  ShoppingListType,
} from "@/app/utils/shopping-list.type";
import { orderApis } from "@/app/apis/order-apis";

const ProductListAdmin = () => {
  const allOrder = useRecoilValue(AtomAllOrder);
  const [_, setAllOrder] = useRecoilState(AtomAllOrder);
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

  return (
    <div>
      <div className="w-full flex mb-2 border-b-[1px] border-red-100 pb-1 font-semibold">
        <div className="w-[150px]">Name</div>
        <div className="w-[250px]">Email</div>
        <div className="w-[150px]">Phone Number</div>
        <div className="w-[150px]">Country</div>
        <div className="w-[150px]">Quantity</div>
        <div className="w-[150px]">Total order</div>
        <div className="w-[150px]">Status</div>
      </div>
      <List
        itemLayout="vertical"
        dataSource={currentItems}
        renderItem={(value: ShoppingListType) => (
          <div className="w-full flex mb-2 border-b-[1px] border-red-100 pb-1">
            <div className="w-[150px]">{value.buyerName}</div>
            <div className="w-[250px]">{value.email}</div>
            <div className="w-[150px]">{value.phoneNumber}</div>
            <div className="w-[150px]">{value.country}</div>
            <div className="w-[150px]">{value.quantity}</div>
            <div className="w-[150px]">
              {value.price ? (value.price / 100).toFixed(2) : "N/A"} $
            </div>
            <div className="w-[150px]">
              {value.status ? "Has been processed" : "Not yet been processed"}
            </div>
            <button
              className="bg-red-500 p-1 text-white rounded"
              onClick={() => value.id && DeleteOrder(value.id)}
            >
              Delete
            </button>
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
