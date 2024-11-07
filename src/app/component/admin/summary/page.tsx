"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { AtomAllUser } from "@/app/recoil/admin-request-all-user-provider";
import { AtomAllOrder } from "@/app/recoil/admin-request-all-order-provider";
import { ShoppingListType } from "@/app/util/shopping-list.type";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các scale và element cần thiết
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SummatyPage = () => {
  const AllUser = useRecoilValue(AtomAllUser);
  const AllOrder = useRecoilValue(AtomAllOrder);
  const subtotal =
    AllOrder &&
    AllOrder.reduce(
      (total: number, cart: ShoppingListType) =>
        cart.price && total + cart.price,
      0
    );
  const allQuantity =
    AllOrder &&
    AllOrder.reduce(
      (total: number, cart: ShoppingListType) =>
        cart.quantity && total + cart.quantity,
      0
    );

  return (
    <div className="grid grid-cols-2 gap-4">
      <Line
        data={{
          labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          datasets: [
            {
              data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
              label: "Revenue",
              borderColor: "red",
              fill: false,
            },
            {
              data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
              label: "Client",
              borderColor: "#8e5ea2",
              fill: false,
            },
            {
              data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
              label: "Order",
              borderColor: "#3cba9f",
              fill: false,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Revenue summary chart",
            },
            legend: {
              display: true,
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default SummatyPage;
