import httpRequest from "./http/axios-hppt-request";
import { ShoppingListType } from "../util/shopping-list.type";

const getAllOrder = async () => {
  try {
    const response = await httpRequest.get("/shopping-list/all");
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const createOrder = async (newOrder: ShoppingListType) => {
  try {
    const response = await httpRequest.post("/shopping-list/create", newOrder);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getAllUserOrder = async (email: string) => {
  try {
    const response = await httpRequest.post("/shopping-list/user-oders", {
      email,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getDeleteOrder = async (id: number) => {
  try {
    const response = await httpRequest.delete(`/shopping-list/remove/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const updateOrder = async (idOrder: number, newOrder: ShoppingListType) => {
  try {
    const response = await httpRequest.put(
      `/shopping-list/update/${idOrder}`,
      newOrder
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const orderApis = {
  getAllOrder,
  createOrder,
  getAllUserOrder,
  getDeleteOrder,
  updateOrder,
};
