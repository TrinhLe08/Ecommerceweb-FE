import { productApis } from "../../apis/product-apis";

const FecthDataParams = async (valueParams: string) => {
  try {
    if (valueParams === "all-product") {
      const allProduct = await productApis.getAllProduct();
      return allProduct.data;
    } else if (valueParams === "home-decord") {
      const allInterior = await productApis.getAllInterior();
      return allInterior.data;
    } else if (valueParams === "artwork") {
      const allArtwork = await productApis.getAllArtwork();
      return allArtwork.data;
    } else if (valueParams === "holiday") {
      const allHoliday = await productApis.getAllHoliday();
      return allHoliday.data;
    } else if (valueParams === "kitchen") {
      const allKitchen = await productApis.getAllKitchen();
      return allKitchen.data;
    } else if (valueParams === "sale") {
      const allSale = await productApis.getAllSale();
      return allSale.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default FecthDataParams;
