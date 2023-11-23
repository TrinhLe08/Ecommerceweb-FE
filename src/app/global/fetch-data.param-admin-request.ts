import { userApis } from "../apis/user-apis";
import { orderApis } from "../apis/order-apis";

const FecthDataParamsAdmin = async (valueParams: string) => {
  try {
    if (valueParams === "all-user") {
      const allProduct = await userApis.getAllUser();
      return allProduct.data;
    } else if (valueParams === "order-list") {
      const allOrder = await orderApis.getAllOrder();
      return allOrder.data;
    }
  } catch (err) {
    console.log(err);
    return;
  }
  return null;
};

export default FecthDataParamsAdmin;
