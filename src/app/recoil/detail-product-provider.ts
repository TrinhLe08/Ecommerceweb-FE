import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const AtomDetailProduct = atom({
  key: "AtomDetailProduct",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
