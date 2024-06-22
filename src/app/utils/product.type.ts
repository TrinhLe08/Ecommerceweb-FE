export type UserComment = {
  urlAvatarUser: string;
  email: string;
  content: string;
  ratting: number;
};

type PartialProductType = {
  id: number | null;
  urlProduct: string;
  name: string;
  price: number;
  ratting: number;
  status: boolean;
  material: string;
  size: string;
  detail: string;
  origin: string;
  item: string;
  comment: UserComment[];
};

export type ProductType = Partial<PartialProductType>;
