"use client";
import { useRecoilValue } from "recoil";
import { AtomShoppingListDetail } from "@/app/recoil/admin-request-shopping-list-detail";
import {
  OrderDetailType,
  ShoppingListType,
} from "@/app/utils/shopping-list.type";

const ShoppingList = () => {
  const shoppingListValue: ShoppingListType = useRecoilValue(
    AtomShoppingListDetail
  );
  const subtotal =
    shoppingListValue.detailOrder &&
    shoppingListValue.detailOrder.reduce(
      (total: number, cart: OrderDetailType) =>
        total + cart.priceOrder * cart.quantity,
      0
    );

  return (
    <div>
      <div className="mb-5 font-semibold grid gap-2">
        <div>Buyer name : {shoppingListValue.buyerName}</div>
        <div>Eamil : {shoppingListValue.email}</div>
        <div>Phone Number : {shoppingListValue.phoneNumber}</div>
        <div>Country : {shoppingListValue.country}</div>
        <div>City : {shoppingListValue.city}</div>
        <div>Status : {shoppingListValue.status ? "slacking" : "done"}</div>
      </div>
      <div className="mb-5">Dtail Order : </div>
      <div className="flex border-b-2 border-red-100 font-semibold">
        <div className="w-16">Id</div>
        <div className="w-60">Name</div>
        <div className="w-60">Item</div>
        <div className="w-40">Quantity</div>
        <div className="w-60">Price</div>
      </div>
      <div className="mt-5">
        {shoppingListValue.detailOrder &&
          shoppingListValue.detailOrder.map(
            (shoppingList: OrderDetailType, index: number) => (
              <div
                className="flex items-center border-b-[1px] border-red-100 pb-2"
                key={index}
              >
                <div className="w-16">{shoppingList.idOrder}</div>
                <div className="w-60">{shoppingList.nameOrder}</div>
                <div className="w-60">
                  <img src={shoppingList.urlOrder} alt="" className="w-40" />
                </div>
                <div className="w-40">{shoppingList.quantity}</div>
                <div className="w-60">
                  {(shoppingList.priceOrder / 100).toFixed(2)} $
                </div>
              </div>
            )
          )}
      </div>
      <div className="flex justify-end font-semibold text-xl">
        Sub Total : {subtotal && (subtotal / 100).toFixed(2)} $
      </div>
    </div>
  );
};

export default ShoppingList;
