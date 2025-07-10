export type OrderDetailType = {
  idOrder: number;
  quantity: number;
  nameOrder: string;
  urlOrder: string;
  priceOrder: number;
  statusProduct: Boolean;
};

type PartialShoppingListType = {
  id: number | null;
  buyerName: string;
  price: number;
  quantity: number;
  phoneNumber: string;
  city: string;
  country: string;
  address: string;
  point: number;
  purchasDate: string;
  email: string;
  status: boolean;
  detailOrder: OrderDetailType[];
};

export type ShoppingListType = Partial<PartialShoppingListType>;
