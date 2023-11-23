export type OrderDetailType = {
  idOrder: number;
  quantity: number;
  nameOrder: string;
  urlOrder: string;
  priceOrder: number;
};

type PartialShoppingListType = {
  id: number | null;
  buyerName: string;
  price: number;
  quantity: number;
  phoneNumber: string;
  city: string;
  country: string;
  purchasDate: string;
  email: string;
  status: boolean;
  detailOrder: OrderDetailType[];
};
export type ShoppingListType = Partial<PartialShoppingListType>;
