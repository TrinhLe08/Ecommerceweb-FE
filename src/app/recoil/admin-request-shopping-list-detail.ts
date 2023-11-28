import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomShoppingListDetail = atom({
  key: "AtomShoppingListDetail",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
