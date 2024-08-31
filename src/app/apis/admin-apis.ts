import httpRequest from "./http/axios-hppt-request";
import { AdminType } from "../util/admin.type";

const loginAdmin = async (informationAdmin: AdminType) => {
  try {
    const response = await httpRequest.post("/admin/login", informationAdmin);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const createAdmin = async (newAdmin: AdminType) => {
  try {
    const response = await httpRequest.post("/admin/create", newAdmin);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const adminApis = {
  loginAdmin,
  createAdmin,
};
