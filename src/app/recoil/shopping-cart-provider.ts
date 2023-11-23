import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomShoppingCart = atom({
  key: "AtomShoppingCart",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
