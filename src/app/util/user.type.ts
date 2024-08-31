export type PartialUserType = {
  id: number | null;
  email: string;
  password: string;
  urlAvatar: any;
  name: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  spent: number;
  point: number;
  bought: number[];
  role: string;
};

export type UserType = Partial<PartialUserType>;
