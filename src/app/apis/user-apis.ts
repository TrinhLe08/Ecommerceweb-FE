import httpRequest from "./http/axios-hppt-request";
import { UserType } from "../util/user.type";

const getAllUser = async () => {
  try {
    const response = await httpRequest.get("/user/all");
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const registerUser = async (newUser: UserType) => {
  try {
    const response = await httpRequest.post("/user/create", newUser);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const confirmMail = async (mail: string) => {
  try {
    const response = await httpRequest.post("user/confirm-mail", { mail });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const confirmCode = async (code: string) => {
  try {
    const response = await httpRequest.post("user/confirm-code", { code });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const changePassword = async (email: string, newPassword: string) => {
  try {
    const response = await httpRequest.post("user/change-password", {
      email,
      newPassword,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const loginUser = async (user: { email: string; password: string }) => {
  try {
    const response = await httpRequest.post("/user/login", user);
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

const getDetailUser = async (id: number) => {
  try {
    const response = await httpRequest.get(`/user/detail/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const updateUser = async (informationUser: UserType) => {
  try {
    const convertFromData = new FormData();
    for (const key in informationUser) {
      if (Object.prototype.hasOwnProperty.call(informationUser, key)) {
        convertFromData.append(key, (informationUser as any)[key]);
      }
    }
    const response = await httpRequest.post("/user/update", convertFromData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const userApis = {
  getAllUser,
  registerUser,
  confirmMail,
  confirmCode,
  changePassword,
  loginUser,
  getDeleteUser,
  getDetailUser,
  updateUser,
};
