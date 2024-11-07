"use client";
import React, { useState } from "react";
import { Pagination } from "antd";
import { List } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { AtomAllUser } from "@/app/recoil/admin-request-all-user-provider";
import { UserType } from "@/app/util/user.type";
import { userApis } from "@/app/apis/user-apis";

const AllUserPage = () => {
  const allUsers = useRecoilValue(AtomAllUser);
  const [_, setAllUser] = useRecoilState(AtomAllUser);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalItems = allUsers.length;
  const startItemIndex = (currentPage - 1) * pageSize;
  const endItemIndex = startItemIndex + pageSize;
  const currentItems = allUsers.slice(startItemIndex, endItemIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const DeleteUser = async (idUser: number | null) => {
    if (idUser) {
      const deleteUser = await userApis.getDeleteUser(idUser);
      setAllUser(deleteUser);
    }
  };
  return (
    <div>
      <div className="w-full flex justify-between mb-2 border-b-[1px] border-red-100 pb-1 font-semibold">
        <p className="w-[30px]">Id</p>
        <p className="w-[200px]">Email</p>
        <p className="w-[100px]">Name</p>
        <p className="w-[100px]">Phone Number</p>
        <p className="w-[100px]">Spent</p>
        <p className="w-[100px]">Point</p>
      </div>

      <List
        itemLayout="vertical"
        dataSource={currentItems}
        renderItem={(value: UserType | any) => (
          <div className="w-full  flex justify-between mb-2 border-b-[1px] border-red-100 pb-1">
            <div className="w-full flex justify-between mb-2 border-b-[1px] border-red-100 pb-1">
              <p className="w-[30px]">{value.id}</p>
              <p className="w-[200px]">{value.email}</p>
              <p className="w-[100px]">{value.name}</p>
              <p className="w-[100px]">{value.phoneNumber}</p>
              <p className="w-[100px]">
                {value.spent ? (value.spent / 100).toFixed(2) : "N/A"} $
              </p>
              <p className="w-[100px]">{value.point}</p>
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

export default React.memo(AllUserPage);
