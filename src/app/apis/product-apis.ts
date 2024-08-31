import httpRequest from "./http/axios-hppt-request";
import { ProductType, UserComment } from "../util/product.type";

const getAllProduct = async () => {
  try {
    const response = await httpRequest.get("/product/all");
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getAllArtwork = async () => {
  try {
    const response = await httpRequest.get("/product/all/artwork");
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getAllInterior = async () => {
  try {
    const response = await httpRequest.get("/product/all/interior");
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getAllHoliday = async () => {
  try {
    const response = await httpRequest.get("/product/all/holiday");
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getAllKitchen = async () => {
  try {
    const response = await httpRequest.get("/product/all/kitchen");
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getAllSale = async () => {
  try {
    const response = await httpRequest.get("/product/all/sale");
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getDetailProduct = async (id: number) => {
  try {
    const response = await httpRequest.get(`/product/detail/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};
// cần chỉnh sửa uplaod file
const createProduct = async (newProduct: ProductType) => {
  try {
    const convertFromData = new FormData();
    for (const key in newProduct) {
      if (Object.prototype.hasOwnProperty.call(newProduct, key)) {
        convertFromData.append(key, (newProduct as any)[key]);
      }
    }
    const response = await httpRequest.post(
      "/product/create",
      convertFromData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const updateProduct = async (newProduct: ProductType) => {
  try {
    const convertFromData = new FormData();
    for (const key in newProduct) {
      if (Object.prototype.hasOwnProperty.call(newProduct, key)) {
        convertFromData.append(key, (newProduct as any)[key]);
      }
    }
    const response = await httpRequest.post(
      "/product/update",
      convertFromData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const commentProduct = async (content: {
  idProduct: number | null | undefined;
  data: UserComment;
}) => {
  try {
    const response = await httpRequest.post(`/product/comment`, content);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

const getDeleteProduct = async (id: number) => {
  try {
    const response = await httpRequest.delete(`/product/remove/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const productApis = {
  getAllProduct,
  getAllArtwork,
  getAllInterior,
  getAllHoliday,
  getAllKitchen,
  getAllSale,
  getDetailProduct,
  createProduct,
  updateProduct,
  commentProduct,
  getDeleteProduct,
};
