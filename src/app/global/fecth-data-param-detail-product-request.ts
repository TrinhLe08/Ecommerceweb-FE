import { productApis } from "../apis/product-apis";

const FecthDataDetailProduct = async (idProduct: number) => {
  try {
    if (idProduct) {
      const allProduct = await productApis.getDetailProduct(idProduct);
      console.log(allProduct);
      return allProduct.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default FecthDataDetailProduct;
