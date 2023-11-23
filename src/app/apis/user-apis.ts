import httpRequest from "./axios-hppt-request";
import { UserType } from "../utils/user.type";

const getAllUser = async () => {
  try {
    const response = await httpRequest.get("/user/all");
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const createUser = async (newUser: UserType) => {
  try {
    const response = await httpRequest.post("/user/create", newUser);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getDeleteUser = async (id: number) => {
  try {
    const response = await httpRequest.delete(`/user/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const userApis = {
  getAllUser,
  createUser,
  getDeleteUser,
};
