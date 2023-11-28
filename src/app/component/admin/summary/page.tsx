"use client";
import { useRecoilValue } from "recoil";
import { AtomAllUser } from "@/app/recoil/admin-request-all-user-provider";
import { AtomAllOrder } from "@/app/recoil/admin-request-all-order-provider";
import { ShoppingListType } from "@/app/utils/shopping-list.type";

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
  console.log({ subtotal, AllOrder });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="font-semibold text-3xl w-[600px] h-[100px] text-center items-center bg-red-500 rounded text-white">
        <h1>Number of potential customers</h1>
        {AllUser.length}
      </div>
      <div className="font-semibold text-3xl w-[600px] h-[100px] text-center items-center bg-blue-500 rounded text-white">
        <h1>Order number</h1>
        {AllOrder.length}
      </div>
      <div className="font-semibold text-3xl w-[600px] h-[100px] text-center items-center bg-green-500 rounded text-white">
        <h1>Estimated revenue</h1>
        {(subtotal / 100).toFixed(2)} $
      </div>
      <div className="font-semibold text-3xl w-[600px] h-[100px] text-center items-center bg-rose-500 rounded text-white">
        <h1>Total products sold</h1>
        {allQuantity}
      </div>
    </div>
  );
};

export default SummatyPage;
